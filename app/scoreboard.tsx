import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { PLAYER_NUMBER } from '../constants/config';
import { HexAvatar } from '../components/ui/HexAvatar';
import { useApp } from '../contexts/AppContext';

const { width: SW } = Dimensions.get('window');

type Scope = 'university' | 'city' | 'national' | 'global';
type TimeRange = 'week' | 'month' | 'alltime';

const leaderboard = [
  { rank: 1, name: 'K-TERMINATOR', xp: 50450, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', number: '#1024' },
  { rank: 2, name: 'VOID_RUNNER', xp: 11200, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', number: '#3421' },
  { rank: 3, name: 'CYBER_PUNK_9', xp: 9870, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face', number: '#7821' },
  { rank: 7, name: 'YOU (YOU)', xp: 4820, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', number: PLAYER_NUMBER, isYou: true },
];

const badges = [
  { id: '1', name: 'FIRST BLOOD', icon: '⚡', color: colors.teal, earned: true },
  { id: '2', name: 'ELITE ALPHA', icon: '🏆', color: colors.gold, earned: true },
  { id: '3', name: 'SOCIALITE', icon: '👥', color: colors.neonPink, earned: true },
  { id: '4', name: 'HEXATH GAME 43', icon: '🔒', color: colors.muted, earned: false },
  { id: '5', name: 'WIN CONTEST', icon: '🔒', color: colors.muted, earned: false },
  { id: '6', name: 'VERIFY ID', icon: '🔒', color: colors.muted, earned: false },
];

const quests = [
  { id: '1', title: 'Volunteer 3 times', current: 1, target: 3, xp: 500, done: false },
  { id: '2', title: 'Attend 5 Network Events', current: 3, target: 5, xp: 300, done: false },
  { id: '3', title: 'Share 10 Moments', current: 2, target: 10, xp: 200, done: false },
];

export default function ScoreboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { playerXP } = useApp();
  const [scope, setScope] = useState<Scope>('university');
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  const currentXP = playerXP;
  const nextLevelXP = 5000;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  const myRank = 7;
  const myPercentile = 15;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => router.back()} style={styles.menuBtn}>
              <View style={styles.menuLines}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
              </View>
            </Pressable>
            <View>
              <Text style={styles.title}>THE SCOREBOARD</Text>
              <Text style={styles.titleShape}>◇</Text>
            </View>
          </View>
          <Pressable>
            <Ionicons name="notifications-outline" size={22} color={colors.white} />
          </Pressable>
        </View>

        {/* Global Standing Card */}
        <View style={styles.standingCard}>
          <Text style={styles.standingLabel}>#7</Text>
          <Text style={styles.standingSub}>GLOBAL STANDING</Text>
        </View>

        {/* XP Hero Card */}
        <View style={styles.xpCard}>
          <View style={styles.xpBadge}>
            <Text style={styles.xpBadgeLabel}>HACKATHON VETERAN</Text>
          </View>
          <Text style={styles.xpValue}>{currentXP.toLocaleString()} XP</Text>
          <Text style={styles.xpNextLabel}>LEVEL 7 TO 8</Text>
          <View style={styles.xpBarBg}>
            <View style={[styles.xpBarFill, { width: `${xpProgress}%` }]} />
          </View>
          <View style={styles.xpStats}>
            <Text style={styles.xpStatLabel}>{currentXP.toLocaleString()} XP</Text>
            <Text style={styles.xpStatLabel}>{nextLevelXP.toLocaleString()} XP</Text>
          </View>
        </View>

        {/* Top Performers Label */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>◇</Text>
          <Text style={styles.sectionLabel}>TOP PERFORMERS</Text>
        </View>

        {/* Podium */}
        <View style={styles.podium}>
          {/* Rank 2 */}
          <View style={[styles.podiumItem, styles.podium2]}>
            <HexAvatar uri={leaderboard[1].avatar} size={50} borderColor={colors.border} borderWidth={2} />
            <View style={styles.podiumRankBadge}>
              <Text style={styles.podiumRankNum}>2</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{leaderboard[1].name}</Text>
            <Text style={styles.podiumXP}>{leaderboard[1].xp.toLocaleString()} XP</Text>
          </View>

          {/* Rank 1 */}
          <View style={[styles.podiumItem, styles.podium1]}>
            <View style={styles.crownIcon}>
              <Text style={{ fontSize: 20 }}>👑</Text>
            </View>
            <HexAvatar uri={leaderboard[0].avatar} size={64} borderColor={colors.gold} borderWidth={3} />
            <View style={[styles.podiumRankBadge, { backgroundColor: colors.gold }]}>
              <Text style={[styles.podiumRankNum, { color: colors.base }]}>1</Text>
            </View>
            <Text style={[styles.podiumName, { color: colors.gold }]} numberOfLines={1}>{leaderboard[0].name}</Text>
            <Text style={[styles.podiumXP, { color: colors.gold }]}>{leaderboard[0].xp.toLocaleString()} XP</Text>
          </View>

          {/* Rank 3 */}
          <View style={[styles.podiumItem, styles.podium3]}>
            <HexAvatar uri={leaderboard[2].avatar} size={46} borderColor={colors.border} borderWidth={2} />
            <View style={styles.podiumRankBadge}>
              <Text style={styles.podiumRankNum}>3</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{leaderboard[2].name}</Text>
            <Text style={styles.podiumXP}>{leaderboard[2].xp.toLocaleString()} XP</Text>
          </View>
        </View>

        {/* My Row */}
        <View style={styles.myRow}>
          <View style={styles.myRowLeft}>
            <Text style={styles.myRank}>7</Text>
            <HexAvatar uri={leaderboard[3].avatar} size={36} borderColor={colors.coral} borderWidth={2} />
            <View style={{ flex: 1 }}>
              <Text style={styles.myName}>YOU (YOU)</Text>
              <Text style={styles.myNumber}>{PLAYER_NUMBER}</Text>
            </View>
          </View>
          <View style={styles.myRowRight}>
            <Text style={styles.myXP}>{currentXP.toLocaleString()} XP</Text>
            <View style={styles.myRankChange}>
              <Ionicons name="arrow-up" size={10} color={colors.teal} />
              <Text style={styles.myRankChangeText}>+2</Text>
            </View>
          </View>
        </View>

        {/* View Full Leaderboard */}
        <Pressable style={styles.fullLeaderboardBtn} onPress={() => Haptics.selectionAsync()}>
          <Text style={styles.fullLeaderboardText}>VIEW FULL LEADERBOARD ○</Text>
        </Pressable>

        {/* Your Badges */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>◇</Text>
          <Text style={styles.sectionLabel}>YOUR BADGES □</Text>
        </View>
        <View style={styles.badgesGrid}>
          {badges.map(badge => (
            <View key={badge.id} style={[styles.badgeHex, !badge.earned && styles.badgeLocked]}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={[styles.badgeName, !badge.earned && { color: colors.muted }]} numberOfLines={2}>
                {badge.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>■</Text>
          <Text style={styles.sectionLabel}>ACHIEVEMENTS</Text>
        </View>
        {quests.map(quest => (
          <View key={quest.id} style={styles.questCard}>
            <View style={styles.questLeft}>
              <View style={[styles.questCheck, quest.done && styles.questCheckDone]}>
                {quest.done && <Text style={{ color: colors.teal, fontSize: 14 }}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <View style={styles.questBarBg}>
                  <View style={[styles.questBarFill, { width: `${(quest.current / quest.target) * 100}%` }]} />
                </View>
              </View>
            </View>
            <Text style={styles.questProgress}>{quest.current}/{quest.target}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuBtn: { width: 32, height: 32, justifyContent: 'center' },
  menuLines: { gap: 4 },
  menuLine: { width: 18, height: 2, backgroundColor: colors.gold },
  title: { fontFamily: fonts.body, fontSize: 20, fontWeight: '900', color: colors.gold, letterSpacing: 0.5 },
  titleShape: { fontFamily: fonts.mono, fontSize: 16, color: colors.gold, marginTop: -4 },

  standingCard: {
    marginHorizontal: 16, marginTop: 16, marginBottom: 20,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 20, alignItems: 'center',
  },
  standingLabel: {
    fontFamily: fonts.mono, fontSize: 72, fontWeight: '700', color: colors.coral,
    letterSpacing: -2, lineHeight: 72,
  },
  standingSub: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 1.5, marginTop: 8 },

  xpCard: {
    marginHorizontal: 16, marginBottom: 24, backgroundColor: colors.surface2,
    borderWidth: 1, borderColor: colors.teal + '40', padding: 20, alignItems: 'center',
  },
  xpBadge: {
    backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal,
    paddingHorizontal: 14, paddingVertical: 5, marginBottom: 12,
  },
  xpBadgeLabel: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal, letterSpacing: 1 },
  xpValue: { fontFamily: fonts.mono, fontSize: 48, fontWeight: '700', color: colors.teal, lineHeight: 48 },
  xpNextLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 6, marginBottom: 14 },
  xpBarBg: { width: '100%', height: 10, backgroundColor: colors.border, overflow: 'hidden' },
  xpBarFill: { height: 10, backgroundColor: colors.teal },
  xpStats: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 6 },
  xpStatLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, marginTop: 12, marginBottom: 14,
  },
  sectionIcon: { fontSize: 14, color: colors.gold },
  sectionLabel: {
    fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 0.5,
  },

  podium: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 16, gap: 12, marginBottom: 20 },
  podiumItem: { alignItems: 'center', position: 'relative' },
  podium1: { width: 100, paddingBottom: 10 },
  podium2: { width: 90, paddingBottom: 20 },
  podium3: { width: 80, paddingBottom: 30 },
  crownIcon: { position: 'absolute', top: -18, zIndex: 10 },
  podiumRankBadge: {
    position: 'absolute', top: -6, left: '50%', marginLeft: -14,
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.surface,
    borderWidth: 2, borderColor: colors.white, alignItems: 'center', justifyContent: 'center',
  },
  podiumRankNum: { fontFamily: fonts.mono, fontSize: 13, fontWeight: '700', color: colors.white },
  podiumName: {
    fontFamily: fonts.body, fontSize: 11, fontWeight: '700', color: colors.white,
    marginTop: 8, textAlign: 'center',
  },
  podiumXP: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, marginTop: 3 },

  myRow: {
    marginHorizontal: 16, backgroundColor: colors.surface2 + 'DD',
    borderWidth: 2, borderColor: colors.coral, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', padding: 14, marginBottom: 14,
  },
  myRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  myRank: { fontFamily: fonts.mono, fontSize: 20, fontWeight: '700', color: colors.coral, width: 28 },
  myName: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, fontStyle: 'italic' },
  myNumber: { fontFamily: fonts.mono, fontSize: 10, color: colors.coral, marginTop: 2 },
  myRowRight: { alignItems: 'flex-end' },
  myXP: { fontFamily: fonts.mono, fontSize: 16, fontWeight: '700', color: colors.white },
  myRankChange: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  myRankChangeText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.teal },

  fullLeaderboardBtn: {
    marginHorizontal: 16, marginBottom: 28, backgroundColor: colors.teal,
    paddingVertical: 14, alignItems: 'center',
  },
  fullLeaderboardText: {
    fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.base, letterSpacing: 0.5,
  },

  badgesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, marginBottom: 28,
  },
  badgeHex: {
    width: (SW - 56) / 3, aspectRatio: 1, backgroundColor: colors.surface2,
    borderWidth: 1, borderColor: colors.border, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', padding: 8,
  },
  badgeLocked: { opacity: 0.4 },
  badgeIcon: { fontSize: 28, marginBottom: 8 },
  badgeName: {
    fontFamily: fonts.mono, fontSize: 8, fontWeight: '700', color: colors.white,
    textAlign: 'center', letterSpacing: 0.3, lineHeight: 11,
  },

  questCard: {
    marginHorizontal: 16, marginBottom: 10, backgroundColor: colors.surface2,
    borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3, borderLeftColor: colors.teal,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14,
  },
  questLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  questCheck: {
    width: 22, height: 22, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  questCheckDone: { backgroundColor: colors.teal + '20', borderColor: colors.teal },
  questTitle: { fontFamily: fonts.body, fontSize: 13, fontWeight: '600', color: colors.white, marginBottom: 6 },
  questBarBg: { height: 4, backgroundColor: colors.border, overflow: 'hidden', width: '100%' },
  questBarFill: { height: 4, backgroundColor: colors.teal },
  questProgress: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.muted },
});
