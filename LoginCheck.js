/**
 * Created by dendril on 11/20/14.
 */
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
        checkoutRef.appendChild(document.createTextNode("Checkout"));

        var logoutRef=document.createElement("a");
        logoutRef.href="javascript:logout()";
        logoutRef.appendChild(document.createTextNode("Logout"));

        nav_elements.appendChild(checkoutRef);
        nav_elements.appendChild(document.createTextNode(" | "));
        nav_elements.appendChild(logoutRef);
    }
};

var logout=function(){
    document.cookie="loggedIn=false";
    window.location.reload();
};


addEventListener("load", init);