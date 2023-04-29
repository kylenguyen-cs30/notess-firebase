import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyANBu3OWFN0Vd6kT57K2IYyNH-zb1JaZ7Q",
    authDomain: "notess-v2.firebaseapp.com",
    projectId: "notess-v2",
    storageBucket: "notess-v2.appspot.com",
    messagingSenderId: "999128000486",
    appId: "1:999128000486:web:91b7bf69f81d0b7fa65827"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();


//signup new user
const submitButton = document.getElementById('submit-signup');
const signupForm = document.querySelector('.signup');
submitButton.addEventListener('click', addNewUser);
function addNewUser(e) {
    e.preventDefault();
    console.log("button is clicked");

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('user created:', user);
            signupForm.reset();
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
}
