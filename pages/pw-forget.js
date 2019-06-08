import React, { Component } from "react";
import Link from "next/link";

import { AppWithAuthentication } from "../src/components/App";
import * as routes from "../src/constants/routes";
import { auth } from "../src/firebase";

const PasswordForgetPage = () => (
  <AppWithAuthentication>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <input
            id="email"
            className="validate"
            value={this.state.email}
            onChange={event =>
              this.setState(updateByPropertyName("email", event.target.value))
            }
            type="email"
          />
          <label htmlFor="email">Email Address</label>
        </div>
        <button disabled={isInvalid} type="submit" className="btn waves-effect waves-light">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link href={routes.PASSWORD_FORGET}>
      <a>Forgot Password?</a>
    </Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
