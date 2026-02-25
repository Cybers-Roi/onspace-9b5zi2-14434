import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts, eventTypeConfig } from '../../constants/theme';
import { organizations, events } from '../../services/mockData';
import { HexAvatar } from '../../components/ui/HexAvatar';
import { useApp } from '../../contexts/AppContext';

const { width: SW } = Dimensions.get('window');
type OrgTab = 'events' | 'about' | 'reviews';

const reviews = [
  { id: '1', name: 'KARIM.B', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', text: '"The most active tech community in Algeria. Truly high level events."', time: '2D AGO', rating: 5 },
  { id: '2', name: 'SARAH_X', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', text: '"Incredible networking opportunities. High industrial standards. ◇"', time: '1W AGO', rating: 5 },
];

export default function OrgProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { followedOrgs, followOrg, unfollowOrg } = useApp();
  const [activeTab, setActiveTab] = useState<OrgTab>('events');

  const org = organizations.find(o => o.id === id) || organizations[0];
  const isFollowed = followedOrgs.includes(org.id);
  const orgEvents = events.slice(0, 4);
  
  // Mock admin check - in real app, check user permissions
  const isOrgAdmin = false; // Replace with actual permission check
  
  const handleFollow = () => {
    Haptics.selectionAsync();
    isFollowed ? unfollowOrg(org.id) : followOrg(org.id);
  };

  const tabs: { key: OrgTab; label: string }[] = [
    { key: 'events', label: 'EVENTS' },
    { key: 'about', label: 'ABOUT' },
    { key: 'reviews', label: 'REVIEWS' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Hero Cover - taller to match reference */}
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <Pressable style={[styles.backBtn, { top: insets.top + 8 }]} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </Pressable>
        </View>

        {/* Org Identity - matching reference layout */}
        <View style={styles.identitySection}>
          {/* Logo - square crop matching reference */}
          <View style={styles.logoWrap}>
            <View style={styles.logoBox}>
              <Image source={{ uri: org.logo }} style={styles.logoImg} contentFit="cover" />
            </View>
            {org.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>

          <Text style={styles.orgName}>{org.name.toUpperCase()}</Text>
          <Text style={styles.orgType}>
            <Text style={{ color: colors.teal }}>{org.type.toUpperCase()} △</Text>
            <Text style={{ color: colors.muted }}> · ALGIERS, ALGERIA</Text>
          </Text>

          {/* Action buttons - matching reference */}
          <View style={styles.actionRow}>
            <Pressable
              style={[styles.followBtn, isFollowed && styles.followedBtn]}
              onPress={handleFollow}
            >
              <Text style={[styles.followText, isFollowed && { color: colors.base }]}>
                {isFollowed ? 'FOLLOWING ✓' : 'FOLLOW +'}
              </Text>
            </Pressable>
            {isOrgAdmin ? (
              <Pressable 
                style={[styles.notifyBtn, { backgroundColor: colors.neonPink, borderColor: colors.neonPink }]}
                onPress={() => { Haptics.selectionAsync(); router.push('/command-center'); }}
              >
                <Text style={styles.notifyText}>COMMAND CENTER</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.notifyBtn}>
                <Text style={styles.notifyText}>NOTIFY ME □</Text>
              </Pressable>
            )}
          </View>

          {/* Stats - 3 bordered boxes matching reference */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{org.events}</Text>
                <Text style={styles.statLabel}>EVENTS ○</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>
                  {org.followers >= 1000 ? `${(org.followers / 1000).toFixed(1)}k` : org.followers}
                </Text>
                <Text style={styles.statLabel}>ATTENDEES △</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>85</Text>
                <Text style={styles.statLabel}>VOLUNTEE</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <Pressable
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'events' && (
            <View style={styles.eventsGrid}>
              {orgEvents.slice(0, 2).map(event => (
                <Pressable
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => router.push(`/event/${event.id}`)}
                >
                  <View style={styles.eventImageWrap}>
                    <Image source={{ uri: event.image }} style={styles.eventImg} contentFit="cover" />
                    <View style={styles.eventDateChip}>
                      <Text style={styles.eventDateText}>{event.date.split(',')[0]}</Text>
                    </View>
                  </View>
                  <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {activeTab === 'about' && (
            <View>
              <Text style={styles.aboutText}>
                A premier tech community based in Algiers, Algeria. Founded in 2019, we host cutting-edge events in cybersecurity, AI, and software development. Our mission is to empower the next generation of Algerian tech leaders.
              </Text>
              <View style={styles.verifyCard}>
                <Text style={styles.verifyTitle}>VERIFICATION STATUS □</Text>
                <Text style={[styles.verifyStatus, { color: org.verified ? colors.teal : colors.gold }]}>
                  {org.verified ? 'VERIFIED BY EVENTFY ✓' : 'PENDING VERIFICATION ◇'}
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View>
              <View style={styles.ratingSummary}>
                <Text style={styles.ratingNum}>4.8</Text>
                <View style={styles.ratingRight}>
                  <Text style={styles.ratingStars}>◇◇◇◇◇</Text>
                  <Pressable>
                    <Text style={styles.viewAll}>VIEW ALL REVIEWS</Text>
                  </Pressable>
                </View>
              </View>
              {reviews.map(review => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewRow}>
                    <HexAvatar uri={review.avatar} size={36} borderColor={colors.border} borderWidth={1} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.reviewName}>{review.name}</Text>
                      <Text style={styles.reviewText}>{review.text}</Text>
                    </View>
                    <Text style={styles.reviewTime}>{review.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  heroWrap: { height: 240, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  backBtn: {
    position: 'absolute', left: 16, width: 40, height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', zIndex: 10,
  },

  identitySection: { paddingHorizontal: 16, marginTop: -44 },
  logoWrap: { position: 'relative', marginBottom: 14 },
  logoBox: {
    width: 84, height: 84, borderWidth: 3, borderColor: colors.surface,
    overflow: 'hidden', backgroundColor: colors.surface2,
  },
  logoImg: { width: '100%', height: '100%' },
  verifiedBadge: {
    position: 'absolute', bottom: -4, right: -4,
    width: 22, height: 22, borderRadius: 11, backgroundColor: colors.teal,
    alignItems: 'center', justifyContent: 'center',
  },
  verifiedIcon: { fontSize: 12, color: colors.base, fontWeight: '700' },

  orgName: { fontFamily: fonts.body, fontSize: 28, fontWeight: '900', color: colors.white, letterSpacing: 1 },
  orgType: { fontFamily: fonts.mono, fontSize: 12, marginTop: 4, marginBottom: 18 },

  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  followBtn: { backgroundColor: colors.teal, paddingHorizontal: 28, paddingVertical: 13 },
  followedBtn: { backgroundColor: colors.teal },
  followText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.base, letterSpacing: 0.5 },
  notifyBtn: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 20, paddingVertical: 13 },
  notifyText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  statBox: { width: 110, borderWidth: 1, borderColor: colors.border, padding: 14 },
  statVal: { fontFamily: fonts.mono, fontSize: 22, fontWeight: '700', color: colors.white },
  statLabel: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, marginTop: 4, letterSpacing: 0.5 },

  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.white },
  tabText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '600', color: colors.muted, letterSpacing: 1 },
  tabTextActive: { color: colors.white },

  tabContent: { padding: 16 },

  eventsGrid: { flexDirection: 'row', gap: 12 },
  eventCard: { flex: 1, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  eventImageWrap: { position: 'relative' },
  eventImg: { width: '100%', height: 130 },
  eventDateChip: { position: 'absolute', bottom: 8, left: 8, backgroundColor: colors.coral, paddingHorizontal: 8, paddingVertical: 3 },
  eventDateText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.white },
  eventTitle: { fontFamily: fonts.body, fontSize: 12, fontWeight: '700', color: colors.white, padding: 10, lineHeight: 16 },

  aboutText: { fontFamily: fonts.body, fontSize: 14, color: colors.white, lineHeight: 22, opacity: 0.85, marginBottom: 20 },
  verifyCard: { backgroundColor: colors.surface2, padding: 14, borderLeftWidth: 3, borderLeftColor: colors.teal },
  verifyTitle: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white, marginBottom: 4 },
  verifyStatus: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700' },

  ratingSummary: { flexDirection: 'row', alignItems: 'flex-end', gap: 16, marginBottom: 20 },
  ratingNum: { fontFamily: fonts.mono, fontSize: 48, fontWeight: '700', color: colors.white },
  ratingRight: { gap: 6, paddingBottom: 8 },
  ratingStars: { fontSize: 16, color: colors.gold },
  viewAll: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, fontWeight: '700', textDecorationLine: 'underline' },

  reviewCard: { backgroundColor: colors.surface2, padding: 14, marginBottom: 10, borderLeftWidth: 2, borderLeftColor: colors.border },
  reviewRow: { flexDirection: 'row', alignItems: 'flex-start' },
  reviewName: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white, marginBottom: 4 },
  reviewText: { fontFamily: fonts.body, fontSize: 12, color: colors.muted, lineHeight: 17, fontStyle: 'italic' },
  reviewTime: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },
});
