/* This script adds an email signup form to your webpage. It attaches a floating button 
in the position of your choice that slides up the signup form from the bottom of the page
when clicked. The script uses the apispreadsheets.com api to automatically add the email 
address entered to the google sheet of your choice. You must first configure the connection 
to your google sheet at apispreadsheets.com in order to use this script. */

/* Enter the four-digit file id from apispreadsheets.com for the google sheet that you would 
like to save the email addresses to: */
let apiSpreadsheetsFileId = 'ENTER FOUR DIGIT FILE ID IN THESE QUOTES'; //Example: '8534'


//Choose your coloring and position options below:
let backColor = 'ENTER A BACKGROUND COLOR FOR YOUR EMAIL BUTTON AND FORM HERE'; //Example: 'navy'
let textColor = 'ENTER A COLOR FOR TEXT AND ICONS'; //Example: 'whitesmoke'

//Choose which side of the screen you would like your floating button to appear on:
let buttonSide = 'left'; //you can switch 'left' to 'right' if you would prefer

//Choose how far down the screen you would like your button to appear, 0% would be the top of the screen and 100% would hide it below the bottom
let buttonVerticalPostion = '80%'; // you can replace 80% with the percentage of your choice


//--------------------------------------------------------------------------------------------------------------

let mailButton;

function main(){
    loadIcons();
    addStyle();
    addMailButton();
};


function addMailButton(){
    mailButton = document.createElement('button');
    document.body.append(mailButton);
    mailButton.classList.add('mailButton');
    mailButton.innerHTML='<i style="font-size: 2rem;" class="fas fa-envelope-open-text"></i>';
    mailButton.addEventListener('click', addSignupField); 
};


function addSignupField(){
    mailButton.remove();
    signupField = document.createElement('div');
    signupField.classList.add('sign-up');
    document.body.append(signupField);
    signupField.innerHTML=`
        <button class='xout' onclick='closeSignup()'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
        <h1 style='color: ${textColor};' >Newsletter Signup</h1> 
        <form id='signupForm'>
            <input type='email' style='background-color: whitesmoke;' id = 'email' placeholder='Email Address' name='email_address'>
            <button type='submit'  id ='signup'><i style='color: ${textColor}; font-size: 1.5rem;' class="fas fa-paper-plane"></i></button>
        </form>`;

    document.querySelector("#signup").addEventListener("click", signUp);
};


function closeSignup(){
    signupField.remove();
    addMailButton();
};


var timeNow = Date.now();


function signUp(e){
    e.preventDefault();
    let email = document.getElementById('email').value;
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == true){
        fetch(`https://api.apispreadsheets.com/data/${apiSpreadsheetsFileId}/`, {
            method: "POST",
            body: JSON.stringify(
                {"data": {
                    "Timestamp": timeNow,
                    "Email Address": `${email}`
                    }
                })
            
        }).then(res =>{
            if (res.status === 201){
                signupField.innerHTML=`
                    <button class='xout' onclick='closeSignup()'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
                    <h3 style='color: ${textColor};'> <b> Thank You </b> </h3> 
                    <h4>You have been successfully added to our mailing list</h4>
                    <h5 style='color: ${textColor};'>Signed up by accident? <a style='text-decoration: underline;' id='unsubscribe'>Unsubscribe</a> </h5>`;
                    document.querySelector('#unsubscribe').addEventListener('click', unsubscribe);
            }
            else{
                alert('something went wrong, try again')
            }
        })
    } else {
        alert('Invalid email, try again')
    }
};


function unsubscribe(){
    fetch(`https://api.apispreadsheets.com/data/${apiSpreadsheetsFileId}/?query=deletefrom${apiSpreadsheetsFileId}whereTimestamp='${timeNow}'`).then(res=>{
        console.log(res);
        if (res.status === 200){
            signupField.innerHTML=`
                    <button class='xout' onclick='closeSignup()'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
                    <h3>You have successfully unsubscribed</h3>`;
        }
        else{
            alert('There was an issue... unsubscribe failed');
        }
    })
};


function loadIcons(){
    var cssId = 'myCss'; 
    if (!document.getElementById(cssId)){
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css';
        link.media = 'all';
        head.appendChild(link);
    }
};


function addStyle(){
    var style = document.createElement('style');
    style.innerHTML = `
    @keyframes slide {
        from {height: 0%;}
        to {height: 30%;}
    }

    .mailButton {
        background-color: ${backColor};
        color: ${textColor};
        font-weight: bold;
        position: fixed; 
        z-index: 999;
        ${buttonSide}: 10px;
        top: ${buttonVerticalPostion};
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        box-shadow:15px 30px 20px -10px rgba(0, 0, 0, 0.4);
    }  

    .sign-up { 
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        height: 0%;
        animation-name: slide;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-timing-function: ease;
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background-color: ${backColor};
        color: ${textColor} !important;
        font-family: sans-serif;
        box-shadow: 0px -5px 8px #888888; 
    }

    #email {
        border-radius: 7px; 
        font-size: 1.3rem; 
        padding: 5px;'
    }

    .xout {
        position: absolute; 
        left: 5px; 
        top: 5px; 
        border: none; 
        background: none; 
        color: ${textColor};
    }

    #signup {
        background: none; 
        border: none;
    }` 
    document.getElementsByTagName("head")[0].appendChild(style);
};


main();