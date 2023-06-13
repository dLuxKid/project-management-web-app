import React from "react";
import { Icon } from "@iconify/react";
// styles
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/useContext";

const Navbar: React.FC = () => {
  const { logout, pending } = useAuth();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <span className="icon">
            <Icon icon="fluent-emoji-high-contrast:people-hugging" />
          </span>
          <span>Collab</span>
        </li>
        {!user?.uid ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        ) : (
          <li>
            <button className="btn" onClick={logout} disabled={pending}>
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
