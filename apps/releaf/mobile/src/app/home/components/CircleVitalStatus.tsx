import { View, Text, StyleSheet } from 'react-native';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Thermostat from '@releaf-mobile/assets/images/device_thermostat.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Water from '@releaf-mobile/assets/images/water_drop.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Light from '@releaf-mobile/assets/images/light_mode.svg';


const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outsideCircle: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  insideCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  water: {
    backgroundColor: '#00c4df',
  },
  temperature: {
    backgroundColor: '#f28100',
  },
  light: {
    backgroundColor: '#f0d800',
  },
});

export const CircleVitalStatus = ({ type = 'light' }) => {
  if (type == 'water') {
    return (
      <View style={[styles.outsideCircle, styles.water, styles.center]}>
        <View style={[styles.insideCircle, styles.center]}>
          <Water></Water>
        </View>
      </View>
    );
  }
  else if (type == 'temperature') {
    return (
      <View style={[styles.outsideCircle, styles.temperature, styles.center]}>
        <View style={[styles.insideCircle, styles.center]}>
          <Thermostat></Thermostat>
        </View>
      </View>
    );
  }
  else {
    return (
      <View>
        <View style={[styles.outsideCircle, styles.light, styles.center]}>
          <View style={[styles.insideCircle, styles.center]}>
            <Light></Light>
          </View>
        </View>
      </View>
    );
  }
};
