import React, { useState, useEffect, useCallback } from 'react';
// import NavigationMenu2 from '../components/NavigationMenu2';
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
            <FlatList
                data={filteredPartners}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listView}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PartnerDetails', { partnerName: item.company.name })} style={[styles.partnerItem, index === 0 && { marginTop: 0 }]}>
                        <Text style={styles.partnerName}>{item.company.name}</Text>
                        <Text style={styles.partnerInfo}>{item.company.description}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, { marginRight: 5 }]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddPartners')} style={[styles.button, { marginLeft: 5 }]}>
                    <Text style={styles.buttonText}>Add Partners</Text>
                </TouchableOpacity>
            </View>
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
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
        width: '48%',
        height: 50,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
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
        width: '100%',
        flexGrow: 1,
        alignItems: 'center',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: '5%',
        width: '100%',
    },
});

export default ViewPartners;
