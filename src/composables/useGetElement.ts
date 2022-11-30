export default function (id: String) {
  if (id) {
    let element = document.querySelector(`[data-id=${id}]`);
    return element;
  }
}
