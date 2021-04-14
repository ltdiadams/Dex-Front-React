import React, { SyntheticEvent, useState } from "react";
import axios from "axios"; //for http requests
import { Redirect } from "react-router-dom";

const Register = () => {
  // setting initial state
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setPassConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // --------------------------
    // TODO: will not work...
    // await axios.post('login', {
    //     first_name: firstName,
    //     last_name: lastName,
    //     email: email,
    //     password: password,
    //     confirm_password: confirmPassword
    // });

    // can't create a user with blank inputs
    if (name === "" || password === "") {
      setError(true);
    } else { // if not blank
      setError(false);

      // make post request to /register with inputs
      await axios.post("register", {
        username: name,
        password: password,
      });

      // redirect gets set to true
      setRedirect(true);
    }

    // console.log(response);

    // ---------------------------
    //
  };

  // if everything went well, bring us to the page to log in
  if (redirect) {
    return <Redirect to="/login" />;
  }

  // creates the register form
  return (
    <div className="register">
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please register here</h1>

        <input
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
          Register
        </button>

        {error ? (
          <div className="alert alert-danger" role="alert">
            Fill All Fields
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Register;
