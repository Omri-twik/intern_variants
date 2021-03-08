if (window.jQuery) {
    $ = window.jQuery;
    mainJS()
} else {
    var script = document.createElement("SCRIPT");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.type = "text/javascript";
    // this is doc.ready
    //-------------------
    script.onload = function () {
        var $ = window.jQuery;
        mainJS()
    };
    document.getElementsByTagName("head")[0].appendChild(script);
}

function mainJS() {
    let cssStyle = document.createElement('style')
    document.head.appendChild(cssStyle);
    cssStyle.innerHTML = `
        .customSticky {
            background-color: orangered;
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            width: 5vw;
            padding: 0 1vw;
            height: fit-content;
            margin-top: 50%;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            bottom: 0;
            opacity: 1;
            border-radius: 0 10px 10px 0;
            transition: all 0.5s ease-in;
            transform-origin: left;
        }
        
        .expand {
            transition: all 0.5s ease-in;
            transform-origin: left;
            border-radius: 0 5% 5% 0;
            display: flex;
            justify-content: center;
            align-content: center;
        }
        
        .targetElement {
            margin: auto !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
        }
        
        .hide {
            opacity: 0;
        }
        
        .iconCart {
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            position: relative;
            display: inline-block;
            font-size: 30px;
        }
        `
    //replace by your selector
    let selector = '.single_add_to_cart_button'
    //////////

    // Sticky Div
    let customStickyDiv = document.createElement('div');
    customStickyDiv.id = 'customStickyDiv';
    document.body.appendChild(customStickyDiv)
    let targetElement = document.querySelector(selector)
    let rect = targetElement.getBoundingClientRect();
    targetElement.classList.add('targetElement');
    let targetBackground = window.getComputedStyle(targetElement);
    customStickyDiv.style.backgroundColor = targetBackground.getPropertyValue('background-color')

    ////////

    //Stick Div Icon
    let iconCart = document.createElement('span');
    iconCart.classList.add('iconCart');
    customStickyDiv.classList.add('customSticky', 'hide');
    customStickyDiv.appendChild(iconCart);
    // Taking the color from the original button
    let iconColor = targetBackground.getPropertyValue('color')
    //
    let iconSelector = '.single_add_to_cart_button.alt'
    let originalIcon = document.querySelector(iconSelector)

    //function to get the "Hex number"
    function getEntityFromCharacter(character) {
        var hexCode = character.replace(/['"]/g, '').charCodeAt(0).toString(16).toUpperCase();
        while (hexCode.length < 4) {
            hexCode = '0' + hexCode;
        }
        return '\\' + hexCode + ';';
    }
    ///
    let undisplayableCharacter = getComputedStyle(originalIcon, '::before').getPropertyValue('content')
    let hexedIcon = getEntityFromCharacter(undisplayableCharacter)
    let hexedString = `'${hexedIcon}'`
    let pureStringHexedNumber = hexedString.replace(/;/g, "")
    //Adding the Icon "parsed" and color with pseudo element
    document.head.insertAdjacentHTML('beforeend', `
            <style>
                .iconCart:before {
                    content: ${pureStringHexedNumber};
                    color: ${iconColor}
                }
            </style>
        `)
    ////////

    //cloning the selector to avoid the removechild to remove the main selector via DOM
    let clonedSelector = $(targetElement).clone(true)
    //returns if the object is the client view
    function isItVisible(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    };

    document.addEventListener("scroll", function () {
        if (isItVisible(targetElement)) {
            customStickyDiv.classList.add('hide');
        } else {
            customStickyDiv.classList.remove('hide');
        }
    });

    $(clonedSelector).click(function () {
        $(targetElement).click()
    })

    customStickyDiv.addEventListener('mouseenter', event => {
        customStickyDiv.classList.add('expand');
        setTimeout(function () {
            document.querySelector('.expand').style.width = `${rect.width + 20}px`;
            document.querySelector('.expand').style.height = `${rect.height + 20}px`;
            $(customStickyDiv).append(clonedSelector)
        }, 400);
        iconCart.style.visibility = 'hidden';
    })

    customStickyDiv.addEventListener('mouseleave', event => {
        customStickyDiv.classList.remove('expand');
        customStickyDiv.style.removeProperty('width');
        customStickyDiv.style.removeProperty('height');
        clonedSelector.remove()
        iconCart.style.visibility = 'visible';
    })
}