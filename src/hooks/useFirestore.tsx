// react
import { useReducer, useEffect } from "react";
// firebase
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
// model
import { firestoreReducerActions, firestoreState } from "../types/model";

// state
const initialState = {
  fetchedDocs: [],
  isPending: false,
  error: null,
  success: false,
};

// reducer function
const fireStoreReducer = (
  state: firestoreState,
  action: firestoreReducerActions
) => {
  switch (action.type) {
    case "PENDING":
      return {
        isPending: true,
        fetchedDocs: null,
        error: null,
        success: false,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        success: false,
        isPending: false,
      };
    case "FETCHED":
      return {
        ...state,
        fetchedDocs: action.payload,
        isPending: false,
      };
    default:
      return state;
  }
};

const useFirestore = (collectionType: string) => {
  const [state, dispatch] = useReducer(fireStoreReducer, initialState);

  useEffect(() => {
    dispatch({ type: "PENDING" });
    // we fetch the data and update the document
    const q = query(collection(db, collectionType));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const results: object[] = [];
        querySnapshot.forEach((doc) => {
          results.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        dispatch({ type: "FETCHED", payload: results });
      },
      (error) => {
        console.log(error);
        dispatch({ type: "ERROR", payload: "could not fetch data" });
      }
    );

    // when page unmounts, the function is called to stop fetching from the database
    return () => unsubscribe();
  }, [collectionType]);

  return { ...state };
};

export default useFirestore;
