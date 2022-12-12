<template>
  <div
    class="flex flex-row justify-start items-center hover:outline-[#3A3A3A] hover:outline -outline-offset-1 pl-2 -ml-2 mr-2 h-7 rounded-sm focus-within:outline-[#0191FA] focus-within:outline-2 focus-within:outline focus-within:hover:outline-[#0191FA]"
  >
    <div
      role="label"
      class="h-[18px] aspect-square items-center flex flex-none cursor-ew-resize -ml-0.5 opacity-60"
      @mousedown.stop.prevent="$emit('slider', $event)"
    >
      <slot></slot>
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input')"
      @click="$event.target.select()"
      class="w-full pl-2 bg-transparent placeholder-[#707070] focus:outline-none leading-none"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  type: String,
  placeholder: [String, Number],
  value: [String, Number],
});
</script>
