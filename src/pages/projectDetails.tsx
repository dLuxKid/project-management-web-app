import React from "react";
import "../styles/projectDetails.css";
import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";

const ProjectDetails: React.FC = () => {
  const { id } = useParams;

  const { document, error } = useDocument("project", id);
  return <div>ProjectDetails</div>;
};

export default ProjectDetails;
