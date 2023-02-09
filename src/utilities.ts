export const makeId = () => {
  let initialId = 0;
  return () => initialId++;
};
export const cutByWord: string = "cut-by-word";
export const cutText: string = "cut-text";

export enum Mode {
  cutByWord,
  cutText,
}
export type cutInfoType = (
  text: string,
  cutCount: number,
  mode: string
) => string;

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
