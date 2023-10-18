document.addEventListener("DOMContentLoaded", function(e) {
    document.querySelector("#contactCreate").addEventListener("click",function (event) {
        let name,tel;
        name=document.querySelector("#inputName");
        tel=document.querySelector("#inputTel");

        if (name.getAttribute("validated")==="true" && tel.getAttribute("validated")==="true") {
            contactListAdd(name.value,tel.value);
        } else {
            alert("Not validated");
        }
        
    });

    document.querySelector(".validate-name").addEventListener("input",function (event) {
        validate(event.target,"name");
    });

    document.querySelector(".validate-tel").addEventListener("input",function (event) {
        validate(event.target,"tel");
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
    console.log(name);
    console.log(tel);
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