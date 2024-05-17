import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View, StyleSheet, Button, Modal } from 'react-native';

const HomeRoute = () => <Text>Home</Text>;
const CartRoute = () => <Text>Cart</Text>;
const AddRoute = () => <Text>Add</Text>;
const PurchasedRoute = () => <Text>Purchased</Text>;
const AccountRoute = () => <Text>Account</Text>;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleIndexChange = (newIndex) => {
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
    // Fungsi yang ingin dijalankan saat modal ditutup
    hideModal(); // Fungsi hideModal juga dijalankan
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
        renderScene={BottomNavigation.SceneMap({
          home: HomeRoute,
          cart: CartRoute,
          add: AddRoute,
          purchased: PurchasedRoute,
          account: AccountRoute,
        })}
        barStyle={styles.bottomNavBar}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}

      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>This is a modal</Text>
            <Button title="Close Modal" onPress={hideModal} />
          </View>
        </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default BottomNav;
