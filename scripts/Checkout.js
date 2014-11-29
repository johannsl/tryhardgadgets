/**
 * Created by dendril on 27.11.14.
 *
 * Since ShoppingCart.js already has been loaded, 'cart' will be set.
 */

var contentDiv=null,        // Put gadget-divs in here
    checkoutButton=null,    // Button for checking out
    priceOutput=null,       // Put total cost here
    gadgets=null,           // List of gadgets, from XML
    totalPrice=0;           // Total price for all gadgets

var language = window.location.href.split("/")[window.location.href.split("/").length-2];   // Language for HTML

var checkoutInit = function(){
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","gadgets.xml",false);
    xmlhttp.send();
    var xmlDoc=xmlhttp.responseXML;
    gadgets=xmlDoc.getElementsByTagName("gadget");  // All XML-elements with tag "gadget"

    contentDiv = document.getElementById("checkout_content");
    priceOutput = document.getElementById("checkout_cost");
    checkoutButton = document.getElementById("checkout_cost");

    if(cart.length==0){
        switch(language){
            case "en":
                alertify.error("Your shopping cart is empty");break;
            case "no":
                alertify.error("Handlevognen din er tom");break;
        }
    }

    // Fill checkout
    for(var i=0;i<cart.length;i++){
        addGadgetGui(cart[i]);
    }
};

var addGadgetGui = function(name){
    var gadget=getGadgetByName(name);
    console.log(gadget);

    if(gadget==null){
        return false;       // No XML-gadget with that name
    }

    var gadgetDiv = document.createElement("div");
    var nameDiv = document.createElement("div");
    var priceDiv = document.createElement("div");

    nameDiv.appendChild(document.createTextNode(gadget.name));
    priceDiv.appendChild(document.createTextNode("£"+gadget.price));

    gadgetDiv.appendChild(priceDiv);
    gadgetDiv.appendChild(nameDiv);

    contentDiv.appendChild(gadgetDiv);

    gadgetDiv.setAttribute("id", "checkout_gadget");
    nameDiv.setAttribute("id", "checkout_gadget_name");
    priceDiv.setAttribute("id", "checkout_gadget_price");

    totalPrice += gadget.price;
    priceOutput.value=totalPrice;
};

var checkoutButtonClicked = function(extraMessage){
    var message="";
    switch(language){
        case "en":
            message+="Thank you for shopping at Tryhard Gadgets!<br><br>"
                + "Your IP has been registered, and you will be<br>"
                + "charged with £"+totalPrice+" directly from your bank<br>account in the next few seconds.";
            break;
        case "no":
            message+="Takk for at du handlet hos Tryhard Gadgets!<br><br>"
                + "Din IP har blitt registrert, og vi vil<br>"
                + "trekke "+totalPrice+" NOK fra din bankkonto i<br>løpet av de neste sekundene.";
            break;

    }

    if(extraMessage)
        message="<b>"+extraMessage+"</b><br><br><br>"+message;
    switch (language){
        case "en":
            alertify.set({ labels: {
                ok     : "Thank you, Tryhard Gadgets!",
                cancel : "Cancel transaction"
            } });break;
        case "no":
            alertify.set({ labels: {
                ok     : "Takk, Tryhard Gadgets!",
                cancel : "Avbryt transaksjon"
            } });break;
    }

    alertify.confirm(message, function (e) {
        if (e) {
            document.cookie = "cart=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // Delete 'cart'-cookie
            window.location.reload();
        } else {
            if(extraMessage){
                extraMessage+=".";
                checkoutButtonClicked(extraMessage);
            }
            else
                switch(language){
                    case "en":
                        checkoutButtonClicked("I'm sorry.<br>I can't let you do that.");break;
                    case "no":
                        checkoutButtonClicked("Jeg beklager.<br>Vi kan ikke tillate at du avbryter.");break;
                }

        }
    });
};

var getGadgetByName = function(name){
    var gadget = {name:name, price:0};

    for(var i=0;i<gadgets.length;i++){
        xmlName=gadgets[i].children[0].innerHTML;
        if(xmlName == name){
            gadget.price=Number(gadgets[i].children[2].innerHTML);
            return gadget;
        }
    }

    return false;   // No XML-gadget with that name
};



addEventListener("load", checkoutInit);