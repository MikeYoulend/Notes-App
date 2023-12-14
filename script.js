const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
	notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
	localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
	let inputBox = document.createElement("p");
	let img = document.createElement("img");
	inputBox.className = "input-box";
	inputBox.setAttribute("contenteditable", "true");
	img.src = "images/delete.png";
	notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", function (e) {
	if (e.target.tagName === "IMG") {
		e.target.parentElement.remove();
		updateStorage();
	} else if (e.target.tagName === "P") {
		notes = document.querySelectorAll(".input-box");
		notes.forEach((nt) => {
			nt.onkeyup = function () {
				updateStorage();
			};
		});
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Enter" && event.target.classList.contains("input-box")) {
		// Crea un'interruzione di linea
		const selection = window.getSelection();
		const range = selection.getRangeAt(0);
		const br = document.createElement("br");
		range.deleteContents();
		range.insertNode(br);

		// Crea un nuovo range dopo l'interruzione di linea e imposta il cursore lì
		range.setStartAfter(br);
		range.setEndAfter(br);
		selection.removeAllRanges();
		selection.addRange(range);

		event.preventDefault();
	}
});
