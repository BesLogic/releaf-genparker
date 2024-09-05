import * as React from "react"
import Svg, { G, Rect, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = (props) => {
  const lerp = (a, b, decPercent) => {
    return (a * (1 - decPercent)) + (b * decPercent);
  }

  const maxHeight = 21;
  const minHeight = 0;
  const maxY = 28;
  const height = lerp(minHeight, maxHeight, props.percent);
  const y = maxY - height;

  const happyColor = "#D1BEA7";
  const lowColor = "#EF0000";
  const color = props.percent > 0.5 ? happyColor : lowColor;

  return <Svg
    width={16}
    height={32}
    fill="none"
  >
    <G clipPath="url(#a)">
      <Rect
        width={14}
        height={27}
        x={1}
        y={4}
        stroke="#D1BEA7"
        strokeWidth={2}
        rx={3}
      />
      <Rect
        width={8}
        height={height}
        x={4}
        y={y}
        fill={color}
        rx={0.5}
      />
      <Path fill="#D1BEA7" d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H5V1Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>;
}
export default SvgComponent