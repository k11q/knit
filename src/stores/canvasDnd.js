import { defineStore } from "pinia";
import { useCounterStore } from "./counter";

export const useCanvasDndStore = defineStore({
  id: "canvasDnd",
  state: () => ({
    isDragging: false,
    isDroppable: false,
    displayDroppable: false,
    currDrop: "",
    currDrag: "",
    currDragValue: "",
    currDropHTML: "",
    clientY: "",
    dragzone: "",
    dropzone: "",
    spareDragzone: "",
  }),
  actions: {
    dndRemove(arr) {
      arr.every((i) => {
        if (i.id === this.currDrag) {
          arr.splice(
            arr.findIndex(({ id }) => id == this.currDrag),
            1
          );
          return false;
        } else {
          this.dndRemove(i.children, this.currDrag);
          return true;
        }
      });
    },
    appendToCanvas() {
      let counter = useCounterStore();
      //append to canvas after appended

      console.log("currdrag = " + this.currDrag);
      this.setCurrDragValue(counter.data, this.currDrag);
      this.dndRemove(counter.data);

      this.currDragValue.position = "absolute";
      counter.data.push(this.currDragValue);
      console.log("currdragvalue = " + this.currDragValue.position);
      console.log("currdragvalueleft = " + this.currDragValue.left);
      console.log("currdragvaluetop = " + this.currDragValue.top);
    },
  },
});
