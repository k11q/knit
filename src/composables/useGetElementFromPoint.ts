export default function (e: MouseEvent) {
  let element = document.elementFromPoint(e.clientX, e.clientY);
  return element;
}
