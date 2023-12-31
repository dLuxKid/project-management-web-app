// react
import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// styles
import "../styles/login.css";
// hook
import useAuth from "../hooks/useAuth";

const initialState = {
  email: "",
  password: "",
};

type authState = typeof initialState;

type authActions = {
  name: string;
  value: string;
};

const authReducer = (state: authState, action: authActions) => {
  return { ...state, [action.name]: action.value };
};

const Login = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(authReducer, initialState);

  const { login, pending, error, success } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.email && state.password) {
      login({ email: state.email, password: state.password });
    }
  };

  useEffect(() => {
    if (success) navigate("/");
  }, [success]);

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
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
        {pending ? (
          <button disabled className="btn">
            Loading...
          </button>
        ) : (
          <button className="btn">login</button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
