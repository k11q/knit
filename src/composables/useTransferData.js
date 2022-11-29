export default function (arr, dropzone, data, currDragId, closestTarget) {
  function appendChild() {
    arr.every((i) => {
      if (i.id === closestTarget) {
        i.children.push(data);
        return false;
      } else {
        useTransferData(
          i.children,
          dropzone,
          data,
          currDragId,
          closestTarget
        ).appendChild();
        return true;
      }
    });
  }
  function appendBefore() {
    arr.every((i) => {
      if (i.id === closestTarget) {
        i.children.splice(
          i.children.findIndex(({ id }) => id === dropzone),
          0,
          data
        );
        return false;
      } else {
        useTransferData(
          i.children,
          dropzone,
          data,
          currDragId,
          closestTarget
        ).appendBefore();
        return true;
      }
    });
  }
  function appendAfter() {
    arr.every((i) => {
      if (i.id === closestTarget) {
        i.children.splice(
          i.children.findIndex(({ id }) => id === dropzone) + 1,
          0,
          data
        );
        return false;
      } else {
        useTransferData(
          i.children,
          dropzone,
          data,
          currDragId,
          closestTarget
        ).appendAfter();
        return true;
      }
    });
  }
  function removeChild() {
    arr.every((i) => {
      if (i.id === currDragId) {
        arr.splice(
          arr.findIndex(({ id }) => id === currDragId),
          1
        );
        return false;
      } else {
        useTransferData(
          i.children,
          dropzone,
          data,
          currDragId,
          closestTarget
        ).removeChild();
        return true;
      }
    });
  }
  function appendCanvasAbove() {
    arr.splice(arr.findIndex(({ id }) => id === dropzone) + 1, 0, data);
  }
  function appendToCanvas() {
    arr.push(data);
  }
  return {
    appendChild,
    appendBefore,
    appendAfter,
    removeChild,
    appendCanvasAbove,
    appendToCanvas,
  };
}
