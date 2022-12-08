import { useCounterStore } from "~~/src/stores/counter";

export function cloneNode(id: string) {
  const selectToi = useCounterStore();

  let data = useGetElementData(selectToi.data, id);
}
