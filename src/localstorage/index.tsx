import store from "store";
import Color from "color";

const location = "colors";

export type ColorEntries = {
  [key: string]: number;
};

export type Colors = Array<string>;

export type ColorRatingPair = {
  color: string;
  rating: number;
};

export const setColors = (new_entries: ColorEntries) => {
  let all_colors: ColorEntries = store.get(location);
  if (all_colors === undefined) {
    setupColors();
    all_colors = store.get(location);
  }
  for (const [color, score] of Object.entries(new_entries)) {
    all_colors[color] = score;
  }
  store.set(location, all_colors);
};

export const getColors = (colors: Colors): ColorEntries => {
  let all_colors = store.get(location);
  if (all_colors === undefined) {
    setupColors();
    all_colors = store.get(location);
  }
  console.log(`get ${all_colors.length}`);
  const entries: ColorEntries = {};
  colors.forEach((color) => {
    if (color in all_colors) {
      entries[color] = all_colors[color];
    } else {
      entries[color] = 700;
    }
  });
  return entries;
};

export const getTopColors = (n: number) => {
  let all_colors: ColorEntries = store.get(location);
  if (all_colors === undefined) {
    setupColors();
    all_colors = store.get(location);
  }
  let rated_colors: Array<ColorRatingPair> = [];
  for (const [color, rating] of Object.entries(all_colors)) {
    rated_colors.push({ color: color, rating: rating });
  }
  const sorted_colors = rated_colors.sort((a, b) => {
    if (a.rating === b.rating) {
      return 0;
    }
    return a.rating < b.rating ? 1 : -1;
  });
  return sorted_colors.slice(0, n);
};

const setupColors = () => {
  store.set("colors", {});
};
