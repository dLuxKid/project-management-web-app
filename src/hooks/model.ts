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
  fetchedDocs: docs[];
  isPending: boolean;
  error: string | null;
  success: boolean;
};

export type firestoreReducerActions = {
  type: string;
  payload?: any;
};
