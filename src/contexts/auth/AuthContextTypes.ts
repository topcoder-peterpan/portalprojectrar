
export interface AuthProfile {
    name: string;
}
export interface AuthError {
    message: string;
}
export type AuthContextLogin = (email: string, password: string) => Promise<void>
export type AuthContextLogout = () => Promise<void>
export interface AuthContextState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    profile: AuthProfile | null;
    error: AuthError | null;
    login: AuthContextLogin;
    logout: AuthContextLogout
}