import { View } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { getFirestore } from "firebase/firestore";

const StatusProductScreen = ({ navigation, route }) => {
  const { product } = route.params;
  console.log(product);
  const createdAt = new Date(
    product.created_at.seconds * 1000 + product.created_at.nanoseconds / 1000000
  );
  const updated_at = new Date(
    product.updated_at.seconds * 1000 + product.updated_at.nanoseconds / 1000000
  );
  console.log("updated_at", updated_at);

  const formattedDateCreatedDate = createdAt.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDateUpdatedDate = updated_at.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTimeUpdate = updated_at.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.prices);

  const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.prices * product.stock);

  const data = [
    {
      title: "Request Accepted",
      description:
        "Your product has been accepted. Prepare your product immediately.",
      icon: require("../assets/images/check-icon.png"),
    },
    {
      title: "Prepare Product",
      description:
        "LoakNow will come to your place on May 20, 2024 between 09.00-12.00.",
      icon: require("../assets/images/check-icon.png"),
    },
    {
      title: "Product Will be Purchased",
      description: "Product will be purchased by LoakNow. ",
      icon: require("../assets/images/check-icon.png"),
    },
    {
      title: "Payment has been Made",
      description: "Click here to view details.",
      icon: require("../assets/images/check-icon.png"),
    },
  ];

  return (
    <View className="flex-1 bg-white pt-10">
      <View className="mx-7 flex-1">
        <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-2 mt-3 justify-center mb-4">
          <View className="flex-row items-center justify-evenly  w-48">
            <Text className=" font-semibold text-xl ">Manage</Text>
            <Image
              className=""
              source={require("../assets/images/request-product-logo1.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className=" font-semibold text-xl  ">Product</Text>
          </View>
        </View>

        {/* isi page */}
        <View style={styles.card} className="flex-1">
          <View style={styles.cardHeader} className="">
            <View className="flex-row items-center w-full justify-between">
              <View className="flex flex-row items-center">
                <Image
                  className="mr-2"
                  source={require("../assets/images/request-product-logo1.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="font-bold text-lg text-loaknow-blue">
                  {product?.username}
                </Text>
              </View>
              <View>
                <Text className="text-[#29800A]">{}</Text>
              </View>
            </View>
          </View>
          <Text className="mb-2 text-loaknow-gray">
            {formattedDateCreatedDate}
          </Text>

          <View className="flex flex-row gap-3">
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View className="">
              <Text className="font-bold mb-1 text-base">
                {product.details}
              </Text>
              <Text className="text-loaknow-blue mb-1 font-bold text-base">
                {formattedPrice}
              </Text>
              <Text className="text-base">{product.stock}x</Text>
            </View>
          </View>
          <View className=" items-end  px-2">
            <Text className="text-loaknow-gray text-base">Total Harga</Text>
            <Text className="font-semibold text-base">
              {formattedTotalPrice}
            </Text>
          </View>
          <View className="flex-1 flex-row mt-5">
            <View className="w-32 ">
              {/* <Text className>15 April 2024 23:40</Text> */}
              <Text className="text-loaknow-blue font-semibold">
                Last Update
              </Text>
              <Text>{formattedDateUpdatedDate}</Text>
              <Text>{formattedTimeUpdate}</Text>
            </View>
            <View className="flex-1">
              <Timeline
                data={data}
                innerCircle={"icon"}
                lineColor="#FFD028"
                style={{ marginLeft: -80, marginTop: 0, paddingRight: 16 }}
              />
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

export default StatusProductScreen;
