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

function appendDigit(digit){
    if(operator === ''){
        firstNumber += digit;
        updateDisplay(firstNumber);
    } else {
        secondNumber += digit;
        updateDisplay(secondNumber);
    }
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendDigit(button.textContent);
    });
});

updateDisplay('0');