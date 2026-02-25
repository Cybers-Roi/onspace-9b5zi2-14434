import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, fonts, glowShadow } from '../../constants/theme';
import { PLAYER_NUMBER, PLAYER_NAME, PLAYER_HANDLE, PLAYER_LEVEL, PLAYER_TITLE, PLAYER_XP, PLAYER_XP_NEXT, PLAYER_AVATAR } from '../../constants/config';
import { badges, activities, skills, events } from '../../services/mockData';
import { HexAvatar } from '../../components/ui/HexAvatar';
import { useApp } from '../../contexts/AppContext';

const { width: SW } = Dimensions.get('window');
type ProfileTab = 'passport' | 'events' | 'skills' | 'activity';

const identityTimeline = [
  { id: '1', event: 'Global Game Jam Tunis', status: 'COMPLETED', date: 'OCT 2023', desc: "Awarded for 'Best Game Mechanics' in survival horror category.", cert: true, shape: '○', shapeColor: colors.coral },
  { id: '2', event: 'Cyber Security Expo', status: 'PARTICIPATED', date: 'AUG 2023', desc: 'Attended advanced workshops on defensive architecture.', cert: false, shape: '◇', shapeColor: colors.gold },
  { id: '3', event: "React Summit '23", status: 'MERIT', date: 'MAY 2023', desc: 'Lightning talk speaker: "The future of hexagonal UI".', cert: false, shape: '□', shapeColor: colors.teal },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { registeredEvents, playerXP } = useApp();
  const [activeTab, setActiveTab] = useState<ProfileTab>('passport');
  const currentXP = playerXP;
  const xpProgress = Math.min(currentXP / PLAYER_XP_NEXT, 1);

  const tabs: { key: ProfileTab; label: string; symbol: string }[] = [
    { key: 'passport', label: 'PASSPORT', symbol: '○' },
    { key: 'events', label: 'EVENTS', symbol: '△' },
    { key: 'skills', label: 'SKILLS', symbol: '□' },
    { key: 'activity', label: 'ACTIVITY', symbol: '◇' },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const attendedEvents = events.filter(e => registeredEvents.includes(e.id));

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>
        {/* Header with floating shapes */}
        <View style={styles.profileHeader}>
          {/* Floating geometric shapes */}
          <View style={styles.floatingCircle} />
          <View style={styles.floatingDiamond} />

          {/* Avatar */}
          <View style={styles.avatarSection}>
            <HexAvatar uri={PLAYER_AVATAR} size={110} borderColor={colors.neonPink} borderWidth={3} />
            <View style={[styles.playerNumBadge, glowShadow(colors.coral)]}>
              <Text style={styles.playerNumText}>{PLAYER_NUMBER}</Text>
            </View>
          </View>

          {/* Name & Handle */}
          <Text style={styles.playerName}>{PLAYER_NAME}</Text>
          <Text style={styles.playerHandle}>{PLAYER_HANDLE}</Text>

          {/* Info chips */}
          <View style={styles.chipRow}>
            <View style={styles.infoChip}>
              <Text style={styles.infoChipIcon}>◉</Text>
              <Text style={styles.infoChipText}>Tunis, TN</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoChipIcon}>🎓</Text>
              <Text style={styles.infoChipText}>CS Student</Text>
            </View>
          </View>

          {/* Mode indicator */}
          <View style={styles.modeRow}>
            <View style={styles.modeDot} />
            <Text style={styles.modeText}>PARTICIPANT MODE ○</Text>
          </View>

          {/* Stats Row - matching reference: 3 equal boxes */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>EVENTS</Text>
              <Text style={styles.statValue}>{12 + registeredEvents.length}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>XP</Text>
              <Text style={[styles.statValue, { color: colors.teal }]}>{currentXP.toLocaleString()}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>BADGES</Text>
              <Text style={styles.statValue}>{String(earnedBadges.length).padStart(2, '0')}</Text>
            </View>
          </View>

          {/* Level Bar - matching reference */}
          <View style={styles.levelSection}>
            <Text style={styles.levelLabel}>LEVEL {String(PLAYER_LEVEL).padStart(2, '0')}</Text>
            <View style={styles.levelTitleRow}>
              <Text style={styles.levelTitle}>{PLAYER_TITLE}</Text>
              <Text style={styles.levelPct}>{Math.round(xpProgress * 100)}% TO L{String(PLAYER_LEVEL + 1).padStart(2, '0')}</Text>
            </View>
            <View style={styles.levelBarBg}>
              <View style={[styles.levelBarFill, { width: `${xpProgress * 100}%` }]} />
            </View>
          </View>

          {/* Identity Passport Header */}
          <View style={styles.passportHeader}>
            <View style={styles.passportIcon}>
              <Text style={{ fontSize: 14, color: colors.coral }}>▥</Text>
            </View>
            <Text style={styles.passportLabel}>IDENTITY PASSPORT</Text>
          </View>
        </View>

        {/* Identity Timeline Cards - matching reference */}
        <View style={styles.timelineSection}>
          {identityTimeline.map((item, idx) => (
            <View key={item.id} style={styles.timelineRow}>
              {/* Left timeline */}
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineDot, { borderColor: item.shapeColor }]}>
                  <Text style={[styles.timelineDotShape, { color: item.shapeColor }]}>{item.shape}</Text>
                </View>
                {idx < identityTimeline.length - 1 && <View style={styles.timelineConnector} />}
              </View>
              {/* Card */}
              <View style={styles.timelineCard}>
                {/* Floating shape in card */}
                <View style={styles.cardFloatingShape}>
                  <Text style={{ fontSize: 32, color: colors.muted + '25' }}>
                    {item.shape === '○' ? '△' : item.shape === '◇' ? '○' : '□'}
                  </Text>
                </View>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <Text style={styles.cardDateDot}> · </Text>
                  <Text style={styles.cardStatus}>{item.status}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.event}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
                {item.cert && (
                  <View style={styles.certRow}>
                    <Text style={styles.certIcon}>◇</Text>
                    <Text style={styles.certText}>CERTIFICATE ISSUED</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Download Passport Button - matching reference coral */}
        <Pressable style={styles.downloadBtn} onPress={() => router.push('/passport')}>
          <Ionicons name="download-outline" size={18} color={colors.white} />
          <Text style={styles.downloadBtnText}>DOWNLOAD FULL PASSPORT PDF</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 0,
    position: 'relative',
  },

  // Floating shapes matching reference
  floatingCircle: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.neonPink + '40',
  },
  floatingDiamond: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderColor: colors.muted + '30',
    transform: [{ rotate: '45deg' }],
  },

  avatarSection: { position: 'relative', marginBottom: 14 },
  playerNumBadge: {
    position: 'absolute', bottom: 0, right: -8,
    backgroundColor: colors.coral, paddingHorizontal: 10, paddingVertical: 4,
  },
  playerNumText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.white },

  playerName: {
    fontFamily: fonts.body, fontSize: 30, fontWeight: '900', color: colors.white,
    letterSpacing: 2, textTransform: 'uppercase',
  },
  playerHandle: { fontFamily: fonts.mono, fontSize: 14, color: colors.teal, marginTop: 4 },

  chipRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  infoChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: colors.border, borderRadius: 9999,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  infoChipIcon: { fontSize: 11, color: colors.teal },
  infoChipText: { fontFamily: fonts.mono, fontSize: 11, color: colors.white },

  modeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 },
  modeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.electric },
  modeText: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.electric, letterSpacing: 0.5 },

  // Stats matching reference - 3 boxes with border
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 20, width: '100%' },
  statBox: {
    flex: 1, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 14, alignItems: 'center',
  },
  statLabel: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, letterSpacing: 1, marginBottom: 6 },
  statValue: { fontFamily: fonts.mono, fontSize: 26, fontWeight: '700', color: colors.white },

  // Level section matching reference
  levelSection: { width: '100%', marginTop: 20 },
  levelLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 1 },
  levelTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 8 },
  levelTitle: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.teal, letterSpacing: 0.5 },
  levelPct: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },
  levelBarBg: { height: 8, backgroundColor: colors.border, overflow: 'hidden' },
  levelBarFill: { height: 8, backgroundColor: colors.teal },

  // Identity Passport section header
  passportHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    width: '100%', marginTop: 28, paddingBottom: 4,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  passportIcon: {
    width: 28, height: 28, borderWidth: 1, borderColor: colors.coral,
    alignItems: 'center', justifyContent: 'center',
  },
  passportLabel: {
    fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 1,
  },

  // Timeline matching reference
  timelineSection: { paddingHorizontal: 16, marginTop: 20 },
  timelineRow: { flexDirection: 'row', marginBottom: 0 },
  timelineLeft: { alignItems: 'center', width: 32, marginRight: 14 },
  timelineDot: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface,
  },
  timelineDotShape: { fontSize: 8, fontWeight: '700' },
  timelineConnector: { width: 1, flex: 1, backgroundColor: colors.border, minHeight: 20 },

  timelineCard: {
    flex: 1, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 16, marginBottom: 16, position: 'relative', overflow: 'hidden',
  },
  cardFloatingShape: { position: 'absolute', top: 12, right: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardDate: { fontFamily: fonts.mono, fontSize: 10, color: colors.coral, fontWeight: '700' },
  cardDateDot: { color: colors.muted, fontSize: 10 },
  cardStatus: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, fontWeight: '700' },
  cardTitle: { fontFamily: fonts.body, fontSize: 17, fontWeight: '800', color: colors.white, marginBottom: 6 },
  cardDesc: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, lineHeight: 19 },
  certRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 10, backgroundColor: colors.teal + '15', paddingHorizontal: 10, paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  certIcon: { fontSize: 12, color: colors.teal },
  certText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.teal },

  // Download button - coral matching reference
  downloadBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    marginHorizontal: 16, marginTop: 8, marginBottom: 20,
    backgroundColor: colors.teal, paddingVertical: 16,
  },
  downloadBtnText: {
    fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.base, letterSpacing: 0.5,
  },
});
