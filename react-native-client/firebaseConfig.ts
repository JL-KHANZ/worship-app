import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

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
const db = getFirestore(app)

export const userSignIn = (user : USERCLIENT) => {
  createUserWithEmailAndPassword(auth, user.email, "1111")
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

export const addSong = async(song : SONGCLIENT) => {
  const songRef = collection(db, "songs");
  await setDoc(doc(songRef, song.id), song);
}


// export const checkIfUserUsernameExists = async (userName : string) => {
//   try {
//     const usersRef = collection(db, "users"); // Assuming your collection is named 'users'
//     const q = query(usersRef, where("username", "==", userName));
//     const querySnapshot = await getDocs(q);

//     return !querySnapshot.empty; // Returns true if username exists, false otherwise
//   } catch (error) {
//     console.error("Error checking uniqueness: ", error);
//     return false;
//   }
// };

// const checkLoginEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return { exists: true, user: userCredential.user };
//   } catch (error) {
//     if (error.code === 'auth/user-not-found') {
//       return { exists: false, message: 'Email not registered.' };
//     }
//     if (error.code === 'auth/wrong-password') {
//       return { exists: true, message: 'Wrong password.' };
//     }
//     return { exists: false, message: error.message };
//   }
// };
