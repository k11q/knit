<template>
  <div
    class="flex-grow flex flex-col justify-start text-[#777777] text-[0.625rem] leading-[1.4] z-[999] pointer-events-none"
  >
    <div
      id="rulerHorizontal"
      class="w-full h-[1.375rem] border-b border-[#3A3A3A] bg-[#262626] flex flex-row relative"
    >
      <div class="w-[1.375rem] border-r border-inherit"></div>
      <template v-for="i in numberOfMarkers">
        <div
          class="w-8 flex flex-col items-center gap-0.5 absolute top-0 bottom-0"
          :style="{
            left: i.position - 16 + 'px',
          }"
        >
          <span>{{ i.value }}</span>
          <div class="flex-grow w-[0.0625rem] bg-[#777777]"></div>
        </div>
      </template>
    </div>
    <div
      id="rulerVertical"
      class="h-full w-[1.375rem] border-r border-[#3A3A3A] bg-[#262626]"
    >
      <template v-for="i in verticalMarkers">
        <div
          class="w-8 flex flex-col items-center gap-0.5 absolute left-0 right-0"
          :style="{
            top: i.position - 16 + 'px',
          }"
        >
          <span>{{ i.value }}</span>
          <div class="flex-grow w-[0.0625rem] bg-[#777777]"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSquareStore } from "@/stores/dataSquare";

const squareStore = useSquareStore();

const numberOfMarkers = ref([]);
const verticalMarkers = ref([]);

watchEffect(() => {
  const rulerHorizontal = document.getElementById("rulerHorizontal");
  const rulerVertical = document.getElementById("rulerVertical");
  const rulerHorizontalRect = rulerHorizontal?.getBoundingClientRect();
  const rulerVerticalRect = rulerVertical?.getBoundingClientRect();
  const height = rulerVerticalRect?.height;
  const length = rulerHorizontalRect?.width;
  let array = [];
  let arrayVertical = [];
  const left =
    (rulerHorizontalRect?.left - squareStore.offsetLeft) / squareStore.scale;
  const right =
    (rulerHorizontalRect?.right - squareStore.offsetLeft) / squareStore.scale;
  if (squareStore.scale < 0.025) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 5000) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -5000; i > left; i = i - 5000) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 0.05 && squareStore.scale >= 0.025) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 2500) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -2500; i > left; i = i - 2500) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 0.1 && squareStore.scale >= 0.05) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 1000) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -1000; i > left; i = i - 1000) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 0.2 && squareStore.scale >= 0.1) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 500) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -500; i > left; i = i - 500) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 0.5 && squareStore.scale >= 0.2) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 250) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -250; i > left; i = i - 250) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 1 && squareStore.scale >= 0.5) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 100) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -100; i > left; i = i - 100) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 2 && squareStore.scale >= 1) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 50) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -50; i > left; i = i - 50) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 5 && squareStore.scale >= 2) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 25) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -25; i > left; i = i - 25) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 10 && squareStore.scale >= 5) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 10) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -10; i > left; i = i - 10) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 30 && squareStore.scale >= 10) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 5) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -5; i > left; i = i - 5) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale < 50 && squareStore.scale >= 30) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 2) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -2; i > left; i = i - 2) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  } else if (squareStore.scale >= 50) {
    Promise.resolve()
      .then(() => {
        for (let i = 0; i < right; i = i + 1) {
          if (i > left) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
        for (let i = -1; i > left; i = i - 1) {
          if (i < right) {
            let positionMarker = i;
            array.push({
              position: ((-left + positionMarker) / (right - left)) * length,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
      });
  }
});
</script>
