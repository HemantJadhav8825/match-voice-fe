import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';

const { height: height100vh, width: windowWidth } = Dimensions.get('window');

const avatars = [
  { id: '1', name: 'jyoti', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'voice' },
  { id: '2', name: 'Nisha', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'voice', special: 'star' },
  { id: '3', name: 'Ditya', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'video', special: 'super' },
  { id: '4', name: 'Ankita', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'video', special: 'super' },
  { id: '5', name: 'Sweta', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'video', special: 'super' },
  { id: '6', name: 'Kajal', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'video', special: 'super' },
  { id: '7', name: 'Puja', img: require('../assets/bg.png'), status: 'online', language: 'हिन्दी', callType: 'video', special: 'super' },
  // Add more avatars...
];

const roomTypes = [
  { id: '1', title: 'English Speaking', subtitle: 'by Loveskool', badge: 'New', img: require('../assets/bg.png') },
  { id: '2', title: 'Private Training Rooms', img: require('../assets/bg.png') },
  { id: '3', title: 'FRND Making Rooms', img: require('../assets/bg.png') },
  // Add more rooms...
];

const HomeScreen = () => {
  const renderAvatar = ({ item }) => (
    <View style={styles.avatarCard}>
      <View style={styles.avatarImageWrapper}>
        <Image source={item.img} style={styles.avatarImage} />
        {item.status === 'online' && <View style={styles.onlineDot} />}
        {item.special === 'star' && (
          <View style={styles.starBadge}>
            <Text style={styles.badgeText}>⭐</Text>
          </View>
        )}
        {item.special === 'super' && (
          <View style={styles.superBadge}>
            <Text style={styles.badgeText}>Super</Text>
          </View>
        )}
      </View>
      <Text style={styles.avatarName}>{item.name}</Text>
      <View style={styles.languageBadge}>
        <Text style={styles.languageText}>{item.language}</Text>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>
          {item.callType === 'video' ? '📹 Join' : '📞 Join'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderRoom = ({ item }) => (
    <TouchableOpacity style={[styles.roomCard, { backgroundColor: '#f0f0f0' }]}>
      {item.badge && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>{item.badge}</Text>
        </View>
      )}
      <Image source={item.img} style={styles.roomImage} resizeMode="contain" />
      <Text style={styles.roomTitle}>{item.title}</Text>
      {item.subtitle && <Text style={styles.roomSubtitle}>{item.subtitle}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top avatars horizontal scroll */}
      <Text style={styles.sectionTitle}>Private Training</Text>
      <FlatList
        data={avatars}
        renderItem={renderAvatar}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{ marginBottom: 25 }}
      />
      {/* Room Types */}
      <Text style={styles.sectionTitle}>All Room Types</Text>
      <FlatList
        data={roomTypes}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
      {/* Room Types */}
      <Text style={styles.sectionTitle}>Other Room Types</Text>
      <FlatList
        data={roomTypes}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

export default HomeScreen;

const avatarSize = height100vh * 0.1; // 10% of screen height
const avatarCardWidth = avatarSize + 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 15,
    marginBottom: 15,
    color: '#222',
  },
  avatarCard: {
    width: avatarCardWidth, // Dynamically set the card width based on avatar size
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2, // Makes the avatar circular
  },
  avatarImageWrapper: {
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4ade80', // green
    borderWidth: 2,
    borderColor: '#fff',
  },
  starBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#facc15', // yellow
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  superBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444', // red
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatarName: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  languageBadge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
  },
  languageText: {
    fontSize: 10,
    color: '#4338ca',
  },
  joinButton: {
    marginTop: 8,
    backgroundColor: '#14b8a6',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  roomCard: {
    width: windowWidth * 0.4,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  newBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  roomImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  roomTitle: {
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  roomSubtitle: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
});
