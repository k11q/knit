export default function (id: String) {
  if (id) {
    let element = document.querySelector(`[data-id=${id}]`);
    let rect = element?.getBoundingClientRect();
    return rect;
  }
}
