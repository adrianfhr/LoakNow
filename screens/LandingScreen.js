import { View } from "react-native";
import { TextInput, Button, Title, HelperText, Text } from 'react-native-paper';
import { useState } from "react";

const LandingScreen = ({ navigation }) => {
    
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Landing Screen</Title>
            </View>
        );
    }

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B75BB',
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20
    }
}

export default LandingScreen;