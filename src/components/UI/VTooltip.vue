<template>
  <component
    :is="tag"
    :id="id"
    tabindex="0"
    :aria-describedby="`${id}__content`"
    :class="['vts-tooltip', classes.toggle]"
    @focus="show = true"
    @blur="show = false"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <slot />

    <span
      :id="`${id}__content`"
      role="tooltip"
      class="pointer-events-none"
      :aria-hidden="!show + ''"
      :class="[
        'vts-tooltip__content',
        {
          'vts-tooltip__content--visible': show,
        },
        classes.content,
      ]"
    >
      <slot name="tooltip" />
    </span>
  </component>
</template>

<script>
import { randomString } from "../../utils.js";
export default {
  name: "VTooltip",
  props: {
    tag: {
      type: String,
      default: "span",
    },
    id: {
      type: String,
      default: () => `vts-${randomString(4)}`,
    },
    focus: Boolean,
    classes: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    onMouseenter() {
      if (this.focus) return;
      setTimeout(() => {
        this.show = true;
      }, 800);
    },
    onMouseleave() {
      if (this.focus) return;
      setTimeout(() => {
        this.show = false;
      }, 200);
    },
  },
};
</script>

<style>
:where(.vts-tooltip) {
  position: relative;
}
:where(.vts-tooltip__content) {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-start: 50%;
  transform: translate(-50%, 0%);
}
:where(.vts-tooltip__content[aria-hidden="true"]) {
  display: none;
}
</style>
