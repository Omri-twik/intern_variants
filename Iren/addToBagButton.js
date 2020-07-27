var companyName = window.location.href;
let ind = companyName.indexOf('com') + 3;
companyName = companyName.slice(0, ind);
console.log(companyName);
var tagWithClass = 'LI.ais-Hits-item'; // Here the place to put tag name and class name of the grid

var sizeList = ['3XS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', 'Extra Small', 'Small',
    'Medium', 'Large', 'Extra Large', 'Extra Extra Large'
];

const itemList = document.querySelectorAll(tagWithClass);
console.log(itemList)

for (let i = 0; i < itemList.length; i++) {
    let itemListArr = itemList[i].querySelector("a")?.href?.split("/");
    console.log(itemListArr)
    if (!itemListArr) {
        break;
    }
    let itemName = itemListArr[itemListArr.length - 1];
    console.log("item name", itemName);

    const container = document.createElement("div");
    const btn = document.createElement("button");
    btn.innerHTML = "<img src='https://image.flaticon.com/icons/svg/126/126063.svg'/>";


    container.appendChild(btn);
    const select = document.createElement("select");

    (function(select) {
        fetch(`${companyName}/products/${itemName}.js`)
            .then(data => data.json())
            .then(res => {
                console.log(res)
                console.log(res.variants)
                if (res.variants.length > 1) {
                    res.variants.forEach((variant, index) => {
                        if (index === 0) {
                            const option = document.createElement("option");
                            option.innerHTML = "Select";
                            option.setAttribute("value", " ");
                            select.appendChild(option);
                            select.style.display = 'none';
                        }
                        if (variant.available) {
                            if (isNaN(Number(variant.option1)) && !sizeList.includes(variant.option1)) {
                                const option = document.createElement("option");
                                option.innerHTML = variant.option2;
                                option.setAttribute("value", variant.option2);
                                select.appendChild(option);
                                select.style.display = 'none';
                            } else {
                                const option = document.createElement("option");
                                option.innerHTML = variant.option1;
                                option.setAttribute("value", variant.option1);
                                select.appendChild(option);
                                select.style.display = 'none';
                            }
                        }
                    });
                } else {
                    select.style.display = 'none';
                }
            });
    })(select);

    btn.style.display = 'block';
    btn.addEventListener("click", (e) => {
        if (!select.hasChildNodes()) {
            select.style.display = 'none';
            addToCard(itemName);
        } else {
            btn.style.display = 'none';
            select.style.display = 'block';

            select.addEventListener('change', (e) => {
                addToCard(itemName, select.value);
                btn.style.display = 'block';
                select.style.display = 'none';
            })
        }
    })
    container.appendChild(select);

    container.style.display = 'none';
    itemList[i].insertBefore(container, itemList[i].childNodes[-1]);

    itemList[i].addEventListener('mouseenter', () => {
        container.style.display = 'block';
    })

    itemList[i].addEventListener('mouseleave', () => {
        container.style.display = 'none';
    })

    //css transition
    btn.style.transition = 'width 2s, height 4s';
    select.style.transition = 'width 2s, height 4s';

    //css container
    container.style.zIndex = '999';
    container.style.width = '50%';

    //css button
    btn.style.width = '35%';
    btn.style.backgroundColor = 'white';
    btn.style.cursor = 'pointer';
    btn.style.borderRadius = '22px';
    btn.style.borderStyle = 'none';

    //css select
    select.style.backgroundColor = "#ececec";
    select.style.border = "0";
    select.style.color = "#62554";
    select.style.cursor = "pointer";
    select.style.margin = "0";
    select.style.outline = "0";
    select.style.width = "68%";
}
function addToCard(name, size = null) {
    fetch(`${companyName}/products/${name}.js`)
        .then(data => data.json())
        .then(res => {
            console.log(res);
            console.log(res.variants);
            if (size == null) {
                fetch(`${companyName}/cart/add.js?ts=${Date.now()}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: res.variants[0].id,
                        quantity: 1,
                        properties: {},
                    })
                }).then(alert(`${res.title}  was ADDED`));
                return;
            } else {
                for (let i = 0; i < res.variants.length; i++) {
                    if (res.variants[i].title.includes(size)) {
                        console.log(res.variants[i].title, size, res.variants[i].id)
                        fetch(`${companyName}/cart/add.js?ts=${Date.now()}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: res.variants[i].id,
                                quantity: 1,
                                properties: {},
                            })
                        }).then(alert(`${res.title} ${size} was ADDED`));
                        break;
                    }
                }
            }
        });
};
