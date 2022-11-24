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
        v-show="selectToi.treeHover && !selectToi.selectedTextEditor"
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
      <!--Selected outline n resizer-->
      <div
        v-show="
          selectToi.selectedBox &&
          !canvasFF.isDragging &&
          !selectToi.selectedTextEditor
        "
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
            v-show="paddingResize.showPaddingResizer"
            @mouseover="paddingResize.setShowPaddingResizer"
            @mouseout="paddingResize.showPaddingResizer = false"
            class="absolute top-0 w-full flex flex-row items-center justify-center hover:bg-pink-500/50"
            :style="{
              height: `${parseInt(selectToi.resizeObserverRect.top)}px`,
            }"
          >
            <div
              @mousedown.stop.prevent="paddingResize.resizePaddingTop($event)"
              class="bg-red-500 hover:cursor-row-resize"
              :style="{
                height: `${2 / addaSquare.scale}px`,
                width: `${16 / addaSquare.scale}px`,
                outline: `${1 / addaSquare.scale}px solid white`,
                borderRadius: `${0.5 / addaSquare.scale}px`,
              }"
            ></div>
          </div>
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottom"
            class="absolute top-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / addaSquare.scale}px` }"
          />
          <div
            v-show="paddingResize.showPaddingResizer"
            @mouseover="paddingResize.setShowPaddingResizer"
            @mouseout="paddingResize.showPaddingResizer = false"
            class="absolute bottom-0 w-full flex flex-row items-center justify-center hover:bg-pink-500/50"
            :style="{
              height: `${
                useGetElement(selectToi.selectedBoxData.id)?.style
                  ?.paddingBottom
              }`,
            }"
          >
            <div
              @mousedown.stop.prevent="
                paddingResize.resizePaddingBottom($event)
              "
              class="bg-red-500 hover:cursor-row-resize"
              :style="{
                height: `${2 / addaSquare.scale}px`,
                width: `${16 / addaSquare.scale}px`,
                outline: `${1 / addaSquare.scale}px solid white`,
                borderRadius: `${0.5 / addaSquare.scale}px`,
              }"
            ></div>
          </div>
          <div
            @mousedown.stop.prevent="resizeStore.resizeLeft"
            class="absolute right-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{
              width: `${(1 * 1) / addaSquare.scale}px`,
            }"
          />
          <div
            v-show="paddingResize.showPaddingResizer"
            @mouseover="paddingResize.setShowPaddingResizer"
            @mouseout="paddingResize.showPaddingResizer = false"
            class="absolute left-0 h-full flex flex-row items-center justify-center hover:bg-pink-500/50 flex-none"
            :style="{
              width: `${parseInt(selectToi.resizeObserverRect.left)}px`,
            }"
          >
            <div
              @mousedown.stop.prevent="paddingResize.resizePaddingLeft($event)"
              class="bg-red-500 hover:cursor-col-resize"
              :style="{
                width: `${2 / addaSquare.scale}px`,
                height: `${16 / addaSquare.scale}px`,
                outline: `${1 / addaSquare.scale}px solid white`,
                borderRadius: `${0.5 / addaSquare.scale}px`,
              }"
            ></div>
          </div>
          <div
            @mousedown.stop.prevent="resizeStore.resizeRight"
            class="absolute left-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / addaSquare.scale}px` }"
          />
          <div
            v-show="paddingResize.showPaddingResizer"
            @mouseover="paddingResize.setShowPaddingResizer"
            @mouseout="paddingResize.showPaddingResizer = false"
            class="absolute right-0 h-full flex flex-row items-center justify-center hover:bg-pink-500/50"
            :style="{
              width: `${
                useGetElement(selectToi.selectedBoxData.id)?.style?.paddingRight
              }`,
            }"
          >
            <div
              @mousedown.stop.prevent="paddingResize.resizePaddingRight($event)"
              class="bg-red-500 hover:cursor-col-resize"
              :style="{
                width: `${2 / addaSquare.scale}px`,
                height: `${16 / addaSquare.scale}px`,
                outline: `${1 / addaSquare.scale}px solid white`,
                borderRadius: `${0.5 / addaSquare.scale}px`,
              }"
            ></div>
          </div>

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
      <!--Select show-->
      <div
        v-show="selectStore.showSelect"
        class="absolute pointer-events-none"
        :style="{
          willChange: 'left, top, height, width',
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
              {{ newSquareStore.width }}
              x
              {{ newSquareStore.height }}
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
            class="absolute -top-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            class="absolute -top-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
          <div
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / addaSquare.scale})` }"
          />
        </div>
      </div>
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

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useResizeStore } from "@/stores/resizeStore";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useDropMarker } from "@/stores/dropMarker";
import { useSelectStore } from "@/stores/selectStore";
import { useNewSquareStore } from "@/stores/newSquareStore";
import { useNewFrameStore } from "@/stores/newFrameStore";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const canvasMarker = useCanvasMarkerStore();
const showMarker = useShowMarker();
const dropMarker = useDropMarker();
const selectStore = useSelectStore();
const newSquareStore = useNewSquareStore();
const newFrameStore = useNewFrameStore();
const paddingResize = usePaddingResizeStore();

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
