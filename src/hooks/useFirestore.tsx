// REACT
import { useReducer, useEffect } from "react";
// FIREBASE
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { firestoreReducerActions, firestoreState } from "./model";

// state
const initialState = {
  document: null,
  fetchedDocs: null,
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
        ...state,
        isPending: true,
        document: null,
        error: null,
        success: false,
      };
    case "SUCCESS":
      return {
        ...state,
        document: action.payload,
        success: true,
        isPending: false,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        success: false,
        document: null,
        isPending: false,
      };
    case "DELETE":
      return {
        ...state,
        error: null,
        success: true,
        document: null,
        isPending: false,
      };
    case "FETCHED":
      return {
        ...state,
        fetchedDocs: action.payload,
      };
    default:
      return state;
  }
};

const useFirestore = (collectionType: string, id: string) => {
  const [state, dispatch] = useReducer(fireStoreReducer, initialState);

  useEffect(() => {
    // for everytime a transcation is done, we fetch the data and update the document
    const q = query(
      collection(db, collectionType),
      where("uid", "==", id),
      orderBy("transactionDate", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const results: object[] = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
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

  // add transaction to the database
  const addData = async (uid: string, name: string, amount: string) => {
    // dispatch pending state
    dispatch({ type: "PENDING" });
    //  add collection to firestore
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        uid,
        transactionName: name,
        transactionAmount: amount,
        transactionDate: Timestamp.now(),
      });
      // dispatch docRef to state
      dispatch({ type: "SUCCESS", payload: docRef });
    } catch (error: any) {
      console.log(error);
      // if error dispatch error to state
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // delete transaction from the database
  const deleteData = async (id: string) => {
    dispatch({ type: "PENDING" });
    try {
      await deleteDoc(doc(db, "transactions", id));
      dispatch({ type: "DELETE" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "could not delete" });
    }
  };

  return { addData, deleteData, ...state };
};

export default useFirestore;
