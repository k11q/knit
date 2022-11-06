<template>
  <template v-for="node in nodes" :key="node.id">
    <div
      v-if="typeFrame(node.type)"
      :style="{
        backgroundColor: node.bgColor,
        height: selectToi.getHeight(node.height, node.unit),
        width: selectToi.getWidth(node.width, node.unit),
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent : selectToi.getJustify(node.justify),
        alignItems : selectToi.getAlign(node.align),
        position: node.position,
        color: node.color,
        paddingLeft: node.paddingX + 'px',
        paddingTop: node.paddingY + 'px',
        paddingRight: node.paddingX  + 'px',
        paddingBottom: node.paddingY  + 'px',
        marginLeft: node.marginLeft + 'px',
        marginTop: node.marginTop + 'px',
        marginRight: node.marginRight + 'px',
        marginBottom: node.margingBottom + 'px',
        borderRadius: node.corner + 'px',
        border: node.strokeSize + 'px ' + 'solid ' + node.strokeColor,
        gap: node.gap + 'px',
        flexGrow: node.flexGrow,
        alignSelf: node.alignSelf,
        boxShadow: `${node.boxShadowOffsetY}px ${node.boxShadowOffsetX}px ${node.boxShadowBlurRadius}px ${node.boxShadowSpreadRadius}px ${node.boxShadowColor}`
      }"
      :data-id="node.id"
      @pointerdown.stop="testDown($event, node.id)"
      @mouseover="canvasDnd.checkDroppable($event, node)"
      @mousedown="selectToi.changeSelected($event, node.id)"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      class="hover:shadow-[0_0_0_2px_#2563eb]"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
    <p
        @mousedown="selectToi.changeSelected($event, node.id)"
        class="absolute bottom-full left-0 mb-0.5 hover:text-blue-600"
        :class="{
          'text-blue-600': selectToi.selectedBox === node.id,
        }"
      >
        {{ node.id }}
      </p>
    <UIBrowser
          v-if="node.children"
          :key="node.id"
          :nodes="node.children"
          :depth="depth + 1"
        />
    </div>
    <div
      v-if="node.type === 'box'"
      :style="{
        backgroundColor: node.bgColor,
        height: selectToi.getHeight(node.height, node.unit),
        width: selectToi.getWidth(node.width, node.unit),
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        position: node.position,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent : selectToi.getJustify(node.justify),
        color: node.color,
        paddingLeft: node.paddingX + 'px',
        paddingTop: node.paddingY + 'px',
        paddingRight: node.paddingX  + 'px',
        paddingBottom: node.paddingY  + 'px',
        marginLeft: node.marginLeft + 'px',
        marginTop: node.marginTop + 'px',
        marginRight: node.marginRight + 'px',
        marginBottom: node.marginBottom + 'px',
        borderRadius: node.corner + 'px',
        border: node.strokeSize + 'px ' + 'solid ' + node.strokeColor,
        gap: node.gap + 'px',
        flexGrow: node.flexGrow,
        alignSelf: node.alignSelf,
        boxShadow: `${node.boxShadowOffsetY}px ${node.boxShadowOffsetX}px ${node.boxShadowBlurRadius}px ${node.boxShadowSpreadRadius}px ${node.boxShadowColor}`,
      }"
      :data-id="node.id"
      @pointerdown.stop="testDown($event, node.id)"
      @mouseover.stop.prevent="canvasDnd.checkDroppable($event, node)"
      @mousedown="selectToi.changeSelected($event, node.id)"
      class="hover:shadow-[0_0_0_2px_#2563eb]"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
      <div
      :style="{justifyContent : selectToi.getJustify(node.justify),
         alignItems: selectToi.getAlign(node.align),}"
        v-if="canvasDnd.currDrop == node.id && canvasFF.isDragging === true"
        class="w-4/5 h-0.5 bg-black m-auto absolute inset-0"
      ></div>
      <UIBrowser
          v-if="node.children"
          :key="node.id"
          :nodes="node.children"
          :depth="depth + 1"
        />
    </div>
    <div
      v-if="typeText(node.type)"
      class="text-center focus:outline-none hover:decoration-blue-600 hover:underline hover:decoration-2"
      @pointerdown.stop="testDown($event, node.id)"
      @mousedown="selectToi.changeSelected($event, node.id)"
      style="position: absolute"
      :style="{
        height: selectToi.getHeight(node.height, node.unit),
        width: selectToi.getWidth(node.width, node.unit),
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        fontSize: node.fontSize + node.fontUnit,
        position: node.position,
        display: 'flex',
        color: node.color,
      }"
      :data-id="node.id"
      :class="{
        'decoration-blue-600 underline decoration-1 ':
          selectToi.selectedBox === node.id,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
      @click="makeEditable"
      :contenteditable="editable"
    >
      {{ node.textContent }}
      
    </div>
  </template>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useCanvasDndStore } from "../stores/canvasDnd";
