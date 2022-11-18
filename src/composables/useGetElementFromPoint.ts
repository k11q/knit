export default function (e: MouseEvent) {
  return document.elementFromPoint(e.clientX, e.clientY);
}
