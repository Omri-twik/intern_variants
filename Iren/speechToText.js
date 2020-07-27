var variants = ['form[action ="/search"]', 'form[action ="/pages/search-results"]', 'form[action ="/pages/search"]'];

let foundInputParent;
variants.forEach(item=>{
    foundInputParent = document.querySelector(item);
})
 if(!foundInputParent) foundInputParent = document.querySelector('input').parentElement;
if(foundInputParent)console.log(foundInputParent)

const inputs = foundInputParent.childNodes;
const inputs2 = foundInputParent.children;
console.log(inputs, 'INPUTS')
console.log(inputs2, 'INPUTS2')
let input;

inputs.forEach(item=>{
    if(item.tagName === 'INPUT'){
        console.log(item, 'ITEM')
        const className = item.getAttribute('class');
        const idName = item.getAttribute('id');
        const placeholderName = item.getAttribute('placeholder');
        console.log(className , idName, placeholderName)
        let res = [];
        if(className)res.push(className);
        if(idName)res.push(idName ,);
        if(placeholderName)res.push(placeholderName);
        console.log(res, 'RES')

        console.log(res.includes('search'), 'res.includes(\'search\')')
        console.log(res.includes('Search'), 'res.includes(\'Search\')')


        if(res && (res.includes('search') || res.includes('Search'))){
            console.log(item, 'ITEM')
            console.log(item.tagName)
        }
    }
})





inputs2.forEach(item=>{
    console.log(item, 'ITEM')
})


const inputCss = window.getComputedStyle(input,null);
console.log(inputParent)

let nextSibling = input.nextElementSibling;
console.log(nextSibling)

let inpHeight = inputCss.height;
inpHeight = inpHeight.slice(0,inpHeight.indexOf('px'));
inpHeight = inpHeight - 10;

let inpRight;
if(nextSibling) {
    let nextSiblingStyle = window.getComputedStyle(nextSibling,null);
    console.log(nextSibling.offsetWidth, 'offsetWidth')
    console.log(nextSiblingStyle.width, 'width')
    inpRight = nextSiblingStyle.width;
}else {
    inpRight = '0px';
}

const micButton = document.createElement('button');
micButton.setAttribute('class', 'btn-start');
const micButtonStyle = `
    // width: ${inpHeight}px;
    // height: ${inpHeight}px;
    width: 10%;
    height: 80%;
    position: absolute;
    top: 0;
    right: ${inpRight};
    background-color: ${inputCss.backgroundColor};
    border : ${inputCss.border};
    box-shadow: ${inputCss.boxShadow};
    border-radius : ${inputCss.borderRadius};
    min-height: ${inputCss.minHeight};
    text-align: center;
    display: inline-flex;
    place-content: center;
    vertical-align: middle;
    border-left: none;
    padding: 0;
    padding-top: 5px;
       `;
micButton.setAttribute("style", micButtonStyle);
const img = document.createElement('img');
img.setAttribute('src', 'https://image.flaticon.com/icons/svg/709/709682.svg');

const imgStyle = `
        width : ${inpHeight-5}px;   
        max-width:  ${inputCss.height} !important; 
       `;
img.setAttribute("style", imgStyle);
micButton.appendChild(img);
inputParent.appendChild(micButton);


const cancelBox = document.createElement('button');
cancelBox.setAttribute('class', 'btn-end');
cancelBox.setAttribute("style", micButtonStyle);
const imgStop = document.createElement('img');
imgStop.setAttribute('src', 'https://image.flaticon.com/icons/svg/148/148745.svg');
imgStop.setAttribute("style", imgStyle);
cancelBox.appendChild(imgStop);
cancelBox.style.display = 'none';
inputParent.appendChild(cancelBox);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = 'en-US';

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result=>result[0])
        .map(result=>result.transcript)
        .join('');
    console.log(transcript);
    input.value = transcript;
});

micButton.addEventListener('click', (event)=>{
    event.preventDefault();
    micButton.style.display = 'none';
    cancelBox.style.display = 'inline-flex';
    input.value = '';
    recognition.start();
})
cancelBox.addEventListener('click', (event)=>{
    event.preventDefault();
    cancelBox.style.display = 'none';
    micButton.style.display = 'inline-flex';

    recognition.stop();
})
