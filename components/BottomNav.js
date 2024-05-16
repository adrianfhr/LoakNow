import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';


const HomeRoute = () => <Text>nyet</Text>;

const CartRoute = () => <Text>Cart</Text>;

const AddRoute = () => <Text>Add</Text>;

const PurchasedRoute = () => <Text>Purchased</Text>;

const AccountRoute = () => <Text>Account</Text>;



const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'cart', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
    { key: 'add', focusedIcon: 'plus-circle', unfocusedIcon: 'plus-circle-outline' },
    { key: 'purchased', focusedIcon: 'file-document', unfocusedIcon: 'file-document-outline' },
    { key: 'account', focusedIcon: 'account', unfocusedIcon: 'account-outline' }, 
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    cart: CartRoute,
    add : AddRoute,
    purchased: PurchasedRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bottomNavBar}
    />
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    height: 60,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
});
export default BottomNav;