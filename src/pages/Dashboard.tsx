// styles
import "../styles/dashboard.css";
// hook
import useFirestore from "../hooks/useFirestore";
// component
import ProjectFilter from "../component/ProjectFilter";

const Dashboard = () => {
  const { fetchedDocs, error, isPending } = useFirestore("project");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {!isPending ? (
        <ProjectFilter project={fetchedDocs} />
      ) : (
        <p className="fetching">Fetching projects..</p>
      )}
    </div>
  );
};

export default Dashboard;
