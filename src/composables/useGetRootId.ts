export default function (id: string) {
  let rootId;

  function getRoot(id: string) {
    let element = useGetElement(id)!;
    let parent = element.parentElement!;
    let parentElement = parent.dataset.id as string;
    if (id !== "canvas") {
      getRoot(parentElement);
    }
    if (parentElement === "canvas") {
      rootId = element.dataset.id as string;
      return;
    }
  }

  getRoot(id);

  return rootId;
}
