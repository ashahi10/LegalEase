import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'black', // Button color
        padding: 10, // Padding inside the button
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        borderRadius: 5, // Rounded corners
        width: 100, // Width of the button
        height: 40, // Height of the button
        marginTop: 10, // Margin top for spacing from the previous button
    },
    text: {
        color: 'white', // Text color
        fontSize: 16, // Text size
    }
});

export default HomeScreen;
