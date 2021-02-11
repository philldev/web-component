import { html } from 'lit-element'

export const header = html`
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
`
