import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const NavigationMenu3 = ({ navigation, page }) => (
  <View style={styles.bottomNavBar}>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
      <Image source={require('../assets/arrow.png')} style={styles.navIcon} />
      <Text style={styles.navButtonText}>Go Back</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddPartners')}>
      <Image source={require('../assets/add.png')} style={styles.navIcon} />
      <Text style={styles.navButtonText}>Add Partner</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => {
        if (page === 'ViewPartners') {
          navigation.navigate('HelpViewPartners');
        } else {
          // Handle other cases or do nothing
        }
      }}
    >
      <Image source={require('../assets/info.png')} style={styles.navIcon} />
      <Text style={styles.navButtonText}>Help</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNavBar: {
    width: width * 0.9,
    height: 75, // Increased height to accommodate icons
    bottom: height * 0.04,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0.5,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
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

export default NavigationMenu3;
