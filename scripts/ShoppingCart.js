/**
 * Created by dendril on 11/20/14.
 */

var div=null,
    titleBar=null,
    content=null,
    summary=null,
    outputField,
    cart=[];

var language = window.location.href.split("/")[window.location.href.split("/").length-2];   // Language for HTML

var getLocation=function(){
    return window.location.href.split("/")[window.location.href.split("/").length-1];
};

var setCartAmount=function(amount){
    document.getElementById("cart_amount").value=amount;
};

var init= function () {
    loadCart();
    div=document.getElementById("shopping_cart");
    if(getLocation()=="gadgets.html"){
        if(isLoggedIn())
            createGui();
        else{
            removeShoppingCart();
        }
    }

    if(getLocation()=="checkout.html"){
        if(!isLoggedIn())
            window.location="login.html";

    }
};



var addToCartClicked= function () {
    currentGadget=document.getElementById("gadgets_title").value;
    console.log(currentGadget);

    cart.push(currentGadget);
    outputField.value=cart.length;

    document.cookie="cart="+JSON.stringify(cart);  //store cart as cookie

};

var loadCart=function(){
    var cookies=document.cookie.split(";");
    var cartCookie=null;
    for(var i=0;i<cookies.length;i++){
        var cookiePair=cookies[i].split("=");
        if(cookiePair[0].trim()=="cart"){
            cartCookie=cookiePair[1];
            break;
        }
    }
    if(cartCookie!=null){
        cart=JSON.parse(cartCookie);
    }
};

var removeShoppingCart=function(){
    document.getElementById("gadget_content").removeChild(
        document.getElementById("shopping_cart")
    );
};

var createGui= function () {
    titleBar=document.createElement("div");
    content=document.createElement("div");
    summary=document.createElement("div");

    titleBar.setAttribute("id", "shopping_title");
    switch(language){
        case "en":
            titleBar.appendChild(document.createTextNode("Shopping Cart"));
            break;
        case "no":
            titleBar.appendChild(document.createTextNode("Handlevogn"));
            break;
    }

    outputField=document.createElement("output");
    outputField.setAttribute("id", "cart_amount");
    outputField.value=cart.length;
    content.setAttribute("id", "shopping_content");
    switch(language){
        case "en":
            content.appendChild(document.createTextNode("There's currently "));
            break;
        case "no":
            content.appendChild(document.createTextNode("Du har "));
            break;
    }

    content.appendChild(outputField);

    switch(language){
        case "en":
            content.appendChild(document.createTextNode(" gadgets in your cart."));
            break;
        case "no":
            content.appendChild(document.createTextNode(" varer i handlevognen."));
            break;
    }

    var b=document.createElement("button");
    b.role="button";
    switch(language){
        case "en":
            b.appendChild(document.createTextNode("Checkout"));
            break;
        case "no":
            b.appendChild(document.createTextNode("Til Betaling"));
            break;
    }
    var a=document.createElement("a");
    a.href="checkout.html";
    a.appendChild(b);

    summary.setAttribute("id", "shopping_summary");
    summary.className="float_center";
    summary.appendChild(a);

    div.appendChild(titleBar);
    div.appendChild(document.createElement("hr"));
    div.appendChild(content);
    div.appendChild(document.createElement("hr"));
    div.appendChild(summary);
};




addEventListener("load", init);