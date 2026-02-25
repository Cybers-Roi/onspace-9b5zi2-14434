import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { HexAvatar } from '../components/ui/HexAvatar';

const { width: SW } = Dimensions.get('window');

const availableTeams = [
  { id: '1', name: 'VANGUARD_X', members: 3, max: 4, skills: ['STRENGTH', 'LUCK'], avatars: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop&crop=face'] },
  { id: '2', name: 'NULL_VOID', members: 1, max: 4, skills: ['AGILITY'], avatars: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face'] },
  { id: '3', name: 'REBEL_SQUAD', members: 2, max: 4, skills: ['INTEL'], avatars: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face'] },
  { id: '4', name: 'PLAYER_ONE', members: 1, max: 4, skills: ['LUCK'], avatars: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'] },
];

export default function TeamLobbyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [teamName, setTeamName] = useState('');
  const [countdown, setCountdown] = useState({ m: 5, s: 0 });
  const [hasTeam, setHasTeam] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { m, s } = prev;
        if (s > 0) { s--; }
        else if (m > 0) { m--; s = 59; }
        return { m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>TEAM FORMATION</Text>
            <Text style={styles.titleShape}>○</Text>
          </View>
          <View style={styles.countdownWrap}>
            <Text style={styles.countdownLabel}>STARTS IN</Text>
            <Text style={styles.countdownTime}>{countdown.m}:{String(countdown.s).padStart(2, '0')}</Text>
          </View>
        </View>

        {/* Event info row */}
        <View style={styles.eventRow}>
          <View style={styles.eventChip}>
            <Text style={styles.eventChipText}>SQUID GAME EVENT</Text>
          </View>
          <View style={styles.playersOnline}>
            <View style={styles.onlineDot} />
            <Text style={styles.playersText}>24 PLAYERS IN LOBBY ○</Text>
          </View>
        </View>

        {/* Create Team */}
        <View style={styles.createSection}>
          <TextInput
            style={styles.teamInput}
            placeholder="ENTER TEAM NAME..."
            placeholderTextColor={colors.muted}
            value={teamName}
            onChangeText={setTeamName}
          />
          <View style={styles.createBtns}>
            <Pressable style={styles.createBtn} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); setHasTeam(true); }}>
              <Text style={styles.createBtnText}>CREATE TEAM □</Text>
            </Pressable>
            <Pressable style={styles.copyBtn}>
              <Text style={styles.copyBtnText}>COPY LINK △</Text>
            </Pressable>
          </View>
        </View>

        {/* Available Teams */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>AVAILABLE TEAMS</Text>
          <Text style={styles.sectionSub}>GRID 2xN</Text>
        </View>
        <View style={styles.teamsGrid}>
          {availableTeams.map(team => (
            <Pressable
              key={team.id}
              style={styles.teamCard}
              onPress={() => { Haptics.selectionAsync(); setHasTeam(true); }}
            >
              <View style={styles.teamCardTop}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamSlots}>{team.members}/{team.max}</Text>
              </View>
              <View style={styles.teamAvatars}>
                {team.avatars.map((av, idx) => (
                  <View key={idx} style={[styles.teamAvWrap, { marginLeft: idx > 0 ? -10 : 0, zIndex: team.avatars.length - idx }]}>
                    <HexAvatar uri={av} size={30} borderColor={colors.border} borderWidth={1} />
                    {idx === 0 && <Text style={styles.starIcon}>★</Text>}
                  </View>
                ))}
              </View>
              <View style={styles.teamSkillRow}>
                {team.skills.map(s => (
                  <View key={s} style={styles.teamSkillChip}>
                    <Text style={styles.teamSkillText}>{s}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Your Team Card */}
        {hasTeam && (
          <View style={styles.yourTeam}>
            <View style={styles.yourTeamTop}>
              <Text style={styles.yourTeamName}>YOUR TEAM: ALPHA_7</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            </View>
            <View style={styles.yourTeamBody}>
              <View style={styles.yourAvatars}>
                {availableTeams[0].avatars.map((av, idx) => (
                  <View key={idx} style={[styles.yourAvWrap, { marginLeft: idx > 0 ? -16 : 0, zIndex: 5 - idx }]}>
                    <HexAvatar uri={av} size={46} borderColor={colors.coral} borderWidth={2} />
                  </View>
                ))}
                <View style={styles.addSlot}>
                  <Text style={styles.addSlotText}>+</Text>
                </View>
              </View>
              <View style={styles.capInfo}>
                <Text style={styles.capLabel}>CAPACITY</Text>
                <Text style={styles.capValue}>3/4 PLAYERS</Text>
              </View>
            </View>
            <View style={styles.skillsCoverageRow}>
              <Text style={styles.skillsCoverageLabel}>TEAM SKILLS COVERAGE</Text>
              <Text style={styles.skillsCoveragePct}>75%</Text>
            </View>
            <View style={styles.coverageBarBg}>
              <View style={[styles.coverageBarFill, { width: '75%' }]} />
            </View>
            <View style={styles.teamActionsRow}>
              <Pressable style={styles.leaveBtn}>
                <Text style={styles.leaveBtnText}>LEAVE △</Text>
              </Pressable>
              <Pressable style={styles.readyBtn}>
                <Text style={styles.readyBtnText}>READY ○</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        <Pressable style={styles.randomBtn} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
          <Text style={styles.randomBtnText}>RANDOM MATCH □</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingTop: 14 },
  title: { fontFamily: fonts.body, fontSize: 28, fontWeight: '900', color: colors.white, letterSpacing: 0.5 },
  titleShape: { fontFamily: fonts.mono, fontSize: 22, color: colors.white, marginTop: -4 },
  countdownWrap: { alignItems: 'flex-end' },
  countdownLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, letterSpacing: 1 },
  countdownTime: { fontFamily: fonts.mono, fontSize: 24, fontWeight: '700', color: colors.coral },

  eventRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 14, marginBottom: 22 },
  eventChip: { backgroundColor: colors.surface2, paddingHorizontal: 14, paddingVertical: 8 },
  eventChipText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  playersOnline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.teal },
  playersText: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal },

  createSection: { paddingHorizontal: 16, marginBottom: 24 },
  teamInput: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 16, fontFamily: fonts.mono, fontSize: 13, color: colors.white, marginBottom: 10,
  },
  createBtns: { flexDirection: 'row', gap: 10 },
  createBtn: { flex: 1, backgroundColor: colors.coral, paddingVertical: 14, alignItems: 'center' },
  createBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  copyBtn: { flex: 1, backgroundColor: colors.teal, paddingVertical: 14, alignItems: 'center' },
  copyBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.base, letterSpacing: 0.5 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  sectionLabel: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.muted, letterSpacing: 1 },
  sectionSub: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },

  teamsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10, marginBottom: 22 },
  teamCard: { width: (SW - 42) / 2, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 14 },
  teamCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  teamName: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white, letterSpacing: 0.3 },
  teamSlots: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.teal },
  teamAvatars: { flexDirection: 'row', marginBottom: 10 },
  teamAvWrap: { position: 'relative' },
  starIcon: { position: 'absolute', top: -4, right: -4, fontSize: 10, color: colors.gold },
  teamSkillRow: { flexDirection: 'row', gap: 6 },
  teamSkillChip: { backgroundColor: colors.surface3, paddingHorizontal: 8, paddingVertical: 3 },
  teamSkillText: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted },

  yourTeam: {
    marginHorizontal: 16, backgroundColor: colors.surface2,
    borderWidth: 2, borderColor: colors.coral, padding: 16,
  },
  yourTeamTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  yourTeamName: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.coral, letterSpacing: 0.5 },
  activeBadge: { backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 10, paddingVertical: 3 },
  activeBadgeText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal },
  yourTeamBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  yourAvatars: { flexDirection: 'row', alignItems: 'center' },
  yourAvWrap: {},
  addSlot: {
    width: 46, height: 46, borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', marginLeft: -10, borderRadius: 10,
  },
  addSlotText: { fontSize: 20, color: colors.muted },
  capInfo: { alignItems: 'flex-end' },
  capLabel: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, letterSpacing: 0.5 },
  capValue: { fontFamily: fonts.body, fontSize: 16, fontWeight: '700', color: colors.white },
  skillsCoverageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  skillsCoverageLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, fontWeight: '700' },
  skillsCoveragePct: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.white },
  coverageBarBg: { height: 6, backgroundColor: colors.border, marginBottom: 14, overflow: 'hidden' },
  coverageBarFill: { height: 6, backgroundColor: colors.teal },
  teamActionsRow: { flexDirection: 'row', gap: 10 },
  leaveBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, paddingVertical: 10, alignItems: 'center' },
  leaveBtnText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white },
  readyBtn: { flex: 1, backgroundColor: colors.coral + '80', paddingVertical: 10, alignItems: 'center' },
  readyBtnText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 12, backgroundColor: colors.base },
  randomBtn: { backgroundColor: colors.neonPink, paddingVertical: 18, alignItems: 'center' },
  randomBtnText: { fontFamily: fonts.body, fontSize: 18, fontWeight: '800', color: colors.white, letterSpacing: 1 },
});
