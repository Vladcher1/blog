import { makeIdType, cutInfoType } from "./types";

export const makeId: makeIdType = () => {
  let initialId = 0;
  return () => initialId++;
};
export const cutByWord: string = "cut-by-word";
export const cutText: string = "cut-text";

export const cutInfo: cutInfoType = (text, cutCount, mode) => {
  //mode: 'cut-by-word' | 'cut-text'
  let counter = 0;
  let res = "";
  if (mode === cutByWord) {
    for (const letter of text) {
      counter++;
      res += letter;
      if (counter >= cutCount && letter === " ") {
        break;
      }
    }
  } else {
    for (const letter of text) {
      counter++;
      res += letter;
      if (counter === cutCount) {
        break;
      }
    }
  }
  res += "...";
  return res;
};
