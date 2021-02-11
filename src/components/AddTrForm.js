import { html } from 'lit-element'
import { formatCurrency } from '../App'

export const AddTrForm = (handleSubmit) => {
  return html`
    <form @submit=${handleSubmit} class="form">
      <h2>Add new transaction</h2>
      <div class="form-field">
        <label for="">Description</label>
        <input type="text" name="desc" placeholder="Stuff" />
      </div>
      <div class="form-field">
        <label for="">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="${formatCurrency(20)}"
        />
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
  `
}
