import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase"; // pastikan path ini benar
import { useFonts } from "expo-font";
const TransactionScreen = ({ navigation, route }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const userData = route.params?.userData;
  console.log("Ini userData:", userData);
  const [transactionState, setTransactionState] = useState("Marketplace");
  const [transactionLoakNow, setTransactionLoakNow] = useState([]);
  const [transactionMarketplace, setTransactionMarketplace] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        const db = getFirestore(app);
        const q = query(
          collection(db, "orders_loaknow"),
          where("uid", "==", userData?.uid),
          orderBy("created_at", "desc") // 'asc' for ascending order, 'desc' for descending
        );
        console.log("Sedang query...");
        try {
          const querySnapshot = await getDocs(q);
          const orders = [];
          querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
          });
          setTransactionLoakNow(orders);
          setLoading(false);
        } catch (error) {
          console.log("Error getting documents: ", error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [userData, navigation, transactionState]);

  const renderTransaction = (transaction) => {
    const createdAt = new Date(
      transaction.created_at.seconds * 1000 +
        transaction.created_at.nanoseconds / 1000000
    );
    const formattedDate = createdAt.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = createdAt.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(transaction.prices);

    const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(transaction.prices * transaction.stock);

    return (
      <View key={transaction.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View className="flex flex-row items-center">
            <Image
              className="mr-2"
              source={require("../assets/images/request-product-logo1.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className="font-bold text-lg text-loaknow-blue">
              {transaction.username}
            </Text>
          </View>
        </View>

        <Text className="mb-2 text-loaknow-gray">{formattedDate}</Text>
        <View className="flex flex-row gap-3">
          <Image
            source={{ uri: transaction.image }}
            style={styles.productImage}
          />
          <View className="">
            <Text className="font-bold mb-1 text-base">
              {transaction.details}
            </Text>
            <Text className="text-loaknow-blue mb-1 font-bold text-base">
              {formattedPrice}
            </Text>
            <Text className="text-base">{transaction.stock}x</Text>
          </View>
        </View>

        <View className=" items-end  px-2">
          <Text className="text-loaknow-gray text-base">Total Harga</Text>
          <Text className="font-semibold text-base">{formattedTotalPrice}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("StatusProduct", { product: transaction });
          }}
          className="bg-loaknow-yellow rounded-lg py-3 flex-row items-center justify-between px-2 pr-4 mt-2 "
        >
          <View className="flex-row justify-between">
            <Image
              className=""
              source={require("../assets/images/truck.png")}
              style={{ width: 25, height: 20 }}
            />
            <Text
              className="text-base ml-3"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Details Product
            </Text>
          </View>
          <Image
            className="rotate-180"
            source={require("../assets/images/arrow.png")}
            style={{ width: 10, height: 12 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="h-full justify-center items-center ">
        <View>
          <Text className="text-loaknow-blue text-2xl">Loading. . . .</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-10">
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
            <Text
              className="text-xl"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {" "}
              Transaction{" "}
            </Text>
          </View>
        </View>
        <View className="flex flex-row border-b-2 border-loaknow-bg/20 justify-between items-center px-16 my-2 mb-5">
          <TouchableOpacity
            onPress={() => {
              setTransactionState("Marketplace");
            }}
            className={`${
              transactionState === "Marketplace" ? "border-b-2" : "border-b-0"
            } border-loaknow-blue mb-[-2px]`}
          >
            <Text
              className="text-base"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Marketplace
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTransactionState("LoakNow");
            }}
            className={`${
              transactionState === "LoakNow" ? "border-b-2" : "border-b-0"
            } border-loaknow-blue mb-[-2px]`}
          >
            <Text
              className="text-base"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Loak Now
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="w-full" showsHorizontalScrollIndicator={false}>
          <View className="h-full pb-40">
            {transactionState === "Marketplace" ? (
              transactionMarketplace.length > 0 ? (
                transactionMarketplace.map(renderTransaction)
              ) : (
                <Text
                  className="text-loaknow-gray text-center mt-4"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  You do not have any transactions in the marketplace
                </Text>
              )
            ) : transactionLoakNow.length > 0 ? (
              transactionLoakNow.map(renderTransaction)
            ) : (
              <Text
                className="text-loaknow-gray text-center mt-4"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                You do not have any transactions in Loak Now
              </Text>
            )}
          </View>
        </ScrollView>
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
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "green",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 16,
  },
  productImage: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  quantity: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  question: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TransactionScreen;
