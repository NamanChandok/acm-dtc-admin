// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebase_api_key = process.env.FIREBASE_API_KEY;
const firebase_app_id = process.env.FIREBASE_APP_ID;
const firebase_msg_id = process.env.FIREBASE_MSG_ID;
const firebase_measure_id = process.env.FIREBASE_MEASURE_ID;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: firebase_api_key,
	authDomain: "acm-dtc.firebaseapp.com",
	projectId: "acm-dtc",
	storageBucket: "acm-dtc.appspot.com",
	messagingSenderId: firebase_msg_id,
	appId: firebase_app_id,
	measurementId: firebase_measure_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };
