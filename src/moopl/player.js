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
        display: block;
        --border-color: #ccc;
      }
      input[type="range"] {
        writing-mode: sideways-lr;
      }
      table {
        border-collapse: collapse;
      }
      thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
      }
      th,
      td {
        padding: 12px 15px;
      }
      tbody tr {
        border-bottom: 1px solid #dddddd;
      }

      tbody tr:nth-child(2n) {
        background-color: #f3f3f3;
      }

      tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
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
    return html`<section class="playbuttons">
        <button>PLAY</button><button>PREV</button><button>NEXT</button>
      </section>
      <section class="meta"></section>
      <section class="playhead">
        <progress value="30" max="100">hu</progress>
        <div class="time">3:44</div>
      </section>
      <section class="volume">
        <input type="range" id="volume-slider" value="20" max="100" />
      </section>
      <section class="actions"></section> `;
  }
}

window.customElements.define("mo-player", Player);
