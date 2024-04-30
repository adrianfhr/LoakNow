import { View, StyleSheet} from "react-native";
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

    const auth = getAuth();
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
            signInWithEmailAndPassword(auth,email,password).then(res=>{
                console.log("login success",res)
                navigation.navigate('Home');
            }).catch((error)=>{
                console.log("error",error)
                let newErrors = {
                    email: "",
                    password:""
                }
                setErrors(newErrors)
            })

        }
    }
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Login</Title>
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <HelperText type="error" visible={errors.email !== ""}>
                {errors.email}
            </HelperText>
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <HelperText type="error" visible={errors.password !== ""}>
                {errors.password}
            </HelperText>
            <Button mode="contained" style={styles.button} onPress={handleLogin}>
                Login
            </Button>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      marginBottom: 10,
    },
  });

export default LoginScreen;