import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBdaDGAUIID8aSazt8DGRi9qTy8EWEzbtM",
  authDomain: "nftsv2-4d9c1.firebaseapp.com",
  projectId: "nftsv2-4d9c1",
  databaseURL: "https://nftsv2-4d9c1-default-rtdb.firebaseio.com",
  storageBucket: "nftsv2-4d9c1.appspot.com",
  messagingSenderId: "268537812474",
  appId: "1:268537812474:web:7b2e8f4c18e76cafcb0043",
  measurementId: "G-260SH529BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app);
export const database = getDatabase(app);