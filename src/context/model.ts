// type for our auth context
export type authContextType = {
  user: any;
  authIsReady: boolean;
  dispatch: React.Dispatch<authActions>;
};

export interface authState {
  user: null | unknown;
  authIsReady: boolean;
}

export interface authActions {
  type: string;
  payload?: null | unknown;
}
export interface props {
  children: React.ReactNode;
}
