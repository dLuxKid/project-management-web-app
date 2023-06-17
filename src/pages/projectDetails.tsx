import React from "react";
import "../styles/projectDetails.css";
import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import ProjectSummary from "../component/ProjectSummary";
import ProjectComment from "../component/ProjectComment";

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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComment project={document} />
    </div>
  );
};

export default ProjectDetails;
