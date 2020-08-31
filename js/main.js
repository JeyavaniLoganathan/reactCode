/*function validateLogin(){
    var uName = document.forms["loginForm"]["userName"].value;
    var pwd = document.forms["loginForm"]["password"].value;
    console.log("uName"+uName+"pwd"+pwd);
    if(uName == "" && pwd == ""){
        alert("Please enter the Username or Password");
    }
}*/

var select = document.getElementById("model");
select.onchange = function(){
    var selectedString = select.options[select.selectedIndex].value;
    alert(selectedString);
}