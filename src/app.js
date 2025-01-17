import router from "../vendor/page.m.js";
import routes from "./routes.js";
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
