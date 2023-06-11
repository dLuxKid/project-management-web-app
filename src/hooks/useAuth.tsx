import React, { useState } from "react";
import { createUserType, loginUserType } from "./model";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { useAuthContext } from "../context/useContext.js";

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { dispatch } = useAuthContext();

  //   signup function
  const signup = ({ email, password, displayName }: createUserType) => {
    setPending(true);
    setError(null);
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch({ type: "LOGIN", payload: user });
        // updateCurrentUser(auth, { displayName: displayName });
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

  return { signup, login, logout, success, pending, error, setError };
};

export default useAuth;
