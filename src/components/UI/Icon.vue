<template>
  <!--size 18-->
  <svg
    v-if="props.name === 'home' && props.size === 18"
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
  <svg
    v-if="props.name === 'cursor-default' && props.size === 18"
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
    <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"></path>
  </svg>
  <svg
    v-if="props.name === 'cursor-hand' && props.size === 18"
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
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
    <path
      d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
    ></path>
  </svg>
  <svg
    v-if="props.name === 'frame' && props.size === 18"
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
    <line x1="22" y1="6" x2="2" y2="6"></line>
    <line x1="22" y1="18" x2="2" y2="18"></line>
    <line x1="6" y1="2" x2="6" y2="22"></line>
    <line x1="18" y1="2" x2="18" y2="22"></line>
  </svg>
  <svg
    v-if="props.name === 'square' && props.size === 18"
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
  <!--size 17-->
  <svg
    v-if="props.name === 'text' && props.size === 17"
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
    <polyline points="4 7 4 4 20 4 20 7"></polyline>
    <line x1="9" y1="20" x2="15" y2="20"></line>
    <line x1="12" y1="4" x2="12" y2="20"></line>
  </svg>
  <svg
    v-if="props.name === 'more-horizontal' && props.size === 17"
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
  <!--size 15-->
  <svg
    v-if="props.name === 'line-height' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_562_49)">
      <path
        d="M14 14C8.92318 14 1 14 1 14"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 1C8.92318 1 1 1 1 1"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.49991 3.62343L10.25 11.3895"
        stroke="currentColor"
        stroke-width="0.861689"
        stroke-linecap="round"
      />
      <path
        d="M7.49583 3.62364L4.74986 11.3895"
        stroke="currentColor"
        stroke-width="0.861689"
        stroke-linecap="round"
      />
      <path
        d="M5.89575 8.6394H9.10417"
        stroke="currentColor"
        stroke-width="0.861689"
        stroke-linecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_562_49">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="props.name === 'letter-spacing' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_562_73)">
      <path
        d="M14 1C14 6.07682 14 14 14 14"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.999999 1C1 6.07682 1 14 1 14"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.24991 3.62343L10 11.3895"
        stroke="currentColor"
        stroke-width="0.861689"
        stroke-linecap="round"
      />
      <path
        d="M7.24583 3.62364L4.49986 11.3895"
        stroke="currentColor"
        stroke-width="0.861689"
        stroke-linecap="round"
      />
      <path
        d="M5.64575 8.6394H8.85417"
        stroke="currentColor"
        stroke-width="0.861689"
        stroke-linecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_562_73">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="props.name === 'paragraph-spacing' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_562_79)">
      <path
        d="M14 14C8.92318 14 1 14 1 14"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 11.5C8.92318 11.5 1 11.5 1 11.5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 1C8.92318 1 1 1 1 1"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 9.5L6 7.75"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 3L6 4.75"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 9.5L9 7.75"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 3L9 4.75"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter0_d_562_79)">
        <path
          d="M7.5 8.5V3.5"
          stroke="currentColor"
          stroke-width="0.94"
          stroke-linecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_562_79"
        x="3.03003"
        y="3.03003"
        width="8.93994"
        height="13.9399"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_562_79"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_562_79"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_562_79">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="props.name === 'auto-width' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_562_95)">
      <path
        d="M1 7.5L4 10"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 7.5L11 10"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 7.5L4 5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 7.5L11 5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter0_d_562_95)">
        <path
          d="M13 7.5L2 7.5"
          stroke="currentColor"
          stroke-width="0.94"
          stroke-linecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_562_95"
        x="-2.46997"
        y="7.03003"
        width="19.9399"
        height="8.93994"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_562_95"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_562_95"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_562_95">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="props.name === 'auto-height' && props.size === 15"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
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
  <svg
    v-if="props.name === 'square' && props.size === 15"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
  <svg
    v-if="props.name === 'text-align-left' && props.size === 15"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
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
  <svg
    v-if="props.name === 'text-align-center' && props.size === 15"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
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
  <svg
    v-if="props.name === 'text-align-right' && props.size === 15"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
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
  <svg
    v-if="props.name === 'text-align-top' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_563_106)">
      <path
        d="M14 1C8.92318 1 1 1 1 1"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 3L5 6"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 3L10 6"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter0_d_563_106)">
        <path
          d="M7.5 13V4"
          stroke="currentColor"
          stroke-width="0.94"
          stroke-linecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_563_106"
        x="3.03003"
        y="3.53003"
        width="8.93994"
        height="17.9399"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_563_106"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_563_106"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_563_106">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="props.name === 'text-align-middle' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_563_115)">
      <path
        d="M14 7.5C8.92318 7.5 1 7.5 1 7.5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 9.5L5.5 11.25"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 9.5L8.5 11.25"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter0_d_563_115)">
        <path
          d="M7 14V10"
          stroke="currentColor"
          stroke-width="0.94"
          stroke-linecap="round"
        />
      </g>
      <path
        d="M7 5.5L5.5 3.75"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 5.5L8.5 3.75"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter1_d_563_115)">
        <path
          d="M7 1V5"
          stroke="currentColor"
          stroke-width="0.94"
          stroke-linecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_563_115"
        x="2.53003"
        y="9.53003"
        width="8.93994"
        height="12.9399"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_563_115"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_563_115"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_563_115"
        x="2.53003"
        y="0.530029"
        width="8.93994"
        height="12.9399"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_563_115"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_563_115"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_563_115">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="props.name === 'text-align-bottom' && props.size === 15"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_563_210)">
      <path
        d="M14 13.5C8.92318 13.5 1 13.5 1 13.5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 11.5L5 8.5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 11.5L10 8.5"
        stroke="currentColor"
        stroke-width="0.9375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter0_d_563_210)">
        <path
          d="M7.5 1.5V10.5"
          stroke="currentColor"
          stroke-width="0.94"
          stroke-linecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_563_210"
        x="3.03003"
        y="1.03003"
        width="8.93994"
        height="17.9399"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_563_210"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_563_210"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_563_210">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
const props = defineProps({
  name: String,
  size: Number,
});
</script>
