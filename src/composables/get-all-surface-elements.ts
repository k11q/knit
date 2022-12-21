import { useSquareStore } from "~~/src/stores/dataSquare";

type Point = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export function useGetAllSurfaceElements() {
  const squareStore = useSquareStore();

  let surfaceElements = [
    ...document.querySelector(`[data-id="canvas"]`)!.children,
  ] as HTMLElement[];
  let allPoints: Point[] = [];
  let allPointsTransformed: Point[] = [];

  surfaceElements.forEach((i) => {
    let id = i.dataset.id as string;
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
