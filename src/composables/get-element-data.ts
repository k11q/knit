import { Node } from "../stores/counter";

export function useGetElementData(arr: Array<Node>, id: string): Node {
  let data: Node;

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
