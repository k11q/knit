<template>
  <template v-for="node in nodes" :key="node.id">
    <div
      v-if="node.type === 'frame'"
      data-droppable="true"
      :data-id="node.id"
      data-component="Frame"
      @mousedown="testDown($event, node.id, node.type)"
      @mouseout="mouseoutEvent($event, node.id)"
      :class="{
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
      v-bind="node.attr"
    >
      <DesignerCanvasUIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <div
      v-if="node.type === 'box'"
      :data-id="node.id"
      data-component="Box"
      data-droppable="false"
      @mousedown="testDown($event, node.id, node.type)"
      @mouseout="mouseoutEvent($event, node.id)"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      :class="{
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
      v-bind="node.attr"
    >
      <DesignerCanvasUIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <p
      v-if="node.type === 'text'"
      class="text-center hover:decoration-[#0191FA] hover:underline hover:decoration-2 focus:outline-none cursor-default"
      @mousedown="testDown($event, node.id, node.type)"
      @mouseout="mouseoutEvent($event, node.id)"
      @dblclick.prevent="makeEditable($event, node.id)"
      :data-id="node.id"
      data-component="Text"
      data-droppable="false"
      :contenteditable="node.id === target && selectToi.selectedBox === node.id"
      :class="{
        'decoration-[#0191FA] underline decoration-1 ':
          selectToi.selectedBox === node.id,
      }"
      @input="selectToi.selectedBoxData.textContent = $event.target.innerText"
      v-text="node.textContent"
      v-bind="node.attr"
    ></p>
  </template>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useDropMarker } from "@/stores/dropMarker";
import { onClickOutside } from "@vueuse/core";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();
const canvasMarker = useCanvasMarkerStore();
const target = ref("");
const showMarker = useShowMarker();
const dropMarker = useDropMarker();

function makeEditable(e: Event, id: String) {
  target.value = id;
  setTimeout(() => {
    (e.target.value as HTMLParagraphElement).select();
  }, 100);
}

//dnd on canvas
const testDown = (e: Event, currDrag: String, currType: String) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    let prevX = e.clientX - e.target.offsetLeft * squareStore.scale;
    let prevY = e.clientY - e.target.offsetTop * squareStore.scale;

    let prevOffsetLeft = e.clientX - e.target.getBoundingClientRect().x;
    let prevOffsetTop = e.clientY - e.target.getBoundingClientRect().y;

    canvasFF.isDragging = true;
    canvasDnd.isDragging = true;
    canvasDnd.currDrag = currDrag;
    let isDragging = false;
    let currDragElement = document.querySelector(`[data-id=${currDrag}]`);
    let prevOpacity = currDragElement.style.opacity;

    selectToi.changeSelected(e, currDrag, currType);

    //delete selected item

    document.removeEventListener("keyup", keyup);
    document.addEventListener("keyup", keyup);

    function keyup() {
      if (
        event.key == "Backspace" ||
        (event.key == "Delete" && selectToi.selectedBox)
      ) {
        canvasDnd.dndRemove(selectToi.data);
        selectToi.clearSelected();
      }
    }
    /*
    useSelectedKeyboardShortcuts(e, currDrag);
    */

    if (canvasFF.isDragging == true) {
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        isDragging = true;

        let targetId = useGetElementIdFromPoint(e);
        let target = useGetElementFromPoint(e);
        let closest = useGetClosestElement(e);
        let closestTarget;
        if (closest) {
          closestTarget = useGetClosestDroppableId(e);
        }

        if (!closest) {
          showMarker.value = false;
          currDragElement.style.opacity = prevOpacity;
          canvasMarker.setRuler = true;
        } else if (target && closest) {
          if (
            selectToi.selectedBox === closestTarget ||
            currDragElement.parentElement === closest
          ) {
            selectToi.treeHover = false;
            currDragElement.style.opacity = prevOpacity;
            canvasMarker.setRuler = true;
          } else {
            canvasMarker.setRuler = false;
            showMarker.value = true;
            dropMarker.setMarker(e, currDragElement);
            currDragElement.style.opacity = 0;
            selectToi.treeHover = true;
            let selectedTarget = closest.getBoundingClientRect();

            selectToi.treeHoverHTMLX = Math.round(
              (selectedTarget.x - squareStore.offsetLeft) / squareStore.scale
            );
            selectToi.treeHoverHTMLY = Math.round(
              (selectedTarget.y - squareStore.offsetTop) / squareStore.scale
            );

            selectToi.treeHoverHTMLWidth = Math.round(
              selectedTarget.width / squareStore.scale
            );
            selectToi.treeHoverHTMLHeight = Math.round(
              selectedTarget.height / squareStore.scale
            );
          }
        }

        if (selectToi.selectedBoxData.parent) {
          let dropzone = document.querySelector(
            `[data-id=${selectToi.selectedBoxData.parent}]`
          );
          let dropzonerect = dropzone.getBoundingClientRect();
          let dropzoneLeft = dropzonerect.x;
          let dropzoneTop = dropzonerect.y;

          selectToi.selectedBoxData.attr.style.left =
            (Math.round(e.clientX - dropzoneLeft - prevOffsetLeft) * 1) /
            squareStore.scale;
          selectToi.selectedBoxData.attr.style.top =
            (Math.round(e.clientY - dropzoneTop - prevOffsetTop) * 1) /
            squareStore.scale;
        } else {
          selectToi.selectedBoxData.attr.style.left =
            Math.round((e.clientX - prevX) / squareStore.scale) + "px";
          selectToi.selectedBoxData.attr.style.top =
            Math.round((e.clientY - prevY) / squareStore.scale) + "px";
        }

        //ruler function
        if (canvasMarker.setRuler) {
          useSetRuler(e, currDrag);
        }

        //sort childrens by dragging
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
        } /* else if (!canvasDnd.isDroppable && canvasDnd.currDrop) {
          canvasDnd.currDragValue.parent = "";
          canvasDnd.appendToCanvas();
        }
        */
        canvasDnd.checkDroppable();
      }

      function mouseup() {
        isDragging = false;
        canvasMarker.lines = [];

        selectToi.selectedBoxHTMLX =
          (e.target.getBoundingClientRect().x - squareStore.offsetLeft) /
          squareStore.scale;
        selectToi.selectedBoxHTMLY =
          (e.target.getBoundingClientRect().y - squareStore.offsetTop) /
          squareStore.scale;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        canvasFF.isDragging = false;
      }
    }
  }
};
function mouseoutEvent(e, id) {
  selectToi.treeHover = false;
}

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 0,
  },
});

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
