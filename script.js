const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const currentValue = document.querySelector('.first-operand');
const equalsKey = document.querySelector('.equals-key');
const deleteButton = document.querySelector('.delete');
const dotKey = document.querySelector('#dot')
const backSpaceButton = document.querySelector('.back-space');



//Your calculator is going to contain functions for all of the basic math operators 
//you typically find on simple calculators, so start by creating functions 
//for the following items and testing them in your browser’s console.

// Sum of a, b ... 
function add(a, b) {
  return a + b;
};

// Subtraction of a and b ...
function subtract(a, b) {
  return a - b;
};

// Multiply a, b ... 
function multiply(a, b) {
  return a * b;
};

// Divide a,b ... 
function divide(a, b) {
  return a / b;
};

function modulo(a, b){
  return a % b;
}

// Create a new function operate that takes an operator and 2 numbers and then 
//calls one of the above functions on the numbers.
function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
      case "%":
        return modulo(num1, num2);
  }
};


let secondOperator = '';
let storedNumber = '';
let storedOperator = '';
let storedDot = '';
let firstNumber = '';
let result = '';
let storedZero = '0';
currentValue.textContent = 0;
////Create the functions that populate the display when you click the number buttons. 
//You should be storing the ‘display value’ in a variable somewhere for use in the next 
//step.
numberButtons.forEach((number)=>{
  number.addEventListener('click', function (){
    if(storedNumber.length === 9){//if my stored number goes over 9 digits,
      number.value = '';  //disable number value so we dont type too large numbers.

    }else if((storedNumber.length === 0 || storedNumber.length === 1) && number.value === '0'){// If I type 0 and then another number, 
       //0 should not be at the beginning of that number
         currentValue.textContent = storedZero;
         
    }else if(storedNumber === result || storedNumber === storedZero){  //if I start typing the number for a next calculation,
      storedNumber = '';      // It should clear everything first.   
    storedNumber += number.value;
     currentValue.textContent = storedNumber;
     //result = '';
    }else{
      storedNumber += number.value;
      currentValue.textContent = storedNumber;
    }
  })
});
//Make the calculator work! You’ll need to store the first number 
//that is input into the calculator when a user presses an operator, 
//and also save which operation has been chosen and then operate() 
//on them when the user presses the “=” key.
operatorButtons.forEach((operator =>{
  operator.addEventListener('click', function (){
    // Your calculator should then do the following: 
    //first, evaluate the first pair of numbers (12 + 7), 
    //second, display the result of that calculation (19), and 
    //finally, use that result (19) as the first number in your new calculation, 
    //along with the next operator (-).
    if(firstNumber && storedNumber && storedZero){
    result =  operate(parseFloat(firstNumber), parseFloat(storedNumber), storedOperator.trim());
    storedOperator = operator.textContent;
    currentValue.textContent = Number(result.toFixed(2))+''+storedOperator;
    storedNumber = '';
    firstNumber = result;
    }else if(storedNumber && storedZero && secondOperator){
      result = operate(parseFloat(storedZero), parseFloat(storedNumber), storedOperator.trim());
      storedOperator = operator.textContent;
      currentValue.textContent = Number(result)+''+storedOperator;
    storedNumber = '';
    firstNumber = result;
    }else if(firstNumber && storedOperator){
      secondOperator = operator.textContent;
      storedOperator = secondOperator;
      currentValue.textContent = firstNumber + storedOperator;
    }else if(storedZero && operator && !storedNumber){
      secondOperator = operator.textContent;
      storedOperator = secondOperator;
      currentValue.textContent = storedZero + storedOperator;
    }else if(storedOperator){//overwrite an operator with a later operator
      secondOperator = operator.textContent;
      storedOperator = secondOperator;
      currentValue.textContent = storedNumber + storedOperator;
     
    }else if(storedZero && !firstNumber&& !secondOperator && !storedNumber){
      storedOperator = operator.textContent;
      currentValue.textContent = storedZero+''+storedOperator;
    }else{
    //first number stored
    firstNumber = storedNumber;
    //store operator that was clicked
    storedOperator = operator.textContent;
    currentValue.textContent = storedNumber+''+storedOperator;
    storedNumber = '';
    console.log('first' + firstNumber + 'stored' + storedNumber);
    console.log(storedOperator);
    }
  })
}));



//You should already have the code that can populate the display, 
//so once operate() has been called, update the display with the ‘solution’ 
//to the operation.

equalsKey.addEventListener('click', function () {
  //Pressing = before entering all of the numbers or an operator could cause problems!
  if(!firstNumber && !storedNumber && !storedOperator && !storedZero){
    alert('Cant do that!')
  }else if(!firstNumber && !storedNumber){
  currentValue.textContent = storedZero;
  }else if(!firstNumber){
    result = operate(parseFloat(storedZero), parseFloat(storedNumber), storedOperator.trim());
    currentValue.textContent = Number(result.toFixed(2));
    result = '';
    storedNumber = '';
    firstNumber = '';
    storedOperator = '';
    alert("If there is a 50-50 chance that something can go wrong, then 9 times out of 10 it will.");
    
  }else if(!storedNumber){
    result = operate(parseFloat(storedZero), parseFloat(firstNumber), storedOperator.trim());
    currentValue.textContent = Number(result.toFixed(2));
    result = '';
    storedNumber = '';
    firstNumber = '';
    storedOperator = '';
    alert("If there is a 50-50 chance that something can go wrong, then 9 times out of 10 it will.");
  }else{
  // when clicked equal key, call operate() function
  result = operate(parseFloat(firstNumber), parseFloat(storedNumber), storedOperator.trim());
  currentValue.textContent = '';
 //You should round answers with long decimals so that they don’t overflow the screen.
  currentValue.textContent = Number(result.toFixed(2));
 storedNumber = result;
 firstNumber = '';
 console.log('FirstNumber'+firstNumber+'Stored'+storedNumber)
}
})
//Pressing “clear” should wipe out any existing data.. 
//make sure the user is really starting fresh after pressing “clear”

  deleteButton.addEventListener('click', function () {
    firstNumber = '';
    storedNumber = '';
    storedOperator = '';
    secondOperator = '';
    result = '';
    currentValue.textContent = 0;
  })

//Add a “backspace” button, so the user can undo if they click the wrong number.
backSpaceButton.addEventListener('click', function () {
  result = result.toString();
  result = result.substring(0, result.length-1);
  currentValue.textContent = result;
  storedNumber = storedNumber.toString();
 storedNumber = storedNumber.substring(0, storedNumber.length-1);
 currentValue.textContent = storedNumber;
})

//Add a . button and let users input decimals!
dotKey.addEventListener('click', ()=>{
//Make sure you don’t let them type more than one though: 
//12.3.56.5. It is hard to do math on these numbers.  
//(disable the decimal button if there’s already one in the display)
  if(storedNumber.includes ('.',0)){
    storedNumber += '';
  }else{
storedNumber += '.';
currentValue.textContent = storedNumber;
  }
})








