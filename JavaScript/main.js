class Calculator {
  //ctx = (operators = ["+", "-", "*", "/"]);

  pressedButton = undefined;
  calculation = [];
  result = 0;
  regex = new RegExp(/[\+\-\*\/]/);
  event = new Event("click");
  stateClasses = {
    active: "state-active"
  };

  constructor(ctx) {
    //Assigns context, so that actions only affect one calculator
    this.ctx = ctx;
    this.display = this.ctx.querySelector(".calculation");
    this.buttons = this.ctx.querySelectorAll("button");
    this.clear = this.ctx.querySelector(".AC");
    this.initializeButtons();
    this.initializeKeyboard();
  }
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

  //Checks if parameter is an operator
  isOperator(operator) {
    return this.regex.test(operator);
  }

  // checks arrays for operators, with optional index value
  hasOperator(element) {
    if (element !== undefined) {
      return this.regex.test(
        this.calculation[this.calculation.length - element]
      );
    }
    return (
      this.calculation.includes("+") ||
      this.calculation.includes("-") ||
      this.calculation.includes("*") ||
      this.calculation.includes("/")
    );
  }

  // resets global Variables
  resetCalculation() {
    this.display.innerHTML = 0;
    this.calculation = [];
    this.result = 0;
  }

  //scans which keyboard button is pressed and executes according actions
  initializeKeyboard() {
    var self = this;
    document.onkeydown = function(e) {
      e = e || window.event;
      switch (e.which || e.keyCode) {
        case 13:
          self.manageInput(document.querySelector(".equals")); //Enter
          break;
        case 48:
          self.manageInput(document.querySelector(".zero")); //0
          break;
        case 49:
          self.manageInput(document.querySelector(".one")); //1
          break;
        case 50:
          self.manageInput(document.querySelector(".two")); //2
          break;
        case 51:
          self.manageInput(document.querySelector(".three")); //3
          break;
        case 52:
          self.manageInput(document.querySelector(".four")); //4
          break;
        case 53:
          self.manageInput(document.querySelector(".five")); //5
          break;
        case 54:
          self.manageInput(document.querySelector(".six")); //6
          break;
        case 55:
          self.manageInput(document.querySelector(".seven")); //7
          break;
        case 56:
          self.manageInput(document.querySelector(".eight")); //8
          break;
        case 57:
          self.manageInput(document.querySelector(".nine")); //9
          break;
        case 187:
          self.manageInput(document.querySelector(".equals")); //=
          break;
        case 106:
          self.manageInput(document.querySelector(".multiply")); //*
          break;
        case 107:
          self.manageInput(document.querySelector(".add")); //+
          break;
        case 109:
          self.manageInput(document.querySelector(".subtract")); //-
          break;
        case 111:
          self.manageInput(document.querySelector(".divide")); ///
          break;
        case 110:
          self.manageInput(document.querySelector(".decimal")); //.
          break;
        case 27:
          self.manageInput(document.querySelector(".AC")); //ESC
          break;
        case 12:
          self.manageInput(document.querySelector(".AC")); //[x] (numpad)
        default:
          break;
      }
    };
  }

  //scans which button is pressed and executes according actions
  initializeButtons() {
    var self = this;
    this.buttons.forEach(function(button) {
      button.addEventListener("click", function() {
        self.manageInput(button);
      });
    });
  }

  handleActiveState(button) {
    var activeButton = this.ctx.querySelector("." + this.stateClasses.active);
    if (activeButton) {
      activeButton.classList.remove(this.stateClasses.active);
    }
    button.classList.add(this.stateClasses.active);
  }

  manageInput(button) {
    this.handleActiveState(button);

    var buttonValue = button.dataset.button;
    if (button.classList.contains("number")) {
      if (this.result !== 0) {
        if (!this.hasOperator(1)) {
          this.resetCalculation();
        } else {
          this.display.innerHTML = 0;
          this.result = 0;
        }
      }
      this.calculation.push(buttonValue);
      //Checks when the displayed Number should be replaced and when a number should be added to it
      this.display.innerHTML === "0" || this.hasOperator(2)
        ? (this.display.innerHTML = buttonValue)
        : (this.display.innerHTML += buttonValue);
    } else {
      switch (true) {
        case buttonValue === "=":
          this.handleInput();
          break;
        case buttonValue === "AC":
          this.resetCalculation();
          break;
        case this.hasOperator(undefined):
          var [firstNumber, operator, secondNumber] = this.convertArray(
            this.calculation
          );
          this.calculation = [];
          this.calculation.push(
            this.temporaryCalculation(firstNumber, operator, secondNumber),
            buttonValue
          );
          break;
        default:
          this.calculation.push(buttonValue);
          break;
      }
    }
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

    this.result = this.temporaryCalculation(
      firstNumber,
      operator,
      secondNumber
    );
  }

  //Calculates the first 2 numbers of a calculation
  temporaryCalculation(firstNumber, operator, secondNumber) {
    if (!operator) {
      return firstNumber;
    }
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    var result = this.executeCalculation[operator](firstNumber, secondNumber);
    var roundedResult = Math.round(result * 1000) / 1000;
    this.display.innerHTML = roundedResult;
    return roundedResult;
  }

  // returns ordered Array: [number1, operator, number2]
  convertArray(array) {
    var self = this;
    var number1 = 0;
    var number2 = 0;
    var operator = null;

    array.forEach(function(item) {
      if (!self.isOperator(item) && operator === null) {
        number1 += item;
      } else if (operator === null) {
        operator = item;
      } else {
        number2 += item;
      }
    });
    return [number1, operator, number2];
  }
}
//Creates new instance of Calculator with context as parameter
const calculator = new Calculator(document.querySelector(".calculator1"));
