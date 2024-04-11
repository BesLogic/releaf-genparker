import { View, Text, StyleSheet } from 'react-native';
import { CircleTreeImage } from './Circle-tree-image';
import { CircleVitalStatus } from './Circle-vital-status';

const styles = StyleSheet.create({
  textColor: {
    color: '#2C4E3C'
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

export const TreeStateCard = ({ treeState }) => {
  return (
    <View style={styles.mainCard}>
      <View style={styles.topSection}>
        <View style={styles.topColumnLeft}>
          <CircleTreeImage></CircleTreeImage>
        </View>
        <View>
          <Text style={[styles.textColor, styles.title]}>{treeState.name}</Text>
          <View>
            <Text style={[styles.textColor, styles.marginTop]}>Germination: {treeState.germinationDate.toDateString()}</Text>
            <Text style={[styles.textColor, styles.marginTop]}>Age: {treeState.ageInDays}</Text>
            <Text style={[styles.textColor, styles.marginTop]}>Height: {treeState.height}</Text>
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
