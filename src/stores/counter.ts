import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCanvasDndStore } from "./canvasDnd";
import { usePaddingResizeStore } from "./paddingResizeStore";
import { useCanvasStore } from "./canvas";

export type CSSRuleDetails = {
  type: "unit" | "keyword";
  value: number | string;
  unit?: string;
};

export type CSSRule = {
  display: CSSRuleDetails;
  position: CSSRuleDetails;
  flexDirection?: CSSRuleDetails;
  alignItems?: CSSRuleDetails;
  justifyContent?: CSSRuleDetails;
  left?: CSSRuleDetails;
  top?: CSSRuleDetails;
  right?: CSSRuleDetails;
  bottom?: CSSRuleDetails;
  height?: CSSRuleDetails;
  width?: CSSRuleDetails;
  color?: CSSRuleDetails;
  backgroundColor?: CSSRuleDetails;
  borderRadius?: CSSRuleDetails;
  gap?: CSSRuleDetails;

  fontSize?: CSSRuleDetails;
  lineHeight?: CSSRuleDetails;

  paddingLeft?: CSSRuleDetails;
  paddingTop?: CSSRuleDetails;
  paddingRight?: CSSRuleDetails;
  paddingBottom?: CSSRuleDetails;

  marginLeft?: CSSRuleDetails;
  marginTop?: CSSRuleDetails;
  marginRight?: CSSRuleDetails;
  marginBottom?: CSSRuleDetails;
};

export type Breakpoint = {
  id: number | string;
  style: CSSRule;
};

export type Node = {
  name: string;
  id: string;
  type: "box" | "div" | "text";
  textContent?: string;
  display: "hide" | "show";
  cssRules: Array<Breakpoint>;
  children: Array<Node>;
};

