var variants = ['select options', 'add to cart', '+add to bag', 'add to bag', 'quick add', 'quick shop',
    'shop now', 'add to basket', 'Grab It', '+ quick add', 'in cart: o/s', 'add to tote']
//---checking if we have a button
const list = document.querySelectorAll(''); //HERE WE SHOULD PUT A SELECTOR
const urlString = `https://${location.host}`;
var click;
let isButton = false;
var originalValue;
var btnHeight;
list.forEach(item=>{
    let text = item.innerHTML.toLowerCase();
    variants.forEach(option =>{
        if(text.includes(option)) {
            isButton = true;
            originalValue = option;
        }
    })
})
async function isClicked(id) {
    let foundId  = await getCartItems();
    let clickId = 0;

    for (let i = 0; i < foundId.items.length; i++) {
        if(foundId.items[i].id==id){
            clickId = foundId.items[i].id;
            break;
        }else {
            clickId = 0;
        }
    }

    return clickId;
}
function findAddToBagElement(element) {
    let children = element.children;
    for (let child of children) {
        if(child.children) {
            let res = findAddToBagElement(child);
            if (res) {
                return res;
            }
        }
        if(child.textContent && variants.includes(child.textContent.toLowerCase().trim())) {
            btnHeight = window.getComputedStyle(child,null).getPropertyValue("height")
            return child;
        }else if(child.value && variants.includes(child.value.toLowerCase())){
            btnHeight = window.getComputedStyle(child,null).getPropertyValue("height")
            return child;
        }else {
            let res = findAddToBagElement(child);
            if (res) {
                return res;
            }
        }
    }
    return null;
}
async function fetchProductId(productId){
    let response = await fetch(productId);
    let data = await response.json()
    return data;
}
async function getCartItems(){
    let response = await fetch(`${urlString}/cart.js`);
    let data = await response.json()
    return data;
}
const quantityButton = (quantity, button, id, value) => {
    var number = quantity;
    if(button && button.tagName === 'INPUT'){
        const btn = document.createElement('button');
        const attr = button.getAttribute('class')
        btn.setAttribute('class', attr);
        btn.style = window.getComputedStyle(button,null);
        btn.style.height = window.getComputedStyle(button,null).getPropertyValue("height")
        if(button.nextElementSibling){
            btn.style.float = 'left';
            const sibling = button.nextElementSibling;
            sibling.style.float = 'right';
            sibling.style.margin = '0';
            btn.style.margin = '0';

        }
        const parentDiv = button.parentNode;
        parentDiv.replaceChild(btn, button);
        button = btn;
        button.textContent = number;
    }
    const originalValue = value;
    if(button && button.getAttribute('type'))button.setAttribute('type','button')
    let minus;
    let plus;

    if(button && button.textContent ){
        button.textContent = number;
    }else if(button && button.getAttribute('value')){
        button.setAttribute('value', number);
    }

    if(button && !button.querySelector('.minus') && !button.querySelector('.plus')){
        minus = document.createElement('button');
        minus.innerHTML = '-';
        minus.setAttribute('class', 'minus');
        plus = document.createElement('button');
        plus.innerHTML = '+';
        plus.setAttribute('class', 'plus');
        button.style.height = btnHeight;

        let widthMinusPlus = window.getComputedStyle(button,null).getPropertyValue("width");
        widthMinusPlus = widthMinusPlus.slice(0,widthMinusPlus.length-2);
        if (widthMinusPlus>100){
            widthMinusPlus = widthMinusPlus/10+'px';
        }else {
            widthMinusPlus = widthMinusPlus+'px';
        }
        minus.style.marginRight = '5px';
        plus.style.marginLeft = '5px';
        minus.style.background = 'transparent';
        plus.style.background = 'transparent';
        minus.style.float = 'left';
        plus.style.float = 'right';
        minus.style.border = 'none';
        plus.style.border = 'none';
        minus.style.width = widthMinusPlus;
        plus.style.width = widthMinusPlus;

        minus.style.position = 'relative';
        plus.style.position = 'relative';
        minus.style.left = '0';
        plus.style.right = '0';
        minus.style.color = window.getComputedStyle(button,null).getPropertyValue("color")
        plus.style.color = window.getComputedStyle(button,null).getPropertyValue("color")
        minus.style.padding = '0';
        plus.style.padding = '0';

        minus.style.display = 'inline';
        plus.style.display = 'inline';

        button.append(minus, plus)
    }else if (button){
        button.style.height = btnHeight;
        minus = button.querySelector('.minus')
        plus = button.querySelector('.plus')
    }

    if(number===1){
        removeAddToCart(id, number);
    }


//listeners
    if (button) {
        button.addEventListener('mouseover', (event) => {
            minus.style.color = window.getComputedStyle(button, null).getPropertyValue("color")
            plus.style.color = window.getComputedStyle(button, null).getPropertyValue("color")
        });
        button.addEventListener('mouseout', (event) => {
            minus.style.color = window.getComputedStyle(button, null).getPropertyValue("color")
            plus.style.color = window.getComputedStyle(button, null).getPropertyValue("color")
        });
        minus.addEventListener('click', (event) => {
            event.preventDefault();
            if (number > 1) {
                --number;
                button.setAttribute('value', number);
                button.textContent = number;
                removeAddToCart(id, number);
                button.append(minus, plus)
            } else if (number === 1) {
                removeAddToCart(id, 0);
                button.setAttribute('value', originalValue);
                while (button.hasChildNodes()) {
                    button.removeChild(button.firstChild);
                }
                button.textContent = originalValue;
                click = id;
                setTimeout(function () {
                    click = id;
                    number = 0;
                }, 900)

                button.addEventListener('click', () => {
                    if (number === 0) {
                        number = 1;
                        button.setAttribute('value', number);
                        button.textContent = number;
                        removeAddToCart(id, 1);
                        button.append(minus, plus)
                    }
                })
            }
        });


        plus.addEventListener('click', (event) => {
            event.preventDefault();

            let amount = number + 1;
            number = amount;
            button.setAttribute('value', amount);
            button.textContent = amount;
            removeAddToCart(id, amount);
            button.append(minus, plus)
        });
    }
};
const quantityButtonNewButton = (number, box, id) => {
    const btn = box.querySelector('.btn-list');
    btn.style.display = 'none';
    //--creating
    const container = document.createElement('div');
    container.setAttribute('class', 'btn-container');
    const minus = document.createElement('button');
    minus.innerHTML = '-';
    const plus = document.createElement('button');
    plus.innerHTML = '+';
    const quantity = document.createElement('input');
    quantity.setAttribute('value', number);
    quantity.setAttribute('type', 'text');
    quantity.readOnly = true;

    let imgBox = box.querySelector('a').parentElement;
    const containerStyle = `
        position : absolute;
        background: white;
        left : 0;
        top : 0;
        width : 100%;
        height : 10%;
        min-height: 25px;
        white-space : nowrap;
        border : 1px solid black;
        padding : 0;
        text-align : center;
        display : none;
        align-items : center;
        z-index: 2;
       `;
    container.setAttribute("style", containerStyle);

    const minusStyle = `
        background : transparent;
        padding : 0;
        border : none;
        outline : none;
        width : 20%;    
        position : relative;
        color: black;
        display : inline-flex;
        cursor : pointer;
        place-content : center;
       `;
    minus.setAttribute("style", minusStyle);

    const plusStyle = `
        background : transparent;
        padding : 0;
        border : none;
        outline : none;
        width : 20%;    
        position : relative;
        color: black;
        display : inline-flex;
        cursor : pointer;
        place-content : center;
       `;
    plus.setAttribute("style", plusStyle);

    const quantityStyle = `
        display : inline-flex;
        text-decoration : none;
        text-align : center;
        border-width : initial;
        border-style : none none hidden;
        border-color : initial;
        border-image : initial;
        vertical-align : middle;
        outline : none;
        width : 60%; 
        height : 40% !important;
        min-height : 10px !important;
        background: white;
        margin : 0;
       `;
    quantity.setAttribute("style", quantityStyle);

    box.style.textAlign = 'center';
    box.style.display = 'border-box';

    container.append(minus, quantity, plus);
    imgBox.insertBefore(container, imgBox.childNodes[-1]);

//listeners
    window.addEventListener("resize", ()=>{
        container.style.height = '10%';
        container.style.width = '100%';
        quantity.style.height = '40%';
    });

    minus.addEventListener('click', () => {
        if(number>1){
            number--;
            quantity.setAttribute('value', number);
            removeAddToCart(id, number);
        } else if(number===1){
            removeAddToCart(id, 0);
            quantity.setAttribute('value', 'add to bag');
            imgBox.removeChild(container);
            btn.style.display = 'block';
        }
    });
    plus.addEventListener('click', (event) => {
        event.cancelBubble = true;
        event.stopPropagation();
        number++;
        quantity.setAttribute('value', number);
        removeAddToCart(id, number);
    });
};
const removeAddToCart = (id, quantity) => {
    const urlString = `https://${location.host}`;
    setTimeout(function () {
        fetch(`${urlString}/cart/update.js`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                updates: {
                    [id]: quantity
                }
            })
        });
    }, 1000)

};

