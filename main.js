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
        contactEditButton.classList.replace('btn-warning', 'btn-success');
        contactEditButton.querySelector('.editIcon').classList.add("d-none");
        contactEditButton.querySelector('.saveIcon').classList.remove("d-none");
        // Switch to 'save' mode.
        contactEditButton.dataset.mode='save';
    } else if (contactEditMode === 'save') {
        const nameElement = contactElement.querySelector('.inputEditName');
        const telElement = contactElement.querySelector('.inputEditTel');
        const alertElement = contactElement.querySelector('.contactEditAlert');
        const errors = [];

        // Validate name and telephone.
        validate(telElement);
        validate(nameElement);

        
        // Check if validation fails.
        if (nameElement.dataset.validated !== 'true') {
            errors.push('Ange ett korrekt namn!');
        }
        if (telElement.dataset.validated !== 'true') {
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
    const errors = [];

    // Validate name and telephone.
    validate(nameElement);
    validate(telElement);

    // Check if validation fails.
    if (nameElement.dataset.validated !== 'true') {
        errors.push('Ange ett korrekt namn!');
    }
    if (telElement.dataset.validated !== 'true') {
        errors.push('Ange ett korrekt telefonnummer!');
    }
     // No errors
    if (errors.length === 0) {
        contactListAdd(nameElement.value, telElement.value);
        alertElement.classList.add('d-none');
        nameElement.value = '';
        telElement.value = '';
        inputSetBorder(nameElement, 'normal');
        inputSetBorder(telElement, 'normal');
        nameElement.dataset.validated=false;
        telElement.dataset.validated=false;
    } else {
         // Show errors.
        alertElement.classList.remove('d-none');
        alertElement.innerHTML = errors.join('<br>');
    }
}

function contactListAdd(name, tel) {
    const clonedElement = document.getElementById('contactElementTemplate').cloneNode(true);
    
    clonedElement.classList.add('contactElement');
    clonedElement.classList.remove('d-none');

    clonedElement.querySelector('.inputEditName').value = name;
    clonedElement.querySelector('.inputEditTel').value = tel;
    
    contactList.appendChild(clonedElement);
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
    // Run delete contact function on all elements
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
    // Set the attribute to the result
    element.dataset.validated=valid;
    inputSetBorder(element, valid ? 'success' : 'danger');
}

function inputSetBorder(inputElement, borderType) {
    inputElement.classList.remove('border-success', 'focus-ring-success', 'border-danger', 'focus-ring-danger');
    inputElement.classList.add(`focus-ring-${borderType}`, `border-${borderType}`);
}

