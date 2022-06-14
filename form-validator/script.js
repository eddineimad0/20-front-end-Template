const form=document.getElementById("main-form");
const password1EL=document.getElementById("password1-input");
const password2EL=document.getElementById("password2-input");
const message=document.getElementById('message');
const messageContainer=document.querySelector(".message-container");

let isValid=false;
let passwordsMatch=false;

function validateForm(){
    isValid=form.checkValidity();
    if(!isValid){
        message.textContent="please fill out all fields"
        message.style.color="red";
        messageContainer.style.borderColor="red";
        return;
    }
    if(password1EL.value=password2EL.value){
        passwordsMatch=true;
        password1EL.style.borderColor="green";
        password2EL.style.borderColor="green";
    }else{
        passwordsMatch=false;
        message.textContent="Make sure passwords match";
        message.style.color="red";
        messageContainer.style.borderColor="red";
        password1EL.style.borderColor="red";
        password2EL.style.borderColor="red";
        return;
    }
    if(isValid && passwordsMatch){
        message.textContent="Successfully Registered";
        message.style.color="green";
        messageContainer.style.borderColor="green";
    }
}



function processFormData(event){
    event.preventDefault();
    //validate Form
    validateForm();

}
// Event Listener
form.addEventListener('submit',processFormData);