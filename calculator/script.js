const calculatorDisplay=document.querySelector('h1');
const inputBtns=document.querySelectorAll("button");
const clearBtn=document.getElementById("clear-btn");
let operatorValue='';
let firstOperand=0;
let decimalOn=false;
let decimalCounter=1;
let awaitingSecondOperand=false

function sendNumberValue(){
    let numOnDisplay=parseFloat(calculatorDisplay.textContent);
    if(numOnDisplay>Number.MAX_SAFE_INTEGER){
        console.log("very big value");
        return;
    }
    if(!decimalOn&&numOnDisplay&&!awaitingSecondOperand){
        numOnDisplay=(numOnDisplay*10)+parseFloat(this.value);
        calculatorDisplay.textContent=numOnDisplay;
    }
    else if(decimalOn){
        numOnDisplay+=(parseFloat(this.value)/Math.pow(10,decimalCounter));
        calculatorDisplay.textContent=numOnDisplay.toFixed(decimalCounter);
        decimalCounter++;
    }
    else if(awaitingSecondOperand||numOnDisplay===0){
        calculatorDisplay.textContent=this.value;
        awaitingSecondOperand=false;
        if(operatorValue==="="){
            operatorValue="";
        }
    }
    
}
function addDecimal(){
    //if no Decimal,add one
    let numOnDisplay=parseFloat(calculatorDisplay.textContent);
    if(!decimalOn&&Number.isInteger(numOnDisplay)){
        calculatorDisplay.textContent=`${numOnDisplay}.`;
        decimalOn=true
    }
    return;
}
function useOperator(){
    
    if(!firstOperand || awaitingSecondOperand||!operatorValue){
        operatorValue=this.value;
        firstOperand=Number(calculatorDisplay.textContent);
        awaitingSecondOperand=true;
        decimalCounter=1;
        decimalOn=false
        return;
    }else if(firstOperand && operatorValue && !awaitingSecondOperand){
        const currentValue=Number(calculatorDisplay.textContent);
    switch(operatorValue){
        case "+":
            calculatorDisplay.textContent=firstOperand+currentValue;
            break;
        case "-":
            calculatorDisplay.textContent=firstOperand-currentValue;
            break;
        case "*":
            calculatorDisplay.textContent=firstOperand*currentValue;
            break;
        case "/":{
            if(currentValue===0){
                calculatorDisplay.textContent="Math Error Can't Divide by 0";
                break;
            }
            calculatorDisplay.textContent=firstOperand/currentValue;
            break;
            
            }
        default:
            calculatorDisplay.textContent=firstOperand;
            break;
    }
    firstOperand=0;
    operatorValue='';
    decimalOn=false;
    decimalCounter=1;
    awaitingSecondOperand=true;
    }

}
//Reset Display
function resetAll(){
    calculatorDisplay.textContent='0';
    decimalOn=false;
    decimalCounter=1;
    firstOperand=0;
    awaitingSecondOperand=false;
    operatorValue='';
}
// Add event listeners for numbers,operators,decimal buttons
inputBtns.forEach(inputBtn=>{
    if(inputBtn.classList.length==0){
        inputBtn.addEventListener("click",sendNumberValue);
    }else if(inputBtn.classList.contains("operator")){
        inputBtn.addEventListener("click",useOperator);
    }
    else if(inputBtn.classList.contains("decimal")){
        inputBtn.addEventListener("click",addDecimal)
    }
});
clearBtn.addEventListener("click",resetAll);