export default function (id: string) {
  if (id) {
    let element: HTMLElement = document.querySelector(`[data-id=${id}]`)!;
    return element;
  }
}
