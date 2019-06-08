import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) =>
  <React.Fragment>
    {authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </React.Fragment>

const NavigationAuth = () =>
  <nav>
    <div className="nav-wrapper blue">
      <a href="/" className="brand-logo hide-on-med-and-down">nextjs-redux-firebase</a>
      <ul className="right">
        <li><Link href={routes.LANDING}><a>Landing</a></Link></li>
        <li><Link href={routes.HOME}><a>Home</a></Link></li>
        <li><Link href={routes.ACCOUNT}><a>Account</a></Link></li>
        <li><SignOutButton /></li>
      </ul>
    </div>
    <style jsx>{`
      .nav-wrapper {
        padding: 0px 20px;
      }
    `}</style>
  </nav>

const NavigationNonAuth = () =>
  <nav>
    <div className="nav-wrapper blue">
      <a href="/" className="brand-logo hide-on-med-and-down">nextjs-redux-firebase</a>
      <ul className="right">
        <li><Link href={routes.LANDING}><a>Landing</a></Link></li>
        <li><Link href={routes.SIGN_IN}><a>Sign In</a></Link></li>
      </ul>
    </div>
    <style jsx>{`
      .nav-wrapper {
        padding: 0px 20px;
      }
    `}</style>
  </nav>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);