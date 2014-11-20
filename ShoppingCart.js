/**
 * Created by dendril on 11/20/14.
 */

var div=null,
    titleBar=null,
    content=null,
    summary=null;



var init= function () {
    div=document.getElementById("shopping_cart");
    createGui();

};

var createGui= function () {
    titleBar=document.createElement("div");
    content=document.createElement("div");
    summary=document.createElement("div");

    titleBar.setAttribute("id", "shopping_title");
    titleBar.appendChild(document.createTextNode("Shopping Cart"));

    var outputField=document.createElement("output");
    outputField.setAttribute("id", "cart_amount");
    outputField.value=0;
    content.setAttribute("id", "shopping_content");
    content.appendChild(document.createTextNode("There's currently "));
    content.appendChild(outputField);
    content.appendChild(document.createTextNode(" gadgets in your cart."));

    var b=document.createElement("button");
    b.appendChild(document.createTextNode("Checkout"));
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