import { useCanvasFF } from "../stores/canvasFreeForm";
import { useResizeStore } from "../stores/resizeStore";
import { useSquareStore } from "~~/stores/dataSquare";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const squareStore = useSquareStore();
let isResizing = false;

const typeFrame = (type) => {
  if (type === "frame") {
    return true;
  } else return false;
};

const typeText = (type) => {
  if (type === "text") {
    return true;
  } else return false;
};

const testDown = (e, currDrag) => {

  if (!squareStore.dragPointer && !squareStore.draggingPointer) {

  let prevX = e.layerX;
  let prevY = e.layerY;

  let prevOffsetLeft = e.target.offsetLeft
  let prevOffsetTop = e.target.offsetTop

  canvasFF.isDragging = true;
  canvasDnd.isDragging = true;
  canvasDnd.currDrag = currDrag;
  let isDragging = false;

  console.log("mousedown");

  console.log("currDrop = " + canvasDnd.currDrop);
  console.log("currDrag = " + canvasDnd.currDrag);

  document.addEventListener('keyup', event => {
  if (event.key == 'Backspace' || event.key == 'Delete' && selectToi.selectedBox) {
    canvasDnd.dndRemove(selectToi.data);
    selectToi.clearSelected();
  }})

  if(!selectToi.selectedBox) {
    document.removeEventListener('keyup', event => {
  if (event.key == 'Backspace' || event.key == 'Delete' && selectToi.selectedBox) {
    canvasDnd.dndRemove(selectToi.data);
    selectToi.clearSelected();
  }
  })}

  if (canvasFF.isDragging == true) {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      isDragging = true;
      
      if (e.target) {

      if (selectToi.selectedBoxData.parent) {
        selectToi.selectedBoxHTMLX = e.clientX - selectToi.prevX +prevOffsetLeft
        selectToi.selectedBoxHTMLY = e.clientY - selectToi.prevY +prevOffsetTop
      } else {
        selectToi.selectedBoxHTMLX = e.clientX - selectToi.prevX
        selectToi.selectedBoxHTMLY = e.clientY - selectToi.prevY
      }

      console.log("e clientX = "+e.clientX)
      console.log("e clientY = "+e.clientY)}

      selectToi.selectedBoxData.X = e.clientX - prevX;
      selectToi.selectedBoxData.Y = e.clientY - prevY;

      if (!isResizing) {
        //sort childrens by dragging
        
        if (canvasDnd.isDroppable && canvasDnd.currDrop) {
         canvasDnd.currDropHTML=e.target

          let dropzoneChildren = [...canvasDnd.currDropHTML.children]
          
          console.log('dropzoneChildren = '+dropzoneChildren)

          function getDragAfter(y) {
            return dropzoneChildren.reduce(
              (closest, child) => {
                const box = child.getBoundingClientRect();
                console.log("box = "+box);
                console.log("child id = "+child.dataset.id);
                canvasDnd.spareDragzone = child.dataset.id;
                const offset = y - child.offsetTop - child.offsetHeight / 2;
                console.log("child offsettop = "+child.offsetTop);
                if (child.dataset.id !== currDrag) {
                if (offset <= 0 && offset > closest.offset) {
                  console.log('child id = '+child.dataset.id)
                  return { offset: offset, elementID: child.dataset.id }
                } else {
                  console.log('closest = '+closest)
                  return closest;
                }
              }},
              { offset: Number.NEGATIVE_INFINITY }
            ).elementID;
          }

          let y = canvasDnd.clientY;
          console.log('clientY = '+e.clientY)

          let dragZone = getDragAfter(e.clientY)

            if (dragZone == undefined) {
              dragZone = canvasDnd.spareDragzone
            }

          console.log("dragZone = "+dragZone);

          console.log("currDrop = " + canvasDnd.currDrop);

          canvasDnd.setCurrDragValue(selectToi.data, canvasDnd.currDrag);
          console.log(canvasDnd.currDragValue);
          canvasDnd.dndRemove(selectToi.data);
          canvasDnd.currDragValue.position = "static";
          canvasDnd.dndAppend(selectToi.data, dragZone);
        } /* else if (!canvasDnd.isDroppable){
        canvasDnd.appendToCanvas()
      }*/
      }
      canvasDnd.checkDroppable();
    }

    function mouseup() {

      isDragging = false;

      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      console.log("mouseup!");

      canvasFF.isDragging = false;
      console.log("isDragging =" + canvasFF.isDragging);
    }
  }
}
};

