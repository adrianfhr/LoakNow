import { ScrollView,TouchableOpacity,View } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";
import Searchingbar from "../components/SearchBar";
import { Image } from "react-native";
import BottomNav from "../components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import ModalProduct from "../components/Modal";


const SellProductScreen = ({ navigation }) => {
        const [showNewView1, setShowNewView1] = useState(false);
        const [showNewView2, setShowNewView2] = useState(false);
        
        
        const handlePress1 = () => {
        setShowNewView1(!showNewView1);
        };
        
        const handlePress2 = () => {
        setShowNewView2(!showNewView2);
        };

        
        return (
            <View className="flex-1 bg-white">
                <View className="mx-7">
                    <View className="border-b-[1px] border-loaknow-gray flex flex-row items-center pb-3 ">
                        <View className="justify-center items-center mr-3">
                            <Text className="rotate-180  text-3xl ">&gt;</Text>
                        </View>
                        <View className="justify-center items-center">
                            <Text className=" font-semibold text-xl  ">Sell Product</Text>
                        </View>
                    </View>
                    <View className="h-full  flex items-center justify-center">
                        <View className="rounded-lg">
                            <View className="justify-center flex items-center mb-3">
                                <Text>What type of sales do you want?</Text>
                            </View>
                            <View className="flex flex-row justify-between gap-4">

                                <TouchableOpacity onPress={handlePress1}>
                                    {showNewView1 ? (
                                        <View className="bg-loaknow-blue rounded-lg p-2">
                                            <Text className="text-loaknow-yellow font-semibold text-base">Loak Now</Text>
                                        </View>
                                        ) : (
                                        <View className="bg-loaknow-yellow rounded-lg p-2">
                                            <Text className="text-loaknow-blue font-semibold text-base">Loak Now</Text>
                                        </View>
                                    )}      
                                </TouchableOpacity>


                                <TouchableOpacity onPress={handlePress2}>
                                    {showNewView2 ? (
                                        <View className="bg-loaknow-blue rounded-lg p-2">
                                            <Text className="text-loaknow-yellow font-semibold text-base">Marketplace</Text>
                                        </View>
                                        ) : (
                                        <View className="bg-loaknow-yellow rounded-lg p-2">
                                            <Text className="text-loaknow-blue font-semibold text-base">Marketplace</Text>
                                        </View>
                                    )}      
                                </TouchableOpacity>
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

export default SellProductScreen;