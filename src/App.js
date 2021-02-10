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
          <span>Total expense</span
          ><span class="amount">$ ${totalExpense}</span>
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
                  <div class="transactions-item__toolbar">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
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
