// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWuQNN1TnUr5zNk2QODqz-58Cf0lJ4Mr8",
  authDomain: "user-email-password-auth-db898.firebaseapp.com",
  projectId: "user-email-password-auth-db898",
  storageBucket: "user-email-password-auth-db898.appspot.com",
  messagingSenderId: "750139507971",
  appId: "1:750139507971:web:09d36cf69c7ea1748e5536",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
