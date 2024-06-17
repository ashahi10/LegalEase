// Import necessary items
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //console.log('User ID:', user.uid);

            const userRef = doc(firestore, "users", user.uid);
            //console.log('User Ref:', userRef); 

            const userDoc = await getDoc(userRef);
            //console.log('User Document Exists:', userDoc.exists());  

            if (userDoc.exists()) {
                const userData = userDoc.data();
                //console.log('User Data:', userData);

                // Navigate to the Welcome screen with user's name
                navigation.navigate('Welcome', { name: userData.name });
            } else {
                Alert.alert('Error', 'No user data found');
            }
            
            //code for email verification which will beused later with real email address to verify the email
            // const user = userCredential.user;
            // if (!user.emailVerified) {
            //     Alert.alert('Error', 'Please verify your email first');
            //     return;
            // }
            // Navigate to the Welcome or Home screen after successful login
            // navigation.navigate('Welcome', { name: userData.name });

        } catch (error) {
            //console.error('Login Error:', error);
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Login to Your Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title={loading ? 'Loading...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
            />
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                Don't have an account? SignUp here.
            </Text>
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
    },
    link: {
        color: 'blue',
        marginTop: 15,
        textAlign: 'center'
    }
});

export default LoginScreen;
