import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDYKskbLW4gYvgR29UYFYpqYdcUqMaDDCo",
  authDomain: "website-challenges-26ef9.firebaseapp.com",
  databaseURL: "https://website-challenges-26ef9-default-rtdb.firebaseio.com",
  projectId: "website-challenges-26ef9",
  storageBucket: "website-challenges-26ef9.appspot.com",
  messagingSenderId: "653276837984",
  appId: "1:653276837984:web:467da511eed181ceadab05",
  measurementId: "G-8BTF590ZHW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
