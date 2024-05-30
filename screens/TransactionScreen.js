import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from 'react-native-paper';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase'; // pastikan path ini benar


const TransactionScreen = ({ navigation, route }) => {

        const userData = route.params?.userData;
        console.log("Ini userData:", userData)
        const [transactionState, setTransactionState] = useState("Marketplace");
        const [transactionLoakNow, setTransactionLoakNow] = useState([]);
        const [transactionMarketplace, setTransactionMarketplace] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                if(userData){
                    const db = getFirestore(app);
                    const q = query(collection(db, "orders_loaknow"), where("uid", "==", userData?.uid));
                    console.log("Sedang query...")
                    try {
                        const querySnapshot = await getDocs(q);
                        const orders = [];
                        querySnapshot.forEach((doc) => {
                            orders.push({ id: doc.id, ...doc.data() });
                        });
                        setTransactionLoakNow(orders);
                        setLoading(false);
                    } catch (error) {
                        console.log('Error getting documents: ', error);
                        setLoading(false);
                    }
                }
            };
            fetchData();
        }, [userData, navigation]);

        console.log("Marketplace", transactionMarketplace)
        console.log("LoakNow", transactionLoakNow)



        const renderTransaction = (transaction) => {
            const createdAt = new Date(transaction.created_at.seconds * 1000 + transaction.created_at.nanoseconds / 1000000);
            const formattedDate = createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedTime = createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

            return (
                <View key={transaction.id} className="border-2 border-loaknow-bg/20 rounded-lg mb-2">
                    <View className="p-4">
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center">
                                <Image className="mr-2" source={require('../assets/images/kios-cart.png')} style={{ width: 15, height: 15 }} />
                                <Text className="font-semibold text-loaknow-gray mr-2 text-base">{transaction.name}</Text>
                                <Text className="font-semibold text-loaknow-gray text-base">&gt;</Text>
                            </View>
                            <View>
                                <Text className="text-loaknow-blue">{transaction.status ? "Complete" : "On Process"}</Text>
                            </View>
                        </View>
                        <Text className="text-loaknow-gray my-2">15 April 2024</Text>
                        <View className="flex flex-row">
                            <View>
                                <Image className="mr-2" source={{ uri: transaction.image }} style={{ width: 140, height: 84 }} />
                            </View>
                            <View>
                                <Text className="font-semibold text-base">{transaction.details}</Text>
                                <Text className="font-semibold text-base text-loaknow-blue">Rp{transaction.prices}</Text>
                                <Text>{transaction.stock}x</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-end">
                            <Text className="text-loaknow-gray">Total Harga</Text>
                        </View>
                        <View className="flex flex-row justify-end">
                            <Text className="font-semibold text-base">Rp{transaction.prices}</Text>
                        </View>
                    </View>
                    <View className="border-b-[1px] border-t-[1px] border-loaknow-gray/20">
                        <View className="flex flex-row justify-between p-4">
                            <View className="flex flex-row items-center justify-center gap-2">
                                <Image source={require('../assets/images/truck.png')} style={{ width: 24, height: 18 }} />
                                <View>
                                    <Text className="text-base">{transaction.status ? "Request Accepted" : "On Process"}</Text>
                                    <View className="flex flex-row">
                                        <Text className="text-loaknow-gray mr-2">{formattedDate}</Text>
                                        <Text className="text-loaknow-gray">{formattedTime}</Text>
                                    </View>
                                </View>
                            </View>
                            <View className="flex flex-row items-center justify-center">
                                <Text className="font-semibold text-loaknow-gray text-base">&gt;</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        };
        
        if (loading) {
            return (
                <View className="h-full justify-center items-center ">
                <View>
                    <Text className='text-loaknow-blue text-2xl'>Loading. . . .</Text>
                </View>   
            </View>
            );
        }

        return (
            <View className="flex-1 bg-white pt-10">
                <View className="mx-7">
                <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-3 my-3">
                        <TouchableOpacity onPress={()=>{
                            navigation.goBack();
                        }} className=" bg-loaknow-gray/20 rounded-full  flex items-center justify-center p-2">
                            <Image className=" " source={require('../assets/images/arrow.png')} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>
                        <View className=" ml-3 justify-center items-center">
                            <Text className=" font-semibold text-xl  "> Transaction </Text>
                        </View>
                    </View>
                    <View className="flex flex-row border-b-2 border-loaknow-bg/20 justify-between items-center px-16 my-2 mb-5">
                        <TouchableOpacity onPress={()=>{setTransactionState("Marketplace")}}  className={`${transactionState === "Marketplace" ? "border-b-2" : "border-b-0"} border-loaknow-blue mb-[-2px]`}>
                            <Text className="font-semibold text-base">Marketplace</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setTransactionState("LoakNow")}}  className={`${transactionState === "LoakNow" ? "border-b-2" : "border-b-0"} border-loaknow-blue mb-[-2px]`}>
                            <Text className="font-semibold text-base">Loak Now</Text>
                        </TouchableOpacity>
                    </View>
                    {transactionState === "Marketplace" ? (
                    transactionMarketplace.length > 0 ? (
                        transactionMarketplace.map(renderTransaction)
                    ) : (
                        <Text className="text-loaknow-gray text-center mt-4">You do not have any transactions in the marketplace</Text>
                    )
                ) : (
                    transactionLoakNow.length > 0 ? (
                        transactionLoakNow.map(renderTransaction)
                    ) : (
                        <Text className="text-loaknow-gray text-center mt-4">You do not have any transactions in Loak Now</Text>
                    )
                )}
                </View>
            </View>
        );
    }

export default TransactionScreen;