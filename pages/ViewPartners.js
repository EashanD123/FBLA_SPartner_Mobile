import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, FlatList, Alert, Modal } from 'react-native';
import axios from 'axios';
import NavigationMenu3 from '../components/NavigationMenu3';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ViewPartners = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [partners, setPartners] = useState([]);
    const [ngrokUrl, setNgrokUrl] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

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
                <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
                    <Image source={require('../assets/settings-sliders.png')} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.scrollView}>
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
            </View>
            <Modal
                visible={showFilter}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setShowFilter(false)}
            >
            <View style={styles.filterModal}>
                <Text style={styles.filterHeaderText}>Filter Options</Text>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => {/* Handle checkbox state for Option 1 */}}>
                        {/* Add your checkbox UI for Option 1 here */}
                        <Text style={styles.checkboxText}>Sole Proprietership</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => {/* Handle checkbox state for Option 2 */}}>
                        {/* Add your checkbox UI for Option 2 here */}
                        <Text style={styles.checkboxText}>Partnership</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => {/* Handle checkbox state for Option 3 */}}>
                        {/* Add your checkbox UI for Option 3 here */}
                        <Text style={styles.checkboxText}>Corporation</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => {/* Handle checkbox state for Option 4 */}}>
                        {/* Add your checkbox UI for Option 4 here */}
                        <Text style={styles.checkboxText}>Non-Profit Corporations</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => {/* Handle checkbox state for Option 5 */}}>
                        {/* Add your checkbox UI for Option 5 here */}
                        <Text style={styles.checkboxText}>LLC</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.filterCloseButton} onPress={() => setShowFilter(false)}>
                    <Text style={styles.filterCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            </Modal>
            {/* <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, { marginRight: 5 }]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddPartners')} style={[styles.button, { marginLeft: 5 }]}>
                    <Text style={styles.buttonText}>Add Partners</Text>
                </TouchableOpacity>
            </View> */}
            <NavigationMenu3 navigation={navigation}/>
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
        height: height * 0.11,
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
    scrollView: {
        marginTop: height * 0.02,
        width: width, 
        height: height * 0.725
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: '5%',
        width: '100%',
    },
    filterModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    filterCloseButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    filterCloseButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ViewPartners;
