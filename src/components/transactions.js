import { html } from 'lit-element'
import { formatCurrency } from '../App'
import { deleteIcon } from './icon'

export const transactions = ({ allData = [], deleteTransaction }) => {
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
                  <p class="transactions-item__amount">
                    ${formatCurrency(item.amount)}
                  </p>
                  <div class="transactions-item__toolbar">
                    ${deleteIcon(() => {
                      deleteTransaction(item)
                    })}
                  </div>
                </li>
              `
            )}
          </ul>`}
    </div>
  `
}
