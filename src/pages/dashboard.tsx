import React from "react";
import "../styles/dashboard.css";
import useFirestore from "../hooks/useFirestore";
import ProjectList from "../component/ProjectList";

const Dashboard: React.FC = () => {
  const { fetchedDocs, error, isPending } = useFirestore("project");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {!isPending ? (
        <ProjectList projects={fetchedDocs} />
      ) : (
        <p>Fetching projects..</p>
      )}
    </div>
  );
};

export default Dashboard;
