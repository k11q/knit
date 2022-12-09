<template>
  <template v-for="node in nodes" :key="node.id">
    <component
      :is="node.type === 'text' || node.type === 'box' ? 'div' : node.type"
      :style="{
        ...styleProps(node),
        width: depth === 1 ? '100%' : styleProps(node).width,
        overflowX: 'hidden',
        left: depth === 1 ? '' : styleProps(node).left,
        top: depth === 1 ? '' : styleProps(node).top,
      }"
    >
      <template v-if="node.type === 'text'">
        <div v-html="node.textContent"></div>
      </template>
      <PreviewUIBrowser
        v-if="(node.children && node.type === 'div') || node.type === 'box'"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </component>
  </template>
</template>

<script setup lang="ts">
import { Node } from "~~/src/stores/counter";

const props = defineProps({
  modelValue: String,
  nodes: Array<Node>,
  depth: {
    type: Number,
    default: 1,
  },
});

function styleProps(node: Node) {
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
    paddingRight:
      node.cssRules[0]?.style?.paddingRight?.value! +
      node.cssRules[0]?.style?.paddingRight?.unit!,
    paddingTop:
      node.cssRules[0]?.style?.paddingTop?.value! +
      node.cssRules[0]?.style?.paddingTop?.unit!,
    paddingBottom:
      node.cssRules[0]?.style?.paddingBottom?.value! +
      node.cssRules[0]?.style?.paddingBottom?.unit!,
  };
}
</script>
