class Calculator {
  display = document.querySelector(".calculation");
  buttons = document.querySelectorAll("button");
  clear = document.querySelector(".AC");

  calculation = [];
  result = 0;
  regex = new RegExp(/[\+\-\*\/]/);
  // calculates a result from an operator, number1 and number2
  executeCalculation = {
    "+": function(number1, number2) {
      return number1 + number2;
    },
    "-": function(number1, number2) {
      return number1 - number2;
    },
    "*": function(number1, number2) {
      return number1 * number2;
    },
    "/": function(number1, number2) {
      return number1 / number2;
    }
  };

  // selects an Element in an Array
  getLastElement(element) {
    return this.calculation.length - element;
  }

  //Checks if parameter is an operator
  isOperator = function(n) {
    var isOperator = this.regex.test(n);
    return isOperator;
  };

  //Checks if an array contains an operator and returns the according value
  containsOperator(array) {
    var containsOperator =
      array.includes("+") ||
      array.includes("-") ||
      array.includes("*") ||
      array.includes("/");
    return containsOperator;
  }

  //Checks if last element is an Operator
  isElementOperator(element) {
    var lastPressedElement = this.calculation[this.getLastElement(element)];
    return this.isOperator(lastPressedElement);
  }

  // resets global Variables
  resetCalculation() {
    this.display.innerHTML = null;
    this.calculation = [];
    this.result = 0;
  }

  //scans which button is pressed and executes according actions
  scanButton() {
    var self = this;
    self.buttons.forEach(function(item) {
      item.addEventListener("click", function() {
        var itemValue = item.dataset.button;

        if (item.classList.contains("number")) {
          // auf Funktion auslagern
          if (self.result !== 0) {
            if (!self.isElementOperator(1, self.calculation)) {
              self.resetCalculation();
            } else {
              self.display.innerHTML = 0;
              self.result = 0;
            }
          }
          self.calculation.push(itemValue);
          //Checks when the displayed Number should be replaced and when a number should be added to it
          self.display.innerHTML === "0" ||
          self.isElementOperator(2, self.calculation)
            ? (self.display.innerHTML = itemValue)
            : (self.display.innerHTML += itemValue);
        } else {
          switch (true) {
            case itemValue === "=":
              self.handleInput();
              break;
            case itemValue === "AC":
              self.resetCalculation();
              break;
            case self.containsOperator(self.calculation):
              var [firstNumber, operator, secondNumber] = self.convertArray(
                self.calculation
              );
              self.calculation = [];
              self.calculation.push(
                self.temporaryCalculation(firstNumber, operator, secondNumber),
                itemValue
              );
              break;
            default:
              self.calculation.push(itemValue);
              break;
          }
        }
      });
    });
  }

  //Handles calculation and displays result on calculator display
  handleInput() {
    var self = this;
    this.clear.addEventListener("click", function() {
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

  // returns ordered Array: [number1, operator, number2]
  convertArray(array) {
    var self = this;
    var number1 = 0;
    var number2 = 0;
    var operator = null;

    array.forEach(function(item) {
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
    result = this.executeCalculation[operator](firstNumber, secondNumber);
    return Math.round(result * 1000) / 1000;
  }
}
const calculator = new Calculator();
calculator.scanButton();
