import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import { google } from "./firebase";

export const AuthContext = React.createContext(null);
export const useAuth = ()=>React.useContext(AuthContext);
export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  return (!auth.user)?<Navigate to="/login" state={{from: location}} replace />:children;
}

export default function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  const [search, setSearch] = React.useState('');
  google.checkAuthState().then(res=>{setUser(res)});
  let signin = (newUser, callback) => fakeAuthProvider.signin(()=>{setUser(newUser); callback()});
  let signout = (callback) => fakeAuthProvider.signout(()=>{google.logout(); setUser(null); callback()});
  return(<AuthContext.Provider value={{ user, signin, signout, search, onChange: setSearch }}>{children}</AuthContext.Provider>)
}