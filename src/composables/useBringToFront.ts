export default function (e: Event, id: String) {
  if (id) {
    document.addEventListener("keyup", (e) => {
      if (e.key === "]") {
        console.log("bring to front");
      }
    });
  }
}
