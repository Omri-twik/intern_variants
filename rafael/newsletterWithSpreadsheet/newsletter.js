let toggleForm = document.getElementById("toggleForm");
let form = document.createElement("form");
let input = document.createElement("input");
// let successMsg = document.createElement("span")
// successMsg.innerText = "thank you for submiting your email"
// let failMsg = document.createElement("span")
// successMsg.innerText = "something went wrong, please try again"
input.type = "email";
input.required = true;
input.name = "email_field";
input.id = "email_value";
input.classList.add("newsleterFormInput");
input.placeholder = "please type your email here";
let button = document.createElement("input");
button.type = "submit";
button.id = "submit-id";
button.classList.add("newsleterFormButton");
button.innerHTML = "Submit";
toggleForm.appendChild(form);
form.appendChild(input);
form.appendChild(button);
button.addEventListener("click", function(event){
    event.preventDefault();
    let dataForm = document.getElementById("email_value").value;
    let url = 'https://api.apispreadsheets.com/data/8547/'
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({"data": {"email_users":dataForm}}),
    })
    .then(res => {
        if (res.status === 201) {
            alert('thank you for submiting your email')
            document.getElementById("email_value"). value= ''
            toggleForm.classList.add("hide")
        } else {
            alert('something went wrong, please try again')
            document.getElementById("email_value"). value= ''
            toggleForm.classList.add("hide");
        }
    })
});

const newsletterTogg = () => {
    let toggleForm = document.getElementById("toggleForm");
    if (toggleForm.classList.contains("hide")) {
        toggleForm.classList.remove("hide");
    } else {
        toggleForm.classList.add("hide");
    }
};