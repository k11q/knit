<template>
  <template v-for="node in nodes" :key="node.id">
    <component
      :is="node.type === 'text' || node.type === 'box' ? 'div' : node.type"
      :data-droppable="
        node.type === 'text' || node.type === 'box' ? null : true
      "
      :data-id="node.id"
      :data-component="node.type"
      @mousedown.stop="
        node.type === 'text' && selectToi.selectedTextEditor === node.id
          ? ''
          : testDown($event, node.id)
      "
      @mouseout="
        () => {
          selectToi.treeHover = false;
          selectToi.treeHoverId = '';
          canvasStore.textHover = false;
          if (selectToi.selectedBox === node.id && node.type !== 'text') {
            paddingResize.showPaddingResizer = false;
          }
        }
      "
      @mouseover.stop="
        () => {
          if (
            selectToi.selectedBox !== node.id &&
            node.type !== 'text' &&
            (node.type !== 'box' ||
              (node.type === 'box' && !canvasStore.isDragging)) &&
            canvasStore.selection.findIndex((i) => i.id === node.id) === -1
          ) {
            useSetOutlineHover(node.id);
          } else if (
            selectToi.selectedBox !== node.id &&
            node.type === 'text' &&
            !canvasStore.isDragging
          ) {
            canvasStore.textHover = true;
          }
          if (selectToi.selectedBox === node.id && node.type !== 'text') {
            paddingResize.setShowPaddingResizer();
          }
          if (!canvasStore.isDragging) {
            selectToi.treeHoverId = node.id;
          }
        }
      "
      @dblclick.prevent="
        node.type === 'text' ? makeEditable($event, node.id) : null
      "
      :class="{
        'pointer-events-none':
          selectToi.selectedBox === node.id &&
          canvasStore.isDragging &&
          (node.type !== 'text' ||
            (node.type === 'text' &&
              canvasStore.isDragging &&
              selectToi.selectedTextEditor !== node.id)),
        '!hidden': node.display && node.display === 'hide',
      }"
      :style="styleProps(node)"
    >
      <div
        v-if="node.type === 'text'"
        v-html="node.textContent"
        class="cursor-default"
        :class="{
          'underline decoration-[#0191FA]':
            selectToi.selectedBox === node.id && !canvasStore.isDragging,
          'hover:underline decoration-[#0191FA]': !canvasStore.isDragging,
          'opacity-0': selectToi.selectedTextEditor === node.id,
        }"
        :style="{
          textDecorationThickness:
            canvasStore.textHover && selectToi.selectedBox !== node.id
              ? `${2 / squareStore.scale}px`
              : `${1 / squareStore.scale}px`,
        }"
        draggable="false"
      ></div>
      <DesignerCanvasUIBrowser
        v-if="node.children && (node.type === 'div' || node.type === 'box')"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </component>
  </template>
</template>

<script setup lang="ts">
import { useCounterStore } from "~~/src/stores/counter";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";
import { useCanvasStore } from "~~/src/stores/canvas";
import { Node as knitNode } from "~~/src/stores/counter";

const selectToi = useCounterStore();
const squareStore = useSquareStore();
const paddingResize = usePaddingResizeStore();
const canvasStore = useCanvasStore();

function makeEditable(e: Event, id: string) {
  selectToi.selectedTextEditor = id;
  useSetOutlineSelector("");
}

//dnd on canvas
const testDown = (e: Event, currDrag: string) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    if (!useCheckParent(currDrag) && !canvasStore.selection.length) {
      canvasStore.dndWithoutParent(e, currDrag);
    }
    if (useCheckParent(currDrag) && !canvasStore.selection.length) {
      canvasStore.dndWithParent(e, currDrag);
    }
    if (canvasStore.selection.length) {
      canvasStore.setPositionMultiElement(e);
    }
  }
};

const props = defineProps({
  nodes: Array<knitNode>,
  depth: {
    type: Number,
    default: 0,
  },
});

function styleProps(node: knitNode) {
  return {
    display: node.cssRules[0]?.style?.display?.value,
    flexDirection: node.cssRules[0]?.style?.flexDirection?.value,
    justifyContent: node.cssRules[0]?.style?.justifyContent?.value,
    alignItems: node.cssRules[0]?.style?.alignItems?.value,
    gap:
      node.cssRules[0]?.style?.gap?.value! +
      node.cssRules[0]?.style?.gap?.unit!,
    borderRadius:
      node.cssRules[0]?.style?.borderRadius?.value! +
      node.cssRules[0]?.style?.borderRadius?.unit!,
    position: node.cssRules[0]?.style?.position?.value,
    left:
      node.cssRules[0]?.style?.left?.value! +
      node.cssRules[0]?.style?.left?.unit!,
    top:
      node.cssRules[0]?.style?.top?.value! +
      node.cssRules[0]?.style?.top?.unit!,
    right:
      node.cssRules[0]?.style?.right?.value! +
      node.cssRules[0]?.style?.right?.unit!,
    bottom:
      node.cssRules[0]?.style?.bottom?.value! +
      node.cssRules[0]?.style?.bottom?.unit!,
    height:
      node.cssRules[0]?.style?.height?.type === "unit"
        ? node.cssRules[0]?.style?.height?.value +
          node.cssRules[0]?.style?.height?.unit!
        : node.cssRules[0]?.style?.height?.value,
    width:
      node.cssRules[0]?.style?.width?.type === "unit"
        ? node.cssRules[0]?.style?.width?.value +
          node.cssRules[0]?.style?.width?.unit!
        : node.cssRules[0]?.style?.width?.value,
    backgroundColor: node.cssRules[0]?.style?.backgroundColor?.value,
    color: node.cssRules[0]?.style?.color?.value,
    fontSize:
      node.cssRules[0]?.style?.fontSize?.value! +
      node.cssRules[0]?.style?.fontSize?.unit!,
    lineHeight:
      node.cssRules[0]?.style?.lineHeight?.value! +
      node.cssRules[0]?.style?.lineHeight?.unit!,
    paddingLeft:
      node.cssRules[0]?.style?.paddingLeft?.value! +
      node.cssRules[0]?.style?.paddingLeft?.unit!,
  };
}

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      crossorigin: "",
    },
  ],
});
</script>
