import Color from "color";
import * as React from "react";
import { ColorRatingPair } from "../localstorage";

type Props = {
  colors: Array<ColorRatingPair>;
};

// markup
const Podium = ({
  colors,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  const color_blocks = colors.map((value, index) => (
    <div
      style={{
        // maxWidth: `${85 / colors.length}%`,
        aspectRatio: "1",
        backgroundColor: value.color,
        padding: `${20 / colors.length}%`,
        margin: `${10 / colors.length}%`,
        color: Color(value.color).isDark() ? "white" : "black",
      }}
      key={index}
    >
      {Math.round(value.rating)}
    </div>
  ));
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "transparent",
        position: "absolute",
        left: 20,
        top: 20,
        right: 20,
      }}
    >
      {color_blocks}
    </div>
  );
};

export default Podium;
