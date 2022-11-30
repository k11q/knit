export default function () {
  function appendChild(arr, data, closestTarget) {
    arr.every((i) => {
      if (i.id === closestTarget) {
        i.children.push(data);
        return false;
      } else {
        useTransferData().appendChild(i.children, data, closestTarget);
        return true;
      }
    });
  }
  function removeChild(arr, currDragId) {
    arr.every((i) => {
      if (i.id === currDragId) {
        arr.splice(
          arr.findIndex(({ id }) => id === currDragId),
          1
        );
        return false;
      } else {
        useTransferData().removeChild(i.children, currDragId);
        return true;
      }
    });
  }
  function appendBefore(arr, dragzone, data, closestTarget) {
    arr.every((i) => {
      if (i.id === closestTarget) {
        i.children.splice(
          i.children.findIndex(({ id }) => id === dragzone),
          0,
          data
        );
        return false;
      } else {
        useTransferData().appendBefore(
          i.children,
          dragzone,
          data,
          closestTarget
        );
        return true;
      }
    });
  }
  function appendAfter(arr, dropzone, data, closestTarget) {
    arr.every((i) => {
      if (i.id === closestTarget) {
        i.children.splice(
          i.children.findIndex(({ id }) => id === dropzone) + 1,
          0,
          data
        );
        return false;
      } else {
        useTransferData().appendAfter(
          i.children,
          dropzone,
          data,
          closestTarget
        );
        return true;
      }
    });
  }
  function appendCanvasAbove(arr, dropzone, data) {
    arr.splice(arr.findIndex(({ id }) => id === dropzone) + 1, 0, data);
  }
  function appendToCanvas(arr, data) {
    arr.push(data);
  }
  return {
    appendChild,
    removeChild,
    appendBefore,
    appendAfter,
    appendCanvasAbove,
    appendToCanvas,
  };
}
