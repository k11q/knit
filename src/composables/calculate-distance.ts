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

    const measuredLeft = measuredElementRect.left;
    const measuredRight = measuredElementRect.left + measuredElementRect.width;
    const measuredTop = measuredElementRect.top;
    const measuredBottom = measuredElementRect.top + measuredElementRect.height;
    const measuredWidth = measuredElementRect.width;
    const measuredHeight = measuredElementRect.height;

    //topleft
    if (originRight < measuredLeft && originBottom < measuredTop) {
      console.log("topleft");
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
      console.log("topright");
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
      console.log("bottomright");
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
      console.log("bottomleft");
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
        (originBottom >= measuredTop && originBottom <= measuredBottom))
    ) {
      let differenceX = measuredLeft - originRight;
      let lineX = {
        top: originTop + originHeight / 2,
        left: originRight,
        width: differenceX,
        type: "solid",
      } as MeasuredLine;

      if (originTop + originHeight / 2 > measuredBottom) {
        let lineY = {
          top: measuredBottom,
          left: originRight + differenceX,
          height: originTop + originHeight / 2 - measuredBottom,
          type: "dashed",
        } as MeasuredLine;
        measuredLines().value = [lineX, lineY];
      } else if (originBottom - originHeight / 2 < measuredTop) {
        let lineY = {
          top: originBottom - originHeight / 2,
          left: originRight + differenceX,
          height: measuredTop - originBottom - originHeight / 2,
          type: "dashed",
        } as MeasuredLine;
        console.log("top");
        measuredLines().value = [lineX, lineY];
      } else measuredLines().value = [lineX];
    }
    //top
    else if (
      originBottom < measuredTop &&
      ((originRight >= measuredLeft && originRight <= measuredRight) ||
        (originLeft >= measuredLeft && originLeft <= measuredRight))
    ) {
      lines = [
        {
          top: originBottom,
          left: originLeft + originElementRect.width / 2,
          height: measuredTop - originBottom,
          type: "solid",
        },
      ];
      measuredLines().value = lines;
    }
    //right
    else if (
      originLeft > measuredRight &&
      ((originTop >= measuredTop && originTop <= measuredBottom) ||
        (originBottom >= measuredTop && originBottom <= measuredBottom))
    ) {
      lines = [
        {
          top: originTop + originElementRect.height / 2,
          left: measuredRight,
          width: originLeft - measuredRight,
          type: "solid",
        },
      ];
      measuredLines().value = lines;
    }
    //bottom
    else if (
      originTop > measuredBottom &&
      ((originRight >= measuredLeft && originRight <= measuredRight) ||
        (originLeft >= measuredLeft && originLeft <= measuredRight))
    ) {
      lines = [
        {
          top: measuredBottom,
          left: originLeft + originElementRect.width / 2,
          height: originTop - measuredBottom,
          type: "solid",
        },
      ];
      measuredLines().value = lines;
    } else return;
  } else return;
}
