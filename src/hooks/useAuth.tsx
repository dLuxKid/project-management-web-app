import { useState } from "react";
import { createUserType, loginUserType } from "../types/model.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase.js";
import { useAuthContext } from "../context/useContext.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { dispatch, user } = useAuthContext();

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

        if (thumbNail) {
          // Convert the thumbnail File to Blob
          const thumbnailBlob = new Blob([thumbNail], {
            type: thumbNail?.type,
          });

          // upload to cloud
          await uploadBytes(projectStorageRef, thumbnailBlob);
        }

        // get the photo url
        const url = await getDownloadURL(ref(projectStorageRef));

        // update user profile
        await updateProfile(user, {
          displayName: username,
          photoURL: url,
        });

        // create user document
        await setDoc(doc(db, "users", user.uid), {
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
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        // update online status
        const uid = user.uid;
        await updateDoc(doc(db, "users", uid), {
          online: true,
        });
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
  const logout = async () => {
    setError(null);
    setPending(true);

    signOut(auth)
      .then(async () => {
        // update online status
        const uid = user.uid;
        await updateDoc(doc(db, "users", uid), {
          online: false,
        });
        setError(null);
        setPending(false);
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  };

  return { signup, login, logout, success, pending, error };
};

export default useAuth;
