import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword
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
//const signinButton = document.getElementById('signin');

const signinForm = document.querySelector('.login');
signinForm.addEventListener('submit', signinUser);
function signinUser(e) {
    e.preventDefault();
    // const email = signinForm.email.value;
    // const password = signinForm.password.value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('user signed in:', user);
            signinForm.reset();
            window.location.replace("index.html");
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}