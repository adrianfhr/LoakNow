import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, Button, Title, HelperText, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Image, Modal } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase";

const RequestAdminScreen = ({ navigation }) => {
  const [showNewView, setShowNewView] = useState(false);
  const [date, setDate] = useState(new Date());

  const handlePress = () => {
    setShowNewView(true);
  };

  //  connect firestore get request data
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const q = query(
        collection(db, "orders_loaknow"),
        orderBy("created_at", "desc") // 'asc' for ascending order, 'desc' for descending
      );
      console.log("Sedang query...");
      try {
        const querySnapshot = await getDocs(q);
        const data_request = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          data_request.push({ id: doc.id, ...doc.data() });
        });
        setRequest(data_request);
        setLoading(false);
      } catch (error) {
        console.log("Error getting documents: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigation]);

  console.log(request);

  const renderRequest = (request) => {
    const createdAt = new Date(
      request.created_at.seconds * 1000 +
        request.created_at.nanoseconds / 1000000
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
    }).format(request.prices);

    const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(request.prices * request.stock);

    return (
      <View key={request.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View className="flex flex-row items-center">
            <Image
              className="mr-2"
              source={require("../assets/images/request-product-logo1.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className="font-bold text-lg text-loaknow-blue">
              {request.username}
            </Text>
          </View>
        </View>

        <Text className="mb-2 text-loaknow-gray">{formattedDate}</Text>
        <View className="flex flex-row gap-3">
          <Image source={{ uri: request.image }} style={styles.productImage} />
          <View className="">
            <Text className="font-bold mb-1 text-base">{request.details}</Text>
            <Text className="text-loaknow-blue mb-1 font-bold text-base">
              {formattedPrice}
            </Text>
            <Text className="text-base">{request.stock}x</Text>
          </View>
        </View>

        <View className=" items-end  px-2">
          <Text className="text-loaknow-gray text-base">Total Harga</Text>
          <Text className="font-semibold text-base">{formattedTotalPrice}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("StatusAdmin", {
              request: request,
            });
          }}
          className="bg-loaknow-yellow rounded-lg py-3 flex-row items-center justify-between px-2 pr-4 mt-2 "
        >
          <View className="flex-row justify-between">
            <Image
              className=""
              source={require("../assets/images/truck.png")}
              style={{ width: 25, height: 20 }}
            />
            <Text className="font-semibold text-base ml-3">
              Details Product
            </Text>
          </View>
          <Image
            className=""
            source={require("../assets/images/arrow.png")}
            style={{ width: 10, height: 12 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white pt-10">
      <View className="mx-7">
        <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-2 mt-3 justify-center mb-4">
          <View className="flex-row items-center justify-evenly  w-48">
            <Text className=" font-semibold text-xl  ">Request</Text>
            <Image
              className=""
              source={require("../assets/images/request-product-logo1.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className=" font-semibold text-xl  ">Product</Text>
          </View>
        </View>
        {/* isi page */}

        <ScrollView className="overflow-x-auto">
          {loading ? (
            <View className="h-full justify-center items-center ">
              <View>
                <Text className="text-loaknow-blue text-2xl">
                  Loading. . . .
                </Text>
              </View>
            </View>
          ) : (
            request.map((request) => renderRequest(request))
          )}
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
    shadowOffset: { width: 0, height: 2 },
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

export default RequestAdminScreen;
