export default function (e, id) {
  if (id) {
    const element = useGetElement(id);
    if (Document.elementsFromPoints(e.clientX, e.clientY).contains(element)) {
      //it clicks outside
      return true;
    } else return false; //clicks inside
  }
}
