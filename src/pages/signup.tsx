import React, { useReducer } from "react";
import "../styles/signup.css";
import useAuth from "../hooks/useAuth";

const initialState = {
  username: "",
  email: "",
  password: "",
  thumbnail: null,
  error: null,
};

type authState = {
  username: string;
  email: string;
  password: string;
  error: null | string;
  thumbnail: File | null;
};

type authActions =
  | { name: string; value: string }
  | { name: "error"; value: string }
  | { name: "thumbnail"; value: File };

const authReducer = (state: authState, action: authActions) => {
  return { ...state, [action.name]: action.value };
};

const Signup: React.FC = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { signup, pending, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    let selectedFile = e.target.files[0];

    if (!selectedFile.type.includes("image")) {
      dispatch({ name: "error", value: "Please select an image" });
      return;
    }
    if (selectedFile.size > 1000000) {
      dispatch({
        name: "error",
        value: "File size must not be larger than 1mb",
      });
      return;
    }
    dispatch({ name: "thumbnail", value: selectedFile });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.error) return;

    signup({
      email: state.email,
      password: state.password,
      username: state.username,
      thumbNail: state.thumbnail,
    });
  };
  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>username</span>
          <input
            required
            type="text"
            onChange={handleChange}
            value={state.username}
            placeholder="username"
            name="username"
          />
        </label>
        <label>
          <span>email</span>
          <input
            required
            type="email"
            onChange={handleChange}
            value={state.email}
            placeholder="email"
            name="email"
          />
        </label>
        <label>
          <span>password</span>
          <input
            required
            type="password"
            onChange={handleChange}
            value={state.password}
            placeholder="password"
            name="password"
          />
        </label>
        <label>
          <span>display picture</span>
          <input
            required
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
          />
          {state.error && <p className="error">{state.error}</p>}
        </label>
        {pending ? (
          <button disabled className="btn">
            Loading...
          </button>
        ) : (
          <button className="btn">signup</button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
