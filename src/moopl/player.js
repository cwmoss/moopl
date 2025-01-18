import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";

// console.log("bootstrap import", cssvars);

export default class Player extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
  };

  static styles = [
    // cssvars,
    css`
      :host {
        display: flex;
        --border-color: #ccc;
      }
      section {
        margin-right: 1rem;
      }
      input[type="range"] {
        writing-mode: sideways-lr;
      }
      .playhead {
        display: flex;
      }
      .volume .inactive {
        display: none;
      }
      .volume:hover .inactive {
        display: block;
        position: absolute;
        top: 0px;
      }
    `,
  ];

  /*
  ${this.data.map((el) => {
        return html`<dt>${el[this.keys[0]]}</dt>
          <dd>${el[this.keys[1]]}</dd>`;
      })}
          */
  render() {
    console.log("render player");
    // if (!this.data) return "";
    return html`<section class="play">
        <button>></button><button><<</button><button>>></button>
      </section>
      <section class="volume">
        <span class="active">VOL</span>
        <input
          class="inactive"
          type="range"
          id="volume-slider"
          value="20"
          max="100"
        />
      </section>

      <section class="playhead">
        <div class="time-elapsed">0:00</div>
        <progress value="30" max="100">hu</progress>
        <div class="time">3:44</div>
      </section>

      <section class="meta"></section>

      <section class="actions"></section> `;
  }
}

window.customElements.define("mo-player", Player);
