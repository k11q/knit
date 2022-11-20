<template>
  <template v-for="node in nodes" :key="node.id">
    <template v-if="node.type === 'frame'">
      <div
        :style="{
          backgroundColor: node.bgColor,
          height: node.height ? node.height + node.unit : 'auto',
          width:
            depth === 1 ? '' : node.width ? node.width + node.unit : 'auto',
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
      >
        <DesignerCanvasUIBrowser
          v-if="node.children"
          :key="node.id"
          :nodes="node.children"
          :depth="depth + 1"
        />
      </div>
    </template>
    <template v-if="node.type === 'box'">
      <div
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
          alignItems: selectToi.getAlign(node.align),
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
      >
        <DesignerCanvasUIBrowser
          v-if="node.children"
          :key="node.id"
          :nodes="node.children"
          :depth="depth + 1"
        />
      </div>
    </template>
    <template v-if="node.type === 'text'">
      <div
        :style="{
          height: node.height + 'px',
          width: depth === 1 ? '' : node.width + 'px',
          left: depth === 1 ? '' : node.X + node.Xunit,
          top: depth === 1 ? '' : node.Y + node.Yunit,
          fontSize: node.fontSize + 'px',
          color: node.color,
          position: depth === 1 ? '' : node.position,
        }"
      >
        {{ node.textContent }}
      </div>
    </template>
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

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits("update:modelValue");
function changePageTitle(title) {
  emit("update:modelValue", title); // previously was `this.$emit('input', title)`
}
</script>
