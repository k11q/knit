<template>
  <div
    class="absolute inset-0"
    @wheel="wheel"
    @mousedown.stop.prevent="addaSquare.addSquare($event, selectToi.data)"
    :class="{
      'cursor-crosshair':
        addaSquare.addSquareActivated === true ||
        addaSquare.addTextActivated === true ||
        addaSquare.addFrameActivated === true,
      'cursor-grab': addaSquare.dragPointer === true,
      'cursor-grabbing': addaSquare.draggingPointer === true,
    }"
  >
    <div
      data-id="canvas"
      class="fixed top-0 left-0 w-0 h-0 overflow-visible"
      :style="{
        transform: `translate3D(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px, 0px) rotate(${addaSquare.rotation}deg) scale(${addaSquare.scale})`,
      }"
    >
      <UIBrowser :nodes="selectToi.data" />
    </div>
    <div
      class="fixed top-0 left-0 w-0 h-0 overflow-visible"
      :style="{
        transform: `translate3D(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px, 0px) rotate(${addaSquare.rotation}deg) scale(${addaSquare.scale})`,
      }"
    >
      <div
        v-if="selectToi.selectedBox && !canvasFF.isDragging"
        class="absolute pointer-events-none"
        :style="{
          left: selectToi.selectedBoxHTMLX + 'px',
          top: selectToi.selectedBoxHTMLY + 'px',
          height: selectToi.selectedBoxData.height
            ? selectToi.selectedBoxData.height + 'px'
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.height,
          width: selectToi.selectedBoxData.width
            ? selectToi.selectedBoxData.width + 'px'
            : 'auto',
        }"
      >
        <div class="pointer-events-auto">
          <p
            class="absolute left-0 right-0 top-full mt-2 flex flex-row justify-center flex-nowrap"
          >
            <span
              class="bg-blue-600 text-white cursor-default px-1 py-0.5 rounded text-[11px] flex-nowrap flex"
            >
              {{
                selectToi.selectedBoxData.width
                  ? selectToi.selectedBoxData.width
                  : "Fill"
              }}
              x
              {{
                selectToi.selectedBoxData.height
                  ? selectToi.selectedBoxData.height
                  : "Fill"
              }}
            </span>
          </p>
          <div
            @mousedown.stop.prevent="resizeStore.resizeTop"
            class="absolute bottom-full bg-blue-600 w-full hover:cursor-row-resize"
            :style="{ height: `${(2 * 1) / addaSquare.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottom"
            class="absolute top-full bg-blue-600 w-full hover:cursor-row-resize"
            :style="{ height: `${(2 * 1) / addaSquare.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeLeft"
            class="absolute right-full bg-blue-600 h-full hover:cursor-col-resize"
            :style="{ width: `${(2 * 1) / addaSquare.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeRight"
            class="absolute left-full bg-blue-600 h-full hover:cursor-col-resize"
            :style="{ width: `${(2 * 1) / addaSquare.scale}px` }"
          />

          <div
            @mousedown.stop.prevent="resizeStore.resizeTopLeft"
            class="absolute -top-1 -left-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeTopRight"
            class="absolute -top-1 -right-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomRight"
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
        </div>
      </div>
    </div>
    <div class="absolute inset-0 overflow-visible pointer-events-none">
      <RulerBrowser :lines="canvasMarker.lines" />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../stores/counter";
import { useSquareStore } from "../../stores/dataSquare";
import { useCanvasFF } from "../../stores/canvasFreeForm";
import { useResizeStore } from "../../stores/resizeStore";
import { useCanvasMarkerStore } from "../../stores/canvasMarker";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const canvasMarker = useCanvasMarkerStore();

function wheel() {
  event.preventDefault();
  console.log("e.deltaY = " + event.deltaY);
  console.log("e.deltaX = " + event.deltaX);
  console.log("e.touches = " + event.touches);

  if (event.deltaX === 0) {
    addaSquare.scale += event.deltaY * -0.01;
  }

  // Restrict scale
  addaSquare.scale = Math.min(Math.max(0.125, scale), 4);

  console.log("e.deltaY = " + event.deltaY);
  console.log("e.deltaX = " + event.deltaX);
}

onMounted(() => {
  addaSquare.offsetLeft = vw(50);
  addaSquare.offsetTop = vh(50);

  function vh(percent) {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (percent * h) / 100;
  }

  function vw(percent) {
    var w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    return (percent * w) / 100;
  }
});
</script>
