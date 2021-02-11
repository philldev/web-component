import { html, LitElement } from 'lit-element'
import shortid from 'shortid'
import appStyle from './App.style'
import { AddTrForm } from './components/AddTrForm'
import { header } from './components/header'
import { iconStyle } from './components/icon'
import { overview } from './components/overview'
import { transactions } from './components/transactions'
import resetsStyle from './resets.style'

export const formatCurrency = (currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency)
}

export default class App extends LitElement {
  static get properties() {
    return {
      income: Array,
      expense: Array,
      allData: Array,
      isEditing: Boolean,
    }
  }
  constructor() {
    super()
    this.income = []
    this.expense = []
    this.allData = []
    this.editing = false
  }
  static get styles() {
    return [resetsStyle, appStyle, iconStyle]
  }

  _AddNewItem(newItem) {
    console.log(newItem)
    if (newItem?.type === 'expense') {
      this.expense = [...this.expense, newItem]
    } else if (newItem?.type === ' income') {
      this.income = [...this.income, newItem]
    }

    if (newItem) {
      this.allData = [...this.allData, newItem]
    }
  }

  _handleSubmit(e) {
    e.preventDefault()
    const {
      desc: { value: desc },
      amount: { value: amount },
      type: { value: type },
    } = e.target
    if (desc && amount && type) {
      const newItem = {
        id: shortid.generate(),
        amount: type === 'expense' ? parseInt(amount) * -1 : parseInt(amount),
        desc,
        type,
      }
      this._AddNewItem(newItem)
    }
    e.target.reset()
    e.target.desc.focus()
  }

  _getTotalBudget() {
    return this.allData.reduce((prev, curr) => {
      return prev + curr.amount
    }, 0)
  }
  _getTotalIncome() {
    return this.income.reduce((prev, curr) => {
      return prev + curr.amount
    }, 0)
  }
  _getTotalExpense() {
    return this.expense.reduce((prev, curr) => {
      return prev + curr.amount
    }, 0)
  }

  _deleteTransaction(transaction) {
    this.allData = this.allData.filter((item) => item.id !== transaction.id)
    if (transaction.type === 'expense') {
      this.expense = this.expense.filter((item) => item.id !== transaction.id)
    } else if (transaction.type === 'income') {
      this.income = this.income.filter((item) => item.id !== transaction.id)
    }
  }

  render() {
    return html`
      <div class="app-container">
        ${header}
        <main class="main">
          <div class="app">
            ${overview({
              totalBudget: this._getTotalBudget(),
              totalExpense: this._getTotalExpense(),
              totalIncome: this._getTotalIncome(),
            })}
            ${AddTrForm(this._handleSubmit)}
            ${transactions({
              allData: this.allData,
              deleteTransaction: this._deleteTransaction.bind(this),
            })}
          </div>
        </main>
        <footer class="footer"></footer>
      </div>
    `
  }
}
