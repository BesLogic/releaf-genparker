import { View, Text, StyleSheet } from 'react-native';
import { CircleVitalStatus } from './CircleVitalStatus';
import { CircleTreeImage } from './CircleTreeImage';

const styles = StyleSheet.create({
  textColor: {
    color: '#2C4E3C',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  marginTop: {
    marginTop: 8,
  },
  treeImg: {
    width: 80,
    height: 80,
  },
  mainCard: {
    padding: 20,
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: '#DCFADE',
  },
  topSection: {
    flexDirection: 'row',
  },
  topColumnLeft: {
    width: '30%',
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 50,
    padding: 10,
    marginTop: 20,
  },
  dataCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export const TreeStateCard = ({ box }) => {
  return (
    <View style={styles.mainCard}>
      <View style={styles.topSection}>
        <View style={styles.topColumnLeft}>
          <CircleTreeImage></CircleTreeImage>
        </View>
        <View>
          <Text ellipsizeMode="tail" style={[styles.textColor, styles.title]}>
            {box}
          </Text>
          <View>
            <Text style={[styles.textColor, styles.marginTop]}>
              Germination: 2024-07-03
            </Text>
            <Text style={[styles.textColor, styles.marginTop]}>Age: 4</Text>
            <Text style={[styles.textColor, styles.marginTop]}>Height: 23</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <CircleVitalStatus type={'water'}></CircleVitalStatus>
        <CircleVitalStatus type={'temperature'}></CircleVitalStatus>
        <CircleVitalStatus type={'light'}></CircleVitalStatus>
      </View>
    </View>
  );
};
