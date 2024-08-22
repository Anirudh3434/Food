import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import service from '../Appwrite/config';
import RazorpayCheckout from 'react-native-razorpay';

function Cart() {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const [prices, setPrices] = useState([]);
    const [Total , setTotal]= useState(0)

    useEffect(() => {
        const getCart = async () => {
            try {
                const favorite = await service.getAllCart();
                setCart(favorite.documents);
            } catch (error) {
                console.error(error);
            }
        };

        getCart();
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            const allItems = [];
            const allPrices = [];

            cart.map((element) => {
                allItems.push(...element.items);
                element.items.forEach(item => {
                    allPrices.push(item.price);
                });
            });

            setItems(allItems);
            setPrices(allPrices);
        }
    }, [cart]);
    
    useEffect(()=>{
        const total = prices.reduce(
            (acc, current) => acc + current, 0

        )
            setTotal(total)
    }, [prices])



    return (
        <SafeAreaView>
            <View style={styles.container}>
               <View style={styles.cartList}>
               <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <View key={item.$id} style={styles.item}>
                            <Text style={styles.title}>{item.Dish_name}</Text>
                            <Text style={styles.price}>₹ {item.price}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    scrollEnabled= {true}
                
                />
               </View>

                  <View style={styles.cartContainer}>
                        <Text style={styles.text}>
                        Total: ₹ {Total} 
                        </Text> 


                        <TouchableOpacity onPress={() => {
    var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: 'rzp_live_AqFxZRKLSM1TFG',
    amount: Total*100,
    name: 'Bhardwaj',
    order_id: '',
    prefill: {
      email: 'gaurav.kumar@example.com',
      contact: '9191919191',
      name: 'Gaurav Kumar'
    },
    theme: {color: '#53a20e'}
  }
  RazorpayCheckout.open(options).then((data) => {
   
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
  
    alert(`Error: ${error.code} | ${error.description}`);
  });
}}>
                <Text style={styles.text}>
                    Pay
                </Text>
            </TouchableOpacity>      
                </View>

           

            </View>
        </SafeAreaView>
    );
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    item: {
        backgroundColor: '#fff',
        width: '95%',
        height: 80,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#00cd70',
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        margin: 20,
    },
    price: {
        fontSize: 18,
        color: '#000',
        margin: 10,
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
    bottom: 160,
    borderRadius: 10,
    zIndex: 34 },

    text: {
        fontSize: 18,
        color: '#fff',
        marginHorizontal: 20
    
    },
    cartList: {
        height: '70%'
    }
});