const resizeBottomRight = (e) => {
  let prevWidth = selectToi.selectedBoxData.width;
  let prevHeight = selectToi.selectedBoxData.height;

  let prevX = e.clientX;
  let prevY = e.clientY;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.width = prevWidth + (e.clientX - prevX);
    selectToi.selectedBoxData.height = prevHeight + (e.clientY - prevY);
    console.log("mousemove!");
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeBottomLeft = (e) => {
  let prevWidth = selectToi.selectedBoxData.width;
  let prevHeight = selectToi.selectedBoxData.height;
  let prevWidth2 = selectToi.selectedBoxData.X;

  let prevX = e.clientX;
  let prevY = e.clientY;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.width = prevWidth + (prevX - e.clientX);
    selectToi.selectedBoxData.height = prevHeight + (e.clientY - prevY);
    selectToi.selectedBoxData.X = prevWidth2 + (e.clientX - prevX);
    console.log("mousemove!");
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeTopLeft = (e) => {
  let prevWidth = selectToi.selectedBoxData.X;
  let prevHeight = selectToi.selectedBoxData.Y;
  let prevWidth2 = selectToi.selectedBoxData.width;
  let prevHeight2 = selectToi.selectedBoxData.height;

  let prevX = e.clientX;
  let prevY = e.clientY;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.X = prevWidth + (e.clientX - prevX);
    selectToi.selectedBoxData.Y = prevHeight + (e.clientY - prevY);
    selectToi.selectedBoxData.width = prevWidth2 + (prevX - e.clientX);
    selectToi.selectedBoxData.height = prevHeight2 + (prevY - e.clientY);
    console.log("mousemove!");
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeTopRight = (e) => {
  let prevWidth = selectToi.selectedBoxData.width;
  let prevHeight = selectToi.selectedBoxData.Y;
  let prevHeight2 = selectToi.selectedBoxData.height;

  let prevX = e.clientX;
  let prevY = e.clientY;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.width = prevWidth + (e.clientX - prevX);
    selectToi.selectedBoxData.Y = prevHeight + (e.clientY - prevY);
    selectToi.selectedBoxData.height = prevHeight2 + (prevY - e.clientY);
    console.log("mousemove!");
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeRight = (e) => {
  let prevWidth = selectToi.selectedBoxData.width;

  let prevX = e.clientX;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.width = prevWidth + (e.clientX - prevX);
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeLeft = (e) => {
  let prevWidth = selectToi.selectedBoxData.width;
  let prevWidth2 = selectToi.selectedBoxData.X;

  let prevX = e.clientX;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.width = prevWidth + (prevX - e.clientX);
    selectToi.selectedBoxData.X = prevWidth2 + (e.clientX - prevX);
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeTop = (e) => {
  let prevHeight = selectToi.selectedBoxData.height;
  let prevHeight2 = selectToi.selectedBoxData.Y;

  let prevY = e.clientY;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.height = prevHeight + (prevY - e.clientY);
    selectToi.selectedBoxData.Y = prevHeight2 + (e.clientY - prevY);
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }
};
const resizeBottom = (e) => {
  let prevHeight = selectToi.selectedBoxData.height;

  let prevY = e.clientY;

  isResizing = true;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectToi.selectedBoxData.height = prevHeight + (e.clientY - prevY);
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    console.log("mouseup!");
  }

  //make text editable
  const editable = false;

  function makeEditable() {
    this.editable = true;
  }
};
</script>

<script>

export default {
  name: "UIBrowser",
  props: {
    modelValue: String,
    nodes: Array,
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expanded: true,
      prevX: "",
    };
  },
  emits: ["update:modelValue"],
  methods: {
    changePageTitle(title) {
      this.$emit("update:modelValue", title); // previously was `this.$emit('input', title)`
    },
  },
};
</script>

<style>
.node {
  text-align: left;
}
</style>
