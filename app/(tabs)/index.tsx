import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../../constants/theme';
import { HexAvatar } from '../../components/ui/HexAvatar';
import { PLAYER_NUMBER } from '../../constants/config';

const { width: SW } = Dimensions.get('window');

const stories = [
  { id: 'add', username: 'ADD STORY', isAdd: true },
  { id: '1', username: 'LIVE_PKR2', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', borderColor: colors.coral, isLive: true },
  { id: '2', username: 'ELITE_01', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', borderColor: colors.teal },
  { id: '3', username: 'SUPREME_X', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', borderColor: colors.gold },
  { id: '4', username: 'PUNISHER', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face', borderColor: colors.muted },
];

const events = [
  {
    id: '1',
    type: 'sport',
    typeLabel: '○ SPORT',
    countdown: '2D 14H',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
    title: 'NEON CIRCUIT: THE FINAL ELIMINATION',
    org: 'ORG_PRIME',
    verified: true,
    tags: ['ALGORITHM: HIGH INTENSITY', 'VERIFIED ENTRY', 'SPONSOR PRIORITY'],
    capacity: { current: 294, max: 500 },
    borderColor: colors.coral,
  },
  {
    id: '2',
    type: 'music',
    typeLabel: '□ MUSIC',
    countdown: '4D 02H',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop',
    title: 'SYNTHWAVE REBELS LIVE',
    org: 'VOX_NETWORKS',
    verified: false,
    tags: ['VOCAL BOOST', 'STANDARD ACCESS'],
    capacity: { current: 1200, max: 2000 },
    borderColor: colors.coral,
  },
];

type TabType = 'local' | 'national' | 'international';

export default function FeedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('local');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStoryPress = (storyId: string) => {
    Haptics.selectionAsync();
    if (storyId === 'add') {
      router.push('/create-post');
    } else {
      router.push('/story-viewer');
    }
  };

  const handleEventPress = (eventId: string) => {
    Haptics.selectionAsync();
    router.push(`/event/${eventId}`);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoShapes}>○△□</Text>
          <Text style={styles.logoText}>EVENTFY</Text>
        </View>
        
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Pressable style={styles.notificationBtn} onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications" size={20} color={colors.white} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => router.push('/profile')}>
          <View style={styles.headerAvatar}>
            <HexAvatar 
              uri="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
              size={40} 
              borderColor={colors.coral} 
              borderWidth={2} 
            />
            <Text style={styles.headerPlayerNum}>{PLAYER_NUMBER}</Text>
          </View>
        </Pressable>
      </View>

      {/* Stories Row */}
      <View style={styles.storiesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesScroll}
        >
          {stories.map((story) => (
            <Pressable 
              key={story.id} 
              style={styles.storyItem}
              onPress={() => handleStoryPress(story.id)}
            >
              {story.isAdd ? (
                <View style={styles.addStoryCircle}>
                  <Text style={styles.addStoryIcon}>+</Text>
                </View>
              ) : (
                <View style={[styles.storyRing, { borderColor: story.borderColor }]}>
                  <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                  {story.isLive && (
                    <View style={styles.liveBadge}>
                      <Text style={styles.liveBadgeText}>LIVE</Text>
                    </View>
                  )}
                </View>
              )}
              <Text style={styles.storyUsername}>{story.username}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable 
          style={[styles.tab, activeTab === 'local' && styles.tabActive]}
          onPress={() => { setActiveTab('local'); Haptics.selectionAsync(); }}
        >
          <Text style={[styles.tabText, activeTab === 'local' && styles.tabTextActive]}>LOCAL ○</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'national' && styles.tabActive]}
          onPress={() => { setActiveTab('national'); Haptics.selectionAsync(); }}
        >
          <Text style={[styles.tabText, activeTab === 'national' && styles.tabTextActive]}>NATIONAL △</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'international' && styles.tabActive]}
          onPress={() => { setActiveTab('international'); Haptics.selectionAsync(); }}
        >
          <Text style={[styles.tabText, activeTab === 'international' && styles.tabTextActive]}>INTERNATIONAL □</Text>
        </Pressable>
      </View>

      {/* Events Feed */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.feedScroll, { paddingBottom: insets.bottom + 100 }]}
      >
        {events.map((event) => (
          <Pressable 
            key={event.id} 
            style={[styles.eventCard, { borderLeftColor: event.borderColor }]}
            onPress={() => handleEventPress(event.id)}
          >
            {/* Event Header */}
            <View style={styles.eventHeader}>
              <View style={styles.eventTypeBadge}>
                <Text style={styles.eventTypeBadgeText}>{event.typeLabel}</Text>
              </View>
              <View style={styles.eventCountdown}>
                <Text style={styles.eventCountdownText}>{event.countdown}</Text>
              </View>
            </View>

            {/* Event Image */}
            <View style={styles.eventImageContainer}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
            </View>

            {/* Event Body */}
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              
              {/* Organizer */}
              <View style={styles.eventOrg}>
                <View style={styles.eventOrgAvatar}>
                  <Ionicons name="business" size={14} color={colors.muted} />
                </View>
                <Text style={styles.eventOrgName}>{event.org}</Text>
                {event.verified && (
                  <Ionicons name="checkmark-circle" size={14} color={colors.teal} />
                )}
              </View>

              {/* Tags */}
              <View style={styles.eventTags}>
                {event.tags.map((tag, idx) => (
                  <View 
                    key={idx} 
                    style={[
                      styles.eventTag,
                      tag.includes('ALGORITHM') && { backgroundColor: colors.neonPink + '20', borderColor: colors.neonPink },
                      tag.includes('VERIFIED') && { backgroundColor: colors.teal + '20', borderColor: colors.teal },
                      tag.includes('SPONSOR') && { backgroundColor: colors.gold + '20', borderColor: colors.gold },
                      tag.includes('VOCAL') && { backgroundColor: colors.teal + '20', borderColor: colors.teal },
                      tag.includes('STANDARD') && { backgroundColor: colors.muted + '20', borderColor: colors.muted },
                    ]}
                  >
                    <Text 
                      style={[
                        styles.eventTagText,
                        tag.includes('ALGORITHM') && { color: colors.neonPink },
                        tag.includes('VERIFIED') && { color: colors.teal },
                        tag.includes('SPONSOR') && { color: colors.gold },
                        tag.includes('VOCAL') && { color: colors.teal },
                        tag.includes('STANDARD') && { color: colors.muted },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Capacity Status */}
              <View style={styles.capacitySection}>
                <Text style={styles.capacityLabel}>CAPACITY STATUS</Text>
                <Text style={styles.capacityCount}>{event.capacity.current} / {event.capacity.max} SPOTS</Text>
              </View>
              <View style={styles.capacityBarBg}>
                <View 
                  style={[
                    styles.capacityBarFill, 
                    { width: `${(event.capacity.current / event.capacity.max) * 100}%` }
                  ]} 
                />
              </View>

              {/* Actions */}
              <View style={styles.eventActions}>
                <Pressable style={styles.registerBtn}>
                  <Text style={styles.registerBtnText}>REGISTER {event.type === 'sport' ? '○' : '□'}</Text>
                </Pressable>
                <Pressable style={styles.bookmarkBtn}>
                  <Ionicons name="bookmark-outline" size={20} color={colors.white} />
                </Pressable>
                <Pressable style={styles.shareBtn}>
                  <Ionicons name="share-social-outline" size={20} color={colors.white} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <Pressable 
        style={[styles.floatingBtn, { bottom: insets.bottom + 80 }]}
        onPress={() => { Haptics.selectionAsync(); router.push('/create-post'); }}
      >
        <Text style={styles.floatingBtnIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoShapes: { fontFamily: fonts.mono, fontSize: 14, color: colors.coral, fontWeight: '700' },
  logoText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '900', color: colors.white, letterSpacing: 1 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface2, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  searchInput: {
    flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.white, padding: 0,
  },
  notificationBtn: { position: 'relative' },
  notificationBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: colors.coral, borderRadius: 8,
    width: 16, height: 16, alignItems: 'center', justifyContent: 'center',
  },
  notificationBadgeText: { fontFamily: fonts.mono, fontSize: 9, color: colors.white, fontWeight: '700' },
  headerAvatar: { position: 'relative' },
  headerPlayerNum: {
    position: 'absolute', bottom: -8, right: -8,
    fontFamily: fonts.mono, fontSize: 8, color: colors.coral, fontWeight: '700',
    backgroundColor: colors.base, paddingHorizontal: 4, paddingVertical: 1,
  },

  // Stories
  storiesContainer: { borderBottomWidth: 1, borderBottomColor: colors.border },
  storiesScroll: { paddingHorizontal: 16, paddingVertical: 16, gap: 14 },
  storyItem: { alignItems: 'center' },
  addStoryCircle: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 2, borderColor: colors.coral, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  addStoryIcon: { fontSize: 28, color: colors.coral, fontWeight: '300' },
  storyRing: {
    width: 64, height: 64, borderRadius: 32, borderWidth: 3,
    padding: 2, marginBottom: 6, position: 'relative',
  },
  storyAvatar: { width: 56, height: 56, borderRadius: 28 },
  liveBadge: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.coral, paddingVertical: 2, alignItems: 'center',
  },
  liveBadgeText: { fontFamily: fonts.mono, fontSize: 7, color: colors.white, fontWeight: '700' },
  storyUsername: { fontFamily: fonts.mono, fontSize: 9, color: colors.white, fontWeight: '600', letterSpacing: 0.3 },

  // Tabs
  tabsContainer: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  tab: {
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 20, backgroundColor: colors.surface2,
  },
  tabActive: { backgroundColor: colors.coral },
  tabText: { fontFamily: fonts.body, fontSize: 12, fontWeight: '800', color: colors.muted, letterSpacing: 0.5 },
  tabTextActive: { color: colors.white },

  // Feed
  feedScroll: { paddingTop: 16 },
  eventCard: {
    marginHorizontal: 16, marginBottom: 20,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 4, overflow: 'hidden',
  },
  eventHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingTop: 12, paddingBottom: 10,
  },
  eventTypeBadge: {
    backgroundColor: colors.base, borderWidth: 1, borderColor: colors.white,
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5,
  },
  eventTypeBadgeText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white },
  eventCountdown: {
    backgroundColor: colors.coral, borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  eventCountdownText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.white },

  eventImageContainer: { height: 280, backgroundColor: colors.surface3 },
  eventImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  eventBody: { padding: 14 },
  eventTitle: {
    fontFamily: fonts.body, fontSize: 26, fontWeight: '900', color: colors.white,
    letterSpacing: 0.5, marginBottom: 12, lineHeight: 30,
  },

  eventOrg: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  eventOrgAvatar: {
    width: 20, height: 20, borderRadius: 10, backgroundColor: colors.surface3,
    alignItems: 'center', justifyContent: 'center',
  },
  eventOrgName: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.white },

  eventTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  eventTag: {
    borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5,
  },
  eventTagText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700' },

  capacitySection: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 8,
  },
  capacityLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5 },
  capacityCount: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.coral },
  capacityBarBg: { height: 4, backgroundColor: colors.border, marginBottom: 16, overflow: 'hidden' },
  capacityBarFill: { height: 4, backgroundColor: colors.coral },

  eventActions: { flexDirection: 'row', gap: 10 },
  registerBtn: { flex: 1, backgroundColor: colors.coral, paddingVertical: 14, alignItems: 'center' },
  registerBtnText: {
    fontFamily: fonts.body, fontSize: 16, fontWeight: '900', color: colors.white, letterSpacing: 0.5,
  },
  bookmarkBtn: {
    width: 48, backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  shareBtn: {
    width: 48, backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },

  // Floating Button
  floatingBtn: {
    position: 'absolute', right: 20,
    width: 56, height: 56, backgroundColor: colors.coral,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.coral, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
  },
  floatingBtnIcon: { fontSize: 32, color: colors.white, fontWeight: '300', marginTop: -2 },
});
