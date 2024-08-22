import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';


function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [agree, setAgree] = useState(false);

    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (username === '' || email === '' || password === '') {
            Alert.alert('Error', 'Please fill all details');
            return;
        }
        if (!agree) {
            Alert.alert('Error', 'Please accept the terms and conditions');
            return; 
        }

        try {
            await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Success', 'Account created');
            navigation.navigate('Login');
            
        } catch (error) {
            Alert.alert('Error',`${error}`);
        }
    };

  
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headingSection}>
                    <Text style={styles.heading}>Create your new account.</Text>
                    <Text style={styles.subHeading}>
                        Create an account to start looking for the food you like
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Text style={styles.eyeButtonText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={agree}
                        onValueChange={setAgree}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkboxLabel}>I accept the terms and conditions</Text>
                </View>
                <TouchableOpacity
                    style={agree ? styles.button : styles.nobutton}
                    onPress={handleSignUp}
                    disabled={!agree}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.otherSignInContainer}>
                    <Text style={styles.subHeading}>
                        Have an account?{' '}
                        <TouchableOpacity
                         onPress={() => navigation.navigate('Login')}
                        >

                            <Text style={styles.forgotPasswordText}>Sign In</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    headingSection: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'flex-start',
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    subHeading: {
        fontSize: 20,
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        height: 30,
        justifyContent: 'center',
    },
    eyeButtonText: {
        color: '#007BFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#50aa3a',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nobutton: {
        width: '100%',
        height: 50,
        backgroundColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    otherSignInContainer: {
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#50aa3a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    googleSignin: {
        marginTop: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default SignUp;
