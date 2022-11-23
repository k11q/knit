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
    <!--canvas and UI elements-->
    <div
      data-id="canvas"
      class="w-0 h-0 overflow-visible"
      :style="{
        willChange: 'transform',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <KeepAlive>
        <DesignerCanvasUIBrowser :nodes="selectToi.data" />
      </KeepAlive>
    </div>

    <!--Other elements parent container-->
    <div
      class="fixed top-0 left-0 w-0 h-0 overflow-visible"
      :style="{
        willChange: 'transform',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <!--Hover outline-->
      <div
        v-show="selectToi.treeHover"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width',
          left: selectToi.treeHoverHTMLX + 'px',
          top: selectToi.treeHoverHTMLY + 'px',
          height: selectToi.treeHoverHTMLHeight + 'px',
          width: selectToi.treeHoverHTMLWidth + 'px',
          border: `${
            selectToi.treeHoverSize / addaSquare.scale
          }px solid #0191FA`,
          outline: `${
            selectToi.treeHoverSize / addaSquare.scale
          }px solid #0191FA`,
        }"
      ></div>
      <!--text editor component-->
      <div
        v-if="selectToi.showTextEditor"
        class="absolute pointer-events-none"
        contenteditable="true"
        :style="{
          willChange: 'left, top, height, width',
          left: selectToi.selectedBoxHTMLX + 'px',
          top: selectToi.selectedBoxHTMLY + 'px',
          height: selectToi.selectedBoxHTMLHeight + 'px',
          width: selectToi.selectedBoxHTMLWidth + 'px',
          backgroundColor: 'red',
        }"
      ></div>
      <Tiptap class="absolute" />
      <!--Selected outline n resizer-->
      <div
        v-show="selectToi.selectedBox && !canvasFF.isDragging"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width',
          left: selectToi.selectedBoxHTMLX + 'px',
          top: selectToi.selectedBoxHTMLY + 'px',
          height: selectToi.selectedBoxHTMLHeight + 'px',
          width: selectToi.selectedBoxHTMLWidth + 'px',
        }"
      >
        <div class="pointer-events-auto">
          <p
            class="absolute left-0 right-0 top-full flex flex-row justify-center"
            :style="{ marginTop: `${(8 * 1) / addaSquare.scale}px` }"
          >
            <span
              class="bg-[#0191FA] text-[#EDEDED] cursor-default whitespace-nowrap"
              :style="{
                fontSize: `${(11 * 1) / addaSquare.scale}px`,
                lineHeight: 1.5,
                borderRadius: `${(4 * 1) / addaSquare.scale}px`,
                paddingTop: `${2 * (1 / addaSquare.scale)}px`,
                paddingBottom: `${2 * (1 / addaSquare.scale)}px`,
                paddingRight: `${(4 * 1) / addaSquare.scale}px`,
                paddingLeft: `${(4 * 1) / addaSquare.scale}px`,
              }"
            >
              {{
                selectToi.selectedBoxWidth
                  ? Math.round(selectToi.selectedBoxWidth)
                  : "Fill"
              }}
              x
              {{
                selectToi.selectedBoxHeight
                  ? Math.round(selectToi.selectedBoxHeight)
                  : "Fill"
              }}
            </span>
          </p>
          <div
            @mousedown.stop.prevent="resizeStore.resizeTop"
            class="absolute bottom-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{
              height: `${(1 * 1) / addaSquare.scale}px`,
            }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottom"
            class="absolute top-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / addaSquare.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeLeft"
            class="absolute right-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{
              width: `${(1 * 1) / addaSquare.scale}px`,
            }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeRight"
            class="absolute left-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / addaSquare.scale}px` }"
          />

          <div
            @mousedown.stop.prevent="resizeStore.resizeTopLeft"
            class="absolute -top-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeTopRight"
            class="absolute -top-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomRight"
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
        </div>
      </div>
      <!--Drop marker-->
      <div
        v-show="showMarker"
        class="absolute pointer-events-none"
        :style="{
          left: dropMarker.markerLeft,
          top: dropMarker.markerTop,
          height: dropMarker.markerHeight,
          width: dropMarker.markerWidth,
          backgroundColor: '#0191FA',
        }"
      ></div>
      <!--Selected outline when droppable-->
      <div
        v-show="showMarker"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width, outline',
          left: selectToi.selectedBoxData.attr?.style.left,
          top: selectToi.selectedBoxData.attr?.style.top,
          height: selectToi.selectedBoxData.attr?.style.height,
          width: selectToi.selectedBoxData.attr?.style.width,
          outline: `${1.5 / addaSquare.scale}px dotted #0191FA`,
        }"
      ></div>
    </div>
    <!--Ruler element-->
    <div
      v-show="canvasMarker.setRuler"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <RulerBrowser :lines="canvasMarker.lines" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useResizeStore } from "@/stores/resizeStore";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useDropMarker } from "@/stores/dropMarker";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const canvasMarker = useCanvasMarkerStore();
const showMarker = useShowMarker();
const dropMarker = useDropMarker();

function wheel(event) {
  event.preventDefault();
  const canvas = document.querySelector('[data-id="canvas"]');
  const canvasRect = canvas.getBoundingClientRect();

  if (
    event.deltaX === 0 &&
    event.ctrlKey &&
    addaSquare.scale >= 0.02 &&
    addaSquare.scale <= 25.6
  ) {
    let xs = (event.clientX - addaSquare.offsetLeft) / addaSquare.scale;
    let ys = (event.clientY - addaSquare.offsetTop) / addaSquare.scale;
    addaSquare.scale += event.deltaY * -0.009 * addaSquare.scale;
    addaSquare.scale = Math.max(0.02, Math.min(25.6, addaSquare.scale));
    addaSquare.offsetLeft = event.clientX - xs * addaSquare.scale;
    addaSquare.offsetTop = event.clientY - ys * addaSquare.scale;
  } else {
    addaSquare.offsetLeft += -event.deltaX;
    addaSquare.offsetTop += -event.deltaY;
    console.log("offsetleft = " + addaSquare.offsetLeft);
    console.log("offsettop = " + addaSquare.offsetTop);
  }
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
