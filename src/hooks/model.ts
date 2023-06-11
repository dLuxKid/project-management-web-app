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
  document: null | unknown;
  isPending: boolean;
  error: string | null;
  success: boolean | null;
};

export type firestoreReducerActions = {
  type: string;
  payload?: string | null | unknown;
};
