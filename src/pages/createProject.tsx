import React, { useEffect, useReducer, useState } from "react";
import "../styles/createProject.css";
import Select from "react-select";
import useFirestore from "../hooks/useFirestore";
import {
  docs,
  onTheProjectType,
  submittedProjectDetails,
} from "../types/model";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useAuthContext } from "../context/useContext";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

// form state
const initialState = {
  name: "",
  details: "",
  dueDate: "",
  category: "",
  assignedUsers: [],
};

// form state type
type projectStateType = {
  name: string;
  details: string;
  dueDate: string;
  category: string;
  assignedUsers: { value: docs; label: string }[];
};

// reducer type
type projectReducerType = {
  name: string;
  value: string | { value: docs; label: string }[];
};

// reducer function
const projectReducers = (
  state: projectStateType,
  action: projectReducerType
) => {
  return { ...state, [action.name]: action.value };
};

// select category options
const category = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "meeting", label: "Meeting" },
];

const CreateProject = () => {
  // usereducer hook
  const [state, dispatch] = useReducer(projectReducers, initialState);

  // fetch users from firestore
  const { fetchedDocs } = useFirestore("users");

  // assign users options
  const [users, setUsers] = useState<{ value: docs; label: string }[]>([]);

  // error state
  const [formError, setFormError] = useState<null | string>(null);

  // get currently logged in user
  const { user } = useAuthContext();

  const navigate = useNavigate();

  // assign user logic for the value and label
  useEffect(() => {
    if (!fetchedDocs) return;
    fetchedDocs.map((user: docs) =>
      setUsers((prev) => [...prev, { value: user, label: user.displayName }])
    );
  }, [fetchedDocs]);

  // on chnage event handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  // on submit event handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    // confirms if fields are selected
    if (!state.category) {
      setFormError("please select project category");
      return;
    }
    if (!state.assignedUsers.length) {
      setFormError("please assign users to project");
      return;
    }

    // create an object for who initialized the project
    const createdBy: onTheProjectType = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // filter out unnecesary assigned user details
    const assignedUsersList = state.assignedUsers.map(
      (user: { value: docs; label: string }) => ({
        displayName: user.value.displayName,
        photoURL: user.value.photoUrl,
        id: user.value.id,
      })
    );

    // object containing all information about created project
    const project: submittedProjectDetails = {
      name: state.name,
      details: state.details,
      category: state.category,
      dueDate: Timestamp.fromDate(new Date(state.dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
      createdAt: Timestamp.fromDate(new Date()),
    };

    // add the project object to database
    await addDoc(collection(db, "project"), project);

    // navigate to dashboard on succesful registration
    navigate("/");
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
            options={users}
            isMulti
            onChange={(option) => {
              if (!option) return;
              let selectedOptions: { value: docs; label: string }[] =
                Array.from(option);
              dispatch({ name: "assignedUsers", value: selectedOptions });
            }}
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
