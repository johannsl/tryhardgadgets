/**
 * Created by dendril on 11/17/14.
 */


var language = window.location.href.split("/")[window.location.href.split("/").length-2];   // Language for the HTML

var checkLogin=function(){
    var username=document.getElementById("login_form")["email"].value;
    var password=document.getElementById("login_form")["password"].value;

    console.log("Login attempt...")
    if(username==="user@mail.com" && password==="password"){
        login();
        console.log("Successful. User logged in.")
    }
    else{
        if(!document.getElementById("error_message")){
            var textNode=document.createElement("span");
            textNode.setAttribute("id","error_message");
            switch(language){
                case "en":
                    textNode.appendChild(document.createTextNode("You appear to have submitted an invalid username/pass combination. Please try again."));break;
                case "no":
                    textNode.appendChild(document.createTextNode("Du har oppgitt en ugyldig brukernavn/passord-kombinasjon. Vennligst prøv igjen."));break;
            }

            document.getElementById("content").insertBefore(
                textNode,
                document.getElementById("login_form")
            );
        }
        switch(language){
            case "en":
                alertify.error("Failed. User still guest.");break;
            case "no":
                alertify.error("Mislyktes. Bruker enda gjest.");break;
        }
    }
};

var login=function(){
    document.cookie="loggedIn=true";
    window.location="index.html";
};

var logout=function(){
    document.cookie="loggedIn=false";
};

var isLoggedIn=function(){
    cookies=document.cookie.split(";");
    for(i=0;i<cookies.length;i++){
        cookiePair=cookies[i].split("=");
        if(cookiePair[0].trim()=="loggedIn"){
            return cookiePair[1]==="true";//cookie stored as text
        }
    }
    return false;//cookie not set
};

console.log(document.referrer);