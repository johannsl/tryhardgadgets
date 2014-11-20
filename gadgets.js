/**
 * Created by dendril on 11/19/14.
 */

var xmlDoc=null,
    gTitle=null,
    gDescr=null,
    gPrice=null;

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
    g=xmlDoc.getElementsByTagName("gadget");

    for(i=0;i< g.length;i++){
        if(gadget==g[i].children[0].innerHTML){
            gTitle.innerHTML="<h3>"+g[i].children[0].innerHTML+"</h3>";
            gDescr.innerHTML="";
            if(g[i].children[3].innerHTML){
                img=document.createElement("img");
                img.src = "img/"+g[i].children[3].innerHTML;
                img.className="float_right";
                gDescr.appendChild(img);
            }
            gDescr.innerHTML+=g[i].children[1].innerHTML;
            gPrice.innerHTML="Price: &pound;"+g[i].children[2].innerHTML+"<br><button value='Add to cart'>Add to cart</button>"
            break;
        }
    }
};

var printGadgets=function(e){
    var listText="<ul class='l1'>";
    var gadgetList=[];

    for(var i=0;i< e.children.length;i++){
        var child= e.children[i];

        //var t1=document.createTextNode(""+child.tagName);
        //listText+="<li>"+document.getElementById("nav_gadgets").appendChild(t1)+"</li>";
        listText+="<li>"+child.tagName+"</li>";
        listText+="<ul class='l2'>";

        for(var j=0;j< child.children.length;j++){
            var child2=child.children[j];
            var category = child2.attributes["category"].value;
            listText+="<li>"+category+"</li>";
            listText+="<ul class='l3'>";

            for(var k=0;k<child2.children.length;k++){
                var child3=child2.children[k];
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