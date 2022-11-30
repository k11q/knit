export default function (e: Event, id: string) {
  if (id) {
    document.addEventListener("keyup", (e) => {
      if (e.key === "]") {
        console.log("bring to front");
      }
    });
  }
}
