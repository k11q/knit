import { useCounterStore } from "@/stores/counter";

export default function (id) {
  const selectToi = useCounterStore();

  if (id) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        selectToi.resizeObserverRect = entry.contentRect;
        selectToi.resizeObserverTarget = entry.target;
      }
    });
    resizeObserver.observe(document.querySelector(`[data-id=${id}]`));
  }
}
