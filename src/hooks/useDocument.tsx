import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { projectDocument } from "../types/model";

const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<null | projectDocument>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, collection, id),
      (doc) => {
        if (doc) {
          setDocument({
            id: doc.id,
            assignedUsersList: doc.data()?.assignedUsersList,
            category: doc.data()?.category,
            comments: doc.data()?.comments,
            createdBy: doc.data()?.createdBy,
            details: doc.data()?.details,
            dueDate: doc.data()?.dueDate,
            name: doc.data()?.name,
            // createdAt: doc.data()?.createdAt,
          });
          setError(null);
        } else {
          setError("no such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get document");
      }
    );
    return () => unSub();
  }, [collection, id]);

  return { document, error };
};

export default useDocument;
