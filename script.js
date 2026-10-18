function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let justCalculated = false;

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);

    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

const display = document.querySelector('.display');
const digitButtons = document.querySelectorAll('.digit');

function updateDisplay(value){
    display.textContent = value;
}

function addDigitTo(current, digit) {
  return current === '0' ? digit : current + digit;
}

function appendDigit(digit) {
  if (justCalculated) {
    firstNumber = '';
    justCalculated = false;
  }

  if (operator === '') {
    firstNumber = addDigitTo(firstNumber, digit);
    updateDisplay(firstNumber);
  } else {
    secondNumber = addDigitTo(secondNumber, digit);
    updateDisplay(secondNumber);
  }
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendDigit(button.textContent);
    });
});

updateDisplay('0');

const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');

function calculate() {
  if (operator === '/' && Number(secondNumber) === 0) {
    clearAll();
    updateDisplay('Nice try 😏');
    return;
  }

  let result = operate(operator, firstNumber, secondNumber);
  result = Math.round(result * 100000000) / 100000000;

  firstNumber = String(result);
  operator = '';
  secondNumber = '';
  justCalculated = true;
  updateDisplay(firstNumber);
}

function chooseOperator(newOperator) {
    if (firstNumber === '') return; // Do nothing if no first number

    if (secondNumber !== '') {
        calculate();
    }
    operator = newOperator;
    justCalculated = false;
}

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperator(button.dataset.operator);
    });
});

equalsButton.addEventListener('click', () => {
    if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
        calculate();
    }
});

const clearButton = document.querySelector('#clear');

function clearAll() {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  justCalculated = false;
  updateDisplay('0');
}

clearButton.addEventListener('click', clearAll);

const decimalButton = document.querySelector('#decimal');
const backspaceButton = document.querySelector('#backspace');

function appendDecimal() {
  if (justCalculated) {
    firstNumber = '';
    justCalculated = false;
  }

  if (operator === '') {
    if (firstNumber.includes('.')) return;
    firstNumber = firstNumber === '' ? '0.' : firstNumber + '.';
    updateDisplay(firstNumber);
  } else {
    if (secondNumber.includes('.')) return;
    secondNumber = secondNumber === '' ? '0.' : secondNumber + '.';
    updateDisplay(secondNumber);
  }
}

function backspace() {
  if (justCalculated) return;

  if (operator === '') {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || '0');
  } else {
    if (secondNumber === '') return;
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || '0');
  }
}

decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspace);