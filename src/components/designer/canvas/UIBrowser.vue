<template>
  <template v-for="node in nodes" :key="node.id">
    <div
      v-if="node.type === 'frame'"
      :style="{
        backgroundColor: node.bgColor,
        height: node.height ? node.height + node.unit : 'auto',
        width: node.width ? node.width + node.unit : 'auto',
        left:
          node.position === 'absolute'
            ? node.X + node.Xunit
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.x,
        top:
          node.position === 'absolute'
            ? node.Y + node.Yunit
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.y,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent: selectToi.getJustify(node.justify),
        alignItems: selectToi.getAlign(node.align),
        position: node.position,
        paddingLeft: node.paddingX + 'px',
        paddingTop: node.paddingY + 'px',
        paddingRight: node.paddingX + 'px',
        paddingBottom: node.paddingY + 'px',
        marginLeft: node.marginLeft + 'px',
        marginTop: node.marginTop + 'px',
        marginRight: node.marginRight + 'px',
        marginBottom: node.margingBottom + 'px',
        borderRadius: node.corner + 'px',
        border: node.strokeSize + 'px ' + 'solid ' + node.strokeColor,
        gap: node.gap + 'px',
        flexGrow: node.flexGrow,
        alignSelf: node.alignSelf,
        boxShadow: `${node.boxShadowOffsetY}px ${node.boxShadowOffsetX}px ${node.boxShadowBlurRadius}px ${node.boxShadowSpreadRadius}px ${node.boxShadowColor}`,
      }"
      :data-id="node.id"
      data-component="Frame"
      @pointerdown.stop="testDown($event, node.id)"
      @mouseover="canvasDnd.checkDroppable($event, node)"
      @mousedown="selectToi.changeSelected($event, node.id, node.type)"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      class="hover:outline outline-[#0191FA]"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
      <div
        v-if="selectToi.selectedBox === node.id && !canvasFF.isDragging"
        class="absolute pointer-events-none inset-0 z-[999]"
      >
        <div class="pointer-events-auto">
          <p
            class="absolute left-0 right-0 top-full flex flex-row justify-center"
            :style="{ marginTop: `${(8 * 1) / squareStore.scale}px` }"
          >
            <span
              class="bg-[#0191FA] text-[#EDEDED] cursor-default whitespace-nowrap"
              :style="{
                fontSize: `${(11 * 1) / squareStore.scale}px`,
                lineHeight: 1.5,
                borderRadius: `${(4 * 1) / squareStore.scale}px`,
                paddingTop: `${2 * (1 / squareStore.scale)}px`,
                paddingBottom: `${2 * (1 / squareStore.scale)}px`,
                paddingRight: `${(4 * 1) / squareStore.scale}px`,
                paddingLeft: `${(4 * 1) / squareStore.scale}px`,
              }"
            >
              {{
                selectToi.selectedBoxData.width
                  ? Math.round(selectToi.selectedBoxData.width)
                  : "Fill"
              }}
              x
              {{
                selectToi.selectedBoxData.height
                  ? Math.round(selectToi.selectedBoxData.height)
                  : "Fill"
              }}
            </span>
          </p>
          <div
            @mousedown.stop.prevent="resizeStore.resizeTop"
            class="absolute bottom-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottom"
            class="absolute top-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeLeft"
            class="absolute right-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeRight"
            class="absolute left-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / squareStore.scale}px` }"
          />

          <div
            @mousedown.stop.prevent="resizeStore.resizeTopLeft"
            class="absolute -top-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeTopRight"
            class="absolute -top-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomRight"
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
        </div>
      </div>
      <p
        @mousedown="selectToi.changeSelected($event, node.id)"
        class="absolute bottom-full left-0 hover:text-[#0191FA]"
        :class="{
          'text-[#0191FA]': selectToi.selectedBox === node.id,
          'opacity-40': selectToi.selectedBox !== node.id,
        }"
        :style="{
          fontSize: `${(12 * 1) / squareStore.scale}px`,
          lineHeight: 1.4,
          marginBottom: `${(2 * 1) / squareStore.scale}px`,
        }"
      >
        {{ node.id }}
      </p>
      <DesignerCanvasUIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <div
      v-if="node.type === 'box'"
      :style="{
        backgroundColor: node.bgColor,
        height: node.height ? node.height + node.unit : 'auto',
        width: node.width ? node.width + node.unit : 'auto',
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        position: node.position,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent: selectToi.getJustify(node.justify),
        color: node.color,
        paddingLeft: node.paddingX + 'px',
        paddingTop: node.paddingY + 'px',
        paddingRight: node.paddingX + 'px',
        paddingBottom: node.paddingY + 'px',
        marginLeft: node.marginLeft + 'px',
        marginTop: node.marginTop + 'px',
        marginRight: node.marginRight + 'px',
        marginBottom: node.marginBottom + 'px',
        borderRadius: node.corner + 'px',
        border: node.strokeSize + 'px ' + 'solid ' + node.strokeColor,
        gap: node.gap + 'px',
        flexGrow: node.flexGrow,
        alignSelf: node.alignSelf,
        boxShadow: `${node.boxShadowOffsetY}px ${node.boxShadowOffsetX}px ${node.boxShadowBlurRadius}px ${node.boxShadowSpreadRadius}px ${node.boxShadowColor}`,
      }"
      :data-id="node.id"
      data-component="Box"
      @pointerdown.stop="testDown($event, node.id)"
      @mouseover.stop.prevent="canvasDnd.checkDroppable($event, node)"
      @mousedown="selectToi.changeSelected($event, node.id, node.type)"
      class="hover:outline outline-[#0191FA]"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
      <div
        v-if="selectToi.selectedBox === node.id && !canvasFF.isDragging"
        class="absolute pointer-events-none inset-0 z-[999]"
      >
        <div class="pointer-events-auto">
          <p
            class="absolute left-0 right-0 top-full flex flex-row justify-center"
            :style="{ marginTop: `${(8 * 1) / squareStore.scale}px` }"
          >
            <span
              class="bg-[#0191FA] text-[#EDEDED] cursor-default whitespace-nowrap"
              :style="{
                fontSize: `${(11 * 1) / squareStore.scale}px`,
                lineHeight: 1.5,
                borderRadius: `${(4 * 1) / squareStore.scale}px`,
                paddingTop: `${2 * (1 / squareStore.scale)}px`,
                paddingBottom: `${2 * (1 / squareStore.scale)}px`,
                paddingRight: `${(4 * 1) / squareStore.scale}px`,
                paddingLeft: `${(4 * 1) / squareStore.scale}px`,
              }"
            >
              {{
                selectToi.selectedBoxData.width
                  ? Math.round(selectToi.selectedBoxData.width)
                  : "Fill"
              }}
              x
              {{
                selectToi.selectedBoxData.height
                  ? Math.round(selectToi.selectedBoxData.height)
                  : "Fill"
              }}
            </span>
          </p>
          <div
            @mousedown.stop.prevent="resizeStore.resizeTop"
            class="absolute bottom-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottom"
            class="absolute top-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeLeft"
            class="absolute right-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeRight"
            class="absolute left-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / squareStore.scale}px` }"
          />

          <div
            @mousedown.stop.prevent="resizeStore.resizeTopLeft"
            class="absolute -top-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeTopRight"
            class="absolute -top-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomRight"
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
        </div>
      </div>
      <DesignerCanvasUIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <div
      v-if="node.type === 'text'"
      class="text-center hover:decoration-[#0191FA] hover:underline hover:decoration-2"
      @pointerdown="testDown($event, node.id)"
      @mousedown="selectToi.changeSelected($event, node.id, node.type)"
      @dblclick="makeEditable"
      :style="{
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        fontSize: node.fontSize + 'px',
        color: node.color,
        position: node.position,
      }"
      :data-id="node.id"
      data-component="Text"
      :class="{
        'decoration-[#0191FA] underline decoration-1 ':
          selectToi.selectedBox === node.id,
      }"
      :contenteditable="editable"
    >
      {{ node.textContent }}
      <div
        v-if="selectToi.selectedBox === node.id && !canvasFF.isDragging"
        class="absolute pointer-events-none inset-0 z-[999]"
      >
        <div class="pointer-events-auto">
          <p
            class="absolute left-0 right-0 top-full flex flex-row justify-center"
            :style="{ marginTop: `${(8 * 1) / squareStore.scale}px` }"
          >
            <span
              class="bg-[#0191FA] text-[#EDEDED] cursor-default whitespace-nowrap"
              :style="{
                fontSize: `${(11 * 1) / squareStore.scale}px`,
                lineHeight: 1.5,
                borderRadius: `${(4 * 1) / squareStore.scale}px`,
                paddingTop: `${2 * (1 / squareStore.scale)}px`,
                paddingBottom: `${2 * (1 / squareStore.scale)}px`,
                paddingRight: `${(4 * 1) / squareStore.scale}px`,
                paddingLeft: `${(4 * 1) / squareStore.scale}px`,
              }"
            >
              {{
                selectToi.selectedBoxData.width
                  ? Math.round(selectToi.selectedBoxData.width)
                  : "Fill"
              }}
              x
              {{
                selectToi.selectedBoxData.height
                  ? Math.round(selectToi.selectedBoxData.height)
                  : "Fill"
              }}
            </span>
          </p>
          <div
            @mousedown.stop.prevent="resizeStore.resizeTop"
            class="absolute bottom-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottom"
            class="absolute top-full bg-[#0191FA] w-full hover:cursor-row-resize"
            :style="{ height: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeLeft"
            class="absolute right-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / squareStore.scale}px` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeRight"
            class="absolute left-full bg-[#0191FA] h-full hover:cursor-col-resize"
            :style="{ width: `${(1 * 1) / squareStore.scale}px` }"
          />

          <div
            @mousedown.stop.prevent="resizeStore.resizeTopLeft"
            class="absolute -top-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeTopRight"
            class="absolute -top-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomRight"
            class="absolute -bottom-1 -right-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nwse-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
          <div
            @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
            class="absolute -bottom-1 -left-1 h-2 w-2 bg-[#EDEDED] border-[#0191FA] border hover:cursor-nesw-resize"
            :style="{ transform: `scale( ${1 / squareStore.scale})` }"
          />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useResizeStore } from "@/stores/resizeStore";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();
