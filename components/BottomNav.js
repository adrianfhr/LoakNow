import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View, StyleSheet, Button, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';


const BottomNav = ( {navigation} ) => {
  const HomeRoute = () => <Text>Add</Text>;
  const CartRoute = () => <Text>Add</Text>;
  const AddRoute = () => <Text>Add</Text>;
  const PurchasedRoute = () => <Text>Purchased</Text>;
  const AccountRoute = () => <Text>Account</Text>;
  
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [showNewView1, setShowNewView1] = useState(false);
  const [showNewView2, setShowNewView2] = useState(false);

  React.useEffect(() => {
    switch (index) {
      case 0:
        navigation.navigate("Landing");
        break;
      case 1:
        navigation.navigate("Cart");
        console.log("change to cart");
        break;
      case 3:
        navigation.navigate("Purchased");
        break;
      case 4:
        navigation.navigate("Account");
        break;
      default:
        break;
    }
  }, [index, navigation]);

  const handlePress1 = () => {
    setShowNewView1(!showNewView1);
    navigation.navigate("SellProduct");
    handleIndexChange(0);
    hideModal();
    
  };

  const handlePress2 = () => {
    setShowNewView2(!showNewView2);
    navigation.navigate("ManageProduct");
    handleIndexChange(0);
    hideModal();
  };

  const showModal = () => {
    setModalVisible(true);
    setShowNewView1(false);
    setShowNewView2(false);
  }
  const hideModal = () => setModalVisible(false);

  const handleIndexChange = (newIndex) => {
    console.log(newIndex);
    if (!modalVisible){
      if (newIndex === 2) {
        setIndex(newIndex);
        showModal();
      } 
      else {
        setIndex(newIndex);
      }
    }
    else {
      setIndex(newIndex);
    }
  };

  const handleModalClose = (setIndex) => {
    hideModal();
    setIndex(0);
  };

  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'cart', title: 'Cart', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
    { key: 'add', title: 'Add', focusedIcon: 'alpha-x-circle', unfocusedIcon: 'plus-circle-outline' },
    { key: 'purchased', title: 'Purchased', focusedIcon: 'file-document', unfocusedIcon: 'file-document-outline' },
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleIndexChange}
        barStyle={styles.bottomNavBar}

      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleModalClose()}

      >
        <TouchableWithoutFeedback onPress={() => {
          hideModal();
          handleIndexChange(0);
        }}>
          
            <View  className="flex-1 items-center justify-between flex-row px-10 " style={styles.modalContainer}>
              <TouchableOpacity onPress={handlePress1}>

              {!showNewView1 ? (
                <View className="rounded-[50px] w-40 h-40 flex shadow-2xl items-center justify-center bg-loaknow-yellow">
                  <Image className="" source={require('../assets/images/cart-product.png')} style={{width:80, height:80}}/>
                  <Text className="text-base font-semibold">Sell Product</Text>
                </View>
                ) : (
                <View className="rounded-[50px] w-40 h-40 flex shadow-2xl items-center justify-center bg-loaknow-blue">
                  <Image className="" source={require('../assets/images/cart-product-pressed.png')} style={{width:80, height:80}}/>
                  <Text className="text-base font-semibold text-loaknow-yellow">Sell Product</Text>
                </View>
                )}
                
              </TouchableOpacity>
            
            <TouchableOpacity onPress={handlePress2}>
            {!showNewView2 ? (
                <View className=" bg-loaknow-yellow rounded-[50px] w-40 h-40 flex items-center justify-center">
                <Image className="" source={require('../assets/images/manage-product.png')} style={{width:80, height:80}}/>
                <Text className="text-base font-semibold">Manage Product</Text>
              </View>
              ) : (
                <View className=" rounded-[50px] w-40 h-40 flex items-center justify-center bg-loaknow-blue">
                <Image className="" source={require('../assets/images/manage-product-pressedd.png')} style={{width:80, height:80}}/>
                <Text className="text-base font-semibold text-loaknow-yellow">Manage Product</Text>
              </View>
              )}

              
            </TouchableOpacity>
        
            </View>
        </TouchableWithoutFeedback>

    
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNavBar: {
    height: 90,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalContainer: {

    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  positionBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },  
});

export default BottomNav;
