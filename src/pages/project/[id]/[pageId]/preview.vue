<template>
  <PreviewTopBar />
  <template v-for="node in [selectToi.data[paramsPageId]]" :key="node.id">
    <div
      v-if="typeFrame(node.type)"
      :style="{
        backgroundColor: node.bgColor,
        height: node.height ? node.height + node.unit : 'auto',
        width: depth === 1 ? '' : node.width ? node.width + node.unit : 'auto',
        left:
          depth === 1
            ? ''
            : node.position === 'absolute'
            ? node.X + node.Xunit
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.x,
        top:
          depth === 1
            ? ''
            : node.position === 'absolute'
            ? node.Y + node.Yunit
            : document.querySelector(
                `[data-id=${selectToi.selectedBoxData.parent}]`
              ).getBoundingClientRect.y,
        display: 'flex',
        flexDirection: node.flexDirection,
        justifyContent: selectToi.getJustify(node.justify),
        alignItems: selectToi.getAlign(node.align),
        position: depth === 1 ? '' : node.position,
        color: node.color,
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
      @mouseover="canvasDnd.checkDroppable($event, node)"
      @mousedown="selectToi.changeSelected($event, node.id)"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      class="hover:outline outline-blue-600"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
      <p
        @mousedown="selectToi.changeSelected($event, node.id)"
        class="absolute bottom-full left-0 hover:text-blue-600"
        :class="{
          'text-blue-600': selectToi.selectedBox === node.id,
          'text-neutral-400': selectToi.selectedBox !== node.id,
        }"
        :style="{
          fontSize: `${(12 * 1) / squareStore.scale}px`,
          lineHeight: 1.4,
          marginBottom: `${(2 * 1) / squareStore.scale}px`,
        }"
      >
        {{ node.id }}
      </p>
      <CanvasUIBrowser
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
        height: node.height ? node.height + node.unit : '',
        width: depth === 1 ? '' : node.width ? node.width + node.unit : '',
        left: depth === 1 ? '' : node.X + node.Xunit,
        top: depth === 1 ? '' : node.Y + node.Yunit,
        position: depth === 1 ? '' : node.position,
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
      @mouseover.stop.prevent="canvasDnd.checkDroppable($event, node)"
      @mousedown="selectToi.changeSelected($event, node.id)"
      class="hover:outline outline-blue-600"
      @mouseleave.stop.prevent="canvasDnd.removeDroppable()"
      :class="{
        ' bg-red-600': node.isDroppable == true,
        'pointer-events-none':
          selectToi.selectedBox === node.id && canvasFF.isDragging == true,
      }"
    >
      <CanvasUIBrowser
        v-if="node.children"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
    <div
      v-if="typeText(node.type)"
      class="text-center hover:decoration-blue-600 hover:underline hover:decoration-2"
      contenteditable="true"
      @mousedown="selectToi.changeSelected($event, node.id)"
      :style="{
        height: node.height + 'px',
        width: depth === 1 ? '' : node.width + 'px',
        left: depth === 1 ? '' : node.X + node.Xunit,
        top: depth === 1 ? '' : node.Y + node.Yunit,
        fontSize: node.fontSize + node.fontUnit,
        color: node.color,
        position: depth === 1 ? '' : node.position,
      }"
      :data-id="node.id"
      data-component="Text"
      :class="{
        'decoration-blue-600 underline decoration-1 ':
          selectToi.selectedBox === node.id,
      }"
    >
      {{ node.textContent }}
    </div>
  </template>
</template>

<script setup>
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
const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;

// When accessing /posts/1, route.params.id will be 1
console.log("selectoi = " + [selectToi.data[1]]);

const typeFrame = (type) => {
  if (type === "frame") {
    return true;
  } else return false;
};

const typeText = (type) => {
  if (type === "text") {
    return true;
  } else return false;
};

//dnd on canvas

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
const expanded = ref(true);
const prevX = ref("");
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
