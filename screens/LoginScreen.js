import { View, StyleSheet, Image} from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState({
        email:"",
        password:"",
        repeatPassword:""
    })

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

        return newErrors;

    }

    const handleLogin = ()=>{
        const findErrors = validate();

        if(Object.values(findErrors).some(value=> value !== "")){
            console.log(findErrors)
            setErrors(findErrors)
        }else{
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                    navigation.navigate('Home')
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    
                    }

                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    }

                    console.error(error);

  });

        }
    }

    return (
        <View className="bg-loaknow-blue w-screen h-full flex-col-reverse overflow-scroll">
        <View className="bg-white rounded-t-3xl px-4 py-8">
            <View className="mt-4">
                <Title className="text-3xl font-bold text-[poppins]">Login</Title>
                <Text className="text-[#656565] text-lg mb-2" >Login to your existing account</Text>
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
            </View>
            <Button mode="contained" onPress={handleLogin} className="bg-loaknow-blue rounded-full">
                <Text className="text-lg text-loaknow-yellow">Sign Up</Text>
            </Button>
            <Text className="text-center mt-4">Don't have an account? <Text onPress={()=>navigation.navigate('Register')} className="text-loaknow-blue">Sign Up</Text></Text>
        </View>
        <View className="mb-[-38] z-[-1]">
            <Image source={require('../assets/images/login.png')} style={{width: 200, height: 200, alignSelf: 'center'}}/>
        </View>
    </View>
    )
};

export default LoginScreen;