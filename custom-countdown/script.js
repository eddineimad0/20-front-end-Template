const inputContainer=document.querySelector(".input-container");
const countdownForm=document.getElementById("countdownform");
const datePicker=document.getElementById("date-picker");
const title=document.getElementById("countdown-title");
const countdownBtn=document.getElementById("countdown-button");
const timeElements=document.querySelectorAll("span");
const completeElInfo=document.getElementById("complete-info");
const completeBtn=document.getElementById("complete-button");
const SECOND=1000;
const MINUTE=SECOND*60;
const HOUR=MINUTE*60;
const DAY=HOUR*24;
let TITLE=localStorage.getItem("SavedTitle");
let DATE=localStorage.getItem("SavedDate");
let id;
let isActive;
let countdownValue=Date;
function getMinDate(){
    const date=new Date().toISOString().split("T")[0];
    return date;
}
function formHandler(event){
    event.preventDefault();
    localStorage.setItem("SavedTitle",event.srcElement[0].value);
    localStorage.setItem("SavedDate",event.srcElement[1].value);
    DATE=event.srcElement[1].value;
    TITLE=event.srcElement[0].value;
    countdownValue=new Date(DATE).getTime();
    event.srcElement[0].value="";
    event.srcElement[1].value="";
    updateDOM();
}
function updateTImer(time){
    const days=Math.floor(time/DAY);
    const hours=Math.floor((time%DAY)/HOUR);
    const minutes=Math.floor((time%HOUR)/MINUTE);
    const seconds=Math.floor((time%MINUTE)/SECOND);
    inputContainer.hidden=true;
    if(time<=0){
        isActive=false;
        completeElInfo.textContent=`${TITLE} finished on ${DATE}`;
        inputContainer.nextElementSibling.nextElementSibling.hidden=false;
        inputContainer.nextElementSibling.hidden=true;
        localStorage.removeItem("SavedDate");
        localStorage.removeItem("SavedTitle");
        return;
    }
    inputContainer.nextElementSibling.hidden=false;
    title.textContent=TITLE;
    const timerObject={
        "Days":days,
        "Hours":hours,
        "Minutes":minutes,
        "Seconds":seconds
    }
    console.log(timerObject);
    timeElements[0].textContent=timerObject.Days;
    timeElements[1].textContent=timerObject.Hours;
    timeElements[2].textContent=timerObject.Minutes;
    timeElements[3].textContent=timerObject.Seconds;
}
function updateDOM(){
    const temp=new Date().getTime();
    updateTImer(countdownValue-temp);
    isActive=true;
    id=window.setInterval(()=>{
        const now=new Date().getTime();
        updateTImer(countdownValue-now);
        if(isActive===false){
            window.clearInterval(id);
        }
    },1000);
}

//main execution

function main(){
    datePicker.setAttribute("min",getMinDate());
    countdownForm.addEventListener("submit",formHandler);
    countdownBtn.addEventListener("click",()=>{
        window.clearInterval(id);
        inputContainer.nextElementSibling.hidden=true;
        inputContainer.hidden=false;
        localStorage.removeItem("SavedDate");
        localStorage.removeItem("SavedTitle");

    })
    completeBtn.addEventListener("click",()=>{
        inputContainer.nextElementSibling.nextElementSibling.hidden=true;
        inputContainer.hidden=false;
    })
    if(DATE){
        countdownValue=new Date(localStorage.getItem("SavedDate")).getTime();
        updateDOM();
    }
}

main();