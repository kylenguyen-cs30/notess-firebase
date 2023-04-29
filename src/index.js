
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
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

function createNote(id, content) {
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
	const notes = getNotes();
	const targetNote = notes.filter(note => note.id == id)[0];
	targetNote.content = newContent;
	saveNotes(notes);
}

//firebase database
function saveNotes(notes) {
	localStorage.setItem("notess", JSON.stringify(notes));
}
//save notes