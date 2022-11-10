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
    spareDragzone: "",
  }),
  actions: {
    checkDroppable(e, node) {
      if (this.isDragging == true) {
        if (node) {
          if (node.id != this.currDrag) {
            console.log("node.id = " + node.id);
            this.currDrop = node.id;
            console.log("currdrop =" + this.currDrop);
            console.log("currdrag = " + this.currDrag);
            this.isDroppable = true;
            this.displayDroppable = node.isDroppable;
          } else {
            this.currDrop = "";
            this.isDroppable = false;
          }
        } else {
          this.currDrop = "";
          this.isDroppable = false;
        }
        console.log("isdroppable =" + this.isDroppable);
      }
    },
    setCurrDragValue(arr, value) {
      arr.every((i) => {
        if (i.id === value) {
          this.currDragValue = i;
          return false;
        } else {
          this.setCurrDragValue(i.children, value);
          return true;
        }
      });
    },
    removeDroppable() {
      this.currDrop = "";
      this.displayDroppable = false;
      console.log("remove droppable");
    },
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
    dndAppend(arr, dragZone) {
      arr.every((i) => {
        if (i.id === this.currDrop) {
          if (dragZone) {
            i.children.splice(
              i.children.findIndex(({ id }) => id == dragZone),
              0,
              this.currDragValue
            );
            return false;
          } else {
            i.children = [...i.children, this.currDragValue];
            return false;
          }
        } else {
          this.dndAppend(i.children, dragZone);
          return true;
        }
      });
    },
    appendToCanvas() {
      let counter = useCounterStore();
      if (!this.currDrop && this.currDragValue) {
        //append to canvas after appended

        console.log("currdrag = " + this.currDrag);
        this.setCurrDragValue(counter.data, this.currDrag);
        this.dndRemove(counter.data);

        this.currDragValue.position = "absolute";
        counter.data.push(this.currDragValue);
        console.log("currdragvalue = " + this.currDragValue.position);
        console.log("currdragvalueleft = " + this.currDragValue.left);
        console.log("currdragvaluetop = " + this.currDragValue.top);
      }
    },
  },
});
