import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { PLAYER_NUMBER, PLAYER_LEVEL, PLAYER_AVATAR } from '../constants/config';
import { HexAvatar } from '../components/ui/HexAvatar';

const { width: SW } = Dimensions.get('window');

const verifiedSkills = [
  { name: 'STRATEGY & LOGIC', pct: 88, color: colors.teal },
  { name: 'AGILITY & SPEED', pct: 94, color: colors.teal },
  { name: 'ENDURANCE', pct: 72, color: colors.teal },
];

const timeline = [
  { id: '1', event: 'Apex Championship', role: 'PARTICIPANT', date: 'Q4 2023', cert: true, shape: '○', color: colors.coral },
  { id: '2', event: 'Neon District Protocol', role: 'VOLUNTEER LEAD', date: 'Q2 2023', cert: true, shape: '□', color: colors.teal },
];

const achievements = [
  { name: 'LAST MAN\nSTANDING', icon: '🏆', color: colors.teal, bg: colors.teal + '18' },
  { name: 'TEAM\nTACTICIAN', icon: '👥', color: colors.coral, bg: colors.coral + '18' },
  { name: 'HYPER\nFOCUS', icon: '⚡', color: colors.gold, bg: colors.gold + '18' },
];

export default function PassportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>YOUR</Text>
            <Text style={styles.headerTitle}>PASSPORT ○</Text>
          </View>
          <View style={styles.headerBtns}>
            <Pressable style={styles.headerBtn}>
              <Text style={styles.headerBtnText}>DOWNLOAD{'\n'}PDF □</Text>
            </Pressable>
            <Pressable style={styles.headerBtnFill}>
              <Text style={styles.headerBtnFillText}>SHARE{'\n'}△</Text>
            </Pressable>
          </View>
        </View>

        {/* Passport Document */}
        <View style={styles.passport}>
          {/* Coral top strip */}
          <View style={styles.passportStrip}>
            <Text style={styles.stripLabel}>OFFICIAL PARTICIPATION PASSPORT</Text>
            <Text style={styles.stripSN}>SN: 4821-X-99</Text>
          </View>

          {/* Identity */}
          <View style={styles.identity}>
            <HexAvatar uri={PLAYER_AVATAR} size={130} borderColor={colors.coral} borderWidth={3} />
            <View style={styles.levelChip}>
              <Text style={styles.levelChipText}>LEVEL {PLAYER_LEVEL} GOLD</Text>
            </View>
            <Text style={styles.playerNum}>PLAYER {PLAYER_NUMBER}</Text>
            <Text style={styles.statusLine}>STATUS: ACTIVE PARTICIPANT</Text>
          </View>

          {/* Verified Skills */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>VERIFIED SKILLS □</Text>
              <View style={styles.sectionLine} />
            </View>
            {verifiedSkills.map((skill, idx) => (
              <View key={idx} style={styles.skillItem}>
                <View style={styles.skillTop}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.skillRightInfo}>
                    <Text style={styles.skillPct}>{skill.pct}%</Text>
                    <Text style={styles.skillBlocks}>
                      {'█'.repeat(Math.floor(skill.pct / 10))}{'░'.repeat(10 - Math.floor(skill.pct / 10))}
                    </Text>
                  </View>
                </View>
                <View style={styles.skillBarBg}>
                  <View style={[styles.skillBarFill, { width: `${skill.pct}%` }]} />
                </View>
              </View>
            ))}
            <View style={styles.tagRow}>
              {['#LEADERSHIP', '#RISK_MGMT', '#TACTICAL'].map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Experience Timeline */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>EXPERIENCE TIMELINE △</Text>
              <View style={styles.sectionLine} />
            </View>
            {timeline.map(item => (
              <Pressable 
                key={item.id} 
                style={styles.expRow}
                onPress={() => { Haptics.selectionAsync(); router.push('/verify-cert'); }}
              >
                <View style={[styles.expDot, { borderColor: item.color }]}>
                  <Text style={[styles.expDotShape, { color: item.color }]}>{item.shape}</Text>
                </View>
                <View style={styles.expContent}>
                  <Text style={styles.expTitle}>{item.event}</Text>
                  <Text style={styles.expRole}>{item.role} | {item.date}</Text>
                </View>
                {item.cert && (
                  <View style={styles.certChip}>
                    <Text style={styles.certIcon}>◇</Text>
                    <Text style={styles.certLabel}>CERT ◇</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>ACHIEVEMENTS ◇</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.achRow}>
              {achievements.map((ach, idx) => (
                <View key={idx} style={styles.achItem}>
                  <View style={[styles.achHex, { backgroundColor: ach.bg, borderColor: ach.color + '40' }]}>
                    <Text style={{ fontSize: 22 }}>{ach.icon}</Text>
                  </View>
                  <Text style={styles.achName}>{ach.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Footer Verification */}
          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.footerStatus}>SYSTEM STATUS: VERIFIED</Text>
              <Text style={styles.footerHash}>HASH: 8F92J1K...M90X2</Text>
              <View style={styles.verifiedRow}>
                <Text style={styles.verifiedCheck}>◇</Text>
                <Text style={styles.verifiedText}>CRYPTOGRAPHICALLY VERIFIED</Text>
              </View>
            </View>
            <View style={styles.qrBox}>
              <View style={styles.qrInner}>
                <Ionicons name="qr-code" size={28} color={colors.muted} />
              </View>
            </View>
          </View>

          {/* Bottom teal accent line */}
          <View style={styles.accentLine} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingHorizontal: 16, paddingVertical: 12, gap: 8,
  },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  headerTitle: { fontFamily: fonts.body, fontSize: 24, fontWeight: '900', color: colors.white, letterSpacing: 1, lineHeight: 28 },
  headerBtns: { flexDirection: 'row', gap: 8 },
  headerBtn: { borderWidth: 1, borderColor: colors.white, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  headerBtnText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.white, textAlign: 'center', lineHeight: 13 },
  headerBtnFill: { backgroundColor: colors.white, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  headerBtnFillText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.base, textAlign: 'center', lineHeight: 13 },

  passport: { marginHorizontal: 16, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.teal + '30', overflow: 'hidden' },
  passportStrip: {
    backgroundColor: colors.coral, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
  },
  stripLabel: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  stripSN: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white },

  identity: { alignItems: 'center', paddingVertical: 30 },
  levelChip: { backgroundColor: colors.teal, paddingHorizontal: 16, paddingVertical: 5, marginTop: -8, marginBottom: 14 },
  levelChipText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.base, letterSpacing: 1 },
  playerNum: { fontFamily: fonts.body, fontSize: 34, fontWeight: '900', color: colors.coral, letterSpacing: 2 },
  statusLine: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 6, letterSpacing: 1.5 },

  section: { paddingHorizontal: 16, paddingVertical: 18, borderTopWidth: 1, borderTopColor: colors.border },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  sectionTitle: { fontFamily: fonts.body, fontSize: 15, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  sectionLine: { flex: 1, height: 1, backgroundColor: colors.border },

  skillItem: { marginBottom: 16 },
  skillTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  skillName: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.teal, letterSpacing: 0.5 },
  skillRightInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  skillPct: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },
  skillBlocks: { fontFamily: fonts.mono, fontSize: 7, color: colors.teal, letterSpacing: 1 },
  skillBarBg: { height: 7, backgroundColor: colors.border, overflow: 'hidden' },
  skillBarFill: { height: 7, backgroundColor: colors.teal },

  tagRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  tag: { borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, fontWeight: '700' },

  expRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  expDot: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface3 },
  expDotShape: { fontSize: 8, fontWeight: '700' },
  expContent: { flex: 1 },
  expTitle: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white },
  expRole: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5, marginTop: 3 },
  certChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  certIcon: { fontSize: 12, color: colors.teal },
  certLabel: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.teal },

  achRow: { flexDirection: 'row', justifyContent: 'space-around' },
  achItem: { alignItems: 'center', width: (SW - 64) / 3 },
  achHex: { width: 64, height: 64, borderRadius: 16, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  achName: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, textAlign: 'center', letterSpacing: 0.5, lineHeight: 13 },

  footer: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 16, paddingVertical: 16, borderTopWidth: 1, borderTopColor: colors.border,
  },
  footerStatus: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, fontWeight: '700', marginBottom: 4 },
  footerHash: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, marginBottom: 8 },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  verifiedCheck: { fontSize: 12, color: colors.teal },
  verifiedText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white },
  qrBox: { width: 64, height: 64, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  qrInner: { width: 52, height: 52, backgroundColor: colors.surface3, alignItems: 'center', justifyContent: 'center' },

  accentLine: { height: 4, backgroundColor: colors.teal },
});
