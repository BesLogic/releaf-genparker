import { styled } from "nativewind";
import { View, Text, } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { HealthMetrics } from "../../../assets/images/health-metrics";
import { Humidity } from "../../../assets/images/vitals/humidity";
import { Temperature } from "../../../assets/images/vitals/temperature";
import { Light } from "../../../assets/images/vitals/light";
import { BoxItem } from "../../infrastructure/entities/box";
import { Metric } from "./Metric";

const SLinearGradient = styled(LinearGradient);
const SView = styled(View);
const SText = styled(Text);

export const Vitals = (props: { box: BoxItem }) => {
  const humidty = Math.abs((props.box.vitals.soilMoisturePercent.value - 16) / 0.67).toFixed(1);
  return (<SLinearGradient
    colors={['#8E7555', '#8E7555']}
    className="rounded-3xl h-vw7.9/10 elevation-md mb-10"
  >
    <SLinearGradient
      colors={['#F3E9DD', '#D8C9B7']}
      className="rounded-2xl h-vw7.8/10"
    >
      <SView className="flex-row items-center pt-2 pl-vw1/3">
        <HealthMetrics height={20} width={20}></HealthMetrics>
        <SText className="pl-2 font-lato-bold text-2xl color-releaf-brown-900">Vitals</SText>
      </SView>
      <SView className="h-vw2/3 justify-evenly">
        <Metric 
          value={`${(props.box.vitals.luminosityPercent.value * 100).toFixed(1)}%`}
          batteryLevel={props.box.vitals.luminosityPercent.batteryLevel / 100}
          metric={
            <Light value={props.box.vitals.luminosityPercent.value * 100} />
          }
        ></Metric>
        
        <Metric
          value={`${humidty}%`}
          batteryLevel={props.box.vitals.soilMoisturePercent.batteryLevel / 100}
          metric={
            <Humidity value={Number(humidty) / 100} />
          }
        ></Metric>
        
        <Metric
          value={`${props.box.vitals.temperature.value.toFixed(1)}°C`}
          batteryLevel={props.box.vitals.temperature.batteryLevel}
          metric={
            <Temperature value={props.box.vitals.temperature.value} />
          }
        ></Metric>
      </SView>
    </SLinearGradient>
  </SLinearGradient>);

};