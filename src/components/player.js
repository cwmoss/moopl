import { LitElement, css, html } from "../../vendor/lit-core.min.js";
import api from "../lib/api.js";
import track from "../lib/track.js";
//import cssvars from "./variables.css.js";

// console.log("bootstrap import", cssvars);

export default class Player extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
    volume: {},
    track: {},
    artist: {},
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
    console.log("##player", navigator);
    document.addEventListener("moo.sse", this);
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        this.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        this.pause();
      });
    }
  }
  /*
https://stackoverflow.com/questions/52226454/media-notifications-using-the-media-session-web-api-doesnt-work-with-web-audio

https://css-tricks.com/give-users-control-the-media-session-api/
*/
  play() {}
  pause() {
    console.log("paused by mediasession");
  }
  handleEvent(e) {
    console.log("from player component", e.detail);
    let ev = e.detail;
    if (ev.volume) this.volume = ev.volume;
    if (ev.current_song) {
      let current = track.from_api(ev.current_song);
      this.track = current.title;
      this.artist = current.artist;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.track,
        artist: this.artist,
        album: "To Pimp A Butterfly",
        artwork: [
          {
            src: "https://mytechnicalarticle/kendrick-lamar/to-pimp-a-butterfly/alright/96x96",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "https://mytechnicalarticle/kendrick-lamar/to-pimp-a-butterfly/alright/128x128",
            sizes: "128x128",
            type: "image/png",
          },
          // More sizes, like 192x192, 256x256, 384x384, and 512x512
        ],
      });
      navigator.mediaSession.playbackState = "playing";
    }
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

      <main>
        <section class="track">
          <strong>${this.track}</strong> ${this.artist}
        </section>
        <section class="playhead">
          <div class="time-elapsed">0:00</div>
          <progress value="30" max="100"></progress>
          <div class="time">3:44</div>
        </section>
      </main>
      <section class="meta"></section>

      <section class="actions"></section> `;
  }
}

window.customElements.define("mo-player", Player);
