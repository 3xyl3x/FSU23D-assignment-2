// Wait for DOM to be loaded before adding listeners
document.addEventListener('DOMContentLoaded', function () {
    // Reference to the contactlist
    const contactList = document.getElementById('contactList');    

    // Listeners for create contact and clear list buttons
    document.querySelector('#contactCreate').addEventListener('click', contactCreate);
    document.querySelector('#contactsClear').addEventListener('click', contactListClear);

    // Listener for input on body that targets all inputs with .validate class
    document.body.addEventListener('input', function (event) {
        if (event.target.classList.contains('validate')) {
            validate(event.target);
        }
    });
    
    // Listener for clicks on contactlist made on edit and delete a contact
    contactList.addEventListener('click', function (event) {
        const contactElement = event.target.closest('li');
        if (event.target.classList.contains('contactEdit')) {
            contactEdit(contactElement);
        } else if (event.target.classList.contains('contactDelete')) {
            contactDelete(contactElement);
        }
    });
});


function contactEdit(contactElement) {
    const inputFields = contactElement.querySelectorAll('input');
    const contactEditButton = contactElement.querySelector('.contactEdit');
    const contactEditMode = contactEditButton.dataset.mode;

    // Check which mode button is currently in
    if (contactEditMode === 'edit') {
        // Make inputs editable
        inputFields.forEach(input => (input.disabled = false));
        // Change button to represent save function
        contactEditButton.classList.replace('btn-warning', 'btn-success');
        contactEditButton.querySelector('.editIcon').classList.add("d-none");
        contactEditButton.querySelector('.saveIcon').classList.remove("d-none");
        // Switch to 'save' mode on the button.
        contactEditButton.dataset.mode='save';
    } else if (contactEditMode === 'save') {
        const nameElement = contactElement.querySelector('.inputEditName');
        const telElement = contactElement.querySelector('.inputEditTel');
        const alertElement = contactElement.querySelector('.contactEditAlert');
        let errors = [];

        
        // Check if validation fails.
        if (!validate(nameElement)) {
            errors.push('Ange ett korrekt namn!');
        }
        if (!validate(telElement)) {
            errors.push('Ange ett korrekt telefonnummer!');
        }
        
        // No errors
        if (errors.length === 0) {
            // Hide alert and switch back to 'edit' mode.
            alertElement.classList.add('d-none');
            contactEditButton.dataset.mode='edit';
            contactEditButton.classList.replace('btn-success', 'btn-warning');
            contactEditButton.querySelector('.editIcon').classList.remove("d-none");
            contactEditButton.querySelector('.saveIcon').classList.add("d-none");
            // Disable inputs
            inputFields.forEach(input => (input.disabled = true));
            inputSetBorder(nameElement, 'normal');
            inputSetBorder(telElement, 'normal');
        } else {
            // Show errors.
            alertElement.classList.remove('d-none');
            alertElement.innerHTML = errors.join('<br>');
        }
    }
}


function contactCreate() {
    const nameElement = document.querySelector('#inputName');
    const telElement = document.querySelector('#inputTel');
    const alertElement = document.querySelector('#contactCreateAlert');
    let errors = [];

    // Check if validation fails.
    if (!validate(nameElement)) {
        errors.push('Ange ett korrekt namn!');
    }
    if (!validate(telElement)) {
        errors.push('Ange ett korrekt telefonnummer!');
    }

     // If no errors
    if (errors.length === 0) {
        // Add contact to list
        contactListAdd(nameElement.value, telElement.value);
        // Hide error
        alertElement.classList.add('d-none');
        // Empty inputs
        nameElement.value = '';
        telElement.value = '';
        // Clear borders of inputs 
        inputSetBorder(nameElement, 'normal');
        inputSetBorder(telElement, 'normal');

    } else {
         // Show errors.
        alertElement.classList.remove('d-none');
        alertElement.innerHTML = errors.join('<br>');
    }
}

function contactListAdd(name, tel) {
    // Clone template elment
    const clonedElement = document.getElementById('contactElementTemplate').cloneNode(true);
    
    // Add class
    clonedElement.classList.add('contactElement');
    // Make visible
    clonedElement.classList.remove('d-none');

    // Set the input values from arguments
    clonedElement.querySelector('.inputEditName').value = name;
    clonedElement.querySelector('.inputEditTel').value = tel;
    
    // Append to contactlist
    contactList.appendChild(clonedElement);
    
    // Make sure clear list button is visible
    document.querySelector('#contactsClear').classList.remove('d-none');
}

function contactDelete(contactElement) {
    // Remove element
    contactElement.remove();
    // Hide clear list button if there is no more elements left
    if (document.querySelectorAll('.contactElement').length === 0) {
        document.querySelector('#contactsClear').classList.add('d-none');
    }
}

function contactListClear() {
    // Run delete contact function on all elements with a loop
    const contactElements = contactList.querySelectorAll('.contactElement');
    contactElements.forEach(contactElement => contactDelete(contactElement));
}


function validate(element) {
    // Regex patterns 
    const patterns = {
        'tel': /^(0|\+)[0-9+-]{8,}$/,
        'name': /^[\p{L}\s'\-]{3,}$/u
    };
    // Check which validation type the input element has and use that pattern to test the value. 
    const valid = patterns[element.dataset.validationType].test(element.value);

    // Set the border
    inputSetBorder(element, valid ? 'success' : 'danger');

    // Return valid boolean
    return valid;
}

// Function to set borders (and focus shadows) with bootstrap classes
function inputSetBorder(inputElement, borderType) {
    inputElement.classList.remove('border-success', 'focus-ring-success', 'border-danger', 'focus-ring-danger');
    inputElement.classList.add(`focus-ring-${borderType}`, `border-${borderType}`);
}

