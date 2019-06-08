import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.collection('users').doc(id).set({
    id,
    username,
    email
  });

export const onceGetUsers = () =>
  db.collection('users').get();

// Other db APIs ...
