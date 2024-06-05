import { ScrollView, TouchableOpacity, View, ToastAndroid } from "react-native";
import { useState } from "react";
import { Image, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const SellProductScreen = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [showNewView1, setShowNewView1] = useState(false);
  const [showNewView2, setShowNewView2] = useState(false);

  const handlePress1 = () => {
    // setShowNewView1(!showNewView1);
    navigation.navigate("RequestProduct");
  };

  const handlePress2 = () => {
    // setShowNewView2(!showNewView2);
    ToastAndroid.show("Marketplace is Coming Soon", ToastAndroid.SHORT);
  };

  return (
    <View className="flex-1 bg-white pt-10">
      <View className=" flex-1 mx-7">
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
            <Text
              className="text-xl"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {" "}
              Sell Product{" "}
            </Text>
          </View>
        </View>
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
          <View className="rounded-lg">
            <View className="justify-center flex items-center mb-3">
              <Text style={{ fontFamily: "Poppins-Medium" }}>
                What type of sales do you want?
              </Text>
            </View>
            <View className="flex flex-row justify-between gap-4">
              <TouchableOpacity onPress={handlePress1}>
                {showNewView1 ? (
                  <View className="bg-loaknow-blue rounded-lg p-2">
                    <Text
                      className="text-loaknow-yellow text-base"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Loak Now
                    </Text>
                  </View>
                ) : (
                  <View className="bg-loaknow-yellow rounded-lg p-2">
                    <Text
                      className="text-loaknow-blue text-base"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Loak Now
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePress2}>
                {showNewView2 ? (
                  <View className="bg-loaknow-blue rounded-lg p-2">
                    <Text
                      className="text-loaknow-yellow text-base"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Marketplace
                    </Text>
                  </View>
                ) : (
                  <View className="bg-loaknow-yellow rounded-lg p-2">
                    <Text
                      className="text-loaknow-blue text-base"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Marketplace
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SellProductScreen;
