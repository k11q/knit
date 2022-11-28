<template>
  <div
    v-show="
      selectToi.selectedBox &&
      !canvasFF.isDragging &&
      !selectToi.selectedTextEditor
    "
    class="absolute pointer-events-none border-box"
    :style="{
      willChange: 'left, top, height, width',
      left:
        Math.round(
          useGetElementRect(selectToi.selectedBoxData.id)?.x -
            addaSquare.offsetLeft
        ) /
          addaSquare.scale +
        'px',
      top:
        Math.round(
          useGetElementRect(selectToi.selectedBoxData.id)?.y -
            addaSquare.offsetTop
        ) /
          addaSquare.scale +
        'px',
      height:
        Math.round(useGetElementRect(selectToi.selectedBoxData.id)?.height) /
          addaSquare.scale +
        'px',
      width:
        Math.round(useGetElementRect(selectToi.selectedBoxData.id)?.width) /
          addaSquare.scale +
        'px',
    }"
  >
    <!--radius resizer controller-->
    <div
      class="pointer-events-auto"
      v-show="
        useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
        useGetElementRect(selectToi.selectedBoxData.id)?.height > 100
      "
    >
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        class="absolute top-0 left-0 bg-[#EDEDED] rounded-full border-[#0191FA]"
        :style="{
          marginTop: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          marginLeft: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          height: `${10 / addaSquare.scale}px`,
          width: `${10 / addaSquare.scale}px`,
          borderWidth: `${1 / addaSquare.scale}px`,
        }"
      />
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        class="absolute top-0 right-0 bg-[#EDEDED] rounded-full border-[#0191FA]"
        :style="{
          marginTop: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          marginRight: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          height: `${10 / addaSquare.scale}px`,
          width: `${10 / addaSquare.scale}px`,
          borderWidth: `${1 / addaSquare.scale}px`,
        }"
      />
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        class="absolute bottom-0 left-0 bg-[#EDEDED] rounded-full border-[#0191FA]"
        :style="{
          marginBottom: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          marginLeft: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          height: `${10 / addaSquare.scale}px`,
          width: `${10 / addaSquare.scale}px`,
          borderWidth: `${1 / addaSquare.scale}px`,
        }"
      />
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        class="absolute bottom-0 right-0 bg-[#EDEDED] rounded-full border-[#0191FA]"
        :style="{
          marginBottom: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          marginRight: `${
            (8 +
              parseInt(
                selectToi.selectedBoxData?.attr?.style.borderRadius | 0
              ) *
                addaSquare.scale *
                0.5) /
            addaSquare.scale
          }px`,
          height: `${10 / addaSquare.scale}px`,
          width: `${10 / addaSquare.scale}px`,
          borderWidth: `${1 / addaSquare.scale}px`,
        }"
      />
    </div>
    <!--padding resizer-->
    <div
      class="pointer-events-auto"
      v-show="
        (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
          useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
        useGetElement(selectToi.selectedBoxData.id)?.children?.length
      "
    >
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        @mouseover.prevent="paddingResize.setShowPaddingResizer"
        @mouseout="
          paddingResize.currentResizing
            ? null
            : (paddingResize.showPaddingResizer = false)
        "
        class="absolute top-0 w-full flex flex-row items-center justify-center pointer-events-none"
        :class="{
          'border-red-500': paddingResize.currentResizing === 'top',
          'hover:bg-pink-500/50': !paddingResize.currentResizing,
        }"
        :style="{
          height:
            paddingResize.topResizerHeight ||
            paddingResize.topResizerHeight === 0
              ? `${paddingResize.topResizerHeight}px`
              : `${(8 * 1) / addaSquare.scale}px`,
          borderWidth:
            paddingResize.currentResizing === 'top'
              ? `${1 / addaSquare.scale}px`
              : null,
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-row-resize pointer-events-auto"
          @mousedown.stop.prevent="paddingResize.resizePaddingTop($event)"
          :style="{
            height: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            @mousedown.stop.prevent="paddingResize.resizePaddingTop($event)"
            class="bg-red-500"
            :style="{
              height: `${2 / addaSquare.scale}px`,
              width: `${16 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        @mouseover.prevent="paddingResize.setShowPaddingResizer"
        @mouseout="
          paddingResize.currentResizing
            ? null
            : (paddingResize.showPaddingResizer = false)
        "
        class="absolute bottom-0 w-full flex flex-row items-center justify-center pointer-events-none"
        :class="{
          'border-red-500': paddingResize.currentResizing === 'bottom',
          'hover:bg-pink-500/50': !paddingResize.currentResizing,
        }"
        :style="{
          height:
            paddingResize.bottomResizerHeight ||
            paddingResize.bottomResizerHeight === 0
              ? `${paddingResize.bottomResizerHeight}px`
              : `${(8 * 1) / addaSquare.scale}px`,
          borderWidth:
            paddingResize.currentResizing === 'bottom'
              ? `${1 / addaSquare.scale}px`
              : null,
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-row-resize pointer-events-auto"
          @mousedown.stop.prevent="paddingResize.resizePaddingBottom($event)"
          :style="{
            height: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            class="bg-red-500"
            :style="{
              height: `${2 / addaSquare.scale}px`,
              width: `${16 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        @mouseover.prevent="paddingResize.setShowPaddingResizer"
        @mouseout="
          paddingResize.currentResizing
            ? null
            : (paddingResize.showPaddingResizer = false)
        "
        class="absolute left-0 h-full flex flex-row items-center justify-center pointer-events-none"
        :class="{
          'border-red-500': paddingResize.currentResizing === 'left',
          'hover:bg-pink-500/50': !paddingResize.currentResizing,
        }"
        :style="{
          width:
            paddingResize.leftResizerWidth ||
            paddingResize.leftResizerWidth === 0
              ? `${paddingResize.leftResizerWidth}px`
              : `${(8 * 1) / addaSquare.scale}px`,
          borderWidth:
            paddingResize.currentResizing === 'left'
              ? `${1 / addaSquare.scale}px`
              : null,
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-col-resize pointer-events-auto"
          @mousedown.stop.prevent="paddingResize.resizePaddingLeft($event)"
          :style="{
            width: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            class="bg-red-500"
            :style="{
              width: `${2 / addaSquare.scale}px`,
              height: `${16 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        @mouseover.prevent="paddingResize.setShowPaddingResizer"
        @mouseout="
          paddingResize.currentResizing
            ? null
            : (paddingResize.showPaddingResizer = false)
        "
        class="absolute right-0 h-full flex flex-row items-center justify-center pointer-events-none"
        :class="{
          'border-red-500': paddingResize.currentResizing === 'right',
          'hover:bg-pink-500/50': !paddingResize.currentResizing,
        }"
        :style="{
          width:
            paddingResize.rightResizerWidth ||
            paddingResize.rightResizerWidth === 0
              ? `${paddingResize.rightResizerWidth}px`
              : `${(8 * 1) / addaSquare.scale}px`,
          borderWidth:
            paddingResize.currentResizing === 'right'
              ? `${1 / addaSquare.scale}px`
              : null,
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-col-resize pointer-events-auto"
          @mousedown.stop.prevent="paddingResize.resizePaddingRight($event)"
          :style="{
            width: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            class="bg-red-500"
            :style="{
              width: `${2 / addaSquare.scale}px`,
              height: `${16 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
    </div>
    <!-- resizer-->
    <div
      class="pointer-events-auto"
      v-show="
        useGetElementRect(selectToi.selectedBoxData.id)?.width > 20 ||
        useGetElementRect(selectToi.selectedBoxData.id)?.height > 20
      "
    >
      <!--Bottom dimensions label-->
      <p
        class="absolute left-0 right-0 top-full flex flex-row justify-center"
        :style="{ marginTop: `${(10 * 1) / addaSquare.scale}px` }"
      >
        <span
          class="bg-[#0191FA] text-[#EDEDED] cursor-default whitespace-nowrap font-medium"
          :style="{
            fontSize: `${(11 * 1) / addaSquare.scale}px`,
            lineHeight: 1.1,
            letterSpacing: `${(-0.3 * 1) / addaSquare.scale}px`,
            borderRadius: `${(2 * 1) / addaSquare.scale}px`,
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
        class="absolute bottom-full bg-[#0191FA] w-full hover:cursor-ns-resize"
        :style="{
          height: `${(1.5 * 1) / addaSquare.scale}px`,
        }"
      />
      <div
        @mousedown.stop.prevent="resizeStore.resizeBottom"
        class="absolute top-full bg-[#0191FA] w-full hover:cursor-ns-resize"
        :style="{ height: `${(1.5 * 1) / addaSquare.scale}px` }"
      />
      <div
        @mousedown.stop.prevent="resizeStore.resizeLeft"
        class="absolute right-full bg-[#0191FA] h-full hover:cursor-ew-resize"
        :style="{
          width: `${(1.5 * 1) / addaSquare.scale}px`,
        }"
      />
      <div
        @mousedown.stop.prevent="resizeStore.resizeRight"
        class="absolute left-full bg-[#0191FA] h-full hover:cursor-ew-resize"
        :style="{ width: `${(1.5 * 1) / addaSquare.scale}px` }"
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
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useResizeStore } from "@/stores/resizeStore";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const paddingResize = usePaddingResizeStore();
</script>
