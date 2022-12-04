<template>
  <!-- Text section! -->
  <div
    v-show="selectToi.selectedBoxData.type === 'text' && selectToi.selectedBox"
    class="flex flex-col gap-3 border-y py-4 px-4 border-[#040407]"
  >
    <p class="font-medium">Text</p>

    <div class="flex flex-row gap-3 flex-none justify-between w-full h-6">
      <div class="flex flex-row gap-0.5 justify-between w-full">
        <select type="text" class="w-full bg-transparent -ml-1">
          <option value="Inter">Inter</option>
        </select>
      </div>
      <div class="flex flex-row gap-2 flex-none justify-end">
        <div class="aspect-square h-full flex-none"></div>
      </div>
    </div>
    <div class="flex flex-row justify-between flex-grow h-6">
      <div class="flex flex-row flex-grow w-full">
        <select class="flex bg-transparent -ml-1 focus:outline-none flex-grow">
          <option value="Medium">Medium</option>
        </select>
      </div>
      <div class="flex flex-row flex-grow w-full">
        <div class="aspect-square h-full flex-none"></div>
        <input
          type="number"
          :value="parseInt(selectToi.selectedBoxData.attr?.style.fontSize, 10)"
          @input="
            (event) => {
              selectToi.selectedBoxData.attr.style.fontSize =
                event.target.value + 'px';
            }
          "
          class="w-full px-2 bg-transparent"
        />
      </div>
      <div class="aspect-square h-full flex-none"></div>
    </div>
    <div class="flex flex-row justify-between flex-grow">
      <div class="flex flex-row flex-grow -ml-1">
        <div
          class="h-6 justify-center aspect-square items-center flex flex-none opacity-60"
        >
          <UIIcon name="line-height" :size="15" />
        </div>
        <input
          type="text"
          :value="selectToi.selectedBoxData.attr?.style.lineHeight"
          @input="
            (event) => {
              selectToi.selectedBoxData.attr.style.lineHeight =
                event.target.value;
            }
          "
          placeholder="Auto"
          class="w-full pl-2 bg-transparent"
        />
      </div>
      <div class="flex flex-row flex-grow -ml-1">
        <div
          class="h-6 justify-center aspect-square items-center flex flex-none opacity-60"
        >
          <UIIcon name="letter-spacing" :size="15" />
        </div>
        <input type="text" value="0%" class="w-full pl-2 bg-transparent" />
      </div>
      <div class="aspect-square h-6 flex-none"></div>
    </div>
    <div class="flex flex-row justify-between flex-grow">
      <div class="flex flex-row flex-grow w-full -ml-1">
        <div
          class="h-6 justify-center rounded aspect-square items-center flex flex-none opacity-60"
        >
          <UIIcon name="paragraph-spacing" :size="15" />
        </div>
        <input type="number" value="0" class="w-full pl-2 bg-transparent" />
      </div>
      <div class="flex flex-row flex-grow w-full -ml-1">
        <div
          class="h-6 justify-center rounded aspect-square items-center flex flex-none bg-[#2E2E2E]"
        >
          <UIIcon name="auto-width" :size="15" />
        </div>
        <div
          class="h-6 opacity-60 justify-center rounded aspect-square items-center flex flex-none"
        >
          <UIIcon name="auto-height" :size="15" />
        </div>
        <div
          class="h-6 justify-center rounded aspect-square items-center flex flex-none opacity-60"
        >
          <UIIcon name="square" :size="15" />
        </div>
      </div>
      <div class="aspect-square h-6 flex-none"></div>
    </div>
    <div class="flex flex-row justify-between flex-grow">
      <div class="flex flex-row flex-grow w-full -ml-1">
        <UIVTooltip>
          <template #tooltip>
            <p class="bg-[#1C1C1C] px-2 py-1 rounded whitespace-nowrap mt-1">
              Text align left
            </p>
          </template>
          <div
            class="h-6 justify-center rounded aspect-square items-center flex flex-none bg-[#2E2E2E]"
          >
            <UIIcon name="text-align-left" :size="15" />
          </div>
        </UIVTooltip>
        <UIVTooltip>
          <template #tooltip>
            <p class="bg-[#1C1C1C] px-2 py-1 rounded whitespace-nowrap mt-1">
              Text align center
            </p>
          </template>
          <div
            class="h-6 justify-center rounded aspect-square items-center flex flex-none opacity-60"
          >
            <UIIcon name="text-align-center" :size="15" />
          </div>
        </UIVTooltip>
        <UIVTooltip>
          <template #tooltip>
            <p class="bg-[#1C1C1C] px-2 py-1 rounded whitespace-nowrap mt-1">
              Text align right
            </p>
          </template>
          <div
            class="h-6 justify-center rounded aspect-square items-center flex flex-none opacity-60"
          >
            <UIIcon name="text-align-right" :size="15" />
          </div>
        </UIVTooltip>
      </div>
      <div class="flex flex-row flex-grow w-full -ml-1">
        <UIVTooltip>
          <template #tooltip>
            <p class="bg-[#1C1C1C] px-2 py-1 rounded whitespace-nowrap mt-1">
              Align top
            </p>
          </template>
          <div
            class="h-6 justify-center rounded bg-[#2E2E2E] aspect-square items-center flex flex-none"
          >
            <UIIcon name="text-align-top" :size="15" />
          </div>
        </UIVTooltip>
        <UIVTooltip>
          <template #tooltip>
            <p class="bg-[#1C1C1C] px-2 py-1 rounded whitespace-nowrap mt-1">
              Align middle
            </p>
          </template>
          <div
            class="h-6 justify-center rounded opacity-60 aspect-square items-center flex flex-none"
          >
            <UIIcon name="text-align-middle" :size="15" />
          </div>
        </UIVTooltip>
        <UIVTooltip>
          <template #tooltip>
            <p class="bg-[#1C1C1C] px-2 py-1 rounded whitespace-nowrap mt-1">
              Align bottom
            </p>
          </template>
          <div
            class="h-6 justify-center rounded opacity-60 aspect-square items-center flex flex-none"
          >
            <UIIcon name="text-align-bottom" :size="15" />
          </div>
        </UIVTooltip>
      </div>
      <div class="aspect-square flex items-center justify-center h-6 flex-none">
        <UIIcon name="more-horizontal" :size="17" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "~~/src/stores/counter";

const selectToi = useCounterStore();
</script>
