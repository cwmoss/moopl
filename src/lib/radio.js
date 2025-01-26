/*

"file", "title", "artist", "albumartist", "album", 
"track", "disc", "year", "genre", "duration", "format", "modified_at"

*/

class radio {
  data;

  static from_api(rec) {
    let t = new radio();
    t.data = rec;
    return t;
  }

  get file() {
    return this.data.station;
  }
  get title() {
    return this.data.name;
    let title = this.data[1];
    if (!title || title == "Unknown Title") {
      // console.log("trim title", title, el["file"]);
      title = this.file.split("\\").pop().split("/").pop();
      title = title.substring(0, title.lastIndexOf(".")) || title;
    }
    return title;
  }
  get artist() {
    return this.data.broadcaster;
    let artist = this.data[2];
    // if (!artist.length) artist = this.data[3];
    // else artist = artist.join(", ");
    if (!artist) artist = this.data[3];
    return artist;
  }
}

export default radio;
