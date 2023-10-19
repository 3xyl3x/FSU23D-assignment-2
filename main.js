document.addEventListener("DOMContentLoaded", function(e) {
    contactListLoad();

    document.querySelector("#contactCreate").addEventListener("click", handleContactCreate);
    
    document.body.addEventListener('input', function (event) {
        if (event.target.classList.contains('validate')) {
            validate(event.target);
        }
    });
    
    // Add listener to contactList since list elements are dynamicly added
    document.getElementById('contactList').addEventListener('click', function(event) {
        const contactElement = event.target.closest('li');
        if (event.target.classList.contains('contactEdit')) {
            handleContactEdit(contactElement);
        } else if (event.target.classList.contains('contactDelete')) {
            handleContactDelete(contactElement);
        }
    });
});

function handleContactDelete(contactElement) {
    // Could do a modal prompt here before calling contactList Delete
    contactListDelete(contactElement);

}

function handleContactEdit(contactElement) {
    const inputFields = contactElement.querySelectorAll('input');
    const contactEditButton = contactElement.querySelector('.contactEdit');
    const contactEditMode = contactEditButton.getAttribute('data-mode');

    if (contactEditMode === 'edit') {
        contactEditButton.setAttribute('data-mode', 'save');
        contactEditButton.classList.replace('btn-warning', 'btn-success');
        contactEditButton.innerHTML = 'Spara';
        inputFields.forEach(input => (input.disabled = false));
    } else if (contactEditMode === 'save') {
        let errors;
        const nameElement=contactElement.querySelector(".inputEditName");
        const telElement=contactElement.querySelector(".inputEditTel");
        const alertElement = contactElement.querySelector('.contactEditAlert');
        validate(telElement);
        validate(nameElement);
        errors=[];
    
        if (nameElement.getAttribute("data-validated")!=="true"){
            errors.push("Ange ett korrekt namn!");
        }
        if (telElement.getAttribute("data-validated")!=="true"){
            errors.push("Ange ett korrekt telefonnummer!");
        }

         if(errors.length===0){
            // Hide error element
            alertElement.classList.add("d-none");
            contactEditButton.setAttribute('data-mode', 'edit');
            contactEditButton.classList.replace('btn-success', 'btn-warning');
            contactEditButton.innerHTML = 'Ändra';
            inputFields.forEach(input => (input.disabled = true));

            // Clear input borders
            inputSetBorder(nameElement,"normal");
            inputSetBorder(telElement,"normal");
            
         } else {
            // Show error element
            alertElement.classList.remove("d-none");
            // Output errors
            alertElement.innerHTML=errors.join("<br>");
         }
    }
}

function handleContactCreate() {
    let errors,alertElement;
    const nameElement=document.querySelector("#inputName");
    const telElement=document.querySelector("#inputTel");
    validate(telElement);
    validate(nameElement);
    alertElement = document.querySelector('#contactCreateAlert');
    errors=[];

    if (nameElement.getAttribute("data-validated")!=="true"){
        errors.push("Ange ett korrekt namn!");
    }
    if (telElement.getAttribute("data-validated")!=="true"){
        errors.push("Ange ett korrekt telefonnummer!");
    }

    // No errors
    if(errors.length===0){
        // Add the contact
        contactListAdd(nameElement.value,telElement.value);
        // Hide error element
        alertElement.classList.add("d-none");

        // Clear input values
        nameElement.value="";
        telElement.value="";

        // Clear input borders
        inputSetBorder(nameElement,"normal");
        inputSetBorder(telElement,"normal");

        // clear validation
        nameElement.setAttribute("data-validated",false);
        telElement.setAttribute("data-validated",false);
    } else {
        // Show error element
        alertElement.classList.remove("d-none");
        // Output errors
        alertElement.innerHTML=errors.join("<br>");
    }
    
}




// Function: Load contactlist from local storage
function contactListLoad() {
    console.log("Load list from localstorage");
}

// Function: Save contactlist to local storage
function contactListSave() {
    console.log("Save list to localstorage");
}

// Function: Add contact to list
function contactListAdd(name,tel) {
    // Get contactList element
    let contactList = document.getElementById("contactList");
    // Create a clone of contact element
    let clonedElement = document.getElementById("contactElementTemplate").cloneNode(true);

    // Make it visible by removing hide-class
    clonedElement.classList.add("contactElement");

    // Make it visible by removing hide-class
    clonedElement.classList.remove("d-none");
    
    // Add name and telephone to the inputs
    clonedElement.querySelector(".inputEditName").value = name;
    clonedElement.querySelector(".inputEditTel").value = tel;

    // Set contactID
    clonedElement.setAttribute("data-contactID", "custom-value");

    contactList.appendChild(clonedElement);

    // Save list
    contactListSave();

    // Show clear button.
    document.querySelector("#contactsClear").classList.remove("d-none");
}

// Function: Delete contact from list
function contactListDelete(contactElement) {
    contactElement.remove();

    // Save list
    contactListSave();

    // Hide clear button if no more contacts
    if (document.querySelectorAll('.contactElement').length===0)
    document.querySelector("#contactsClear").classList.add("d-none");
}

// Function: Delete all contacts
function contactListClear() {

}
// Function: Edit contact in list
function contactListEdit() {

    // Save list
    contactListSave();   
}


function validate(element) {
    type=element.dataset.validationType;
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

    console.log(`validating input. [value=${value}]  [valid=${valid}]`);
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