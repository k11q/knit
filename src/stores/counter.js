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
    treeHover: false,
    treeHoverHTMLX: "",
    treeHoverHTMLY: "",
    treeHoverHTMLWidth: "",
    treeHoverHTMLHight: "",
    newSquare: false,
    dataTransfer: null,
    returnedElementData: "",
    canvas: [
      {
        id: "Page 1",
        bgColor: "#232323",
        children: [
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
            height: 100,
            width: 100,
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
            height: 100,
            width: 100,
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
      },
      { id: "Page 2", bgColor: "#232323", children: [] },
      { id: "Page 3", bgColor: "#232323", children: [] },
    ],
    data: [
      {
        id: "rectangle",
        type: "frame",
        attr: {
          style: {
            color: "blue",
            backgroundColor: "blue",
            height: "500px",
            width: "300px",
            left: "50px",
            top: "50px",
            position: "absolute",
            flexDirection: "column",
          },
        },
        children: [
          {
            id: "rectangle5",
            type: "box",
            attr: {
              style: {
                color: "red",
                backgroundColor: "red",
                height: "80px",
                width: "80px",
                position: "static",
                flexDirection: "column",
              },
            },
            children: [],
            parent: "rectangle",
          },
          {
            id: "rectangle6",
            type: "box",
            attr: {
              style: {
                color: "red",
                backgroundColor: "red",
                height: "80px",
                width: "80px",
                position: "static",
                flexDirection: "column",
              },
            },
            parent: "rectangle",
            children: [],
          },
          {
            id: "rectangle18",
            type: "box",
            attr: {
              style: {
                color: "red",
                backgroundColor: "red",
                height: "80px",
                width: "80px",
                position: "static",
                flexDirection: "column",
              },
            },
            parent: "rectangle",
            children: [],
          },
        ],
      },
      {
        id: "rectangle2",
        type: "frame",
        attr: {
          style: {
            color: "blueviolet",
            backgroundColor: "blueviolet",
            height: "100px",
            width: "100px",
            X: "300px",
            Y: "50px",
            position: "absolute",
            flexDirection: "column",
          },
        },
        children: [
          {
            id: "rectangle7",
            type: "box",
            attr: {
              style: {
                color: "blue",
                backgroundColor: "blue",
                position: "absolute",
                flexDirection: "column",
              },
            },
            parent: "rectangle2",
            children: [
              {
                id: "rectangle8",
                type: "box",
                attr: {
                  style: {
                    color: "red",
                    backgroundColor: "red",
                    position: "absolute",
                    flexDirection: "column",
                  },
                },
                parent: "rectangle7",
                children: [],
              },
              {
                id: "rectangle9",
                type: "box",
                attr: {
                  style: {
                    color: "red",
                    backgroundColor: "red",
                    height: "80px",
                    width: "80px",
                    position: "absolute",
                    flexDirection: "column",
                  },
                },
                parent: "rectangle8",
                children: [
                  {
                    id: "rectangle10",
                    type: "box",
                    attr: {
                      style: {
                        color: "red",
                        backgroundColor: "red",
                        position: "absolute",
                        flexDirection: "column",
                      },
                    },
                    parent: "rectangle9",
                    children: [],
                  },
                  {
                    id: "rectangle11",
                    type: "box",
                    attr: {
                      style: {
                        color: "red",
                        backgroundColor: "red",
                        height: "80px",
                        width: "80px",
                        unit: "px",
                        X: "50px",
                        Y: "50px",
                        position: "absolute",
                        flexDirection: "column",
                      },
                    },
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
        attr: {
          style: {
            fontSize: "14px",
            color: "purple",
            height: "100px",
            width: "100px",
            X: "200px",
            Y: "50px",
            position: "absolute",
            flexDirection: "column",
          },
        },
        textContent: "Haha",
        children: [],
      },
      {
        id: "rectangle4",
        type: "text",
        textContent: "Test",
        attr: {
          style: {
            fontSize: "14px",
            left: "100px",
            top: "5px",
            position: "absolute",
          },
        },
        children: [],
      },
      {
        id: "rectangle12",
        type: "box",
        attr: {
          style: {
            left: "500px",
            top: "200px",
            color: "purple",
            backgroundColor: "purple",
            height: "100px",
            width: "120px",
            position: "absolute",
            flexDirection: "column",
            borderRadius: "1px",
          },
        },
        children: [],
      },
    ],
  }),
  getters: {
    selectedBoxColor(state) {
      state.data.find((x) => x.id === state.selectedBox).color;
    },
    selectedBoxHeight() {
      return parseInt(this.selectedBoxData.attr?.style.height, 10);
    },
    selectedBoxWidth() {
      return parseInt(this.selectedBoxData.attr?.style.width, 10);
    },
    selectedBoxLeft() {
      return parseInt(this.selectedBoxData.attr?.style.left, 10);
    },
    selectedBoxTop() {
      return parseInt(this.selectedBoxData.attr?.style.top, 10);
    },
    selectedBoxBorderRadius() {
      return parseInt(this.selectedBoxData.attr?.style.borderRadius, 10);
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
    changeSelected(e, id, type) {
      const squareStore = useSquareStore();

      if (squareStore.dragPointer || squareStore.draggingPointer) {
      } else {
        if (type !== "text") {
          e.preventDefault();
        }
        e.stopPropagation();

        this.prevX = e.layerX;
        this.prevY = e.layerY;

        this.selectedBox = id;

        if (e.target) {
          let target = document.querySelector(`[data-id=${id}]`);
          let selectedTarget = target.getBoundingClientRect();

          this.getChildElement(this.data, id);

          this.selectedBoxHTMLX = Math.round(
            (selectedTarget.x - squareStore.offsetLeft) / squareStore.scale
          );
          this.selectedBoxHTMLY = Math.round(
            (selectedTarget.y - squareStore.offsetTop) / squareStore.scale
          );

          this.selectedBoxHTMLWidth = Math.round(
            selectedTarget.width / squareStore.scale
          );
          this.selectedBoxHTMLHeight = Math.round(
            selectedTarget.height / squareStore.scale
          );
        }
      }
    },
    changeSelectedNewlyAdded(e, newData) {
      this.prevX = e.layerX;
      this.prevY = e.layerY;

      this.selectedBox = newData.id;
      this.selectedBoxHTMLX =
        newData.attr.style.left.replace(/[^-?0-9\.]+/g, "") | 0;
      this.selectedBoxHTMLY =
        newData.attr.style.top.replace(/[^-?0-9\.]+/g, "") | 0;
      this.selectedBoxHTMLWidth =
        newData.attr.style.width.replace(/[^-?0-9\.]+/g, "") | 0;
      this.selectedBoxHTMLHeight =
        newData.attr.style.height.replace(/[^-?0-9\.]+/g, "") | 0;
      this.getChildElement(this.data, newData.id);
    },

    clearSelected() {
      let canvasDnd = useCanvasDndStore();

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
    getHeight(id) {
      return document.querySelector(`[data-id=${id}]`).clientHeight;
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
