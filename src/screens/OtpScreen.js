import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axiosClient from '../api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = ({ navigation, route }) => {
  const { phone } = route.params;
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (text, index) => {
    if (loading) return; // prevent input while loading

    let newOtp = [...otp];

    if (text === '' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
      return;
    }

    if (text.length > 1) {
      newOtp = text.split('').slice(0, 4);
      setOtp(newOtp);
      if (newOtp.join('').length === 4) handleSubmit(newOtp.join(''));
      return;
    }

    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.join('').length === 4) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (loading) return; // prevent input while loading

    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (code = otp.join('')) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosClient.post('/otp/verify', { phone, otp: code });
      const data = res?.data;

      if (data?.success && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid OTP', 'OTP verification failed');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Invalid OTP', 'Please check and try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#8e2de2', '#4a00e0']} style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.otpInput, loading && styles.inputDisabled]}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={digit}
            textAlign="center"
            editable={!loading}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.buttonDisabled]}
        onPress={() => handleSubmit()}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#4a00e0" />
        ) : (
          <Text style={styles.submitText}>Verify</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 20,
    color: '#000',
    elevation: 3,
  },
  inputDisabled: {
    backgroundColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  submitText: {
    color: '#4a00e0',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
