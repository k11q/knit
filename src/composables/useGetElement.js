export default function (id) {
  if (id) {
    let element = document.querySelector(`[data-id=${id}]`);
    return element;
  }
}
