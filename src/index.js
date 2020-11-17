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

    this.parentElement.querySelectorAll("summary").forEach((el) => {
      // Disable click out
      el.addEventListener("click", (e) => {
        if (this.open) {
          e.preventDefault();
          el.blur();
        } else {
          this.__invoker = el;
        }
      });

      // Disable focus summary
      el.addEventListener("mousedown", (e) => {
        if (this.open) {
          e.preventDefault();
        }
      });
    });

    // Bind toggle
    this.parentElement.addEventListener("toggle", (e) => {
      this.open = this.parentElement.open;
    });

    // A11y
    this.setAttribute("aria-modal", "true");
    this.setAttribute("role", "dialog");
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

  hideChildElements(root) {
    // Adds aria-hidden and inert tags to all elements in the root that don't contain this one.
    // Specified by the NOTE bullet point in https://www.w3.org/TR/wai-aria-practices/#dialog_roles_states_props
    [...root.children].forEach((node) => {
      if (node === this) return;
      if (node.localName === "script") return;
      if (node.hasAttribute("aria-hidden")) return;
      if (node.contains(this)) return this.hideChildElements(node);

      node.setAttribute("league-dialog-disabled", "");
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("inert", "");
    });
  }

  onOpen() {
    // Ensure details is open
    this.parentElement.open = true;

    // Add aria-hidden on body elements, etc...
    this.hideChildElements(document.body);

    // Add "dialog-open" to the body for styling
    document.body.setAttribute("dialog-open", "");

    // Auto focus
    this.autoFocus();

    // Bind for escape
    window.addEventListener(
      "keydown",
      (this._keyDownBinding = (e) => this.onKeyDown(e))
    );

    // Dispatch event
    this.dispatchEvent(
      new CustomEvent("open", {
        bubbles: true,
      })
    );

    // Check label
    if (
      !(this.hasAttribute("aria-labelledby") || this.hasAttribute("aria-label"))
    ) {
      console.error(
        "Dialog has no aria-label or aria-labelledby set, see https://www.w3.org/TR/wai-aria-practices/#dialog_roles_states_props for more information."
      );
    }
  }

  onClose() {
    // Close details
    this.parentElement.open = false;

    // Remove aria-hidden on body elements
    document.querySelectorAll("[league-dialog-disabled]").forEach((node) => {
      node.removeAttribute("league-dialog-disabled");
      node.removeAttribute("aria-hidden");
      node.removeAttribute("inert");
    });

    // Remove "dialog-open" on the body
    document.body.removeAttribute("dialog-open");

    // Remove keybinding
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

  autoFocus() {
    let trap = this.shadowRoot.querySelector("focus-trap");
    let autofocus = this.querySelector("[autofocus]");
    if (autofocus) {
      autofocus.focus();
    } else {
      trap.focusFirstElement();
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
