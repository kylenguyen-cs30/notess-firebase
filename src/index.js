
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection, 
  addDoc, 
  getDocs,
  onSnapshot
} from "firebase/firestore";
import {
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

const notesRef = collection(db, "users");

auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log("user is signed in");
    const userId = user.uid;
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(userRef);
    const users = querySnapshot.docs.map((doc) => doc.data());
    const userEmail = user.email ?? "";

    // Insert the user email into the welcome message
    const userNameElement = document.getElementById("user-name");
    userNameElement.innerText = ` ${userEmail}`;
  } else {
    console.log("user is not signed in");
  }
});

window.onload = function () {
  loadNotes();
};


function loadNotes() {
  onSnapshot(notesRef, function (snapshot) {
    // iterate through the notes and display them on the page
    snapshot.docs.forEach(function (doc) {
      const note = doc.data();
      // create a new note element
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      const titleElement = document.createElement("h2");
      titleElement.textContent = note.title;
      noteElement.appendChild(titleElement);
      const bodyElement = document.createElement("p");
      bodyElement.textContent = note.body;
      noteElement.appendChild(bodyElement);

      // add the note element to the page
      document.getElementById("app").appendChild(noteElement);
    });
  });
}

function addNote() {
  // Retrieve the title and body of the note from the input fields
  const title = document.getElementById("note-title").value;
  const body = document.getElementById("note-body").value;

  // Create a new note object with the title and body
  const newNote = {
    title: title,
    body: body,
  };

  // Retrieve a reference to the Firebase database
  const dbRef = firebase.database().ref();

  // Add the new note to the "notes" collection in the database
  dbRef.child("notes").push(newNote);

  // Clear the input fields
  document.getElementById("note-title").value = "";
  document.getElementById("note-body").value = "";
}






// function displayNotes(notes) {
//   notesContainer.innerHTML = "";
//   Object.values(notes || {}).forEach((note) => {
//     const noteElement = createNoteElement(note.id, note.content);
//     notesContainer.appendChild(noteElement);
//   });
//   //Display all searched notes then add note button 
//   notesContainer.appendChild(addNoteButt);
// }



// //adding new note function.
// const notesContainer = document.getElementById("app");
// const addNoteButt = notesContainer.querySelector(".add-note");
// addNoteButt.addEventListener("click", () => addNote());
// function addNote() {
// 	const existingNotes = getNotes();
// 	const noteObject = {
// 		id: Math.floor(Math.random() * 100000), content: ""
// 	};

// 	const noteElement = createNote(noteObject.id, noteObject.content);
// 	notesContainer.insertBefore(noteElement, addNoteButt);
// 	existingNotes.push(noteObject);
// 	saveNotes(existingNotes);
// }



// function createNoteElement(id, content) {
//   const element = document.createElement("textarea");
//   element.classList.add("note-text");
//   element.value = content;
//   element.placeholder = "Empty note";
//   element.style.marginBottom = "10px";

//   element.addEventListener("change", () => {
//     updateNote(id, element.value);
//   });

//   element.addEventListener("dblclick", () => {
//     const doDelete = confirm("Are you sure you want to delete?");

//     if (doDelete) {
//       deleteNote(id, element);
//     }
//   });
//   return element;
// }



// function updateNote(id, newContent) {
//   const noteRef = notesRef.child(id);
//   noteRef.update({ content: newContent });
// }


// function saveNotes(notes) {
// 	localStorage.setItem("notess", JSON.stringify(notes));
// }


// const input = document.getElementById("search_input");


// input.addEventListener("input", () => searchFor(input));


//This is the path to the database
// function searchFor(input) {
//   const searchQuery = input.value.toLowerCase();
//   notesRef.once("value", (snapshot) => {
//     const notes = snapshot.val();
//     const filteredNotes = Object.values(notes || {})
//       .filter((note) => note.content.toLowerCase().includes(searchQuery));
//     displayNotes(filteredNotes);
//   });
// }




//This loads in the notes from Firebase
// notesRef.on("value", (snapshot) => {
//   const notes = snapshot.val();
//   displayNotes(notes);
// });




//logout function 
function logout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    window.location.href = "login.html"; // redirect the user to the login page
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}



