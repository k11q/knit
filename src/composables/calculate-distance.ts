export function calculateDistance(originId: string, measuredId: string) {
  function calcDist() {
    const originElement = useGetElement(originId) as HTMLElement;
    const measuredElement = useGetElement(measuredId) as HTMLElement;

    const originElementRect = originElement.getBoundingClientRect();
    const measuredElementRect = measuredElement.getBoundingClientRect();

    const originLeft = originElementRect.left;
    const originRight = originElementRect.left + originElementRect.width;
    const originTop = originElementRect.top;
    const originBottom = originElementRect.top + originElementRect.height;

    const measuredLeft = measuredElementRect.left;
    const measuredRight = measuredElementRect.left + measuredElementRect.width;
    const measuredTop = measuredElementRect.top;
    const measuredBottom = measuredElementRect.top + measuredElementRect.height;

    //topleft
    if (originRight < measuredLeft && originBottom < measuredTop) {
      console.log("topleft");
    }
    //topright
    if (originLeft > measuredRight && originBottom < measuredTop) {
      console.log("topright");
    }
    //bottomright
    if (originLeft > measuredRight && originTop > measuredBottom) {
      console.log("bottomright");
    }
    //bottomleft
    if (originRight < measuredLeft && originTop > measuredBottom) {
      console.log("bottomleft");
    }
    //left
    if (
      originRight < measuredLeft &&
      ((originTop >= measuredTop && originTop <= measuredBottom) ||
        (originBottom >= measuredTop && originBottom <= measuredBottom))
    ) {
      console.log("left");
    }
    //top
    if (
      originBottom < measuredTop &&
      ((originRight >= measuredLeft && originRight <= measuredRight) ||
        (originLeft >= measuredLeft && originLeft <= measuredRight))
    ) {
      console.log("top");
    }
    //right
    if (
      originLeft > measuredRight &&
      ((originTop >= measuredTop && originTop <= measuredBottom) ||
        (originBottom >= measuredTop && originBottom <= measuredBottom))
    ) {
      console.log("right");
    }
    //top
    if (
      originTop > measuredBottom &&
      ((originRight >= measuredLeft && originRight <= measuredRight) ||
        (originLeft >= measuredLeft && originLeft <= measuredRight))
    ) {
      console.log("bottom");
    }
  }
  calcDist();
  function setRuler() {}
}
