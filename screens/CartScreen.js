import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityBase,
} from "react-native";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const CartScreen = ({ navigation }) => {
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, [auth, navigation]);

  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View className="flex-1 bg-white ">
      <ScrollView className="mb-[60px] pt-10">
        <View className="mx-7">
          <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-3 my-3">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              className=" bg-loaknow-gray/20 rounded-full  flex items-center justify-center p-2"
            >
              <Image
                className=" "
                source={require("../assets/images/arrow.png")}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
            <View className=" ml-3 justify-center items-center">
              <Text className=" font-semibold text-xl  "> Cart </Text>
            </View>
          </View>
          <View className="border-loaknow-gray border-[1px] rounded-lg p-2">
            <View className="flex flex-row items-center">
              <TouchableOpacity onPress={toggleCheck}>
                <View className="w-6 h-5 border-[1px] rounded-lg border-loaknow-gray mr-2 flex items-center justify-center">
                  {isChecked ? (
                    <Text style={{ color: "green" }}>✔️</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
              <Image
                className="mr-2"
                source={require("../assets/images/kios-cart.png")}
                style={{ width: 15, height: 15 }}
              />
              <Text className="font-semibold text-loaknow-gray">
                Toko Sepatu Ciseke
              </Text>
            </View>

            <View className="flex flex-row my-2 px-5 items-center justify-between">
              <View className="">
                <Image source={require("../assets/images/produkk.png")} />
              </View>
              <View>
                <Text className="text-sm font-semibold">
                  Sneakers Red White
                </Text>
                <Text className="text-loaknow-blue text-sm mb-1 font-medium">
                  Rp 150.000
                </Text>
                <View className="flex flex-row items-center mb-1">
                  <Text className="text-xs line-through text-loaknow-gray mr-2">
                    Rp300.000
                  </Text>
                  <Text className="text-xs text-loaknow-discount">50%Off</Text>
                </View>

                <View className="flex flex-row">
                  <TouchableHighlight
                    className="border-[1px] border-loaknow-gray w-8 h-8 flex items-center justify-center"
                    underlayColor="#d9d9d9"
                    onPress={decreaseQuantity}
                  >
                    <Text>-</Text>
                  </TouchableHighlight>
                  <View className="border-[1px] border-loaknow-gray w-8 h-8 items-center justify-center">
                    <Text>{quantity}</Text>
                  </View>
                  <TouchableHighlight
                    className="border-[1px] border-loaknow-gray w-8 h-8 flex items-center justify-center"
                    underlayColor="#d9d9d9"
                    onPress={increaseQuantity}
                  >
                    <Text>+</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0">
        <View className="border-b-[1px] border-t-[1px] border-loaknow-gray flex flex-row justify-between  bg-white">
          <View className="flex flex-row items-center py-4 pl-4 ">
            <View className="border-[1px] w-5 h-5 rounded-lg mr-2"></View>
            <Text className="font-semibold ">All</Text>
          </View>
          <View className="flex flex-row items-center justify-center ">
            <Text className="font-semibold mr-3">Total</Text>
            <Text className="font-bold">RP150.000</Text>
          </View>
          <View className=" bg-loaknow-blue flex justify-center items-center p-4 px-6">
            <Text className="text-white font-semibold">Checkout</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
