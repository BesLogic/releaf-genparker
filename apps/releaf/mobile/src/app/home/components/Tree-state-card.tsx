import { View, Text, StyleSheet } from 'react-native';
import Arbre from '@releaf-mobile/assets/images/Rectangle_6.svg';

const styles = StyleSheet.create({
  treeImg: {
    width: 80,
    height: 80,
  },
  mainCard: {
    padding: 20,
    paddingBottom: 15,
    borderRadius: 15,
    // backgroundColor: '#DCFADE',
    backgroundColor: 'green',
  },
  topSection: {
    flexDirection: 'row',
  },
  topColumnLeft: {
    width: '30%',
  },
  whiteCircle: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 85,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    backgroundColor: '#F0F0F0',
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
          <View style={styles.whiteCircle}>
            <Arbre width="300" height="300" />
          </View>
        </View>
        <View>
          <Text>{treeState.name}</Text>
          <Text>{treeState.germinationDate.toDateString()}</Text>
          <Text>{treeState.ageInDays}</Text>
          <Text>{treeState.height}</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={{ ...styles.dataCircle, backgroundColor: 'red' }}></View>
        <View
          style={{ ...styles.dataCircle, backgroundColor: 'yellow' }}
        ></View>
        <View style={{ ...styles.dataCircle, backgroundColor: 'green' }}></View>
      </View>
    </View>
  );
};
