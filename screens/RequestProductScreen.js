import { ScrollView,TouchableOpacity,TouchableWithoutFeedback,View } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";
import Searchingbar from "../components/SearchBar";
import { Image , Modal } from "react-native";
import BottomNav from "../components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import ModalProduct from "../components/Modal";


const RequestProductScreen = ({ navigation }) => {
        const [showNewView, setShowNewView] = useState(false);
        const [modalVisible, setModalVisible] = useState(false);

        const showModal = () => setModalVisible(true);
        const hideModal = () => setModalVisible(false);


        
        
        const handlePress = () => {
        setShowNewView(!showNewView);
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
                    {/* isi page */}
                    <View>
                        <Text className="font-semibold text-base mb-3">Product Picture & Video *</Text>
                        <View className="flex flex-row mb-3">
                            <Image className="mr-2" source={require('../assets/images/product-image.png')} style={{ width: 90, height: 90 }} />
                            <Image className="mr-2" source={require('../assets/images/product-image.png')} style={{ width: 90, height: 90 }} />
                        </View>
                        <Text className="font-semibold text-base mb-3">Product Name *</Text>
                        <TextInput
                            className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                            placeholder="Insert product name"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                        />
                        <Text className="font-semibold text-base mb-3">Product Details *</Text>
                        <TextInput
                            className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                            placeholder="Insert product details"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                        />
                        <Text className="font-semibold text-base mb-3">Categories *</Text>
                        <TextInput
                            className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                            placeholder="Search Categories"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                        />
                        <View className="flex  flex-row gap-8 mb-3">
                            <View className=" w-36">
                                <Text className="mb-3 font-semibold">Price *</Text>
                                <TextInput
                                className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                                placeholder="Insert price"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                keyboardType="numeric"
                                />

                            </View>
                            <View className="">
                                <Text className="mb-3 font-semibold">Stock *</Text>
                                <TextInput
                                className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                                placeholder="Insert stock"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View className="flex  flex-row gap-8">
                            <View className="w-36">
                                <Text className="mb-3 font-semibold">Condition *</Text>
                                <TextInput
                                className="rounded-full px-2 bg-loaknow-bg/20 mb-2 w-20"
                                placeholder="X %"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                keyboardType="numeric"
                                onPress={showModal}
                                />

                            </View>
                            <View className="">
                                <Text className="mb-3 font-semibold">Dangerous Product *</Text>
                                <TextInput
                                className="rounded-full px-2 bg-loaknow-bg/20 mb-2 "
                                placeholder="Yes/No"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                />
                            </View>
                        </View>


                        <TouchableOpacity onPress={() => {
                            handlePress();
                            showModal();
                        }}>

                            {showNewView ? (
                                <View className="bg-loaknow-yellow items-center justify-center rounded-full p-3 mt-4">
                                    <Text className="font-semibold text-base">Request</Text>
                                </View>
                                ) : (
                                <View className="bg-loaknow-blue items-center justify-center rounded-full p-3 mt-4">
                                    <Text className="font-semibold text-base text-loaknow-yellow">Request</Text>
                                </View>
                            )}      

                        </TouchableOpacity>

                        
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={hideModal}

                    >
                        <TouchableWithoutFeedback onPress={hideModal}>

                            <View className="flex-1 items-center justify-center bg-white/90">
                                <Image source={require('../assets/images/success.png')} />
                                <Text className="font-bold text-lg">Thank You!</Text>
                                <Text className="text-base">Your request was submitted!</Text>

                                
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    
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

export default RequestProductScreen;