import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { PLAYER_NUMBER } from '../constants/config';

export default function QRCheckInScreen() {
  const router = useRouter();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsCheckedIn(true);
  };

  if (isCheckedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successCheckmark}>✓</Text>
          </View>
          <Text style={styles.successTitle}>CHECKED IN ○</Text>
          <Text style={styles.successXP}>+100 XP EARNED</Text>
          <Text style={styles.successSeat}>ROW C, SEAT 14</Text>

          <View style={styles.playerCard}>
            <View style={styles.playerCardHex}>
              <Ionicons name="person" size={24} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.playerCardName}>AHMED BENALI</Text>
              <Text style={styles.playerCardNumber}>{PLAYER_NUMBER}</Text>
            </View>
            <View style={styles.playerCardRole}>
              <Text style={styles.playerCardRoleText}>○ PARTICIPANT</Text>
            </View>
          </View>

          <Text style={styles.eventStartLabel}>EVENT STARTS IN 2H 14M</Text>

          <Pressable style={styles.eventChatBtn} onPress={() => router.back()}>
            <Text style={styles.eventChatBtnText}>OPEN EVENT CHAT □</Text>
          </Pressable>
          <Pressable style={styles.mapBtn} onPress={() => router.back()}>
            <Text style={styles.mapBtnText}>VIEW MAP △</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>YOUR KEY ○</Text>

        {/* QR Code Container */}
        <View style={styles.qrContainer}>
          <View style={styles.qrFrame}>
            <View style={styles.qrInner}>
              <Ionicons name="qr-code" size={140} color={colors.base} />
            </View>
          </View>
          <Text style={styles.qrLabel}>DIGITAL ENTRY</Text>
          <Text style={styles.qrSubLabel}>QR/EA NC/CU/R/DE</Text>
        </View>

        <View style={styles.scanLabel}>
          <Text style={styles.scanText}>READY TO SCAN</Text>
          <Text style={styles.scanSub}>KEEP SCREEN BRIGHTNESS AT MAXIMUM</Text>
        </View>

        {/* Mock Check-in Button */}
        <Pressable style={styles.mockCheckInBtn} onPress={handleCheckIn}>
          <Text style={styles.mockCheckInText}>SIMULATE CHECK-IN</Text>
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerNum}>{PLAYER_NUMBER}</Text>
          <Text style={styles.playerLabel}>AHMED BENALI</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: { paddingHorizontal: 16, paddingVertical: 14 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  content: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
  title: {
    fontFamily: fonts.body, fontSize: 36, fontWeight: '900', color: colors.white,
    letterSpacing: 2, marginBottom: 40,
  },

  qrContainer: { alignItems: 'center', marginBottom: 40 },
  qrFrame: {
    borderWidth: 4, borderColor: colors.coral, padding: 16,
    backgroundColor: colors.white, marginBottom: 16,
  },
  qrInner: { width: 180, height: 180, alignItems: 'center', justifyContent: 'center' },
  qrLabel: {
    fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.white,
    letterSpacing: 2, marginBottom: 4,
  },
  qrSubLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },

  scanLabel: { alignItems: 'center', marginBottom: 30 },
  scanText: {
    fontFamily: fonts.body, fontSize: 20, fontWeight: '800', color: colors.teal,
    letterSpacing: 1, marginBottom: 8,
  },
  scanSub: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 0.5 },

  mockCheckInBtn: {
    backgroundColor: colors.coral + '20', borderWidth: 1, borderColor: colors.coral,
    paddingVertical: 12, paddingHorizontal: 20,
  },
  mockCheckInText: {
    fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.coral, letterSpacing: 0.5,
  },

  bottom: { paddingHorizontal: 20, paddingBottom: 30 },
  playerInfo: { alignItems: 'center' },
  playerNum: { fontFamily: fonts.mono, fontSize: 16, fontWeight: '700', color: colors.coral, marginBottom: 4 },
  playerLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 0.5 },

  // Success State
  successContainer: { flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 60 },
  successIcon: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: colors.teal,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  successCheckmark: { fontSize: 48, color: colors.base, fontWeight: '700' },
  successTitle: {
    fontFamily: fonts.body, fontSize: 36, fontWeight: '900', color: colors.teal,
    letterSpacing: 2, marginBottom: 16,
  },
  successXP: {
    fontFamily: fonts.mono, fontSize: 16, fontWeight: '700', color: colors.gold,
    marginBottom: 8, letterSpacing: 1,
  },
  successSeat: { fontFamily: fonts.mono, fontSize: 13, color: colors.muted, marginBottom: 30 },

  playerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%',
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 14, marginBottom: 24,
  },
  playerCardHex: {
    width: 48, height: 48, backgroundColor: colors.surface3,
    alignItems: 'center', justifyContent: 'center', borderRadius: 8,
  },
  playerCardName: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white },
  playerCardNumber: { fontFamily: fonts.mono, fontSize: 11, color: colors.coral, marginTop: 2 },
  playerCardRole: {
    backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  playerCardRoleText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal },

  eventStartLabel: {
    fontFamily: fonts.mono, fontSize: 14, fontWeight: '700', color: colors.coral,
    marginBottom: 24, letterSpacing: 1,
  },

  eventChatBtn: { backgroundColor: colors.teal, paddingVertical: 16, width: '100%', alignItems: 'center', marginBottom: 10 },
  eventChatBtnText: {
    fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.base, letterSpacing: 0.5,
  },
  mapBtn: { borderWidth: 1, borderColor: colors.white, paddingVertical: 14, width: '100%', alignItems: 'center' },
  mapBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
});
