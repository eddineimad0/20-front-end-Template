const toggleSwitch=document.querySelector("input[type='checkbox']");
const navbar=document.getElementById("nav");
const toggleIcon=document.getElementById("toggle-icon");
const image1=document.getElementById("image1");
const image2=document.getElementById("image2");
const image3=document.getElementById("image3");
const textBox=document.getElementById("text-box");

function modeSwitch(mode){
    if(mode==="light"){
        navbar.style.backgroundColor="rgb(255 255 255 / 50%)";
        textBox.style.backgroundColor="rgb(0 0 0 / 50%)";
        toggleIcon.children[1].classList.replace("fa-moon","fa-sun");
    }
    else{
        navbar.style.backgroundColor="rgb(0 0 0 / 50%)";
        textBox.style.backgroundColor="rgb(255 255 255 / 50%)";
        toggleIcon.children[1].classList.replace("fa-sun","fa-moon");
    }
    toggleIcon.children[0].textContent=mode+" Mode";
    image1.src=`img/undraw_proud_coder_${mode}.svg`;
    image2.src=`img/undraw_feeling_proud_${mode}.svg`;
    image3.src=`img/undraw_conceptual_idea_${mode}.svg`;
}

function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute("data-theme","dark")
        localStorage.setItem("theme","dark");
        modeSwitch("dark")
    }
    else{
        document.documentElement.setAttribute("data-theme","light");
        localStorage.setItem("theme","light");
        modeSwitch("light")
    }
}




toggleSwitch.addEventListener("change",switchTheme)


const currentTheme=localStorage["theme"];
document.documentElement.setAttribute("data-theme",currentTheme);
modeSwitch(currentTheme);