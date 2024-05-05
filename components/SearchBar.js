import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Searchingbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search your need"
      onChangeText={setSearchQuery}
      value={searchQuery}
      elevation={0}
      inputStyle={{ marginLeft: 10, marginRight: 10 }}      
    />
  );
};

export default Searchingbar;


