import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const user = {
  name: 'Hemant Sharma',
  phone: '+919503760623',
  email: 'hemant@example.com',
  bio: 'Love to meet new people and chat!',
  photoUrl: 'https://cdn.pixabay.com/photo/2021/04/01/21/25/alone-boy-6143295_1280.jpg',
};

const onEditProfile = (field) => {
  console.log('Edit', field);
  // Navigate to edit screen or show modal for editing that field
};

const onLogout = () => {
  console.log('Logout');
  // Clear AsyncStorage token, navigate to login screen, etc.
};

const ProfileScreen = () => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            user.photoUrl
              ? { uri: user.photoUrl }
              : require('../assets/bg.png') // fallback avatar
          }
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editAvatarBtn} onPress={() => onEditProfile('photo')}>
          <Text style={styles.editAvatarText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.row}>
          <Text style={styles.infoText}>{user.name || 'Not set'}</Text>
          <TouchableOpacity onPress={() => onEditProfile('name')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.infoText}>{user.phone || 'Not set'}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.row}>
          <Text style={styles.infoText}>{user.email || 'Not set'}</Text>
          <TouchableOpacity onPress={() => onEditProfile('email')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Bio</Text>
        <Text style={[styles.infoText, styles.bioText]}>{user.bio || 'No bio added'}</Text>
        <TouchableOpacity onPress={() => onEditProfile('bio')}>
          <Text style={styles.editText}>Edit Bio</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 120 / 2 - 30,
    backgroundColor: '#4a00e0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  editAvatarText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '700',
    color: '#444',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editText: {
    color: '#4a00e0',
    fontWeight: '600',
  },
  bioText: {
    marginBottom: 8,
    fontStyle: 'italic',
  },
  logoutBtn: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
