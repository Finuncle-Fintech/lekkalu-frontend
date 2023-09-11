export const numDifferentiation = (val: number) => {
  let _val: string = "";

  if (val >= 10000000) _val = (val / 10000000).toFixed(2) + " Cr";
  else if (val >= 100000) _val = (val / 100000).toFixed(2) + " Lac";
  else if (val >= 1000) _val = (val / 1000).toFixed(2) + " K";

  return _val;
};
