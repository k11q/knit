<template>
  <template v-if="lines.length">
    <div
      v-for="line in lines"
      class="absolute pointer-events-none"
      :style="{
        top: line.top + 'px',
        left: line.left + 'px',
        height: line.height ? line.height + 'px' : '1px',
        width: line.width ? line.width + 'px' : '1px',
        background:
          line.type === 'solid'
            ? '#E93372'
            : line.width
            ? 'repeating-linear-gradient( to right, #E93372, #E93372 5px, transparent 4px, transparent 8px, #E93372 8px, #E93372 12px'
            : line.height
            ? 'repeating-linear-gradient( to bottom, #E93372, #E93372 5px, transparent 4px, transparent 8px, #E93372 8px, #E93372 12px'
            : '',
      }"
    >
      <div
        class="absolute mx-auto w-full mt-2 flex justify-center items-center"
        v-if="line.width && line.type === 'solid'"
      >
        <div class="bg-[#E93372] px-1 rounded-sm py-0.5 leading-[1.1]">
          {{ Math.round(line.width / squareStore.scale) }}
        </div>
      </div>
      <div
        class="absolute my-auto h-full ml-2 flex justify-center items-center"
        v-if="line.height && line.type === 'solid'"
      >
        <div class="bg-[#E93372] px-1 rounded-sm py-0.5 leading-[1.1]">
          {{ Math.round(line.height / squareStore.scale) }}
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { MeasuredLine } from "@/composables/calculate-distance";
import { useSquareStore } from "@/stores/dataSquare";

const squareStore = useSquareStore();

interface Props {
  lines: MeasuredLine[];
}

const props = defineProps<Props>();
</script>
