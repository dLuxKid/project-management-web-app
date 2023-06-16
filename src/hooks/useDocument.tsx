import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<null | object>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, collection, id),
      (doc) => {
        setDocument({ ...doc.data(), id: doc.id });
        setError(null);
      },
      (err) => {
        setError("Failed to get document");
      }
    );
    return () => unSub();
  }, [collection, id]);

  return { document, error };
};

export default useDocument;
