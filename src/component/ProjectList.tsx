// react
import React from "react";
import { NavLink } from "react-router-dom";
// styles
import "../styles/projectList.css";
// model
import { projectDocument, onTheProjectType } from "../types/model";
// component
import Avatar from "./Avatar";

type Props = {
  projects: projectDocument[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <div className="project-list">
      {projects?.length ? (
        projects.map((project: projectDocument) => (
          <NavLink key={project.id} to={`/project/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <ul>
                {project.assignedUsersList.map((user: onTheProjectType) => (
                  <li key={user.photoURL}>
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
