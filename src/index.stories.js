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
