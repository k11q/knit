import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCanvasDndStore } from "./canvasDnd";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    selectedBox: "",
    dragDisplay: "",
    blueLine: "",
    selectedBoxData: "",
    selectedBoxHTMLX: "",
    selectedBoxHTMLY: "",
    prevX: 0,
    prevY: 0,
    selectedBoxHTMLWidth: "",
    selectedBoxHTMLHight: "",
    newSquare: false,
    dataTransfer: null,
    returnedElementData: "",
    data: [
      {
        id: "rectangle",
        type: "frame",
        textContent: "",
        color: "blue",
        bgColor: "blue",
        height: 500,
        width: 300,
        unit: "px",
        X: 50,
        Y: 50,
        Xunit: "px",
        Yunit: "px",
        position: "absolute",
        flexDirection: "column",
        strokeColor: "black",
        strokeSize: 0,
        strokeType: "Inside",
        isDroppable: true,
        align: "",
        justify: "",
        parent: "",
        children: [
          {
            id: "rectangle5",
            type: "box",
            textContent: "",
            color: "red",
            bgColor: "red",
            height: 80,
            width: 80,
            unit: "px",
            position: "static",
            flexDirection: "column",
            strokeColor: "black",
            strokeSize: 0,
            strokeType: "Inside",
            isDroppable: false,
            children: [],
            parent: "rectangle",
          },
          {
            id: "rectangle6",
            type: "box",
            textContent: "",
            color: "red",
            bgColor: "red",
            height: 80,
            width: 80,
            unit: "px",
            position: "static",
            flexDirection: "column",
            strokeColor: "black",
            strokeSize: 0,
            strokeType: "Inside",
            isDroppable: false,
            parent: "rectangle",
            children: [],
          },
          {
            id: "rectangle18",
            type: "box",
            textContent: "",
            color: "red",
            bgColor: "red",
            height: 80,
            width: 80,
            unit: "px",
            position: "static",
            flexDirection: "column",
            strokeColor: "black",
            strokeSize: 0,
            strokeType: "Inside",
            isDroppable: false,
            parent: "rectangle",
            children: [],
          },
        ],
      },
      {
        id: "rectangle2",
        type: "frame",
        textContent: "",
        color: "blueviolet",
        bgColor: "blueviolet",
        height: 100,
        width: 100,
        unit: "px",
        X: 300,
        Y: 50,
        Xunit: "px",
        Yunit: "px",
        position: "absolute",
        flexDirection: "column",
        strokeColor: "black",
        strokeSize: 0,
        strokeType: "Inside",
        isDroppable: false,
        children: [
          {
            id: "rectangle7",
            type: "box",
            textContent: "",
            color: "blue",
            bgColor: "blue",
            position: "absolute",
            flexDirection: "column",
            strokeColor: "black",
            strokeSize: 0,
            strokeType: "Inside",
            parent: "rectangle2",
            children: [
              {
                id: "rectangle8",
                type: "box",
                textContent: "",
                color: "red",
                bgColor: "red",
                position: "absolute",
                flexDirection: "column",
                strokeColor: "black",
                strokeSize: 0,
                strokeType: "Inside",
                parent: "rectangle7",
                children: [],
              },
              {
                id: "rectangle9",
                type: "box",
                textContent: "",
                color: "red",
                bgColor: "red",
                height: 80,
                width: 80,
                unit: "px",
                position: "absolute",
                flexDirection: "column",
                strokeColor: "black",
                strokeSize: 0,
                strokeType: "Inside",
                parent: "rectangle8",
                children: [
                  {
                    id: "rectangle10",
                    type: "box",
                    textContent: "",
                    color: "red",
                    bgColor: "red",
                    position: "absolute",
                    flexDirection: "column",
                    strokeColor: "black",
                    strokeSize: 0,
                    strokeType: "Inside",
                    isDroppable: true,
                    parent: "rectangle9",
                    children: [],
                  },
                  {
                    id: "rectangle11",
                    type: "box",
                    textContent: "",
                    color: "red",
                    bgColor: "red",
                    height: 80,
                    width: 80,
                    unit: "px",
                    X: 50,
                    Y: 50,
                    Xunit: "px",
                    Yunit: "px",
                    position: "absolute",
                    flexDirection: "column",
                    strokeColor: "black",
                    strokeSize: 0,
                    strokeType: "Inside",
                    parent: "rectangle9",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "rectangle3",
        type: "text",
        textContent: "Haha",
        fontSize: 14,
        fontUnit: "px",
        color: "purple",
        bgColor: "",
        height: "",
        width: "",
        unit: "px",
        X: 200,
        Y: 50,
        Xunit: "px",
        Yunit: "px",
        position: "absolute",
        flexDirection: "column",
        strokeColor: "black",
        strokeSize: 0,
        strokeType: "Inside",
        children: [],
      },
      {
        id: "rectangle4",
        type: "text",
        textContent: "Test",
        fontSize: 14,
        fontUnit: "px",
        color: "red",
        bgColor: "red",
        height: "",
        width: "",
        unit: "px",
        X: 100,
        Y: 50,
        Xunit: "px",
        Yunit: "px",
        position: "absolute",
        flexDirection: "column",
        strokeColor: "black",
        strokeSize: 0,
        strokeType: "Inside",
        children: [],
      },
      {
        id: "rectangle12",
        type: "box",
        textContent: "",
        color: "purple",
        bgColor: "purple",
        height: 100,
        width: 120,
        unit: "px",
        X: 500,
        Y: 200,
        Xunit: "px",
        Yunit: "px",
        position: "absolute",
        flexDirection: "column",
        strokeColor: "black",
        strokeSize: 0,
        strokeType: "Inside",
        isDroppable: true,
        parent: "",
        children: [],
      },
    ],
  }),
  getters: {
    selectedBoxColor(state) {
      state.data.find((x) => x.id === state.selectedBox).color;
    },
    selectedBoxHeight() {
      this.data.find((x) => x.id === selectedBox.value).height;
    },
    selectedBoxWidth() {
      this.data.find((x) => x.id === selectedBox.value).width;
    },
  },
  actions: {
    //get data from id
    getChildElement(arr, value) {
      arr.every((i) => {
        if (i.id === value) {
          this.selectedBoxData = i;
          return false;
        } else {
          this.getChildElement(i.children, value);
          return true;
        }
        return false;
      });
    },
    //remove from parent
    dndRemove(arr, value) {
      arr.every((i) => {
        if (i.id === value) {
          arr.splice(
            arr.findIndex(({ id }) => id == value),
            1
          );
          return false;
        } else {
          this.dndRemove(i.children, value);
          return true;
        }
      });
    },
    //append to an element
    dndAppend(arr, value, place) {
      arr.every((i) => {
        if (i.id === place) {
          arr.splice(
            arr.findIndex(({ id }) => id == place),
            0,
            value
          );
          return false;
        } else {
          this.dndAppend(i.children, value, place);
          return true;
        }
      });
    },
    changeFlexDirection(value) {
      this.selectedBoxData.flexDirection = value;
    },
    changeAlign(value) {
      this.selectedBoxData.align = value;
      console.log("changed align! to " + value);
    },
    changeJustify(value) {
      this.selectedBoxData.justify = value;
    },
    addSquare(dataSquare) {
      this.data.push(dataSquare);
    },
    changeSelected(e, id) {
      const squareStore = useSquareStore();

      if(squareStore.dragPointer || squareStore.draggingPointer) {
        } else {

          e.preventDefault();
          e.stopPropagation();

      this.prevX = e.layerX;
      this.prevY = e.layerY;

      console.log("prevX = " + this.prevX);
      console.log("prevY = " + this.prevY);

      this.selectedBox = id;
      console.log("selectedbox" + this.selectedBox);
      if (e.target) {
        let selectedTarget = e.target.getBoundingClientRect();
        let selectedElement = document.querySelector(`[data-id=${id}]`)
        console.log("selected target = " + selectedTarget);

        console.log("selectedX =" + selectedTarget.x);
        console.log("selectedY =" + selectedTarget.y);

        this.getChildElement(this.data, id);
        let parent = selectedElement.offsetParent;
        let parentOffsetLeft = parent.offsetLeft;
        let parentOffsetTop = parent.offsetTop;

        console.log("parentOffsetLeft = " + parentOffsetLeft);
        console.log("parentOffsetTop = " + parentOffsetTop);
        
        this.selectedBoxHTMLX = selectedElement.offsetLeft + parentOffsetLeft;
        this.selectedBoxHTMLY = selectedElement.offsetTop + parentOffsetTop;

        this.selectedBoxHTMLWidth = this.selectedBoxData.width;
        this.selectedBoxHTMLHeight = this.selectedBoxData.height;

        console.log(this.selectedBoxData);
      }
    }
    },
    changeSelectedNewlyAdded(e, newData) {
      this.prevX = e.layerX;
      this.prevY = e.layerY;

      this.selectedBox = newData.id;
      console.log("selectedbox" + this.selectedBox);
      this.selectedBoxHTMLX = newData.X;
      this.selectedBoxHTMLY = newData.Y;
      this.selectedBoxHTMLWidth = newData.width;
      this.selectedBoxHTMLHeight = newData.height;

      this.getChildElement(this.data, newData.id);

      console.log(this.selectedBoxData);
    },

    clearSelected() {
      let canvasDnd = useCanvasDndStore()

      this.selectedBox = "";
      canvasDnd.currDrag = "";
      canvasDnd.currDragValue = "";
    },
    changeColor(e) {
      this.data.find((x) => x.id === this.selectedBox).color = e;
    },
    formatData(arr, value) {
      arr.forEach((i) => {
        if (i.id === value) {
          i.children = [...i.children, this.dataTransfer];
          console.log(value);
        } else {
          formatData(i.children, value);
          console.log("roundtrip");
        }
      });
    },
    changeHeight(e) {
      this.data.find((x) => x.id === this.selectedBox).height = e;
      return selectedBoxHeight;
    },
    changeWidth(e) {
      this.data.find((x) => x.id === this.selectedBox).width = e.target.value;
      return selectedBoxWidth;
    },
    changePositionX(e) {
      this.data.find((x) => x.id === this.selectedBox).width = e.target.value;
      return selectedBoxWidth;
    },
    getHeight(height, unit) {
      if (height) {
        return height + unit;
      } else {
        return "auto";
      }
    },
    getWidth(width, unit) {
      if (width) {
        return width + unit;
      } else {
        return "auto";
      }
    },
    getAlign(align) {
      if (align) {
        return align;
      } else {
        return "start";
      }
    },
    getJustify(justify) {
      if (justify) {
        return justify;
      } else {
        return "start";
      }
    },
    getBorder(size, type, color) {
      if (size && type && color) {
        return size + "px " + type + " " + color;
      } else {
        return "none";
      }
    },
    findElement(arr, value) {
      arr.every((i) => {
        if (i.id === value) {
          this.returnedElementData = i;
          return false;
        } else {
          this.findElement(i.children, value);
          return true;
        }
      });
    },
  },
});
