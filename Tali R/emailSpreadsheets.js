
if (window.jQuery) {
    $ = window.jQuery;
} else {
    var script = document.createElement("SCRIPT");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.type = "text/javascript";
    script.onload = function() {
        var $ = window.jQuery; 
        $('head').append( `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body{
  background-color: teal;
}
section{
  position:absolute;
  height:200px;
  width: 100%;
  background-color: white;
  bottom: 100px;;
  text-align: center;
  color:black;
}
input:focus, textarea:focus{
    background-color: rgb(243, 252, 253);
    font-size: 20pt;
    }
.modal {
  display: none;
  position: fixed;
  width: 100%; 
  background-color: beige;
  margin: auto;
  z-index: auto;
  text-align: center;
  padding-bottom: 5vh; 
};
</style>
`);

$(body).append(
`<div id="myModal" class="modal">
    <h2>Enter your email to receive our Newsletter</h2>
    <form id="myForm"> 
      <h3><input type='email'/></h3>
      <input type="submit" name="Email" value="Email" onclick="SubForm"/>
      
    </form>
</div>`)

$(footer).append(`
<section>
<h1>Google spreadsheet</h1>
<a href="https://docs.google.com/spreadsheets/d/13vX6Qj9VpsSt_j4bCEEzX7voRSNMAu8XrH7F9O5QxDM/edit#gid=0"><h2>Data</h2></a>

<button id="myBtn"><i class="fa fa-envelope" style="font-size:48px;color:rgb(255, 145, 0)"></i></button>
</section> `);

};


document.getElementsByTagName("head")[0].appendChild(script);
}



var script = document.createElement('script');


    
function SubForm (){
    fetch("https://api.apispreadsheets.com/data/8532/", {
        method: "POST",
        data: JSON.stringify({email:email}),
    }).then(res =>{
        if (res.status === 201){
            success: function(){
                  alert("Form Data Submitted :)")
        }
        }
        else{
        error: function(){
                  alert("There was an error :(")
        }
    }