import React from "react";
import { NavLink } from "react-router-dom";
// styles
import "../styles/sidebar.css";
import { Icon } from "@iconify/react";
import { useAuthContext } from "../context/useContext";
import OnlineUsers from "./OnlineUsers";
import Avatar from "./Avatar";

const Sidebar: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar photoURL={user?.photoURL} />
          <p>Hey {user?.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <span className="icon">
                  <Icon icon="carbon:dashboard" className="icon" />
                </span>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <span className="icon">
                  <Icon icon="gridicons:create" className="icon" />
                </span>
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
