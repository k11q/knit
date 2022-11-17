export default function (e) {
  return document.elementFromPoint(e.clientX, e.clientY).dataset.id;
}
