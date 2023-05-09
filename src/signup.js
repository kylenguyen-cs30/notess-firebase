import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    setDoc
 } from "firebase/firestore";

//FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyANBu3OWFN0Vd6kT57K2IYyNH-zb1JaZ7Q",
    authDomain: "notess-v2.firebaseapp.com",
    projectId: "notess-v2",
    storageBucket: "notess-v2.appspot.com",
    messagingSenderId: "999128000486",
    appId: "1:999128000486:web:91b7bf69f81d0b7fa65827"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(); //user authentication
const db = getFirestore(); //database



//signup new user
const submitButton = document.getElementById('submit-signup');
const signupForm = document.querySelector('.signup');
submitButton.addEventListener('click', addNewUser);


async function addNewUser(e) {
    e.preventDefault();
    console.log("button is clicked");

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    try {
        //create user in firebase auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('user created:', user);

        //create user in firestore
        const notesRef = doc(db, "users", user.uid);
        await setDoc(notesRef, { notes : [] });

        //reset form and redirect to index.html
        signupForm.reset();
        window.location.replace("index.html");
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    }
}
