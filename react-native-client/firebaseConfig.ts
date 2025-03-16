import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBeOoCDJLKxLEXoRIqONidOnlJEXJop5Xk",
  authDomain: "worshipdb-f994c.firebaseapp.com",
  databaseURL: "https://worshipdb-f994c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "worshipdb-f994c",
  storageBucket: "worshipdb-f994c.appspot.com",
  messagingSenderId: "50107249699",
  appId: "1:50107249699:web:0a3b47ba9dbe1e66d8ed96",
  measurementId: "G-VGXYQ8GHV0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const userSignIn = (user : USEROBJ) => {
  createUserWithEmailAndPassword(auth, user.userEmail, user.userPwd)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("user sign in successful", user);
    return true;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error with user sign in", errorCode, errorMessage);
    return false
  });
}