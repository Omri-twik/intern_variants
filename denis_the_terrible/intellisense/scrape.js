let site = `www.beeinspiredclothing.com`;
let keyword = `sweater`;

let url = `https://www.google.com/search?q=site%3Ahttps%3A%2F%2F${site}%2F+${keyword}&oq=site%3Ahttps%3A%2F%2F${site}%2F+${keyword}&ie=UTF-8`;

fetch(url)
  .then((res) => {
    return res.text();
  })
  .then((data) => {
    let html = document.createElement("html");
    html.innerHTML = data;
    console.log(html);
  });
