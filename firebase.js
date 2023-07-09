
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBt7590ESH_b6evoSNEcJPy2ipXZhNbEVg",
  authDomain: "quicknotes-react-app.firebaseapp.com",
  projectId: "quicknotes-react-app",
  storageBucket: "quicknotes-react-app.appspot.com",
  messagingSenderId: "1097277893072",
  appId: "1:1097277893072:web:5d0c9a10f9ec4ef19bb1d5",
  measurementId: "G-5KHDBS8QZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection=collection(db,"notes")
const analytics = getAnalytics(app);
