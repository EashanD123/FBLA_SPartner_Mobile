import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Home = () => {

  return (
    <View style={styles.container}>
      <Text> Home </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: '5%',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: height * 0.09,
    marginBottom: height * 0.06,
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#ccc',
  },
  authenticationCont: {
    width: '100%',
    alignItems: 'center',
    marginTop: -10,
  },
  linkView: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-between'
  }, 
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default Home;
