export default function (e: MouseEvent, id: string) {
  if (id) {
    const element: Element = useGetElement(id)!;
    const elements = document.elementsFromPoint(e.clientX, e.clientY)!;
    if (elements.includes(element)) {
      //it clicks outside
      return true;
    } else return false; //clicks inside
  }
}
