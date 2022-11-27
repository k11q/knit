import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCanvasDndStore } from "./canvasDnd";
import { usePaddingResizeStore } from "./paddingResizeStore";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    selectedBox: "",
    dragDisplay: "",
    blueLine: "",
    selectedBoxData: "",
    selectedBoxHTMLX: NaN,
    selectedBoxHTMLY: NaN,
    selectedTextEditor: "",
    prevX: 0,
    prevY: 0,
    selectedBoxHTMLWidth: NaN,
    selectedBoxHTMLHeight: NaN,
    treeHover: false,
    treeHoverId: "",
    treeHoverHTMLX: NaN,
    treeHoverHTMLY: NaN,
    treeHoverHTMLWidth: NaN,
    treeHoverHTMLHight: NaN,
    treeHoverSize: 1,
    newSquare: false,
    dataTransfer: null,
    showTextEditor: false,
    returnedElementData: "",
    resizeObserverRect: {},
    resizeObserverTarget: {},
    resizeObserverTargetRect: {},
    canvas: [
      {
        id: "Page 1",
        bgColor: "#1C1C1C",
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
        name: "rectangle",
        id: "i78978978723sbwhbcwh",
        type: "div",
        attr: {
          style: {
            display: "flex",
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
            name: "rectangle5",
            id: "uhwahcwuhcw0ucfew8dwo",
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
            name: "rectangle6",
            id: "uscwahcag7hcea8hvewhvceh",
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
            name: "rectangle18",
            id: "hsufhew9e8uejcecj9ece",
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
        name: "rectangle2",
        id: "wcw7c9e8ujev79hn0unm2e",
        type: "div",
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
            name: "rectangle7",
            id: "weifjewf9ue9vie0vjrwd",
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
                name: "rectangle8",
                id: "iejeiec9wec9v9evjei",
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
                name: "rectangle9",
                id: "uwhcuwe9vei09vjejve",
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
                    name: "rectangle10",
                    id: "owjfcniewceve99eiv9eive0",
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
                    name: "rectangle11",
                    id: "iwifjweioneoevneiune",
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
        name: "rectangle3",
        id: "iwjfeevrb-rb99ir8bu9",
        type: "text",
        attr: {
          style: {
            fontSize: "14px",
            color: "purple",
            left: "200px",
            top: "50px",
            position: "absolute",
            flexDirection: "column",
            width: "fit-content",
            height: "fit-content",
          },
        },
        textContent: "Haha",
        children: [],
      },
      {
        name: "rectangle4",
        id: "jweijeojveoj9er0irb8u0rb",
        type: "text",
        textContent: "Test",
        attr: {
          style: {
            fontSize: "14px",
            left: "100px",
            top: "5px",
            position: "absolute",
            width: "fit-content",
            height: "fit-content",
          },
        },
        children: [],
      },
      {
        name: "rectangle12",
        id: "owpif9eipiojohuh90i",
        type: "box",
        repeat: true,
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
    cssData: "",
  }),
  getters: {
    selectedBoxHeight() {
      return parseInt(this.selectedBoxData.attr?.style.height, 10);
    },
    selectedBoxWidth() {
      return parseInt(this.selectedBoxData.attr?.style.width, 10);
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
      this.selectedBoxData.attr.style.alignItems = value;
      console.log("changed align! to " + value);
    },
    changeJustify(value) {
      this.selectedBoxData.attr.style.justifyContent = value;
    },
    addSquare(dataSquare) {
      this.data.push(dataSquare);
    },
    changeSelected(e, id, type) {
      const squareStore = useSquareStore();
      const paddingResize = usePaddingResizeStore();

      if (squareStore.dragPointer || squareStore.draggingPointer) {
      } else {
        if (type !== "text") {
          e.preventDefault();
        }
        e.stopPropagation();

        Promise.resolve()
          .then(() => {
            paddingResize.setResizerSize(id);
          })
          .then(() => {
            this.selectedBox = id;

            if (e.target) {
              this.getChildElement(this.data, id);
            }
          })
          .then(() => {
            useResizeObserver(this.selectedBoxData.id);
          });

        this.prevX = e.layerX;
        this.prevY = e.layerY;
      }
    },
    changeSelectedNewlyAdded(e, newData) {
      this.prevX = e.layerX;
      this.prevY = e.layerY;

      Promise.resolve()
        .then(() => {
          this.selectedBox = newData.id;
        })
        .then(() => {
          useResizeObserver(this.selectedBoxData.id);
        });

      if (e.target) {
        this.getChildElement(this.data, newData.id);
      }
    },

    clearSelected() {
      if (this.selectedTextEditor) {
        useSetOutlineSelector(this.selectedTextEditor);
        this.selectedTextEditor = "";
      } else {
        let canvasDnd = useCanvasDndStore();
        this.selectedBox = "";
        canvasDnd.currDrag = "";
        canvasDnd.currDragValue = "";
      }
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
    getLeft(id) {
      const squareStore = useSquareStore();

      let target = document.querySelector(`[data-id=${id}]`);
      let targetRect = target.getBoundingClientRect();
      let targetParent = document.querySelector(
        `[data-id=${id}]`
      ).parentElement;
      let targetParentRect = targetParent.getBoundingClientRect();
      let left = (targetRect.x - targetParentRect.x) / squareStore.scale + "px";
      return left;
    },
    getTop(id) {
      const squareStore = useSquareStore();

      let target = document.querySelector(`[data-id=${id}]`);
      let targetRect = target.getBoundingClientRect();
      let targetParent = document.querySelector(
        `[data-id=${id}]`
      ).parentElement;
      let targetParentRect = targetParent.getBoundingClientRect();
      let top = (targetRect.y - targetParentRect.y) / squareStore.scale + "px";
      return top;
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
