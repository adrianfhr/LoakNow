// RequestProductScreen.js
import React, { useState } from "react";
import { ScrollView, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View, Image, Modal, StyleSheet } from "react-native";
import { TextInput, Text } from 'react-native-paper';
import { Formik } from "formik";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { getAuth } from 'firebase/auth'
import { app } from "../firebase"
import { setDoc, doc, getFirestore, addDoc, collection } from "firebase/firestore";

const RequestProductScreen = ({ navigation }) => {
  const db = getFirestore(app);
  const [showNewView, setShowNewView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const storage = getStorage();

  const handlePress = async (value) => {
    value.image = image;
    const response = await fetch(image);
    const blobFile = await response.blob()
    console.log(image)
    // 'file' comes from the Blob or File APIconst storage = getStorage();
    const storageRef = ref(storage, "requestProduct/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobFile).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      }).then((resp)=> {
          getDownloadURL(storageRef).then(async(downloadUrl)=>{
              console.log(downloadUrl);
              value.image=downloadUrl;
              value.uid=user.uid;
              try{
                const docRef = await addDoc(collection(db, "orders_loaknow"), value)
                if(docRef){
                  console.log("sukses");
                }
              } catch (error){
                console.log(error)
              }
            })
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
    <View className="flex-1 bg-white pt-10">
      <View className="mx-7">
      <View className="border-b-[1px] border-loaknow-gray/20 flex flex-row items-center pb-3 my-3">
                        <TouchableOpacity onPress={()=>{
                            navigation.goBack()
                        }} className=" bg-loaknow-gray/20 rounded-full  flex items-center justify-center p-2">
                            <Image className=" " source={require('../assets/images/arrow.png')} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>
                        <View className=" ml-3 justify-center items-center">
                            <Text className=" font-semibold text-xl  "> Request Product </Text>
                        </View>
                    </View>
          <Formik 
            initialValues={{ name: '', details: '', categories: '', prices: '', stock: 0, condition: 0, dangerous: true, image: '', uid: '' }}
            onSubmit={value => handlePress(value)}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name must be there";
                ToastAndroid.show('Name must be there', ToastAndroid.SHORT);
              }
              if (!values.details) {
                errors.details = "Details must be there";
                ToastAndroid.show('Details must be there', ToastAndroid.SHORT);
              }
              if (!values.categories) {
                errors.categories = "Categories must be there";
                ToastAndroid.show('Categories must be there', ToastAndroid.SHORT);
              }
              if (!values.prices) {
                errors.prices = "Prices must be there";
                ToastAndroid.show('Prices must be there', ToastAndroid.SHORT);
              }
              if (values.stock <= 0) {
                errors.stock = "Stock must be greater than 0";
                ToastAndroid.show('Stock must be greater than 0', ToastAndroid.SHORT);
              }
              if (values.condition < 0 || values.condition > 100) {
                errors.condition = "Condition must be between 0 and 10";
                ToastAndroid.show('Condition must be between 0 and 10', ToastAndroid.SHORT);
              }
              if (!image) {
                errors.image = "Image must be there";
                ToastAndroid.show('Image must be there', ToastAndroid.SHORT);
              }
              
              return errors;
            }}
          >
          {({ handleChange,  handleSubmit, values }) => (
            <View>
              <Text className="font-semibold text-base my-3">Product Picture & Video *</Text>
              <View className="flex flex-row mb-3">
                <TouchableOpacity onPress={pickImage}>
                  {image ?
                    <Image className="mx-2" source={{ uri: image }} style={{ width: 90, height: 90 }} /> 
                    :
                    <View className='border-2 border-slate-300 rounded-lg'>
                      <Image className="mx-2 " source={require('../assets/images/image-placeholder.png')} style={{ width: 90, height: 90 }} />
                    </View>
                  }
                </TouchableOpacity>
              </View>
              <Text className="font-semibold text-base mb-3">Product Name *</Text>
              <TextInput
                className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                placeholder="Insert product name"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                value={values?.name}
                onChangeText={handleChange('name')}
              />
              <Text className="font-semibold text-base mb-3">Product Details *</Text>
              <TextInput
                className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                placeholder="Insert product details"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                value={values?.details}
                onChangeText={handleChange('details')}
              />
              <Text className="font-semibold text-base mb-3">Categories *</Text>
              <TextInput
                className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                placeholder="Search Categories"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                value={values?.categories}
                onChangeText={handleChange('categories')}
              />
              <View className="flex flex-row gap-8 mb-3">
                <View className="w-36">
                  <Text className="mb-3 font-semibold">Price *</Text>
                  <TextInput
                    className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                    placeholder="Insert price"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    keyboardType="numeric"
                    value={values?.prices}
                    onChangeText={handleChange('prices')}
                  />
                </View>
                <View>
                  <Text className="mb-3 font-semibold">Stock *</Text>
                  <TextInput
                    className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                    placeholder="Insert stock"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    keyboardType="numeric"
                    value={values?.stock}
                    onChangeText={handleChange('stock')}
                  />
                </View>
              </View>
              <View className="flex flex-row gap-8">
                <View className="w-36">
                  <Text className="mb-3 font-semibold">Condition *</Text>
                  <TextInput
                    className="rounded-full px-2 bg-loaknow-bg/20 mb-2 w-20"
                    placeholder="X %"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    keyboardType="numeric"
                    value={values?.condition}
                    onChangeText={handleChange('condition')}
                  />
                </View>
                <View>
                  <Text className="mb-3 font-semibold">Dangerous Product *</Text>
                  <TextInput
                    className="rounded-full px-2 bg-loaknow-bg/20 mb-2"
                    placeholder="Yes/No"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    value={values?.dangerous}
                    onChangeText={handleChange('dangerous')}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                {!showNewView ? (
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
          )}
        </Formik>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideModal}
        >
          <TouchableWithoutFeedback onPress={() => {
              hideModal();
              handlePress();
              navigation.navigate("Home")
            }}
          >
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
};

export default RequestProductScreen;
