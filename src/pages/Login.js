import React, { SyntheticEvent, useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login({
  setLogin,
  setUser,
}: {
  setLogin: Function,
  setUser: Function,
}) {

  //initialize useStates

  // const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // setRedirect({value:false});
    // await axios.post('login', {
    //   email: email,
    //   password: password
    // });

    // make post request to login with the inputted username and password
    const response = await axios.post("login", {
      username: name,
      password: password,
    });

    // if request is good, store credentials in sessionStorage
    if (response.status === 200) {
      console.log(response)
      sessionStorage.setItem("token", response.data.jwttoken);
      sessionStorage.setItem('userId',response.data.user.user.userID)
      sessionStorage.setItem("authenticated", true);
      setName(response.data.user.user.userName);
      setRedirect(true);
      setUser(response.data.user.user.userName);
      setLogin(true);
    }

    //console.log(response);
  };

  useEffect(() => {
  }, [setName]);

  // if the request goes through, redirect to home page for authenticated user
  if (redirect) {
    return <Redirect to="/" />;
  }

  // creates the login form
  return (
    <div className="login">
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <input
          type="name"
          className="form-control"
          placeholder="Username"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
