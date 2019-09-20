import { firestore } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  firestore.collection('users').doc(id).set({
    id,
    username,
    email
  });

export const onceGetUsers = () =>
  firestore.collection('users').get();

// Other db APIs ...
