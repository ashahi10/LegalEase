import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function WelcomeScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {route.params.name}!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
