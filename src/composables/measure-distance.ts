export function measureDistance(itemA: string, itemB: string) {
  const itemARect = useGetElementRect(itemA)!;
  const itemBRect = useGetElementRect(itemB)!;

  let itemALines = {
    lineTop: itemARect.y,
    lineBottom: itemARect.y + itemARect.height,
    lineLeft: itemARect.x,
    lineRight: itemARect.x + itemARect.width,
  };

  let itemBLines = {
    lineTop: itemBRect.y,
    lineBottom: itemBRect.y + itemBRect.height,
    lineLeft: itemBRect.x,
    lineRight: itemBRect.x + itemBRect.width,
  };

  if (
    itemALines.lineTop > itemBLines.lineBottom &&
    (itemBLines.lineRight > itemALines.lineLeft ||
      itemBLines.lineLeft < itemALines.lineRight)
  ) {
    measureTop();
  }

  if (
    itemALines.lineBottom < itemBLines.lineTop &&
    (itemBLines.lineRight > itemALines.lineLeft ||
      itemBLines.lineLeft < itemALines.lineRight)
  ) {
    measureBottom();
  }

  if (
    itemALines.lineLeft > itemBLines.lineRight &&
    (itemBLines.lineBottom > itemALines.lineTop ||
      itemBLines.lineTop < itemALines.lineBottom)
  ) {
    measureLeft();
  }

  if (
    itemALines.lineRight < itemBLines.lineLeft &&
    (itemBLines.lineBottom > itemALines.lineTop ||
      itemBLines.lineTop < itemALines.lineBottom)
  ) {
    measureRight();
  }

  if (
    itemALines.lineTop > itemBLines.lineBottom &&
    itemBLines.lineRight < itemALines.lineLeft
  ) {
    measureTopLeft();
  }

  if (
    itemALines.lineTop > itemBLines.lineBottom &&
    itemBLines.lineLeft > itemALines.lineRight
  ) {
    measureTopRight();
  }

  if (
    itemALines.lineBottom < itemBLines.lineTop &&
    itemBLines.lineRight < itemALines.lineLeft
  ) {
    measureBottomLeft();
  }

  if (
    itemALines.lineBottom < itemBLines.lineTop &&
    itemBLines.lineLeft > itemALines.lineRight
  ) {
    measureBottomRight();
  }

  if (
    ((itemALines.lineTop > itemBLines.lineTop &&
      itemALines.lineTop < itemBLines.lineBottom) ||
      (itemALines.lineBottom < itemBLines.lineBottom &&
        itemALines.lineBottom > itemBLines.lineTop)) &&
    ((itemALines.lineLeft > itemBLines.lineLeft &&
      itemALines.lineLeft < itemBLines.lineRight) ||
      (itemALines.lineRight > itemBLines.lineLeft &&
        itemALines.lineRight < itemBLines.lineRight))
  ) {
    measureAllSides();
  }

  function measureTop() {}

  function measureBottom() {}

  function measureLeft() {}

  function measureRight() {}

  function measureTopLeft() {}

  function measureTopRight() {}

  function measureBottomLeft() {}

  function measureBottomRight() {}

  function measureAllSides() {}
}
