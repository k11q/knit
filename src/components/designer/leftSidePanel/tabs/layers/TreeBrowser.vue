<template>
  <div v-for="node in nodes.slice().reverse()" :key="node.id">
    <div
      :data-treeid="node.id"
      :data-depth="depth"
      :data-parentIsSelected="parentIsSelected"
      :style="{ 'padding-left': depth === 1 ? '16px' : depth * 20 + 'px' }"
      class="flex flex-row gap-2 py-[9px] border border-transparent box-border cursor-default items-center relative"
      :class="{
        'bg-[#2E2E2E] border-[#232323] hover:border-[#232323]':
          selectToi.selectedBox === node.id,
        'bg-[#242424]': parentIsSelected === true,
        'opacity-30': selectToi.dragDisplay === node.id,
        'hover:border-[#0191FA]':
          !treeDnd.isDragging && selectToi.selectedBox !== node.id,
        '!border-[#0191FA]':
          treeDnd.currDropPosition === 'middle' &&
          treeDnd.currDrop === node.id &&
          selectToi.selectedBox !== node.id,
        'opacity-40': treeDnd.currDrag === node.id,
        'opacity-100': treeDnd.currDrag !== node.id,
        'opacity-30': treeDnd.currDrag && parentIsSelected === true,
      }"
      @mousedown="dragAndDrop($event, node.id)"
      @mouseover="useSetOutlineHover(node.id)"
      @mouseout="selectToi.treeHover = false"
    >
      <div
        v-if="
          treeDnd.currDrop === node.id &&
          treeDnd.isDragging &&
          treeDnd.currDropPosition !== 'middle'
        "
        class="h-0.5 bg-[#0191FA] absolute w-full z-10"
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
        class="h-2 w-2 bg-[#EDEDED] border-2 border-[#0191FA] rounded-full -ml-1 absolute z-10"
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
        class="h-2 w-2 bg-[#EDEDED] border-2 border-[#0191FA] rounded-full absolute right-1 -mr-[5px] z-10"
        :class="{
          'top-0 -mt-[5px]': treeDnd.currDropPosition === 'top',
          'bottom-0 -mb-[5px]': treeDnd.currDropPosition === 'bottom',
        }"
      ></div>
      <div
        class="absolute -ml-4 hover:bg-[#232323] rounded-sm"
        v-if="node.children && node.children.length"
        @mousedown.prevent.stop="
          () => {
            node.expandTree = !node.expandTree;
          }
        "
      >
        <svg
          v-if="node.expandTree"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 6.5L3.75 9.9641L3.75 3.0359L9 6.5Z" fill="#505050" />
        </svg>
        <svg
          v-if="!node.expandTree"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.5 10L3.0359 4.75L9.9641 4.75L6.5 10Z" fill="#505050" />
        </svg>
      </div>
      <div
        class="flex flex-col items-center justify-center w-3 flex-none pointer-events-none opacity-80"
      >
        <svg
          v-if="node.type == 'div'"
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
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
      <h1 class="pointer-events-none">
        {{ node.type == "text" ? node.textContent : node.name }}
      </h1>
    </div>
    <template v-if="!node.expandTree">
      <DesignerLeftSidePanelTabsLayersTreeBrowser
        :nodes="node.children.slice().reverse()"
        :parentIsSelected="
          selectToi.selectedBox === node.id ? true : parentIsSelected
        "
        :depth="depth + 1"
        :v-model="modelValue"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useTreeDndStore } from "@/stores/treeDnd";
import { useSquareStore } from "@/stores/dataSquare";

const selectToi = useCounterStore();
const treeDnd = useTreeDndStore();
const squareStore = useSquareStore();
const props = defineProps({
  modelValue: String,
  nodes: Array,
  parentIsSelected: Boolean,
  depth: {
    type: Number,
    default: 1,
  },
});

const savedOutline = ref("");
const emit = defineEmits("update:modelValue");

function changePageTitle(title) {
  emit("update:modelValue", title); // previously was `this.$emit('input', title)`
}

const dragAndDrop = (e, currDrag) => {
  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    selectToi.changeSelected(e, currDrag);
    useSetOutlineSelector(currDrag);

    window.addEventListener("mousemove", mousemove, e);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      treeDnd.currDrag = currDrag;
      treeDnd.isDragging = true;
      const currDrop = document.elementFromPoint(e.clientX, e.clientY);
      const currDropId = currDrop.dataset.treeid;
      const currDropIsParentSelected = currDrop.dataset.parentisselected;
      if (currDropId) {
        if (
          currDropId !== treeDnd.currDrag &&
          currDropIsParentSelected !== "true"
        ) {
          treeDnd.currDrop = currDropId;

          const currdropEl = document.elementFromPoint(e.clientX, e.clientY);
          const currdropElRect = currdropEl.getBoundingClientRect();

          if (e.clientY - currdropElRect.y >= (currdropElRect.height * 3) / 5) {
            treeDnd.currDropPosition = "bottom";
          } else if (
            e.clientY - currdropElRect.y >
            (currdropElRect.height * 2) / 5
          ) {
            treeDnd.currDropPosition = "middle";
          } else {
            treeDnd.currDropPosition = "top";
          }

          treeDnd.isDroppable = true;
        } else {
          treeDnd.currDrop = "";
          treeDnd.isDroppable = false;
        }
      } else {
        treeDnd.currDrop = "";
        treeDnd.isDroppable = false;
      }
    }

    function mouseup(e) {
      const currDrop = document.elementFromPoint(e.clientX, e.clientY);
      const currDropId = currDrop.dataset.treeid;
      const currDropDepth = currDrop.dataset.depth;
      const currDropIsParentSelected = currDrop.dataset.parentisselected;
      if (
        treeDnd.isDragging === true &&
        currDropId !== treeDnd.currDrag &&
        currDropIsParentSelected !== "true"
      ) {
        treeDnd.setCurrDragValue(selectToi.data, treeDnd.currDrag);
        treeDnd.dndRemove(selectToi.data);
        if (treeDnd.currDropPosition === "top") {
          if (currDropDepth == 1) {
            treeDnd.dndAppendTop(selectToi.data, treeDnd.currDrop);
          } else {
            treeDnd.dndAppendBottom(selectToi.data, treeDnd.currDrop);
          }
        } else if (treeDnd.currDropPosition === "bottom") {
          if (currDropDepth == 1) {
            treeDnd.dndAppendBottom(selectToi.data, treeDnd.currDrop);
          } else {
            treeDnd.dndAppendTop(selectToi.data, treeDnd.currDrop);
          }
        } else {
          treeDnd.dndAppendMiddle(selectToi.data, treeDnd.currDrop);
        }
      }
      setTimeout(() => {
        useSetOutlineSelector(currDrag);
      }, 0);

      treeDnd.currDrag = "";
      treeDnd.currDrop = "";
      treeDnd.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
};
</script>
