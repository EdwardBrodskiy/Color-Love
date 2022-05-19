import * as React from "react";

const colorBlock = {
  height: "50%",
  innerWidth: "100%",
};

type Props = {
  color: string;
};

// markup
const ColorTile = ({
  color,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} style={{ ...colorBlock, backgroundColor: color }}></div>
  );
};

export default ColorTile;
