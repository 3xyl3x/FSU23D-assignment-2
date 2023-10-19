document.addEventListener("DOMContentLoaded", function(e) {
    
    document.querySelector("#contactCreate").addEventListener("click", handleContactCreate);
    document.querySelectorAll('.validate').forEach(input => {
        input.addEventListener('input', event => validate(event.target, event.target.dataset.validationType));
    });
    


    // Add listener to contactList since list elements are dynamicly added
    document.getElementById('contactList').addEventListener('click', function(event) {


        // Edit contact element
        if (event.target.classList.contains('contactEdit')) {
            handleContactEdit(event);
        }

        // Delete contact element
        if (event.target.classList.contains('contactDelete')) {
        
            handleContactDelete(event);
        }
    });

    
});

function handleContactDelete(event) {
    let contactElement = event.target.closest('li');

    contactElement.remove();
}

function handleContactEdit(event) {
    let contactElement = event.target.closest('li');
    let inputFields= contactElement.querySelectorAll('input');
    let contactEditButton = event.target;
    let contactEditMode = contactEditButton.getAttribute("data-mode");

    switch(contactEditMode) {
        case "edit":
            contactEditButton.setAttribute("data-mode","save");
            contactEditButton.classList.remove("btn-warning");
            contactEditButton.classList.add("btn-success");
            console.log(contactEditButton.classList);
            contactEditButton.innerHTML="Spara";
            inputFields.forEach(input => input.disabled = false);
        break;
        case "save":
            contactEditButton.setAttribute("data-mode","edit");
            contactEditButton.classList.remove("btn-success");
            contactEditButton.classList.add("btn-warning");
            contactEditButton.innerHTML="Ändra";
            inputFields.forEach(input => input.disabled = true);
        break;
    }

    
}


function handleContactCreate() {
    let name,tel,errors,alertElement;
    name=document.querySelector("#inputName");
    tel=document.querySelector("#inputTel");
    alertElement = document.querySelector('#contactCreateAlert');
    errors=[];

    if (name.getAttribute("data-validated")!=="true"){
        // Set error border, necessary if no input
        inputSetBorder(name,"danger");
        errors.push("Ange ett korrekt namn!");
    }
    if (tel.getAttribute("data-validated")!=="true"){
        // Set error border, necessary if no input
        inputSetBorder(tel,"danger");
        errors.push("Ange ett korrekt telefonnummer!");
    }

    // No errors
    if(errors.length===0){
        // Add the contact
        contactListAdd(name.value,tel.value);
        // Hide error element
        alertElement.classList.add("d-none");

        // Clear input values
        name.value="";
        tel.value="";

        // Clear input borders
        inputSetBorder(name,"normal");
        inputSetBorder(tel,"normal");

        // clear validation
        name.setAttribute("data-validated",false);
        tel.setAttribute("data-validated",false);
    } else {
        // Show error element
        alertElement.classList.remove("d-none");
        // Output errors
        alertElement.innerHTML=errors.join("<br>");
    }
    
}




// Function: Load contactlist from local storage
function contactListLoad() {

}

// Function: Save contactlist to local storage
function contactListSave() {

}

// Function: Add contact to list
function contactListAdd(name,tel) {
    // Get contactList element
    let contactList = document.getElementById("contactList");
    // Create a clone of contact element
    let clonedElement = document.getElementById("contactElementTemplate").cloneNode(true);

    // Set new ID
    clonedElement.id = "newContact"; 

    // Make it visible by removing hide-class
    clonedElement.classList.remove("d-none");
    
    // Add name and telephone to the inputs
    clonedElement.querySelector("input.editName").value = name;
    clonedElement.querySelector("input.editTel").value = tel;

    // Set contactID
    clonedElement.setAttribute("data-contactID", "custom-value");

    contactList.appendChild(clonedElement);
}

// Function: Delete contact from list
function contactListDelete() {
    
}

// Function: Delete all contacts
function contactListClear() {
    
}
// Function: Edit contact in list
function contactListEdit() {
    
}


function validate(element,type) {
    let valid = true;
    let value = element.value;
    let pattern="";
    switch (type){
        case "tel":
            pattern=/^(0|\+)[0-9+-]{8,}$/;

        break;
        case "name":
            pattern =/^[\p{L}\s'\-]{3,}$/u;
        break;
    }

    // Test the input value with regular expression
    valid = pattern.test(value);


    if (valid) {
        element.setAttribute("data-validated",true);
        inputSetBorder(element,"success");
    } else {
        element.setAttribute("data-validated",false); 
        inputSetBorder(element,"danger");
    }

    return valid;
}

function inputSetBorder(inputElement,borderType) {
    switch (borderType) {
        case "normal":
            inputElement.classList.remove("border-success");
            inputElement.classList.remove("focus-ring-success");
            inputElement.classList.remove("border-danger");
            inputElement.classList.remove("focus-ring-danger");
        break;
        case "danger":
            inputElement.classList.remove("border-success");
            inputElement.classList.remove("focus-ring-success");
            inputElement.classList.add("focus-ring-danger");
            inputElement.classList.add("border-danger");
        break;
        case "success":
            inputElement.classList.remove("border-danger");
            inputElement.classList.remove("focus-ring-danger");
            inputElement.classList.add("focus-ring-success");
            inputElement.classList.add("border-success");
        break;
    }
}