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
        if(gadget.innerHTML==g[i].children[0].innerHTML){
            gTitle.value=g[i].children[0].innerHTML;
            gDescr.value=g[i].children[1].innerHTML;
            gPrice.value="Price: &pound;"+g[i].children[2].innerHTML+"<br><button value='Add to cart'>Add to cart</button>"
        }
    }

    /*
     Price: &pound;74.999,90<br>
     <button value="Add to cart">Add to cart</button>
     */
};

var printGadgets=function(e){
    listText="<ul class='l1'>";
    console.log(e.tagName);
    for(i=0;i< e.children.length;i++){
        child= e.children[i];
        console.log(child.tagName);

        listText+="<li>"+child.tagName+"</li>";
        listText+="<ul class='l2'>";

        for(j=0;j< child.children.length;j++){
            child2=child.children[j];
            category = child2.attributes["category"].value;
            console.log("\t"+category);
            listText+="<li>"+category+"</li>";
            listText+="<ul class='l3'>";

            for(k=0;k<child2.children.length;k++){
                child3=child2.children[k];
                console.log("\t"+"\t"+child3.children[0].innerHTML);
                listText+="<li><a onmouseover='' onclick='fillGadget(this)'>"+child3.children[0].innerHTML+"</a></li>";
            }

            listText+="</ul>";
        }
        listText+="</ul>";
    }
    listText+="</ul>";

    console.log(listText);
    document.getElementById("nav_gadgets").innerHTML=listText;
};

addEventListener("load", init);