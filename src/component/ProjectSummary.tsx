// react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// styles
import "../styles/projectDetails.css";
// model
import { onTheProjectType, projectDocument } from "../types/model";
// component
import Avatar from "./Avatar";
// hook
import { useAuthContext } from "../context/useContext";
// firebase
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Props = {
  project: projectDocument;
};

const ProjectSummary: React.FC<Props> = ({ project }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    setPending(true);
    try {
      await deleteDoc(doc(db, "project", project.id));
      navigate("/");
      setPending(false);
    } catch (error) {
      setError("could not delete project");
      setPending(false);
    }
  };

  return (
    <div className="project-summary">
      <h2 className="page-title">{project.name}</h2>
      <p>By {project.createdBy.displayName}</p>
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
      {user.uid === project.createdBy.id && (
        <button
          className="btn"
          disabled={pending}
          onClick={handleDeleteProject}
        >
          {pending ? "deleting project" : "Mark as complete"}
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ProjectSummary;
