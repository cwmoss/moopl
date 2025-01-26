import PageElement from "../lib/page_element.js";
// import DeployWidget from "../widgets/deploy.js";

export default class Radio extends PageElement {
  get title() {
    return "Radio";
  }
}

window.customElements.define("radio-page", Radio);
