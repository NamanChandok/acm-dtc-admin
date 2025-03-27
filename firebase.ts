// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC9B4W5sVjEQ7fnsWA8MEVWAs2j5gj4raw",
	authDomain: "acm-dtc.firebaseapp.com",
	projectId: "acm-dtc",
	storageBucket: "acm-dtc.appspot.com",
	messagingSenderId: "775236604378",
	appId: "1:775236604378:web:77fa3eb61d5551ef57b0e3",
	measurementId: "G-L1GJDKV4YH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };
