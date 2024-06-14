import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BottomNavBar = ({ navigation }) => (
  <View style={styles.bottomNavBar}>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Account')}>
      <Image source={require('../assets/exit.png')} style={styles.navIcon} />
      <Text style={styles.navButtonText}>Sign Out</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Help')}>
      <Image source={require('../assets/user.png')} style={styles.navIcon} />
      <Text style={styles.navButtonText}>Account</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SignOut')}>
      <Image source={require('../assets/info.png')} style={styles.navIcon} />
      <Text style={styles.navButtonText}>Help</Text>
    </TouchableOpacity>
  </View>
);

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/spartner_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to the Career and Technical Education Department</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Partners')}
      >
        <Text style={styles.buttonText}>View Partners</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Search Partners')}
      >
        <Text style={styles.buttonText}>Download Report</Text>
      </TouchableOpacity>
      <BottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Match background color with Login screen
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
    fontSize: width * 0.06,
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.05,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db', // Match button color with Login screen
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNavBar: {
    width: '100%',
    height: 65, // Increased height to accommodate icons
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
  },
  navIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});