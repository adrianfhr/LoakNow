import { ScrollView,View } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";
import Searchingbar from "../components/SearchBar";
import { Image } from "react-native";
import BottomNav from "../components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";



const LandingScreen = ({ navigation }) => {
        return (
            <View>
                <ScrollView className=" mb-[60px]">
                    <View className="mx-7">
                        <View className="flex flex-row items-center my-2">
                            <View className="rounded-full bg-loaknow-bg/20 p-1.5 mr-2">
                                <Image className=""source={require('../assets/images/burger.png')} style={{width:30, height:30}}/>
                            </View>
                            <View className="bg-loaknow-yellow rounded-3xl p-2 px-4 flex flex-row ">
                                <Text className="font-semibold text-base mr-2">Jatinangor, West Java </Text>
                                <View className="flex justify-center items-center">
                                    <Text className="rotate-90 text-loaknow-blue font-semibold text-xs">&gt;</Text>
                                </View>
                            </View>
                        </View>
                        <Searchingbar/>
                        <View className="bg-loaknow-lightblue bg-loaknow-lightblue/10 rounded-lg  mt-3 px-8 pt-3 py-2 flex flex-row justify-between">
                            <View className>
                                <Text className=" text-lg font-bold w-[70%] mt-3">Sell Your Used Goods!</Text>
                                <View className='bg-loaknow-blue  w-[50%] rounded-3xl flex items-center my-2 p-2.5'>
                                    <Text className="text-white font-bold">Sell Now</Text>
                                </View>
                            </View>
                            <View className="">
                                <Image source={require('../assets/images/kios.png')}/>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-between mt-6">
                            <Text className="text-lg font-bold">Categories</Text>
                            <Text className="underline text-loaknow-categories">See All Categories</Text>
                        </View>
                        <View className="flex flex-row">
                            <View className="flex items-center justify-center my-3 mr-3 rounded-full border-[3px] border-loaknow-yellow p-">
                                <Image source={require('../assets/images/categories1.png')} className="" style={{width:70, height:70}}/>
                            </View>
                            <View className="flex items-center justify-center my-3 mr-3 rounded-full border-[3px] border-loaknow-yellow p-">
                                <Image source={require('../assets/images/categories1.png')} className="" style={{width:70, height:70}}/>
                            </View>
                            <View className="flex items-center justify-center my-3 mr-3 rounded-full border-[3px] border-loaknow-yellow p-">
                                <Image source={require('../assets/images/categories1.png')} className="" style={{width:70, height:70}}/>
                            </View>
                            <View className="flex items-center justify-center my-3 mr-3 rounded-full border-[3px] border-loaknow-yellow p-">
                                <Image source={require('../assets/images/categories1.png')} className="" style={{width:70, height:70}}/>
                            </View>       
                        </View>
                        <Text className="text-lg font-bold mb-4">New Arrival</Text>
                        <View className="flex flex-row flex-wrap justify-between gap-5">
                            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
                                <Image source={require('../assets/images/produkk.png')} />
                                <Text className="my-2 text-sm font-semibold">Sneakers Red White</Text>
                                <Text className="text-loaknow-blue text-sm mb-1 font-medium">Rp 150.000</Text>
                                <View className="flex flex-row justify-between items-center">
                                    <Text className="text-xs line-through text-loaknow-gray">Rp300.000</Text>
                                    <Text className="text-xs text-loaknow-discount">50%Off</Text>
                                    <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center"> 
                                        <Text className="font-semibold">+</Text>
                                    </View>
                                </View>
                            </View>
                            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
                                <Image source={require('../assets/images/produkk.png')} />
                                <Text className="my-2 text-sm font-semibold">Sneakers Red White</Text>
                                <Text className="text-loaknow-blue text-sm mb-1 font-medium">Rp 150.000</Text>
                                <View className="flex flex-row justify-between items-center">
                                    <Text className="text-xs line-through text-loaknow-gray">Rp300.000</Text>
                                    <Text className="text-xs text-loaknow-discount">50%Off</Text>
                                    <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center"> 
                                        <Text className="font-semibold">+</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text className="text-lg font-bold my-4">All Fashion</Text>
                        <View className="flex flex-row flex-wrap justify-between gap-5">
                            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
                                <Image source={require('../assets/images/produkk.png')} />
                                <Text className="my-2 text-sm font-semibold">Sneakers Red White</Text>
                                <Text className="text-loaknow-blue text-sm mb-1 font-medium">Rp 150.000</Text>
                                <View className="flex flex-row justify-between items-center">
                                    <Text className="text-xs line-through text-loaknow-gray">Rp300.000</Text>
                                    <Text className="text-xs text-loaknow-discount">50%Off</Text>
                                    <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center"> 
                                        <Text className="font-semibold">+</Text>
                                    </View>
                                </View>
                            </View>
                            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
                                <Image source={require('../assets/images/produkk.png')} />
                                <Text className="my-2 text-sm font-semibold">Sneakers Red White</Text>
                                <Text className="text-loaknow-blue text-sm mb-1 font-medium">Rp 150.000</Text>
                                <View className="flex flex-row justify-between items-center">
                                    <Text className="text-xs line-through text-loaknow-gray">Rp300.000</Text>
                                    <Text className="text-xs text-loaknow-discount">50%Off</Text>
                                    <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center"> 
                                        <Text className="font-semibold">+</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                    <View className="absolute bottom-0 left-0 right-0">
                        <BottomNav/>
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

export default LandingScreen;