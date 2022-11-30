export default function (id: string) {
  let element = useGetElement(id)!;
  let parent = element.parentElement!;
  let parentElement: string = parent.dataset.id!;

  if (parentElement !== "canvas") {
    useGetRootId(parentElement);
  }
  if (parentElement === "canvas") {
    return element.dataset.id;
  }
}
