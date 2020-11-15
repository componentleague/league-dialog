import "./index.js";
import { html } from "lit-html";

export default {
  parameters: {
    layout: "centered",
  },
};

export const story1 = () => html`
  <style>
    .button {
      padding: 8px;
      background-color: #e5e5e5;
      border-radius: 5px;
      list-style: none;
      border: none;
    }

    details.with-dialog > summary::-webkit-details-marker {
      display: none;
    }

    details.with-dialog > league-dialog {
      position: fixed;
      margin: 10vh auto;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      max-height: 80vh;
      max-width: 90vw;
      width: 448px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    league-dialog > * {
      padding: 6px;
    }

    league-dialog > header {
      background-color: #666;
      color: white;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    }

    league-dialog > footer {
      border-top: 1px solid #EEE;
    }

    details.with-dialog[open] > summary:before {
      content: " ";
      background: rgba(0, 0, 0, 0.3);
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
    }

    section {
      display: block;
      margin: 12px;
    }
  </style>

  <section>
    <details class="with-dialog"
      ><summary class="button">Open Dialog</summary>
      <league-dialog>
        <header slot="header">Header</header>
        <section>
          <form action=".">
            <label>Name <input /></label>
          </form>
        </section>
        <footer slot="footer">
          <button class="button" cancel>Cancel</button>
        </footer>
      </league-dialog>
    </details>
  </section>

  <section>
    <button
      class="button"
      @click=${(e) =>
        e.target.closest("section").querySelector("#dialog").show()}
    >
      Trigger Details
    </button>
    <league-dialog id="dialog">
      <header slot="header">Header</header>
      <section slot="content">
        <form action=".">
          <label>Name <input /></label>
        </form>
      </section>
      <footer slot="footer">
        <button class="button" cancel>Cancel</button>
      </footer>
    </league-dialog>
  </section>
`;
