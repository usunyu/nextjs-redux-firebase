import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

import { AppWithAuthentication } from "../src/components/App";
import { auth, db } from "../src/firebase";
import * as routes from "../src/constants/routes";

const SignUpPage = () => (
  <AppWithAuthentication>
    <h1>SignUp</h1>
    <SignUpForm />
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            Router.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <input
            id="username"
            value={username}
            onChange={event =>
              this.setState(updateByPropertyName("username", event.target.value))
            }
            type="text"
          />
          <label htmlFor="username">Full Name</label>
        </div>
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
            value={passwordOne}
            onChange={event =>
              this.setState(
                updateByPropertyName("passwordOne", event.target.value)
              )
            }
            type="password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <input
            id="confirm-password"
            value={passwordTwo}
            onChange={event =>
              this.setState(
                updateByPropertyName("passwordTwo", event.target.value)
              )
            }
            type="password"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
        </div>
        <button disabled={isInvalid} type="submit" className="btn waves-effect waves-light">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account?{" "}
    <Link href={routes.SIGN_UP}>
      <a>Sign Up</a>
    </Link>
  </p>
);
export default SignUpPage;
export { SignUpForm, SignUpLink };
