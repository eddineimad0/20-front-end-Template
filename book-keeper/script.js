const modal=document.getElementById("modal");
const modalShow=document.getElementById("show-modal");
const modalClose=document.getElementById("close-modal");
const bookmarkForm=document.getElementById("bookmark-form");
const websiteNameEl=document.getElementById("website-name");
const websiteUrlEl=document.getElementById("website-url");
const bookmarksContainer=document.getElementById("bookmarks-container");
let bookmarks;

function showModal(){
    modal.classList.add("show-modal")
    websiteNameEl.focus();
}
function getBookmarks(){
    return JSON.parse(localStorage.getItem("Bookmarks"))
}
function removeBookmark(){
    const url=this.nextElementSibling.querySelector("a").getAttribute("href")
    this.parentElement.remove();
    bookmarks.forEach((element,i)=>{
        if(element.url===url){
            bookmarks.splice(i,1);
        }
    })
    localStorage.setItem("Bookmarks",JSON.stringify(bookmarks));
}
function buildBookmarks(mark){
    const template=document.querySelector("template");
            const {name,url}=mark;
            const nodeEl=template.content.cloneNode(true);
            nodeEl.querySelector("a").setAttribute("href",url);
            nodeEl.querySelector("a").textContent=name;
            nodeEl.querySelector("a").textContent=name;
            let source="https://s2.googleusercontent.com/s2/favicons?domain="
            nodeEl.querySelector("img").setAttribute("src",source+url);
            nodeEl.getElementById("delete-bookmark").addEventListener("click",removeBookmark);
            bookmarksContainer.append(nodeEl);
}
function storeBookmark(event){
    event.preventDefault();
    const websiteName=websiteNameEl.value;
    let websiteUrl=websiteUrlEl.value;
    if(!(websiteUrl.includes("http://")|| websiteUrl.includes("https://"))){
        websiteUrl="https://"+websiteUrl;
    }
    if(!validateForm(websiteName,websiteUrl)){
        return false;
    };
    const mark={
        "name":websiteName,
        "url":websiteUrl,
    }
    bookmarks.push(mark);
    buildBookmarks(mark);
    bookmarkForm.reset();
    websiteNameEl.focus();
    localStorage.setItem("Bookmarks",JSON.stringify(bookmarks));
}
function validateForm(nameValue,urlValue){
    if(!nameValue||!urlValue){
        alert("Please submit values for both fields.");
        return false;
    }
    const expression="^https?:\/\/[a-zA-Z0-9@:%._\\+~#?&\/=]+.\w*$";
    const regex=new RegExp(expression);
    if(!urlValue.match(regex)){
        alert("submit a valid url");
        return false;
    }
    return true;
}


//main
bookmarks=getBookmarks();
if(!bookmarks)bookmarks=[];
bookmarks.forEach(element=>{
    buildBookmarks(element);
});
modalShow.addEventListener("click",showModal);
modalClose.addEventListener("click",()=>modal.classList.remove("show-modal"));
window.onclick=(e)=>{
    e.target===modal?modal.classList.remove("show-modal"):false;

}

//submit
bookmarkForm.addEventListener("submit",storeBookmark)