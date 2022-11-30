export default function (id: String) {
  if (id) {
    let element = document.querySelector(`[data-id=${id}]`);
    if (
      element &&
      element.parentElement &&
      element.parentElement.dataset?.id !== "canvas"
    ) {
      return true;
    } else return false;
  }
}
