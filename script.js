class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '/':
                computation = prev / current;
                break
            case '^':
                computation = Math.pow(prev, current);
                break
            case '%':
                computation = (current * prev) / 100;
                break
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = +computation.toFixed(5);
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ""
        return floatNumber.toLocaleString('en')

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            `${this.getDisplayNumber(this.currentOperand)}`
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    mathSqrt() {
        const currentOperand = this.currentOperandTextElement.innerText;
        const result = this.currentOperand = Math.sqrt(currentOperand);
        this.currentOperandTextElement.innerText = result;
        //2.0  const prev = parseFloat(this.currentOperand)
        //2.0  this.currentOperand = Math.sqrt(prev);
    }

    mathCbrt() {
        const currentOperand = this.currentOperandTextElement.innerText;
        const result = Math.cbrt(currentOperand);
        this.currentOperandTextElement.innerText = result;
    }


    mathMinusPlus() {
        let currentOperand = this.currentOperandTextElement.innerText;
        let result = this.currentOperand = this.currentOperand * -1;
        this.readyToReset = true
        this.currentOperandTextElement.innerText = result;
    }


}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const sqrtButton = document.querySelector('[data-sqrt]');
const cbrtButton = document.querySelector('[data-cbrt]');
const plusMinusButton = document.querySelector('[data-plus-minus]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

sqrtButton.addEventListener('click', button => {
    calculator.compute();
    calculator.mathSqrt();

    //2.0  calculator.mathSqrt();
    //2.0  calculator.updateDisplay();
})

cbrtButton.addEventListener('click', button => {
    calculator.clear();
    calculator.mathCbrt();
})

plusMinusButton.addEventListener('click', button => {
    calculator.mathMinusPlus();
    calculator.compute();
})

//plusMinusButton.addEventListener('click', () => {
//    calculator.min();
//   calculator.updateDisplay();
//})