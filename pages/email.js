import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import emailjs from 'emailjs-com';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    const templateParams = {
      user_name: name,
      user_email: email,
      subject: subject,
      message: message,
    };

    emailjs.send('contact_service', 'contact_form', templateParams, 'service_ybwp7qs')
      .then(response => {
        Alert.alert('SUCCESS!', 'Your email has been sent.');
      })
      .catch(error => {
        Alert.alert('FAILED...', 'There was an error sending your email.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Send" onPress={sendEmail} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
    color: '#4A90E2',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
});
