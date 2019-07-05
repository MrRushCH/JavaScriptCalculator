class Calculator {
  numbers = document.querySelectorAll(".number");
  equals = document.querySelector(".equals");
  display = document.querySelector(".calculation");
  buttons = document.querySelectorAll("button");
  ac = document.querySelector(".AC");

  calculation = [];
  result = 0;
  equalsPressed = false;
  //calculates a result from operator, a and b
  operators = {
    "+": function (a, b) {
      return a + b;
    },
    "-": function (a, b) {
      return a - b;
    },
    "*": function (a, b) {
      return a * b;
    },
    "/": function (a, b) {
      return a / b;
    }
  };

  lastElement(array) {
    return array.length - 1;
  }
  isLastElementOperator(array) {
    this.isOperator(array[this.lastElement(array)]);
  }

  reset() {
    this.display.innerHTML = null;
    this.calculation = [];
    this.result = 0;
  }

  //Checks if an array contains an operator and returns the according value
  containsOperator(array) {
    var hasOperator = array.includes("+") || array.includes("-") || array.includes("*") || array.includes("/");
    return hasOperator;
  }

  //Checks if parameter is an operator
  isOperator = function (n) {
    var isOperator = n === "+" || n === "-" || n === "*" || n === "/";
    return isOperator;
  };

  //scans which button is pressed and executes according actions
  scanButton() {
    let self = this;
    self.buttons.forEach(function (item) {
      item.addEventListener("click", function () {
        if (item.classList.contains("number")) {
          if (self.result !== 0) {
            if (self.isLastElementOperator(self.calculation)) {
              self.reset();
            } else {
              self.display.innerHTML = 0;
              self.result = 0;
            }
          }

          self.calculation.push(item.dataset.button);

          if (
            self.display.innerHTML === "0" ||
            self.isOperator(self.calculation[self.calculation.length - 2])
          ) {
            self.display.innerHTML = item.dataset.button;
          } else {
            self.display.innerHTML += item.dataset.button;
          }

        } else {
          switch (true) {
            case item.dataset.button === "=":
              self.handleInput();
              break;
            case item.dataset.button === "AC":
              self.reset();
              break;
            case self.containsOperator(self.calculation):
              var [firstNumber, operator, secondNumber] = self.convertArray(
                self.calculation
              );
              self.calculation = [];
              self.calculation.push(
                self.temporaryCalculation(firstNumber, operator, secondNumber),
                item.dataset.button
              );
              break;
            default:
              self.calculation.push(item.dataset.button);
              break;

          }
        }
      });
    });
  }

  //Handles calculation and displays result on calculator display
  handleInput() {
    var self = this;
    this.ac.addEventListener("click", function () {
      self.calculation = [];
      self.display.innerHTML = 0;
    });
    var [firstNumber, operator, secondNumber] = this.convertArray(
      this.calculation
    );

    this.result = this.calculateResult(firstNumber, operator, secondNumber);

    this.display.innerHTML = this.result;
  }

  //Calculates the first 2 numbers of a calculation
  temporaryCalculation(firstNumber, operator, secondNumber) {
    var result = this.calculateResult(firstNumber, operator, secondNumber);
    return result;
  }

  //Returnns ordered Array: [number1, operator, number2]
  convertArray(array) {
    var self = this;
    var number1 = 0;
    var number2 = 0;
    var operator = null;

    array.forEach(function (item) {
      if (!self.isOperator(item) && operator === null) {
        var setFirstNumber = true;
      }
      switch (true) {
        case setFirstNumber:
          number1 += item;
          break;
        case operator === null:
          operator = item;
          break;
        default:
          number2 += item;
          break;
      }
    });
    return [number1, operator, number2];
  }

  //Calculates the result at the end of a calculation
  calculateResult(firstNumber, operator, secondNumber) {
    var result = null;
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    result = this.operators[operator](firstNumber, secondNumber);
    return Math.round(result * 1000) / 1000;
  }
}
const calculator = new Calculator();
calculator.scanButton();