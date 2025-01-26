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

if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("play", () => {
    this.play();
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    this.pause();
  });
}
