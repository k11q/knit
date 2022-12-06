import { Node } from "../stores/counter";

export function useGetElementData(arr: Array<Node>, id: string): Node {
  let data = {} as Node;

  function getData(arr: Array<Node>, id: string) {
    arr.every((i) => {
      if (i.id === id) {
        data = i;
        return false;
      } else {
        getData(i.children, id);
        return true;
      }
    });
  }

  getData(arr, id);

  return data;
}
