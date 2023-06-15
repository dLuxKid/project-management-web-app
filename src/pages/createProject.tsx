import React, { useEffect, useReducer, useState } from "react";
import "../styles/createProject.css";
import Select from "react-select";
import useFirestore from "../hooks/useFirestore";
import { docs } from "../hooks/model";

const initialState = {
  name: "",
  details: "",
  dueDate: "",
  category: "",
  assignedUsers: [],
};

type projectStateType = {
  name: string;
  details: string;
  dueDate: string;
  category: string;
  assignedUsers: string[];
};

type projectReducerType = {
  name: string;
  value: string | unknown;
};

const projectReducers = (
  state: projectStateType,
  action: projectReducerType
) => {
  return { ...state, [action.name]: action.value };
};

const category = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

const CreateProject: React.FC = () => {
  const [state, dispatch] = useReducer(projectReducers, initialState);

  const { fetchedDocs } = useFirestore("users");
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!fetchedDocs) return;
    fetchedDocs.map((user: docs) =>
      setUsers([{ value: user.id, label: user.displayName }])
    );
  }, [fetchedDocs]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name</span>
          <input
            required
            type="text"
            onChange={handleChange}
            value={state.name}
            name="name"
          />
        </label>
        <label>
          <span>Project details</span>
          <textarea
            required
            onChange={handleChange}
            value={state.details}
            name="details"
          ></textarea>
        </label>
        <label>
          <span>Set due date</span>
          <input
            required
            type="date"
            onChange={handleChange}
            value={state.dueDate}
            name="dueDate"
          />
        </label>
        <label>
          <span>Project category</span>
          <Select
            required
            options={category}
            onChange={(option) => {
              if (!option) return;
              dispatch({ name: "category", value: option.value });
            }}
          />
        </label>
        <label>
          <span>Assign to</span>
          <Select
            required
            options={users}
            isMulti
            onChange={(option) => {
              if (!option) return;
              dispatch({ name: "assignedUsers", value: option.values });
            }}
          />
        </label>
        <button className="btn">Add Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
