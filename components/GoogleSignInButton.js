import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Handle Google Sign-In logic here
    console.log('Google Sign-In');
  };

  return (
    <TouchableOpacity style={styles.gsiMaterialButton} onPress={handleGoogleSignIn}>
      <View style={styles.gsiMaterialButtonContentWrapper}>
        <View style={styles.gsiMaterialButtonIcon}>
          <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
            <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></Path>
            <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></Path>
            <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></Path>
            <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></Path>
            <Path fill="none" d="M0 0h48v48H0z"></Path>
          </Svg>
        </View>
        <Text style={styles.gsiMaterialButtonContents}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gsiMaterialButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    width: '100%',
    maxWidth: 400,
    minWidth: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 0,
  },
  gsiMaterialButtonContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  gsiMaterialButtonIcon: {
    marginRight: 20,
  },
  gsiMaterialButtonContents: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    color: '#1f1f1f',
  },
});

export default GoogleSignInButton;
