<template>
  <template v-for="frame in frames">
    <div
      :style="{
        left: useGetElementRect(frame.id)?.x + 'px',
        top: useGetElementRect(frame.id)?.y + 'px',
      }"
      class="h-1 w-1 fixed overflow-visible -mt-5 will-change-transform pointer-events-auto cursor-default hover:text-[#6EB0E0] hover:opacity-100"
      :class="{
        'text-[#6EB0E0] opacity-100': selectToi.selectedBox === frame.id,
        'text-[#FAFAFA] opacity-40': selectToi.selectedBox !== frame.id,
      }"
      @mousedown.stop="
        canvasStore.dndWithoutParent($event, frame.id, frame.type)
      "
      @mouseover.stop="
        () => {
          if (!canvasFF.isDragging) {
            useSetOutlineHover(frame.id);
          }
          selectToi.treeHoverId = frame.id;
        }
      "
      @mouseout="
        () => {
          selectToi.treeHover = false;
          selectToi.treeHoverId = '';
        }
      "
      @click="selectToi.changeSelected($event, frame.id, frame.type)"
    >
      {{ frame.name }}
    </div>
  </template>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeCanvas } from "@/stores/storeCanvas";
import { useCanvasFF } from "@/stores/canvasFreeForm";

const selectToi = useCounterStore();
const canvasStore = storeCanvas();
const canvasFF = useCanvasFF();

const props = defineProps({
  frames: Array,
});
</script>
