import { css } from "lit-element";

export default css`
  :host {
  }
  .app-container {
    min-height: 100vh;
    display: grid;
    grid-template:
      "header header header" auto
      ".      main   .     " 1fr
      "footer footer footer" 4rem /
      1fr minmax(auto, 768px) 1fr;
    background-color: #030914;
    color: #fafafa;
  }
  .header {
    grid-area: header;
    text-align: center;
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .top-border {
    background: linear-gradient(
      270deg,
      #f50a81 25.28%,
      #9d09db 59.7%,
      #f722c9 97.75%
    );
    width: 100%;
    height: 15px;
  }
  .header h1 {
    font-weight: bold;
    font-size: 2rem;
  }
  .header ul {
    display: flex;
    gap: 16px;
  }
  .header a {
    color: #fafafa;
  }
  .main {
    grid-area: main;
    padding: 0 8px;
  }
  .footer {
    grid-area: footer;
  }

  .app {
    margin-top: 48px;
    display: grid;
    gap: 32px;
  }

  .form {
    display: grid;
    gap: 16px;
  }

  .form-field {
    display: grid;
    gap: 8px;
  }

  .form-field label {
    display: block;
    color: #eeeeee;
  }

  .form-field input:not([type="radio"]) {
    border: none;
    border-radius: 4px;
    padding: 4px 16px;
    width: 100%;
    font-size: 1.4rem;
  }

  .form-field input:focus {
    outline: none;
  }

  .form button {
    font-weight: bold;
    background: #1437d4;
    color: #fafafa;
    border-radius: 4px;
    font-size: 18px;
    border: none;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .transactions {
    display: grid;
    grid-template:
      "title" auto
      "." 16px
      "list" auto/
      auto;
  }

  .transactions-list {
    grid-area: list;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .transactions-list h2 {
    font-weight: bold;
  }

  .transactions-item {
    display: grid;
    grid-template:
      "desc amount toolbar" auto /
      1fr max-content auto;
    gap: 4px;
    border: 1px solid #4d4d4d;
    padding: 8px;
    border-radius: 4px;
    overflow: hidden;
  }
  .transactions-item__desc {
    grid-area: desc;
    font-weight: bold;
  }
  .transactions-item__amount {
    grid-area: amount;
    transform: translateX(48px);
    transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1)
  }
  .transactions-item__toolbar {
    grid-area: toolbar;
    display: grid;
    grid-template-columns: auto auto;
    gap:8px;
    align-items:center;
    transform: translateX(48px);
    transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1)
  }
  .transactions-item__toolbar svg {
    width: 16px;
    cursor: pointer;
  }

  .transactions-item:hover .transactions-item__toolbar, .transactions-item:hover .transactions-item__amount {
    transform: translateX(0)
  }

  .empty {
    text-align: center;
    grid-area: list;
  }

  .overview {
    display: grid;
    gap: 16px;
  }

  .overview-title {
    font-weight: bold;
  }

  .overview-detail {
    display: grid;
    gap: 8px;
  }

  .overview-total {
    font-size: 20px;
    display:grid;
    grid-template-columns: 1fr max-content
  }

  .overview-total .amount {
    font-weight: bold;
  }
`;
