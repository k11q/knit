export default function (arr, id) {
  let data;

  arr.every((i) => {
    if (i.id === id) {
      data = i;
      return false;
    } else {
      useGetElementData(i.children, id);
      return true;
    }
  });
  return data;
}
