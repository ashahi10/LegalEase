import React, { useState } from 'react';
import { View, Text,TextInput, Button, StyleSheet, ScrollView } from 'react-native';

function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        // Placeholder for whatever you want to do with the form data
        console.log(name, address, phone, email, password, confirmPassword);
        // Example: navigate back to the home screen after sign up
        // navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Join us today!</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Full Legal Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Choose A Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Re-Enter Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button
                title="Sign Up"
                onPress={handleSignUp}
                color="#6200EE"
            />
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        width: '100%'
    }
});

export default SignUpScreen;
