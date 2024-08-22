import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import foodAppFeatures from '../assets/constant';
import { useNavigation } from '@react-navigation/native'; 


function Home() {
    const [index, setIndex] = useState(0);

    const navigation = useNavigation();

    const handleNavigateToSignUp = () => {
        navigation.navigate('SignUp'); 
    }

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % foodAppFeatures.length);
    };

    return (
        <View style={[styles.container, { backgroundColor: foodAppFeatures[index].color }]}>
            <Image source={foodAppFeatures[index].perview} style={styles.image} />
            <View style={styles.featureContainer}>
                <Text style={styles.featureTitle}>{foodAppFeatures[index].title}</Text>
                <Text style={styles.featureDescription}>{foodAppFeatures[index].description}</Text>

                <View style={styles.bar}>
                    {foodAppFeatures.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.BarComponent,
                                { backgroundColor: i === index ? '#50aa3a' : '#d4d4d4' }
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.skip, { backgroundColor: foodAppFeatures[index].color }]} onPress={handleNavigateToSignUp}>
                <Text style={[styles.buttonText, { backgroundColor: foodAppFeatures[index].color }]}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        position: 'absolute',
        width: 200,
        height: 200,
        marginBottom: 20,
        top: 120,
        zIndex: 4
    },
    featureContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    featureTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 100,
        color: 'black'
    },
    featureDescription: {
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: 40,
        backgroundColor: '#50aa3a',
        marginTop: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skip: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        backgroundColor: '#50aa3a',
        marginTop: 20,
        borderRadius: 10,
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: 10, // Corrected height value
        marginVertical: 10,
    },
    BarComponent: {
        width: 40,
        height: 10,
        borderRadius: 10,
        marginHorizontal: 1,
    }
});
