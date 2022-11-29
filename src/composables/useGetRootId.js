export default function (id) {
  let element = useGetElement(id);
  let parentElement = element.parentElement.dataset.id;

  if (parentElement !== "canvas") {
    useGetRootId(parentElement);
  }
  if (parentElement === "canvas") {
    return element.dataset.id;
  }
}
