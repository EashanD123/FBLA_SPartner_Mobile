// pages/ViewPartners.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, FlatList } from 'react-native';

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

const ViewPartners = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [partners, setPartners] = useState([
        { id: '1', name: 'Unisol', info: 'Info about Partner 1' },
        { id: '2', name: 'Busches', info: 'Info about Partner 2' },
        { id: '3', name: 'Stewarts', info: 'Info about Partner 3' },
        { id: '4', name: 'Novi Sports Club', info: 'Info about Partner 1' },
        { id: '5', name: 'Novi Community School District', info: 'Info about Partner 2' },
        { id: '6', name: 'Official Driving School of Novi', info: 'Info about Partner 3' },
        { id: '7', name: 'Splaine and Reynolds', info: 'Info about Partner 1' },
        { id: '9', name: 'Vision Works', info: 'Info about Partner 2' },
        { id: '10', name: 'Chipotle', info: 'Info about Partner 3' },
        { id: '11', name: 'Great Clips', info: 'Info about Partner 1' },
        { id: '12', name: 'Kohls', info: 'Info about Partner 2' },
        { id: '13', name: 'Burlington 3', info: 'Info about Partner 3' },
        { id: '14', name: 'Party City', info: 'Info about Partner 1' },
        { id: '15', name: 'Hungry Howies', info: 'Info about Partner 2' },
        { id: '16', name: 'Suburban Car Dealership', info: 'Info about Partner 3' },
        { id: '17', name: 'Coney Island', info: 'Info about Partner 2' },
        { id: '18', name: 'Paradise Park', info: 'Info about Partner 3' },
        { id: '19', name: 'Bonn Adventure', info: 'Info about Partner 1' },
        { id: '20', name: 'Dairy Queen', info: 'Info about Partner 2' },
        { id: '21', name: 'Ping Identity', info: 'Info about Partner 3' },
        { id: '22', name: 'Quartz Properties', info: 'Info about Partner 2' },
        { id: '23', name: 'Nespon', info: 'Info about Partner 3' },
        { id: '24', name: 'Pandev Grocers', info: 'Info about Partner 1' },
        { id: '25', name: 'Home Depot', info: 'Info about Partner 2' },
        { id: '26', name: 'Panera Bread', info: 'Info about Partner 3' },
        // Add more partners here
    ]);

    const filteredPartners = partners.filter(partner =>
        partner.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search partners..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Image source={require('../assets/settings-sliders.png')} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={filteredPartners}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.partnerItem, index === 0 && { marginTop: 0 }]}>
                            <Text style={styles.partnerName}>{item.name}</Text>
                            <Text style={styles.partnerInfo}>{item.info}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <BottomNavBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        paddingHorizontal: '5%',
    },
    searchBar: {
        width: width * 0.775,
        height: width * 0.12,
        marginRight: width * 0.005,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ecf0f1',
    },
    filterButton: {
        width: width * 0.12,
        height: width * 0.12,
        marginLeft: width * 0.005,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#1abc9c',
    },
    filterIcon: {
        width: 24,
        height: 24,
    },
    searchView: {
        width: width,
        top: height * 0.055,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    partnerItem: {
        width: width * 0.9,
        height: height * 0.11, 
        justifyContent: 'center', 
        backgroundColor: '#34495e',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    partnerName: {
        color: '#ecf0f1',
        fontSize: 18,
        fontWeight: 'bold',
    },
    partnerInfo: {
        color: '#bdc3c7',
        fontSize: 14,
        marginTop: 5,
    },
    listView: {
        width: width,
        height: height * 0.725,
        marginTop: height * 0.0675,
        alignItems: 'center'
    },
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
        justifyContent: 'center',
        alignItems: 'center',
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

export default ViewPartners;
