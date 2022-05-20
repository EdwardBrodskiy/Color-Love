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
  const podium_badges = ["#FFD700", "#C0C0C0", "#cc6633"];
  const color_blocks = colors.map((value, index) => (
    <div
      style={{
        // maxWidth: `${85 / colors.length}%`,
        aspectRatio: "1",
        backgroundColor: value.color,
        padding: "2em",
        margin: "0.2em",
        color: Color(value.color).isDark() ? "white" : "black",
        border:
          index < 3 ? `6px outset ${podium_badges[index]}` : `6px outset #555`,
        borderRadius: "100%",
      }}
      key={index}
    >
      {/* {Math.round(value.rating)} */}
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
        left: "0.2em",
        top: "0.2em",
        right: "0.2em",
      }}
    >
      {color_blocks}
    </div>
  );
};

export default Podium;
