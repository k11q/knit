<template>
  <template v-for="node in nodes.slice().reverse()">
    <div
      :data-treeId="node.id"
      :style="{ 'padding-left': `${depth * 20}px` }"
      class="node flex flex-row gap-2 py-[9px] px-3 border border-white box-border cursor-default items-center relative"
      :class="{
        'bg-blue-200 border-blue-200 hover:border-blue-200':
          selectToi.selectedBox === node.id,
        'opacity-30': selectToi.dragDisplay === node.id,
        'hover:border-blue-700':
          !treeDnd.isDragging && selectToi.selectedBox !== node.id,
        'border-blue-700':
          treeDnd.currDropPosition === 'middle' &&
          treeDnd.currDrop === node.id &&
          selectToi.selectedBox !== node.id,
      }"
      @mouseover.stop.prevent="treeDnd.checkDroppable($event, node)"
      @mousedown="dragAndDrop($event, node.id)"
    >
      <div
        v-if="
          treeDnd.currDrop === node.id &&
          treeDnd.isDragging &&
          treeDnd.currDropPosition !== 'middle'
        "
        class="h-0.5 bg-blue-600 absolute w-full z-10"
        :class="{
          'bottom-full ': treeDnd.currDropPosition === 'top',
          'top-full ': treeDnd.currDropPosition === 'bottom',
        }"
      ></div>
      <div
        v-if="
          treeDnd.currDrop === node.id &&
          treeDnd.isDragging &&
          treeDnd.currDropPosition !== 'middle'
        "
        class="h-2 w-2 bg-white border-2 border-blue-600 rounded-full absolute z-10"
        :class="{
          'top-0 -mt-[5px]': treeDnd.currDropPosition === 'top',
          'bottom-0 -mb-[5px]': treeDnd.currDropPosition === 'bottom',
        }"
      ></div>
      <div
        v-if="
          treeDnd.currDrop === node.id &&
          treeDnd.isDragging &&
          treeDnd.currDropPosition !== 'middle'
        "
        class="h-2 w-2 bg-white border-2 border-blue-600 rounded-full absolute right-0 -mr-[5px] z-10"
        :class="{
          'top-0 -mt-[5px]': treeDnd.currDropPosition === 'top',
          'bottom-0 -mb-[5px]': treeDnd.currDropPosition === 'bottom',
        }"
      ></div>
      <div class="flex flex-col items-center justify-center w-3 flex-none">
        <svg
          v-if="node.type == 'frame'"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="22" y1="6" x2="2" y2="6"></line>
          <line x1="22" y1="18" x2="2" y2="18"></line>
          <line x1="6" y1="2" x2="6" y2="22"></line>
          <line x1="18" y1="2" x2="18" y2="22"></line>
        </svg>

        <svg
          v-if="node.type == 'box'"
          width="13"
          height="13"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="black" />
        </svg>

        <svg
          v-if="node.type == 'text'"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      </div>
      <h1 class="">{{ node.id }}</h1>
    </div>
    <TreeBrowser
      :nodes="node.children"
      :depth="depth + 1"
      v-model="modelValue"
    />
  </template>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useTreeDndStore } from "~~/stores/treeDnd";
import { useCanvasDndStore } from "~~/stores/canvasDnd";
import { useSquareStore } from "~~/stores/dataSquare";

const selectToi = useCounterStore();
const treeDnd = useTreeDndStore();
const canvasDnd = useCanvasDndStore();
const squareStore = useSquareStore();

const dragAndDrop = (e, currDrag) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    selectToi.changeSelected(e, currDrag);
    treeDnd.currDrag = currDrag;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      treeDnd.isDragging = true;
    }

    function mouseup(e) {
      if (treeDnd.isDragging === true) {
        treeDnd.setCurrDragValue(selectToi.data, treeDnd.currDrag);
        treeDnd.dndRemove(selectToi.data);
        if (treeDnd.currDropPosition === "top") {
          treeDnd.dndAppendTop(selectToi.data, treeDnd.currDrop);
        } else if (treeDnd.currDropPosition === "bottom") {
          treeDnd.dndAppendBottom(selectToi.data, treeDnd.currDrop);
        } else {
          treeDnd.dndAppendMiddle(selectToi.data, treeDnd.currDrop);
        }
      }
      treeDnd.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
};
</script>

<script>
export default {
  name: "TreeBrowser",
  props: {
    modelValue: String,
    nodes: Array,
    depth: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      expanded: true,
    };
  },
  emits: ["update:modelValue"],
  methods: {
    changePageTitle(title) {
      this.$emit("update:modelValue", title); // previously was `this.$emit('input', title)`
    },
  },
};
</script>

<style>
.node {
  text-align: left;
}
</style>
