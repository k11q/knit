<template>
  <div class="flex flex-col">
    <!-- selector section! -->
    <div
      v-show="selectToi.selectedBox"
      class="flex flex-col border-b pb-2 border-[#303030]"
    >
      <div class="flex flex-row px-4 py-1 items-center justify-start gap-2">
        <div class="flex flex-row flex-wrap rounded">
          <div
            class="h-6 px-3 py-1 bg-[#262626] rounded-full border border-[#303030] text-[11px] flex items-center"
          >
            <span>{{ selectToi.selectedBoxData.name }}</span>
          </div>
        </div>
        <div class="flex flex-row flex-wrap rounded">
          <div
            class="h-6 aspect-square bg-[#262626] rounded-full border border-[#303030] text-[11px] flex items-center justify-center"
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
      </div>
    </div>
    <!-- Background color  section! -->
    <div
      v-show="!selectToi.selectedBox"
      class="flex flex-col gap-4 border-b py-4 px-4 border-[#303030]"
    >
      <p class="font-medium">Background</p>
      <div class="flex flex-row gap-3 flex-none justify-between w-full">
        <div class="flex flex-row justify-start items-center w-2/3">
          <div
            class="h-full aspect-square items-center flex flex-none border"
            :style="{
              'background-color': selectToi.canvas[0].bgColor,
            }"
          ></div>
          <input
            type="text"
            v-model="selectToi.canvas[0].bgColor"
            class="w-3/4 pl-2 bg-transparent"
          />
          <input type="text" value="100%" class="w-1/2 px-2 bg-transparent" />
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!--Dimensions section-->
    <div
      v-show="selectToi.selectedBox"
      class="flex flex-col pt-2 pb-4 border-[#303030]"
    >
      <div class="h-8 flex flex-row justify-between items-center pl-4 pr-2">
        <p class="font-medium">Dimensions</p>
      </div>
      <div class="flex flex-row h-8 gap-2 pl-4 pr-2">
        <div class="flex flex-row justify-start items-center w-1/2">
          <div
            class="h-[18px] aspect-square items-center flex flex-none cursor-ew-resize"
            @mousedown.stop.prevent="
              useSlider(
                $event,
                1,
                selectToi.selectedBoxData.id,
                selectToi.selectedBoxData.type
              ).left()
            "
          >
            <p class="opacity-40 text-center w-full">X</p>
          </div>
          <input
            type="number"
            :placeholder="
              selectToi.selectedBoxData.attr?.style.left
                ? parseInt(selectToi.selectedBoxData.attr?.style.left)
                : useGetElement(selectToi.selectedBoxData.id)?.offsetLeft
            "
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.left =
                  event.target.value + 'px';
              }
            "
            class="w-2/3 pl-2 bg-transparent placeholder-[#707070]"
          />
        </div>
        <div class="flex flex-row justify-start items-center w-1/2">
          <div
            class="h-[18px] aspect-square items-center flex flex-none cursor-ew-resize"
            @mousedown.stop.prevent="
              useSlider(
                $event,
                1,
                selectToi.selectedBoxData.id,
                selectToi.selectedBoxData.type
              ).top()
            "
          >
            <p class="opacity-40 text-center w-full">Y</p>
          </div>
          <input
            type="number"
            :placeholder="
              selectToi.selectedBoxData.attr?.style.top
                ? parseInt(selectToi.selectedBoxData.attr?.style.top)
                : useGetElement(selectToi.selectedBoxData.id)?.offsetTop
            "
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.top =
                  event.target.value + 'px';
              }
            "
            class="w-2/3 pl-2 bg-transparent placeholder-[#707070]"
          />
        </div>
        <div class="aspect-square h-full flex justify-center items-center">
          <div
            class="h-8 aspect-square flex items-center justify-center hover:bg-[#2E2E2E] hover:opacity-100 rounded-sm"
            v-if="useCheckParent(selectToi.selectedBoxData?.id)"
            :class="{
              'bg-[#2E2E2E]':
                selectToi.selectedBoxData.attr.style.position === 'absolute',
              'opacity-100':
                selectToi.selectedBoxData.attr.style.position === 'absolute',
              'opacity-40':
                selectToi.selectedBoxData.attr.style.position !== 'absolute',
            }"
            @click="
              () => {
                if (
                  selectToi.selectedBoxData.attr.style.position != 'absolute'
                ) {
                  selectToi.selectedBoxData.attr.style.left = selectToi.getLeft(
                    selectToi.selectedBoxData.id
                  );
                  selectToi.selectedBoxData.attr.style.top = selectToi.getTop(
                    selectToi.selectedBoxData.id
                  );
                  selectToi.selectedBoxData.attr.style.position = 'absolute';
                } else {
                  selectToi.selectedBoxData.attr.style.position = 'static';
                  delete selectToi.selectedBoxData.attr.style.left;
                  delete selectToi.selectedBoxData.attr.style.top;
                }
              }
            "
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4.5L2 3C2 2.44772 2.44772 2 3 2L4.5 2"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 10.5L2 12C2 12.5523 2.44772 13 3 13H4.5"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 2L12 2C12.5523 2 13 2.44772 13 3L13 4.5"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 13L12 13C12.5523 13 13 12.5523 13 12L13 10.5"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11 7.5L4 7.5"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 4L7.5 11"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex flex-row h-8 gap-2 pl-4 pr-2">
        <div class="flex flex-row justify-start items-center w-1/2">
          <div
            class="h-[18px] aspect-square items-center flex flex-none cursor-ew-resize"
            @mousedown.stop.prevent="
              useSlider(
                $event,
                1,
                selectToi.selectedBoxData.id,
                selectToi.selectedBoxData.type
              ).width()
            "
          >
            <p class="opacity-40 text-center w-full">W</p>
          </div>
          <input
            type="number"
            :placeholder="
              Math.round(useGetElementRect(selectToi.selectedBoxData.id)?.width)
            "
            :value="
              selectToi.selectedBoxData.attr?.style.width === '100%'
                ? ''
                : parseInt(selectToi.selectedBoxData.attr?.style.width)
            "
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.width =
                  event.target.value + 'px';
              }
            "
            class="pl-2 bg-transparent w-full placeholder-[#707070]"
          />
        </div>
        <div class="flex flex-row justify-start items-center w-1/2">
          <div
            class="h-[18px] aspect-square items-center flex flex-none cursor-ew-resize"
            @mousedown.stop.prevent="
              useSlider(
                $event,
                1,
                selectToi.selectedBoxData.id,
                selectToi.selectedBoxData.type
              ).height()
            "
          >
            <p class="opacity-40 text-center w-full">H</p>
          </div>
          <input
            type="number"
            :value="
              selectToi.selectedBoxData.attr?.style.height === '100%'
                ? ''
                : parseInt(selectToi.selectedBoxData.attr?.style.height, 10)
            "
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.height =
                  event.target.value + 'px';
              }
            "
            :placeholder="
              Math.round(
                useGetElementRect(selectToi.selectedBoxData.id)?.height
              )
            "
            class="w-2/3 pl-2 bg-transparent placeholder-[#707070]"
          />
        </div>
        <div class="aspect-square h-full flex justify-center items-center">
          <div
            class="h-8 aspect-square flex items-center justify-center hover:bg-[#2E2E2E] hover:opacity-100 rounded-sm"
            :class="{
              'bg-[#2E2E2E]':
                selectToi.selectedBoxData?.attr?.style?.aspectRatio === 1,
              'opacity-100':
                selectToi.selectedBoxData?.attr?.style?.aspectRatio === 1,
              'opacity-40':
                selectToi.selectedBoxData?.attr?.style?.aspectRatio !== 1,
            }"
            @click="
              () => {
                if (!selectToi.selectedBoxData.attr.style.aspectRatio) {
                  selectToi.selectedBoxData.attr.style.aspectRatio = 1;
                  delete selectToi.selectedBoxData.attr.style.width;
                } else {
                  selectToi.selectedBoxData.attr.style.width = Math.round(
                    useGetElementRect(selectToi.selectedBoxData.id)?.width
                  );
                  selectToi.selectedBoxData.attr.style.aspectRatio = 'auto';
                  delete selectToi.selectedBoxData.attr.style.aspectRatio;
                }
              }
            "
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 5.55L4.5 4.25C4.5 3.38805 4.81607 2.5614 5.37868 1.9519C5.94129 1.34241 6.70435 1 7.5 1C8.29565 1 9.05871 1.34241 9.62132 1.9519C10.1839 2.5614 10.5 3.38805 10.5 4.25L10.5 5.55M10.5 9.45L10.5 10.75C10.5 11.612 10.1839 12.4386 9.62132 13.0481C9.05871 13.6576 8.29565 14 7.5 14C6.70435 14 5.94129 13.6576 5.37868 13.0481C4.81607 12.4386 4.5 11.612 4.5 10.75L4.5 9.45"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row h-8 gap-2 pl-4 pr-2"
        v-if="useCheckParent(selectToi.selectedBoxData?.id)"
      >
        <div class="flex flex-row justify-start items-center w-1/2">
          <div
            class="h-[24px] aspect-square items-center flex flex-none justify-center rounded-sm"
            :class="{
              'opacity-100':
                selectToi.selectedBoxData.attr?.style?.width !== '100%' &&
                selectToi.selectedBoxData.attr?.style?.width !== 'fit-content',
              'opacity-40':
                selectToi.selectedBoxData.attr?.style?.width === '100%' ||
                selectToi.selectedBoxData.attr?.style?.width === 'fit-content',
            }"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2.9502"
                y="6.25"
                width="1.1"
                height="5.5"
                fill="currentColor"
              />
              <rect
                x="13.9502"
                y="6.25"
                width="1.1"
                height="5.5"
                fill="currentColor"
              />
              <rect
                x="4.05029"
                y="9.55005"
                width="1.1"
                height="9.9"
                transform="rotate(-90 4.05029 9.55005)"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            class="h-[24px] aspect-square items-center flex flex-none justify-center -ml-[3px] hover:bg-[#2E2E2E] rounded-sm hover:opacity-100"
            @click="selectToi.selectedBoxData.attr.style.width = 'fit-content'"
            :class="{
              'opacity-100':
                selectToi.selectedBoxData.attr?.style?.width === 'fit-content',
              'opacity-40':
                selectToi.selectedBoxData.attr?.style?.width !== 'fit-content',
              'bg-[#2E2E2E]':
                selectToi.selectedBoxData.attr?.style?.width === 'fit-content',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m20 17-5-5 5-5"></path>
              <path d="m4 17 5-5-5-5"></path>
            </svg>
          </div>
          <div
            class="h-[24px] aspect-square items-center flex flex-none justify-center hover:bg-[#2E2E2E] rounded-sm hover:opacity-100"
            @click="
              () => {
                selectToi.selectedBoxData.attr.style.width = '100%';
              }
            "
            :class="{
              'opacity-100':
                selectToi.selectedBoxData.attr?.style?.width === '100%',
              'opacity-40':
                selectToi.selectedBoxData.attr?.style?.width !== '100%',
              'bg-[#2E2E2E]':
                selectToi.selectedBoxData.attr?.style?.width === '100%',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 7-5 5 5 5"></path>
              <path d="m15 7 5 5-5 5"></path>
            </svg>
          </div>
        </div>
        <div class="flex flex-row justify-start items-center w-1/2">
          <div
            class="h-[24px] aspect-square items-center flex flex-none justify-center rounded-sm"
            :class="{
              'opacity-100':
                selectToi.selectedBoxData.attr?.style?.height !== '100%' &&
                selectToi.selectedBoxData.attr?.style?.height !== 'fit-content',
              'opacity-40':
                selectToi.selectedBoxData.attr?.style?.height === '100%' ||
                selectToi.selectedBoxData.attr?.style?.height === 'fit-content',
            }"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6.25"
                y="15.05"
                width="1.1"
                height="5.5"
                transform="rotate(-90 6.25 15.05)"
                fill="currentColor"
              />
              <rect
                x="6.25"
                y="4.05005"
                width="1.1"
                height="5.5"
                transform="rotate(-90 6.25 4.05005)"
                fill="currentColor"
              />
              <rect
                x="9.5498"
                y="13.9501"
                width="1.1"
                height="9.9"
                transform="rotate(180 9.5498 13.9501)"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            class="h-[24px] aspect-square items-center flex flex-none justify-center -ml-[3px] hover:bg-[#2E2E2E] rounded-sm hover:opacity-100"
            @click="selectToi.selectedBoxData.attr.style.height = 'fit-content'"
            :class="{
              'opacity-100':
                selectToi.selectedBoxData.attr?.style?.height === 'fit-content',
              'bg-[#2E2E2E]':
                selectToi.selectedBoxData.attr?.style?.height === 'fit-content',
              'opacity-40':
                selectToi.selectedBoxData.attr?.style?.height !== 'fit-content',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m7 20 5-5 5 5"></path>
              <path d="m7 4 5 5 5-5"></path>
            </svg>
          </div>
          <div
            class="h-[24px] aspect-square items-center flex flex-none justify-center hover:bg-[#2E2E2E] rounded-sm hover:opacity-100"
            @click="
              () => {
                selectToi.selectedBoxData.attr.style.height = '100%';
              }
            "
            :class="{
              'opacity-100':
                selectToi.selectedBoxData.attr?.style?.height === '100%',
              'bg-[#2E2E2E]':
                selectToi.selectedBoxData.attr?.style?.height === '100%',
              'opacity-40':
                selectToi.selectedBoxData.attr?.style?.height !== '100%',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m7 15 5 5 5-5"></path>
              <path d="m7 9 5-5 5 5"></path>
            </svg>
          </div>
        </div>

        <div class="aspect-square h-full"></div>
      </div>
      <div class="flex flex-row h-8 gap-2 pl-4 pr-2">
        <div class="flex flex-row gap-0.5 justify-start items-center">
          <div
            class="h-[18px] aspect-square items-center flex flex-none justify-center opacity-40 cursor-ew-resize"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 2L3 11C3 11.5523 3.44772 12 4 12L13 12"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 13L8 12C8 9.23858 5.76142 7 3 7L2 7"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <input
            type="number"
            placeholder="0"
            v-model="selectToi.selectedBoxData.rotation"
            class="w-2/3 px-2 bg-transparent placeholder-[#707070]"
          />
        </div>
        <div class="flex flex-row gap-0.5 justify-start items-center">
          <div
            class="h-[18px] aspect-square items-center flex flex-none justify-center opacity-40 cursor-ew-resize"
            @mousedown.stop.prevent="
              useSlider(
                $event,
                1,
                selectToi.selectedBoxData.id,
                selectToi.selectedBoxData.type
              ).borderRadius()
            "
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2.50001L7 2.50001C4.23857 2.50001 2 4.73859 2 7.50001L2 13"
                stroke="currentColor"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <input
            type="number"
            :value="
              parseInt(selectToi.selectedBoxData.attr?.style.borderRadius, 10)
            "
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.borderRadius =
                  event.target.value + 'px';
              }
            "
            placeholder="0"
            class="w-2/3 px-2 bg-transparent placeholder-[#707070]"
          />
        </div>

        <div class="aspect-square h-full"></div>
      </div>
    </div>
    <!-- Layout section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col pt-2 pb-3 border-[#303030] border-t"
    >
      <div
        class="h-8 pl-4 pr-2 mb-2 justify-between items-center grid grid-cols-7"
      >
        <p class="font-medium col-span-3">Auto layout</p>
        <div
          class="flex flex-row bg-[#222222] border-[#3E3E3E] border rounded-sm items-center col-span-4"
        >
          <div
            class="flex items-center px-4 py-1 bg-[#2E2E2E] w-full justify-center"
          >
            Flex
          </div>
          <div
            class="flex items-center px-4 py-1 w-full justify-center text-[#C0C0C0]"
          >
            Grid
          </div>
        </div>
      </div>
      <div class="pl-4 pr-2 grid w-full grid-cols-7">
        <div class="flex flex-row justify-between col-span-6">
          <div class="flex flex-col w-1/2 flex-none">
            <div class="flex flex-row gap-2 items-center h-8">
              <div
                class="h-[24px] aspect-square items-center flex flex-none justify-center -ml-[3px] hover:bg-[#2E2E2E] rounded-sm hover:opacity-100"
                @click="
                  selectToi.selectedBoxData.attr.style.flexDirection = 'column'
                "
                :class="{
                  'opacity-100':
                    selectToi.selectedBoxData.attr?.style?.flexDirection ===
                    'column',
                  'opacity-40':
                    selectToi.selectedBoxData.attr?.style?.flexDirection !==
                    'column',
                  'bg-[#2E2E2E]':
                    selectToi.selectedBoxData.attr?.style?.flexDirection ===
                    'column',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
              <div
                class="h-[24px] aspect-square items-center flex flex-none justify-center -ml-[3px] hover:bg-[#2E2E2E] rounded-sm hover:opacity-100"
                @click="
                  selectToi.selectedBoxData.attr.style.flexDirection = 'row'
                "
                :class="{
                  'opacity-100':
                    selectToi.selectedBoxData.attr?.style?.flexDirection ===
                    'row',
                  'opacity-40':
                    selectToi.selectedBoxData.attr?.style?.flexDirection !==
                    'row',
                  'bg-[#2E2E2E]':
                    selectToi.selectedBoxData.attr?.style?.flexDirection ===
                    'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
            <div class="flex flex-row items-center h-8">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
                @mousedown.stop.prevent="
                  useSlider(
                    $event,
                    1,
                    selectToi.selectedBoxData.id,
                    selectToi.selectedBoxData.type
                  ).gap()
                "
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 13V12C13 11.4477 12.5535 11 12.0012 11C8.82491 11 4.82642 11 2.99668 11C2.44439 11 2 11.4477 2 12V13"
                    stroke="currentColor"
                    stroke-width="0.9375"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 2V3C13 3.55228 12.5523 4 12 4H3C2.44771 4 2 3.55228 2 3V2"
                    stroke="currentColor"
                    stroke-width="0.9375"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 7.5L4 7.5"
                    stroke="currentColor"
                    stroke-width="0.9375"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input
                type="number"
                :value="parseInt(selectToi.selectedBoxData.attr?.style.gap, 10)"
                @input="
                  (event) => {
                    selectToi.selectedBoxData.attr.style.gap =
                      event.target.value + 'px';
                  }
                "
                placeholder="0"
                class="w-full pl-2 bg-transparent placeholder-[#707070]"
              />
            </div>
            <div class="flex flex-row items-center h-8 pt-2">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="9" y="7" width="6" height="10" rx="2"></rect>
                  <path d="M4 22V2"></path>
                  <path d="M20 22V2"></path>
                </svg>
              </div>
              <input
                type="number"
                :value="
                  parseInt(
                    selectToi.selectedBoxData.attr?.style.paddingLeft,
                    10
                  )
                "
                @input="
                  (event) => {
                    (selectToi.selectedBoxData.attr.style.paddingLeft =
                      event.target.value + 'px'),
                      (selectToi.selectedBoxData.attr.style.paddingRight =
                        event.target.value + 'px');
                  }
                "
                placeholder="0"
                class="w-full pl-2 bg-transparent placeholder-[#707070]"
              />
            </div>
          </div>
          <div class="flex flex-col w-1/2">
            <div
              v-if="
                !selectToi.selectedBoxData.attr?.style.flexDirection ||
                selectToi.selectedBoxData.attr?.style.flexDirection === 'column'
              "
              class="h-16 w-16 border rounded-sm border-[#3E3E3E] bg-[#222222] aspect-square grid grid-cols-3 flex-none items-start"
            >
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('start');
                  selectToi.changeJustify('start');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'start' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'start'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute top-0.5 left-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      (selectToi.selectedBoxData.attr?.style.alignItems ===
                        'start' &&
                        selectToi.selectedBoxData.attr?.style.justifyContent ===
                          'start') ||
                      (!selectToi.selectedBoxData.attr?.style.alignItems &&
                        !selectToi.selectedBoxData.attr?.style.justifyContent),
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'start') ||
                      (selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'start' &&
                        (selectToi.selectedBoxData.attr?.style.alignItems ||
                          selectToi.selectedBoxData.attr?.style
                            .justifyContent)),
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.5"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('center');
                  selectToi.changeJustify('start');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'center' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'start'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none top-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'center' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'start',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'center') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'start',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="6"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('end');
                  selectToi.changeJustify('start');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'end' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'start'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none top-0.5 right-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'end' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'start',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'end') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'start',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6.5"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('start');
                  selectToi.changeJustify('center');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'start' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'center'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none left-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'start' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'center',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'start') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'center',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.5"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('center');
                  selectToi.changeJustify('center');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'center' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'center'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute inset-0 flex-none text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'center' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'center',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'center') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'center',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="6"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('end');
                  selectToi.changeJustify('center');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'end' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'center'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none right-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'end' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'center',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'end') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'center',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6.5"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('start');
                  selectToi.changeJustify('end');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'start' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'end'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none left-0.5 bottom-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'start' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'end',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'start') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'end',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.5"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('center');
                  selectToi.changeJustify('end');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'center' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'end'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none bottom-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'center' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'end',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'center') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'end',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="6"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('end');
                  selectToi.changeJustify('end');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'end' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'end'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none right-0.5 bottom-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'end' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'end',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'end') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'end',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6.5"
                    y="1"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="1.5"
                    y="7"
                    width="15"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="10.5"
                    y="13"
                    width="6"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              v-if="
                selectToi.selectedBoxData.attr?.style.flexDirection &&
                selectToi.selectedBoxData.attr?.style.flexDirection === 'row'
              "
              class="h-16 w-16 border rounded-sm border-[#3E3E3E] bg-[#222222] aspect-square grid grid-cols-3 flex-none items-start"
            >
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('start');
                  selectToi.changeJustify('start');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'start' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'start'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute top-0.5 left-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      (selectToi.selectedBoxData.attr?.style.alignItems ===
                        'start' &&
                        selectToi.selectedBoxData.attr?.style.justifyContent ===
                          'start') ||
                      (!selectToi.selectedBoxData.attr?.style.alignItems &&
                        !selectToi.selectedBoxData.attr?.style.justifyContent),
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'start') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'start',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="0.75"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="0.75"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 0.75)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('start');
                  selectToi.changeJustify('center');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'start' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'center'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none top-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'start' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'center',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'start') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'center',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="0.75"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="0.75"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 0.75)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('start');
                  selectToi.changeJustify('end');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'start' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'end'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none top-0.5 right-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'start' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'end',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'start') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'end',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="0.75"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="0.75"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 0.75)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('center');
                  selectToi.changeJustify('start');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'center' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'start'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none left-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'center' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'start',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'center') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'start',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="5.69995"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 5.69995)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="3.5"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 3.5)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('center');
                  selectToi.changeJustify('center');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'center' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'center'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute inset-0 flex-none text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'center' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'center',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'center') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'center',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="5.69995"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 5.69995)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="3.5"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 3.5)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('center');
                  selectToi.changeJustify('end');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'center' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'end'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none right-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'center' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'end',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'center') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'end',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="5.69995"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 5.69995)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="3.5"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 3.5)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('end');
                  selectToi.changeJustify('start');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'end' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'start'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none left-0.5 bottom-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'end' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'start',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'end') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'start',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="10.65"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 10.65)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="6.25"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 6.25)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('end');
                  selectToi.changeJustify('center');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'end' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'center'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none bottom-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'end' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'center',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'end') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'center',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="10.65"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 10.65)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="6.25"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 6.25)"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                class="aspect-square flex flex-row items-center justify-center relative"
                @click="
                  selectToi.changeAlign('end');
                  selectToi.changeJustify('end');
                "
              >
                <div
                  v-show="
                    selectToi.selectedBoxData.attr?.style.alignItems !==
                      'end' ||
                    selectToi.selectedBoxData.attr?.style.justifyContent !==
                      'end'
                  "
                  class="h-0.5 aspect-square rounded-full bg-[#505050]"
                ></div>
                <svg
                  class="absolute flex-none right-0.5 bottom-0.5 text-[#6EB0E0]"
                  :class="{
                    'opacity-100 ':
                      selectToi.selectedBoxData.attr?.style.alignItems ===
                        'end' &&
                      selectToi.selectedBoxData.attr?.style.justifyContent ===
                        'end',
                    'opacity-0 hover:opacity-30':
                      (selectToi.selectedBoxData &&
                        selectToi.selectedBoxData.attr?.style.alignItems !==
                          'end') ||
                      selectToi.selectedBoxData.attr?.style.justifyContent !==
                        'end',
                  }"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="17.8"
                    y="10.65"
                    width="6.6"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 17.8 10.65)"
                    fill="currentColor"
                  />
                  <rect
                    x="11.2"
                    y="0.75"
                    width="16.5"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 11.2 0.75)"
                    fill="currentColor"
                  />
                  <rect
                    x="4.59998"
                    y="6.25"
                    width="11"
                    height="4.4"
                    rx="1.1"
                    transform="rotate(90 4.59998 6.25)"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 items-center w-fit h-8 pt-2">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="7" y="9" width="10" height="6" rx="2"></rect>
                  <path d="M22 20H2"></path>
                  <path d="M22 4H2"></path>
                </svg>
              </div>

              <div class="aspect-square items-center flex flex-none h-[18px]">
                <input
                  type="number"
                  :value="
                    parseInt(
                      selectToi.selectedBoxData.attr?.style.paddingBottom,
                      10
                    )
                  "
                  @input="
                    (event) => {
                      (selectToi.selectedBoxData.attr.style.paddingBottom =
                        event.target.value + 'px'),
                        (selectToi.selectedBoxData.attr.style.paddingTop =
                          event.target.value + 'px');
                    }
                  "
                  placeholder="0"
                  class="w-8 bg-transparent placeholder-[#707070]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end justify-start col-span-1">
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded mt-1"
            @click="
              () => {
                customCSS = !customCSS;
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Layout section2! padding n margin 
          <div v-show="selectToi.selectedBox" class="flex flex-col gap-4 border-b pt-4 pb-4 border-[#303030]">
            <div class="flex flex-col flex-none justify-between mx-4 border border-gray-300 rounded-xl">
              <div class="flex flex-row w-full">
                <div class="w-1/5 border-b border-gray-300 h-8 skew-y-[30deg] translate-y-[-10px] translate-x-[-1px]"></div>
                <div class="w-3/5 border-gray-300 h-8 flex flex-row justify-center items-center">
                  <input type="number" placeholder="0" class="inline-block text-center w-10 py-1 px-2" v-model="selectToi.selectedBoxData.marginTop">
                </div>
                <div class="w-1/5 border-b border-gray-300 h-8 skew-y-[-30deg] translate-y-[-12px] translate-x-[1px]"></div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/5 border-gray-300 h-20 flex flex-row justify-center items-center">
                  <input type="number" placeholder="0" class="inline-block text-center w-10 py-1 px-2" v-model="selectToi.selectedBoxData.marginLeft">
                </div>
                <div class="w-3/5 h-20 border border-gray-300 rounded-md">
                  <div
                    class="flex flex-col flex-none justify-between w-full h-full"
                  >
                    <div class="flex flex-row flex-none w-full h-7">
                      <div
                        class="w-12 flex border-b border-gray-300 skew-y-[28deg] translate-y-[-10px] translate-x-[0px]"
                      ></div>
                      <div class=" border-gray-300 flex flex-row justify-center items-center">
                        <input type="number" placeholder="0" v-model="selectToi.selectedBoxData.paddingTop" class="inline-block text-center w-10 py-1 px-2">
                      </div>
                      <div class="w-12 flex border-b border-gray-300 skew-y-[-30deg] translate-y-[-10px] translate-x-[-4px]"></div>
                    </div>
                    <div class="flex flex-row w-full">
                      <div class="w-12 flex flex-none border-gray-300  flex-row justify-center items-center">
                        <input type="number" placeholder="0" v-model="selectToi.selectedBoxData.paddingLeft" class="inline-block text-center w-10 py-1 px-2">
                      </div>
                      <div class=" w-10 border border-gray-300 flex rounded flex-row justify-center items-center opacity-40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </div>
                      <div class="w-12 flex flex-none border-gray-300  flex-row justify-center items-center">
                        <input type="number" placeholder="0" v-model="selectToi.selectedBoxData.paddingRight" class="inline-block text-center w-10 py-1 px-2">
                      </div>
                    </div>
                    <div class="flex flex-row w-full h-7">
                      <div class="w-12 flex flex-none border-t border-gray-300 skew-y-[-28deg] translate-y-[10px] translate-x-[0px]"></div>
                      <div class="border-gray-300 flex flex-row justify-center items-center">
                        <input type="number" placeholder="0" v-model="selectToi.selectedBoxData.paddingBottom" class="inline-block text-center w-10 py-1 px-2">
                      </div>
                      <div class="w-12 flex-row border-t border-gray-300 skew-y-[30deg] translate-y-[10px] translate-x-[-4px]"></div>
                    </div>
                  </div>
                </div>
                <div class="w-1/5 border-gray-300 h-20 flex flex-row justify-center items-center">
                  <input type="number" placeholder="0" class="inline-block text-center w-10 py-1 px-2" v-model="selectToi.selectedBoxData.marginRight">
                </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/5 border-t skew-y-[-30deg] translate-y-[12px] translate-x-[-1px] border-gray-300 h-8">
                </div>
                <div class="w-3/5 border-gray-300 h-8 flex flex-row justify-center items-center">
                  <input type="number" placeholder="0" class="inline-block text-center w-10 py-1 px-2" v-model="selectToi.selectedBoxData.marginBottom">
                </div>
                <div class="w-1/5 border-t border-gray-300 h-8 skew-y-[30deg] translate-y-[12px] translate-x-[1px]">
                
                </div>
              </div>
            </div>
          </div> ! -->

    <!--layer section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col border-y pt-2 pb-3 border-[#303030]"
    >
      <div class="flex flex-row justify-between items-center h-8 pl-4 pr-2">
        <p class="font-medium">Layer</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
          @click="
            () => {
              customCSS = !customCSS;
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
        class="flex flex-row justify-between w-full h-8 pl-4 pr-2 items-center"
      >
        <div
          class="flex flex-row gap-[6px] justify-between items-center w-full"
        >
          <div
            class="h-[14px] aspect-square items-center flex flex-none opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
              ></path>
            </svg>
          </div>
          <select class="bg-transparent flex-grow">
            <option>Pass through</option>
            <option>Normal</option>
          </select>
          <input
            type="text"
            value="100%"
            class="w-12 pl-2 bg-transparent self-end"
          />
        </div>
        <div class="flex flex-row flex-none items-center">
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Fill color  section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col border-b pt-2 pb-3 border-[#303030]"
    >
      <div class="flex flex-row justify-between items-center h-8 pl-4 pr-2">
        <p class="font-medium">Fill</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
          @click="
            () => {
              customCSS = !customCSS;
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
        class="flex flex-row gap-1 justify-between w-full h-8 pl-4 pr-2 items-center"
      >
        <div class="flex flex-row gap-0.5 justify-start items-center w-2/3">
          <div
            class="h-[14px] aspect-square items-center flex flex-none"
            :style="{
              'background-color':
                selectToi.selectedBoxData.attr?.style.backgroundColor,
            }"
          ></div>
          <input
            type="text"
            @keyup="$event.stopImmediatePropagation()"
            :value="selectToi.selectedBoxData.attr?.style.backgroundColor"
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.backgroundColor =
                  event.target.value;
              }
            "
            class="w-full px-2 bg-transparent"
          />
          <input type="text" value="100%" class="w-full px-2 bg-transparent" />
        </div>
        <div class="flex flex-row flex-none items-center">
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>

          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Position section! -->
    <div
      v-show="
        selectToi.selectedBoxData &&
        useGetElement(selectToi.selectedBoxData.id)?.parentElement?.dataset
          .id !== 'canvas'
      "
      class="flex flex-col pt-2 pb-3 border-[#303030] border-b"
    >
      <div class="h-8 pl-4 pr-2 flex flex-row justify-between items-center">
        <p class="font-medium col-span-3">Position</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
          @click="
            () => {
              customCSS = !customCSS;
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
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>
      <div class="pl-4 pr-2 grid w-full grid-cols-7 pt-1">
        <div class="flex flex-row justify-between col-span-6">
          <div class="flex flex-col w-1/2">
            <div
              class="h-16 w-16 border rounded-sm border-[#3E3E3E] bg-[#222222] aspect-square flex flex-col flex-none items-start"
            >
              <div class="w-full flex justify-center">
                <div
                  class="h-3 aspect-square flex items-center justify-center py-0.5 hover:bg-[#6EB0E0] hover:bg-opacity-30"
                >
                  <div class="bg-[#6EB0E0] h-full w-1"></div>
                </div>
              </div>
              <div class="w-full flex flex-grow justify-center items-center">
                <div
                  class="h-3 aspect-square flex items-center justify-center px-0.5 hover:bg-[#6EB0E0] hover:bg-opacity-30"
                >
                  <div class="bg-[#6EB0E0] w-full h-1"></div>
                </div>
                <div
                  class="flex-grow h-full border rounded-sm aspect-square relative"
                >
                  <div
                    class="bg-[#EDEDED] h-4 w-[1px] top-1/2 -mt-2 -ml-[0.5px] left-1/2 absolute"
                  ></div>
                  <div
                    class="bg-[#EDEDED] h-[1px] w-4 top-1/2 -mt-[0.5px] -ml-2 left-1/2 absolute"
                  ></div>
                </div>
                <div
                  class="h-3 aspect-square flex items-center justify-center px-0.5 hover:bg-[#6EB0E0] hover:bg-opacity-30"
                >
                  <div class="bg-[#EDEDED] w-full h-[1px]"></div>
                </div>
              </div>
              <div class="w-full flex justify-center">
                <div
                  class="h-3 aspect-square flex items-center justify-center py-0.5 hover:bg-[#6EB0E0] hover:bg-opacity-30"
                >
                  <div class="bg-[#EDEDED] h-full w-[1px]"></div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 items-center w-fit h-8 mt-2">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
              >
                <span>T</span>
              </div>

              <div class="aspect-square items-center flex flex-none h-[18px]">
                <input
                  type="number"
                  :value="
                    parseInt(
                      selectToi.selectedBoxData.attr?.style.paddingBottom,
                      10
                    )
                  "
                  @input="
                    (event) => {
                      (selectToi.selectedBoxData.attr.style.paddingBottom =
                        event.target.value + 'px'),
                        (selectToi.selectedBoxData.attr.style.paddingTop =
                          event.target.value + 'px');
                    }
                  "
                  placeholder="0"
                  class="w-8 bg-transparent placeholder-[#707070]"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 items-center w-fit h-8">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
              >
                <span>L</span>
              </div>

              <div class="aspect-square items-center flex flex-none h-[18px]">
                <input
                  type="number"
                  :value="
                    parseInt(
                      selectToi.selectedBoxData.attr?.style.paddingBottom,
                      10
                    )
                  "
                  @input="
                    (event) => {
                      (selectToi.selectedBoxData.attr.style.paddingBottom =
                        event.target.value + 'px'),
                        (selectToi.selectedBoxData.attr.style.paddingTop =
                          event.target.value + 'px');
                    }
                  "
                  placeholder="0"
                  class="w-8 bg-transparent placeholder-[#707070]"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col w-1/2 flex-none">
            <div class="flex flex-row items-center h-8 gap-1">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
                @mousedown.stop.prevent="
                  useSlider(
                    $event,
                    1,
                    selectToi.selectedBoxData.id,
                    selectToi.selectedBoxData.type
                  ).gap()
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
                  <path d="M5 3a2 2 0 0 0-2 2"></path>
                  <path d="M19 3a2 2 0 0 1 2 2"></path>
                  <path d="M21 19a2 2 0 0 1-2 2"></path>
                  <path d="M5 21a2 2 0 0 1-2-2"></path>
                  <path d="M9 3h1"></path>
                  <path d="M9 21h1"></path>
                  <path d="M14 3h1"></path>
                  <path d="M14 21h1"></path>
                  <path d="M3 9v1"></path>
                  <path d="M21 9v1"></path>
                  <path d="M3 14v1"></path>
                  <path d="M21 14v1"></path>
                </svg>
              </div>
              <select
                :value="selectToi.selectedBoxData.attr?.style.position"
                @change="
                  selectToi.selectedBoxData.attr.style.position =
                    $event.target.value
                "
                class="bg-transparent"
              >
                <option value="fixed">Fixed</option>
                <option value="absolute">Absolute</option>
                <option value="sticky">Sticky</option>
                <option value="static">Static</option>
              </select>
            </div>
            <div class="flex flex-row items-center h-8">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
                @mousedown.stop.prevent="
                  useSlider(
                    $event,
                    1,
                    selectToi.selectedBoxData.id,
                    selectToi.selectedBoxData.type
                  ).gap()
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
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <input
                type="number"
                :value="parseInt(selectToi.selectedBoxData.attr?.style.gap, 10)"
                @input="
                  (event) => {
                    selectToi.selectedBoxData.attr.style.gap =
                      event.target.value + 'px';
                  }
                "
                placeholder="0"
                class="w-full pl-2 bg-transparent placeholder-[#707070]"
              />
            </div>
            <div class="flex flex-row items-center h-8 mt-2">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
              >
                <span>R</span>
              </div>
              <input
                type="number"
                :value="
                  parseInt(
                    selectToi.selectedBoxData.attr?.style.paddingLeft,
                    10
                  )
                "
                @input="
                  (event) => {
                    (selectToi.selectedBoxData.attr.style.paddingLeft =
                      event.target.value + 'px'),
                      (selectToi.selectedBoxData.attr.style.paddingRight =
                        event.target.value + 'px');
                  }
                "
                placeholder="0"
                class="w-full pl-2 bg-transparent placeholder-[#707070]"
              />
            </div>
            <div class="flex flex-row items-center h-8">
              <div
                class="aspect-square items-center flex flex-col justify-center flex-none opacity-40 h-[18px] cursor-ew-resize"
              >
                <span>B</span>
              </div>
              <input
                type="number"
                :value="
                  parseInt(
                    selectToi.selectedBoxData.attr?.style.paddingLeft,
                    10
                  )
                "
                @input="
                  (event) => {
                    (selectToi.selectedBoxData.attr.style.paddingLeft =
                      event.target.value + 'px'),
                      (selectToi.selectedBoxData.attr.style.paddingRight =
                        event.target.value + 'px');
                  }
                "
                placeholder="0"
                class="w-full pl-2 bg-transparent placeholder-[#707070]"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end justify-start col-span-1"></div>
      </div>
    </div>
    <!-- stroke color  section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col border-b pt-2 pb-2 border-[#303030]"
    >
      <div class="flex flex-row justify-between items-center h-8 pl-4 pr-2">
        <p class="font-medium">Stroke</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
          @click="
            () => {
              selectToi.selectedBoxData.strokeColor = 'black';
              selectToi.selectedBoxData.strokeSize = 1;
              rightPanelStore.toggleStroke = true;
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
          rightPanelStore.toggleStroke &&
          selectToi.selectedBoxData.strokeSize &&
          selectToi.selectedBoxData.strokeColor
        "
        class="flex flex-row gap-1 justify-between w-full h-8 pl-4 pr-2 items-center"
      >
        <div class="flex flex-row gap-0.5 justify-start items-center w-2/3">
          <div
            class="h-[14px] aspect-square items-center flex flex-none"
            :style="{
              'background-color':
                selectToi.selectedBoxData.attr.style.outlineColor,
            }"
          ></div>
          <input
            type="text"
            v-model="selectToi.selectedBoxData.attr.style.outlineColor"
            class="w-full px-2 bg-transparent"
            placeholder="transparent"
          />
          <input type="text" value="100%" class="w-full px-2 bg-transparent" />
        </div>
        <div class="flex flex-row flex-none items-center">
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>

          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
      <div
        v-if="
          rightPanelStore.toggleStroke &&
          selectToi.selectedBoxData.strokeSize &&
          selectToi.selectedBoxData.strokeColor
        "
        class="flex flex-row gap-1 justify-between w-full h-8 pl-4 pr-2 items-center"
      >
        <div class="flex flex-row gap-0.5 justify-between w-full px-0">
          <select class="w-full -ml-1 bg-transparent" selected="inside">
            <option value="inside">Inside</option>
            <option value="center">Center</option>
            <option value="outside">Outside</option>
          </select>
          <div class="flex flex-row w-1/2 flex-none px-2">
            <div
              class="h-full aspect-square items-center flex flex-none opacity-40"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4H2"
                  stroke="currentColor"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 7H4"
                  stroke="currentColor"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 10H5"
                  stroke="currentColor"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              type="number"
              :value="
                parseInt(selectToi.selectedBoxData.attr.style.outlineWidth)
              "
              @input.stop="
                selectToi.selectedBoxData.attr.style.outlineWidth =
                  $event.target.value + 'px'
              "
              class="w-full px-2 bg-transparent"
              placeholder="0"
            />
          </div>
        </div>
        <div class="flex flex-row flex-none items-center">
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>

          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
            @click="
              () => {
                customCSS = !customCSS;
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <DesignerRightSidePanelTabsStyleText />
    <!-- text color section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type === 'text' && selectToi.selectedBox
      "
      class="flex flex-col gap-4 border-b py-4 px-4 border-[#303030]"
    >
      <p class="font-medium">Fill</p>
      <div class="flex flex-row gap-3 flex-none justify-between w-full">
        <div class="flex flex-row gap-0.5 justify-start items-center w-2/3">
          <div
            class="h-full aspect-square items-center flex flex-none border"
            :style="{
              'background-color': selectToi.selectedBoxData.attr?.style.color,
            }"
          ></div>
          <input
            type="text"
            :value="selectToi.selectedBoxData.attr?.style.color"
            @input="
              (event) => {
                selectToi.selectedBoxData.attr.style.color = event.target.value;
              }
            "
            class="w-full px-2 bg-transparent"
          />
          <input type="text" value="100%" class="w-full px-2 bg-transparent" />
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Effects/Shadow section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col gap-4 border-b py-4 px-4 border-[#303030]"
    >
      <div class="flex flex-row justify-between">
        <p class="font-medium">Effects</p>
        <div
          v-if="
            !selectToi.selectedBoxData.boxShadowOffsetY &&
            !selectToi.selectedBoxData.boxShadowOffsetX &&
            !selectToi.selectedBoxData.boxShadowBlurRadius &&
            !selectToi.selectedBoxData.boxShadowSpreadRadius
          "
          class="aspect-square h-full flex flex-col justify-center items-center"
          @click="
            () => {
              selectToi.selectedBoxData.boxShadowOffsetY = 2;
              selectToi.selectedBoxData.boxShadowOffsetX = 2;
              selectToi.selectedBoxData.boxShadowBlurRadius = 2;
              selectToi.selectedBoxData.boxShadowSpreadRadius = 2;
              selectToi.selectedBoxData.boxShadowColor = 'black';
              rightPanelStore.toggleShadow = true;
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
          selectToi.selectedBoxData.boxShadowOffsetY &&
          selectToi.selectedBoxData.boxShadowOffsetX &&
          selectToi.selectedBoxData.boxShadowBlurRadius &&
          selectToi.selectedBoxData.boxShadowSpreadRadius
        "
        class="flex flex-col gap-4"
      >
        <div class="flex flex-row gap-3 flex-none justify-between w-full">
          <div class="flex flex-row gap-2 justify-start items-center w-3/4">
            <div class="h-full aspect-square items-center flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </div>
            <select
              name="category"
              selected="drop shadow"
              class="w-full bg-transparent"
            >
              <option value="drop shadow">Drop shadow</option>
              <option value="inner shadow">Inner Shadow</option>
              <option value="outer glow">Outer glow</option>
              <option value="inner glow">Inner glow</option>
            </select>
          </div>
          <div class="flex flex-row gap-2 flex-none justify-end w-1/4">
            <div class="aspect-square h-full flex items-center justify-center">
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
              class="aspect-square h-full flex items-center justify-center"
              @click="
                () => {
                  selectToi.selectedBoxData.boxShadowOffsetY = 0;
                  selectToi.selectedBoxData.boxShadowOffsetX = 0;
                  selectToi.selectedBoxData.boxShadowBlurRadius = 0;
                  selectToi.selectedBoxData.boxShadowSpreadRadius = 0;
                  selectToi.selectedBoxData.boxShadowColor = '';
                  rightPanelStore.toggleShadow = false;
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
      </div>
    </div>
    <!-- Export section! -->
    <div
      v-show="
        selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
      "
      class="flex flex-col gap-4 border-b py-4 px-4 border-[#303030]"
    >
      <div class="flex flex-row justify-between">
        <p class="font-medium">Export</p>
        <div
          v-if="
            !selectToi.selectedBoxData.boxShadowOffsetY &&
            !selectToi.selectedBoxData.boxShadowOffsetX &&
            !selectToi.selectedBoxData.boxShadowBlurRadius &&
            !selectToi.selectedBoxData.boxShadowSpreadRadius
          "
          class="aspect-square h-full flex flex-col justify-center items-center"
          @click="
            () => {
              selectToi.selectedBoxData.boxShadowOffsetY = 2;
              selectToi.selectedBoxData.boxShadowOffsetX = 2;
              selectToi.selectedBoxData.boxShadowBlurRadius = 2;
              selectToi.selectedBoxData.boxShadowSpreadRadius = 2;
              selectToi.selectedBoxData.boxShadowColor = 'black';
              rightPanelStore.toggleShadow = true;
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
          selectToi.selectedBoxData.boxShadowOffsetY &&
          selectToi.selectedBoxData.boxShadowOffsetX &&
          selectToi.selectedBoxData.boxShadowBlurRadius &&
          selectToi.selectedBoxData.boxShadowSpreadRadius
        "
        class="flex flex-col gap-4"
      >
        <div class="flex flex-row gap-3 flex-none justify-between w-full">
          <div class="flex flex-row gap-2 justify-start items-center w-3/4">
            <div class="h-full aspect-square items-center flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </div>
            <select
              name="category"
              selected="drop shadow"
              class="w-full bg-transparent"
            >
              <option value="drop shadow">Drop shadow</option>
              <option value="inner shadow">Inner Shadow</option>
              <option value="outer glow">Outer glow</option>
              <option value="inner glow">Inner glow</option>
            </select>
          </div>
          <div class="flex flex-row gap-2 flex-none justify-end w-1/4">
            <div class="aspect-square h-full flex items-center justify-center">
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
              class="aspect-square h-full flex items-center justify-center"
              @click="
                () => {
                  selectToi.selectedBoxData.boxShadowOffsetY = 0;
                  selectToi.selectedBoxData.boxShadowOffsetX = 0;
                  selectToi.selectedBoxData.boxShadowBlurRadius = 0;
                  selectToi.selectedBoxData.boxShadowSpreadRadius = 0;
                  selectToi.selectedBoxData.boxShadowColor = '';
                  rightPanelStore.toggleShadow = false;
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
      </div>
    </div>
    <!-- custom css section! -->
    <div
      v-show="selectToi.selectedBox"
      class="flex flex-col pt-2 pb-2"
      :class="{ 'border-b border-[#303030]': !customCSS }"
    >
      <div class="flex flex-row justify-between h-8 items-center pl-4 pr-2">
        <p class="font-medium">Custom CSS</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
          @click="
            () => {
              customCSS = !customCSS;
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
      <div class="flex flex-row px-4 py-2 items-center" v-if="customCSS">
        <textarea
          class="w-full bg-[#262626] px-2 py-2 rounded focus:outline-none font-mono min-h-[100px] border border-[#303030]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useRightPanelStore } from "@/stores/rightPanelStore";
import { useEditorStore } from "@/stores/editorStore";

const selectToi = useCounterStore();
const rightPanelStore = useRightPanelStore();
const editorStore = useEditorStore();
const customCSS = ref(false);

const text = ref("");
</script>
