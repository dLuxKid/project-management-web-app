import React from "react";
import { NavLink } from "react-router-dom";
// styles
import "../styles/sidebar.css";
import { Icon } from "@iconify/react";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <p>Hey user</p>
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
