export const makeId = () => {
  let initialId = 0;
  return () => initialId++;
};

export const cutInfo = (text: string, cutCount: number) => {
  let counter = 0;
  let res = "";

  for (const letter of text) {
    counter++;
    res += letter;
    if (counter >= cutCount && letter === " ") {
      break;
    }
  }
  res += "...";
  return res;
};
