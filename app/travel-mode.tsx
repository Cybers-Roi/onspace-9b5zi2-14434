import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { HexAvatar } from '../components/ui/HexAvatar';

const { width: SW } = Dimensions.get('window');

const upcomingEvents = [
  {
    id: '1',
    title: 'GLOBAL HACKATHON TUNISIA 2026',
    location: 'Tunis, Tunisia',
    distance: '892km',
    date: 'Mar 15-17',
    visa: 'FREE',
    attendees: 4,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'MEDITERRANEAN AI SUMMIT',
    location: 'Barcelona, Spain',
    distance: '1,240km',
    date: 'Apr 22-24',
    visa: 'REQUIRED',
    attendees: 2,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
  },
];

const travelBuddies = [
  { id: '1', name: 'K_REINA', university: 'USTHB', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { id: '2', name: 'L_AMIRA', university: 'USTHB', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
];

const checklist = [
  { id: '1', text: 'Register for event', done: true },
  { id: '2', text: 'Visa letter generated', done: true },
  { id: '3', text: 'Join travel group chat', done: false },
  { id: '4', text: 'Accommodation confirmed', done: false },
  { id: '5', text: 'Travel insurance noted', done: false },
];

export default function TravelModeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [origin, setOrigin] = useState('Bejaia, Algeria');
  const [destination, setDestination] = useState('ANY DESTINATION');

  const completedTasks = checklist.filter(t => t.done).length;
  const totalTasks = checklist.length;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>TRAVEL MODE □</Text>
          <Text style={styles.headerSub}>International Discovery</Text>
        </View>
        <View style={styles.modeChip}>
          <Text style={styles.modeChipText}>ACTIVE ○</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Origin & Destination */}
        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color={colors.teal} />
            <Text style={styles.locationLabel}>EXPLORING FROM:</Text>
            <Text style={styles.locationValue}>{origin} ○</Text>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="airplane" size={18} color={colors.coral} />
            <Text style={styles.locationLabel}>DESTINATION:</Text>
            <Pressable>
              <Text style={[styles.locationValue, { color: colors.coral }]}>{destination} □</Text>
            </Pressable>
          </View>
        </View>

        {/* Upcoming International Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INTERNATIONAL EVENTS △</Text>
          {upcomingEvents.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventImagePlaceholder}>
                <Ionicons name="globe-outline" size={32} color={colors.muted} />
              </View>
              <View style={styles.eventBody}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventInfo}>
                  <View style={styles.eventInfoRow}>
                    <Ionicons name="location-outline" size={14} color={colors.teal} />
                    <Text style={styles.eventInfoText}>{event.location} — {event.distance}</Text>
                  </View>
                  <View style={styles.eventInfoRow}>
                    <Ionicons name="calendar-outline" size={14} color={colors.muted} />
                    <Text style={styles.eventInfoText}>{event.date}</Text>
                  </View>
                </View>
                <View style={styles.eventChipsRow}>
                  <View style={[styles.visaChip, event.visa === 'FREE' ? { borderColor: colors.teal } : { borderColor: colors.coral }]}>
                    <Text style={[styles.visaChipText, event.visa === 'FREE' ? { color: colors.teal } : { color: colors.coral }]}>
                      🛂 VISA {event.visa}
                    </Text>
                  </View>
                  <View style={styles.attendeesChip}>
                    <Ionicons name="people" size={12} color={colors.teal} />
                    <Text style={styles.attendeesChipText}>{event.attendees} FROM YOUR UNI</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Travel Buddies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRAVEL BUDDIES ○</Text>
          <View style={styles.buddiesCard}>
            <Text style={styles.buddiesCardText}>{travelBuddies.length} STUDENTS FROM YOUR UNIVERSITY ARE GOING ○</Text>
            <View style={styles.buddiesRow}>
              {travelBuddies.map(buddy => (
                <View key={buddy.id} style={styles.buddyItem}>
                  <HexAvatar uri={buddy.avatar} size={48} borderColor={colors.teal} borderWidth={2} />
                  <Text style={styles.buddyName}>{buddy.name}</Text>
                  <Text style={styles.buddyUni}>{buddy.university}</Text>
                </View>
              ))}
            </View>
            <Pressable style={styles.joinGroupBtn}>
              <Text style={styles.joinGroupBtnText}>JOIN TRAVEL GROUP △</Text>
            </Pressable>
          </View>
        </View>

        {/* Visa Support Letter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VISA SUPPORT LETTER ○</Text>
          <View style={styles.visaCard}>
            <View style={styles.visaCardHeader}>
              <Ionicons name="document-text-outline" size={24} color={colors.teal} />
              <View style={{ flex: 1 }}>
                <Text style={styles.visaCardTitle}>OFFICIAL PARTICIPATION LETTER</Text>
                <Text style={styles.visaCardSub}>Auto-generated for visa applications</Text>
              </View>
            </View>
            <Pressable style={styles.generateBtn}>
              <Text style={styles.generateBtnText}>GENERATE VISA SUPPORT LETTER ○</Text>
            </Pressable>
          </View>
        </View>

        {/* Travel Checklist */}
        <View style={styles.section}>
          <View style={styles.checklistHeader}>
            <Text style={styles.sectionTitle}>TRAVEL CHECKLIST □</Text>
            <Text style={styles.checklistProgress}>{completedTasks}/{totalTasks} COMPLETE</Text>
          </View>
          <View style={styles.checklistProgressBar}>
            <View style={[styles.checklistProgressFill, { width: `${(completedTasks / totalTasks) * 100}%` }]} />
          </View>
          {checklist.map(item => (
            <View key={item.id} style={styles.checklistItem}>
              <View style={[styles.checklistCheck, item.done && styles.checklistCheckDone]}>
                {item.done && <Text style={{ color: colors.teal, fontSize: 12 }}>✓</Text>}
              </View>
              <Text style={[styles.checklistText, item.done && styles.checklistTextDone]}>{item.text}</Text>
            </View>
          ))}
          {completedTasks === totalTasks && (
            <View style={styles.readyBanner}>
              <Text style={styles.readyBannerText}>TRAVEL READY ✓</Text>
            </View>
          )}
        </View>

        {/* Accommodation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOMMODATION △</Text>
          <View style={styles.accommTabs}>
            <Pressable style={[styles.accommTab, styles.accommTabActive]}>
              <Text style={[styles.accommTabText, styles.accommTabTextActive]}>GROUP ○</Text>
            </Pressable>
            <Pressable style={styles.accommTab}>
              <Text style={styles.accommTabText}>HOSTELS △</Text>
            </Pressable>
            <Pressable style={styles.accommTab}>
              <Text style={styles.accommTabText}>HOTELS □</Text>
            </Pressable>
          </View>
          <View style={styles.hostCard}>
            <View style={styles.hostCardHeader}>
              <HexAvatar uri="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" size={48} borderColor={colors.teal} borderWidth={2} />
              <View style={{ flex: 1 }}>
                <Text style={styles.hostName}>PLAYER #3421</Text>
                <Text style={styles.hostInfo}>2 SPOTS • District 2 • ⭐ 4.8</Text>
              </View>
            </View>
            <Pressable style={styles.requestBtn}>
              <Text style={styles.requestBtnText}>REQUEST TO STAY □</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: fonts.body, fontSize: 20, fontWeight: '900', color: colors.white, letterSpacing: 0.5 },
  headerSub: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 2 },
  modeChip: { backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 10, paddingVertical: 5 },
  modeChipText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal },

  locationCard: {
    marginHorizontal: 16, marginTop: 16, marginBottom: 20,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 16,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  locationLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5 },
  locationValue: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.teal, flex: 1 },

  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 0.5, marginBottom: 14 },

  eventCard: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden', marginBottom: 12,
  },
  eventImagePlaceholder: {
    height: 120, backgroundColor: colors.surface3,
    alignItems: 'center', justifyContent: 'center',
  },
  eventBody: { padding: 14 },
  eventTitle: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, marginBottom: 10 },
  eventInfo: { gap: 6, marginBottom: 10 },
  eventInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventInfoText: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },
  eventChipsRow: { flexDirection: 'row', gap: 8 },
  visaChip: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 },
  visaChipText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700' },
  attendeesChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 10, paddingVertical: 5,
  },
  attendeesChipText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal },

  buddiesCard: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 3, borderLeftColor: colors.teal, padding: 16,
  },
  buddiesCardText: { fontFamily: fonts.mono, fontSize: 12, color: colors.teal, marginBottom: 14, letterSpacing: 0.5 },
  buddiesRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  buddyItem: { alignItems: 'center' },
  buddyName: { fontFamily: fonts.body, fontSize: 11, fontWeight: '700', color: colors.white, marginTop: 8 },
  buddyUni: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, marginTop: 2 },
  joinGroupBtn: { backgroundColor: colors.teal, paddingVertical: 12, alignItems: 'center' },
  joinGroupBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.base, letterSpacing: 0.5 },

  visaCard: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 16,
  },
  visaCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  visaCardTitle: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white },
  visaCardSub: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, marginTop: 3 },
  generateBtn: { backgroundColor: colors.teal, paddingVertical: 14, alignItems: 'center' },
  generateBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.base, letterSpacing: 0.5 },

  checklistHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  checklistProgress: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.teal },
  checklistProgressBar: { height: 6, backgroundColor: colors.border, marginBottom: 14, overflow: 'hidden' },
  checklistProgressFill: { height: 6, backgroundColor: colors.teal },
  checklistItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  checklistCheck: {
    width: 20, height: 20, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checklistCheckDone: { backgroundColor: colors.teal + '20', borderColor: colors.teal },
  checklistText: { fontFamily: fonts.body, fontSize: 13, color: colors.white, flex: 1 },
  checklistTextDone: { color: colors.muted, textDecorationLine: 'line-through' },
  readyBanner: {
    backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal,
    paddingVertical: 14, alignItems: 'center', marginTop: 10,
  },
  readyBannerText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.teal, letterSpacing: 0.5 },

  accommTabs: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  accommTab: { flex: 1, borderWidth: 1, borderColor: colors.border, paddingVertical: 10, alignItems: 'center' },
  accommTabActive: { backgroundColor: colors.teal + '15', borderColor: colors.teal },
  accommTabText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.muted },
  accommTabTextActive: { color: colors.teal },

  hostCard: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 14,
  },
  hostCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  hostName: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white },
  hostInfo: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 3 },
  requestBtn: { borderWidth: 1, borderColor: colors.teal, paddingVertical: 12, alignItems: 'center' },
  requestBtnText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.teal, letterSpacing: 0.5 },
});
