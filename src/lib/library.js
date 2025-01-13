import api from "./api.js";
import schema from "./schema.js";
import datasets from "./datasets.js";

class Library {
  name = "";
  loading = false;
  data = [];
  async load() {
    this.loading = true;
    this.data = this.setup_data(await api.load_library());
    this.loading = false;
  }

  setup_data(data) {
    return data;
  }
  search(term) {
    term = term.toLowerCase();
    return this.data.filter((o) =>
      Object.keys(o).some((k) => {
        let val = typeof o[k] === "string" ? o[k] : o[k].join(" ");
        // console.log("test", val);
        return val.toLowerCase().includes(term);
      })
    );
  }
  tracks() {
    return this.data;
  }
  schema() {
    return schema;
  }

  datasets() {
    return datasets.datasets;
  }
}

export default new Library();
