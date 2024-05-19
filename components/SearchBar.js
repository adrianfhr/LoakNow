import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Searchingbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search your need"
      onChangeText={setSearchQuery}
      value={searchQuery}
      elevation={0}
      inputStyle={{ marginLeft: 10, marginRight: 10 }}      
      style={styles.searchbar}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: '#eeeeee', // Ubah warna latar belakang sesuai keinginan Anda

  },
});
export default Searchingbar;


