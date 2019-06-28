class Calculator {
    numbers = document.querySelectorAll(".number");
    equals = document.querySelector(".equals");
    display = document.querySelector(".calculation");
    buttons = document.querySelectorAll("button");
    calculation = []

    equalsPressed = false;

    scanButton() {
        let self = this;
        var buttons = this.buttons;
        var display = this.display;
        buttons.forEach(function (item) {
            item.addEventListener('click', function () {
                if (item.classList.contains("number")) {
                    self.calculation.push(item.dataset.button);
                    if (display.innerHTML === "0") {
                        display.innerHTML = item.dataset.button;
                    } else {
                        display.innerHTML += item.dataset.button;
                    }
                } else if (item.dataset.button === "=") {
                    self.calculate()
                } else {
                    self.calculation.push(item.dataset.button);
                    display.innerHTML = "0";
                }
            })
        })
    }

    calculate() {
        console.log(this.calculation)
        var [firstNumber, operator, secondNumber] = this.scanArray(this.calculation);
        console.log("items:", firstNumber, operator, secondNumber);
        var result = this.calculateResult(firstNumber, operator, secondNumber);
        this.display.innerHTML = result;
        console.log(result)
    }

    scanArray(calculation) {
        console.log("scanArray started");
        var number1 = 0;
        var number2 = 0;
        var operator = null;
        console.log("CALCULATION:");

        console.log(calculation)
        calculation.forEach(function (item) {
            console.log("item: " + item)
            console.log(operator === null)
            if (!(item === "+" || item === "-" || item === "*" || item === "/") && operator === null) {
                number1 += item;
                calculation.slice(calculation.indexOf(item));
                console.log("Adding", item, "to", number1);
            } else if (operator === null) {
                operator = item;
                console.log(operator);
            } else {
                number2 += item;
                console.log(number2);
            }
        });
        console.log("Operator: " + operator)
        return [number1, operator, number2];
    }
    calculateResult(firstNumber, operator, secondNumber) {
        console.log("calculation started");
        var result = null;
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        console.log(firstNumber, operator, secondNumber)
        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            case "/":
                result = firstNumber / secondNumber;
                break;
            default:
                break;
        }
        return result;
    }
}
const calculator = new Calculator();
calculator.scanButton();