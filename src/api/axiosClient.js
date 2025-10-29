import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://10.0.2.2:9000/api';
// const baseURL = 'https://match-voice-be.vercel.app/api';

const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add async interceptor to inject token from AsyncStorage
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Request:', config.method.toUpperCase(), config.url, config.data || config.params);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;
