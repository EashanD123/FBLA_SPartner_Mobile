import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';

export const ContactUs = () => {
  const [email, setEmail] = useState < string > ();
  const [name, setName] = useState < string > ();

  const onSubmit = async () => {
    try {
      await send(
        'service_ybwp7qs',
        'template_x6t2sar',
        {
          name,
          email,
          message: 'This is a static message',
        },
        {
          publicKey: 'bCkx89bOJ1T_8ZuOI',
        },
      );

      console.log('SUCCESS!');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EmailJS Request Failed...', err);
      }

      console.log('ERROR', err);
    }
  };

  return (
    <View>
      <TextInput
        inputMode="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        inputMode="text"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};
