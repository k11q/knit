<template>
  <div
    id="rulerWrapper"
    class="flex-grow flex flex-col justify-start text-[#7f7f7f] text-[0.625rem] leading-[1.4] z-[999] pointer-events-none"
  >
    <div
      id="rulerHorizontal"
      class="w-full h-[1.375rem] border-b border-[#3A3A3A] bg-[#262626] relative overflow-hidden"
    >
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
      <div
        id="rulerHorizontalEdge"
        class="w-[1.375rem] border-r border-inherit left-0 h-full relative bg-[#262626]"
      ></div>
    </div>
    <div
      id="rulerVertical"
      class="h-full w-[1.375rem] border-r border-[#3A3A3A] bg-[#262626] relative overflow-hidden"
    >
      <template v-for="i in verticalMarkers">
        <div
          class="h-8 flex flex-row items-center gap-0.5 absolute left-0 right-0"
          :style="{
            top: i.position - 16 + 'px',
          }"
        >
          <span
            class="w-[14px] rotate-180"
            :style="{ writingMode: 'vertical-rl', textOrientation: 'mixed' }"
            >{{ i.value }}</span
          >
          <div class="flex-grow h-[0.0625rem] bg-[#777777]"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSquareStore } from "@/stores/dataSquare";

type MarkerPosition = {
  position: number;
  value: number;
};

const squareStore = useSquareStore();

const numberOfMarkers = ref([] as MarkerPosition[]);
const verticalMarkers = ref([] as MarkerPosition[]);

const backgroundBoxSize = computed(() => {
  if (squareStore.scale > 4) {
    return `${squareStore.scale}px ${squareStore.scale}px`;
  } else return undefined;
});

const backgroundPosition = ref("");

function setRuler() {
  const rulerHorizontal = document.getElementById("rulerHorizontal");
  const rulerVertical = document.getElementById("rulerVertical");

  const rulerHorizontalRect = rulerHorizontal?.getBoundingClientRect();
  const rulerVerticalRect = rulerVertical?.getBoundingClientRect();

  const height = rulerVerticalRect ? rulerVerticalRect.height : 0;
  const length = rulerHorizontalRect ? rulerHorizontalRect.width : 0;

  const rulerVerticalTop = rulerVerticalRect
    ? (rulerVerticalRect.top - squareStore.offsetTop) / squareStore.scale
    : 0;
  const rulerVerticalBottom = rulerVerticalRect
    ? (rulerVerticalRect.bottom - squareStore.offsetTop) / squareStore.scale
    : 0;
  const left = rulerHorizontalRect
    ? (rulerHorizontalRect.left - squareStore.offsetLeft) / squareStore.scale
    : 0;
  const right = rulerHorizontalRect
    ? (rulerHorizontalRect.right - squareStore.offsetLeft) / squareStore.scale
    : 0;

  const array: MarkerPosition[] = [];
  const arrayVertical: MarkerPosition[] = [];

  let positionLeft = (-left / (right - left)) * length;
  let positionTop =
    (-rulerVerticalTop / (rulerVerticalBottom - rulerVerticalTop)) * height +
    22;
  backgroundPosition.value =
    squareStore.scale > 4
      ? `${positionLeft}px ${positionTop}px, ${positionLeft}px ${positionTop}px`
      : "";

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
        for (let i = 0; i < rulerVerticalBottom; i = i + 5000) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -5000; i > rulerVerticalTop; i = i - 5000) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 2500) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -2500; i > rulerVerticalTop; i = i - 2500) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 1000) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -1000; i > rulerVerticalTop; i = i - 1000) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 500) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -500; i > rulerVerticalTop; i = i - 500) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 250) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -250; i > rulerVerticalTop; i = i - 250) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 100) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -100; i > rulerVerticalTop; i = i - 100) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 50) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -50; i > rulerVerticalTop; i = i - 50) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 25) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -25; i > rulerVerticalTop; i = i - 25) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 10) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -10; i > rulerVerticalTop; i = i - 10) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 5) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -5; i > rulerVerticalTop; i = i - 5) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 2) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -2; i > rulerVerticalTop; i = i - 2) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
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
        for (let i = 0; i < rulerVerticalBottom; i = i + 1) {
          if (i > rulerVerticalTop) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
        for (let i = -1; i > rulerVerticalTop; i = i - 1) {
          if (i < rulerVerticalBottom) {
            let positionMarker = i;
            arrayVertical.push({
              position:
                ((-rulerVerticalTop + positionMarker) /
                  (rulerVerticalBottom - rulerVerticalTop)) *
                height,
              value: i,
            });
          } else continue;
        }
      })
      .then(() => {
        numberOfMarkers.value = [...array];
        verticalMarkers.value = [...arrayVertical];
      });
  }
}

watchEffect(
  () => {
    setRuler();
  },
  { flush: "post" }
);
</script>

<style scoped>
#rulerHorizontalEdge::after {
  width: 50px;
  height: 100%;
  background-image: linear-gradient(
    to right,
    #262626,
    #26262680 30%,
    transparent
  );
  mix-blend-mode: darken;
  display: inline-block;
  content: "";
  position: absolute;
  left: 100%;
  margin-left: 1px;
}

#rulerVertical::after {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(
    to bottom,
    #262626,
    #26262680 30%,
    transparent
  );
  mix-blend-mode: darken;
  display: inline-block;
  content: "";
  position: absolute;
  top: 0;
}

#rulerWrapper {
  background-image: linear-gradient(
      to right,
      transparent,
      transparent calc(100% - 0.6px),
      #97979740 0.6px,
      #97979740
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent calc(100% - 0.6px),
      #97979740 0.6px,
      #97979740
    );
  background-size: v-bind(backgroundBoxSize);
  background-position: v-bind(backgroundPosition);
  mix-blend-mode: initial;
}
</style>
