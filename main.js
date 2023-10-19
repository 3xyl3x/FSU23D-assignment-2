document.addEventListener("DOMContentLoaded", function(e) {
    document.querySelector("#contactCreate").addEventListener("click",function (event) {
        let name,tel;
        name=document.querySelector("#inputName");
        tel=document.querySelector("#inputTel");

        if (name.getAttribute("data-validated")==="true" && tel.getAttribute("data-validated")==="true") {
            contactListAdd(name.value,tel.value);
        } else {
            contactListAdd(name.value,tel.value);
            //alert("Not validated");
        }
        
    });



    // Validate
    document.querySelector(".validate-name").addEventListener("input",function (event) {
        validate(event.target,"name");
    });
    // Validate
    document.querySelector(".validate-tel").addEventListener("input",function (event) {
        validate(event.target,"tel");
    });

    // Add listener to contactList since list elements are dynamicly added
    document.getElementById('contactList').addEventListener('click', function(event) {
        let contactElement = event.target.closest('li');

        // Edit contact element
        if (event.target.classList.contains('contactEdit')) {
            let contactSaveButton = contactElement.querySelector('.contactSave');
            contactSaveButton.classList.remove("d-none");
            event.target.classList.add("d-none");

            contactElement.querySelectorAll('input');
            let inputFields= contactElement.querySelectorAll('input');
            inputFields.forEach(function(input) {
                input.removeAttribute('disabled');
            });
        }

        // Delete contact element
        if (event.target.classList.contains('contactDelete')) {
            contactElement.remove();
        }
    });

    
});



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
    let errorMessage="";
    let pattern="";
    switch (type){
        case "tel":
            pattern=/^(0|\+)[0-9+-]{8,}$/;
            errorMessage ="Ej giltligt telefonnummer";
        break;
        case "name":
            pattern =/^[\p{L}\s'\-]{3,}$/u;
            errorMessage ="Ej giltligt namn";
        break;
    }

    // Test the input value with regular expression
    valid = pattern.test(value);


    if (valid) {
        element.setAttribute("validated",true);
        element.classList.remove("border-danger");
        element.classList.remove("focus-ring-danger");
        element.classList.add("focus-ring-success");
        element.classList.add("border-success");
    } else {
        element.setAttribute("validated",false); 
        element.classList.remove("border-success");
        element.classList.remove("focus-ring-success");
        element.classList.add("focus-ring-danger");
        element.classList.add("border-danger");
    }

    return valid;
}