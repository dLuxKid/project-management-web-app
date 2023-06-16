import React from "react";
import "../styles/projectList.css";
import { projectDocument, onTheProjectType } from "../types/model";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";

type Props = {
  projects: projectDocument[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <div className="project-list">
      {projects?.length ? (
        projects.map((project: projectDocument, index: number) => (
          <NavLink key={index} to={`/project/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <ul>
                {project.assignedUsersList.map((user: onTheProjectType) => (
                  <li>
                    <Avatar photoURL={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </NavLink>
        ))
      ) : (
        <p>No available projects </p>
      )}
    </div>
  );
};

export default ProjectList;
