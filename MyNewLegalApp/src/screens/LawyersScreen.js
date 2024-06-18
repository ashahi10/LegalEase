import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LawyersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Lawyers Conversations Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LawyersScreen;
