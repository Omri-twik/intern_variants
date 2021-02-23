let mailButton;

document.write(`<link rel="stylesheet" type="text/css"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"></link>`);

var style = document.createElement('style');
style.innerHTML = `
@keyframes slide {
    from {height: 0%;}
    to {height: 30%;}
  }

.mailButton {
    background-color: #2821CF;
    color: whitesmoke;
    font-weight: bold;
    position: fixed; 
    z-index: 2;
    left: 10px;
    bottom: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    box-shadow:15px 30px 20px -10px rgba(0, 0, 0, 0.4), inset -20px -40px 40px 30px rgba(0, 0, 0, 0.4);
}  

.sign-up { 
    height: 0%;
    animation-name: slide;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background-color: #060354;
    color: whitesmoke;
    font-family: sans-serif;
    box-shadow: 0px -5px 8px #888888; 
}

#email {
    border-radius: 7px; 
    font-size: 1.3rem; 
    padding: 5px;'
}

#closeSignup {
    position: absolute; 
    left: 5px; 
    top: 5px; 
    border: none; 
    background: none; 
    color: whitesmoke;
}

#signup {
    background: none; 
    border: none;
}
` 
document.getElementsByTagName("head")[0].appendChild(style);

function addMailButton(){
    mailButton = document.createElement('button');
    document.body.append(mailButton);
    mailButton.classList.add('mailButton');
    
    mailButton.innerHTML='<i style="font-size: 2rem;" class="fas fa-envelope-open-text"></i>';
    mailButton.addEventListener('click', addSignupField); 
}

function addSignupField(){
    mailButton.remove();
    signupField = document.createElement('div');
    signupField.classList.add('sign-up');
    document.body.append(signupField);
    signupField.innerHTML=`
    <div style='text-align: center'>
    <button id='closeSignup'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
    <h1>Newsletter Signup</h1> 
    <form id='signupForm'>
        <input type='email'  id = 'email' placeholder='Email Address' name='email_address'>
        <button type='submit'  id ='signup' onclick='signUp()'><i style='color: whitesmoke; font-size: 1.5rem;' class="fas fa-paper-plane"></i></button>
    </form>
    </div>`
    
    document.getElementById('closeSignup').addEventListener('click', closeSignup);
    
    function closeSignup(){
        signupField.remove();
        addMailButton();
    }

}

addMailButton()

function signUp(){
    let email = document.getElementById('email').value;
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == true){

        fetch("https://api.apispreadsheets.com/data/8534/", {
            method: "POST",
            body: JSON.stringify({"data": {"Timestamp": Date(),"Email Address": `${email}`}}),
            
        }).then(res =>{
            console.log('sent');
            if (res.status === 201){
                alert('signup successful')
            }
            else{
                alert('something went wrong, try again')
            }
        })
    } else {
        alert('Invalid email, try again')
    }
};
