import { Timestamp } from "firebase/firestore";

export interface createUserType {
  email: string;
  password: string;
  username: string;
  thumbNail: File | null;
}

export interface loginUserType {
  email: string;
  password: string;
}

export type docs = {
  displayName: string;
  online: boolean;
  photoUrl: string;
  id: string;
};

export type firestoreState = {
  fetchedDocs: docs[] | projectDocument[];
  isPending: boolean;
  error: string | null;
  success: boolean;
};

export type firestoreReducerActions = {
  type: string;
  payload?: any;
};

export type submittedProjectDetails = {
  name: string;
  details: string;
  category: string;
  dueDate: Timestamp;
  comments: projectComment[];
  createdBy: onTheProjectType;
  assignedUsersList: onTheProjectType[];
  createdAt: Timestamp;
};

export type onTheProjectType = {
  displayName: string;
  photoURL: string;
  id: string;
};

export type projectDocument = {
  name: string;
  details: string;
  category: string;
  dueDate: Timestamp;
  comments: projectComment[];
  createdBy: onTheProjectType;
  assignedUsersList: onTheProjectType[];
  createdAt: Timestamp;
  id: string;
};

export type projectComment = {
  displayName: string;
  photoURL: string;
  comment: string;
  createdAt: Timestamp;
  id: number;
};
