import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { parse } from 'json2csv';
import { getDatabaseData } from './database'; // Assume you have a function to get data from MongoDB

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch data from MongoDB and set it to state
    const fetchData = async () => {
      try {
        const data = await getDatabaseData(); // Replace with your actual data fetching logic
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Needed',
            message: 'This app needs the storage permission to download files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const downloadCsv = async () => {
    if (!jsonData) {
      Alert.alert('Error', 'No data available to download.');
      return;
    }

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to download the file.');
      return;
    }

    try {
      const csvData = parse(jsonData);
      const fileName = 'data.csv';
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      await RNFS.writeFile(filePath, csvData, 'utf8');
      Alert.alert('Success', `CSV file has been saved to: ${filePath}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while converting or saving the file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Download Data as CSV</Text>
      <Button title="Download CSV" onPress={downloadCsv} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;
