<template>
  <div
    class="absolute inset-0 overflow-hidden"
    @wheel="usePinchZoom($event)"
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
      class="w-0 h-0 overflow-visible absolute"
      :style="{
        willChange: canvasStore.isPinchZoom ? 'transform' : '',
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
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <!--Hover outline
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
      >
    </div>
  -->
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
    -->
      <!--Select show-->
      <div
        v-show="selectStore.showSelect"
        class="absolute pointer-events-none"
        :style="{
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
      v-show="selectToi.data && !canvasStore.isPinchZoom"
      class="absolute inset-0 overflow-visible pointer-events-none"
    >
      <ClientOnly>
        <DesignerCanvasFrameLabel
          :frames="selectToi.data?.filter((i) => i.type === 'div')"
        />
      </ClientOnly>
    </div>

    <!--child outline and label-->
    <div
      v-show="
        selectToi.selectedBoxData &&
        !selectToi.selectedTextEditor &&
        useCheckParent(selectToi.selectedBoxData.id) &&
        !canvasStore.isPinchZoom
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
      v-show="canvasStore.hoverData && !canvasStore.isPinchZoom"
      class="fixed top-0 left-0 overflow-visible pointer-events-none box-border"
      :style="{
        transform: `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`,
      }"
    >
      <div
        class="absolute"
        :style="{
          left: canvasStore.hoverData.cssRules
            ? canvasStore.hoverData.cssRules[0].style.left &&
              !useCheckParent(canvasStore.hoverData.id)
              ? canvasStore.hoverData.cssRules[0].style.left.value + 'px'
              : Math.round(
                  useGetElementRect(canvasStore.hoverData.id)?.x -
                    addaSquare.offsetLeft
                ) /
                  addaSquare.scale +
                'px'
            : null,
          top: canvasStore.hoverData.cssRules
            ? canvasStore.hoverData.cssRules[0].style.top &&
              !useCheckParent(canvasStore.hoverData.id)
              ? canvasStore.hoverData.cssRules[0].style.top.value + 'px'
              : Math.round(
                  useGetElementRect(canvasStore.hoverData.id)?.y -
                    addaSquare.offsetTop
                ) /
                  addaSquare.scale +
                'px'
            : null,
          height: canvasStore.hoverData.cssRules
            ? canvasStore.hoverData?.cssRules[0].style?.height?.value !==
                'fit-content' && !useCheckParent(canvasStore.hoverData.id)
              ? canvasStore.hoverData.cssRules[0].style.height.value + 'px'
              : Math.round(
                  useGetElementRect(canvasStore.hoverData.id)?.height
                ) /
                  addaSquare.scale +
                'px'
            : null,
          width: canvasStore.hoverData.cssRules
            ? canvasStore.hoverData?.cssRules[0]?.style?.width?.value !==
                'fit-content' && !useCheckParent(canvasStore.hoverData.id)
              ? canvasStore.hoverData.cssRules[0].style.width.value + 'px'
              : Math.round(useGetElementRect(canvasStore.hoverData.id)?.width) /
                  addaSquare.scale +
                'px'
            : null,
          outline: `${2 / addaSquare.scale}px solid #0191FA`,
          outlineOffset: `${-2 / addaSquare.scale}px`,
        }"
      >
        <!--topleft dimensions label-->
        <p
          v-show="useCheckParent(canvasStore.hoverData.id)"
          class="absolute left-0 bottom-full flex flex-row justify-start max-w-full"
          :style="{ marginBottom: `${(4 * 1) / addaSquare.scale}px` }"
        >
          <span
            class="bg-[#0191FA] cursor-default whitespace-nowrap w-full overflow-hidden overflow-ellipsis flex justify-start items-center"
            :style="{
              fontSize: `${(11 * 1) / addaSquare.scale}px`,
              lineHeight: 1.1,
              borderRadius: `${(2 * 1) / addaSquare.scale}px`,
              gap: `${2 * (1 / addaSquare.scale)}px`,
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
              {{ canvasStore.hoverData.name }}
            </p>
          </span>
        </p>
      </div>
    </div>
    <!--Measureline-->
    <DesignerCanvasMeasureLine
      :lines="measuredLines().value"
      v-if="measuredLines().value"
    />

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
import { useDropMarker } from "~~/src/stores/dropMarker";
import { useSelectStore } from "~~/src/stores/selectStore";
import { useRulerSnapStore } from "~~/src/stores/rulerSnap";
import { useCanvasStore } from "~~/src/stores/canvas";
import { usePaddingResizeStore } from "~~/src/stores/paddingResizeStore";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const resizeStore = useResizeStore();
const dropMarker = useDropMarker();
const selectStore = useSelectStore();
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
