const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let displayValue = '0';
let firstValue = null;
let operator = null;
let awaitingNextValue = false;

function updateDisplay() {
    display.textContent = displayValue;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            displayValue = '0';
            firstValue = null;
            operator = null;
            awaitingNextValue = false;
        } else if (value === '=') {
            if (firstValue !== null && operator !== null) {
                displayValue = calculate(firstValue, operator, parseFloat(displayValue)).toString();
                firstValue = null;
                operator = null;
                awaitingNextValue = false;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (!awaitingNextValue) {
                firstValue = parseFloat(displayValue);
                operator = value;
                awaitingNextValue = true;
            }
        } else {
            if (awaitingNextValue) {
                displayValue = value;
                awaitingNextValue = false;
            } else {
                displayValue = displayValue === '0' ? value : displayValue + value;
            }
        }

        updateDisplay();
    });
});

function calculate(firstValue, operator, secondValue) {
    switch (operator) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '*':
            return firstValue * secondValue;
        case '/':
            return firstValue / secondValue;
        default:
            return secondValue;
    }
}

updateDisplay();
