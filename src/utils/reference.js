import * as firebase from 'firebase/app';
import {getDatabase, ref} from 'firebase/database';
import {getAuth} from 'firebase/auth';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = firebase.initializeApp(config);

export const rootRef = getDatabase(app);
//export const customersRef = ref(rootRef, 'customers');

export const auth = getAuth(app);

//export const timeRef = firebase.database.ServerValue.TIMESTAMP;
