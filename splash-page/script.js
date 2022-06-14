function changeBackground(num){
    
    const className=`background-${num}`;
    if(document.body.className===className){
        document.body.className="";
        return;
    }
    else{
        document.body.className="";
        document.body.classList.add(`background-${num}`);
    }
}