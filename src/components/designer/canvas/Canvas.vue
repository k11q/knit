<template>
  <div
    class="absolute inset-0 overflow-hidden"
    @wheel="usePinchZoom($event)"
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
        willChange: canvasStore.isPinchZoom ? 'transform' : null,
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
        v-show="
          (selectToi.treeHover &&
            !selectToi.selectedTextEditor &&
            !resizeStore.isResizing) ||
          (useGetElementRect(selectToi.selectedBoxData.id)?.width <= 20 &&
            useGetElementRect(selectToi.selectedBoxData.id)?.height <= 20)
        "
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
      <!--Selected outline n resizer n padding resizer-->
      <DesignerCanvasResizer />
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
          height:
            useGetElementRect(selectToi.selectedBoxData.id)?.height /
              addaSquare.scale +
            'px',
          width:
            useGetElementRect(selectToi.selectedBoxData.id)?.width /
              addaSquare.scale +
            'px',
          outline: `${1.5 / addaSquare.scale}px dotted #0191FA`,
        }"
      ></div>
      <!--Ghost outline-->
      <div
        v-show="canvasStore.showGhostOutline"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width, outline',
          left:
            (canvasStore.ghostOutlineLeft - addaSquare.offsetLeft) /
              addaSquare.scale +
            'px',
          top:
            (canvasStore.ghostOutlineTop - addaSquare.offsetTop) /
              addaSquare.scale +
            'px',
          height:
            useGetElementRect(canvasStore.currDrag)?.height / addaSquare.scale +
            'px',
          width:
            useGetElementRect(canvasStore.currDrag)?.width / addaSquare.scale +
            'px',
          outline: `${1.5 / addaSquare.scale}px dotted #0191FA`,
        }"
      ></div>
      <!--solid outline when dnd with parent-->
      <div
        v-show="canvasStore.showSolidOutline"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width, outline',
          left:
            (useGetElementRect(canvasStore.currDrag)?.left -
              addaSquare.offsetLeft) /
              addaSquare.scale +
            'px',
          top:
            (useGetElementRect(canvasStore.currDrag)?.top -
              addaSquare.offsetTop) /
              addaSquare.scale +
            'px',
          height:
            useGetElementRect(canvasStore.currDrag)?.height / addaSquare.scale +
            'px',
          width:
            useGetElementRect(canvasStore.currDrag)?.width / addaSquare.scale +
            'px',
          outline: `${1.5 / addaSquare.scale}px solid #0191FA`,
        }"
      ></div>
      <!--Select show-->
      <div
        v-show="selectStore.showSelect"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width, border',
          left: selectStore.X + 'px',
          top: selectStore.Y + 'px',
          height: selectStore.height + 'px',
          width: selectStore.width + 'px',
          border: `${
            selectToi.treeHoverSize / addaSquare.scale
          }px solid #0191FA`,
          backgroundColor: 'rgba(1, 145, 250, 0.1)',
        }"
      ></div>
      <!--new square & new frame-->
      <div
        v-if="newSquareStore.show || newFrameStore.show"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width',
          left: newSquareStore.show
            ? newSquareStore.X + 'px'
            : newFrameStore.X + 'px',
          top: newSquareStore.show
            ? newSquareStore.Y + 'px'
            : newFrameStore.Y + 'px',
          height: newSquareStore.show
            ? newSquareStore.height + 'px'
            : newFrameStore.height + 'px',
          width: newSquareStore.show
            ? newSquareStore.width + 'px'
            : newFrameStore.width + 'px',
          backgroundColor: newSquareStore.show ? '#D9D9D9' : '#FFFFFF',
        }"
      >
        <div>
          <p
            class="absolute left-0 right-0 top-full flex flex-row justify-center"
            :style="{ marginTop: `${(8 * 1) / addaSquare.scale}px` }"
          >
            <span
              class="bg-[#0191FA] text-[#EFEEF1] cursor-default whitespace-nowrap"
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
                newSquareStore.show ? newSquareStore.width : newFrameStore.width
              }}
              x
              {{
                newSquareStore.show ? newSquareStore.width : newFrameStore.width
              }}
            </span>
          </p>
          <div
            class="absolute bottom-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{
              height: `${(1 * 1) / addaSquare.scale}px`,
            }"
          />
          <div
            class="absolute top-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / addaSquare.scale}px` }"
          />
          <div
            class="absolute right-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{
              width: `${(1 * 1) / addaSquare.scale}px`,
            }"
          />
          <div
            class="absolute left-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / addaSquare.scale}px` }"
          />

          <div
            class="absolute -top-1 -left-1 h-2 w-2 bg-[#EFEEF1] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            class="absolute -top-1 -right-1 h-2 w-2 bg-[#EFEEF1] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-[#EFEEF1] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-[#EFEEF1] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
        </div>
      </div>
    </div>
    <!--RulerSnap element
    <div
    v-show="rulerSnap.show" 
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasRulerSnap />
    </div>
    -->
    <!--RulerSnap siblings point element-->
    <div
      v-show="rulerSnap.show && rulerSnap.on"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasRulerPoints :points="rulerSnap.snapPoints" />
    </div>
    <!--NEW Ruler element-->
    <div
      v-show="rulerSnap.show && rulerSnap.on"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasNewRulerSnap />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useResizeStore } from "@/stores/resizeStore";
import { useDropMarker } from "@/stores/dropMarker";
import { useSelectStore } from "@/stores/selectStore";
import { useNewSquareStore } from "@/stores/newSquareStore";
import { useNewFrameStore } from "@/stores/newFrameStore";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";
import { useRulerSnapStore } from "@/stores/rulerSnap";
import { storeCanvas } from "@/stores/storeCanvas";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const showMarker = useShowMarker();
const dropMarker = useDropMarker();
const selectStore = useSelectStore();
const newSquareStore = useNewSquareStore();
const newFrameStore = useNewFrameStore();
const paddingResize = usePaddingResizeStore();
const rulerSnap = useRulerSnapStore();
const canvasStore = storeCanvas();

onMounted(() => {
  useAddKeyupShortcuts();

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
