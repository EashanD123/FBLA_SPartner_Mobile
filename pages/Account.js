// pages/Profile.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationMenu2 from '../components/NavigationMenu2';

const Account = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile Page</Text>
      <NavigationMenu2 navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Match background color with other screens
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Account;
