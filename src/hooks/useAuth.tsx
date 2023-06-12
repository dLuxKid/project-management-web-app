import { useState } from "react";
import { createUserType, loginUserType } from "./model";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase.js";
import { useAuthContext } from "../context/useContext.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { dispatch } = useAuthContext();

  //   signup function
  const signup = ({ email, password, username, thumbNail }: createUserType) => {
    setPending(true);
    setError(null);
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

        // create image refrence
        const uploadPath = `thumbnails/${user.uid}/${thumbNail?.name}`;
        const projectStorageRef = ref(storage, uploadPath);

        // upload to cloud
        await uploadBytes(projectStorageRef, thumbNail);

        // get the photo url
        const url = await getDownloadURL(ref(projectStorageRef));
        await updateProfile(user, {
          displayName: username,
          photoURL: url,
        });

        // create user document
        await setDoc(doc(db, "users", user.uid), {
          // uid: user.uid,
          online: true,
          displayName: username,
          photoUrl: url,
        });

        // dispatch user
        dispatch({ type: "LOGIN", payload: user });
        setError(null);
        setPending(false);
        setSuccess(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setPending(false);
        setSuccess(false);
      });
  };

  //   login function
  const login = ({ email, password }: loginUserType) => {
    setPending(true);
    setError(null);
    setSuccess(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setError(null);
        setPending(false);
        setSuccess(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setPending(false);
        setSuccess(false);
      });
  };

  //   log out function
  const logout = () => {
    signOut(auth)
      .then(() => dispatch({ type: "LOGOUT" }))
      .catch((error) => {
        setError(error.message);
      });
  };

  return { signup, login, logout, success, pending, error };
};

export default useAuth;
