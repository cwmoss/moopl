import { LitElement, css, html } from "../../vendor/lit-core.min.js";
import api from "../lib/api.js";
//import cssvars from "./variables.css.js";

// console.log("bootstrap import", cssvars);

export default class Player extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
    volume: {},
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

  constructor() {
    super();
    this.volume = 10;
    document.addEventListener("moo.sse", this);
  }

  handleEvent(e) {
    console.log("from player component", e.detail);
    let ev = e.detail;
    if (ev.volume) this.volume = ev.volume;
  }

  change_volume(e) {
    console.log("change vol", e.target.value);
    this.volume = e.target.value;
    api.volume(e.target.value);
  }

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
        <span class="active">VOL ${this.volume}</span>
        <input
          class="inactive"
          type="range"
          @input=${this.change_volume}
          id="volume-slider"
          value=${this.volume}
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
