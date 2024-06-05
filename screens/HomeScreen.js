import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import Searchingbar from "../components/SearchBar";
import { Image } from "react-native";
import BottomNav from "../components/BottomNav";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import { useFonts } from "expo-font";

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View className="flex-1 bg-white pt-10">
      <ScrollView className="">
        <View className="mx-7">
          <View className="flex flex-row items-center my-2">
            <View className="bg-loaknow-yellow rounded-3xl p-2 px-4 flex flex-row w-full items-center">
              <Text
                className=""
                style={{ fontSize: 17, fontFamily: "Poppins-Medium" }}
              >
                Jatinangor, West Java
              </Text>
            </View>
          </View>
          <Searchingbar />
          <View className="bg-loaknow-lightblue bg-loaknow-lightblue/10 rounded-lg  mt-3 px-8 pt-3 py-2 flex flex-row justify-between">
            <View className>
              <Text className=" text-lg font-bold w-[70%] mt-3">
                Sell Your Used Goods!
              </Text>
              <View className="bg-loaknow-blue  w-[50%] rounded-3xl flex items-center my-2 p-2.5">
                <Text className="text-white font-bold">Sell Now</Text>
              </View>
            </View>
            <View className="">
              <Image source={require("../assets/images/kios.png")} />
            </View>
          </View>
          <View className="flex flex-row items-center justify-between mt-6">
            <Text
              className="text-lg font-bold"
              style={{ fontSize: 17, fontFamily: "Poppins-SemiBold" }}
            >
              Categories
            </Text>
            
          </View>
          <ScrollView horizontal>
            <View className="flex flex-row gap-2 py-2">
                <Image
                  source={require("../assets/images/categories-1.png")}
                  className=""
                  style={{ width: 75, height: 75 }}
                />
                <Image
                  source={require("../assets/images/categories-2.png")}
                  className=""
                  style={{ width: 75, height: 75 }}
                />
                <Image
                  source={require("../assets/images/categories-3.png")}
                  className=""
                  style={{ width: 75, height: 75 }}
                />
                <Image
                  source={require("../assets/images/categories-4.png")}
                  className=""
                  style={{ width: 75, height: 75 }}
                />
                <Image
                  source={require("../assets/images/categories-5.png")}
                  className=""
                  style={{ width: 75, height: 75 }}
                />
                <Image
                  source={require("../assets/images/categories-6.png")}
                  className=""
                  style={{ width: 75, height: 75 }}
                />
            </View>
          </ScrollView>

          <Text
            className="mb-4"
            style={{ fontSize: 17, fontFamily: "Poppins-SemiBold" }}
          >
            New Arrival
          </Text>
          <View className="flex flex-row flex-wrap justify-between gap-5">
            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
              <Image source={require("../assets/images/produkk.png")} />
              <Text className="my-2 text-sm font-semibold">
                Sneakers Red White
              </Text>
              <Text className="text-loaknow-blue text-sm mb-1 font-medium">
                Rp 150.000
              </Text>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xs line-through text-loaknow-gray">
                  Rp300.000
                </Text>
                <Text className="text-xs text-loaknow-discount">50%Off</Text>
                <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center">
                  <Text className="font-semibold">+</Text>
                </View>
              </View>
            </View>
            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
              <Image source={require("../assets/images/produkk.png")} />
              <Text className="my-2 text-sm font-semibold">
                Sneakers Red White
              </Text>
              <Text className="text-loaknow-blue text-sm mb-1 font-medium">
                Rp 150.000
              </Text>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xs line-through text-loaknow-gray">
                  Rp300.000
                </Text>
                <Text className="text-xs text-loaknow-discount">50%Off</Text>
                <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center">
                  <Text className="font-semibold">+</Text>
                </View>
              </View>
            </View>
          </View>
          <Text
            className="my-4"
            style={{ fontSize: 17, fontFamily: "Poppins-SemiBold" }}
          >
            All Fashion
          </Text>
          <View className="flex flex-row flex-wrap justify-between gap-5">
            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
              <Image source={require("../assets/images/produkk.png")} />
              <Text className="my-2 text-sm font-semibold">
                Sneakers Red White
              </Text>
              <Text className="text-loaknow-blue text-sm mb-1 font-medium">
                Rp 150.000
              </Text>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xs line-through text-loaknow-gray">
                  Rp300.000
                </Text>
                <Text className="text-xs text-loaknow-discount">50%Off</Text>
                <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center">
                  <Text className="font-semibold">+</Text>
                </View>
              </View>
            </View>
            <View className=" bg-loaknow-bg/20 rounded-xl p-2 w-40">
              <Image source={require("../assets/images/produkk.png")} />
              <Text className="my-2 text-sm font-semibold">
                Sneakers Red White
              </Text>
              <Text className="text-loaknow-blue text-sm mb-1 font-medium">
                Rp 150.000
              </Text>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xs line-through text-loaknow-gray">
                  Rp300.000
                </Text>
                <Text className="text-xs text-loaknow-discount">50%Off</Text>
                <View className=" bg-loaknow-yellow rounded-full w-6 h-6 flex justify-center items-center">
                  <Text className="font-semibold">+</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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

export default HomeScreen;
