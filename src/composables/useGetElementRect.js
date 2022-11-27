export default function (id) {
  if (id) {
    let element = document.querySelector(`[data-id=${id}]`);
    let rect = element?.getBoundingClientRect();
    return rect;
  }
}
