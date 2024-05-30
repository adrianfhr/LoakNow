import { ScrollView,TouchableOpacity,TouchableWithoutFeedback,View } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";
import { Image , Modal } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


const StatusAdminScreen = ({ navigation }) => {
        const [showNewView, setShowNewView] = useState(false);
        const [date, setDate] = useState(new Date());
        const [accepted, setAccepted] = useState(false);
        const [purchased, setPurchased] = useState(false);

        const handlePurchased = () => {
            setPurchased(true);
        }

        const handleAccept = () => {
            setAccepted(true);
        }

       const handlePress = () => {
        setShowNewView(true);
       }
        
    
        return (
            <View className="flex-1 bg-white">
                <View className="mx-7">
                    <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-2 mt-3 justify-center mb-4">
                        <View className="flex-row items-center justify-evenly  w-48">
                            <Text className=" font-semibold text-xl  ">Status</Text>
                            <Image className="" source={require('../assets/images/request-product-logo1.png')} style={{ width: 20, height: 20 }} />
                            <Text className=" font-semibold text-xl  ">Product</Text>
                        </View>
                    </View>
                    {/* isi page */}
                    <View style={styles.card} >
        <View style={styles.cardHeader}>
          <View className="flex flex-row items-center">
            <Image className="mr-2" source={require('../assets/images/request-product-logo1.png')} style={{ width: 20, height: 20 }} />
            <Text className="font-bold text-lg text-loaknow-blue">Fariz Putra</Text>
          </View>
        </View>
        <Text className="mb-2 text-loaknow-gray">15 April 2024</Text>


        <View className="flex flex-row gap-3">
          <Image 
            source={require('../assets/images/product-image.png')}
            style={styles.productImage}
          />
          <View className="">
            <Text className="font-bold mb-1 text-base">Matte Hard Casing HP</Text>
            <Text className="text-loaknow-blue mb-1 font-bold text-base">Rp20.000</Text>
            <Text className="text-base">1x</Text>
          </View>
        </View>
        <View className=" items-end  px-2">
          <Text className="text-loaknow-gray text-base">Total Harga</Text>
          <Text className="font-semibold text-base">Rp20.000</Text>

        </View>
        <View>
          <Text className="text-loaknow-blue font-semibold">Will you accept the product?</Text>
        </View>

        {accepted ? (
            <View className="bg-loaknow-blue rounded-lg px-12 py-3 justify-center items-center mt-2">
                <Text className="text-loaknow-yellow font-semibold text-base">Accepted</Text>
            </View> 
        ) : (
            <View className="mt-2 flex flex-row justify-between ">
                <TouchableOpacity>                    
                    <View className="bg-loaknow-gray/20 rounded-lg justify-center items-center w-36 py-3">
                        <Text className="text-loaknow-gray font-semibold text-base">Decline</Text>
                    </View>                                              
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAccept}>                    
                    <View className="bg-loaknow-yellow rounded-lg justify-center items-center w-36 py-3 ">
                        <Text className="text-loaknow-blue  font-semibold text-base">Accept</Text>
                    </View>
                                                                            
                </TouchableOpacity>
            </View>
        )}
       
        <View>
            <Text className="text-loaknow-blue font-semibold mt-2">When will you ship the product?</Text>
            <TouchableOpacity>                    
                <View className="flex-row bg-loaknow-gray/20 rounded-lg justify-center items-center w-36 py-3 mt-2 ">
                    <Text className="text-loaknow-gray font-semibold text-sm">X/X/XX XX:XX:XX</Text>
                </View>                                              
            </TouchableOpacity>
            
            <Text className="text-loaknow-blue font-semibold mt-2">Will this product be purchased?</Text>
            {purchased ? (
                <View className="bg-loaknow-blue rounded-lg px-12 py-3 justify-center items-center mt-2">
                    <Text className="text-loaknow-yellow font-semibold text-base">Purchased</Text>
                </View> 
            ) : (
                <View className="mt-2 flex flex-row justify-between ">
                    <TouchableOpacity>                    
                        <View className="bg-loaknow-gray/20 rounded-lg justify-center items-center w-36 py-3 ">
                            <Text className="text-loaknow-gray font-semibold text-base">No</Text>
                        </View>                                              
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePurchased}>                    
                        <View className="bg-loaknow-yellow rounded-lg justify-center items-center w-36 py-3 ">
                            <Text className="text-loaknow-blue  font-semibold text-base">Yes</Text>
                        </View>
                                                                                
                    </TouchableOpacity>
                </View>
            )}

            <Text className="text-loaknow-blue font-semibold mt-2">Has the payment been made?</Text>

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
    header: {
        marginBottom: 20,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      userName: {
        fontSize: 16,
        fontWeight: 'bold',

      },
      status: {
        fontSize: 14,
        color: 'green',
      },
      date: {
        fontSize: 12,
        color: '#999',
        marginBottom: 16,
      },
      productImage: {
        width: 130,
        height: 100,
        borderRadius: 10,
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      price: {
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
      },
      quantity: {
        fontSize: 14,
        color: '#999',
        marginBottom: 8,
      },
      totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      question: {
        fontSize: 14,
        marginBottom: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

export default StatusAdminScreen;