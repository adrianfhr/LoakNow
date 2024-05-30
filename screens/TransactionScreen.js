import { View } from "react-native";
import { Text } from 'react-native-paper';
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const TransactionScreen = () => {
        const navigation = useNavigation();
        return (
            <View className="flex-1 bg-white pt-10">
                <View className="mx-7">
                <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-3 my-3">
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Bottom', { screen: 'Cart' });
                        }} className=" bg-loaknow-gray/20 rounded-full  flex items-center justify-center p-2">
                            <Image className=" " source={require('../assets/images/arrow.png')} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>
                        <View className=" ml-3 justify-center items-center">
                            <Text className=" font-semibold text-xl  "> Transaction </Text>
                        </View>
                    </View>
                    <View className="flex flex-row border-b-2 border-loaknow-bg/20 justify-between items-center px-16 my-2 mb-5">
                        <View className=" border-b-2 border-loaknow-blue mb-[-2px]">
                            <Text className="font-semibold text-base">Marketplace</Text>
                        </View>
                        <View>
                            <Text className="font-semibold text-base">Loak Now</Text>
                        </View>
                    </View>

                    <View className="border-2 border-loaknow-bg/20 rounded-lg">
                        <View className="p-4">

                            <View className="flex flex-row justify-between items-center ">
                                <View className="flex flex-row  items-center">
                                    <Image className="mr-2 " source={require('../assets/images/kios-cart.png')} style={{ width: 15, height: 15 }} />
                                    <Text className="font-semibold text-loaknow-gray mr-2 text-base">Casing Jatinangor</Text>
                                    <Text className="font-semibold text-loaknow-gray text-base">&gt;</Text>
                                </View>
                                <View>
                                    <Text className="text-loaknow-blue">On Process</Text>
                                </View>
                            </View>
                            <Text className="text-loaknow-gray my-2">15 April 2024</Text>
                            <View className="flex flex-row">
                                <View>
                                    <Image className="mr-2" source={require('../assets/images/manage-product-hp.png')} style={{ width: 140, height: 84 }} />
                                </View>
                                <View>
                                    <Text className="font-semibold text-base">Matte Hard Casing HP</Text>
                                    <Text className="font-semibold text-base text-loaknow-blue">Rp20.000</Text>
                                    <Text>1x</Text>
                                </View>
                            </View>
                            <View className="flex flex-row justify-end">
                                <Text className="text-loaknow-gray">Total Harga</Text>
                            </View>
                            <View className="flex flex-row justify-end">

                                <Text className="font-semibold text-base">Rp20.000</Text>
                            </View>
                        </View>
                        <View className="border-b-[1px]  border-t-[1px] border-loaknow-gray/20">
                            <View className="flex flex-row justify-between p-4">
                                <View className="flex flex-row items-center justify-center gap-2">
                                    <Image className="" source={require('../assets/images/truck.png')} style={{ width: 24, height: 18 }} />
                                    <View>
                                        <Text className=" text-base">Request Accepted</Text>
                                        <View className="flex flex-row">
                                            <Text className=" text-loaknow-gray mr-2">15 April 2024</Text>
                                            <Text className=" text-loaknow-gray">23:40</Text>

                                        </View>
                                    </View>
                                </View>
                                <View className="flex flex-row items-center justify-center">
                                    <Text className="font-semibold text-loaknow-gray text-base">&gt;</Text>
                                </View>
                                
                            </View>

                        </View>


                    </View>
                    

                </View>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20
    },
});

export default TransactionScreen;