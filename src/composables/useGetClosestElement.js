export default function (e) {
  let target = useGetElementFromPoint(e);
  return target.closest("[data-droppable='true']");
}
