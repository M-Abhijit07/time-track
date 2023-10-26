// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCab0UuqkFFAUVpr8QLVAHyXbl3R2XsCEo",
  authDomain: "time-tracker-app-f46f4.firebaseapp.com",
  projectId: "time-tracker-app-f46f4",
  storageBucket: "time-tracker-app-f46f4.appspot.com",
  messagingSenderId: "1082883099587",
  appId: "1:1082883099587:web:bc9ef2cbbc3f47d16d0b76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;