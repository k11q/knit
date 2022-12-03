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
      class="w-0 h-0 overflow-visible absolute"
      :style="{
        willChange: canvasStore.isPinchZoom ? 'transform' : null,
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <ClientOnly>
        <KeepAlive>
          <DesignerCanvasUIBrowser :nodes="selectToi.data" />
        </KeepAlive>
      </ClientOnly>
    </div>

    <!--Other elements parent container-->
    <div
      v-show="!canvasStore.isPinchZoom"
      class="fixed top-0 left-0 w-0 h-0 overflow-visible"
      :style="{
        willChange: 'transform',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <!--Hover outline-->
      <div
        v-show="
          ((selectToi.treeHover && !selectToi.selectedTextEditor) ||
            (useGetElementRect(selectToi.selectedBoxData.id)?.width <= 20 &&
              useGetElementRect(selectToi.selectedBoxData.id)?.height <= 20)) &&
          !resizeStore.isResizing
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
      <ClientOnly>
        <DesignerCanvasResizer />
      </ClientOnly>
      <!--Drop marker-->
      <div
        v-show="canvasStore.showMarker"
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
        v-show="canvasStore.showMarker"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width, outline',
          left: selectToi.selectedBoxData.cssRules
            ? selectToi.selectedBoxData.cssRules[0].style?.left
              ? selectToi.selectedBoxData.cssRules[0].style.left.value + 'px'
              : ''
            : '',
          top: selectToi.selectedBoxData.cssRules
            ? selectToi.selectedBoxData.cssRules[0].style?.left
              ? selectToi.selectedBoxData.cssRules[0].style.top.value + 'px'
              : ''
            : '',
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
    </div>
    <!--Multiselect elements outline-->
    <div
      v-show="
        canvasStore.selection.length &&
        !canvasStore.isPinchZoom &&
        !canvasStore.isDragging
      "
      class="fixed top-0 left-0 overflow-visible pointer-events-none"
      :style="{
        willChange: 'transform',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <DesignerCanvasMultiSelectOutline :elements="canvasStore.selection" />
    </div>
    <!--Multiselect elements resizer-->
    <div
      v-show="
        canvasStore.selection.length &&
        !canvasStore.isPinchZoom &&
        !canvasStore.isDragging
      "
      class="fixed top-0 left-0 overflow-visible pointer-events-none"
      :style="{
        willChange: 'transform',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <DesignerCanvasMultiSelectResizer />
    </div>
    <!--RulerSnap siblings point element-->
    <div
      v-show="rulerSnap.show && rulerSnap.on && !canvasStore.isPinchZoom"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasRulerPoints :points="rulerSnap.snapPoints" />
    </div>
    <!--frames label-->
    <div
      v-if="selectToi.data && !canvasStore.isPinchZoom"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <ClientOnly>
        <DesignerCanvasFrameLabel
          :frames="selectToi.data?.filter((i) => i.type === 'div')"
        />
      </ClientOnly>
    </div>
    <!--NEW Ruler element-->
    <div
      v-show="rulerSnap.show && rulerSnap.on && !canvasStore.isPinchZoom"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasNewRulerSnap />
    </div>
    <!--Tiptap text editor-->
    <div
      class="fixed top-0 left-0 overflow-visible pointer-events-none"
      :style="{
        willChange: 'transform',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <div
        :style="{
          willChange: 'left, top',
          left:
            (useGetElementRect(selectToi.selectedBoxData.id)?.left -
              addaSquare.offsetLeft) /
              addaSquare.scale +
            'px',
          top:
            (useGetElementRect(selectToi.selectedBoxData.id)?.top -
              addaSquare.offsetTop) /
              addaSquare.scale +
            'px',

          fontSize: selectToi.selectedBoxData?.attr?.style?.fontSize,
          color: selectToi.selectedBoxData?.attr?.style?.color,
        }"
        class="absolute pointer-events-none"
      >
        <div
          @mousedown.stop="$event.stopPropagation()"
          class="pointer-events-auto"
        >
          <Tiptap
            v-if="selectToi.selectedTextEditor"
            v-model="selectToi.selectedBoxData.textContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useResizeStore } from "@/stores/resizeStore";
import { useDropMarker } from "@/stores/dropMarker";
import { useSelectStore } from "@/stores/selectStore";
import { useRulerSnapStore } from "@/stores/rulerSnap";
import { useCanvasStore } from "~~/src/stores/canvas";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const resizeStore = useResizeStore();
const dropMarker = useDropMarker();
const selectStore = useSelectStore();
const rulerSnap = useRulerSnapStore();
const canvasStore = useCanvasStore();

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
