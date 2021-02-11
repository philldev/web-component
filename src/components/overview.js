import { html } from 'lit-element'
import { formatCurrency } from '../App'

export const overview = ({ totalBudget, totalIncome, totalExpense }) => {
  return html`
    <div class="overview">
      <h2 class="overview-title">Overview</h2>
      <div class="overview-detail">
        <h3 class="overview-total">
          <span>Total budget</span
          ><span class="amount">${formatCurrency(totalBudget)}</span>
        </h3>
        <h3 class="overview-total">
          <span>Total income</span
          ><span class="amount">${formatCurrency(totalIncome)}</span>
        </h3>
        <h3 class="overview-total">
          <span>Total expense</span
          ><span class="amount">${formatCurrency(totalExpense)}</span>
        </h3>
      </div>
    </div>
  `
}
