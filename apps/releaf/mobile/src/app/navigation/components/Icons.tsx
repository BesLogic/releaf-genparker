import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';

// eslint-disable-next-line @nx/enforce-module-boundaries
import StoreFront from '@releaf-mobile/assets/images/storefront.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Face from '@releaf-mobile/assets/images/face.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import MenuBook from '@releaf-mobile/assets/images/menubook.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PottedPlant from '@releaf-mobile/assets/images/PottedPlant.svg';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Notification from '@releaf-mobile/assets/images/notifications.svg';

export enum IconType {
  StoreFront,
  Face,
  MenuBook,
  Notification,
  PottedPlant,
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    borderColor: '#009959',
  },
});

export const Icons = (props: { type: IconType; isSelected: boolean }) => {
  let componentStyles: StyleProp<ViewStyle> = {};

  let color = '#FFFFFF';

  if (props.isSelected) {
    componentStyles = [styles.circle, styles.center];
    color = '#009959';
  } else {
    componentStyles = [styles.center];
    color = '#FFFFFF';
  }

  if (props.type === IconType.StoreFront) {
    return (
      <View style={componentStyles}>
        <StoreFront fill={color} />
        <Text style={{ color: color }}>{!props.isSelected ? 'Order' : ''}</Text>
      </View>
    );
  } else if (props.type === IconType.Face) {
    return (
      <View style={componentStyles}>
        <Face fill={color} />
        <Text style={{ color: color }}>{!props.isSelected ? 'Me' : ''}</Text>
      </View>
    );
  } else if (props.type === IconType.MenuBook) {
    return (
      <View style={componentStyles}>
        <MenuBook fill={color} />
        <Text style={{ color: color }}>
          {!props.isSelected ? 'Knowledge' : ''}
        </Text>
      </View>
    );
  } else if (props.type === IconType.Notification) {
    return (
      <View style={componentStyles}>
        <Notification fill={color} />
        <Text style={{ color: color }}>
          {!props.isSelected ? 'Notification' : ''}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={componentStyles}>
        <PottedPlant fill={color} />
        <Text style={{ color: color }}>
          {!props.isSelected ? 'Details' : ''}
        </Text>
      </View>
    );
  }
};
