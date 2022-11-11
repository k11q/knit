<template>
  <template v-for="node in nodes" :key="node.id">
    <div
      v-if="typeFrame(node.type)"
      :style="{
        backgroundColor: node.bgColor,
        height: node.height ? node.height + node.unit : 'auto',
        width: node.width ? node.width + node.unit : 'auto',
        left:
          node.position === 'absolute'
            ? node.X + node.Xunit
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.x,
        top:
          node.position === 'absolute'
            ? node.Y + node.Yunit
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.y,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent: selectToi.getJustify(node.justify),
        alignItems: selectToi.getAlign(node.align),
        position: node.position,
        color: node.color,
        paddingLeft: node.paddingX + 'px',
        paddingTop: node.paddingY + 'px',
        paddingRight: node.paddingX + 'px',
        paddingBottom: node.paddingY + 'px',
        marginLeft: node.marginLeft + 'px',
        marginTop: node.marginTop + 'px',
        marginRight: node.marginRight + 'px',
        marginBottom: node.margingBottom + 'px',
        borderRadius: node.corner + 'px',
        border: node.strokeSize + 'px ' + 'solid ' + node.strokeColor,
        gap: node.gap + 'px',
        flexGrow: node.flexGrow,
        alignSelf: node.alignSelf,
        boxShadow: `${node.boxShadowOffsetY}px ${node.boxShadowOffsetX}px ${node.boxShadowBlurRadius}px ${node.boxShadowSpreadRadius}px ${node.boxShadowColor}`,
      }"
      :data-id="node.id"
      data-component="Frame"
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
        height: node.height ? node.height + node.unit : 'auto',
        width: node.width ? node.width + node.unit : 'auto',
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        position: node.position,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent: selectToi.getJustify(node.justify),
        color: node.color,
        paddingLeft: node.paddingX + 'px',
        paddingTop: node.paddingY + 'px',
        paddingRight: node.paddingX + 'px',
        paddingBottom: node.paddingY + 'px',
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
      data-component="Box"
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
      <UIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <p
      v-if="typeText(node.type)"
      class="text-center focus:outline-none hover:decoration-blue-600 hover:underline hover:decoration-2"
      @pointerdown.stop="testDown($event, node.id)"
      @mousedown="selectToi.changeSelected($event, node.id)"
      contenteditable="true"
      style="position: absolute"
      :style="{
        height: 100 + 'px',
        width: 100 + 'px',
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        fontSize: node.fontSize + node.fontUnit,
        color: node.color,
      }"
      :data-id="node.id"
      data-component="Text"
      :class="{
        'decoration-blue-600 underline decoration-1 ':
          selectToi.selectedBox === node.id,
      }"
    >
      {{ node.textContent }}
    </p>
  </template>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useCanvasDndStore } from "../stores/canvasDnd";
import { useCanvasFF } from "../stores/canvasFreeForm";
import { useSquareStore } from "../stores/dataSquare";
import { useCanvasMarkerStore } from "../stores/canvasMarker";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();
const canvasMarker = useCanvasMarkerStore();
let editable = ref(false);

const makeEditable = () => {
  editable.value = true;
};

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

