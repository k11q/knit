export default function (e: MouseEvent) {
  let closest = useGetClosestElement(e);
  if (closest) {
    return closest.dataset.id;
  } else return undefined;
}
