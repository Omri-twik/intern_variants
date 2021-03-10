let mailButton;


let backColor = 'navy';
let buttonSide = 'left';
let buttonVerticalPostion = '80%';


if (window.jQuery) {
    $ = window.jQuery;
    main();
} else {
    var script = document.createElement("SCRIPT");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.type = "text/javascript";
    script.onload = function() {
        var $ = window.jQuery;
        main();
    };
    document.getElementsByTagName("head")[0].appendChild(script);
};


function main(){
    addFont();
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
        <div style='text-align: center'>
        <button id='closeSignup1'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
        <h1 style='color: whitesmoke;' >Newsletter Signup</h1> 
        <form id='signupForm'>
            <input type='email' style='background-color: whitesmoke;' id = 'email' placeholder='Email Address' name='email_address'>
            <button type='submit'  id ='signup'><i style='color: whitesmoke; font-size: 1.5rem;' class="fas fa-paper-plane"></i></button>
        </form>
        </div>`;

    document.querySelector("#signup").addEventListener("click", signUp);
    document.querySelector('#closeSignup1').addEventListener('click', closeSignup);
        
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
        fetch("https://api.apispreadsheets.com/data/8534/", {
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
                    <div style='text-align: center'>
                    <button id='closeSignup2'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
                    <h1 style='color: whitesmoke;'> <b> Thank You </b> </h1> 
                    <h4>You have been successfully added to our mailing list</h4> 
                    <h5 style='color: whitesmoke;'>Signed up by accident? <a style='text-decoration: underline;' id='unsubscribe'>Unsubscribe</a> </h5>
                    </div>`;
                    document.querySelector('#closeSignup2').addEventListener('click', closeSignup);
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

    fetch(`https://api.apispreadsheets.com/data/8534/?query=deletefrom8534whereTimestamp='${timeNow}'`).then(res=>{
        console.log(res);
        if (res.status === 200){
            console.log('unsubscribed');
            signupField.innerHTML=`
                    <div style='text-align: center'>
                    <button id='closeSignup3'><i style="font-size: 1.5rem;" class="fas fa-times"></i></button>
                    <h3 style='margin-top: 30px;' >You have successfully unsubscribed</h3>
                    </div>`;
                    document.querySelector('#closeSignup3').addEventListener('click', closeSignup);

        }
        else{
            alert('There was an issue... unsubscribe failed');
        }
    })

};


function addFont(){
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
        color: whitesmoke;
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
        height: 0%;
        animation-name: slide;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-timing-function: ease;
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        padding-top: 20px;
        background-color: ${backColor};
        color: whitesmoke !important;
        font-family: sans-serif;
        box-shadow: 0px -5px 8px #888888; 
    }

    #email {
        border-radius: 7px; 
        font-size: 1.3rem; 
        padding: 5px;'
    }

    #closeSignup1, #closeSignup2, #closeSignup3 {
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
};