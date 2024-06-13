import React from 'react';
import { View, Text, Button } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="Go to SignUp" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default LoginScreen;
