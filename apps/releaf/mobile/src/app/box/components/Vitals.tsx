import { styled } from "nativewind";
import { View, Text, } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { HealthMetrics } from "../../../assets/images/health-metrics";
import { Battery } from "../../icones/Battery";
import { Humidity } from "../../..//assets/images/vitals/humidity";
import { Temperature } from "../../../assets/images/vitals/temperature";
import { Light } from "../../../assets/images/vitals/light";

const SLinearGradient = styled(LinearGradient);
const SView = styled(View);
const SText = styled(Text);

export const Vitals = ({ type = 'light' }) => {
  return (<SLinearGradient
    colors={['#8E7555', '#8E7555']}
    className="rounded-3xl h-vw7.9/10 elevation-md mb-10"
  >
    <SLinearGradient
      colors={['#F3E9DD', '#D8C9B7']}
      className="rounded-2xl h-vw7.8/10"
    >
      <SView className="flex-row items-center pt-2  pl-vw1/3">
        <HealthMetrics height={20} width={20}></HealthMetrics>
        <SText className="pl-2 font-lato-bold text-2xl color-releaf-brown-900">Vitals</SText>
      </SView>
      <SView className="flex-row items-center gap-1 pl-vw1/4 right-2 h-vw1">
        <SView className="flex-row h-full bg-releaf-taupe-200 items-center justify-evenly flex-4 rounded-2xl">
          <Light value={0.5} />
          <SText className="bg-white pt-2 pb-2 pl-6 pr-6 rounded-3xl">66%</SText>
          <SView className="h-full bg-releaf-taupe-300 opacity-10 w-0.5"></SView>
          <Battery percent={0.75} />
        </SView>
      </SView>
      <SView className="flex-row items-center gap-1 pl-vw1/4 right-2 h-vw1">
        <SView className="flex-row h-full bg-releaf-taupe-200 items-center justify-evenly flex-4 rounded-2xl">
          <Humidity value={0.8} />
          <SText className="bg-white pt-2 pb-2 pl-6 pr-6 rounded-3xl">66%</SText>
          <SView className="h-full bg-releaf-taupe-300 opacity-10 w-0.5"></SView>
          <Battery percent={0.75} />
        </SView>
      </SView>
      <SView className="flex-row items-center gap-1 pl-vw1/4 right-2 h-vw1">
        <SView className="flex-row h-full bg-releaf-taupe-200 items-center justify-evenly flex-4 rounded-2xl">
          <Temperature value={15} />
          <SText className="bg-white pt-2 pb-2 pl-6 pr-6 rounded-3xl">66%</SText>
          <SView className="h-full bg-releaf-taupe-300 opacity-10 w-0.5"></SView>
          <Battery percent={0.75} />
        </SView>
      </SView>
    </SLinearGradient>
  </SLinearGradient>);

};