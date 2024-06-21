import React, { useState, useEffect, useCallback } from 'react';
import NavigationMenu2 from '../components/NavigationMenu2';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ViewPartners = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [partners, setPartners] = useState([]);
    const [ngrokUrl, setNgrokUrl] = useState(null);

    useEffect(() => {
        const config = {
            headers: { 'Authorization': "Bearer 2hsoEyQpmPX4VkdVTitaAGgnJE7_6dFvuuendEo5DM1ry44rX", 'Ngrok-Version': '2' }
        };

        const fetchNgrokUrl = async () => {
            try {
                const response = await axios.get(
                    'https://api.ngrok.com/endpoints',
                    config
                );
                const url = response.data.endpoints[0].public_url;
                setNgrokUrl(url);
            } catch (error) {
                console.error('Failed to fetch ngrok URL:', error);
                Alert.alert('Error', 'Failed to fetch server configuration.');
            }
        };
        fetchNgrokUrl();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchPartners = async () => {
                if (!ngrokUrl) {
                    return;
                }
                try {
                    const response = await axios.get(`${ngrokUrl}/partners`);
                    setPartners(response.data);
                } catch (error) {
                    console.error('Error fetching partners:', error);
                    Alert.alert('Error', 'Failed to fetch partners');
                }
            };

            fetchPartners();
        }, [ngrokUrl])
    );

    const filteredPartners = partners.filter(partner =>
        partner.company.name.toLowerCase().includes(searchText.toLowerCase())
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
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('PartnerDetails', { partnerName: item.company.name })} style={[styles.partnerItem, index === 0 && { marginTop: 0 }]}>
                            <Text style={styles.partnerName}>{item.company.name}</Text>
                            <Text style={styles.partnerInfo}>{item.company.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddPartners')}>
                <Text style={styles.buttonText}>Add Partners</Text>
            </TouchableOpacity>
            <NavigationMenu2 navigation={navigation} />
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
        height: height * 0.097,
        justifyContent: 'center',
        backgroundColor: '#34495e',
        padding: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'white',
        marginTop: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#3498db', // Match button color with Login screen
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: height * 0.01
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
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
    listView: {
        width: width,
        height: height * 0.65,
        marginTop: height * 0.072,
        alignItems: 'center'
    },
    bottomNavBar: {
        width: width * 0.9,
        height: 75,
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
