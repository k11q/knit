<template class="overflow-visible">
  <div
    v-show="rulerSnap.snapLines?.lineTop"
    :style="{
      top: rulerSnap.snapLines?.lineTop + 'px',
      left: rulerSnap.rulerPosition.left + 'px',
      width:
        rulerSnap.rulerPosition.right - rulerSnap.rulerPosition.left + 'px',
    }"
    class="h-[1px] bg-[#E93372] fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="rulerSnap.snapLines?.lineMiddleY"
    :style="{
      top: rulerSnap.snapLines?.lineMiddleY + 'px',
      left: rulerSnap.rulerPosition.left + 'px',
      width:
        rulerSnap.rulerPosition.right - rulerSnap.rulerPosition.left + 'px',
    }"
    class="h-[1px] bg-[#E93372] fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="rulerSnap.snapLines?.lineBottom"
    :style="{
      top: rulerSnap.snapLines?.lineBottom + 'px',
      left: rulerSnap.rulerPosition.left + 'px',
      width:
        rulerSnap.rulerPosition.right - rulerSnap.rulerPosition.left + 'px',
    }"
    class="h-[1px] bg-[#E93372] fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="rulerSnap.snapLines?.lineLeft"
    :style="{
      left: rulerSnap.snapLines?.lineLeft + 'px',
      top: rulerSnap.rulerPosition.top + 'px',
      height:
        rulerSnap.rulerPosition.bottom - rulerSnap.rulerPosition.top + 'px',
    }"
    class="w-[1px] bg-[#E93372] fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="rulerSnap.snapLines?.lineMiddleX"
    :style="{
      left: rulerSnap.snapLines?.lineMiddleX + 'px',
      top: rulerSnap.rulerPosition.top + 'px',
      height:
        rulerSnap.rulerPosition.bottom - rulerSnap.rulerPosition.top + 'px',
    }"
    class="w-[1px] bg-[#E93372] fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="rulerSnap.snapLines?.lineRight"
    :style="{
      left: rulerSnap.snapLines?.lineRight + 'px',
      top: rulerSnap.rulerPosition.top + 'px',
      height:
        rulerSnap.rulerPosition.bottom - rulerSnap.rulerPosition.top + 'px',
    }"
    class="w-[1px] bg-[#E93372] fixed pointer-events-none overflow-visible"
  ></div>
</template>

<script setup lang="ts">
import { useRulerSnapStore } from "~~/src/stores/rulerSnap";

const rulerSnap = useRulerSnapStore();
</script>
