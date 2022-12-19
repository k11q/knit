<template>
  <div
    class="absolute inset-0 overflow-hidden"
    @wheel.stop.prevent="usePinchZoom($event)"
    @mousedown.stop.prevent="addaSquare.addSquare($event)"
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
      class="w-0 h-0 overflow-visible fixed top-0 left-0"
      :style="{
        isolation: 'isolate',
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
        transition: 'transform 0s linear',
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
      v-if="selectToi.selectedBoxData && selectToi.selectedBox"
      class="fixed top-0 left-0 w-0 h-0 overflow-visible"
      :style="{
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <!--Selected outline n resizer n padding resizer-->
      <ClientOnly>
        <DesignerCanvasResizer />
      </ClientOnly>
      <!--Drop marker-->
      <div
        v-if="
          !canvasStore.isPinchZoom &&
          selectToi.selectedBoxData &&
          canvasStore.showMarker
        "
        class="absolute pointer-events-none"
        :style="{
          height: markerHeight().value,
          width: markerWidth().value,
          backgroundColor: '#0191FA',
          transform: `translate(${markerLeft().value}, ${markerTop().value})`,
        }"
      ></div>
      <!--Selected outline when droppable-->
      <div
        v-if="
          !canvasStore.isPinchZoom &&
          selectToi.selectedBoxData &&
          canvasStore.showMarker
        "
        class="absolute pointer-events-none"
        :style="{
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
        v-if="
          !canvasStore.isPinchZoom &&
          selectToi.selectedBoxData &&
          canvasStore.showGhostOutline
        "
        class="absolute pointer-events-none"
        :style="{
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
      <!--solid outline when dnd with parent
      <div
        v-show="canvasStore.showSolidOutline"
        class="absolute pointer-events-none"
        :style="{
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
    --></div>
    <!--Select show-->
    <div
      v-if="isShowSelect().value"
      class="absolute pointer-events-none"
      :style="{
        transform: `translate(${selectorLeft().value}px, ${
          selectorTop().value
        }px)`,
        height: selectorHeight().value + 'px',
        width: selectorWidth().value + 'px',
        border: `${selectToi.treeHoverSize}px solid #0191FA`,
        backgroundColor: 'rgba(1, 145, 250, 0.1)',
        willChange: 'transform, height, width',
        transition: 'all 0s linear',
      }"
    ></div>
    <!--Multiselect elements outline-->
    <div
      v-if="
        !canvasStore.isPinchZoom &&
        canvasStore.selection.length &&
        !canvasStore.isDragging
      "
      class="fixed top-0 left-0 overflow-visible pointer-events-none"
      :style="{
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <DesignerCanvasMultiSelectOutline :elements="canvasStore.selection" />
    </div>
    <!--Multiselect elements resizer-->
    <div
      v-if="
        !canvasStore.isPinchZoom &&
        canvasStore.selection.length &&
        !canvasStore.isDragging
      "
      class="fixed top-0 left-0 overflow-visible pointer-events-none"
      :style="{
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <DesignerCanvasMultiSelectResizer />
    </div>
    <!--RulerSnap siblings point element-->
    <div
      v-if="!canvasStore.isPinchZoom && rulerSnap.show && rulerSnap.on"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasRulerPoints :points="rulerSnap.snapPoints" />
    </div>
    <!--frames label-->
    <div
      v-show="!canvasStore.isPinchZoom"
      class="fixed left-0 top-0 h-0 w-0 overflow-visible pointer-events-none"
    >
      <ClientOnly>
        <DesignerCanvasFrameLabel
          :frames="selectToi.data?.filter((i) => i.type === 'div')"
        />
      </ClientOnly>
    </div>

    <!--child outline and label-->
    <div
      v-if="
        !canvasStore.isPinchZoom &&
        selectToi.selectedBoxData &&
        !selectToi.selectedTextEditor &&
        useCheckParent(selectToi.selectedBoxData.id)
      "
      class="fixed top-0 left-0 overflow-visible pointer-events-none box-border"
      :style="{
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <div
        class="absolute"
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
          height: selectToi.selectedBoxData.cssRules
            ? selectToi.selectedBoxData?.cssRules[0].style?.height?.value !==
                'fit-content' && !useCheckParent(selectToi.selectedBoxData.id)
              ? selectToi.selectedBoxData.cssRules[0].style.height.value + 'px'
              : Math.round(
                  useGetElementRect(selectToi.selectedBoxData.id)?.height
                ) /
                  addaSquare.scale +
                'px'
            : null,
          width: selectToi.selectedBoxData.cssRules
            ? selectToi.selectedBoxData?.cssRules[0]?.style?.width?.value !==
                'fit-content' && !useCheckParent(selectToi.selectedBoxData.id)
              ? selectToi.selectedBoxData.cssRules[0].style.width.value + 'px'
              : Math.round(
                  useGetElementRect(selectToi.selectedBoxData.id)?.width
                ) /
                  addaSquare.scale +
                'px'
            : null,
          outline: `${1.5 / addaSquare.scale}px solid #0191FA`,
          outlineOffset: `${-1.5 / addaSquare.scale}px`,
        }"
      >
        <!--topleft dimensions label-->
        <p
          class="absolute left-0 bottom-full flex flex-row justify-start max-w-full"
          :style="{ marginBottom: `${(4 * 1) / addaSquare.scale}px` }"
        >
          <span
            class="bg-[#0191FA] cursor-default whitespace-nowrap w-full overflow-hidden overflow-ellipsis flex justify-start items-center"
            :style="{
              fontSize: `${(11 * 1) / addaSquare.scale}px`,
              lineHeight: 1.1,
              borderRadius: `${(2 * 1) / addaSquare.scale}px`,
              gap: `${(2 * 1) / addaSquare.scale}px`,
              paddingTop: `${2 * (1 / addaSquare.scale)}px`,
              paddingBottom: `${2 * (1 / addaSquare.scale)}px`,
              paddingRight: `${(4 * 1) / addaSquare.scale}px`,
              paddingLeft: `${(4 * 1) / addaSquare.scale}px`,
            }"
          >
            <i
              ><svg
                :width="11 / addaSquare.scale"
                :height="11 / addaSquare.scale"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </i>
            <p class="overflow-hidden overflow-ellipsis">
              {{ selectToi.selectedBoxData.name }}
            </p>
          </span>
        </p>
      </div>
    </div>

    <!--hover outline and label-->
    <div
      v-show="
        !canvasStore.isPinchZoom &&
        canvasStore.hoverData &&
        selectToi.treeHoverId
      "
      class="pointer-events-none"
      :style="{
        position: 'absolute',
        transform: `translate(${
          canvasStore.hoverData
            ? useGetElementRect(canvasStore.hoverData.id)?.left
            : ''
        }px, ${
          canvasStore.hoverData
            ? useGetElementRect(canvasStore.hoverData.id)?.top
            : ''
        }px)`,
        width: canvasStore.hoverData
          ? useGetElementRect(canvasStore.hoverData.id)?.width + 'px'
          : '',
        height: canvasStore.hoverData
          ? useGetElementRect(canvasStore.hoverData.id)?.height + 'px'
          : '',
        outline: canvasStore.hoverData ? `2px solid #0191FA` : '',
        outlineOffset: `-2px`,
      }"
    >
      <!--topleft dimensions label-->
      <p
        v-show="useCheckParent(canvasStore.hoverData.id)"
        class="absolute left-0 bottom-full flex flex-row justify-start max-w-full"
        :style="{ marginBottom: `4px` }"
      >
        <span
          class="bg-[#0191FA] cursor-default whitespace-nowrap w-full overflow-hidden overflow-ellipsis flex justify-start items-center"
          :style="{
            lineHeight: 1.1,
            borderRadius: `2px`,
            gap: `2px`,
            paddingTop: `2px`,
            paddingBottom: `2px`,
            paddingRight: `4px`,
            paddingLeft: `4px`,
          }"
        >
          <i
            ><svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </i>
          <p class="overflow-hidden overflow-ellipsis">
            {{ canvasStore.hoverData.name }}
          </p>
        </span>
      </p>
    </div>
    <!--Measureline-->
    <DesignerCanvasMeasureLine
      :lines="measuredLines().value"
      v-if="
        (measuredLines().value.length && canvasStore.isDragging) ||
        (measuredLines().value.length && selectToi.treeHoverId)
      "
    />
    <!--Measure outline-->
    <div
      v-if="
        measuredLines().value.length &&
        selectToi.treeHoverId &&
        !canvasStore.isDragging
      "
      :style="{
        position: 'absolute',
        pointerEvents: 'none',
        left: useGetElementRect(selectToi.treeHoverId)?.left + 'px',
        top: useGetElementRect(selectToi.treeHoverId)?.top + 'px',
        width: useGetElementRect(selectToi.treeHoverId)?.width + 'px',
        height: useGetElementRect(selectToi.treeHoverId)?.height + 'px',
        outline: `1px solid #E93372`,
        outlineOffset: `-1.5px`,
      }"
    ></div>
    <div
      v-if="
        measuredLines().value.length &&
        selectToi.selectedBoxData.id &&
        !canvasStore.isDragging
      "
      :style="{
        position: 'absolute',
        pointerEvents: 'none',
        left: useGetElementRect(selectToi.selectedBoxData.id)?.left + 'px',
        top: useGetElementRect(selectToi.selectedBoxData.id)?.top + 'px',
        width: useGetElementRect(selectToi.selectedBoxData.id)?.width + 'px',
        height: useGetElementRect(selectToi.selectedBoxData.id)?.height + 'px',
        outline: `1px solid #E93372`,
        outlineOffset: `-1.5px`,
      }"
    ></div>

    <!--NEW Ruler element-->
    <div
      v-if="!canvasStore.isPinchZoom && rulerSnap.show && rulerSnap.on"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <DesignerCanvasNewRulerSnap />
    </div>
    <!--Tiptap text editor-->
    <div
      v-if="!canvasStore.isPinchZoom && selectToi.selectedTextEditor"
      class="fixed top-0 left-0 overflow-visible pointer-events-none"
      :style="{
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <div
        :style="{
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
              ? Math.round(
                  useGetElementRect(selectToi.selectedBoxData.id)?.width
                ) /
                  addaSquare.scale +
                'px'
              : getWidth() + 'px'
            : '',

          fontSize: getFontSize() + 'px',
          lineHeight: getLineHeight(),
          color: getColor(),
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

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useResizeStore } from "~~/src/stores/resizeStore";
import { useRulerSnapStore } from "~~/src/stores/rulerSnap";
import { useCanvasStore } from "~~/src/stores/canvas";
import { usePaddingResizeStore } from "~~/src/stores/paddingResizeStore";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const resizeStore = useResizeStore();
const rulerSnap = useRulerSnapStore();
const canvasStore = useCanvasStore();
const paddingResize = usePaddingResizeStore();

function keydown(e: KeyboardEvent) {
  if (
    selectToi.selectedBoxData &&
    selectToi.treeHoverId &&
    e.altKey &&
    selectToi.treeHoverId !== selectToi.selectedBoxData.id &&
    !canvasStore.isPinchZoom
  ) {
    e.stopImmediatePropagation();
    e.preventDefault();
    calculateDistance(selectToi.selectedBoxData.id, selectToi.treeHoverId);
  } else return;
}

function keyup(e: KeyboardEvent) {
  if (measuredLines().value.length && !e.altKey) {
    e.stopImmediatePropagation();
    e.preventDefault();
    measuredLines().value = [];
  }
}

onMounted(() => {
  useAddKeyupShortcuts();

  addaSquare.offsetLeft = vw(50);
  addaSquare.offsetTop = vh(50);

  function vh(percent: number) {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (percent * h) / 100;
  }

  function vw(percent: number) {
    var w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    return (percent * w) / 100;
  }

  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);
});
</script>
