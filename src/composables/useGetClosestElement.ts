export default function (e: MouseEvent) {
  const target = useGetElementFromPoint(e);
  const closest = target?.closest("[data-droppable='true']");
  return target?.closest("[data-droppable='true']");
}
