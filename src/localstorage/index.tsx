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
  let all_colors = store.get(location);
  if (all_colors === undefined) {
    setupColors();
    all_colors = store.get(location);
  }
  console.log(`set ${all_colors.length}`);
  console.log(new_entries);
  const test = indexToColor(32 * 32);
  console.log(test);
  console.log(indexToColor(colorToIndex("#ffffff")));
  for (const [color, score] of Object.entries(new_entries)) {
    const color_index = colorToIndex(color);
    all_colors[color_index] = score;
  }
  console.log(`set2 ${all_colors.length}`);
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
    const color_index = colorToIndex(color);
    entries[color] = all_colors[color_index];
  });
  return entries;
};

export const getTopColors = (n: number) => {
  let all_colors: Array<number> = store.get(location);
  if (all_colors === undefined) {
    setupColors();
    all_colors = store.get(location);
  }
  console.log(`top ${all_colors.length}`);
  const rated_colors: Array<ColorRatingPair> = all_colors.map(
    (rating, index) => {
      return { color: indexToColor(index), rating: rating };
    }
  );
  const sorted_colors = rated_colors.sort((a, b) => {
    if (a.rating === b.rating) {
      return 0;
    }
    // console.log(a.rating < b.rating ? 1 : -1);
    return a.rating < b.rating ? 1 : -1;
  });
  return sorted_colors.slice(0, n);
};

const div = 32;

const colorToIndex = (color: keyof ColorEntries): number => {
  const rgb = Color(color).rgb().array();
  return (
    Math.floor(rgb[0] / div) * div * div +
    Math.floor(rgb[1] / div) * div +
    Math.floor(rgb[2] / div)
  );
};

const indexToColor = (index: number): string => {
  let rgb = [Math.floor(index / (div * div)), 0, 0];
  rgb[1] = Math.floor(index / div) - rgb[0] * div;
  rgb[2] = index - rgb[1] * div - rgb[0] * div * div;
  if (index == 32 * 32) console.log(rgb);
  rgb = rgb.map((num) => num * div);
  return Color.rgb(rgb).hex();
};

const setupColors = () => {
  store.set("colors", Array(Math.pow(256 / div, 3)).fill(700));
};
