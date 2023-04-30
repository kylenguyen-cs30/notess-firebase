
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, addDoc, getDocs
} from "firebase/firestore";
import{
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANBu3OWFN0Vd6kT57K2IYyNH-zb1JaZ7Q",
    authDomain: "notess-v2.firebaseapp.com",
    projectId: "notess-v2",
    storageBucket: "notess-v2.appspot.com",
    messagingSenderId: "999128000486",
    appId: "1:999128000486:web:91b7bf69f81d0b7fa65827"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
//welcome message
const user = auth.currentUser;

//const name  = user.displayName;
if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    welcomeMessage.innerHTML = `Welcome ${name}! &#128512`;
    const welcomeMessage = document.getElementById("welcome-message");
    
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }



//collection reference
const notesRef = collection(db, "Notes");

// get collection data
getDocs(notesRef)
    .then((snapshot) => {
        let notes = []; //create a new object for each note
        snapshot.docs.forEach((doc) => { //loop through the docs
            notes.push({ ...doc.data(), id: doc.id });      //push the data to the notes array
        });

        addNotes()
        console.log(notes);
    }).catch((error) => {  
        console.log(error);
    });


//add new note
const addNoteButt = notesContainer.querySelector(".add-note");
addNoteButt.addEventListener("click", () => addNote());
function addNote() {
    const existingNotes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000), content: ""
    };

    const noteElement = createNote(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButt);
    existingNotes.push(noteObject);
    saveNotes(existingNotes);
}

// function createNote(id, content) {
//     const element = document.createElement("textarea");
//     element.classList.add("note-text");
//     element.value = content;
//     element.placeholder = "Empty note";
//     element.style.marginBottom = "10px";

//     element.addEventListener("change", () => {
//         updateNote(id, element.value);
//     });

//     element.addEventListener("dblclick", () => {
//         const doDelete = confirm("Are you sure you want to delete?");

//         if (doDelete) {
//             deleteNote(id, element);
//         }
//     });
//     return element;
// }

// function updateNote(id, newContent) {
// 	const notes = getNotes();
// 	const targetNote = notes.filter(note => note.id == id)[0];
// 	targetNote.content = newContent;
// 	saveNotes(notes);
// }

//firebase database
// function saveNotes(notes) {
// 	//localStorage.setItem("notess", JSON.stringify(notes));
// }
//get notes
// function getNotes() {

// }



//welcome message
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in, retrieve their name and update the welcome message
//       var name = user.displayName;
//       document.getElementById("welcome-message").innerHTML = "Hello, " + name + " &#128512;";
//     } else {
//       // User is signed out, redirect to the login page
//       window.location = "login.html";
//     }
//   });