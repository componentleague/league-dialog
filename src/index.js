import { LitElement, html, css } from "lit-element";
import "@a11y/focus-trap";

export class LeagueDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hoist: { type: Boolean, reflect: true },
  };

  static styles = css``;

  constructor() {
    super();
    this.open = false;
    this.hoist = false;
  }

  show(invoker) {
    this.open = true;
    this.__invoker = invoker || null;
  }

  close() {
    if (!this.canClose()) return;
    this.open = false;
    if (this.__invoker) {
      this.__invoker.focus();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement.tagName.toLowerCase() != "details") {
      let details = document.createElement("details");
      this.parentElement.insertBefore(details, this);
      this.remove();
      details.appendChild(document.createElement("summary"));
      details.appendChild(this);
      return;
    }

    this.parentElement.classList.add("with-dialog");

    // Disable click out
    this.parentElement.querySelectorAll("summary").forEach((el) =>
      el.addEventListener("click", (e) => {
        if (this.open) {
          e.preventDefault();
          return;
        } else {
          this.__invoker = el;
        }
      })
    );

    // Bind toggle
    this.parentElement.addEventListener("toggle", (e) => {
      this.open = this.parentElement.open;
    });
  }

  firstUpdated() {
    this.querySelectorAll("[cancel]").forEach((el) =>
      el.addEventListener("click", (e) => {
        this.close();
      })
    );
  }

  updated(props) {
    if (props.has("open")) {
      if (props.get("open") && !this.open) {
        this.onClose();
      }
      if (!props.get("open") && this.open) {
        this.onOpen();
      }
    }
  }

  onOpen() {
    this.parentElement.open = true;
    let trap = this.shadowRoot.querySelector("focus-trap");
    let autofocus = this.querySelector("[autofocus]");
    if (autofocus) {
      autofocus.focus();
    } else {
      trap.focusFirstElement();
    }
    window.addEventListener(
      "keydown",
      (this._keyDownBinding = (e) => this.onKeyDown(e))
    );
    this.dispatchEvent(
      new CustomEvent("open", {
        bubbles: true,
      })
    );
  }

  onClose() {
    this.parentElement.open = false;
    if (this._keyDownBinding) {
      window.removeEventListener("keydown", this._keyDownBinding);
      this._keyDownBinding = null;
    }
  }

  onKeyDown(e) {
    if (e.key == "Escape") {
      this.close();
    }
  }

  canClose() {
    return this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        cancelable: true,
      })
    );
  }

  render() {
    return html`
      <focus-trap ?inactive=${!this.open}>
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </focus-trap>
    `;
  }
}

customElements.define("league-dialog", LeagueDialog);
