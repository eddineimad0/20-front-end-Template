const resultNav=document.getElementById('resultsNav');
const favoritesNav=document.getElementById('favoritesNav');
const imagesContainer=document.querySelector('.images-container');
const saveConfirmed=document.querySelector('.save-confirmed');
const loader=document.querySelector(".loader");

const count=3;
const apiUrl=" https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count="+count;
let resultsArray=[];
let favorites=localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):{};
//functions
function showContent(page){
    if(page==="favorites"){
        resultNav.classList.add("hidden");
        favoritesNav.classList.remove("hidden");
    }
    else{
        favoritesNav.classList.add("hidden");
        resultNav.classList.remove("hidden");
    }
    window.scrollTo({top:0,behavior:"smooth"});
    loader.classList.add("hidden");
}
function saveToFavorites(itemUrl){
    resultsArray.forEach(result=>{
        if(favorites[itemUrl]){
            this.removeEventListener("click",saveToFavorites);
            this.addEventListener("click",alert.bind(null,"Item is already in Favorites"));
        }
        else if(result.url===itemUrl){
            favorites[itemUrl]=result;
            saveConfirmed.hidden=false;
            setTimeout(()=>{
            saveConfirmed.hidden=true;
            },2000);
        }  
    })
    localStorage.setItem("favorites",JSON.stringify(favorites));
}
function removeFromFavorites(url){
    if(favorites[url]){
        delete favorites[url];
        localStorage.setItem("favorites",JSON.stringify(favorites));
        createDomNodes('favorites');
    }

}
function createDomNodes(page){
    imagesContainer.textContent="";
    const arrayRefer=page==='favorites'?Object.values(favorites):resultsArray;
    arrayRefer.forEach(result=>{
        //card container
        const card =document.createElement('div');
        card.classList.add('card');
        //link
        const link=document.createElement('a');
        link.href=result.hdurl;
        link.title='View Full Image';
        link.target='_blank';
        //Image
        const image=document.createElement('img');
        image.src=result.url;
        image.alt="NASA Picture of the Day";
        image.loading='lazy';
        image.classList.add('card-img-top');
        link.appendChild(image);
        const desc=document.createElement('div');
        desc.classList.add("card-body");
        const title=document.createElement('h5');
        title.classList.add("card-title");
        title.textContent=result.title;
        const saveText=document.createElement('p');
        saveText.classList.add("clickable");
        if(page==="favorites"){
            saveText.textContent="Remove From Favorites";
        saveText.addEventListener("click",removeFromFavorites.bind(null,result.url));
        }else{
            saveText.textContent="Add To Favorites";
        saveText.addEventListener("click",saveToFavorites.bind(saveText,result.url));
        }
        //card Text
        const cardText=document.createElement("p");
        cardText.textContent=result.explanation;
        //Footer Container
        const footer=document.createElement('small');
        footer.classList.add("text-muted");
        //date
        const date=document.createElement('strong');
        date.textContent=result.date;
        //copyright
        const copyright=document.createElement('span');
        const copyResult=result.copyright?result.copyright:"";
        copyright.textContent=` ${copyResult}`;
        footer.append(date,copyright);
        desc.append(title,saveText,cardText,footer);
        card.append(link,desc);
        imagesContainer.appendChild(card);
    })
    showContent(page);
}

async function getNasaPictures(){
    loader.classList.remove("hidden");
    try{
        const response=await fetch(apiUrl);
        resultsArray=await response.json();
    }catch(error){
        alert(error);
    }
    createDomNodes('results');
}



//main 
resultNav.firstElementChild.addEventListener("click",createDomNodes.bind(null,"favorites"));
resultNav.lastElementChild.addEventListener("click",getNasaPictures);
favoritesNav.firstElementChild.addEventListener("click",getNasaPictures);
getNasaPictures();
