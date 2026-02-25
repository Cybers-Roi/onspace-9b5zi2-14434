import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts, glowShadow } from '../constants/theme';

const { width: SW } = Dimensions.get('window');
const CARD_W = (SW - 42) / 2;

const liveFeed = [
  { id: '1', time: '14:22:01', text: 'Player #4821 checked in - Zone A', color: colors.teal },
  { id: '2', time: '14:21:45', text: 'Volunteer #12 assigned to Zone B', color: colors.white },
  { id: '3', time: '14:20:30', text: "New Announcement: 'Round 2 Starting'", color: colors.coral },
  { id: '4', time: '14:19:12', text: 'Network latency spike detected (+45ms)', color: colors.muted },
  { id: '5', time: '14:18:55', text: 'Global XP Multiplier active (x1.5)', color: colors.gold },
  { id: '6', time: '14:17:40', text: 'Player #16 checked in - Main Hall', color: colors.teal },
];

export default function CommandCenterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [timer, setTimer] = useState({ h: 1, m: 24, s: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        let { h, m, s } = prev;
        s++;
        if (s >= 60) { s = 0; m++; }
        if (m >= 60) { m = 0; h++; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        {/* Header - matching reference layout */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>COMMAND CENTER □</Text>
            </View>
            <View style={styles.livePill}>
              <View style={styles.liveDotOuter}>
                <View style={styles.liveDotInner} />
              </View>
              <Text style={styles.liveText}>● LIVE</Text>
            </View>
          </View>
          <View style={styles.subRow}>
            <Text style={styles.networkLabel}>(●) EVENTFY NET-04</Text>
            <Text style={styles.timerDisplay}>{pad(timer.h)}:{pad(timer.m)}:{pad(timer.s)}</Text>
          </View>
        </View>

        {/* KPI Grid - 2x2 matching reference proportions */}
        <View style={styles.kpiGrid}>
          {/* Check-ins */}
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>CHECK-INS</Text>
            <Text style={[styles.kpiValue, { color: colors.teal }]}>247/500</Text>
            <View style={styles.sparkline}>
              {[14, 22, 16, 26, 18, 12, 24].map((h, i) => (
                <View key={i} style={[styles.sparkBar, { height: h, backgroundColor: colors.teal + '50' }]} />
              ))}
            </View>
          </View>

          {/* Volunteers */}
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>VOLUNTEERS</Text>
            <Text style={[styles.kpiValue, { color: colors.teal }]}>18/24</Text>
            <Text style={[styles.kpiSubValue, { color: colors.teal }]}>ON DUTY</Text>
            <View style={styles.kpiBottom}>
              <Ionicons name="people" size={14} color={colors.teal} />
              <Text style={[styles.kpiBottomText, { color: colors.teal }]}>ACTIVE DEP.</Text>
            </View>
          </View>

          {/* Live Chat */}
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>LIVE CHAT</Text>
            <Text style={styles.kpiValue}>1,247</Text>
            <View style={styles.chatBars}>
              {[14, 24, 18, 30].map((h, i) => (
                <View key={i} style={[styles.chatBarItem, { height: h, backgroundColor: colors.muted + '40' }]} />
              ))}
            </View>
          </View>

          {/* Total XP */}
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>TOTAL XP</Text>
            <Text style={[styles.kpiValue, { color: colors.gold }]}>24,800</Text>
            <Text style={[styles.kpiSubValue, { color: colors.gold }]}>RANK: GOLD</Text>
            <View style={styles.kpiBottom}>
              <Text style={{ fontSize: 16 }}>🏆</Text>
            </View>
          </View>
        </View>

        {/* Live Feed - matching reference */}
        <View style={styles.feedSection}>
          <View style={styles.feedHeaderRow}>
            <Text style={styles.feedTitle}>LIVE FEED</Text>
            <Text style={styles.feedSub}>AUTO-SCROLLING LOG</Text>
          </View>
          <View style={styles.feedCard}>
            {liveFeed.map((item, idx) => (
              <View key={item.id} style={[styles.feedRow, idx < liveFeed.length - 1 && styles.feedRowBorder]}>
                <Text style={styles.feedTime}>[{item.time}]</Text>
                <Text style={[styles.feedText, { color: item.color }]} numberOfLines={2}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar - matching reference */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        {/* Center QR FAB */}
        <View style={styles.qrFab}>
          <Ionicons name="qr-code" size={26} color={colors.base} />
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.actionItem} onPress={() => Haptics.selectionAsync()}>
            <Ionicons name="megaphone" size={20} color={colors.coral} />
            <Text style={styles.actionLabel}>ANNOUNCE</Text>
          </Pressable>
          <Pressable style={styles.actionItem} onPress={() => Haptics.selectionAsync()}>
            <Ionicons name="flash" size={20} color={colors.teal} />
            <Text style={styles.actionLabel}>PUSH</Text>
          </Pressable>
          <Pressable style={styles.actionItem} onPress={() => Haptics.selectionAsync()}>
            <Ionicons name="share-outline" size={20} color={colors.white} />
            <Text style={styles.actionLabel}>EXPORT</Text>
          </Pressable>
        </View>

        {/* Alert FAB */}
        <Pressable style={styles.alertFab}>
          <Ionicons name="warning" size={22} color={colors.white} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.body, fontSize: 24, fontWeight: '900', color: colors.white, letterSpacing: 1 },
  livePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: colors.coral + '80', paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 9999,
  },
  liveDotOuter: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.coral + '40', alignItems: 'center', justifyContent: 'center' },
  liveDotInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.coral },
  liveText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.coral },

  subRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 },
  networkLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },
  timerDisplay: { fontFamily: fonts.mono, fontSize: 36, fontWeight: '700', color: colors.white, letterSpacing: 2 },

  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  kpiCard: {
    width: CARD_W, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.teal + '20',
    padding: 16, minHeight: 140, borderRadius: 0,
  },
  kpiLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5, marginBottom: 6 },
  kpiValue: { fontFamily: fonts.mono, fontSize: 28, fontWeight: '700', color: colors.white, lineHeight: 32 },
  kpiSubValue: { fontFamily: fonts.mono, fontSize: 13, fontWeight: '700', marginTop: 2 },
  kpiBottom: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 'auto', paddingTop: 8 },
  kpiBottomText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700' },

  sparkline: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 'auto', paddingTop: 12, height: 36 },
  sparkBar: { flex: 1, borderRadius: 0 },

  chatBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 'auto', paddingTop: 12, height: 36 },
  chatBarItem: { flex: 1, borderRadius: 0 },

  feedSection: { paddingHorizontal: 16, marginTop: 28 },
  feedHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  feedTitle: { fontFamily: fonts.body, fontSize: 20, fontWeight: '900', color: colors.white, letterSpacing: 0.5 },
  feedSub: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5 },

  feedCard: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 0 },
  feedRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
  feedRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  feedTime: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, minWidth: 80 },
  feedText: { fontFamily: fonts.mono, fontSize: 11, flex: 1, lineHeight: 17 },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.surface2, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14, paddingHorizontal: 16,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  qrFab: {
    position: 'absolute', top: -28, left: SW / 2 - 28,
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', zIndex: 10,
    ...Platform.select({
      ios: { shadowColor: colors.white, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 16 },
      android: { elevation: 8 },
    }),
  },
  actionRow: { flex: 1, flexDirection: 'row', gap: 20 },
  actionItem: { alignItems: 'center', gap: 4 },
  actionLabel: { fontFamily: fonts.mono, fontSize: 8, color: colors.muted, fontWeight: '700', letterSpacing: 0.5 },
  alertFab: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.coral,
    alignItems: 'center', justifyContent: 'center',
  },
});
