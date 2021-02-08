/////////////////////////////////////////////////////////////////////////////////////////////
// there are 3 main functions for controlling the data, UI, and the app ctrler itself

// budgetController() is use only for calculating, storing the data.

// UIController() is use only for get an input and showing the output to the UI, getting all the DOM ids

// AppController() is use for controlling both functions. 
////////////////////////////////////////////////////////////////////////////////////////////

// budget controller
const budgetController = (() => {
  // income item constructor
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // expense item constructor
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  // calculate percentages methods for each expense
  Expense.prototype.calcPercent = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  // show percentages methods for each expense
  Expense.prototype.getPercent = function () {
    return this.percentage;
  };

  // calculate total for income or expense
  const calculateTotal = function (type) {
    let sum = 0;

    data.allItems[type].forEach((item) => {
      sum += item.value;
    });

    data.totals[type] = sum;
  };

  // data structure for budget
  const data = {
    // income and expense array of object
    allItems: {
      exp: [],
      inc: [],
    },
    // total for each income and expense
    totals: {
      exp: 0,
      inc: 0,
    },
    // overall budget available
    budget: 0,
    percentage: -1,
  };

  // public functions
  return {
    // add item into data structure
    addItem(type, desc, val) {
      let ID, newItem;

      // create new id
      if (data.allItems[type] > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create new item
      if (type === "exp") {
        newItem = new Expense(ID, desc, val);
      } else if (type === "inc") {
        newItem = new Income(ID, desc, val);
      }

      //push item into data structure
      data.allItems[type].push(newItem);

      // return the item
      return newItem;
    },
    // calculate budget
    calculateBudget() {
      // calculate total
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the budget
      data.budget = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        // calculate percentage
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    //calculate percentages for all expense
    calculatePercent() {
      data.allItems.exp.forEach((e) => {
        e.calcPercent(data.totals.inc);
      });
    },
    // show the percentages
    getPercent() {
      const allPercent = data.allItems.exp.map((e) => {
        return e.getPercent();
      });
      return allPercent;
    },
    // show the budget
    getBudget() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
    // delete an item from data structure
    deleteItem(type, id) {
      const itemID = data.allItems[type].map((e) => {
        return e.id;
      });

      const itemIndex = itemID.indexOf(id);

      if (itemIndex !== -1) {
        data.allItems[type].splice(itemIndex, 1);
      }
    },
    // debugging functions
    testing() {
      // code here
    },
  };
})();

// UI controller
const UIController = (() => {
  // list of all UI ids and classes
  const DOMstrings = {
    budgetinput: {
      type: "budget__type__input",
      description: "budget__description__input",
      value: "budget__value__input",
      btn: "budget__add__input",
    },
    Itemlist: {
      incomeList: "income__list",
      expensesList: "expenses__list",
      deleteItem: "item_delete",
      ItemsContainer: "item__list",
      itemPercent: ".item_percent",
    },
    budgetOutput: {
      budget: "budget__value__display",
      totalExpenses: "total__expenses__display",
      totalIncome: "total__income__display",
      expensePercentage: "exp__percentage__display",
    },
  };

  // number formating
  const formatNum = function (num, type) {
    let numSplit, int, dec, sign;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");

    dec = numSplit[1];

    int = formatThous(numSplit[0]);

    sign = type === "exp" ? "-" : "+";

    return `${sign} ${int}.${dec}`;
  };

  // thousands formating
  const formatThous = function (num) {
    let res;

    if (num.length > 3 && num.length < 7) {
      // if 1k - 100k
      res = `${num.substr(0, num.length - 3)},${num.substr(num.length - 3, 3)}`;
    } else if (num.length > 6 && num.length < 9) {
      // if 1 million
      res = `${num.substr(0, 1)},${num.substr(1, 3)},${num.substr(
        num.length - 3,
        3
      )}`;
    } else if (num.length > 8) {
      res = `${num.substr(0, 3)},${num.substr(3, 3)},${num.substr(
        num.length - 3,
        3
      )}`;
    } else {
      res = num;
    }

    return res;
  };

  // public functions
  return {
    // show month in UI
    displayMonth() {
      let date, year, month;

      date = new Date();

      year = date.getFullYear();

      month = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      document.getElementById("month").textContent = `Budget available in ${
        month[date.getMonth()]
      } ${year}`;
    },
    // get input from UI
    getInput() {
      return {
        type: document.getElementById(DOMstrings.budgetinput.type).value,
        description: document.getElementById(DOMstrings.budgetinput.description)
          .value,
        value: parseFloat(
          document.getElementById(DOMstrings.budgetinput.value).value
        ),
      };
    },
    // return the dom ids for app ctrl
    getDOM: function () {
      return DOMstrings;
    },
    // show the item in the UI
    addListItem(item, type) {
      let html, element;

      // create html
      if (type === "inc") {
        element = DOMstrings.Itemlist.incomeList;
        html = `<div class="income-item" id="inc-${item.id}">
        <div class="item-description">
          <span id="item_description">${item.description}</span>
        </div>
        <div class="item-right">
          <span class="item-value">${formatNum(item.value, type)}</span>
          <span class="item-delete" 
            ><i id="item_delete" class="las la-trash-alt"></i
          ></span>
        </div>
      </div>`;
      } else if (type === "exp") {
        element = DOMstrings.Itemlist.expensesList;
        html = `<div class="expense-item" id="exp-${item.id}">
        <div class="item-description">
          <span id="item_description">${item.description}</span>
        </div>
        <div class="item-right">
          <span class="item-value">
            ${formatNum(item.value, type)}
            <span class="item_percent"></span>
          </span>
          <span class="item-delete" 
            ><i id="item_delete" class="las la-trash-alt"></i
          ></span>
        </div>
      </div>`;
      }
      // create add item to the UI
      document.getElementById(element).insertAdjacentHTML("beforeend", html);
    },
    // clearing input after adding an item
    clearInput() {
      const inputFields = document.querySelectorAll(
        `#${DOMstrings.budgetinput.description}, #${DOMstrings.budgetinput.value}`
      );

      inputFields.forEach((element) => {
        element.value = "";
      });

      document.getElementById(DOMstrings.budgetinput.description).focus();
    },
    // displaying budget in the UI
    displayBudget(budgetObj) {
      let type;

      type = budgetObj.budget > 0 ? "inc" : "exp";

      document.getElementById(
        DOMstrings.budgetOutput.budget
      ).textContent = formatNum(budgetObj.budget, type);
      document.getElementById(
        DOMstrings.budgetOutput.totalIncome
      ).textContent = formatNum(budgetObj.totalInc, "inc");
      document.getElementById(
        DOMstrings.budgetOutput.totalExpenses
      ).textContent = formatNum(budgetObj.totalExp, "exp");

      if (budgetObj.percentage > 0) {
        document.getElementById(
          DOMstrings.budgetOutput.expensePercentage
        ).textContent = budgetObj.percentage + "%";
      } else {
        document.getElementById(
          DOMstrings.budgetOutput.expensePercentage
        ).textContent = "--";
      }
    },
    // delete an item from the UI
    deleteItem(id) {
      const el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    // displaying the percentages for each expenses
    displayPercent(percentages) {
      const item = document.querySelectorAll(DOMstrings.Itemlist.itemPercent);

      const nodeListForEach = function (node, callback) {
        for (let i = 0; i < node.length; i++) {
          callback(node[i], i);
        }
      };

      nodeListForEach(item, (el, idx) => {
        if (percentages[idx] > 0) {
          el.textContent = percentages[idx] + "%";
        } else {
          el.textContent = "---";
        }
      });
    },
    // testing functions for debugging
    publicTest() {
      //testing function
      console.log(
        document.getElementById(DOMstrings.budgetOutput.expensePercentage)
      );
    },
  };
})();

// App controller
const appController = ((bctrl, UIctrl) => {
  // delete item ctrler
  const ctrlDelete = function (e) {
    let itemID, id, type;

    itemID = e.target.parentNode.parentNode.parentNode.id;

    if (itemID) {
      id = parseInt(itemID.split("-")[1]);
      type = itemID.split("-")[0];

      bctrl.deleteItem(type, id);

      UIctrl.deleteItem(itemID);

      updateBudget();
    }
  };

  // updating the percentages ctrl
  const updatePercent = function () {
    // calculate the percentages
    bctrl.calculatePercent();

    const percentages = bctrl.getPercent();

    UIctrl.displayPercent(percentages);
  };

  // updating budget ctrler
  const updateBudget = function () {
    // calculate budget
    bctrl.calculateBudget();

    // get the budget from bctrl
    const budget = bctrl.getBudget();

    // display budget to the UI
    UIctrl.displayBudget(budget);
  };

  // input budget ctrlr
  const ctrlInput = function () {
    // Get the input data
    const input = UIctrl.getInput();

    // Check if input fields not empty
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // add data into budget controller
      const newItem = bctrl.addItem(input.type, input.description, input.value);

      // add item to the UI
      UIctrl.addListItem(newItem, input.type);

      // clear input fields
      UIctrl.clearInput();

      // calculate budget
      updateBudget();

      // calculate percent
      updatePercent();
    }
  };

  // event listener from the DOM
  const eventListener = function () {
    const DOM = UIctrl.getDOM();

    // add item when click
    document
      .getElementById(DOM.budgetinput.btn)
      .addEventListener("click", ctrlInput);
    // add item when press enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode == "13") {
        ctrlInput();
      }
    });

    // delete item
    document
      .getElementById(DOM.Itemlist.ItemsContainer)
      .addEventListener("click", ctrlDelete);
  };
  // public functions
  return {
    // initialize app
    init: function () {
      UIctrl.displayMonth();
      console.log("app has started");
      eventListener();
    },
  };
})(budgetController, UIController);
appController.init();
