import React from 'react';
import Router from 'next/router';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (needsAuthorization) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.unsubscribeFirebase = firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser && needsAuthorization) {
          Router.push(routes.SIGN_IN)
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribeFirebase();
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  return WithAuthorization;
}

export default withAuthorization;