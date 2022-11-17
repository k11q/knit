export default function (e, attr) {
  return document.elementFromPoint(e.clientX, e.clientY).dataset.attr;
}
