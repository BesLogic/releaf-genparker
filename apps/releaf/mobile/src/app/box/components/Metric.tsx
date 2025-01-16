import { styled } from "nativewind";
import { View, Text } from "react-native";
import { Battery } from "../../icones/Battery";

const SView = styled(View);
const SText = styled(Text);

export const Metric = (props: { metric, batteryLevel: number, value: string }) => {
  return (
    <SView className="flex-row items-center gap-1 ml-2 pl-vw1/4 right-2 h-vw1/5">
      <SView className="flex-row h-full bg-releaf-taupe-200 items-center justify-evenly flex-4 rounded-2xl">
        {props.metric}
        <SText className="bg-white pt-2 pb-2 pl-6 pr-6 rounded-3xl w-24 text-center">{ props.value }</SText>
        <SView className="h-full bg-releaf-taupe-300 opacity-10 w-0.5"></SView>
        <Battery percent={props.batteryLevel} />
      </SView>
    </SView>
  )
}