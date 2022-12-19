// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPCf2C8vgZR11G0IZj52O5CAhgSLWjjqk",
  authDomain: "whatsup-clone-7e4a5.firebaseapp.com",
  projectId: "whatsup-clone-7e4a5",
  storageBucket: "whatsup-clone-7e4a5.appspot.com",
  messagingSenderId: "1040588155545",
  appId: "1:1040588155545:web:391c78cc1314b53ddea608"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {db, auth, provider}