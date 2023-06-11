export interface createUserType {
  email: string;
  password: string;
  displayName: string | null;
}

export interface loginUserType {
  email: string;
  password: string;
}

export type firestoreState = {
  document: unknown;
  fetchedDocs: unknown;
  isPending: boolean;
  error: string | null;
  success: boolean;
};

export type firestoreReducerActions = {
  type: string;
  payload?: any;
};
