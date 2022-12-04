import { useCounterStore } from "~~/src/stores/counter";

export function cloneNode(id: String) {
  const selectToi = useCounterStore();

  let data = useGetElementData(selectToi.data, id);
}
