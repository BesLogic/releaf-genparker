import Svg, { Path, Rect } from "react-native-svg"

export const Temperature = (props: { value: number }) => {
  const temperature = Math.min(Math.max(props.value, 5), 31);
  const rightTranslatedTemperature = (1.8 * temperature) - 9;
  const leftTranslatedTemperature = (-1.8 * temperature) + 63;

  const thermometerColor = temperature > 25 
    ? "#FF543D" 
    : temperature > 10 
      ? "#009F23" 
      : "#1EA1FF";

  return <Svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
    >
      <Path
        d="M32 54v.01"
        stroke="#fff"
        strokeWidth={20}
        strokeLinecap="round"
      />
      <Path d="M32 6v48" stroke="#fff" strokeWidth={12} strokeLinecap="round" />
      <Rect x={40} y={42} width={8} height={2} rx={1} fill="#1EA1FF" />
      <Rect x={40} y={33} width={4} height={2} rx={1} fill="#C4C4C4" />
      <Rect x={40} y={24} width={8} height={2} rx={1} fill="#009F23" />
      <Rect x={40} y={15} width={4} height={2} rx={1} fill="#C4C4C4" />
      <Rect x={40} y={6} width={8} height={2} rx={1} fill="#FF543D" />
      <Path
        d="M32 54v.01"
        stroke={thermometerColor}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <Path
        d={`M32 ${leftTranslatedTemperature}v${rightTranslatedTemperature}`}
        stroke={thermometerColor}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </Svg>
}