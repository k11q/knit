import { useCounterStore } from "@/stores/counter";

export function changeLeft(value: number, unit: string = "px") {
  const selectToi = useCounterStore();

  if (
    !selectToi.selectedBoxData.cssRules[0].style.left &&
    selectToi.selectedBoxData.cssRules[0].style.position === "absolute"
  ) {
    selectToi.selectedBoxData.cssRules[0].style.left = {
      type: "unit",
      value: value,
      unit: unit,
    };
  }
  if (selectToi.selectedBoxData.cssRules[0].style.left) {
    selectToi.selectedBoxData.cssRules[0].style.left.value = value;
  }
}
export function changeTop(value: number, unit: string = "px") {
  const selectToi = useCounterStore();

  if (
    !selectToi.selectedBoxData.cssRules[0].style.top &&
    selectToi.selectedBoxData.cssRules[0].style.position === "absolute"
  ) {
    selectToi.selectedBoxData.cssRules[0].style.top = {
      type: "unit",
      value: value,
      unit: unit,
    };
  }
  if (selectToi.selectedBoxData.cssRules[0].style.top) {
    selectToi.selectedBoxData.cssRules[0].style.top.value = value;
  }
}
export function changeWidth(value: number, unit: string = "px") {
  const selectToi = useCounterStore();

  if (!selectToi.selectedBoxData.cssRules[0].style.width) {
    selectToi.selectedBoxData.cssRules[0].style.width = {
      type: "unit",
      value: value,
      unit: unit,
    };
  }
  if (selectToi.selectedBoxData.cssRules[0].style.width) {
    selectToi.selectedBoxData.cssRules[0].style.width.value = value;
  }
}
export function changeHeight(value: number, unit: string = "px") {
  const selectToi = useCounterStore();

  if (!selectToi.selectedBoxData.cssRules[0].style.height) {
    selectToi.selectedBoxData.cssRules[0].style.height = {
      type: "unit",
      value: value,
      unit: unit,
    };
  }
  if (selectToi.selectedBoxData.cssRules[0].style.height) {
    selectToi.selectedBoxData.cssRules[0].style.height.value = value;
  }
}
export function changeAlign(value: string) {
  const selectToi = useCounterStore();

  if (!selectToi.selectedBoxData.cssRules[0].style.alignItems) {
    selectToi.selectedBoxData.cssRules[0].style.alignItems = {
      type: "keyword",
      value: value,
    };
  }
  if (selectToi.selectedBoxData.cssRules[0].style.alignItems) {
    selectToi.selectedBoxData.cssRules[0].style.alignItems.value = value;
  }
}
export function changeJustify(value: string) {
  const selectToi = useCounterStore();

  if (!selectToi.selectedBoxData.cssRules[0].style.justifyContent) {
    selectToi.selectedBoxData.cssRules[0].style.justifyContent = {
      type: "keyword",
      value: value,
    };
  }
  if (selectToi.selectedBoxData.cssRules[0].style.justifyContent) {
    selectToi.selectedBoxData.cssRules[0].style.justifyContent.value = value;
  }
}
