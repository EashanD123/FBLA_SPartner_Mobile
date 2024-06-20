import React, { useState, useEffect } from 'react';
import NavigationMenu2 from '../components/NavigationMenu2';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Edit = ({ route, navigation }) => {
    const { partner } = route.params;

    const [ngrokUrl, setNgrokUrl] = useState(null);

    const [name, setName] = useState(partner.name);
    const [description, setDescription] = useState(partner.description);
    const [typeOfOrganization, setTypeOfOrganization] = useState(partner.type_of_organization);
    const [email, setEmail] = useState(partner.email);
    const [phone, setPhone] = useState(partner.phone);
    const [address, setAddress] = useState(partner.address);
    const [website, setWebsite] = useState(partner.website);
    const [resources, setResources] = useState(partner.resources_available);

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

    const handleUpdatePartner = async () => {
        if (!name || !description || !typeOfOrganization || !email || !phone || !address || !website || !resources) {
            Alert.alert('Error', 'Please fill in all the fields.');
            return;
        }

        if (!ngrokUrl) {
            Alert.alert('Error', 'Server configuration not loaded.');
            return;
        }

        try {
            const response = await axios.put(`${ngrokUrl}/partners/${partner._id}`, {
                name,
                description,
                type_of_organization: typeOfOrganization,
                email,
                phone,
                address,
                website,
                resources_available: resources
            });
            Alert.alert('Success', 'Partner updated successfully.');
            navigation.navigate("ViewPartners"); // Navigate back after successful update
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Type of Organization"
                value={typeOfOrganization}
                onChangeText={setTypeOfOrganization}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Website"
                value={website}
                onChangeText={setWebsite}
            />
            <TextInput
                style={styles.input}
                placeholder="Resources Available"
                value={resources}
                onChangeText={setResources}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleUpdatePartner}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: width * 0.075,
        fontWeight: 'bold',
        marginTop: height * 0.125,
        marginBottom: height * 0.02,
        textAlign: 'center',
        color: '#fff',
    },
    input: {
        height: 40,
        width: '100%',
        borderRadius: 5,
        marginBottom: height * 0.015,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3498db', // Match button color with Login screen
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Edit;
