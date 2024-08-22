import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid, Platform, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import service from '../Appwrite/config';
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth';
import fetchWeather from '../weather';
import Favourite from '../Component/Favourite';
import Cart from '../Component/Cart';

function UserDashboard() {
    const [posts, setPosts] = useState([]);
    const [weatherInfo, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [screen, setScreen] = useState('Home');
    const [ cart , setCart ] = useState([])

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await auth().currentUser;
                if (user) {
                    setUser(user);
                    setEmail(user.email);
                } else {
                    console.warn('No user found');
                }
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };

        getUser();
    }, []);

    const handleAddToFavorites = async (id, email) => {
        if (!id || !email) {
            Alert.alert('Error', 'ID or email is missing.');
            return;
        }

        try {
            const response = await service.addFav(id, email);
            if (response) {
                Alert.alert('Added to Favorite');
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            Alert.alert('Error', 'Failed to add to favorites.');
        }
    };

    const addCart = (id) =>{
        if (id) {
            cart.push(id)
            console.log(cart);
        }

    }


    const handleAddToCart = async () => {
        if (!cart || !email) {
            Alert.alert('Error', 'ID or email is missing.');
            return;
        }

        try {
            const response = await service.addCart(cart, email);
            if (response) {
                Alert.alert('Success', 'Add to cart Successfully');
                setCart([])
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            Alert.alert('Error', 'Failed to add to favorites.');
        }
    };


    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'App needs access to your location.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.warn('Location permission not granted');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };

        requestPermissions();
        getCurrentLocation(); // Call to get the location when the component mounts
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(position.coords);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    useEffect(() => {
        if (location) {
            const fetchWeatherData = async () => {
                try {
                    const response = await fetchWeather(location.latitude, location.longitude);
                    if (response) {
                        setWeather(response);
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            };

            fetchWeatherData();
        }
    }, [location]);


    const empty = () =>{
        setCart([])
    }


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await service.getAllPosts();
                if (fetchedPosts) {
                    const data = fetchedPosts.documents;
                    const updatedPosts = await Promise.all(data.map(async (post) => {
                        try {
                            const preview = await service.getFilePreview(post.Image);
                            post.PreviewImage = preview;
                        } catch (error) {
                            console.error('Error fetching preview image:', error);
                        }
                        return post;
                    }));
                    setPosts(updatedPosts);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
        const interval = setInterval(fetchPosts, 5000);

        return () => clearInterval(interval); 
    }, []);

   
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.location}>
                        <Ionicons name='location-sharp' style={[styles.icon, { fontSize: 20, color: 'black' }]} />
                        <Text style={styles.text}>{weatherInfo?.name || 'Location'}</Text>
                    </View>
                    <View style={styles.location}>
                        <Text> </Text>
                        <Text style={[styles.text, { fontSize: 20 }]}>
                            {weatherInfo?.main?.temp ? `${weatherInfo.main.temp}°C` : 'N/A'}
                        </Text>
                    </View>
                </View>

              

                <View style={styles.fragmant}>
                    {screen === 'Home' && (
                        <FlatList
                            data={posts}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    {item.PreviewImage && (
                                        <Image source={{ uri: item.PreviewImage }} style={styles.image} />
                                    )}
                                    <Text style={styles.dishName}>{item.Dish_name}</Text>
                                    <Text style={styles.price}>Rs {item.price}</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity
                                            accessibilityLabel="Add to favorites"
                                            accessibilityRole="button"
                                            onPress={() => handleAddToFavorites(item.$id, email)}
                                        >
                                            <MaterialIcons name='favorite-border' style={[styles.icon, { fontSize: 20 }]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity accessibilityLabel="Add to cart" accessibilityRole="button"
                                        onPress={()=>addCart(item.$id)}
                                        >
                                            <AntDesign name='shoppingcart' style={[styles.icon, { fontSize: 20 }]} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.$id}
                        />
                    )}
                    {screen === 'Favorites' && <Favourite />}
                    {screen === 'Cart' && <Cart />}
                </View>
              {
                cart.length > 0 && (
                    <View style={styles.cartContainer}>

<TouchableOpacity accessibilityLabel="Cart" accessibilityRole='button' onPress={empty}>
                        <AntDesign name='delete' style={[styles.icon , {color: 'white',  marginHorizontal: 20}]} />
                    </TouchableOpacity>

                    <Text style={styles.cartText}>
                         {cart.length} Items
                    </Text>

                    <TouchableOpacity accessibilityLabel="Cart" accessibilityRole='button' onPress={handleAddToCart}>
                        <AntDesign name='shoppingcart' style={[styles.icon , {color: 'white',  marginHorizontal: 20}]} />
                    </TouchableOpacity>
                </View>
                )
              }
                <View style={styles.rowM}>
                    <TouchableOpacity accessibilityLabel="Home" accessibilityRole='button' onPress={() => setScreen('Home')}>
                        <AntDesign name='home' style={[styles.icon]} />
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityLabel="Favourites" accessibilityRole='button' onPress={() => setScreen('Favorites')}>
                        <MaterialIcons name='favorite-border' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityLabel="Cart" accessibilityRole='button' onPress={() => setScreen('Cart')}>
                        <AntDesign name='shoppingcart' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityRole='button'>
                        <AntDesign name='filter' style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default UserDashboard;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    row: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowM: {
        position: 'absolute',
        bottom: 0,
       
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 1,
        margin: 5,
        zIndex: 34
        
    },
    location: {
        margin: 10,
    },
    text: {
        fontSize: 25,
        color: '#2a2a2f',
        fontWeight: '700',
    },
    icon: {
        padding: 5,
        fontSize: 40,
        color: '#00cd70',
    },
    card: {
        padding: 10,
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
        width: 180,
    },
    image: {
        width: 180,
        height: 100,
        borderRadius: 5,
    },
    dishName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 18,
        color: '#00cd70',
    },
    fragmant: {
        marginVertical: 10,
        width: '100%',
    },
    cartContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    height: 60,
    backgroundColor: '#00cd70',
    bottom: 70,
    borderRadius: 10,
    zIndex: 34
    
    },

    cartText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        marginHorizontal: 20
        
    }
});
