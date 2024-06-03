import React, { useState, useEffect } from "react";
import { View, Text, Alert, Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const FCMScreen = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        setToken(token);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      setToken(token);
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Device FCM Token: {token}</Text>
    </View>
  );
};
