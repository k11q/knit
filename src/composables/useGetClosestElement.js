export default function (e) {
  const target = useGetElementFromPoint(e);
  const closest = target.closest("[data-droppable='true']");
  return target.closest("[data-droppable='true']");
}
