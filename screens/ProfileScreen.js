// MAKE A PROFILE SCREEN

import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const ProfileScreen = () => {
    return (
        <View className="bg-loaknow-yellow w-screen h-full flex-col-reverse ">
            <View className="h-4/5 bg-white">
                <View className="h-48 w-48 mt-[-96] rounded-full mx-auto bg-slate-100 shadow-2xl">
                </View>
                <View className="mt-4">
                    <Text className="text-3xl font-bold  text-center">Fariz Putra</Text>
                    <Text className="text-[#656565] text-lg text-center mb-2" > 
                        tes
                    </Text>

                    <View className="flex flex-col justify-center item-center p-8">
                            <Button  icon="account-edit" className="w-full bg-slate-100 border-2 border-slate-100 rounded-md p-4 my-4">
                                <Text className="">Edit Profile</Text>
                            </Button>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ProfileScreen;
