import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSuinTOVzAx82qyO4prKD_GvtnM8syd8o",
  authDomain: "react-firebase-7eb31.firebaseapp.com",
  projectId: "react-firebase-7eb31",
  storageBucket: "react-firebase-7eb31.appspot.com",
  messagingSenderId: "768460469984",
  appId: "1:768460469984:web:4628fc4337c2df26654285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };