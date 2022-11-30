export default function (id) {
  let element = useGetElement(id);
  let parent = element.parentElement;
  let parentElement = parent.dataset.id;

  if (parentElement !== "canvas") {
    useGetRootId(parentElement);
  }
  if (parentElement === "canvas") {
    return element.dataset.id;
  }
}
