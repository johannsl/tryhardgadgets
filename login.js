/**
 * Created by dendril on 11/17/14.
 */

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
            textNode.appendChild(document.createTextNode("You appear to have submitted an invalid username/pass combination. Please try again."));
            document.getElementById("content").insertBefore(
                textNode,
                document.getElementById("login_form")
            );
        }
        console.log("Failed. User still guest.")
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

var loadCookies=function(){
    cookies=document.cookie.split(";");
    taskCookie=null;
    for(i=0;i<cookies.length;i++){
        cookiePair=cookies[i].split("=");
        if(cookiePair[0].trim()=="tasklist"){
            taskCookie=cookiePair[1];
            break;
        }
    }
    if(taskCookie!=null){
        tasks=JSON.parse(taskCookie);
        for(i=0;i<tasks.length;i++){
            addTaskGUI(tasks[i]);
        }
    }
};

console.log(document.referrer);