import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDYfwvxtgq5vpK2Z7rO16nBE0uYSptaAsY",
    authDomain: "carymei.firebaseapp.com",
    projectId: "carymei",
    storageBucket: "carymei.appspot.com",
    messagingSenderId: "54149547459",
    appId: "1:54149547459:web:880d66a094bbcdfcb7a976",
    measurementId: "G-3RNZ8HGFGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)