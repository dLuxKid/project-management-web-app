import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { projectDocument } from "../types/model";

const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<null | projectDocument>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchDocuments = () => {
      const unSub = onSnapshot(
        doc(db, collection, id),
        (doc) => {
          if (!doc.exists()) {
            setError("No such document exists");
            return;
          }
          const data = doc.data();
          setDocument({
            id: doc.id,
            assignedUsersList: data.assignedUsersList,
            category: data.category,
            comments: data.comments,
            createdBy: data.createdBy,
            details: data.details,
            dueDate: data.dueDate,
            name: data.name,
            createdAt: data.createdAt,
          });
          setError(null);
        },
        (err) => {
          console.log(err.message);
          setError("Failed to get document");
        }
      );
      return () => unSub();
    };
    fetchDocuments();
  }, [collection, id]);

  return { document, error };
};

export default useDocument;
