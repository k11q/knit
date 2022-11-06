import { defineStore } from "pinia";
import { useCounterStore } from "./counter";

export const useTreeDndStore = defineStore({
  id: "treeDnd",
  state: () => ({
        isDragging: false,
        isDroppable: false,
        displayDroppable: false,
        currHover:"",
        currDrop: "",
        currDropPosition: "",
        currDrag: "",
        currDragValue: "",
        currDropHTML: "",
        clientY: "",
        dragzone: "",
        spareDragzone: ""
      }),
      actions: {
        checkDroppable(e, node) {
              
              if (node) {
                if (node.id != this.currDrag) {
              this.currDrop = node.id;
              
              const currdropEl = document.querySelector(`[data-treeId="${node.id}"]`)
              const currdropElRect = currdropEl.getBoundingClientRect()

            if (e.clientY - currdropElRect.y >= currdropElRect.height*2/3){
                this.currDropPosition="bottom"
            } else if(e.clientY - currdropElRect.y > currdropElRect.height*1/3){
                this.currDropPosition="middle"
            } else {
                this.currDropPosition="top"
            }
            console.log("currposition = "+this.currDropPosition)

              this.isDroppable = true;
              this.displayDroppable = node.isDroppable;
                } else {
                  this.currDrop = "";
              this.isDroppable = false;
                }
            } else {
              this.currDrop = "";
              this.isDroppable = false;
            console.log("isdroppable ="+this.isDroppable)
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
          dndAppendTop(arr, currDrop) {
            arr.every((i) => {
              if (i.id === this.currDrop) {
                if (currDrop) {
                  arr.splice(
                    arr.findIndex(({ id }) => id == currDrop)+1,
                    0,
                    this.currDragValue
                  );
                  return false;
                }
              } else {
                this.dndAppendTop(i.children, currDrop);
                return true;
              }
            });
          },
          dndAppendBottom(arr, currDrop) {
            arr.every((i) => {
              if (i.id === this.currDrop) {
                if (currDrop) {
                    if ( arr.findIndex(({ id }) => id == currDrop) === 0) {
                        arr.unshift(this.currDragValue)
                    }else {
                  arr.splice(
                    arr.findIndex(({ id }) => id == currDrop),
                    0,
                    this.currDragValue
                  );
                  return false;
                }}
              } else {
                this.dndAppendBottom(i.children, currDrop);
                return true;
              }
            });
          },
          dndAppendMiddle(arr, currDrop) {
            arr.every((i) => {
              if (i.id === this.currDrop) {
                if (currDrop) {  
                  i.children.push(this.currDragValue);
                  return false;
                }
              } else {
                this.dndAppendMiddle(i.children, currDrop);
                return true;
              }
            });
          },
  }
})