const canvasMarker = useCanvasMarkerStore();
const resizeStore = useResizeStore();
let editable = ref(false);

function makeEditable() {
  editable.value = !editable.value;
}

//dnd on canvas
const testDown = (e, currDrag) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    let prevX = e.clientX - e.target.offsetLeft * squareStore.scale;
    let prevY = e.clientY - e.target.offsetTop * squareStore.scale;

    let prevOffsetLeft = e.clientX - e.target.getBoundingClientRect().x;
    let prevOffsetTop = e.clientY - e.target.getBoundingClientRect().y;

    canvasFF.isDragging = true;
    canvasDnd.isDragging = true;
    canvasDnd.currDrag = currDrag;
    let isDragging = false;

    //delete selected item
    document.addEventListener("keyup", (event) => {
      if (
        event.key == "Backspace" ||
        (event.key == "Delete" && selectToi.selectedBox)
      ) {
        canvasDnd.dndRemove(selectToi.data);
        selectToi.clearSelected();
      }
    });

    if (!selectToi.selectedBox) {
      document.removeEventListener("keyup", (event) => {
        if (
          event.key == "Backspace" ||
          (event.key == "Delete" && selectToi.selectedBox)
        ) {
          canvasDnd.dndRemove(selectToi.data);
          selectToi.clearSelected();
        }
      });
    }

    if (canvasFF.isDragging == true) {
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        isDragging = true;

        selectToi.selectedBoxHTMLX = (e.clientX - prevX) / squareStore.scale;
        selectToi.selectedBoxHTMLY = (e.clientY - prevY) / squareStore.scale;

        if (selectToi.selectedBoxData.parent) {
          let dropzone = document.querySelector(
            `[data-id=${selectToi.selectedBoxData.parent}]`
          );
          let dropzonerect = dropzone.getBoundingClientRect();
          let dropzoneLeft = dropzonerect.x;
          let dropzoneTop = dropzonerect.y;

          selectToi.selectedBoxData.X =
            (Math.round(e.clientX - dropzoneLeft - prevOffsetLeft) * 1) /
            squareStore.scale;
          selectToi.selectedBoxData.Y =
            (Math.round(e.clientY - dropzoneTop - prevOffsetTop) * 1) /
            squareStore.scale;
        } else {
          selectToi.selectedBoxData.X = (e.clientX - prevX) / squareStore.scale;
          selectToi.selectedBoxData.Y = (e.clientY - prevY) / squareStore.scale;
        }

        //ruler function
        let targetChildren = selectToi.data;
        let targetChildrenData = [];

        targetChildren.forEach((i) => {
          if (i.id !== selectToi.selectedBox) {
            let lineLeft = i.X;
            let lineTop = i.Y;
            let lineRight = i.X + i.width;
            let lineBottom = i.Y + i.height;
            let newlineBottom;
            let newlineTop;
            let newlineLeft;
            let newlineRight;

            let distanceTopToLineTop = selectToi.selectedBoxData.Y - lineTop;
            let distanceTopToLineBottom =
              selectToi.selectedBoxData.Y - lineBottom;
            let distanceBottomToLineTop =
              selectToi.selectedBoxData.Y +
              selectToi.selectedBoxData.height -
              lineTop;
            let distanceBottomToLineBottom =
              selectToi.selectedBoxData.Y +
              selectToi.selectedBoxData.height -
              lineBottom;
            let distanceLeftToLineLeft = selectToi.selectedBoxData.X - lineLeft;
            let distanceLeftToLineRight =
              selectToi.selectedBoxData.X - lineRight;
            let distanceRightToLineLeft =
              selectToi.selectedBoxData.X +
              selectToi.selectedBoxData.width -
              lineLeft;
            let distanceRightToLineRight =
              selectToi.selectedBoxData.X +
              selectToi.selectedBoxData.width -
              lineRight;

            (distanceTopToLineTop < 4 / squareStore.scale &&
              distanceTopToLineTop > -4 / squareStore.scale) ||
            (distanceBottomToLineTop < 4 / squareStore.scale &&
              distanceBottomToLineTop > -4 / squareStore.scale)
              ? (newlineTop = i.Y)
              : (lineTop = undefined);
            (distanceTopToLineBottom < 4 / squareStore.scale &&
              distanceTopToLineBottom > -4 / squareStore.scale) ||
            (distanceBottomToLineBottom < 4 / squareStore.scale &&
              distanceBottomToLineBottom > -4 / squareStore.scale)
              ? (newlineBottom = i.Y + i.height)
              : (newlineBottom = undefined);
            (distanceLeftToLineLeft < 4 / squareStore.scale &&
              distanceLeftToLineLeft > -4 / squareStore.scale) ||
            (distanceRightToLineLeft < 4 / squareStore.scale &&
              distanceRightToLineLeft > -4 / squareStore.scale)
              ? (newlineLeft = i.X)
              : (newlineLeft = undefined);
            (distanceLeftToLineRight < 4 / squareStore.scale &&
              distanceLeftToLineRight > -4 / squareStore.scale) ||
            (distanceRightToLineRight < 4 / squareStore.scale &&
              distanceRightToLineRight > -4 / squareStore.scale)
              ? (newlineRight = i.X + i.width)
              : (newlineRight = undefined);

            targetChildrenData.push({
              lineTop: newlineTop,
              lineLeft: newlineLeft,
              lineRight: newlineRight,
              lineBottom: newlineBottom,
            });
          }
        });
        canvasMarker.lines = targetChildrenData;

        //sort childrens by dragging
        if (canvasDnd.isDroppable && canvasDnd.currDrop) {
          canvasDnd.currDropHTML = e.target;

          let dropzoneChildren = [...canvasDnd.currDropHTML.children];

          console.log("dropzoneChildren = " + dropzoneChildren);

          function getDragAfter(y) {
            return dropzoneChildren.reduce(
              (closest, child) => {
                const box = child.getBoundingClientRect();
                console.log("box = " + box);
                console.log("child id = " + child.dataset.id);
                canvasDnd.spareDragzone = child.dataset.id;
                const offset = y - child.offsetTop - child.offsetHeight / 2;
                console.log("child offsettop = " + child.offsetTop);
                if (child.dataset.id !== currDrag) {
                  if (offset <= 0 && offset > closest.offset) {
                    console.log("child id = " + child.dataset.id);
                    return { offset: offset, elementID: child.dataset.id };
                  } else {
                    console.log("closest = " + closest);
                    return closest;
                  }
                }
              },
              { offset: Number.NEGATIVE_INFINITY }
            ).elementID;
          }

          let y = canvasDnd.clientY;

          let dragZone = getDragAfter(e.clientY);

          if (dragZone == undefined) {
            dragZone = canvasDnd.spareDragzone;
          }

          canvasDnd.setCurrDragValue(selectToi.data, canvasDnd.currDrag);
          canvasDnd.dndRemove(selectToi.data);

          canvasDnd.currDragValue.parent = canvasDnd.currDrop;

          canvasDnd.dndAppend(selectToi.data, dragZone);
        } /* else if (!canvasDnd.isDroppable && canvasDnd.currDrop) {
          canvasDnd.currDragValue.parent = "";
          canvasDnd.appendToCanvas();
        }
        */
        canvasDnd.checkDroppable();
      }

      function mouseup() {
        isDragging = false;
        canvasMarker.lines = [];

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        canvasFF.isDragging = false;
      }
    }
  }
};

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits("update:modelValue");
function changePageTitle(title) {
  emit("update:modelValue", title); // previously was `this.$emit('input', title)`
}
</script>

<style>
.node {
  text-align: left;
}
</style>
