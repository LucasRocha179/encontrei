import { XStyleSheet } from '../Theme/Responsive';
import { Colors } from '../Theme/Colors';
import React, { memo } from 'react';
import { ActivityIndicator, Modal, Pressable, View } from 'react-native';

const LoadingIndicator = ({
  overlayVisible,
  type = 'default',
  color = Colors.secondary,
  size = 36,
  overlay,
  overlayColor = Colors.black50,
  onRequestClose,
  backdropPressToClose,
}) => {
  const renderLoadingIndicator = () => {
    switch (type) {
      case 'default':
        return <ActivityIndicator size={size} color={color} />;
      case 'circle':
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size={size} color={color} />
          </View>
        );
      case 'bar':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size={size} color={color} />
          </View>
        );
      // Add more cases for other loading indicator types if needed
      default:
        return null;
    }
  };

  const Container = overlay ? Modal : View;

  return (
    <Container
      statusBarTranslucent
      onRequestClose={onRequestClose}
      visible={overlayVisible}
      transparent
    >
      <Pressable
        disabled={!backdropPressToClose}
        onPress={onRequestClose}
        style={[
          overlay && {
            ...styles.overlayView,
            backgroundColor: overlayColor,
          },
        ]}
      >
        {renderLoadingIndicator()}
      </Pressable>
    </Container>
  );
};

export default memo(LoadingIndicator);

const styles = XStyleSheet.create({
  overlayView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
