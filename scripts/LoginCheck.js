/**
 * Created by dendril on 11/20/14.
 */

var language = window.location.href.split("/")[window.location.href.split("/").length-2];   // Language for HTML

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

var init=function(){
    if(isLoggedIn()){
        var nav_elements=document.getElementById("login_ref");
        while(nav_elements.children.length>0)
            nav_elements.removeChild(nav_elements.children[0]);
        nav_elements.innerHTML="";

        var checkoutRef=document.createElement("a");
        checkoutRef.href="checkout.html";
        switch(language){
            case "en":
                checkoutRef.appendChild(document.createTextNode("Checkout"));
                break;
            case "no":
                checkoutRef.appendChild(document.createTextNode("Betaling"));
                break;
        }

        var logoutRef=document.createElement("a");
        logoutRef.href="javascript:logout()";
        switch(language){
            case "en":
                logoutRef.appendChild(document.createTextNode("Logout"));
                break;
            case "no":
                logoutRef.appendChild(document.createTextNode("Logg ut"));
                break;
        }

        if(getLocation()=="checkout.html")
            switch(language){
                case "en":
                    nav_elements.appendChild(document.createTextNode("Checkout"));
                    break;
                case "no":
                    nav_elements.appendChild(document.createTextNode("Betaling"));
                    break;
            }
        else
            nav_elements.appendChild(checkoutRef);
        nav_elements.appendChild(document.createTextNode(" | "));
        nav_elements.appendChild(logoutRef);
    }
};

var getLocation=function(){
    return window.location.href.split("/")[window.location.href.split("/").length-1];
};

var logout=function(){
    document.cookie="loggedIn=false";
    window.location.reload();
};


addEventListener("load", init);