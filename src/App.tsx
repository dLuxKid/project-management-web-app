import { Route, Routes } from "react-router-dom";
// styles
import "./App.css";
// pages
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

const App: React.FC = () => {
  return (
    <main className="App">
      <Sidebar />
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/project" element={<ProjectDetails />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="/create" element={<CreateProject />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
