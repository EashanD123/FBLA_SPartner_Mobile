// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

// import GoogleSignInButton from '../components/GoogleSignInButton';
// import AppleSignInButton from '../components/AppleSignInButton';

// const { width, height } = Dimensions.get('window');

// const OrSeparator = () => (
//   <View style={styles.orSeparatorContainer}>
//     <View style={styles.line} />
//     <Text style={styles.orText}>or</Text>
//     <View style={styles.line} />
//   </View>
// );

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Handle login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//     // For demonstration, just navigate to a dummy Home screen
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/spartner_logo.png')} style={styles.logo} />
//       <Text style={styles.title}>Welcome to SPartner</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <OrSeparator />
//       <View style={styles.authenticationCont}>
//         <GoogleSignInButton/>
//         <AppleSignInButton/>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#2c3e50',
//     paddingHorizontal: '5%',
//   },
//   logo: {
//     width: width * 0.6, // 55% of screen width
//     height: width * 0.6, // 55% of screen width
//     borderRadius: (width * 0.6) / 2, // Half of the width and height to make it circular
//     borderWidth: 3,
//     borderColor: '#fff',
//     marginTop: height * 0.11, // 10% of screen height
//     marginBottom: height * 0.06, // 2% of screen height
//   },
//   title: {
//     fontSize: width * 0.075, // 6% of screen width
//     fontWeight: 'bold',
//     marginBottom: height * 0.015, // 5% of screen height
//     textAlign: 'center',
//     color: '#fff',
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderRadius: 5,
//     marginBottom: 12,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   loginButton: {
//     width: '100%',
//     height: 40,
//     backgroundColor: '#3498db',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   orSeparatorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   orText: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: '#ccc',
//   },
//   authenticationCont: {
//     width: '100%',
//     alignItems: 'center',
//     marginTop: -10
//   },
// });

// export default Login;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';

import GoogleSignInButton from '../components/GoogleSignInButton';
import AppleSignInButton from '../components/AppleSignInButton';

const { width, height } = Dimensions.get('window');
const ngrokUrl = 'https://8823-2603-9009-705-d5cd-b53d-34d5-88ea-1252.ngrok-free.app';

const OrSeparator = () => (
  <View style={styles.orSeparatorContainer}>
    <View style={styles.line} />
    <Text style={styles.orText}>or</Text>
    <View style={styles.line} />
  </View>
);

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${ngrokUrl}/login`, { email, password });
      const { token } = response.data;
      console.log('Login successful, token:', token);
      // Save the token in your app's state or storage for later use
      // Alert.alert('Logged In');
      navigation.navigate('Home')
    } catch (error) {
      if (error.response) {
        Alert.alert('Login Error', error.response.data.message);
      } else {
        Alert.alert('Login Error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/spartner_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to SPartner</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.linkView}>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>Don't have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>Forgot Password? </Text>
        </TouchableOpacity>
      </View>
      <OrSeparator />
      <View style={styles.authenticationCont}>
        <GoogleSignInButton />
        <AppleSignInButton />
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
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: height * 0.09,
    marginBottom: height * 0.06,
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#ccc',
  },
  authenticationCont: {
    width: '100%',
    alignItems: 'center',
    marginTop: -10,
  },
  linkView: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-between'
  }, 
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default Login;
