<template>
  <li class="node-tree">
    <span class="label">{{ node.label }}</span>

    <ul v-if="node.children && node.children.length">
      <node v-for="child in node.children" :node="child"></node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object,
  },
};
</script>
