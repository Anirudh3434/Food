import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, View, Text, TextInput, Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import google from '../assets/google.png'
import { GoogleSignin } from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';

function Login() {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            Alert.alert('Login successful')
            navigation.navigate('Dashboard')
          
        } catch (error) {
            console.error(error);
         
        }

        
    }

    
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headingSection}>
                    <Text style={styles.heading}>Login to your account</Text>
                    <Text style={styles.subHeading}>
                        Please sign in to your account
                    </Text>
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

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableOpacity>

                <View style={styles.otherSignInContainer}>
                    <Text style={styles.otherSignInText}>
                        ---------------Sign in with other---------------
                    </Text>
         <View style={styles.googleSignin}>
         <TouchableOpacity>
    <Image
    source={google}
    style={styles.google}
    />
  
   </TouchableOpacity>

  <View style={styles.navigate}>
  <Text style={styles.subHeading}>
    Do not have account?
    </Text>
    <TouchableOpacity
    onPress={() => navigation.navigate('SignUp')}
    >
    <Text style={styles.forgotPasswordText}>Register</Text>
    </TouchableOpacity>
  </View>
   
         </View>

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
        marginBottom: 60,
        marginRight: 100,
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
        fontSize: 20,
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
        marginTop: 10,
        fontSize: 15,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 20,
        height: 30,
        justifyContent: 'center',
    },
    eyeButtonText: {
        color: '#007BFF',
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
    footerContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'flex-end',
    },
    forgotPassword: {
        marginRight: 20,
    },
    forgotPasswordText: {
        color: '#50aa3a',
        fontSize: 20,
        fontWeight: 'bold',
       
        
    },
    otherSignInContainer: {
        marginTop: 40,
    },
    otherSignInText: {
        color: '#333',
        fontSize: 16,
    },
    google:{
        width: 40,
        height: 40,
        marginBottom: 30,
      
    },
    googleSignin:{
        marginTop: 30,
        marginBottom: 30,
      
       width: "100%",
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center'
    },
    navigate:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center"
    }
});

export default Login;
