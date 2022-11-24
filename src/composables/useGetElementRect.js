export default function (id) {
  const showMarker = useShowMarker();
  if (id && showMarker) {
    let element = document.querySelector(`[data-id=${id}]`);
    let rect = element?.getBoundingClientRect();
    return rect;
  }
}