//dnd on canvas
const testDown = (e, currDrag) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    let prevX = e.layerX;
    let prevY = e.layerY;
    console.log("prevX = " + prevX);

    let prevOffsetLeft = e.clientX - e.target.getBoundingClientRect().x;
    let prevOffsetTop = e.clientY - e.target.getBoundingClientRect().y;

    canvasFF.isDragging = true;
    canvasDnd.isDragging = true;
    canvasDnd.currDrag = currDrag;
    let isDragging = false;

    //delete selected item
    document.addEventListener("keyup", (event) => {
      if (
        event.key == "Backspace" ||
        (event.key == "Delete" && selectToi.selectedBox)
      ) {
        canvasDnd.dndRemove(selectToi.data);
        selectToi.clearSelected();
      }
    });

    if (!selectToi.selectedBox) {
      document.removeEventListener("keyup", (event) => {
        if (
          event.key == "Backspace" ||
          (event.key == "Delete" && selectToi.selectedBox)
        ) {
          canvasDnd.dndRemove(selectToi.data);
          selectToi.clearSelected();
        }
      });
    }

    if (canvasFF.isDragging == true) {
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        isDragging = true;

        selectToi.selectedBoxHTMLX = Math.round(e.clientX - prevX);
        selectToi.selectedBoxHTMLY = Math.round(e.clientY - prevY);

        if (selectToi.selectedBoxData.parent) {
          let dropzone = document.querySelector(
            `[data-id=${selectToi.selectedBoxData.parent}]`
          );
          let dropzonerect = dropzone.getBoundingClientRect();
          let dropzoneLeft = dropzonerect.x;
          let dropzoneTop = dropzonerect.y;

          selectToi.selectedBoxData.X = Math.round(
            e.clientX - dropzoneLeft - prevOffsetLeft
          );
          selectToi.selectedBoxData.Y = Math.round(
            e.clientY - dropzoneTop - prevOffsetTop
          );
        } else {
          selectToi.selectedBoxData.X = Math.round(e.clientX - prevX);
          selectToi.selectedBoxData.Y = Math.round(e.clientY - prevY);
        }

        //ruler function
        let targetChildren = selectToi.data;
        let targetChildrenData = [];

        targetChildren.forEach((i) => {
          if (i.id !== selectToi.selectedBox) {
            let lineLeft = i.X;
            let lineTop = i.Y;
            let lineRight = i.X + i.width;
            let lineBottom = i.Y + i.height;
            let newlineBottom;
            let newlineTop;
            let newlineLeft;
            let newlineRight;

            let distanceTopToLineTop = selectToi.selectedBoxData.Y - lineTop;
            let distanceTopToLineBottom =
              selectToi.selectedBoxData.Y - lineBottom;
            let distanceBottomToLineTop =
              selectToi.selectedBoxData.Y +
              selectToi.selectedBoxData.height -
              lineTop;
            let distanceBottomToLineBottom =
              selectToi.selectedBoxData.Y +
              selectToi.selectedBoxData.height -
              lineBottom;
            let distanceLeftToLineLeft = selectToi.selectedBoxData.X - lineLeft;
            let distanceLeftToLineRight =
              selectToi.selectedBoxData.X - lineRight;
            let distanceRightToLineLeft =
              selectToi.selectedBoxData.X +
              selectToi.selectedBoxData.width -
              lineLeft;
            let distanceRightToLineRight =
              selectToi.selectedBoxData.X +
              selectToi.selectedBoxData.width -
              lineRight;

            (distanceTopToLineTop < 5 && distanceTopToLineTop > -5) ||
            (distanceBottomToLineTop < 5 && distanceBottomToLineTop > -5)
              ? (newlineTop = i.Y)
              : (lineTop = undefined);
            (distanceTopToLineBottom < 5 && distanceTopToLineBottom > -5) ||
            (distanceBottomToLineBottom < 5 && distanceBottomToLineBottom > -5)
              ? (newlineBottom = i.Y + i.height)
              : (newlineBottom = undefined);
            (distanceLeftToLineLeft < 5 && distanceLeftToLineLeft > -5) ||
            (distanceRightToLineLeft < 5 && distanceRightToLineLeft > -5)
              ? (newlineLeft = i.X)
              : (newlineLeft = undefined);
            (distanceLeftToLineRight < 5 && distanceLeftToLineRight > -5) ||
            (distanceRightToLineRight < 5 && distanceRightToLineRight > -5)
              ? (newlineRight = i.X + i.width)
              : (newlineRight = undefined);

            targetChildrenData.push({
              lineTop: newlineTop,
              lineLeft: newlineLeft,
              lineRight: newlineRight,
              lineBottom: newlineBottom,
            });
          }
        });
        canvasMarker.lines = targetChildrenData;

        //sort childrens by dragging
        /* on hold
        if (canvasDnd.isDroppable && canvasDnd.currDrop) {
          canvasDnd.currDropHTML = e.target;

          let dropzoneChildren = [...canvasDnd.currDropHTML.children];

          console.log("dropzoneChildren = " + dropzoneChildren);

          function getDragAfter(y) {
            return dropzoneChildren.reduce(
              (closest, child) => {
                const box = child.getBoundingClientRect();
                console.log("box = " + box);
                console.log("child id = " + child.dataset.id);
                canvasDnd.spareDragzone = child.dataset.id;
                const offset = y - child.offsetTop - child.offsetHeight / 2;
                console.log("child offsettop = " + child.offsetTop);
                if (child.dataset.id !== currDrag) {
                  if (offset <= 0 && offset > closest.offset) {
                    console.log("child id = " + child.dataset.id);
                    return { offset: offset, elementID: child.dataset.id };
                  } else {
                    console.log("closest = " + closest);
                    return closest;
                  }
                }
              },
              { offset: Number.NEGATIVE_INFINITY }
            ).elementID;
          }

          let y = canvasDnd.clientY;

          let dragZone = getDragAfter(e.clientY);

          if (dragZone == undefined) {
            dragZone = canvasDnd.spareDragzone;
          }

          canvasDnd.setCurrDragValue(selectToi.data, canvasDnd.currDrag);
          canvasDnd.dndRemove(selectToi.data);

          canvasDnd.currDragValue.parent = canvasDnd.currDrop;

          canvasDnd.dndAppend(selectToi.data, dragZone);
        } else if (!canvasDnd.isDroppable && canvasDnd.currDrop) {
          canvasDnd.currDragValue.parent = "";
          canvasDnd.appendToCanvas();
        }
        */
        canvasDnd.checkDroppable();
      }

      function mouseup() {
        isDragging = false;
        canvasMarker.lines = [];

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        canvasFF.isDragging = false;
      }
    }
  }
};

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 0,
  },
});
const expanded = ref(true);
const prevX = ref("");
const emit = defineEmits("update:modelValue");
function changePageTitle(title) {
  emit("update:modelValue", title); // previously was `this.$emit('input', title)`
}
</script>

<style>
.node {
  text-align: left;
}
</style>
