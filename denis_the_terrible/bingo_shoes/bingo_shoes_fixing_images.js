function resizeShoePictures() {
  document.querySelectorAll(".prodboxmarg.prodbox").forEach((container) => {
    try {
      let container_width = window.getComputedStyle(container)["width"];
      let container_height = window.getComputedStyle(container)["height"];

      let container_a = container.querySelector("a");
      let container_prodpicwrapper = container.querySelector(".prodpicwrapper");

      container_a.style.setProperty("max-width", container_width, "important");
      container_a.style.setProperty("min-width", container_width, "important");
      container_a.style.setProperty("width", container_width, "important");

      container_a.style.setProperty(
        "max-height",
        container_height,
        "important"
      );
      container_a.style.setProperty(
        "min-height",
        container_height,
        "important"
      );
      container_a.style.setProperty("height", container_height, "important");

      container_prodpicwrapper.style.setProperty(
        "max-width",
        container_width,
        "important"
      );
      container_prodpicwrapper.style.setProperty(
        "min-width",
        container_width,
        "important"
      );
      container_prodpicwrapper.style.setProperty(
        "width",
        container_width,
        "important"
      );

      container_prodpicwrapper.style.setProperty(
        "max-height",
        window.getComputedStyle(container_prodpicwrapper.querySelector("img"))[
          "height"
        ],
        "important"
      );
      container_prodpicwrapper.style.setProperty(
        "min-height",
        window.getComputedStyle(container_prodpicwrapper.querySelector("img"))[
          "height"
        ],
        "important"
      );
      container_prodpicwrapper.style.setProperty(
        "height",
        window.getComputedStyle(container_prodpicwrapper.querySelector("img"))[
          "height"
        ],
        "important"
      );

      container.querySelector(".prodpicwrapper").style.overflow = "hidden";
    } catch {}
  });
  console.log("resized");
}
resizeShoePictures();
window.addEventListener("resize", () => {
  resizeShoePictures();
});
