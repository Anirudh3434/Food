import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import service from '../Appwrite/config';

function Favourite() {
    const [favourite, setFavourite] = useState([]);

    useEffect(() => {
        const getFavourite = async () => {
            try {
                const favorite = await service.getAllFavourite();
                if (favorite) {
                    const data = favorite.documents;
                    const updatedFav = await Promise.all(
                        data.map(async (fav) => {
                            try {
                                const preview = await service.getFilePreview(fav.items.Image);
                                fav.items.PreviewImage = preview;
                            } catch (error) {
                                console.log(error);
                            }
                            return fav;
                        })
                    );
                    setFavourite(updatedFav);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getFavourite();
    }, []); 

    return (
        <SafeAreaView>
            <FlatList
                data={favourite}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.items.PreviewImage && (
                            <Image source={{ uri: item.items.PreviewImage }} style={styles.image} />
                        )}
                        <Text style={styles.dishName}>{item.items.Dish_name}</Text>
                        <Text style={styles.price}>Rs {item.items.price}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.$id}
            />
        </SafeAreaView>
    );
}

export default Favourite;

const styles = StyleSheet.create({
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
});
