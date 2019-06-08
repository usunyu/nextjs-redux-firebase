import React from 'react';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <button
    type="button"
    className="btn waves-effect waves-light"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;
