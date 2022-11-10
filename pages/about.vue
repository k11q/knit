<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs bg-neutral-200"
  >
    <TopBar />

    <!--Main section-->
    <div class="flex flex-row justify-between">
      <LeftSidePanel />
      <!--Canvas section-->

      <Canvas />
      <RightSidePanel />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { useCanvasFF } from "../stores/canvasFreeForm";
import { useResizeStore } from "../stores/resizeStore";
import { useCanvasMarkerStore } from "../stores/canvasMarker";

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const canvasMarker = useCanvasMarkerStore();

function wheel() {
  event.preventDefault();
  console.log("e.deltaY = " + event.deltaY);
  console.log("e.deltaX = " + event.deltaX);
  console.log("e.touches = " + event.touches);

  if (event.deltaX === 0) {
    addaSquare.scale += event.deltaY * -0.01;
  }

  // Restrict scale
  addaSquare.scale = Math.min(Math.max(0.125, scale), 4);

  console.log("e.deltaY = " + event.deltaY);
  console.log("e.deltaX = " + event.deltaX);
}

onMounted(() => {
  addaSquare.offsetLeft = vw(50);
  addaSquare.offsetTop = vh(50);

  function vh(percent) {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (percent * h) / 100;
  }

  function vw(percent) {
    var w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    return (percent * w) / 100;
  }
});
</script>

<style scoped>
.item {
  height: 50px;
  width: 50px;
  position: absolute;
  background: orange;
}
</style>
