import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://endorsements-e65c9-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const writtenEndorsementsRef = ref(database, "endorsementsRef");
const inputFieldEl = document.getElementById("input-el");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const publishButton = document.getElementById("publish");
const endorsementsList = document.getElementById("endorsementsList");
let count = 0;


publishButton.addEventListener("click", function () {
    let fromTextInputValue = fromInput.value;
    let toTextInputValue = toInput.value;
    let inputValue = inputFieldEl.value;

    if (fromTextInputValue === "" || toTextInputValue === "" || inputValue === "") {
        return;
    } else {
        push(writtenEndorsementsRef, {
            from: fromTextInputValue,
            to: toTextInputValue,
            input: inputValue,
      
        });
        clearInputFields();
    }
});

function clearInputFields() {
    inputFieldEl.value = "";
    toInput.value = "";
    fromInput.value = "";
}


onValue(writtenEndorsementsRef, function(snapshot) {
    endorsementsList.innerHTML = "";
    snapshot.forEach(childSnapshot => {
        let currentEndorsementValue = childSnapshot.val();
        endorsementsToHTMLInterface(currentEndorsementValue, childSnapshot.key);
    });
});



function endorsementsToHTMLInterface(inputValue, key) {
    let newContainer = document.createElement("div");

    
    let toEl = document.createElement("p");
    toEl.textContent = `To: ${inputValue.to}`;
     toEl.style.fontWeight = "bold";
  
    
    let messageEl = document.createElement("p");
    messageEl.textContent = inputValue.input;
    
    let fromEl = document.createElement("p");
    fromEl.textContent = `From: ${inputValue.from}`;
    fromEl.style.fontWeight = "bold";
  
    newContainer.appendChild(toEl);
    newContainer.appendChild(messageEl);
    newContainer.appendChild(fromEl);

    endorsementsList.insertBefore(newContainer, endorsementsList.firstChild);
}