export interface AuthState {
  isAuthenticated: boolean;
  isRegistered: boolean;
  user: { accessToken: string } | null;
  error: string | null;
  successMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isRegistered: false,
  user: null,
  error: null,
  successMessage: null,
};
