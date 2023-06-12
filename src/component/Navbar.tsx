import React from "react";
import { Icon } from "@iconify/react";
// styles
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <span className="icon">
            <Icon icon="fluent-emoji-high-contrast:people-hugging" />
          </span>
          <span>Collab</span>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <button className="btn">Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
