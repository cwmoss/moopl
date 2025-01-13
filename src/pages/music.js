import PageElement from "../lib/page_element.js";
// import DeployWidget from "../widgets/deploy.js";

export default class Music extends PageElement {
  get title() {
    return "Music";
  }
}

window.customElements.define("music-page", Music);
