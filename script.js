const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const showResult = document.querySelector('.result');
const currentValue = document.querySelector('.second-operand');
const previousValue = document.querySelector('.first-operand');
const equalsKey = document.querySelector('.equals-key');



currentValue.textContent = ' ';
previousValue.textContent = ' ';

//Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

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

// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
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
  }
};

//Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

let storedNumber = '';
let storedOperator = '';
let firstNumber = '';
let result = '';

currentValue.textContent = 0;

numberButtons.forEach((number)=>{
  number.addEventListener('click', function (){
    storedNumber += number.value;
    currentValue.textContent = storedNumber;
  })
});
//Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.
operatorButtons.forEach((operator =>{
  operator.addEventListener('click', function (){

    //first number stored
    firstNumber = storedNumber;
    //store operator that was clicked
    storedOperator = operator.textContent;
    previousValue.textContent = storedNumber + storedOperator;
    storedNumber = '';
    console.log('first' + firstNumber + 'stored' + storedNumber);
    console.log(storedOperator);
  })
}));

//You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.

equalsKey.addEventListener('click', function () {
  // when clicked equal key, call operate() function
  result = operate(parseFloat(firstNumber), parseFloat(storedNumber), storedOperator.trim())
  currentValue.textContent = result;
 previousValue.textContent = firstNumber+ ' ' +storedOperator+ ' ' +storedNumber;
 storedNumber = result;
 
 console.log('FirstNumber'+firstNumber+'Stored'+storedNumber)
})














