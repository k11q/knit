<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs bg-neutral-200"
  >
    <TopBar />

    <!--Main section-->
    <div class="flex flex-row justify-between">
      <LeftSidePanel />
      <!--Canvas section-->
      <div
        id="container"
        class="absolute inset-0 overflow-hidden min-h-screen min-w-full"
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
          id="target"
          data-id="canvas"
          class="flex flex-grow justify-center absolute inset-0 overflow-visible"
          :style="{
            transform: `translate3D(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px, 0px) rotate(${addaSquare.rotation}deg) scale(${addaSquare.scale})`,
          }"
        >
          <UIBrowser :nodes="selectToi.data" />
        </div>
        <div
          v-if="selectToi.selectedBox && !canvasFF.isDragging"
          class="absolute pointer-events-none"
          :style="{
            transform: `translate3D(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px, 0px) rotate(${addaSquare.rotation}deg) scale(${addaSquare.scale})`,
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
              class="absolute bottom-full h-0.5 bg-blue-600 w-full hover:cursor-row-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeBottom"
              class="absolute top-full h-0.5 bg-blue-600 w-full hover:cursor-row-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeLeft"
              class="absolute right-full w-0.5 bg-blue-600 h-full hover:cursor-col-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeRight"
              class="absolute left-full w-0.5 bg-blue-600 h-full hover:cursor-col-resize"
            />

            <div
              @mousedown.stop.prevent="resizeStore.resizeTopLeft"
              class="absolute -top-1 -left-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nwse-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeTopRight"
              class="absolute -top-1 -right-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nesw-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeBottomRight"
              class="absolute -bottom-1 -right-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nwse-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
              class="absolute -bottom-1 -left-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nesw-resize"
            />
          </div>
        </div>
        <div class="absolute inset-0 overflow-visible pointer-events-none">
          <RulerBrowser :lines="canvasMarker.lines" />
        </div>
      </div>
      <RightSidePanel />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { useCanvasDndStore } from "../stores/canvasDnd";
import { useCanvasFF } from "../stores/canvasFreeForm";
import { useResizeStore } from "../stores/resizeStore";
import { useRightPanelStore } from "../stores/rightPanelStore";
import { useLeftPanelStore } from "../stores/leftPanelStore";
import { useCanvasMarkerStore } from "../stores/canvasMarker";
/*
zoom watching
import { 
				okzoomer, 
				gestureToMatrix, 
				getOrigin, 
				applyMatrix
			} from '../stores/okZoomer';
      */

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasDnd = useCanvasDndStore();
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

/* zoom watching
onMounted(() => {
  if (!window.DOMMatrix) {
    if (window.WebKitCSSMatrix) {
      window.DOMMatrix = window.WebKitCSSMatrix;
    } else {
      throw new Error("Couldn't find a DOM Matrix implementation");
    }
  }

  let origin;
  let initial_ctm = new DOMMatrix();
  let el = document.querySelector("#target");
  el.style.transformOrigin = "0 0";

  okzoomer(document.querySelector("#container"), {
    startGesture(gesture) {
      /*
						Clear the element's transform so we can 
						measure its original position wrt. the screen.
						(We don't need to restore it because it gets 
						overwritten by `applyMatrix()` anyways.)
					 
      el.style.transform = "";
      origin = getOrigin(el, gesture);
      applyMatrix(el, gestureToMatrix(gesture, origin).multiply(initial_ctm));
    },
    doGesture(gesture) {
      applyMatrix(el, gestureToMatrix(gesture, origin).multiply(initial_ctm));
    },
    endGesture(gesture) {
      initial_ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
      applyMatrix(el, initial_ctm);
    },
  });
});
*/
</script>

<style scoped>
.item {
  height: 50px;
  width: 50px;
  position: absolute;
  background: orange;
}
</style>
