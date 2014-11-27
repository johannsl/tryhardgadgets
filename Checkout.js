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
    var message="Thank you for shopping at Tryhard Gadgets!<br><br>"
        + "Your IP has been registered, and you will be<br>"
        + "charged with £"+totalPrice+" directly from your bank<br>account in the next few seconds.";
    if(extraMessage)
        message="<b>"+extraMessage+"</b><br><br><br>"+message;
    alertify.set({ labels: {
        ok     : "Thank you, Tryhard Gadgets!",
        cancel : "Cancel transaction"
    } });
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
                checkoutButtonClicked("I'm sorry. I can't let you do that.");
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