import { useSquareStore } from "@/stores/dataSquare";

export function useGetAllSurfaceElements() {
  const squareStore = useSquareStore();

  let surfaceElements = [
    ...document.querySelector(`[data-id="canvas"]`)!.children,
  ];
  let allPoints = [];
  let allPointsTransformed = [];

  surfaceElements.forEach((i) => {
    let id = i.dataset.id;
    let rect = i.getBoundingClientRect();
    let left = rect.x;
    let top = rect.y;
    let width = rect.x + rect.width;
    let height = rect.y + rect.height;

    allPoints.push({
      id: id,
      left: left,
      top: top,
      width: width,
      height: height,
    });

    let leftTransformed = (rect.x - squareStore.offsetLeft) / squareStore.scale;
    let topTransformed = (rect.y - squareStore.offsetTop) / squareStore.scale;
    let widthTransformed =
      (rect.x + rect.width - squareStore.offsetLeft) / squareStore.scale;
    let heightTransformed =
      (rect.y + rect.height - squareStore.offsetTop) / squareStore.scale;

    allPointsTransformed.push({
      id: id,
      left: leftTransformed,
      top: topTransformed,
      width: widthTransformed,
      height: heightTransformed,
    });
  });

  return { allPoints, allPointsTransformed };
}
