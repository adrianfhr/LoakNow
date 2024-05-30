import React, {useEffect, useState} from 'react';
import { View, Image, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth'


const ProfileScreen = ({ navigation, route }) => {
    // const navigation = useNavigation();
    // const route = useRoute();
    const userData = route.params?.userData;
    // console.log("user: ". userData)
    const auth = getAuth();

    useEffect(() => {
        if (!userData) {
            navigation.replace('Login');
        }
    }, [userData, navigation]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('Logout success');
            navigation.replace('Login');
        }).catch((error) => {
            console.log('Logout error', error);
        });
    };

    if (!userData) {
        return (
            <View className="h-full justify-center items-center ">
                <View>
                    <Text className='text-loaknow-blue text-2xl'>Loading. . . .</Text>
                </View>   
            </View>
        );
    }

    return (
            <View className="flex-1 bg-loaknow-yellow pt-10">
                <View className="mx-7">
                <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-3 my-3">
                        <TouchableOpacity onPress={()=>{
                            navigation.goBack()
                        }} className=" bg-loaknow-gray/20 rounded-full  flex items-center justify-center p-2">
                            <Image className=" " source={require('../assets/images/arrow.png')} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>
                        <View className=" ml-3 justify-center items-center">
                            <Text className=" font-semibold text-xl  "> Profile </Text>
                        </View>
                    </View>
                </View>
                <View className="h-full bg-white mt-28 ">
                    <View className="w-48 h-48 bg-slate-100 rounded-full mx-auto shadow-2xl translate-y-[-96px]">
                        <Image className='mx-auto my-auto' source={require('../assets/images/logo-profile.png')} style={{width: 100, height: 100, alignSelf: 'center'}}/>
                    </View>
                    <View className="translate-y-[-84px]">
                        <Text className="text-2xl font-bold  text-center">{userData ? userData.fullName : 'Your Name'}</Text>
                        <Text className="text-[#656565] text-lg text-center mb-2" > 
                            {userData ? userData.email : 'Your Email'}
                        </Text>
                        <View className="flex flex-col justify-center item-center px-8">
                        <TouchableOpacity 
                            onPress={() => {
                                ToastAndroid.show('Edit Profile is Coming Soon', ToastAndroid.SHORT);
                            }} 
                            className="w-full border-[1px] border-slate-200 rounded-md p-4 flex-row items-center mt-2"
                        >
                            <Image source={require('../assets/images/edit-profile.png')} style={{width: 20, height: 20, alignSelf: 'center'}}/>
                            <Text className=" ml-4 flex-1">Edit Profile</Text>
                            <Image source={require('../assets/images/arrow.png')} style={{width: 15, height: 15, alignSelf: 'center', transform: [{ rotate: '180deg' }]}}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                ToastAndroid.show('History Transaction is Coming Soon', ToastAndroid.SHORT);
                            }} 
                            className="w-full border-[1px] border-slate-200 rounded-md p-4 flex-row items-center mt-2"
                        >
                            <Image source={require('../assets/images/transaction-profile.png')} style={{width: 20, height: 20, alignSelf: 'center'}}/>
                            <Text className=" ml-4 flex-1">Transactions</Text>
                            <Image source={require('../assets/images/arrow.png')} style={{width: 15, height: 15, alignSelf: 'center', transform: [{ rotate: '180deg' }]}}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                ToastAndroid.show('Customer Support is Coming Soon', ToastAndroid.SHORT);

                            }} 
                            className="w-full border-[1px] border-slate-200 rounded-md p-4 flex-row items-center mt-2"
                        >
                            <Image source={require('../assets/images/support-profile.png')} style={{width: 20, height: 20, alignSelf: 'center'}}/>
                            <Text className=" ml-4 flex-1">Support</Text>
                            <Image source={require('../assets/images/arrow.png')} style={{width: 15, height: 15, alignSelf: 'center', transform: [{ rotate: '180deg' }]}}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                ToastAndroid.show('Settings Coming Soon', ToastAndroid.SHORT);
                            }} 
                            className="w-full border-[1px] border-slate-200 rounded-md p-4 flex-row items-center mt-2"
                        >
                            <Image source={require('../assets/images/settings-profile.png')} style={{width: 20, height: 20, alignSelf: 'center'}}/>
                            <Text className=" ml-4 flex-1">Settings</Text>
                            <Image source={require('../assets/images/arrow.png')} style={{width: 15, height: 15, alignSelf: 'center', transform: [{ rotate: '180deg' }]}}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={handleLogout} 
                            className="w-full border-[1px] border-slate-200 rounded-md p-4 flex-row items-center mt-2"
                        >
                            <Image source={require('../assets/images/logout-profile.png')} style={{width: 15, height: 15, alignSelf: 'center'}}/>
                            <Text className=" ml-4 flex-1 text-red-600">Logout</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
    );
}

export default ProfileScreen;