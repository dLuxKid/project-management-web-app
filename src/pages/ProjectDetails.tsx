// react
import { useParams } from "react-router-dom";
// styles
import "../styles/projectDetails.css";
// hook
import useDocument from "../hooks/useDocument";
// component
import ProjectSummary from "../component/ProjectSummary";
import ProjectComment from "../component/ProjectComment";

type Params = {
  id: string;
};

const ProjectDetails = () => {
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
