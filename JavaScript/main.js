class Calculator {
  numbers = document.querySelectorAll(".number");
  equals = document.querySelector(".equals");
  display = document.querySelector(".calculation");
  buttons = document.querySelectorAll("button");
  ac = document.querySelector(".AC");

  calculation = [];

  result = 0;

  isOperator = function (n) {
    if (n === "+" || n === "-" || n === "*" || n === "/") {
      return true;
    } else {
      return false;
    }
  }

  equalsPressed = false;
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

  scanButton() {
    let self = this;
    self.buttons.forEach(function (item) {
      item.addEventListener("click", function () {
        if (item.classList.contains("number")) {
          if (self.result !== 0 && !self.isOperator(self.calculation[self.calculation.length - 1])) {
            self.result = 0;
            self.display.innerHTML = "0";
            self.calculation = [];
          }
          self.calculation.push(item.dataset.button);
          if (self.display.innerHTML === "0") {
            self.display.innerHTML = item.dataset.button;
          } else {
            self.display.innerHTML += item.dataset.button;
          }
        } else if (item.dataset.button === "=") {
          self.handleInput();
        } else if (item.classList.contains("AC")) {
          self.calculation = [];
          self.display.innerHTML = 0;
        } else if (
          self.calculation.indexOf("+") !== -1 ||
          self.calculation.indexOf("-") !== -1 ||
          self.calculation.indexOf("*") !== -1 ||
          self.calculation.indexOf("/") !== -1
        ) {
          self.display.innerHTML = "0";
          var [firstNumber, operator, secondNumber] = self.convertArray(self.calculation);
          console.log("temporary calculation: ", firstNumber, operator, secondNumber);
          self.calculation = [];
          self.calculation.push(self.temporaryCalculation(firstNumber, operator, secondNumber));
          self.calculation.push(item.dataset.button);
        } else {
          self.calculation.push(item.dataset.button);
          console.log("first operator:", item.dataset.button);
          self.display.innerHTML = "0";
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
    console.log("array: ", this.calculation);
    this.result = this.calculateResult(firstNumber, operator, secondNumber);
    console.log("result:", this.result);
    this.display.innerHTML = this.result;
  }

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
      if (
        !(self.isOperator(item)) && operator === null) {
        var setFirstNumber = true;
      }


      if (setFirstNumber) {
        number1 += item;
      } else if (operator === null) {
        operator = item;
      } else {
        number2 += item;
      }
    });
    return [number1, operator, number2];
  }
  calculateResult(firstNumber, operator, secondNumber) {
    var result = null;
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    console.log(firstNumber, operator, secondNumber);
    result = this.operators[operator](firstNumber, secondNumber);
    console.log("operator:", operator);
    return result;
  }
}
const calculator = new Calculator();
calculator.scanButton();