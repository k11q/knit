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
      @mousedown="selectToi.changeSelected($event, node.id, node.type)"
      @mouseover="hoverEvent($event, node.id)"
      @mouseout="mouseoutEvent($event, node.id)"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
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
      @mousedown="selectToi.changeSelected($event, node.id, node.type)"
      @mouseover="hoverEvent($event, node.id)"
      @mouseout="mouseoutEvent($event, node.id)"
      class="hover:outline outline-[#0191FA]"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
      <DesignerCanvasUIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <p
      v-if="node.type === 'text'"
      class="text-center hover:decoration-[#0191FA] hover:underline hover:decoration-2 focus:outline-none cursor-default"
      @pointerdown="testDown($event, node.id)"
      @mousedown="selectToi.changeSelected($event, node.id, node.type)"
      @mouseover="hoverEvent($event, node.id)"
      @mouseout="mouseoutEvent($event, node.id)"
      @dblclick="makeEditable"
      :style="{
        left: node.X + node.Xunit,
        top: node.Y + node.Yunit,
        fontSize: node.fontSize + 'px',
        color: node.color,
        position: node.position,
        lineHeight: node.lineHeight ? node.lineHeight : 1.3,
      }"
      :data-id="node.id"
      data-component="Text"
      :class="{
        'decoration-[#0191FA] underline decoration-1 ':
          selectToi.selectedBox === node.id,
      }"
      :contenteditable="editable"
      @input="selectToi.selectedBoxData.textContent = $event.target.innerText"
    >
      {{ node.textContent }}
    </p>
  </template>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();
const canvasMarker = useCanvasMarkerStore();
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
          selectToi.selectedBoxData.X = Math.round(
            (e.clientX - prevX) / squareStore.scale
          );
          selectToi.selectedBoxData.Y = Math.round(
            (e.clientY - prevY) / squareStore.scale
          );
        }

        //ruler function
        let targetChildren = [
          ...document.querySelector(`[data-id=${currDrag}]`).parentElement
            .children,
        ];
        let targetChildrenData = [];

        targetChildren.forEach((i) => {
          if (i.dataset.id !== selectToi.selectedBox) {
            let lineLeft = i.getBoundingClientRect().x;
            let lineTop = i.getBoundingClientRect().y;
            let lineRight =
              i.getBoundingClientRect().x + i.getBoundingClientRect().width;
            let lineBottom =
              i.getBoundingClientRect().y + i.getBoundingClientRect().height;
            let newlineBottom;
            let newlineTop;
            let newlineLeft;
            let newlineRight;

            let distanceTopToLineTop =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().y - lineTop;
            let distanceTopToLineBottom =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().y - lineBottom;
            let distanceBottomToLineTop =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().y +
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().height -
              lineTop;
            let distanceBottomToLineBottom =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().y +
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().height -
              lineBottom;
            let distanceLeftToLineLeft =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().x - lineLeft;
            let distanceLeftToLineRight =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().x - lineRight;
            let distanceRightToLineLeft =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().x +
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().width -
              lineLeft;
            let distanceRightToLineRight =
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().x +
              document
                .querySelector(`[data-id=${currDrag}]`)
                .getBoundingClientRect().width -
              lineRight;

            (distanceTopToLineTop < 4 / squareStore.scale &&
              distanceTopToLineTop > -4 / squareStore.scale) ||
            (distanceBottomToLineTop < 4 / squareStore.scale &&
              distanceBottomToLineTop > -4 / squareStore.scale)
              ? (newlineTop = i.getBoundingClientRect().y)
              : (lineTop = undefined);
            (distanceTopToLineBottom < 4 / squareStore.scale &&
              distanceTopToLineBottom > -4 / squareStore.scale) ||
            (distanceBottomToLineBottom < 4 / squareStore.scale &&
              distanceBottomToLineBottom > -4 / squareStore.scale)
              ? (newlineBottom =
                  i.getBoundingClientRect().y +
                  i.getBoundingClientRect().height)
              : (newlineBottom = undefined);
            (distanceLeftToLineLeft < 4 / squareStore.scale &&
              distanceLeftToLineLeft > -4 / squareStore.scale) ||
            (distanceRightToLineLeft < 4 / squareStore.scale &&
              distanceRightToLineLeft > -4 / squareStore.scale)
              ? (newlineLeft = i.getBoundingClientRect().x)
              : (newlineLeft = undefined);
            (distanceLeftToLineRight < 4 / squareStore.scale &&
              distanceLeftToLineRight > -4 / squareStore.scale) ||
            (distanceRightToLineRight < 4 / squareStore.scale &&
              distanceRightToLineRight > -4 / squareStore.scale)
              ? (newlineRight =
                  i.getBoundingClientRect().x + i.getBoundingClientRect().width)
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

        selectToi.selectedBoxHTMLX =
          (e.target.getBoundingClientRect().x - squareStore.offsetLeft) /
          squareStore.scale;
        selectToi.selectedBoxHTMLY =
          (e.target.getBoundingClientRect().y - squareStore.offsetTop) /
          squareStore.scale;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        canvasFF.isDragging = false;
      }
    }
  }
};

function hoverEvent(e, id) {
  selectToi.treeHover = true;
  let target = document.querySelector(`[data-id=${id}]`);
  let selectedTarget = target.getBoundingClientRect();

  selectToi.treeHoverHTMLX = Math.round(
    (selectedTarget.x - squareStore.offsetLeft) / squareStore.scale
  );
  selectToi.treeHoverHTMLY = Math.round(
    (selectedTarget.y - squareStore.offsetTop) / squareStore.scale
  );

  selectToi.treeHoverHTMLWidth = Math.round(
    selectedTarget.width / squareStore.scale
  );
  selectToi.treeHoverHTMLHeight = Math.round(
    selectedTarget.height / squareStore.scale
  );
}

function mouseoutEvent(e, id) {
  selectToi.treeHover = false;
}

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
