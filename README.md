[![edit-in-WebComponents.dev](https://webcomponents.dev/assets/ext/edit_in_wcd.svg)](https://webcomponents.dev/edit/fPWSzfxN5BoVxHU8yTxs)
```js script
import "./index.js";
```

# League Dialog

A `<league-dialog>` element can either:

- be placed in an a `<details>` element as the content, that acts as the button
- exit on its own, in which case it will wrap itself in a `<details>`. It needs this cozy blanket for styling.

### Starter kit result

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
</style>

<details>
  <summary class="button">Open Dialog</summary>
  <league-dialog></league-dialog>
</details>

### Events

`open` is triggered when opened

`close` is triggered when the `close()` method is called. It is cancelable, so `e => e.preventDefault()` will stop it from being closed.

### Extending

There are two ways to extend it, one is to simply extend it as normal `class MyDialog extends LeagueDialog { ... }`. This
works great, but sometimes you might want to also extend something else.

The other is to wrap it by creating an element that renders to the Light DOM:

```js
class MyDialog extends LitElement {
  createRenderRoot() {
    return this;
  }

  renderContent() {
    return html`...`;
  }

  render() {
    return html`
      <details>
        <summary class="button">Open Dialog</summary>
        <league-dialog>
          <header slot="header">Dialog Title</header>
          <section>${this.renderContent()}</section>
          <footer slot="footer"><button class="button" cancel>Cancel</button></footer>
      </details>
    `;
  }
}

customElement.define("my-dialog", MyDialog);
```

Now we can use it simply with:

```html
<my-dialog></my-dialog>
```

### Links

- [Official website (lit-element.polymer-project.org/)](https://lit-element.polymer-project.org/)
- [Guide](https://lit-element.polymer-project.org/guide)
- [Chat](https://join.slack.com/t/polymer/shared_invite/enQtNTAzNzg3NjU4ODM4LTkzZGVlOGIxMmNiMjMzZDM1YzYyMzdiYTk0YjQyOWZhZTMwN2RlNjM5ZDFmZjMxZWRjMWViMDA1MjNiYWFhZWM)
- [GitHub](https://github.com/Polymer/lit-element)
- [Issues](https://github.com/Polymer/lit-element/issues)

> Created with [WebComponents.dev](https://webcomponents.dev)
