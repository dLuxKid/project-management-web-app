// react
import React, { useEffect, useState } from "react";
// styles
import "../styles/dashboard.css";
// model
import { projectDocument } from "../types/model";
// componment
import ProjectList from "./ProjectList";
// hook
import { useAuthContext } from "../context/useContext";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
  "meeting",
];

type Props = {
  project: projectDocument[];
};

const ProjectFilter: React.FC<Props> = ({ project }) => {
  const [filter, setFilter] = useState<string>("all");

  const [filteredProject, setFilteredProject] =
    useState<projectDocument[]>(project);

  const { user } = useAuthContext();

  const filterProjects = (filter: string) => {
    switch (filter) {
      case "all":
        setFilteredProject(project);
        break;
      case "mine":
        setFilteredProject(
          project.filter(
            (i) =>
              i.assignedUsersList.map((u) => u.id === user.uid) ||
              i.createdBy.id === user.uid
          )
        );
        break;
      default:
        setFilteredProject(project.filter((i) => i.category === filter));
        break;
    }
  };

  useEffect(() => {
    filterProjects(filter);
  }, [filter]);

  return (
    <div className="project-filter">
      <nav>
        {filterList.map((f, index: number) => (
          <button
            key={index}
            onClick={() => setFilter(f)}
            className={filter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
      <ProjectList projects={filteredProject} />
    </div>
  );
};

export default ProjectFilter;
