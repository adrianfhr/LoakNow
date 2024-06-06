// RequestProductScreen.js
import React, { useState } from "react";
import {
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import {
  setDoc,
  doc,
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useFonts } from "expo-font";

const RequestProductScreen = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const db = getFirestore(app);
  const [showNewView, setShowNewView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDanger, setSelectedDanger] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const categories = [
    "Electronic",
    "Bag",
    "Sport",
    "Shoes",
    "Food",
    "Fashion Women",
    "Fashion Men",
  ];
  const dangers = ["Yes", "No"];
  const conditions = ["25", "50", "75", "95", "100"];

  const auth = getAuth();
  const user = auth.currentUser;
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const storage = getStorage();

  // get fulname from firestore
  const getFullName = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data().fullName;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handlePress = async (value) => {
    value.image = image;
    const response = await fetch(image);
    const blobFile = await response.blob();
    console.log(image);
    // 'file' comes from the Blob or File APIconst storage = getStorage();
    const storageRef = ref(storage, "requestProduct/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobFile)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.uid = user.uid;
          value.created_at = serverTimestamp();
          value.updated_at = serverTimestamp();
          value.username = await getFullName();
          value.categories = selectedCategory;
          value.dangerous = selectedDanger === "Yes" ? true : false;
          value.condition = selectedCondition;
          
          try {
            const docRef = await addDoc(
              collection(db, "orders_loaknow"),
              value
            );
            if (docRef) {
              console.log("sukses");
              showModal();
            }
          } catch (error) {
            console.log(error);
          }
        });
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
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
                Request Product{" "}
              </Text>
            </View>
          </View>
          <Formik
            initialValues={{
              name: "",
              details: "",
              categories: "",
              prices: "",
              stock: 0,
              condition: 0,
              dangerous: true,
              image: "",
              status: false,
              uid: "",
              created_at: null,
              updated_at: null,
              username: "",
              purchased: false,
              accepted: false,
              date_will_visit: null,
              payment_proof: null,
            }}
            onSubmit={(values) => {
              handlePress(values);
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name must be there";
              }
              if (!values.details) {
                errors.details = "Details must be there";
              }

              if (!values.prices) {
                errors.prices = "Prices must be there";
              }
              if (values.stock <= 0) {
                errors.stock = "Stock must be greater than 0";
              }

              if (!image) {
                errors.image = "Image must be there";
              }


              return errors;
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <Text
                  className="text-base my-3"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Product Picture & Video{" "}
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <View className="flex flex-row mb-3">
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
                <Text
                  className="text-base mb-3"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Product Name <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                  placeholder="Insert product name"
                  placeholderTextColor={"gray"}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  value={values?.name}
                  onChangeText={handleChange("name")}
                />
                <Text
                  className="text-base mb-3"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Product Details <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                  placeholder="Insert product details"
                  placeholderTextColor={"gray"}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  value={values?.details}
                  onChangeText={handleChange("details")}
                />
                <Text
                  className="text-base mb-3"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Categories <Text style={{ color: "red" }}> *</Text>
                </Text>
                <View className="rounded-full px-2 bg-loaknow-bg/20 mb-2">
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedCategory(itemValue)
                    }
                  >
                    <Picker.Item
                      label="Search Categories"
                      value={null}
                      style={{ color: "gray" }}
                    />
                    {categories.map((category, index) => (
                      <Picker.Item
                        key={index}
                        label={category}
                        value={category}
                      />
                    ))}
                  </Picker>
                </View>
                <View className="flex flex-row gap-8 mb-3">
                  <View className="w-36">
                    <Text
                      className="mb-3"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Price <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <TextInput
                      className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                      placeholder="Insert price"
                      placeholderTextColor={"gray"}
                      underlineColor="transparent"
                      activeUnderlineColor="transparent"
                      keyboardType="numeric"
                      value={values?.prices}
                      onChangeText={handleChange("prices")}
                    />
                  </View>
                  <View>
                    <Text
                      className="mb-3"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Stock <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <TextInput
                      className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                      placeholder="Insert stock"
                      underlineColor="transparent"
                      placeholderTextColor={"gray"}
                      activeUnderlineColor="transparent"
                      keyboardType="numeric"
                      value={values?.stock}
                      onChangeText={handleChange("stock")}
                    />
                  </View>
                </View>
                <View className="flex flex-row gap-8">
                  <View className="w-36">
                    <Text
                      className="mb-3"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Condition <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <View className="rounded-full px-2 bg-loaknow-bg/20 mb-2">
                      <Picker
                        selectedValue={selectedCondition}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedCondition(itemValue)
                        }
                      >
                        <Picker.Item
                          label="X %"
                          value={null}
                          style={{ color: "gray" }}
                        />
                        {conditions.map((condition, index) => (
                          <Picker.Item
                            key={index}
                            label={condition}
                            value={condition}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <View>
                    <Text
                      className="mb-3"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Dangerous Product <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <View className="rounded-full px-2 bg-loaknow-bg/20 mb-2">
                      <Picker
                        selectedValue={selectedDanger}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedDanger(itemValue)
                        }
                      >
                        <Picker.Item
                          label="Yes/No"
                          value={null}
                          style={{ color: "gray" }}
                        />
                        {dangers.map((danger, index) => (
                          <Picker.Item
                            key={index}
                            label={danger}
                            value={danger}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                  {!showNewView ? (
                    <View className="bg-loaknow-yellow items-center justify-center rounded-full p-3 mt-4">
                      <Text
                        className="text-base"
                        style={{ fontFamily: "Poppins-Medium" }}
                      >
                        Request
                      </Text>
                    </View>
                  ) : (
                    <View className="bg-loaknow-blue items-center justify-center rounded-full p-3 mt-4">
                      <Text
                        className="text-base text-loaknow-yellow"
                        style={{ fontFamily: "Poppins-Medium" }}
                      >
                        Request
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={hideModal}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                hideModal();
                handlePress();
                navigation.replace("Bottom", { screen: "Home" });
              }}
            >
              <View className="flex-1 items-center justify-center bg-white/90">
                <Image source={require("../assets/images/success.png")} />
                <Text className="font-bold text-lg">Thank You!</Text>
                <Text className="text-base">Your request was submitted!</Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestProductScreen;
