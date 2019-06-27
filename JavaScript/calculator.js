var numbers = document.querySelectorAll(".number");
var equals = document.querySelector(".equals");
var display = document.querySelector('.calculation');

var number1 = 0;
var number2 = 0;
var result = 0;
var operator = null;

numbers.forEach(
    function (currentValue) {
        currentValue.addEventListener('click', function () {
            console.log(this);
            if (operator === null) {
                if (number1 === 0) {
                    number1 = currentValue.dataset.number;
                    displayNumber(number1);
                } else {
                    number1 += currentValue.dataset.number;
                    displayNumber(number1);
                }
            } else {
                if (number2 === 0) {
                    number2 = currentValue.dataset.number;
                    displayNumber(number2);
                } else {
                    number2 += currentValue.dataset.number;
                    displayNumber(number2);
                }
            }
            console.log(number1);
            console.log(number2);
        })
    });



equals.addEventListener('click', function () {
    console.log(this);
    switch (operator) {
        case "+":
            addition();
            break;
        case "-":
            subtraction();
            break;
        case "/":
            division();
            break;
        case "*":
            muliplication();
            break;
    }
})

function temporaryCalculation() {

    console.log(this);
    switch (operator) {
        case "+":
            number1 = parseFloat(number1) + parseFloat(number2);
            number2 = 0;
            break;
        case "-":
            number1 = parseFloat(number1) - parseFloat(number2);
            number2 = 0;
            break;
        case "/":
            number1 = parseFloat(number1) / parseFloat(number2);
            number2 = 0;
            break;
        case "*":
            number1 = parseFloat(number1) * parseFloat(number2);
            number2 = 0;
            break;
    }
}

function addition() {
    result = parseFloat(number1) + parseFloat(number2);
    roundNumber();
    display.innerHTML = result;
    endCalculation();
}

function subtraction() {
    result = parseFloat(number1) - parseFloat(number2);
    roundNumber();
    display.innerHTML = result;
    endCalculation();
}

function muliplication() {
    result = parseFloat(number1) * parseFloat(number2);
    roundNumber();
    display.innerHTML = result;
    endCalculation();
}

function division() {
    result = parseFloat(number1) / parseFloat(number2);
    roundNumber();
    display.innerHTML = result;
    endCalculation();
}

function additionNumber1() {
    number1 = parseFloat(number1) + parseFloat(number2);
    number2 = 0;
}

function subtractionNumber1() {
    number1 = parseFloat(number1) + parseFloat(number2);
    number2 = 0;
}

function multiplicationNumber1() {
    number1 = parseFloat(number1) * parseFloat(number2);
    number2 = 0;
}

function divisionNumber1() {
    number1 = parseFloat(number1) / parseFloat(number2);
    number2 = 0;
}

function displayNumber(numberToDisplay) {
    display.innerHTML = numberToDisplay;
}

function endCalculation() {
    operator = null;
    number1 = result;
    number2 = 0;
    result = 0;
}

function useAdd() {
    if (number2 !== 0) {
        temporaryCalculation();
        operator = "+";
    } else {
        operator = "+";
    }
}

function useSubtract() {
    if (number2 !== 0) {
        temporaryCalculation();
        operator = "-";
    } else {
        operator = "-";
    }
}

function useMultiply() {
    if (number2 !== 0) {
        temporaryCalculation();
        operator = "*";
    } else {
        operator = "*";
    }
}

function useDivide() {
    if (number2 !== 0) {
        temporaryCalculation();
        operator = "/";
    } else {
        operator = "/";
    }
}

function roundNumber() {
    if (result - Math.floor(result) !== 0) {
        result = result.toFixed(2);
    }
}

function ac() {
    number1 = 0;
    operator = null;
    number2 = 0;
    result = 0;
    display.innerHTML = 0;
}