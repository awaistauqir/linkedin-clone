// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBloe4aP7A13zMJ0DaCks08f_rF9XJA07o',
  authDomain: 'linkedin-clone-ef4fc.firebaseapp.com',
  projectId: 'linkedin-clone-ef4fc',
  storageBucket: 'linkedin-clone-ef4fc.appspot.com',
  messagingSenderId: '581537976389',
  appId: '1:581537976389:web:ec6fe2ccef2f90e2a3d32c',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
