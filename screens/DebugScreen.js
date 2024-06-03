import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { app, analytics, auth } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";

const DebugScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  console.log("user: ".userData);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout success");
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  };

  console.log("userdata :", userData);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Button title="Logout" onPress={handleLogout} />
        <Text style={styles.title}>Home Screen</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Landing"
            onPress={() => navigation.navigate("Bottom", { screen: "Home" })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Cart"
            onPress={() => navigation.navigate("Bottom", { screen: "Cart" })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to SellProduct"
            onPress={() => navigation.navigate("SellProduct")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Request Product"
            onPress={() => navigation.navigate("RequestProduct")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Manage Product"
            onPress={() => navigation.navigate("ManageProduct")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate("Bottom", { screen: "Profile" })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Transaction"
            onPress={() => navigation.navigate("Transaction")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to RequestAdmin"
            onPress={() => navigation.navigate("RequestAdmin")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to StatusAdmin"
            onPress={() => navigation.navigate("StatusAdmin")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to StatusProduct"
            onPress={() => navigation.navigate("StatusProduct")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Go to BottomAdmin"
            onPress={() => navigation.navigate("BottomAdmin")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Landing"
          onPress={() => navigation.navigate("Bottom", { screen: "Home" })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate("Bottom", { screen: "Cart" })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to SellProduct"
          onPress={() => navigation.navigate("SellProduct")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Request Product"
          onPress={() => navigation.navigate("RequestProduct")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Manage Product"
          onPress={() => navigation.navigate("ManageProduct")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate("Bottom", { screen: "Profile" })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Transaction"
          onPress={() => navigation.navigate("Transaction")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to RequestAdmin"
          onPress={() => navigation.navigate("RequestAdmin")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to StatusAdmin"
          onPress={() => navigation.navigate("StatusAdmin")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to StatusProduct"
          onPress={() => navigation.navigate("StatusProduct")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to BottomAdmin"
          onPress={() => navigation.navigate("BottomAdmin")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B75BB",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});

export default DebugScreen;
