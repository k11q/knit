export default function (e) {
  let closest = useGetClosestElement(e);
  return closest.dataset.id;
}
