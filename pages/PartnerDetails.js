import React, { useState, useEffect } from 'react';
import NavigationMenu2 from '../components/NavigationMenu2';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const PartnerDetails = ({ route, navigation }) => {
    const { partnerName } = route.params;
    const [partner, setPartner] = useState(null);
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

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                if (ngrokUrl) {
                    const response = await axios.get(`${ngrokUrl}/partners`);
                    const partnerData = response.data.find(p => p.name === partnerName);
                    setPartner(partnerData);
                }
            } catch (error) {
                console.error('Error fetching partner details:', error);
            }
        };

        fetchPartnerDetails();
    }, [ngrokUrl, partnerName]);

    const handleDeletePartner = async () => {
        try {
            await axios.delete(`${ngrokUrl}/partners/${partner._id}`);
            Alert.alert('Success', 'Partner deleted successfully');
            navigation.navigate('ViewPartners'); // Navigate back to the list after deletion
        } catch (error) {
            console.log(partner._id)
            console.error('Error deleting partner:', error);
            Alert.alert('Error', 'Failed to delete partner');
        }
    };

    const handleEditPartner = () => {
        navigation.navigate('EditPartner', { partner }); // Assuming you have an EditPartner screen
    };

    if (!partner) {
        return (
            <View style={styles.container2}>
                <Text style={styles.loadingText}>Loading...</Text>
                <NavigationMenu2 />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{partner.name}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.text}>{partner.description}</Text>
                <Text style={styles.label}>Type of Organization:</Text>
                <Text style={styles.text}>{partner.type_of_organization}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{partner.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.text}>{partner.phone}</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.text}>{partner.address}</Text>
                <Text style={styles.label}>Website:</Text>
                <Text style={styles.text}>{partner.website}</Text>
                <Text style={styles.label}>Resources Available:</Text>
                <Text style={styles.text}>{partner.resources_available}</Text>
            </View>
            <View style={styles.mapBox}>
                {/* Google Map will go here in the future */}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={handleEditPartner}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePartner}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <NavigationMenu2 navigation={navigation} />
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
    container2: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    loadingText: {
        color: '#ecf0f1',
        fontSize: 20,
    },
    infoBox: {
        backgroundColor: '#34495e',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 10,
        width: width * 0.9,
        height: height * 0.475,
        top: height * 0.04,
        justifyContent: 'center'
    },
    mapBox: {
        backgroundColor: '#34495e',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 10,
        width: width * 0.9,
        height: height * 0.16,
        top: height * 0.03,
        justifyContent: 'center'
    },
    titleBox: {
        backgroundColor: '#34495e',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        marginVertical: 10,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        top: height * 0.055,
        height: height * 0.055,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        color: '#ecf0f1',
        fontSize: 24,
    },
    label: {
        color: '#bdc3c7',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    text: {
        color: '#ecf0f1',
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.0285,
        width: width * 0.9,
    },
    editButton: {
        flex: 1,
        height: 50,
        backgroundColor: '#3498db', // Edit button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        flex: 1,
        height: 50,
        backgroundColor: '#e74c3c', // Delete button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

export default PartnerDetails;
