export type MeasuredLine = {
  top: number;
  left: number;
  height?: number;
  width?: number;
  type?: "solid" | "dashed";
};

export const measuredLines = () => useState<MeasuredLine[]>("lines", () => []);

export function calculateDistance(originId: string, measuredId: string) {
  let lines = [] as MeasuredLine[];

  if (originId && measuredId) {
    const originElement = useGetElement(originId) as HTMLElement;
    const measuredElement = useGetElement(measuredId) as HTMLElement;

    const originElementRect = originElement.getBoundingClientRect();
    const measuredElementRect = measuredElement.getBoundingClientRect();

    const originLeft = originElementRect.left;
    const originRight = originElementRect.left + originElementRect.width;
    const originTop = originElementRect.top;
    const originBottom = originElementRect.top + originElementRect.height;
    const originWidth = originElementRect.width;
    const originHeight = originElementRect.height;
    const originMidX = originLeft + originWidth / 2;
    const originMidY = originTop + originHeight / 2;

    const measuredLeft = measuredElementRect.left;
    const measuredRight = measuredElementRect.left + measuredElementRect.width;
    const measuredTop = measuredElementRect.top;
    const measuredBottom = measuredElementRect.top + measuredElementRect.height;

    //topleft
    if (originRight < measuredLeft && originBottom < measuredTop) {
      let differenceX = measuredLeft - originRight;
      let differenceY = measuredTop - originBottom;
      lines = [
        {
          top: originTop + originElementRect.height / 2,
          left: originRight,
          width: differenceX,
          type: "solid",
        },
        {
          top: originBottom,
          left: originLeft + originElementRect.width / 2,
          height: differenceY,
          type: "solid",
        },
        {
          top: originTop + originHeight + differenceY,
          left: originRight - originWidth / 2,
          width: differenceX + originWidth / 2,
          type: "dashed",
        },
        {
          top: originBottom - originHeight / 2,
          left: originLeft + originWidth + differenceX,
          height: differenceY + originHeight / 2,
          type: "dashed",
        },
      ];
      measuredLines().value = lines;
    }
    //topright
    else if (originLeft > measuredRight && originBottom < measuredTop) {
      let differenceX = originLeft - measuredRight;
      let differenceY = measuredTop - originBottom;
      lines = [
        {
          top: originTop + originElementRect.height / 2,
          left: measuredRight,
          width: differenceX,
          type: "solid",
        },
        {
          top: originBottom,
          left: originLeft + originElementRect.width / 2,
          height: differenceY,
          type: "solid",
        },
        {
          top: originTop + originHeight + differenceY,
          left: measuredRight,
          width: differenceX + originWidth / 2,
          type: "dashed",
        },
        {
          top: originBottom - originHeight / 2,
          left: measuredRight,
          height: differenceY + originHeight / 2,
          type: "dashed",
        },
      ];
      measuredLines().value = lines;
    }
    //bottomright
    else if (originLeft > measuredRight && originTop > measuredBottom) {
      let differenceX = originLeft - measuredRight;
      let differenceY = originTop - measuredBottom;
      lines = [
        {
          top: originTop + originElementRect.height / 2,
          left: measuredRight,
          width: differenceX,
          type: "solid",
        },
        {
          top: measuredBottom,
          left: originLeft + originElementRect.width / 2,
          height: originTop - measuredBottom,
          type: "solid",
        },
        {
          top: measuredBottom,
          left: measuredRight,
          width: differenceX + originWidth / 2,
          type: "dashed",
        },
        {
          top: measuredBottom,
          left: measuredRight,
          height: differenceY + originHeight / 2,
          type: "dashed",
        },
      ];
      measuredLines().value = lines;
    }
    //bottomleft
    else if (originRight < measuredLeft && originTop > measuredBottom) {
      let differenceX = measuredLeft - originRight;
      let differenceY = originTop - measuredBottom;
      lines = [
        {
          top: originTop + originElementRect.height / 2,
          left: originRight,
          width: differenceX,
          type: "solid",
        },
        {
          top: measuredBottom,
          left: originLeft + originElementRect.width / 2,
          height: originTop - measuredBottom,
          type: "solid",
        },
        {
          top: measuredBottom,
          left: originRight - originWidth / 2,
          width: differenceX + originWidth / 2,
          type: "dashed",
        },
        {
          top: measuredBottom,
          left: measuredLeft,
          height: differenceY + originHeight / 2,
          type: "dashed",
        },
      ];
      measuredLines().value = lines;
    }
    //left
    else if (
      originRight < measuredLeft &&
      ((originTop >= measuredTop && originTop <= measuredBottom) ||
        (originBottom >= measuredTop && originBottom <= measuredBottom) ||
        (originMidY >= measuredTop && originMidY <= measuredBottom))
    ) {
      console.log("left1");
      let differenceX = measuredLeft - originRight;
      let lineX = {
        top: originMidY,
        left: originRight,
        width: measuredLeft - originRight,
        type: "solid",
      } as MeasuredLine;

      if (originMidY > measuredBottom) {
        let lineY = {
          top: measuredBottom,
          left: originRight + differenceX,
          height: originMidY - measuredBottom,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else if (originMidY < measuredTop) {
        let lineY = {
          top: originMidY,
          left: originRight + differenceX,
          height: measuredTop - originMidY,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else {
        console.log("left2");
        measuredLines().value = [lineX];
      }
    }
    //top
    else if (
      originBottom < measuredTop &&
      ((originRight >= measuredLeft && originRight <= measuredRight) ||
        (originLeft >= measuredLeft && originLeft <= measuredRight) ||
        (originMidX >= measuredLeft && originMidX <= measuredRight))
    ) {
      let differenceY = measuredTop - originBottom;
      let lineY = {
        top: originBottom,
        left: originMidX,
        height: measuredTop - originBottom,
        type: "solid",
      } as MeasuredLine;

      if (originMidX < measuredLeft) {
        let lineX = {
          top: originBottom + differenceY,
          left: originMidX,
          width: measuredLeft - originMidX,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else if (originMidX > measuredRight) {
        let lineX = {
          top: originBottom + differenceY,
          left: measuredRight,
          width: originMidX - measuredRight,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else {
        measuredLines().value = [lineY];
      }
    }
    //right
    else if (
      originLeft > measuredRight &&
      ((originTop >= measuredTop && originTop <= measuredBottom) ||
        (originBottom >= measuredTop && originBottom <= measuredBottom) ||
        (originMidY >= measuredTop && originMidY <= measuredBottom))
    ) {
      let lineX = {
        top: originMidY,
        left: measuredRight,
        width: originLeft - measuredRight,
        type: "solid",
      } as MeasuredLine;

      if (originMidY > measuredBottom) {
        let lineY = {
          top: measuredBottom,
          left: measuredRight,
          height: originMidY - measuredBottom,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else if (originMidY < measuredTop) {
        let lineY = {
          top: originMidY,
          left: measuredRight,
          height: measuredTop - originMidY,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else {
        measuredLines().value = [lineX];
      }
    }
    //bottom
    else if (
      originTop > measuredBottom &&
      ((originRight >= measuredLeft && originRight <= measuredRight) ||
        (originLeft >= measuredLeft && originLeft <= measuredRight) ||
        (originMidX >= measuredLeft && originMidX <= measuredRight))
    ) {
      let lineY = {
        top: measuredBottom,
        left: originMidX,
        height: originTop - measuredBottom,
        type: "solid",
      } as MeasuredLine;

      if (originMidX < measuredLeft) {
        let lineX = {
          top: measuredBottom,
          left: originMidX,
          width: measuredLeft - originMidX,
          type: "dashed",
        } as MeasuredLine;

        measuredLines().value = [lineX, lineY];
      } else if (originMidX > measuredRight) {
        let lineX = {
          top: measuredBottom,
          left: measuredRight,
          width: originMidX - measuredRight,
          type: "dashed",
        } as MeasuredLine;

        measuredLines().value = [lineX, lineY];
      } else {
        measuredLines().value = [lineY];
      }
    } else return;
  } else return;
}
