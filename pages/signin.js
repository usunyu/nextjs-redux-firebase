import React, { Component } from "react";
import Router from "next/router";

import { SignUpLink } from "./signup";
import { PasswordForgetLink } from "./pw-forget";
import { AppWithAuthentication } from "../src/components/App";
import { auth } from "../src/firebase";
import * as routes from "../src/constants/routes";

const SignInPage = () => (
  <AppWithAuthentication>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        Router.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <input
            id="email"
            value={email}
            onChange={event =>
              this.setState(updateByPropertyName("email", event.target.value))
            }
            type="email"
          />
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="input-field">
          <input
            id="password"
            value={password}
            onChange={event =>
              this.setState(updateByPropertyName("password", event.target.value))
            }
            type="password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button disabled={isInvalid} type="submit" className="btn waves-effect waves-light">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default SignInPage;

export { SignInForm };
