export default function (e: MouseEvent) {
  const target = useGetElementFromPoint(e);
  const closest: HTMLElement = target?.closest("[data-droppable='true']")!;
  return closest;
}
