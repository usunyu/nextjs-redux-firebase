import React, { Component } from "react";
import { connect } from "react-redux";

import { AppWithAuthorization } from "../src/components/App";
import { db } from "../src/firebase";

class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(
      snapshot => onSetUsers(snapshot.docs.map(doc => doc.data()))
    );
  }

  render() {
    const { users } = this.props;

    return (
      <AppWithAuthorization>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {!!users.length && <UserList users={users} />}
      </AppWithAuthorization>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <h2>List of App User IDs (Saved on Sign Up in Firebase Database)</h2>
    {users.map(user => (
      <div key={user.id}>{user.id}</div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
