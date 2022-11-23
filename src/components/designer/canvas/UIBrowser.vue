<template>
  <template v-for="node in nodes" :key="node.id">
    <component
      :is="node.type === 'text' || node.type === 'box' ? 'div' : node.type"
      :data-droppable="node.type === 'text' ? null : true"
      :data-id="node.id"
      :data-component="node.type"
      @mousedown="testDown($event, node.id, node.type)"
      @mouseout="selectToi.treeHover = false"
      @mouseover.stop="
        () => {
          if (selectToi.selectedBox !== node.id) {
            useSetOutlineHover(node.id);
          }
        }
      "
      @dblclick.prevent="
        node.type === 'text' ? makeEditable($event, node.id) : null
      "
      :class="{
        'pointer-events-none':
          selectToi.selectedBox === node.id &&
          canvasFF.isDragging === true &&
          node.type !== 'text',
      }"
      v-bind="node.attr"
    >
      <template
        v-if="node.type === 'text' && selectToi.selectedTextEditor !== node.id"
        v-html="node.textContent"
      >
        <span v-html="node.textContent" class="cursor-default"></span>
      </template>
      <Tiptap
        class="w-auto whitespace-pre"
        v-if="node.type === 'text' && selectToi.selectedTextEditor === node.id"
        v-model="node.textContent"
        spellcheck="false"
      />
      <DesignerCanvasUIBrowser
        v-if="(node.children && node.type === 'div') || node.type === 'box'"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </component>
  </template>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useDropMarker } from "@/stores/dropMarker";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();
const canvasMarker = useCanvasMarkerStore();
const showMarker = useShowMarker();
const dropMarker = useDropMarker();

function makeEditable(e: Event, id: String) {
  selectToi.selectedTextEditor = id;
  useSetOutlineSelector("");
}

//dnd on canvas
const testDown = (e: Event, currDrag: String, currType: String) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    let prevOffsetLeft = e.clientX - e.target.getBoundingClientRect().x;
    let prevOffsetTop = e.clientY - e.target.getBoundingClientRect().y;

    canvasFF.isDragging = true;
    canvasDnd.isDragging = true;
    canvasDnd.currDrag = currDrag;
    let isDragging = false;
    let currDragElement = document.querySelector(`[data-id=${currDrag}]`);
    let currDragElementRect = currDragElement?.getBoundingClientRect();
    let prevOpacity = currDragElement.style.opacity;
    let closest = null;
    let closestTarget = "";
    let prevX =
      e.clientX -
      currDragElementRect.x +
      (squareStore.offsetLeft / squareStore.scale) * squareStore.scale;
    let prevY =
      e.clientY -
      currDragElementRect.y +
      (squareStore.offsetTop / squareStore.scale) * squareStore.scale;

    if (
      selectToi.selectedTextEditor &&
      selectToi.selectedTextEditor !== currDrag
    ) {
      useSetOutlineSelector(selectToi.selectedTextEditor);
      selectToi.selectedTextEditor = "";
    } else if (
      !selectToi.selectedTextEditor ||
      selectToi.selectedTextEditor === currDrag
    ) {
      selectToi.changeSelected(e, currDrag, currType);
      useSetOutlineSelector(currDrag);
    }

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
        closest = useGetClosestElement(e);
        if (closest) {
          closestTarget = useGetClosestDroppableId(e);
        }

        if (!closest) {
          showMarker.value = false;
          currDragElement.style.opacity = prevOpacity;
          canvasMarker.setRuler = true;
          selectToi.treeHoverSize = 1;
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
          selectToi.treeHoverSize = 0.5;
        }

        selectToi.selectedBoxData.attr.style.left =
          Math.round((e.clientX - prevX) / squareStore.scale) + "px";
        selectToi.selectedBoxData.attr.style.top =
          Math.round((e.clientY - prevY) / squareStore.scale) + "px";

        //ruler function
        if (canvasMarker.setRuler) {
          useSetRuler(e, currDrag);
        }
      }

      function mouseup() {
        isDragging = false;
        canvasMarker.lines = [];

        Promise.resolve()
          .then(function () {
            if (
              closest &&
              selectToi.selectedBox !== closestTarget &&
              canvasDnd.dragzone &&
              !canvasDnd.dropzone
            ) {
              //append after
              function dndAppend(arr, dragZone) {
                arr.every((i) => {
                  if (i.id === closestTarget) {
                    i.children.splice(
                      i.children.findIndex(({ id }) => id == dragZone),
                      0,
                      selectToi.selectedBoxData
                    );
                    return false;
                  } else {
                    dndAppend(i.children, dragZone);
                    return true;
                  }
                });
              }
              function dndRemove(arr, currDrag) {
                arr.every((i) => {
                  if (i.id === currDrag) {
                    arr.splice(
                      arr.findIndex(({ id }) => id == currDrag),
                      1
                    );
                    return false;
                  } else {
                    dndRemove(i.children, currDrag);
                    return true;
                  }
                });
              }
              delete selectToi.selectedBoxData.attr.style.left;
              delete selectToi.selectedBoxData.attr.style.top;
              dndRemove(selectToi.data, currDrag);
              selectToi.selectedBoxData.attr.style.position = "static";
              dndAppend(selectToi.data, canvasDnd.dragzone);
              showMarker.value = false;
              currDragElement.style.opacity = prevOpacity;
              canvasMarker.setRuler = true;
              canvasDnd.dragzone = "";
            }
            if (
              (closest &&
                selectToi.selectedBox !== closestTarget &&
                !canvasDnd.dragzone &&
                canvasDnd.dropzone) ||
              !closest.children?.length
            ) {
              //append bottom/push
              function dndAppendBottom(arr, dropzone) {
                arr.every((i) => {
                  if (i.id === closestTarget) {
                    i.children.push(selectToi.selectedBoxData);
                    return false;
                  } else {
                    dndAppendBottom(i.children, dropzone);
                    return true;
                  }
                });
              }
              function dndRemove(arr, currDrag) {
                arr.every((i) => {
                  if (i.id === currDrag) {
                    arr.splice(
                      arr.findIndex(({ id }) => id == currDrag),
                      1
                    );
                    return false;
                  } else {
                    dndRemove(i.children, currDrag);
                    return true;
                  }
                });
              }
              delete selectToi.selectedBoxData.attr.style.left;
              delete selectToi.selectedBoxData.attr.style.top;
              dndRemove(selectToi.data, currDrag);
              selectToi.selectedBoxData.attr.style.position = "static";
              dndAppendBottom(selectToi.data, canvasDnd.dropzone);
              showMarker.value = false;
              currDragElement.style.opacity = prevOpacity;
              canvasMarker.setRuler = true;
            }
          })

          .then(function () {
            useSetOutlineSelector(currDrag);
          });
        selectToi.treeHoverSize = 1;
        useSetOutlineSelector(currDrag);
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        canvasFF.isDragging = false;
      }
    }
  }
};

const props = defineProps({
  nodes: Array,
  depth: {
    type: Number,
    default: 0,
  },
});

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      crossorigin: "",
    },
  ],
});
</script>
