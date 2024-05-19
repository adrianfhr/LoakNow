// import React, { useState, useEffect } from 'react';
// import { View, Text, Alert, Platform } from 'react-native';
// import { getMessaging, getToken, Permission } from 'firebase/messaging';


// const FcmScreen = () => {
//   const [fcmToken, setFcmToken] = useState(null);

//   useEffect(() => {
//     // Check for required permissions on iOS
//     if (Platform.OS === 'ios') {
//       requestNotificationPermissions();
//     } else {
//       // Android doesn't require explicit permission requests
//       retrieveFcmToken();
//     }
//   }, []);

//   const requestNotificationPermissions = async () => {
//     try {
//       const authStatus = await getMessaging().requestPermission();
//       if (authStatus === Permission.GRANTED) {
//         console.log('Notification permission granted');
//         retrieveFcmToken();
//       } else {
//         console.log('Notification permission denied');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to request notification permissions');
//     }
//   };

//   const retrieveFcmToken = async () => {
//     try {
//       const token = await getToken(messaging, {
//         vapidKey: 'YOUR_VAPID_KEY', // Replace with your VAPID key for web notifications
//       });

//       console.log('FCM Token:', token);
//       setFcmToken(token);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to retrieve FCM token');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {fcmToken ? (
//         <Text>Your FCM Token: {fcmToken}</Text>
//       ) : (
//         <Text>Fetching FCM Token...</Text>
//       )}
//     </View>
//   );
// };

// export default FcmScreen;