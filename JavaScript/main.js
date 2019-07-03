class Calculator {
  numbers = document.querySelectorAll(".number");
  equals = document.querySelector(".equals");
  display = document.querySelector(".calculation");
  buttons = document.querySelectorAll("button");
  ac = document.querySelector(".AC");

  calculation = [];

  equalsPressed = false;

  scanButton() {
    let self = this;
    var buttons = this.buttons;
    var display = this.display;
    buttons.forEach(function(item) {
      item.addEventListener("click", function() {
        if (item.classList.contains("number")) {
          self.calculation.push(item.dataset.button);
          if (display.innerHTML === "0") {
            display.innerHTML = item.dataset.button;
          } else {
            display.innerHTML += item.dataset.button;
          }
        } else if (item.dataset.button === "=") {
          self.calculate();
        } else if (
          self.calculation.indexOf("+") !== -1 ||
          self.calculation.indexOf("-") !== -1 ||
          self.calculation.indexOf("*") !== -1 ||
          self.calculation.indexOf("/") !== -1
        ) {
          self.calculation.push(item.dataset.button);

          var deleteToHere = self.calculation.indexOf(item.dataset.button);
          for (var i = 0; i < deleteToHere - 1; i++) {
            self.calculation.splice(i);
          }
          display.innerHTML = "0";

          var [firstNumber, operator, secondNumber] = self.scanArray(
            self.calculation
          );
          console.log(firstNumber, operator, secondNumber);
          self.calculation[0] = self.calculateResult(
            firstNumber,
            operator,
            secondNumber
          );
          console.log(self.calculation);
          console.log("first operator: ", operator);
        } else {
          self.calculation.push(item.dataset.button);
          display.innerHTML = "0";
        }
      });
    });
  }

  //Handles calculation and displays result on calculator display
  handleInput() {
    var result = 0;
    var self = this;
    this.ac.addEventListener("click", function() {
      self.calculation = [];
      self.display.innerHTML = 0;
    });
    var [firstNumber, operator, secondNumber] = this.scanArray(
      this.calculation
    );
    console.log("second operator: ", operator);
    result = this.calculateResult(firstNumber, operator, secondNumber);
    console.log("result:", result);
    this.display.innerHTML = result;
  }

  //Returnns ordered Array: [number1, operator, number2]
  scanArray(calculation) {
    var number1 = 0;
    var number2 = 0;
    var operator = null;

    calculation.forEach(function(item) {
      if (
        !(item === "+" || item === "-" || item === "*" || item === "/") &&
        operator === null
      ) {
        number1 += item;
        calculation.slice(calculation.indexOf(item));
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
