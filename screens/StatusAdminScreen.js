import {
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, Button, Title, HelperText, Text } from "react-native-paper";
import { useState } from "react";
import { Image, Modal } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp
  
} from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase";
import * as ImagePicker from "expo-image-picker";

const StatusAdminScreen = ({ navigation, route }) => {
  const request = route.params?.request;

  if (request) {
    const createdAt = new Date(
      request.created_at.seconds * 1000 +
        request.created_at.nanoseconds / 1000000
    );

    const updated_at = new Date(
      request.updated_at.seconds * 1000 +
        request.updated_at.nanoseconds / 1000000
    );

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
    }).format(request.prices);

    const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(request.prices * request.stock);

    const [showNewView, setShowNewView] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [image, setImage] = useState(null);
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    };

    const handleUpdate = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "orders_loaknow", request.id);
      const storage = getStorage();
      if(image) {
        const response_image = await fetch(image);
        const blob = await response_image.blob();
        const storageRef = ref(storage, `payment_proof/${request.id}`);
        await uploadBytes(storageRef, blob)
          .then((snapshot) => {
            console.log("Uploaded a blob or file!", snapshot);
          })
          .then(async () => {
            const url = await getDownloadURL(storageRef);
            setImage(url);
          });
      }
      await updateDoc(docRef, {
        accepted: accepted,
        purchased: purchased,
        updated_at: serverTimestamp(),
        payment_proof: image,
      });
      ToastAndroid.show("Data Updated", ToastAndroid.SHORT);
      navigation.navigate("RequestAdmin");
    };

    const handlePurchased = () => {
      setPurchased(true);
    };

    const handleAccept = () => {
      setAccepted(true);
    };

    const handlePress = () => {
      setShowNewView(true);
    };

    return (
      <View className="flex-1 bg-white  pt-10">
        <View className="mx-7">
          <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-2 mt-3 justify-center mb-4">
            <View className="flex-row items-center justify-evenly  w-48">
              <Text className=" font-semibold text-xl  ">Status</Text>
              <Image
                className=""
                source={require("../assets/images/request-product-logo1.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text className=" font-semibold text-xl  ">Product</Text>
            </View>
          </View>
          {/* isi page */}
          <View style={styles.card}>
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
            <Text className="mb-2 text-loaknow-gray">
              {formattedDateCreatedDate}
            </Text>

            <View className="flex flex-row gap-3">
              <Image
                source={{ uri: request.image }}
                style={styles.productImage}
              />
              <View className="">
                <Text className="font-bold mb-1 text-base">
                  {request.details}
                </Text>
                <Text className="text-loaknow-blue mb-1 font-bold text-base">
                  {formattedPrice}
                </Text>
                <Text className="text-base">{request.stock}x</Text>
              </View>
            </View>
            <View className=" items-end  px-2">
              <Text className="text-loaknow-gray text-base">Total Harga</Text>
              <Text className="font-semibold text-base">
                {formattedTotalPrice}
              </Text>
            </View>
            <View>
              <Text className="text-loaknow-blue font-semibold">
                Will you accept the product?
              </Text>
            </View>

            {accepted ? (
              <View className="bg-loaknow-blue rounded-lg px-12 py-3 justify-center items-center mt-2">
                <Text className="text-loaknow-yellow font-semibold text-base">
                  Accepted
                </Text>
              </View>
            ) : (
              <View className="mt-2 flex flex-row justify-between ">
                <TouchableOpacity>
                  <View className="bg-loaknow-gray/20 rounded-lg justify-center items-center w-36 py-3">
                    <Text className="text-loaknow-gray font-semibold text-base">
                      Decline
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAccept}>
                  <View className="bg-loaknow-yellow rounded-lg justify-center items-center w-36 py-3 ">
                    <Text className="text-loaknow-blue  font-semibold text-base">
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text className="text-loaknow-blue font-semibold mt-2">
                When will you ship the product?
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={(date) => {
                  setDate(date);
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />

              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <View className="flex-row bg-loaknow-gray/20 rounded-lg justify-center items-center w-36 py-3 mt-2 ">
                  <Text className="text-loaknow-gray font-semibold text-sm">
                    {`${date.getMonth() + 1}/${date.getDate()}/${date
                      .getFullYear()
                      .toString()
                      .substr(
                        -2
                      )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
                  </Text>
                </View>
              </TouchableOpacity>

              <Text className="text-loaknow-blue font-semibold mt-2">
                Will this product be purchased?
              </Text>
              {purchased ? (
                <View className="bg-loaknow-blue rounded-lg px-12 py-3 justify-center items-center mt-2">
                  <Text className="text-loaknow-yellow font-semibold text-base">
                    Purchased
                  </Text>
                </View>
              ) : (
                <View className="mt-2 flex flex-row justify-between ">
                  <TouchableOpacity>
                    <View className="bg-loaknow-gray/20 rounded-lg justify-center items-center w-36 py-3 ">
                      <Text className="text-loaknow-gray font-semibold text-base">
                        No
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handlePurchased}>
                    <View className="bg-loaknow-yellow rounded-lg justify-center items-center w-36 py-3 ">
                      <Text className="text-loaknow-blue  font-semibold text-base">
                        Yes
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <Text className="text-loaknow-blue font-semibold mt-2">
                Has the payment been made?
              </Text>
              {/* place holder image */}
              <View className="flex flex-row my-3">
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image
                      className="mx-2"
                      source={{ uri: image }}
                      style={{ width: 90, height: 90 }}
                    />
                  ) : (
                    <View className="border-2 border-slate-300 rounded-lg">
                      <Image
                        className="mx-2 "
                        source={require("../assets/images/image-placeholder.png")}
                        style={{ width: 90, height: 90 }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* UPDATE TOUCHABLE BUTTON */}
        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-loaknow-yellow rounded-lg py-3 flex-row items-center justify-between px-2 pr-4 mt-2 mx-7"
        >
          <Text className="text-loaknow-blue font-semibold text-base">
            Update
          </Text>
          <Image
            source={require("../assets/images/arrow.png")}
            style={{ width: 20, height: 20, transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-loaknow-blue h-screen w-screen justify-center items-center">
      <Text className="text-loaknow-yellow font-bold text-2xl">No Request</Text>
      <TouchableOpacity
        className="bg-loaknow-yellow p-4 rounded-3xl"
        onPress={() => navigation.navigate("RequestAdmin")}
      >
        <Text>Back to Request Admin</Text>
      </TouchableOpacity>
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

export default StatusAdminScreen;
