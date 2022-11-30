export default function (e: MouseEvent) {
  let closest = useGetClosestElement(e);
  return closest.dataset.id;
}
