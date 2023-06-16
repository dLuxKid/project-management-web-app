import React from "react";
import "../styles/projectDetails.css";
import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";

type Params = {
  id: string;
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<Params>();

  const validId: string = id ?? "*";

  const { document, error } = useDocument("project", validId);

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details">
      <h1>{document.name}</h1>
    </div>
  );
};

export default ProjectDetails;
