<template>
  <div
    v-show="
      selectToi.selectedBoxData &&
      !canvasStore.isDragging &&
      !selectToi.selectedTextEditor
    "
    class="absolute pointer-events-none border-box"
    :style="{
      left: selectToi.selectedBoxData.cssRules
        ? selectToi.selectedBoxData.cssRules[0].style.left &&
          !useCheckParent(selectToi.selectedBoxData.id)
          ? selectToi.selectedBoxData.cssRules[0].style.left.value + 'px'
          : Math.round(
              useGetElementRect(selectToi.selectedBoxData.id)?.x -
                addaSquare.offsetLeft
            ) /
              addaSquare.scale +
            'px'
        : null,
      top: selectToi.selectedBoxData.cssRules
        ? selectToi.selectedBoxData.cssRules[0].style.top &&
          !useCheckParent(selectToi.selectedBoxData.id)
          ? selectToi.selectedBoxData.cssRules[0].style.top.value + 'px'
          : Math.round(
              useGetElementRect(selectToi.selectedBoxData.id)?.y -
                addaSquare.offsetTop
            ) /
              addaSquare.scale +
            'px'
        : null,
      height: getHeight()
        ? getHeight() === 'fit-content' || getHeight() === 'auto'
          ? Math.round(
              useGetElementRect(selectToi.selectedBoxData.id)?.height
            ) /
              addaSquare.scale +
            'px'
          : getHeight() + 'px'
        : '',
      width: getWidth()
        ? getWidth() === 'fit-content' || getHeight() === 'auto'
          ? Math.round(useGetElementRect(selectToi.selectedBoxData.id)?.width) /
              addaSquare.scale +
            'px'
          : getWidth() + 'px'
        : '',
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
    <div
      class="pointer-events-auto"
      v-show="
        (useGetElementRect(selectToi.selectedBoxData.id)?.width > 20 ||
          useGetElementRect(selectToi.selectedBoxData.id)?.height > 20) &&
        !useCheckParent(selectToi.selectedBoxData.id)
      "
    >
      <!--Bottom dimensions label-->
      <p
        class="absolute left-0 right-0 top-full flex flex-row justify-center pointer-events-none"
        :style="{ marginTop: `${(8 * 1) / addaSquare.scale}px` }"
      >
        <span
          class="bg-[#0191FA] cursor-default whitespace-nowrap font-medium"
          :style="{
            fontSize: `${(11 * 1) / addaSquare.scale}px`,
            lineHeight: 1.1,
            borderRadius: `${(2 * 1) / addaSquare.scale}px`,
            paddingTop: `${2 * (1 / addaSquare.scale)}px`,
            paddingBottom: `${2 * (1 / addaSquare.scale)}px`,
            paddingRight: `${(4 * 1) / addaSquare.scale}px`,
            paddingLeft: `${(4 * 1) / addaSquare.scale}px`,
          }"
        >
          {{
            selectToi.selectedBoxData.cssRules
              ? selectToi.selectedBoxData?.cssRules[0]?.style?.width.value !==
                "fit-content"
                ? selectToi.selectedBoxData.cssRules[0]?.style.width.value
                : selectToi.selectedBoxData?.cssRules[0]?.style?.width &&
                  selectToi.selectedBoxData?.cssRules[0]?.style?.width.value ===
                    "fit-content"
                ? "Hug"
                : "Fill"
              : null
          }}
          x
          {{
            selectToi.selectedBoxData.cssRules
              ? selectToi.selectedBoxData?.cssRules[0]?.style?.height.value !==
                "fit-content"
                ? selectToi.selectedBoxData.cssRules[0]?.style.height.value
                : selectToi.selectedBoxData?.cssRules[0]?.style?.height &&
                  selectToi.selectedBoxData?.cssRules[0]?.style?.height
                    .value === "fit-content"
                ? "Hug"
                : "Fill"
              : null
          }}
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

    <!--gap resizer-->
    <div
      v-show="
        (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
          useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
        selectToi.selectedBoxData &&
        selectToi.treeHoverId &&
        !canvasStore.isResizingPadding &&
        selectToi.selectedBoxData.type !== 'text'
      "
      class="pointer-events-none"
    >
      <DesignerCanvasGapResizer :gaps="paddingResize.gap" />
    </div>

    <!--padding resizer-->
    <div
      class="pointer-events-auto"
      :style="{ padding: `${1 / addaSquare.scale}px` }"
      v-show="
        (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
          useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
        useGetElement(selectToi.selectedBoxData.id)?.children?.length &&
        !resizeStore.isResizing &&
        !canvasStore.isResizingGap &&
        selectToi.selectedBoxData.type !== 'text'
      "
    >
      <div
        v-show="
          (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
            useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
          selectToi.selectedBoxData &&
          selectToi.treeHoverId
        "
        @mouseover.prevent="
          () => {
            if (selectToi.selectedBoxData) {
              selectToi.treeHoverId = selectToi.selectedBoxData.id;
              currentHover = 'top';
            }
          }
        "
        @mouseout="
          () => {
            if (!paddingResize.currentResizing) {
              paddingResize.showPaddingResizer = false;
            }
            currentHover = '';
          }
        "
        class="absolute top-0 left-0 right-0 flex flex-row items-center justify-center pointer-events-auto"
        :class="{
          'border-[#E93372]': paddingResize.currentResizing === 'top',
        }"
        :style="{
          margin: `${1 / addaSquare.scale}px`,
          height: paddingResize.topResizerHeight
            ? `${paddingResize.topResizerHeight}px`
            : '0px',
          borderWidth:
            paddingResize.currentResizing === 'top'
              ? `${1.5 / addaSquare.scale}px`
              : null,
          backgroundImage:
            currentHover === 'top' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? `repeating-linear-gradient(-45deg, #E9337266 ${
                  8 / addaSquare.scale
                }px, #E9337266 ${9 / addaSquare.scale}px, transparent ${
                  9.5 / addaSquare.scale
                }px, transparent ${12.5 / addaSquare.scale}px)`
              : '',
          backgroundColor:
            currentHover === 'top' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? '#E933720D'
              : '',
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-row-resize"
          @mousedown.stop.prevent="useResizePaddingTop($event)"
          @mouseenter="
            getPaddingTop()
              ? (canvasStore.cursorLabel = getPaddingTop() as string)
              : (canvasStore.cursorLabel = '0')
          "
          @mouseleave="
            canvasStore.isResizingPadding ? '' : (canvasStore.cursorLabel = '')
          "
          :style="{
            height: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            v-show="
              !canvasStore.isResizingPadding && !canvasStore.isResizingGap
            "
            class="bg-red-500"
            :style="{
              height: `${1.5 / addaSquare.scale}px`,
              width: `${12 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
      <div
        v-show="
          (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
            useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
          selectToi.selectedBoxData &&
          selectToi.treeHoverId
        "
        @mouseover.prevent="
          () => {
            if (selectToi.selectedBoxData) {
              selectToi.treeHoverId = selectToi.selectedBoxData.id;
              currentHover = 'bottom';
            }
          }
        "
        @mouseout="
          () => {
            if (!paddingResize.currentResizing) {
              paddingResize.showPaddingResizer = false;
            }
            currentHover = '';
          }
        "
        class="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center pointer-events-auto"
        :class="{
          'border-[#E93372]': paddingResize.currentResizing === 'bottom',
        }"
        :style="{
          margin: `${1 / addaSquare.scale}px`,
          height: paddingResize.bottomResizerHeight
            ? `${paddingResize.bottomResizerHeight}px`
            : '0px',
          borderWidth:
            paddingResize.currentResizing === 'bottom'
              ? `${1.5 / addaSquare.scale}px`
              : null,
          backgroundImage:
            currentHover === 'bottom' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? `repeating-linear-gradient(-45deg, #E9337266 ${
                  8 / addaSquare.scale
                }px, #E9337266 ${9 / addaSquare.scale}px, transparent ${
                  9.5 / addaSquare.scale
                }px, transparent ${12.5 / addaSquare.scale}px)`
              : '',
          backgroundColor:
            currentHover === 'bottom' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? '#E933720D'
              : '',
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-row-resize"
          @mousedown.stop.prevent="useResizePaddingBottom($event)"
          @mouseenter="
            getPaddingBottom()
              ? (canvasStore.cursorLabel = getPaddingBottom() as string)
              : (canvasStore.cursorLabel = '0')
          "
          @mouseleave="
            canvasStore.isResizingPadding ? '' : (canvasStore.cursorLabel = '')
          "
          :style="{
            height: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            v-show="
              !canvasStore.isResizingPadding && !canvasStore.isResizingGap
            "
            class="bg-[#E93372]"
            :style="{
              height: `${1.5 / addaSquare.scale}px`,
              width: `${12 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
      <div
        v-show="
          (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
            useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
          selectToi.selectedBoxData &&
          selectToi.treeHoverId
        "
        @mouseover.prevent="
          () => {
            if (selectToi.selectedBoxData) {
              selectToi.treeHoverId = selectToi.selectedBoxData.id;
              currentHover = 'left';
            }
          }
        "
        @mouseout="
          () => {
            if (!paddingResize.currentResizing) {
              paddingResize.showPaddingResizer = false;
            }
            currentHover = '';
          }
        "
        class="absolute left-0 top-0 bottom-0 flex flex-row items-center justify-center pointer-events-auto"
        :class="{
          'border-[#E93372]': paddingResize.currentResizing === 'left',
        }"
        :style="{
          margin: `${1 / addaSquare.scale}px`,
          width: paddingResize.leftResizerWidth
            ? `${paddingResize.leftResizerWidth}px`
            : '0px',
          borderWidth:
            paddingResize.currentResizing === 'left'
              ? `${1.5 / addaSquare.scale}px`
              : null,
          backgroundImage:
            currentHover === 'left' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? `repeating-linear-gradient(-45deg, #E9337266 ${
                  8 / addaSquare.scale
                }px, #E9337266 ${9 / addaSquare.scale}px, transparent ${
                  9.5 / addaSquare.scale
                }px, transparent ${12.5 / addaSquare.scale}px)`
              : '',
          backgroundColor:
            currentHover === 'left' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? '#E933720D'
              : '',
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-col-resize"
          @mousedown.stop.prevent="useResizePaddingLeft($event)"
          @mouseenter="
            getPaddingLeft()
              ? (canvasStore.cursorLabel = getPaddingLeft() as string)
              : (canvasStore.cursorLabel = '0')
          "
          @mouseleave="
            canvasStore.isResizingPadding ? '' : (canvasStore.cursorLabel = '')
          "
          :style="{
            width: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            v-show="
              !canvasStore.isResizingPadding && !canvasStore.isResizingGap
            "
            class="bg-[#E93372] pointer-events-none"
            :style="{
              width: `${1.5 / addaSquare.scale}px`,
              height: `${12 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
      <div
        v-show="
          (useGetElementRect(selectToi.selectedBoxData.id)?.width > 100 ||
            useGetElementRect(selectToi.selectedBoxData.id)?.height > 100) &&
          selectToi.selectedBoxData &&
          selectToi.treeHoverId
        "
        @mouseover.prevent="
          () => {
            if (selectToi.selectedBoxData) {
              selectToi.treeHoverId = selectToi.selectedBoxData.id;
              currentHover = 'right';
            }
          }
        "
        @mouseout="
          () => {
            if (!paddingResize.currentResizing) {
              paddingResize.showPaddingResizer = false;
            }
            currentHover = '';
          }
        "
        class="absolute right-0 top-0 bottom-0 flex flex-row items-center justify-center pointer-events-auto"
        :class="{
          'border-[#E93372]': paddingResize.currentResizing === 'right',
        }"
        :style="{
          margin: `${1 / addaSquare.scale}px`,
          width: paddingResize.rightResizerWidth
            ? `${paddingResize.rightResizerWidth}px`
            : '0px',
          borderWidth:
            paddingResize.currentResizing === 'right'
              ? `${1.5 / addaSquare.scale}px`
              : null,
          backgroundImage:
            currentHover === 'right' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? `repeating-linear-gradient(-45deg, #E9337266 ${
                  8 / addaSquare.scale
                }px, #E9337266 ${9 / addaSquare.scale}px, transparent ${
                  9.5 / addaSquare.scale
                }px, transparent ${12.5 / addaSquare.scale}px)`
              : '',
          backgroundColor:
            currentHover === 'right' &&
            !canvasStore.isResizingGap &&
            !paddingResize.currentResizing
              ? '#E933720D'
              : '',
        }"
      >
        <div
          class="flex items-center justify-center flex-none hover:cursor-col-resize"
          @mousedown.stop.prevent="useResizePaddingRight($event)"
          @mouseenter="
            getPaddingRight()
              ? (canvasStore.cursorLabel = getPaddingRight() as string)
              : (canvasStore.cursorLabel = '0')
          "
          @mouseleave="
            canvasStore.isResizingPadding ? '' : (canvasStore.cursorLabel = '')
          "
          :style="{
            width: `${18 / addaSquare.scale}px`,
          }"
        >
          <div
            v-show="
              !canvasStore.isResizingPadding && !canvasStore.isResizingGap
            "
            class="bg-[#E93372]"
            :style="{
              width: `${1.5 / addaSquare.scale}px`,
              height: `${12 / addaSquare.scale}px`,
              outline: `${1 / addaSquare.scale}px solid white`,
              borderRadius: `${0.5 / addaSquare.scale}px`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "~~/src/stores/counter";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";
import { useResizeStore } from "~~/src/stores/resizeStore";
import { usePaddingResizeStore } from "~~/src/stores/paddingResizeStore";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasStore = useCanvasStore();
const resizeStore = useResizeStore();
const paddingResize = usePaddingResizeStore();

const currentHover = ref("");
</script>
