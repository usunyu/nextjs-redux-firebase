import React from "react";
import { connect } from "react-redux";

import { PasswordForgetForm } from "./pw-forget";
import { AppWithAuthorization } from "../src/components/App";
import PasswordChangeForm from "../src/components/PasswordChange";

const AccountPage = ({ authUser }) => (
  <AppWithAuthorization>
    <h1>Account</h1>
    <b>{authUser ? authUser.email : null}</b>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </AppWithAuthorization>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(AccountPage);
