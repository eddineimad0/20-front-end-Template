// Variables definition
const quotContainer=document.querySelector(".quote-text");
const quoteSpan=document.getElementById("quote");
const authorSpan=document.getElementById("author");
const tweetBtn=document.getElementById("twitter");
const newQuoteButton=document.getElementById("new-quote");
const loader=document.querySelector(".loader");

let errorFlag=0;

// function definition
function startLoader(){
    quotContainer.hidden=true;
    loader.classList.add("active");
}
function stopLoader(){
    loader.classList.remove("active");
    quotContainer.hidden=false;
}
function getRandomInt(a,b){
    return Math.floor((Math.random()*(b-a+1)));
}
async function getQuotes(){
    try{
        //possible api "https://type.fit/api/quotes"
        const options={
            "method":"GET",
            "header":{
                "method":"getQuote",
                "lang":"en",
                "format":"json"
            },
        }

        const response=await (await fetch("https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json")).json();
        console.log(response);
        return  response;
    }
    catch(error){
        if(errorFlag=2){
            alert("Something went wrong the app crashed");
            return null;
        }
        alert(error)
        return getQuotes();
    }
}

function processQuotes(response){
    const length=response.length;
    const indx=getRandomInt(0,length-1);
    return response[indx];
}

async function updatUI(){
    startLoader();
    const quoteObject=await getQuotes();
    if(quoteObject){
        if(quoteObject["quoteText"].length>=120)quoteSpan.classList.add("long-quote");
        else quoteSpan.classList.remove("long-quote");
        quoteSpan.textContent=quoteObject["quoteText"];
        authorSpan.textContent=quoteObject["quoteAuthor"]?quoteObject["quoteAuthor"]:"Unkown";
    }
    stopLoader();
}
function tweetHandler(){
    if(quoteSpan.textContent.trim()===""){
        alert("There is no quote to tweet !");
        return;
    }
    const tweetUrl=`https://twitter.com/intent/tweet?text=${quoteSpan.textContent} - ${authorSpan.textContent}`;
    open(tweetUrl,"_blank");
}



// Main Execution;
function main(){
    newQuoteButton.addEventListener("click",updatUI);
    tweetBtn.addEventListener("click",tweetHandler);
    
}main();