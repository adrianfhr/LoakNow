import { View, Image } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../firebase'
const RegisterScreen = ({ navigation }) => {
    const db = getFirestore(app);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [fullName,setFullName] = useState("");
    const [errors,setErrors] = useState({
        email:"",
        fullName:"",
        password:"",
        repeatPassword:""
    })
    const auth = getAuth();
    // const db = getFirestore();
    const validate = ()=>{

        let newErrors = {
            email:"",
            password:""
        };

        if(!email){

            newErrors.email = "Email is required";
        }

        if(!password){
            newErrors.password = "Password is required";
        }

        if(!fullName){
            newErrors.fullName = "Full Name is required";
        }

        if(!repeatPassword){
            newErrors.password = "Repeat Password is required";
        } else if(password !== repeatPassword){
            newErrors.repeatPassword = "Repeat Password is not equal with password";
        }

        

        return newErrors;

    }

    const handleRegister = async () => {
        const findErrors = validate();
    
        if (Object.values(findErrors).some(value => value !== "")) {
            console.log(findErrors);
            setErrors(findErrors);
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                console.log("login success", res.user);
                
                // Save user info in Firestore
                const userDocRef = doc(db, "users", res.user.uid); // Referensi dokumen yang benar
                await setDoc(userDocRef, {
                    email: email,
                    fullName: fullName,
                    address: '',
                    phone: '',
                    orders: [],
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp()
                });
                console.log("Document written with ID: ", userDocRef.id);
                navigation.navigate('Home');
                // navigation.navigate('Home');
            } catch (error) {
                console.log("error", error);
                let newErrors = {
                    email: "",
                    password: ""
                };
                if (error.code === "auth/invalid-credential") {
                    newErrors.email = "Invalid Email";
                } else if (error.code === "auth/email-already-in-use") {
                    newErrors.email = "Email already in use";
                }
                setErrors(newErrors);
            }
        }
    };
    return(
        <View className="bg-[#1B75BB] w-screen h-full flex-col-reverse overflow-scroll">
            <View className=" h-4/5 bg-white rounded-t-3xl p-4">
                <View className="mt-4">
                    <Title className="text-3xl font-bold text-[poppins]">Sign Up</Title>
                    <Text className="text-[#656565] text-lg mb-2" >Create an account</Text>
                    <Text className="mb-2" >Email</Text>
                    <TextInput 
                        className="px-2 bg-gray-100 border-2 border-loaknow-yellow rounded-full"
                        value={email}
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        onChangeText={(email)=>{
                            setEmail(email)
                            setErrors(errors=>({...errors, email: ""}))
                        }}
                        error={errors.email !== ""}
                    />
                    <HelperText type="error" visible={errors.email !== ""}>{errors.email}</HelperText>
                    <Text className="mb-2" >Full Name</Text>
                    <TextInput
                        className="px-2 bg-gray-100 border-2 border-loaknow-yellow rounded-full"
                        value={fullName}
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        onChangeText={(fullName)=>{
                            setFullName(fullName)
                            setErrors(errors=>({...errors, fullName: ""}))
                        }}
                        error={errors.fullName !== ""}
                    />
                    <HelperText type="error" visible={errors.fullName !== ""}>{errors.fullName}</HelperText>
                    <Text className="mb-2" >Password</Text>
                    <TextInput
                        className="px-2 bg-gray-100 border-2 border-loaknow-yellow rounded-full"
                        value={password}
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        onChangeText={(password)=>{
                            setPassword(password)
                            setErrors(errors=>({...errors, password: ""}))
                        }}
                        error={errors.password !== ""}
                        secureTextEntry
                    />
                    <HelperText type="error" visible={errors.password !== ""}>{errors.password}</HelperText>
                    <Text className="mb-2" >Repeat Password</Text>
                    <TextInput
                        className="px-2 bg-gray-100 border-2 border-loaknow-yellow rounded-full"
                        value={repeatPassword}
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        onChangeText={(password)=>{
                            setRepeatPassword(password)
                            setErrors(errors=>({...errors, repeatPassword: ""}))
                        }}
                        error={errors.repeatPassword !== ""}
                        secureTextEntry
                    />
                    <HelperText type="error" visible={errors.repeatPassword !== ""}>{errors.repeatPassword}</HelperText>
                </View>
                <Button mode="contained" onPress={handleRegister} className="bg-loaknow-blue rounded-full">
                    <Text className="text-lg text-loaknow-yellow">Sign Up</Text>
                </Button>
                <Text className="text-center mt-4">Already have an account? <Text onPress={()=>navigation.navigate('Login')} className="text-loaknow-blue">Login</Text></Text>
            </View>
        <View className="mb-[-38] z-[-1]">
            <Image source={require('../assets/images/register.png')} style={{width: 180, height: 180, alignSelf: 'center'}}/>
        </View>
        </View>
    );
}

  export default RegisterScreen;