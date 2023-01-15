import React from "react";
import { FullWidthAuth } from "react-mui-auth-page-br";
import {google} from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../config/AuthProvider";
import "./styles.css";

const AuthScreen = () => {

  let navigate = useNavigate();
  const auth = useAuth();

  const handleSignIn = async({ email, password }) => {
    google.signin(email, password)
    .then((data)=>auth.signin(data,()=>navigate("/", { replace: true })));
  };

  const handleSignUp = async ({ email, name, password }) => {
    await google.signup({ name, email, password })
    .then(data=>auth.signin(data,()=>navigate("/", { replace: true })));
  };

  const handleForget = ({ email })=>{
    google.forget(email)
    .then(()=>alert("Email enviado com sucesso."))
    .catch(()=>alert("Error ao enviar email."));
  }

  const handleSocial = {
    Google:()=>google.popup().then(data=>{auth.signin(data,()=>navigate("/", { replace: true }))}),
  };

  if(auth.user!=null) navigate("/");

  return (
    <div className="bg">
      <FullWidthAuth
        logoComponent={<div align="center"><img src="https://assets.materialup.com/uploads/3ec8a09d-a55c-400d-8dad-827836b116de/preview.jpg" alt="Logo" height="120px"/></div>}
        textFieldVariant="outlined"
        handleSignUp={handleSignUp}
        handleForget={handleForget}
        handleSignIn={handleSignIn}
        handleSocial={handleSocial}
      />
    </div>
  );
};

export default AuthScreen;