//------------in case we have a button-------------------------------------------------------------
smartButtonTrue =  (list) => {
    getCartItems()
        .then(data=>{
            if (data.items.length>0) {
                list.forEach(item => {
                    let text = item.innerHTML.toLowerCase();
                    data.items.forEach(option => {
                        if (text.includes(option.handle)) {
                            quantityButton(option.quantity,
                                findAddToBagElement(item),
                                option.id, originalValue)
                        }
                    });
                });
            }
        })

    list.forEach( async item =>  {
        const btn = findAddToBagElement(item);
        if(btn && btn.getAttribute('onclick'))btn.removeAttribute('onclick')
        if(btn && btn.getAttribute('type'))btn.setAttribute('type','button')

        // try {
        let productId = item.querySelectorAll('a');
        productId = [...productId];
        let newProductId;
        for (let i = 0; i < productId.length ; i++) {
            if(productId[i].href.includes('products')){
                if (productId[i].href.includes('?variant')){
                    const ind = productId[i].href.indexOf('?variant');
                    newProductId = productId[i].href.slice(0,ind) + '.js';
                    break;
                }else {
                    newProductId = productId[i].href + '.js';
                    break;
                }
            }
        }
        const id = await fetchProductId(newProductId)
            .then(res=>{
                return res.variants[0].id;
            })

        if(btn != null && btn.children.length == 0) {
            btn.addEventListener('click', async (event) => {
                click = await isClicked(id);

                if ( click === 0) {
                    setTimeout(function () {
                        quantityButton(1, btn, id, originalValue)
                    }, 1000)
                }
            });
        }
    });
};
//-----------------------in case we don't have a button-----------------------------------------
smartButtonFalse = (list) => {
    // var btnHeight;
    getCartItems()
        .then(data=>{
            if (data.items.length>0) {
                list.forEach((item, index) => {
                    let text = item.innerHTML.toLowerCase();
                    data.items.forEach(option => {
                        if (text.includes(option.handle)) {
                            quantityButtonNewButton(option.quantity,
                                item,
                                option.id)
                        }
                    });
                });
            }
        })

    list.forEach((item) => {
        let imgBox = item.querySelector('a').parentElement;
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btn-list');
        btn.innerHTML = 'add to bag';
        const btnStyle = `
        position: absolute;
        border : 1px solid black;
        background-color: white;
        width : 100%;
        height : 10%;
        min-height: 25px;
        top : 0;
        padding : 3px;
        cursor : pointer;
        color : black; 
        display : none;     
        z-index: 2; 
       `;
        window.addEventListener("resize", ()=>{
            btn.style.height = '10%';
            btn.style.width = '100%';
        });
        btn.setAttribute("style", btnStyle);

        imgBox.insertBefore(btn, imgBox.childNodes[-1]);

        let productId = item.querySelector('a').href;
        if(productId.includes('?')){
            const ind = productId.indexOf('?')
            productId = productId.slice(0,ind)+'.js';
        }else {
            productId = productId+ '.js';
        }

        fetch(productId)
            .then(res=>res.json())
            .then(data=>{
                if(!data.variants[0].available){
                    btn.innerHTML = 'sold out';
                    btn.disabled = true;
                    btn.style.cursor = 'context-menu';
                }
            })

        item.addEventListener('mouseenter', () => {
            let activeBtnContainer = item.querySelector('.btn-container');
            let activeBtnList = item.querySelector('.btn-list');

            if(activeBtnContainer === null){
                activeBtnList.style.display = 'block';
            }else  if (activeBtnContainer != null){
                activeBtnContainer.style.display = 'flex';
            }

        })

        item.addEventListener('mouseleave', () => {
            let activeBtnContainer = item.querySelector('.btn-container');
            let activeBtnList = item.querySelector('.btn-list');

            let styleActiveBtn = window.getComputedStyle(activeBtnList,null);
            styleActiveBtn = styleActiveBtn.display;


            if(styleActiveBtn === 'none'){
                activeBtnContainer.style.display = 'none';
            }else  if (styleActiveBtn === 'block'){
                activeBtnList.style.display = 'none';
            }
        })

        btn.addEventListener('click', () => {
            fetch(productId)
                .then(res=>res.json())
                .then(data=>{
                    removeAddToCart(data.variants[0].id,1);
                    quantityButtonNewButton(1,item,data.variants[0].id)
                })
        });
    });
};

if(isButton){
    smartButtonTrue(list, urlString);
}else {
    smartButtonFalse(list, urlString);
}

//TODO
//1. check resize width and height
