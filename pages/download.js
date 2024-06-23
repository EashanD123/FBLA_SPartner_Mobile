import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { jsonToCSV } from 'react-native-csv';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Download = () => {
  const makeCSV = async () => {
    const jsonData = `[
      {
          "Column 1": "Name",
          "Column 2": "Surname",
          "Column 3": "Email",
          "Column 4": "Info"
      }
    ]`;

    const CSV = jsonToCSV(jsonData);

    // Name the file
    const directoryUri = FileSystem.documentDirectory;
    const fileUri = directoryUri + 'formData.csv';

    // Write the file to the file system
    await FileSystem.writeAsStringAsync(fileUri, CSV);

    try {
      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        // Share the file using the Sharing API
        await Sharing.shareAsync(fileUri);
        Alert.alert('Download Successful', 'CSV file has been saved and can be found in the Files app.');
      } else {
        Alert.alert('Sharing Not Available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Download Failed', 'There was an error saving the CSV file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Download Data as CSV</Text>
      <Button title="Download CSV" onPress={makeCSV} />
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

export default Download;
