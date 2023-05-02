
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

if (user) {
    // User is signed in.
    console.log("user is signed in");
    const userId = user.uid;
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(userRef);
    const users = querySnapshot.docs.map((doc) => doc.data());
    const userName = userData?.user_name ?? '';


    //Insert the user name into the welcome message
    const userNameElement = document.getElementById("user-name");
    userNameElement.innerText = ' ${userName?? ""}';

}








const notesContainer = document.getElementById("app");
const addNoteButt = notesContainer.querySelector(".add-note");
const input = document.getElementById("search_input");


input.addEventListener("input", () => searchFor(input));
addNoteButt.addEventListener("click", () => addNote());


function searchFor(input) {
  const searchQuery = input.value.toLowerCase();
  notesRef.once("value", (snapshot) => {
    const notes = snapshot.val();
    const filteredNotes = Object.values(notes || {})
      .filter((note) => note.content.toLowerCase().includes(searchQuery));
    displayNotes(filteredNotes);
  });
}


function displayNotes(notes) {
  notesContainer.innerHTML = "";
  Object.values(notes || {}).forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.appendChild(noteElement);
  });
  //Display all searched notes then add note button 
  notesContainer.appendChild(addNoteButt);
}


//This loads in the notes from Firebase
notesRef.on("value", (snapshot) => {
  const notes = snapshot.val();
  displayNotes(notes);
});


function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note-text");
  element.value = content;
  element.placeholder = "Empty note";
  element.style.marginBottom = "10px";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete?");

    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
}


function updateNote(id, newContent) {
  const noteRef = notesRef.child(id);
  noteRef.update({ content: newContent });
}


function deleteNote(id, element) {
  const noteRef = notesRef.child(id);
  noteRef.remove();
  notesContainer.removeChild(element);
}


function addNote() {
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };
  const noteRef = notesRef.child(noteObject.id);
  noteRef.set(noteObject);
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButt);
}