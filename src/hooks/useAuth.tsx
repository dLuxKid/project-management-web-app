import React, { useState } from "react";
import { args } from "./model";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const useAuth = () => {
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  //   signup function
  const signup = ({ email, password, displayName }: args) => {
    setPending(true);
    setError("");
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
        updateCurrentUser(auth, { displayName: displayName });
      }
    );
  };

  return { signup };
};

export default useAuth;
