<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs bg-neutral-200"
  >
    <!--Topbar section-->
    <TopBar />

    <!--Main section-->
    <div class="flex flex-row justify-between">
      <!--Left panel section-->
      <div
        class="border-r w-60 flex flex-col flex-none h-full overflow-x-hidden overflow-y-scroll z-10 bg-white"
      >
        <div
          class="h-10 border-b flex-none flex flex-row items-center px-2 sticky top-0 bg-white"
        >
          <div
            class="px-2 h-full items-center flex flex-row cursor-pointer"
            :class="{
              'font-medium text-black': leftPanelStore.activeTab === 'layers',
              'text-neutral-400': leftPanelStore.activeTab !== 'layers',
            }"
            @click="leftPanelStore.activeTab = 'layers'"
          >
            <span>Layers</span>
          </div>
          <div
            class="px-2 h-full items-center flex flex-row cursor-pointer"
            :class="{
              'font-medium text-black': leftPanelStore.activeTab === 'data',
              'text-neutral-400': leftPanelStore.activeTab !== 'data',
            }"
            @click="leftPanelStore.activeTab = 'data'"
          >
            <span>Data</span>
          </div>
          <div
            class="px-2 h-full items-center flex flex-row cursor-pointer"
            :class="{
              'font-medium text-black': leftPanelStore.activeTab === 'assets',
              'text-neutral-400': leftPanelStore.activeTab !== 'assets',
            }"
            @click="leftPanelStore.activeTab = 'assets'"
          >
            <span>Assets</span>
          </div>
        </div>
        <!--layers tab content -->
        <div
          class="flex flex-col w-full h-fit"
          v-show="leftPanelStore.activeTab === 'layers'"
        >
          <TreeBrowser :nodes="selectToi.data" />
        </div>
      </div>
      <!--Canvas section-->
      <div
        id="container"
        class="absolute inset-0 overflow-hidden min-h-screen min-w-full"
        @wheel="wheel"
        @mousedown.stop.prevent="addaSquare.addSquare($event, selectToi.data)"
        :class="{
          'cursor-crosshair':
            addaSquare.addSquareActivated === true ||
            addaSquare.addTextActivated === true ||
            addaSquare.addFrameActivated === true,
          'cursor-grab': addaSquare.dragPointer === true,
          'cursor-grabbing': addaSquare.draggingPointer === true,
        }"
      >
        <div
          id="target"
          data-id="canvas"
          class="flex flex-grow justify-center absolute inset-0 overflow-visible"
          :style="{
            transform: `translate3D(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px, 0px) rotate(${addaSquare.rotation}deg) scale(${addaSquare.scale})`,
          }"
        >
          <UIBrowser :nodes="selectToi.data" />
        </div>
        <div
          v-if="selectToi.selectedBox && !canvasFF.isDragging"
          class="absolute pointer-events-none"
          :style="{
            transform: `translate3D(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px, 0px) rotate(${addaSquare.rotation}deg) scale(${addaSquare.scale})`,
            left: selectToi.selectedBoxHTMLX + 'px',
            top: selectToi.selectedBoxHTMLY + 'px',
            height: selectToi.selectedBoxData.height
              ? selectToi.selectedBoxData.height + 'px'
              : document.querySelector(
                  `[data-id=${selectToi.selectedBoxData.parent}]`
                ).getBoundingClientRect.height,
            width: selectToi.selectedBoxData.width
              ? selectToi.selectedBoxData.width + 'px'
              : 'auto',
          }"
        >
          <div class="pointer-events-auto">
            <p
              class="absolute left-0 right-0 top-full mt-2 flex flex-row justify-center flex-nowrap"
            >
              <span
                class="bg-blue-600 text-white cursor-default px-1 py-0.5 rounded text-[11px] flex-nowrap flex"
              >
                {{
                  selectToi.selectedBoxData.width
                    ? selectToi.selectedBoxData.width
                    : "Fill"
                }}
                x
                {{
                  selectToi.selectedBoxData.height
                    ? selectToi.selectedBoxData.height
                    : "Fill"
                }}
              </span>
            </p>
            <div
              @mousedown.stop.prevent="resizeStore.resizeTop"
              class="absolute bottom-full h-0.5 bg-blue-600 w-full hover:cursor-row-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeBottom"
              class="absolute top-full h-0.5 bg-blue-600 w-full hover:cursor-row-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeLeft"
              class="absolute right-full w-0.5 bg-blue-600 h-full hover:cursor-col-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeRight"
              class="absolute left-full w-0.5 bg-blue-600 h-full hover:cursor-col-resize"
            />

            <div
              @mousedown.stop.prevent="resizeStore.resizeTopLeft"
              class="absolute -top-1 -left-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nwse-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeTopRight"
              class="absolute -top-1 -right-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nesw-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeBottomRight"
              class="absolute -bottom-1 -right-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nwse-resize"
            />
            <div
              @mousedown.stop.prevent="resizeStore.resizeBottomLeft"
              class="absolute -bottom-1 -left-1 h-2 w-2 bg-white border-blue-600 border hover:cursor-nesw-resize"
            />
          </div>
        </div>
        <div class="absolute inset-0 overflow-visible pointer-events-none">
          <RulerBrowser :lines="canvasMarker.lines" />
        </div>
      </div>
      <!--Right panel section-->
      <div
        class="border-l w-60 flex flex-col h-screen overflow-x-hidden z-10 bg-white"
      >
        <div
          class="h-10 flex-none flex flex-row items-center px-2 sticky top-0 bg-white"
        >
          <div
            class="px-2 h-full items-center flex flex-row cursor-pointer"
            :class="{
              'font-medium text-black': rightPanelStore.activeTab === 'style',
              'text-neutral-400': rightPanelStore.activeTab !== 'style',
            }"
            @click="rightPanelStore.activeTab = 'style'"
          >
            <span>Style</span>
          </div>
          <div
            class="px-2 h-full items-center flex flex-row cursor-pointer"
            :class="{
              'font-medium text-black': rightPanelStore.activeTab === 'props',
              'text-neutral-400': rightPanelStore.activeTab !== 'props',
            }"
            @click="rightPanelStore.activeTab = 'props'"
          >
            <span>Props</span>
          </div>
          <div
            class="px-2 h-full items-center flex flex-row cursor-pointer"
            :class="{
              'font-medium text-black': rightPanelStore.activeTab === 'action',
              'text-neutral-400': rightPanelStore.activeTab !== 'action',
            }"
            @click="rightPanelStore.activeTab = 'action'"
          >
            <span>Action</span>
          </div>
          {{ noTouch }}
        </div>
        <!--style tab content-->
        <div
          v-show="rightPanelStore.activeTab === 'style'"
          class="flex flex-col"
        >
          <!--Alignment text props-->
          <div
            v-show="selectToi.selectedBox"
            class="flex flex-col gap-4 border-b pt-2 pb-4 px-4 border-gray-200"
          >
            <div class="flex flex-row gap-3">
              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'column',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="6" y="14" width="9" height="6" rx="2"></rect>
                  <rect x="6" y="4" width="16" height="6" rx="2"></rect>
                  <path d="M2 2v20"></path>
                </svg>
              </div>
              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2v20"></path>
                  <path d="M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"></path>
                  <path d="M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"></path>
                  <path d="M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"></path>
                  <path d="M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"></path>
                </svg>
              </div>
              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="4" width="16" height="6" rx="2"></rect>
                  <rect x="9" y="14" width="9" height="6" rx="2"></rect>
                  <path d="M22 22V2"></path>
                </svg>
              </div>

              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="4" y="6" width="6" height="16" rx="2"></rect>
                  <rect x="14" y="6" width="6" height="9" rx="2"></rect>
                  <path d="M22 2H2"></path>
                </svg>
              </div>
              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12h20"></path>
                  <path d="M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"></path>
                  <path d="M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"></path>
                  <path d="M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"></path>
                  <path d="M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"></path>
                </svg>
              </div>
              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="4" y="2" width="6" height="16" rx="2"></rect>
                  <rect x="14" y="9" width="6" height="9" rx="2"></rect>
                  <path d="M22 22H2"></path>
                </svg>
              </div>
              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="5" y="15" width="14" height="6" rx="2"></rect>
                  <rect x="7" y="3" width="10" height="6" rx="2"></rect>
                  <path d="M2 21h20"></path>
                  <path d="M2 3h20"></path>
                </svg>
              </div>

              <div
                class="h-full aspect-square items-center flex flex-none text-neutral-400"
                :class="{
                  'text-black':
                    selectToi.selectedBoxData.flexDirection === 'row',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="7" y="9" width="10" height="6" rx="2"></rect>
                  <path d="M22 20H2"></path>
                  <path d="M22 4H2"></path>
                </svg>
              </div>
              <div
                class="flex flex-row gap-0.5 justify-start items-center"
              ></div>

              <div class="aspect-square h-full"></div>
            </div>
          </div>
          <!-- Background color  section! -->
          <div
            v-show="!selectToi.selectedBox"
            class="flex flex-col gap-4 border-b py-4 px-4 border-gray-200"
          >
            <p class="font-medium">Background</p>
            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-2/3"
              >
                <div
                  class="h-full aspect-square items-center flex flex-none border"
                  :style="{
                    'background-color': selectToi.selectedBoxData.bgColor,
                  }"
                ></div>
                <input
                  type="text"
                  v-model="selectToi.selectedBoxData.bgColor"
                  class="w-full px-2"
                />
                <input type="text" value="100%" class="w-full px-2" />
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
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
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
          <!-- Dimensions section! -->
          <div
            v-show="selectToi.selectedBox"
            class="flex flex-col gap-4 py-4 px-4 border-gray-200"
          >
            <p class="font-medium">Dimensions</p>
            <div class="flex flex-row">
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-1/2"
              >
                <div class="h-full aspect-square items-center flex flex-none">
                  <p class="text-neutral-400 text-center w-full">X</p>
                </div>
                <input
                  type="number"
                  placeholder="Auto"
                  v-model="selectToi.selectedBoxData.X"
                  class="w-2/3 px-2"
                />
              </div>
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-1/2"
              >
                <div class="h-full aspect-square items-center flex flex-none">
                  <p class="text-neutral-400 text-center w-full">Y</p>
                </div>
                <input
                  type="number"
                  placeholder="Auto"
                  v-model="selectToi.selectedBoxData.Y"
                  class="w-2/3 px-2"
                />
              </div>
              <div
                class="aspect-square h-full"
                :class="{
                  'bg-gray-200':
                    selectToi.selectedBoxData.position === 'absolute',
                }"
                @click="
                  () => {
                    if (selectToi.selectedBoxData.position != 'absolute') {
                      selectToi.selectedBoxData.position = 'absolute';
                    } else {
                      selectToi.selectedBoxData.position = 'static';
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
            <div class="flex flex-row">
              <div class="flex flex-row gap-0.5 justify-start items-center">
                <div class="h-full aspect-square items-center flex flex-none">
                  <p class="text-neutral-400 text-center w-full">W</p>
                </div>
                <input
                  type="number"
                  placeholder="Auto"
                  v-model="selectToi.selectedBoxData.width"
                  class="w-2/3 px-2"
                />
              </div>
              <div class="flex flex-row gap-0.5 justify-start items-center">
                <div class="h-full aspect-square items-center flex flex-none">
                  <p class="text-neutral-400 text-center w-full">H</p>
                </div>
                <input
                  type="number"
                  v-model="selectToi.selectedBoxData.height"
                  placeholder="Auto"
                  class="w-2/3 px-2"
                />
              </div>

              <div class="aspect-square h-full"></div>
            </div>
            <div class="flex flex-row">
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-1/2"
              >
                <div
                  class="h-5 w-5 aspect-square items-center flex flex-none justify-center"
                  @click="selectToi.selectedBoxData.flexGrow = 0"
                  :class="{
                    'text-black': selectToi.selectedBoxData.flexGrow === 0,
                    'text-neutral-400':
                      selectToi.selectedBoxData.flexGrow !== 0,
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
                  class="h-5 w-5 aspect-square items-center flex flex-none justify-center"
                  @click="
                    () => {
                      selectToi.selectedBoxData.flexGrow = 1;
                      delete selectToi.selectedBoxData.width;
                    }
                  "
                  :class="{
                    'text-black': selectToi.selectedBoxData.flexGrow === 1,
                    'text-neutral-400':
                      selectToi.selectedBoxData.flexGrow !== 1,
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
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-1/2"
              >
                <div
                  class="h-5 w-5 aspect-square items-center flex flex-none justify-center"
                  @click="selectToi.selectedBoxData.alignSelf = 'auto'"
                  :class="{
                    'text-black':
                      selectToi.selectedBoxData.alignSelf === 'auto',
                    'text-neutral-400':
                      selectToi.selectedBoxData.alignSelf !== 'auto',
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
                  class="h-5 w-5 aspect-square items-center flex flex-none justify-cente"
                  @click="
                    () => {
                      selectToi.selectedBoxData.alignSelf = 'stretch';
                      delete selectToi.selectedBoxData.height;
                    }
                  "
                  :class="{
                    'text-black':
                      selectToi.selectedBoxData.alignSelf === 'stretch',
                    'text-neutral-400':
                      selectToi.selectedBoxData.alignSelf !== 'stretch',
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
            <div class="flex flex-row">
              <div class="flex flex-row gap-0.5 justify-start items-center">
                <div
                  class="h-full aspect-square items-center flex flex-none justify-center text-neutral-400"
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
                  class="w-2/3 px-2"
                />
              </div>
              <div class="flex flex-row gap-0.5 justify-start items-center">
                <div
                  class="h-full aspect-square items-center flex flex-none justify-center text-neutral-400"
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
                  v-model="selectToi.selectedBoxData.corner"
                  placeholder="0"
                  class="w-2/3 px-2"
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
            class="flex flex-col gap-4 p-4 border-gray-200 border-t"
          >
            <div class="flex flex-row justify-between">
              <p class="font-medium">Auto layout</p>
              <div
                v-if="
                  !rightPanelStore.toggleStroke ||
                  !selectToi.selectedBoxData.strokeSize ||
                  !selectToi.selectedBoxData.strokeColor
                "
                class="aspect-square h-full flex flex-col justify-center items-center"
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
            <div class="flex flex-row gap-3 w-3/4 justify-between">
              <div
                class="flex flex-col gap-4 items-start justify-start py-1 w-1/2 flex-none"
              >
                <div class="flex flex-row gap-2 items-start">
                  <div
                    @click="selectToi.selectedBoxData.flexDirection = 'column'"
                    class="aspect-square items-center flex flex-none"
                    :class="{
                      'text-black':
                        selectToi.selectedBoxData.flexDirection === 'column',
                      'text-neutral-400':
                        selectToi.selectedBoxData.flexDirection === 'row',
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
                    @click="selectToi.selectedBoxData.flexDirection = 'row'"
                    class="aspect-square items-center flex flex-none"
                    :class="{
                      'text-black':
                        selectToi.selectedBoxData.flexDirection === 'row',
                      'text-neutral-400':
                        selectToi.selectedBoxData.flexDirection === 'column',
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
                <div class="grid grid-cols-2 gap-2 items-start">
                  <div
                    class="aspect-square items-center flex flex-col justify-center flex-none text-neutral-400 h-[18px]"
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

                  <div
                    class="aspect-square items-center flex flex-none h-[18px]"
                  >
                    <input
                      type="number"
                      v-model="selectToi.selectedBoxData.gap"
                      placeholder="0"
                      class="w-8"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 items-start">
                  <div
                    class="aspect-square items-center flex flex-col justify-center flex-none text-neutral-400 h-[18px]"
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

                  <div
                    class="aspect-square items-center flex flex-none h-[18px]"
                  >
                    <input
                      type="number"
                      v-model="selectToi.selectedBoxData.paddingX"
                      placeholder="0"
                      class="w-8"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <div
                  class="w-[65px] h-[65px] border bg-gray-50 rounded-md border-gray-300 aspect-square grid grid-cols-3 flex-none items-start"
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
                        selectToi.selectedBoxData.align !== 'start' ||
                        selectToi.selectedBoxData.justify !== 'start'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'start' &&
                        selectToi.selectedBoxData.justify === 'start'
                      "
                      class="absolute top-0.5 left-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="9"
                        width="15"
                        height="6"
                        rx="2.5"
                        fill="black"
                      />
                      <rect
                        x="2"
                        y="16.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        fill="black"
                      />
                      <rect
                        x="2"
                        y="1"
                        width="20"
                        height="6"
                        rx="2.5"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'center' ||
                        selectToi.selectedBoxData.justify !== 'start'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'center' &&
                        selectToi.selectedBoxData.justify === 'start'
                      "
                      class="absolute flex-none top-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="19.5"
                        y="15"
                        width="15"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 19.5 15)"
                        fill="black"
                      />
                      <rect
                        x="22"
                        y="7"
                        width="20"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22 7)"
                        fill="black"
                      />
                      <rect
                        x="18"
                        y="22.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 18 22.5)"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'end' ||
                        selectToi.selectedBoxData.justify !== 'start'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'end' &&
                        selectToi.selectedBoxData.justify === 'start'
                      "
                      class="absolute flex-none top-0.5 right-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="15"
                        height="6"
                        rx="2.5"
                        transform="matrix(-1 0 0 1 22 9)"
                        fill="black"
                      />
                      <rect
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="matrix(-1 0 0 1 22 16.5)"
                        fill="black"
                      />
                      <rect
                        width="20"
                        height="6"
                        rx="2.5"
                        transform="matrix(-1 0 0 1 22 1)"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'start' ||
                        selectToi.selectedBoxData.justify !== 'center'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'start' &&
                        selectToi.selectedBoxData.justify === 'center'
                      "
                      class="absolute flex-none left-0.5 text-gray-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="21"
                        height="6"
                        rx="2.5"
                        transform="matrix(1 8.74228e-08 8.74228e-08 -1 1.5 15)"
                        fill="black"
                      />
                      <rect
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="matrix(1 8.74228e-08 8.74228e-08 -1 1.5 7.5)"
                        fill="black"
                      />
                      <rect
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="matrix(1 8.74228e-08 8.74228e-08 -1 1.5 22.5)"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'center' ||
                        selectToi.selectedBoxData.justify !== 'center'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'center' &&
                        selectToi.selectedBoxData.justify === 'center'
                      "
                      class="absolute inset-0 flex-none"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1.5"
                        y="9"
                        width="21"
                        height="6"
                        rx="2.5"
                        fill="black"
                      />
                      <rect
                        x="6"
                        y="16.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        fill="black"
                      />
                      <rect
                        x="6"
                        y="1.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'end' ||
                        selectToi.selectedBoxData.justify !== 'center'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'end' &&
                        selectToi.selectedBoxData.justify === 'center'
                      "
                      class="absolute flex-none right-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="22.5"
                        y="15"
                        width="21"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22.5 15)"
                        fill="black"
                      />
                      <rect
                        x="22.5"
                        y="7.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22.5 7.5)"
                        fill="black"
                      />
                      <rect
                        x="22.5"
                        y="22.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22.5 22.5)"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'start' ||
                        selectToi.selectedBoxData.justify !== 'end'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'start' &&
                        selectToi.selectedBoxData.justify === 'end'
                      "
                      class="absolute flex-none left-0.5 bottom-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="15"
                        height="6"
                        rx="2.5"
                        transform="matrix(1 0 0 -1 2 15)"
                        fill="black"
                      />
                      <rect
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="matrix(1 0 0 -1 2 7.5)"
                        fill="black"
                      />
                      <rect
                        width="20"
                        height="6"
                        rx="2.5"
                        transform="matrix(1 0 0 -1 2 23)"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'center' ||
                        selectToi.selectedBoxData.justify !== 'end'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'center' &&
                        selectToi.selectedBoxData.justify === 'end'
                      "
                      class="absolute flex-none bottom-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4.5"
                        y="9"
                        width="15"
                        height="6"
                        rx="2.5"
                        fill="black"
                      />
                      <rect
                        x="2"
                        y="17"
                        width="20"
                        height="6"
                        rx="2.5"
                        fill="black"
                      />
                      <rect
                        x="6"
                        y="1.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        fill="black"
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
                        selectToi.selectedBoxData.align !== 'end' ||
                        selectToi.selectedBoxData.justify !== 'end'
                      "
                      class="h-1 aspect-square rounded-full bg-gray-300"
                    ></div>
                    <svg
                      v-show="
                        selectToi.selectedBoxData.align === 'end' &&
                        selectToi.selectedBoxData.justify === 'end'
                      "
                      class="absolute flex-none right-0.5 bottom-0.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="22"
                        y="15"
                        width="15"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22 15)"
                        fill="black"
                      />
                      <rect
                        x="22"
                        y="7.5"
                        width="12"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22 7.5)"
                        fill="black"
                      />
                      <rect
                        x="22"
                        y="23"
                        width="20"
                        height="6"
                        rx="2.5"
                        transform="rotate(180 22 23)"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 items-start w-fit">
                  <div
                    class="aspect-square items-center flex flex-col justify-center flex-none text-neutral-400 h-[18px]"
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

                  <div
                    class="aspect-square items-center flex flex-none h-[18px]"
                  >
                    <input
                      type="number"
                      v-model="selectToi.selectedBoxData.paddingY"
                      placeholder="0"
                      class="w-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Layout section2! padding n margin 
          <div v-show="selectToi.selectedBox" class="flex flex-col gap-4 border-b pt-4 pb-4 border-gray-200">
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
                      <div class=" w-10 border border-gray-300 flex rounded flex-row justify-center items-center text-neutral-400">
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

          <!-- Fill color  section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-y py-4 px-4 border-gray-200"
          >
            <p class="font-medium">Fill</p>
            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-2/3"
              >
                <div
                  class="h-full aspect-square items-center flex flex-none"
                  :style="{
                    'background-color': selectToi.selectedBoxData.bgColor,
                  }"
                ></div>
                <input
                  type="text"
                  v-model="selectToi.selectedBoxData.bgColor"
                  class="w-full px-2"
                />
                <input type="text" value="100%" class="w-full px-2" />
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
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
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
          <!-- Stroke section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-b py-4 px-4 border-gray-200"
          >
            <div class="flex flex-row justify-between">
              <p class="font-medium">Stroke</p>
              <div
                v-if="
                  !rightPanelStore.toggleStroke ||
                  !selectToi.selectedBoxData.strokeSize ||
                  !selectToi.selectedBoxData.strokeColor
                "
                class="aspect-square h-full flex flex-col justify-center items-center"
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
              class="flex flex-col gap-4"
            >
              <div class="flex flex-row gap-3 flex-none justify-between w-full">
                <div
                  class="flex flex-row gap-0.5 justify-start items-center w-2/3"
                >
                  <div
                    class="h-full aspect-square items-center flex flex-none"
                    :style="{
                      'background-color': selectToi.selectedBoxData.strokeColor,
                    }"
                  ></div>
                  <input
                    type="text"
                    v-model="selectToi.selectedBoxData.strokeColor"
                    class="w-full px-2"
                    placeholder="transparent"
                  />
                  <input type="text" value="100%" class="w-full px-2" />
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
                      <path
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>

                  <div
                    class="aspect-square h-full flex flex-col items-center justify-center"
                    @click="
                      () => {
                        selectToi.selectedBoxData.strokeColor = '';
                        selectToi.selectedBoxData.strokeSize = 0;
                        rightPanelStore.toggleStroke = false;
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
                <div class="flex flex-row gap-0.5 justify-between w-full px-0">
                  <select class="w-full -ml-1" selected="inside">
                    <option value="inside">Inside</option>
                    <option value="center">Center</option>
                    <option value="outside">Outside</option>
                  </select>
                  <div class="flex flex-row w-1/2 flex-none px-2">
                    <div
                      class="h-full aspect-square items-center flex flex-none text-neutral-400"
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
                      v-model="selectToi.selectedBoxData.strokeSize"
                      class="w-full px-2"
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
          <!-- Text section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type === 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-b py-4 px-4 border-gray-200"
          >
            <p class="font-medium">Text</p>

            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div class="flex flex-row gap-0.5 justify-between w-full">
                <input
                  type="text"
                  v-model="selectToi.selectedBoxData.textContent"
                  class="w-full"
                />
              </div>
              <div class="flex flex-row gap-2 flex-none justify-end">
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
            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div class="flex flex-row gap-0.5 justify-between w-full">
                <input type="text" value="Font Family" class="w-full" />
                <div class="flex flex-row w-1/2 flex-none px-2">
                  <div class="h-full aspect-square items-center flex flex-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="4 7 4 4 20 4 20 7"></polyline>
                      <line x1="9" y1="20" x2="15" y2="20"></line>
                      <line x1="12" y1="4" x2="12" y2="20"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    v-model="selectToi.selectedBoxData.fontSize"
                    class="w-full px-2"
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
            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div class="flex flex-row gap-0.5 justify-start">
                <div class="flex flex-row w-1/2 flex-none px-2 justify-start">
                  <div class="h-full aspect-square items-center flex flex-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="4 7 4 4 20 4 20 7"></polyline>
                      <line x1="9" y1="20" x2="15" y2="20"></line>
                      <line x1="12" y1="4" x2="12" y2="20"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    v-model="selectToi.selectedBoxData.fontSize"
                    class="w-full px-2"
                  />
                </div>
                <div class="flex flex-row w-1/2 flex-none px-2">
                  <div class="h-full aspect-square items-center flex flex-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="4 7 4 4 20 4 20 7"></polyline>
                      <line x1="9" y1="20" x2="15" y2="20"></line>
                      <line x1="12" y1="4" x2="12" y2="20"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    v-model="selectToi.selectedBoxData.fontSize"
                    class="w-full px-2"
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
            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div class="flex flex-row gap-2 justify-start items-center">
                <div class="h-full aspect-square items-center flex flex-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </svg>
                </div>

                <div class="h-full aspect-square items-center flex flex-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="17" y1="12" x2="7" y2="12"></line>
                    <line x1="19" y1="18" x2="5" y2="18"></line>
                  </svg>
                </div>
                <div class="h-full aspect-square items-center flex flex-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </svg>
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
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!-- text color section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type === 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-b py-4 px-4 border-gray-200"
          >
            <p class="font-medium">Fill</p>
            <div class="flex flex-row gap-3 flex-none justify-between w-full">
              <div
                class="flex flex-row gap-0.5 justify-start items-center w-2/3"
              >
                <div
                  class="h-full aspect-square items-center flex flex-none border"
                  :style="{
                    'background-color': selectToi.selectedBoxData.color,
                  }"
                ></div>
                <input
                  type="text"
                  v-model="selectToi.selectedBoxData.color"
                  class="w-full px-2"
                />
                <input type="text" value="100%" class="w-full px-2" />
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
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
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
          <!-- Shadow section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-b py-4 px-4 border-gray-200"
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
                <div
                  class="flex flex-row gap-2 justify-start items-center w-3/4"
                >
                  <div
                    class="h-full aspect-square items-center flex justify-center"
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
                  <select name="category" selected="drop shadow" class="w-full">
                    <option value="drop shadow">Drop shadow</option>
                    <option value="inner shadow">Inner Shadow</option>
                    <option value="outer glow">Outer glow</option>
                    <option value="inner glow">Inner glow</option>
                  </select>
                </div>
                <div class="flex flex-row gap-2 flex-none justify-end w-1/4">
                  <div
                    class="aspect-square h-full flex items-center justify-center"
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
                      <path
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      ></path>
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
        </div>
        <!--props tab content-->
        <div
          v-show="rightPanelStore.activeTab === 'props'"
          class="flex flex-col"
        >
          <!-- Stroke section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-y py-4 px-4 border-gray-200"
          >
            <div class="flex flex-row justify-between">
              <p class="font-medium">Stroke</p>
              <div
                v-if="
                  !rightPanelStore.toggleStroke ||
                  !selectToi.selectedBoxData.strokeSize ||
                  !selectToi.selectedBoxData.strokeColor
                "
                class="aspect-square h-full flex flex-col justify-center items-center"
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
              class="flex flex-col gap-4"
            >
              <div class="flex flex-row gap-3 flex-none justify-between w-full">
                <div
                  class="flex flex-row gap-0.5 justify-start items-center w-2/3"
                >
                  <div
                    class="h-full aspect-square items-center flex flex-none"
                    :style="{
                      'background-color': selectToi.selectedBoxData.strokeColor,
                    }"
                  ></div>
                  <input
                    type="text"
                    v-model="selectToi.selectedBoxData.strokeColor"
                    class="w-full px-2"
                    placeholder="transparent"
                  />
                  <input type="text" value="100%" class="w-full px-2" />
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
                      <path
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>

                  <div
                    class="aspect-square h-full flex flex-col items-center justify-center"
                    @click="
                      () => {
                        selectToi.selectedBoxData.strokeColor = '';
                        selectToi.selectedBoxData.strokeSize = 0;
                        rightPanelStore.toggleStroke = false;
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
                    class="w-full"
                  />
                  <div class="flex flex-row w-1/2 flex-none px-2">
                    <div
                      class="h-full aspect-square items-center flex flex-none"
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
                      class="w-full px-2"
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
          </pre>
        </div>
        <!--action tab content-->
        <div
          v-show="rightPanelStore.activeTab === 'action'"
          class="flex flex-col"
        >
          <!-- Stroke section! -->
          <div
            v-show="
              selectToi.selectedBoxData.type !== 'text' && selectToi.selectedBox
            "
            class="flex flex-col gap-4 border-y py-4 px-4 border-gray-200"
          >
            <div class="flex flex-row justify-between">
              <p class="font-medium">Stroke</p>
              <div
                v-if="
                  !rightPanelStore.toggleStroke ||
                  !selectToi.selectedBoxData.strokeSize ||
                  !selectToi.selectedBoxData.strokeColor
                "
                class="aspect-square h-full flex flex-col justify-center items-center"
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
              class="flex flex-col gap-4"
            >
              <div class="flex flex-row gap-3 flex-none justify-between w-full">
                <div
                  class="flex flex-row gap-0.5 justify-start items-center w-2/3"
                >
                  <div
                    class="h-full aspect-square items-center flex flex-none"
                    :style="{
                      'background-color': selectToi.selectedBoxData.strokeColor,
                    }"
                  ></div>
                  <input
                    type="text"
                    v-model="selectToi.selectedBoxData.strokeColor"
                    class="w-full px-2"
                    placeholder="transparent"
                  />
                  <input type="text" value="100%" class="w-full px-2" />
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
                      <path
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>

                  <div
                    class="aspect-square h-full flex flex-col items-center justify-center"
                    @click="
                      () => {
                        selectToi.selectedBoxData.strokeColor = '';
                        selectToi.selectedBoxData.strokeSize = 0;
                        rightPanelStore.toggleStroke = false;
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
                    class="w-full"
                  />
                  <div class="flex flex-row w-1/2 flex-none px-2">
                    <div
                      class="h-full aspect-square items-center flex flex-none"
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
                      class="w-full px-2"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { useCanvasDndStore } from "../stores/canvasDnd";
import { useCanvasFF } from "../stores/canvasFreeForm";
import { useResizeStore } from "../stores/resizeStore";
import { useRightPanelStore } from "../stores/rightPanelStore";
import { useLeftPanelStore } from "../stores/leftPanelStore";
import { useCanvasMarkerStore } from "../stores/canvasMarker";
/*
zoom watching
import { 
				okzoomer, 
				gestureToMatrix, 
				getOrigin, 
				applyMatrix
			} from '../stores/okZoomer';
      */

const selectToi = useCounterStore();
const addaSquare = useSquareStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const resizeStore = useResizeStore();
const rightPanelStore = useRightPanelStore();
const leftPanelStore = useLeftPanelStore();
const canvasMarker = useCanvasMarkerStore();
const noTouch = ref("");

function wheel() {
  event.preventDefault();
  console.log("e.deltaY = " + event.deltaY);
  console.log("e.deltaX = " + event.deltaX);

  addaSquare.scale += event.deltaY * -0.01;

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

/* zoom watching
onMounted(() => {
  if (!window.DOMMatrix) {
    if (window.WebKitCSSMatrix) {
      window.DOMMatrix = window.WebKitCSSMatrix;
    } else {
      throw new Error("Couldn't find a DOM Matrix implementation");
    }
  }

  let origin;
  let initial_ctm = new DOMMatrix();
  let el = document.querySelector("#target");
  el.style.transformOrigin = "0 0";

  okzoomer(document.querySelector("#container"), {
    startGesture(gesture) {
      /*
						Clear the element's transform so we can 
						measure its original position wrt. the screen.
						(We don't need to restore it because it gets 
						overwritten by `applyMatrix()` anyways.)
					 
      el.style.transform = "";
      origin = getOrigin(el, gesture);
      applyMatrix(el, gestureToMatrix(gesture, origin).multiply(initial_ctm));
    },
    doGesture(gesture) {
      applyMatrix(el, gestureToMatrix(gesture, origin).multiply(initial_ctm));
    },
    endGesture(gesture) {
      initial_ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
      applyMatrix(el, initial_ctm);
    },
  });
});
*/
</script>

<style scoped>
.item {
  height: 50px;
  width: 50px;
  position: absolute;
  background: orange;
}
</style>
