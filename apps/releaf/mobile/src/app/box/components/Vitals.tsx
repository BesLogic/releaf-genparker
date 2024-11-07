import { styled } from "nativewind";
import { View, Text, } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { HealthMetrics } from "../../../assets/images/health-metrics";

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
      className="rounded-2xl h-vw7.8/10 pl-vw1/3"
    >
      <SView className="flex-row items-center pt-2">
        <HealthMetrics height={20} width={20}></HealthMetrics>
        <SText className="pl-2 font-lato-bold text-2xl color-releaf-brown-900">Vitals</SText>
      </SView>
    </SLinearGradient>
  </SLinearGradient>);
  // <View styles={class="box flex flex-col"}>
  {/* class="box flex flex-col" */ }
  {/* <div class="flex justify-center">
      <img src="assets/vitals/cross.svg" alt="cross" />
      <span class="vitals">Vitals</span>
    </div>

    <div class="wide-box relative">
      <img class="warning" src="assets/vitals/warning.svg" alt="warning" />

      <div class="symbol">
        <!-- <img src="assets/vitals/light-lower.svg" alt="light-lower" /> -->
        <!-- <img src="assets/vitals/light-low.svg" alt="light-low" /> -->
        <!-- <img src="assets/vitals/light-normal.svg" alt="light-normal" /> -->
        <!-- <img src="assets/vitals/light-high.svg" alt="light-high" /> -->
        <img src="assets/vitals/light-higher.svg" alt="light-higher" />
      </div>
      <div class="percent rounded-full">80%</div>

      <div id="battery-light" class="battery-wrapper">
        <Battery percent={0.5} />
      </div>
    </div>

    <div class="wide-box relative">
      <img class="warning" src="assets/vitals/warning.svg" alt="warning" />
      <div class="symbol flex">
        <!-- <img src="assets/vitals/humidity-lower.svg" alt="humidity-lower" /> -->
        <!-- <img src="assets/vitals/humidity-low.svg" alt="humidity-low" /> -->
        <!-- <img src="assets/vitals/humidity-normal.svg" alt="humidity-normal" /> -->
        <!-- <img src="assets/vitals/humidity-high.svg" alt="humidity-high" /> -->
        <img src="assets/vitals/humidity-higher.svg" alt="humidity-higher" />
      </div>

      <div class="percent rounded-full">50%</div>

      <div id="battery-humidity" class="battery-wrapper">
        <Battery percent={0.5} />
      </div>
    </div>

    <div class="wide-box relative">
      <img class="warning" src="assets/vitals/warning.svg" alt="warning" />
      <div class="symbol flex">
        <!-- <img src="assets/vitals/temp-lower.svg" alt="temp-lower" /> -->
        <!-- <img src="assets/vitals/temp-low.svg" alt="temp-low" /> -->
        <!-- <img src="assets/vitals/temp-normal.svg" alt="temp-normal" /> -->
        <!-- <img src="assets/vitals/temp-high.svg" alt="temp-high" /> -->
        <img src="assets/vitals/temp-higher.svg" alt="temp-higher" />
      </div>

      <div class="percent rounded-full">30,7 ˚C</div>

      <div id="battery-temp" class="battery-wrapper">
        <Battery percent={0.5} />
      </div>
    </div> */}
  // </View>)
};