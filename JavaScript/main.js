class Calculator {
  numbers = document.querySelectorAll(".number");
  equals = document.querySelector(".equals");
  display = document.querySelector(".calculation");
  buttons = document.querySelectorAll("button");

  calculation = [];
  equalsPressed = false;

  scanButton() {
    var buttons = this.buttons;
    var display = this.display;
    var pressedButton = null;
    var calculation = [];
    if (pressedButton !== "=") {
      buttons.forEach(function(button) {
        button.addEventListener("click", function() {
          pressedButton = button.dataset.button;
          if (pressedButton !== "=") {
            if (button.classList.contains("number")) {
              if (display.innerHTML === "0") {
                display.innerHTML = pressedButton;
              } else {
                display.innerHTML += pressedButton;
              }
            } else {
              display.innerHTML = "0";
            }
            calculation.push(pressedButton);
          }
        });
      });
    }
    return calculation;
  }

  scanArray() {
    var number1;
    var number2;
    var operator = null;
    this.scanButton().forEach(function(item) {
      if (item !== "+" || item !== "-" || item !== "*" || item !== "/") {
        number1 += item[0];
      } else {
        operator += item[1];
      }
    });
    return [number1, operator, number2];
  }
  calculateResult() {
    var result;
    switch (this.operator) {
      case "+":
        result = parseFloat(this.getNumber1()) + parseFloat(this.getNumber1());
        break;
      case "-":
        result = parseFloat(this.getNumber1()) - parseFloat(this.getNumber1());
        break;
      case "*":
        result = parseFloat(this.getNumber1()) * parseFloat(this.getNumber1());
        break;
      case "/":
        result = parseFloat(this.getNumber1()) / parseFloat(this.getNumber1());
        break;
    }
    return result;
  }
  getNumber1() {
    return this.scanArray()[0];
  }
  getOperator() {
    return this.scanArray()[1];
  }
  getNumber2() {
    return this.scanArray()[2];
  }
  displayResult() {
    this.display.innerHTML = this.calculateResult();
  }
}
const calculator = new Calculator();
calculator.scanButton();
