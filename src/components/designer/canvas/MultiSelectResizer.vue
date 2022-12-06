<template>
  <div
    class="absolute border-box"
    :style="{
      willChange: 'left, top, width, height',
      left: canvasStore.multiSelectResizerRect.left,
      top: canvasStore.multiSelectResizerRect.top,
      width: canvasStore.multiSelectResizerRect.width,
      height: canvasStore.multiSelectResizerRect.height,
    }"
  >
    <!--(ON HOLD)radius resizer controller
    <div
      class="pointer-events-auto"
      v-show="
        (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
          useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
        !resizeStore.isResizing
      "
    >
      <div
        v-show="
          paddingResize.showPaddingResizer ||
          (paddingResize.currentResizing && !resizeStore.isResizing)
        "
        class="absolute top-0 left-0 bg-[#EFEEF1] rounded-full border-[#0191FA]"
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
        class="absolute top-0 right-0 bg-[#EFEEF1] rounded-full border-[#0191FA]"
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
        class="absolute bottom-0 left-0 bg-[#EFEEF1] rounded-full border-[#0191FA]"
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
        class="absolute bottom-0 right-0 bg-[#EFEEF1] rounded-full border-[#0191FA]"
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
  -->

    <!-- resizer-->
    <div class="pointer-events-auto">
      <!--Bottom dimensions label-->
      <p
        class="absolute left-0 right-0 top-full flex flex-row justify-center pointer-events-none"
        :style="{ marginTop: `${(10 * 1) / addaSquare.scale}px` }"
      >
        <span
          class="bg-[#0191FA] text-[#EFEEF1] cursor-default whitespace-nowrap font-medium"
          :style="{
            fontSize: `${(11 * 1) / addaSquare.scale}px`,
            lineHeight: 1.1,
            letterSpacing: `${(-0.3 * 1) / addaSquare.scale}px`,
            borderRadius: `${(4 * 1) / addaSquare.scale}px`,
            paddingTop: `${2 * (1 / addaSquare.scale)}px`,
            paddingBottom: `${2 * (1 / addaSquare.scale)}px`,
            paddingRight: `${(4 * 1) / addaSquare.scale}px`,
            paddingLeft: `${(4 * 1) / addaSquare.scale}px`,
          }"
        >
          {{ parseInt(canvasStore.multiSelectResizerRect.width) }}
          x
          {{ parseInt(canvasStore.multiSelectResizerRect.height) }}
        </span>
      </p>
      <div
        @mousedown.stop.prevent="resizeStore.resizeTop"
        class="absolute top-0 w-full hover:cursor-ns-resize flex items-center justify-center"
        :style="{
          height: `${(8 * 1) / addaSquare.scale}px`,
          marginTop: `${-4 / addaSquare.scale}px`,
        }"
      >
        <div
          class="bg-[#0191FA] w-full"
          :style="{ height: `${(1.5 * 1) / addaSquare.scale}px` }"
        />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeBottom"
        class="absolute bottom-0 w-full hover:cursor-ns-resize flex items-center justify-center"
        :style="{
          height: `${(8 * 1) / addaSquare.scale}px`,
          marginBottom: `${-4 / addaSquare.scale}px`,
        }"
      >
        <div
          class="bg-[#0191FA] w-full"
          :style="{ height: `${(1.5 * 1) / addaSquare.scale}px` }"
        />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeLeft"
        class="absolute left-0 h-full hover:cursor-ew-resize flex items-center justify-center"
        :style="{
          width: `${(8 * 1) / addaSquare.scale}px`,
          marginLeft: `${-4 / addaSquare.scale}px`,
        }"
      >
        <div
          class="bg-[#0191FA] h-full"
          :style="{ width: `${(1.5 * 1) / addaSquare.scale}px` }"
        />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeRight"
        class="absolute right-0 h-full hover:cursor-ew-resize flex items-center justify-center"
        :style="{
          width: `${(8 * 1) / addaSquare.scale}px`,
          marginRight: `${-4 / addaSquare.scale}px`,
        }"
      >
        <div
          class="bg-[#0191FA] h-full"
          :style="{ width: `${(1.5 * 1) / addaSquare.scale}px` }"
        />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeTopLeft"
        class="absolute -top-2 -left-2 h-4 w-4 hover:cursor-nwse-resize flex items-center justify-center"
        :style="{
          transform: `scale( ${1 / addaSquare.scale})`,
          willChange: 'transform',
        }"
      >
        <div class="bg-[#EFEEF1] border-[#0191FA] border h-2 w-2" />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeTopRight"
        class="absolute -top-2 -right-2 h-4 w-4 hover:cursor-nesw-resize flex items-center justify-center"
        :style="{
          transform: `scale( ${1 / addaSquare.scale})`,
          willChange: 'transform',
        }"
      >
        <div class="bg-[#EFEEF1] border-[#0191FA] border h-2 w-2" />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeBottomRight"
        class="absolute -bottom-2 -right-2 h-4 w-4 hover:cursor-nwse-resize flex items-center justify-center"
        :style="{
          transform: `scale( ${1 / addaSquare.scale})`,
          willChange: 'transform',
        }"
      >
        <div class="bg-[#EFEEF1] border-[#0191FA] border h-2 w-2" />
      </div>
      <div
        @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
        class="absolute -bottom-2 -left-2 h-4 w-4 hover:cursor-nesw-resize flex items-center justify-center"
        :style="{
          transform: `scale( ${1 / addaSquare.scale})`,
          willChange: 'transform',
        }"
      >
        <div class="bg-[#EFEEF1] border-[#0191FA] border h-2 w-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "~~/src/stores/counter";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useResizeStore } from "~~/src/stores/resizeStore";
import { usePaddingResizeStore } from "~~/src/stores/paddingResizeStore";
import { useCanvasStore } from "~~/src/stores/canvas";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const resizeStore = useResizeStore();
const paddingResize = usePaddingResizeStore();
const canvasStore = useCanvasStore();
</script>
