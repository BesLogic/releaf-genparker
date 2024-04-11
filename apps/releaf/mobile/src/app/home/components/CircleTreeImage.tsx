
import { View, StyleSheet } from 'react-native';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Arbre from '@releaf-mobile/assets/images/Rectangle_6.svg';

const styles = StyleSheet.create({
  whiteCircle: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 85,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  imageOverCircle: {
    position: 'absolute',
    height: '120%',
    width: '120%',
    top: -18,
  },
});

export const CircleTreeImage = () => {
  return (
    <View style={styles.whiteCircle}>
      <Arbre style={styles.imageOverCircle} />
    </View>
  );
}