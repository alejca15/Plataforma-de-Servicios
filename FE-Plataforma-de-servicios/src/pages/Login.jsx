import React from "react";
import Login_form from "../componentes/Login/login_form";
import  Navbar_login from '../componentes/Login/navbar_login'
const Login = () => {
  return (
    <div>
       <Navbar_login/>
      <Login_form />
    </div>
  );
};

export default Login;
