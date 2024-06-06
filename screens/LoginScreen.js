import { View, Image, TextInput, ToastAndroid } from "react-native";
import { Button, Title, HelperText, Text } from "react-native-paper";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { IconButton } from "react-native-paper";
import { useFonts } from "expo-font";

import { getFirestore, getDoc, doc } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const db = getFirestore();


  useEffect(() => {
    const checkIsAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              navigation.replace("Bottom", { screen: "Home" });
              setIsLoading(false);
            } else {
              console.log("No such document!");
              navigation.replace("RequestAdmin");
              setIsLoading(false);
            }
          })
      }
    }
    checkIsAdmin();
  }, [auth, navigation]);

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleLogin = () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((value) => value !== "")) {
      console.log(findErrors);
      setErrors(findErrors);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Login success");

          const user = auth.currentUser;
          if (user) {
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef)
              .then((docSnap) => {
                if (docSnap.exists()) {
                  console.log("Document data:", docSnap.data());
                  navigation.replace("Bottom", { screen: "Home" });
                  setIsLoading(false);
                } else {
                  console.log("No such document!");
                  navigation.replace("RequestAdmin");
                  setIsLoading(false);
                }
              })
          }

        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            ToastAndroid.show("Wrong Username or Password", ToastAndroid.SHORT);
          } else if (error.code === "auth/user-not-found") {
            ToastAndroid.show("User not found", ToastAndroid.SHORT);
          } else if (error.code === "auth/wrong-password") {
            ToastAndroid.show("Incorrect password", ToastAndroid.SHORT);
          } else if (error.code === "auth/too-many-requests") {
            ToastAndroid.show(
              "Too many attempts. Try again later.",
              ToastAndroid.LONG
            );
          } else if (error.code === "auth/invalid-email") {
            ToastAndroid.show("Invalid Format Email ", ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(
              "An unexpected error occurred",
              ToastAndroid.LONG
            );
          }
          // console.error(error);
        });
    }
  };

  if (isLoading) {
    <View className="h-full justify-center items-center ">
      <View>
        <Text className="text-loaknow-blue text-2xl">Loading. . . .</Text>
      </View>
    </View>;
  }

  return (
    <View className="bg-loaknow-blue w-screen h-full flex-col-reverse overflow-scroll">
      <View className="bg-white rounded-t-3xl px-4 py-8">
        <View className="mt-4">
          <Title
            className="text-3xl"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Login
          </Title>
          <Text
            className="text-[#656565] text-lg mb-2"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Login to your existing account
          </Text>
          <Text className="mb-2" style={{ fontFamily: "Poppins-Medium" }}>
            Email
          </Text>
          <TextInput
            className="px-4 py-4 bg-gray-100 border-2 border-loaknow-yellow rounded-full"
            value={email}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            placeholder="Enter your email"
            onChangeText={(email) => {
              setEmail(email);
              setErrors((errors) => ({ ...errors, email: "" }));
            }}
            error={errors.email !== ""}
          />
          <HelperText
            style={{ borderWidth: 0 }}
            type="error"
            visible={errors.email !== ""}
          >
            {errors.email}
          </HelperText>
          <Text className="mb-2" style={{ fontFamily: "Poppins-Medium" }}>
            Password
          </Text>
          <View className="flex-row px-4 py-2 bg-gray-100 border-2 border-loaknow-yellow rounded-full">
            <TextInput
              className="w-10/12"
              value={password}
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              placeholder="Enter your password"
              onChangeText={(password) => {
                setPassword(password);
                setErrors((errors) => ({ ...errors, password: "" }));
              }}
              error={errors.password !== ""}
              secureTextEntry={!showPassword}
            />
            <IconButton
              className="ml-6"
              icon={showPassword ? "eye" : "eye-off"}
              size={20}
              iconColor="#1B75BB"
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          <HelperText type="error" visible={errors.password !== ""}>
            {errors.password}
          </HelperText>
        </View>
        <Button
          mode="contained"
          onPress={handleLogin}
          className="bg-loaknow-yellow rounded-full px-4 py-2"
        >
          <Text className="text-lg" style={{ fontFamily: "Poppins-Medium" }}>
            Sign In
          </Text>
        </Button>
        <Text
          className="text-center mt-4"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Don't have an account?{" "}
          <Text
            style={{ fontFamily: "Poppins-Medium" }}
            onPress={() => navigation.replace("Register")}
            className="text-loaknow-blue"
          >
            Sign Up
          </Text>
        </Text>
      </View>
      <View className="mb-[-38] z-[-1]">
        <Image
          source={require("../assets/images/login.png")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