export type Document = Array<Node>;

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    selectedBox: "",
    dragDisplay: "",
    selectedBoxData: {} as Node,
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
    treeHoverHTMLHeight: NaN,
    treeHoverSize: 1,
    canvas: [
      {
        id: "Page 1",
        bgColor: "#0F0F11",
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
      { id: "Page 2", bgColor: "#0F0F11", children: [] },
      { id: "Page 3", bgColor: "#0F0F11", children: [] },
    ],
    data: [
      {
        name: "rectangle",
        id: "i78978978723sbwhbcwh",
        type: "div",
        cssRules: [
          {
            breakpoint: 1,
            style: {
              display: { type: "keyword", value: "flex" },
              flexDirection: { type: "keyword", value: "column" },
              backgroundColor: { type: "keyword", value: "white" },
              paddingLeft: { type: "unit", value: 20, unit: "px" },
              position: { type: "keyword", value: "absolute" },
              left: { type: "unit", value: 100, unit: "px" },
              top: { type: "unit", value: 50, unit: "px" },
              height: { type: "unit", value: 400, unit: "px" },
              width: { type: "unit", value: 300, unit: "px" },
            },
          },
        ],
        children: [
          {
            name: "rectangle5",
            id: "uhwahcwuhcw0ucfew8dwo",
            type: "box",
            cssRules: [
              {
                breakpoint: 1,
                style: {
                  display: { type: "keyword", value: "flex" },
                  flexDirection: { type: "keyword", value: "column" },
                  backgroundColor: { type: "keyword", value: "blue" },
                  position: { type: "keyword", value: "static" },
                  height: { type: "unit", value: 80, unit: "px" },
                  width: { type: "unit", value: 80, unit: "px" },
                },
              },
            ],
            children: [],
          },
          {
            name: "rectangle6",
            id: "uscwahcag7hcea8hvewhvceh",
            type: "box",
            cssRules: [
              {
                breakpoint: 1,
                style: {
                  display: { type: "keyword", value: "flex" },
                  flexDirection: { type: "keyword", value: "column" },
                  backgroundColor: { type: "keyword", value: "orange" },
                  position: { type: "keyword", value: "static" },
                  height: { type: "unit", value: 70, unit: "px" },
                  width: { type: "unit", value: 90, unit: "px" },
                },
              },
            ],
            children: [],
          },
          {
            name: "rectangle18",
            id: "hsufhew9e8uejcecj9ece",
            type: "box",
            cssRules: [
              {
                breakpoint: 1,
                style: {
                  display: { type: "keyword", value: "flex" },
                  flexDirection: { type: "keyword", value: "column" },
                  position: { type: "keyword", value: "static" },
                  backgroundColor: { type: "keyword", value: "green" },
                  height: { type: "unit", value: 80, unit: "px" },
                  width: { type: "unit", value: 70, unit: "px" },
                },
              },
            ],
            children: [],
          },
        ],
      },
      {
        name: "rectangle2",
        id: "wcw7c9e8ujev79hn0unm2e",
        type: "div",
        cssRules: [
          {
            breakpoint: 1,
            style: {
              display: { type: "keyword", value: "flex" },
              flexDirection: { type: "keyword", value: "column" },
              backgroundColor: { type: "keyword", value: "blueviolet" },
              position: { type: "keyword", value: "absolute" },
              left: { type: "unit", value: 250, unit: "px" },
              top: { type: "unit", value: 100, unit: "px" },
              height: { type: "unit", value: 100, unit: "px" },
              width: { type: "unit", value: 90, unit: "px" },
            },
          },
        ],
        children: [
          {
            name: "rectangle7",
            id: "weifjewf9ue9vie0vjrwd",
            type: "box",
            cssRules: [
              {
                breakpoint: 1,
                style: {
                  display: { type: "keyword", value: "flex" },
                  flexDirection: { type: "keyword", value: "column" },
                  backgroundColor: { type: "keyword", value: "blue" },
                  position: { type: "keyword", value: "absolute" },
                  left: { type: "unit", value: 20, unit: "px" },
                  top: { type: "unit", value: 30, unit: "px" },
                },
              },
            ],
            children: [
              {
                name: "rectangle8",
                id: "iejeiec9wec9v9evjei",
                type: "box",
                cssRules: [
                  {
                    breakpoint: 1,
                    style: {
                      display: { type: "keyword", value: "flex" },
                      flexDirection: { type: "keyword", value: "column" },
                      backgroundColor: { type: "keyword", value: "red" },
                      position: { type: "keyword", value: "absolute" },
                      left: { type: "unit", value: 40, unit: "px" },
                      top: { type: "unit", value: 50, unit: "px" },
                    },
                  },
                ],
                children: [],
              },
              {
                name: "rectangle9",
                id: "uwhcuwe9vei09vjejve",
                type: "box",
                cssRules: [
                  {
                    breakpoint: 1,
                    style: {
                      display: { type: "keyword", value: "flex" },
                      flexDirection: { type: "keyword", value: "column" },
                      backgroundColor: { type: "keyword", value: "blue" },
                      position: { type: "keyword", value: "absolute" },
                      left: { type: "unit", value: 100, unit: "px" },
                      top: { type: "unit", value: 50, unit: "px" },
                      height: { type: "unit", value: 80, unit: "px" },
                      width: { type: "unit", value: 80, unit: "px" },
                    },
                  },
                ],
                children: [
                  {
                    name: "rectangle10",
                    id: "owjfcniewceve99eiv9eive0",
                    type: "box",
                    cssRules: [
                      {
                        breakpoint: 1,
                        style: {
                          display: { type: "keyword", value: "flex" },
                          flexDirection: { type: "keyword", value: "column" },
                          backgroundColor: { type: "keyword", value: "red" },
                          position: { type: "keyword", value: "absolute" },
                          left: { type: "unit", value: 10, unit: "px" },
                          top: { type: "unit", value: 30, unit: "px" },
                        },
                      },
                    ],
                    children: [],
                  },
                  {
                    name: "rectangle11",
                    id: "iwifjweioneoevneiune",
                    type: "box",
                    cssRules: [
                      {
                        breakpoint: 1,
                        style: {
                          display: { type: "keyword", value: "flex" },
                          flexDirection: { type: "keyword", value: "column" },
                          backgroundColor: { type: "keyword", value: "red" },
                          position: { type: "keyword", value: "absolute" },
                          left: { type: "unit", value: 50, unit: "px" },
                          top: { type: "unit", value: 90, unit: "px" },
                          height: { type: "unit", value: 80, unit: "px" },
                          width: { type: "unit", value: 90, unit: "px" },
                        },
                      },
                    ],
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
        cssRules: [
          {
            breakpoint: 1,
            style: {
              display: { type: "keyword", value: "flex" },
              flexDirection: { type: "keyword", value: "column" },
              color: { type: "keyword", value: "purple" },
              position: { type: "keyword", value: "absolute" },
              left: { type: "unit", value: 240, unit: "px" },
              top: { type: "unit", value: 60, unit: "px" },
              height: { type: "keyword", value: "fit-content" },
              width: { type: "keyword", value: "fit-content" },
              fontSize: { type: "unit", value: 16, unit: "px" },
            },
          },
        ],
        textContent: "Haha",
        children: [],
      },
      {
        name: "rectangle4",
        id: "jweijeojveoj9er0irb8u0rb",
        type: "text",
        textContent: "Test",
        cssRules: [
          {
            breakpoint: 1,
            style: {
              color: { type: "keyword", value: "white" },
              position: { type: "keyword", value: "absolute" },
              left: { type: "unit", value: 120, unit: "px" },
              top: { type: "unit", value: 20, unit: "px" },
              height: { type: "keyword", value: "fit-content" },
              width: { type: "keyword", value: "fit-content" },
              fontSize: { type: "unit", value: 14, unit: "px" },
            },
          },
        ],
        children: [],
      },
      {
        name: "rectangle12",
        id: "owpif9eipiojohuh90i",
        type: "box",
        repeat: true,
        cssRules: [
          {
            breakpoint: 1,
            style: {
              display: { type: "keyword", value: "flex" },
              flexDirection: { type: "keyword", value: "column" },
              backgroundColor: { type: "keyword", value: "purple" },
              position: { type: "keyword", value: "absolute" },
              left: { type: "unit", value: 600, unit: "px" },
              top: { type: "unit", value: 300, unit: "px" },
              height: { type: "unit", value: 100, unit: "px" },
              width: { type: "unit", value: 120, unit: "px" },
              borderRadius: { type: "unit", value: 4, unit: "px" },
            },
          },
        ],
        children: [],
      },
    ] as Document,
  }),
  actions: {
    getChildElement(arr: Document, value: string) {
      arr.every((i) => {
        if (i.id === value) {
          this.selectedBoxData = i;
          return false;
        } else {
          this.getChildElement(i.children, value);
          return true;
        }
      });
    },
    changeSelected(e: MouseEvent, id: string) {
      const squareStore = useSquareStore();
      const paddingResize = usePaddingResizeStore();

      if (squareStore.dragPointer || squareStore.draggingPointer) {
      } else {
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
          });

        this.prevX = e.layerX;
        this.prevY = e.layerY;
      }
    },
    changeSelectedNewlyAdded(e: MouseEvent, newData: Node) {
      this.prevX = e.layerX;
      this.prevY = e.layerY;

      Promise.resolve().then(() => {
        this.selectedBox = newData.id;
      });

      if (e.target) {
        this.getChildElement(this.data, newData.id);
      }
    },
    clearSelected() {
      const canvasStore = useCanvasStore();
      if (this.selectedTextEditor) {
        useSetOutlineSelector(this.selectedTextEditor);
        this.selectedTextEditor = "";
      } else {
        let canvasDnd = useCanvasDndStore();
        this.selectedBox = "";
        this.selectedBoxData = {};
        canvasStore.selection = [];
        canvasStore.multiSelectResizerRect = {
          left: "",
          top: "",
          height: "",
          width: "",
        };
        canvasDnd.currDrag = "";
        canvasDnd.currDragValue = "";
      }
    },
  },
});
