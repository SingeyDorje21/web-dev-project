let currentInput = '';
let operator = '';
let firstOperand = null;

function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    document.getElementById('display').value = '';
}

function calculateResult() {
    if (currentInput === '') return;

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
            case '+':
                firstOperand += secondOperand;
                break;
            case '-':
                firstOperand -= secondOperand;
                break;
            case '*':
                firstOperand *= secondOperand;
                break;
            case '/':
                if (secondOperand !== 0) {
                    firstOperand /= secondOperand;
                } else {
                    alert("Cannot divide by zero");
                    clearDisplay();
                    return;
                }
                break;
            default:
                return;
        }
    }

    document.getElementById('display').value = firstOperand;
    currentInput = '';
}

function setOperator(op) {
    if (currentInput === '') return;

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        calculateResult();
    }
    
    operator = op;
    currentInput = '';
}