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
  for (const [color, score] of Object.entries(new_entries)) {
    const color_index = colorToIndex(color);
    all_colors[color_index] = score;
  }
  store.set(location, all_colors);
};

export const getColors = (colors: Colors): ColorEntries => {
  let all_colors = store.get(location);
  if (all_colors === undefined) {
    setupColors();
    all_colors = store.get(location);
  }

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

  const rated_colors: Array<ColorRatingPair> = all_colors.map(
    (rating, index) => {
      return { color: indexToColor(index), rating: rating };
    }
  );
  console.log(rated_colors.slice(0, n));
  const sorted_colors = rated_colors.sort((a, b) => {
    if (a.rating === b.rating) {
      return 0;
    }
    return a.rating - b.rating ? 1 : -1;
  });
  console.log(sorted_colors.slice(0, n));
  return sorted_colors.slice(0, n);
};

const colorToIndex = (color: keyof ColorEntries): number => {
  const rgb = Color(color).rgb().array();
  return (
    Math.floor(rgb[0] / 16) * 256 +
    Math.floor(rgb[1] / 16) * 16 +
    Math.floor(rgb[2] / 16)
  );
};

const indexToColor = (index: number): string => {
  let rgb = [Math.floor(index / 256), 0, 0];
  rgb[1] = Math.floor(index / 16) - rgb[0];
  rgb[2] = index - rgb[1] - rgb[0];
  rgb = rgb.map((num) => num * 16);
  return Color.rgb(rgb).hex();
};

const setupColors = () => {
  store.set("colors", Array(Math.pow(16, 3)).fill(700));
};
