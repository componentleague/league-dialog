import "./index.js";
import { html } from "lit-html";

export default {
  parameters: {
    layout: "centered",
  },
};

export const story1 = () => html`
  <link rel="stylesheet" href="style.css" />

  <section>
    <details>
      <summary class="button">Open Details Dialog</summary>
      <league-dialog aria-label="Sample Dialog">
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
      onclick="document.querySelector('#dialog').show(this)"
    >
      Open Stand Alone Dialog
    </button>
    <league-dialog aria-label="Sample Dialog" id="dialog">
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
  </section>
`;
