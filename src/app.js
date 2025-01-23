import router from "../vendor/page.m.js";
import routes from "./routes.js";
import api from "./lib/api.js";
import library from "./lib/library.js";
import { load_template } from "./lib/template.js";
// let router = window.page;
router.configure({ window: window });
// router.base("/studio");

class App extends HTMLElement {
  constructor() {
    super();
    this.define_routes();
    // this.innerHTML = layout;
    this.addEventListener("open-doc", this.opendoc);
    this.realtime();
  }

  async connectedCallback() {
    await library.load();
    let template = await load_template("_layout");
    const clone = template[0].content.cloneNode(true);
    this.appendChild(clone);
    console.log("+++ app connected");
    window.setTimeout(() => {
      this.content = this.querySelector("main");
      this.nav = this.querySelector("pi-navigation");
      console.log("+++ nav => ", this.nav);
      router();
    });
    api.status().then((data) => {
      const evt = new CustomEvent("moo.sse", { bubbles: true, detail: data });
      document.dispatchEvent(evt);
    });
  }

  realtime() {
    const eventSource = new EventSource(api.realtime_url("mpd-status"));
    // The callback will be called every time an update is published
    eventSource.onmessage = (e) => {
      console.log("SSE:", e); // do something with the payload
      let data = JSON.parse(e.data);
      const evt = new CustomEvent("moo.sse", { bubbles: true, detail: data });
      document.dispatchEvent(evt);
    };
  }

  opendoc(e) {
    console.log("$ open-doc", e.detail);
    router(`/desk?z=${e.detail.type}~${e.detail.id}`);
  }

  async load_page(name, ctx) {
    let path = "./pages/" + name + ".js";
    const { default: PageClass } = await import(path);
    let page = new PageClass();
    page.set_route(ctx);

    this.setAttribute("page", name);
    console.log("loaded page", page, this.nav);
    this.content.replaceChildren(page);
    this.nav.active(ctx.pathname);

    // this.content.innerHTML = `<${name}-page></${name}-page>`;
  }
  define_routes() {
    for (const [path, props] of Object.entries(routes)) {
      // console.log(`${key}: ${value}`);
      if (props.redirect) {
        router(path, props.redirect);
        continue;
      }
      router(path, (ctx, next) => {
        ctx.route = props;
        this.load_page(props.class, ctx);
      });
    }
  }
}

customElements.define("pi-app", App);
