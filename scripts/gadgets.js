/**
 * Created by dendril on 11/19/14.
 */

var xmlDoc=null,
    gTitle=null,
    gDescr=null,
    gPrice=null;

var language = window.location.href.split("/")[window.location.href.split("/").length-2];   // Language for HTML

var init=function(){
    gTitle=document.getElementById("gadgets_title");
    gDescr=document.getElementById("gadget_description");
    gPrice=document.getElementById("gadget_priceShopper");

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","gadgets.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;

    var gadgets=xmlDoc.getElementsByTagName("gadgets");

    printGadgets(gadgets[0]);

};

var fillGadget=function(gadget){
    var g=xmlDoc.getElementsByTagName("gadget");    //Root <gadgets> of XML

    for(var i=0;i< g.length;i++){
        if(gadget==g[i].children[0].innerHTML){
            gTitle.innerHTML="<h3>"+g[i].children[0].innerHTML+"</h3>";
            gDescr.innerHTML="";
            if(g[i].children[3].innerHTML){
                var img=document.createElement("img");
                img.src = "../img/"+g[i].children[3].innerHTML;
                img.className="float_right";
                gDescr.appendChild(img);
            }
            gDescr.innerHTML+=g[i].children[1].innerHTML;switch(language){
                case "en":
                    gPrice.innerHTML="Price: &pound;"+g[i].children[2].innerHTML;
                    break;
                case "no":
                    gPrice.innerHTML="Pris: "+g[i].children[2].innerHTML+" NOK";
                    break;
            }
            if(isLoggedIn())    //load Add to cart-button if user is logged in
                switch(language){
                    case "en":
                        gPrice.innerHTML+="<br><button value='Add to cart' onclick='addToCartClicked()'>Add to cart</button>";
                        break;
                    case "no":
                        gPrice.innerHTML+="<br><button value='Add to cart' onclick='addToCartClicked()'>Legg til Handlevogn</button>";
                        break;
                }
            break;
        }
    }
};

var printGadgets=function(e){
    var listText="<ul class='l1'>";
    var gadgetList=[];

    for(var i=0;i< e.children.length;i++){
        var child= e.children[i];   //<Hardware> / <Software>
        listText+="<li>"+child.tagName+"</li>";
        listText+="<ul class='l2'>";

        for(var j=0;j< child.children.length;j++){
            var child2=child.children[j];   //<category>
            var category = child2.attributes["category"].value;
            listText+="<li>"+category+"</li>";
            listText+="<ul class='l3'>";

            for(var k=0;k<child2.children.length;k++){
                var child3=child2.children[k];  //<gadget>
                var gTitle=child3.children[0].innerHTML; //Title of gadget
                listText+="<li><output id='gadget_"+gTitle+"'></li>"; //Create an <output> where link is to be put

                gadgetList.push(gTitle);
            }

            listText+="</ul>";
        }
        listText+="</ul>";
    }
    listText+="</ul>";

    document.getElementById("nav_gadgets").innerHTML=listText;

    /*
     * Fetches each gadget-<output>, and appends an <a>-tag inside it.
     * This to include the <a>-tag in the HTML-DOM, to aid content tabbing and screen readers.
     */
    for(var i=0;i<gadgetList.length;i++){
        var div_temp=document.getElementById("gadget_"+gadgetList[i]);

        var a=document.createElement("a");
        a.appendChild(document.createTextNode(gadgetList[i]));
        a.href="javascript:fillGadget('"+gadgetList[i]+"')";
        div_temp.appendChild(a);
    }
};

addEventListener("load", init);