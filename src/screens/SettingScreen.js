import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const onLogout = () => {
        // clear token, navigate to login
        console.log('User logged out');
        AsyncStorage.clear()
            .then(() => {
                console.log("AsyncStorage has been cleared");
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error("Error clearing AsyncStorage", error);
            });
    }

    const onChangeTheme = (isDark) => {
        console.log('Theme changed:', isDark ? 'Dark' : 'Light');
    }

    const onViewPrivacy = () => {
        // navigate to privacy policy screen or open URL
        console.log('Privacy Policy tapped');
    }

    const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        onChangeTheme && onChangeTheme(newTheme);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.settingRow}>
                <Text style={styles.label}>Enable Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                    thumbColor={notificationsEnabled ? '#4a00e0' : '#ccc'}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Dark Theme</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                    thumbColor={isDarkTheme ? '#4a00e0' : '#ccc'}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Account Info', 'Feature coming soon!')}>
                <Text style={styles.buttonText}>Account Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onViewPrivacy}>
                <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
                <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 30,
        color: '#222',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        color: '#444',
    },
    button: {
        backgroundColor: '#4a00e0',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
    },
    logoutButtonText: {
        fontWeight: '700',
    },
});
