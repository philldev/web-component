import { LitElement, html, css } from "lit-element";
import resetsStyle from "./resets.style";
import appStyle from "./App.style";

export default class App extends LitElement {
  static get properties() {
    return {
      income: Array,
      expense: Array,
      allData: Array,
    };
  }
  constructor() {
    super();
    this.income = [];
    this.expense = [];
    this.allData = [];
  }
  static get styles() {
    return [resetsStyle, appStyle];
  }

  _AddNewItem(newItem) {
    if (newItem?.type === "expense") {
      this.expense = [...this.expense, newItem];
    } else if (newItem?.type === " income") {
      this.income = [...this.income, newItem];
    }

    if (newItem) {
      this.allData = [...this.allData, newItem];
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    const {
      desc: { value: desc },
      amount: { value: amount },
      type: { value: type },
    } = e.target;
    if (desc && amount && type) {
      const newItem = {
        amount: type === "expense" ? parseInt(amount) * -1 : parseInt(amount),
        desc,
        type,
      };
      this._AddNewItem(newItem);
    }
    e.target.reset();
  }

  _getTotalBudget() {
    return this.allData.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  }
  _getTotalIncome() {
    return this.income.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  }
  _getTotalExpense() {
    return this.expense.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  }
  render() {
    console.log(this.allData);
    return html`
      <div class="app-container">
        ${header}
        <main class="main">
          <div class="app">
            ${Overview({
              totalBudget: this._getTotalBudget(),
              totalExpense: this._getTotalExpense(),
              totalIncome: this._getTotalIncome(),
            })}
            ${AddTrForm(this._handleSubmit)}
            ${Transactions({ allData: this.allData })}
          </div>
        </main>
        <footer class="footer"></footer>
      </div>
    `;
  }
}

const Overview = ({ totalBudget, totalIncome, totalExpense }) => {
  return html`
    <div class="overview">
      <h2 class="overview-title">Overview</h2>
      <div class="overview-detail">
        <h3 class="overview-total">
          <span>Total budget</span><span class="amount">$ ${totalBudget}</span>
        </h3>
        <h3 class="overview-total">
          <span>Total income</span><span class="amount">$ ${totalIncome}</span>
        </h3>
        <h3 class="overview-total">
          <span>Total expense</span><span class="amount">$ ${totalExpense}</span>
        </h3>
      </div>
    </div>
  `;
};

const Transactions = ({ allData = [] }) => {
  return html`
    <div class="transactions">
      <h2>Transaction List</h2>
      ${allData.length === 0
        ? html` <div class="empty">its empty...</div>`
        : html` <ul class="transactions-list">
            ${allData.map(
              (item) => html`
                <li class="transactions-item">
                  <p class="transactions-item__desc">${item.desc}</p>
                  <p class="transactions-item__amount">$ ${item.amount}</p>
                </li>
              `
            )}
          </ul>`}
    </div>
  `;
};

const AddTrForm = (handleSubmit) => {
  return html`
    <form @submit=${handleSubmit} class="form">
      <h2>Add new transaction</h2>
      <div class="form-field">
        <label for="">Description</label>
        <input type="text" name="desc" placeholder="Stuff" />
      </div>
      <div class="form-field">
        <label for="">Amount</label>
        <input type="number" name="amount" placeholder="$20" />
      </div>
      <div class="form-field">
        <label for="">Type</label>
        <div>
          <input type="radio" name="type" value="expense" />
          <span>Expense</span>
        </div>
        <div>
          <input type="radio" name="type" value="income" />
          <span>Income</span>
        </div>
      </div>
      <button>Add</button>
    </form>
  `;
};

const header = html`
  <header class="header">
    <div class="top-border"></div>
    <h1>Budget App</h1>
    <ul>
      <li>
        <a href="#">Overview</a>
      </li>
      <li>
        <a href="#expenses">Expenses</a>
      </li>
      <li>
        <a href="#incomes">Incomes</a>
      </li>
    </ul>
  </header>
`;
