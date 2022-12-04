<template>
  <div class="flex flex-col">
    <!-- Stroke section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col gap-4 border-y py-4 px-4 border-[#040407]"
    >
      <div class="flex flex-row justify-between">
        <p class="font-medium">Stroke</p>
        <div
          v-if="
            !selectToi.selectedBoxData.strokeSize ||
            !selectToi.selectedBoxData.strokeColor
          "
          class="aspect-square h-full flex flex-col justify-center items-center"
          @click="
            () => {
              selectToi.selectedBoxData.strokeColor = 'black';
              selectToi.selectedBoxData.strokeSize = 1;
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      <div
        v-if="
          selectToi.selectedBoxData.strokeSize &&
          selectToi.selectedBoxData.strokeColor
        "
        class="flex flex-col gap-4"
      >
        <div class="flex flex-row gap-3 flex-none justify-between w-full">
          <div class="flex flex-row gap-0.5 justify-start items-center w-2/3">
            <div
              class="h-full aspect-square items-center flex flex-none"
              :style="{
                'background-color': selectToi.selectedBoxData.strokeColor,
              }"
            ></div>
            <input
              type="text"
              v-model="selectToi.selectedBoxData.strokeColor"
              class="w-full px-2 bg-transparent"
              placeholder="transparent"
            />
            <input
              type="text"
              value="100%"
              class="w-full px-2 bg-transparent"
            />
          </div>
          <div class="flex flex-row gap-2 flex-none justify-end">
            <div class="aspect-square h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>

            <div
              class="aspect-square h-full flex flex-col items-center justify-center"
              @click="
                () => {
                  selectToi.selectedBoxData.strokeColor = '';
                  selectToi.selectedBoxData.strokeSize = 0;
                }
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-3 flex-none justify-between w-full">
          <div class="flex flex-row gap-0.5 justify-between w-full">
            <input
              type="text"
              v-model="selectToi.selectedBoxData.strokeType"
              class="w-full bg-transparent"
            />
            <div class="flex flex-row w-1/2 flex-none px-2">
              <div class="h-full aspect-square items-center flex flex-none">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4H2"
                    stroke="black"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 7H4"
                    stroke="black"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 10H5"
                    stroke="black"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input
                type="number"
                v-model="selectToi.selectedBoxData.strokeSize"
                class="w-full px-2 bg-transparent"
                placeholder="0"
              />
            </div>
          </div>
          <div class="flex flex-row gap-2 flex-none justify-end">
            <div class="aspect-square h-full">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.97058 1.76465H11.4706M13.2353 3.97053V11.4705M2.20587 3.97053V11.4705M3.97058 13.2352H11.4706"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div class="aspect-square h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pre>
            {{ selectToi.selectedBoxData }}
          </pre
    >
  </div>
</template>

<script setup>
import { useCounterStore } from "~~/src/stores/counter";

const selectToi = useCounterStore();
</script>
