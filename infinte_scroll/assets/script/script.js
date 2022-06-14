// initalize variables
const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let imagesLoaded;
// function definition

function fetchImages(count){
    const apiKey="G7GJKwxiCnb-DREBjDPDZqEdR6WBItJnnXZeqEwjNkg";
    const url="https://api.unsplash.com/photos/random?count="+count;
    const options={
        "method":"GET",
        "headers":{
            "Authorization":"Client-ID "+apiKey,
            "Accept-Version": "v1",
        }
    };
    imagesLoaded=count;
    const request=new Request(url,options);
    fetch(request).then(
        response=>response.json()
    ).then(
        response=>{
            for(const element of response){
                createImageElement(element);
            }
        }
    ).catch(
        error=>{
            alert(error);
        }
    )
}
function doneLoading(){
    imagesLoaded--;
    loader.hidden=true;
}
function createImageElement(element){
    const anchor=document.createElement("a");
    anchor.setAttribute("href",element.links.html);
    anchor.setAttribute("target","_blank");
    const imageElement=document.createElement("img");
    imageElement.setAttribute("alt",element.alt_description?element.alt_description:"_blank");
    imageElement.setAttribute("src",element.urls.regular);
    imageElement.setAttribute("title",element.alt_description);
    anchor.appendChild(imageElement);
    imageContainer.appendChild(anchor);
    imageElement.addEventListener("load",doneLoading)
}


//main Execution

function main(){
     const count=30;
    fetchImages(5);
    window.addEventListener("scroll",()=>{
        if(imagesLoaded===0 && window.innerHeight+window.scrollY>document.body.offsetHeight-1000){
            fetchImages(count);
        }
    })
}

main();