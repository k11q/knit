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
import { useSquareStore } from "~~/stores/dataSquare";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();

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

  console.log('prevX = '+prevX)
  console.log('prevY = '+prevY)

  let prevOffsetLeft = e.clientX - e.target.getBoundingClientRect().x
  let prevOffsetTop = e.clientY - e.target.getBoundingClientRect().y

  canvasFF.isDragging = true;
  canvasDnd.isDragging = true;
  canvasDnd.currDrag = currDrag;
  let isDragging = false;

  console.log("mousedown");

  console.log("currDrop = " + canvasDnd.currDrop);
  console.log("currDrag = " + canvasDnd.currDrag);

  //delete selected item
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

      console.log("e clientX = "+e.clientX)
      console.log("e clientY = "+e.clientY)}

      if(selectToi.selectedBoxData.parent){
        let dropzone = document.querySelector(`[data-id=${selectToi.selectedBoxData.parent}]`)
          let dropzonerect = dropzone.getBoundingClientRect()
          let dropzoneLeft = dropzonerect.x
          let dropzoneTop = dropzonerect.y

        selectToi.selectedBoxData.X = e.clientX - dropzoneLeft - prevOffsetLeft;
        selectToi.selectedBoxData.Y = e.clientY  - dropzoneTop  - prevOffsetTop;
      } else {
      selectToi.selectedBoxData.X = e.clientX - prevX;
      selectToi.selectedBoxData.Y = e.clientY - prevY;
      }
        
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

          canvasDnd.currDragValue.parent = canvasDnd.currDrop;

          canvasDnd.dndAppend(selectToi.data, dragZone);
        } /* else if (!canvasDnd.isDroppable){
        canvasDnd.appendToCanvas()
      }*/
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
