import React from "react";
import { onTheProjectType, projectDocument } from "../types/model";
import Avatar from "./Avatar";
import "../styles/projectDetails.css";

type Props = {
  project: projectDocument;
};

const ProjectSummary: React.FC<Props> = ({ project }) => {
  return (
    <div className="project-summary">
      <h2 className="page-title">{project.name}</h2>
      <p className="due-date">
        Project due by {project.dueDate.toDate().toDateString()}
      </p>
      <p className="details">{project.details}</p>
      <h4>Project is assigned to:</h4>
      <div className="assigned-users">
        {project.assignedUsersList.map((users: onTheProjectType) => (
          <div key={users.id}>
            <Avatar photoURL={users.photoURL} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSummary;
