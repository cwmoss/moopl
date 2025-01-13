import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// console.log("bootstrap import", cssvars);

export default class Tracklist extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
  };

  async connectedCallback() {
    super.connectedCallback();
    // this.data = await library.tracks();
    this.data = library.search("touch");
    console.log("filtered:", this.data);
  }
  static styles = [
    // cssvars,
    css`
      :host {
        display: block;
        --border-color: #ccc;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        margin-bottom: 0.5rem;
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
  render_item(el) {
    let artist = el["artist"];
    if (!artist.length) artist = el["album artist"];
    else artist = artist.join(", ");
    let title = el["title"];
    if (!title || title == "Unknown Title") {
      // console.log("trim title", title, el["file"]);
      title = el["file"].split("\\").pop().split("/").pop();
      title = title.substring(0, title.lastIndexOf(".")) || title;
    }
    return html`<li>${title}<br /><strong>${artist}</strong></li>`;
  }
  render() {
    if (!this.data) return "";
    console.log("+++ render tracks", this.data);
    // if (!this.data) return "";

    return html`tracks
      <ul>
        ${this.data.map((el) => {
          return this.render_item(el);
        })}
      </ul>`;
  }
}

window.customElements.define("mo-tracklist", Tracklist);
