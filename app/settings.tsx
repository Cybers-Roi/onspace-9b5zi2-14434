import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

type Visibility = 'public' | 'followers' | 'private';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>('public');

  const visOptions: { key: Visibility; label: string; symbol: string }[] = [
    { key: 'public', label: 'PUBLIC', symbol: '○' },
    { key: 'followers', label: 'FOLLOWERS', symbol: '△' },
    { key: 'private', label: 'PRIVATE', symbol: '□' },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.pageTitle}>SETTINGS ◇</Text>

          {/* Account Details - matching reference */}
          <Pressable style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={20} color={colors.coral} />
              <Text style={styles.menuLabel}>ACCOUNT DETAILS</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>

          {/* Push Notifications with toggle */}
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.gold} />
              <Text style={styles.menuLabel}>PUSH NOTIFICATIONS</Text>
            </View>
            <Switch
              value={pushNotifs}
              onValueChange={(v) => { setPushNotifs(v); Haptics.selectionAsync(); }}
              trackColor={{ false: colors.border, true: colors.teal }}
              thumbColor={colors.white}
            />
          </View>

          {/* Stealth Mode sub-item */}
          <View style={styles.subRow}>
            <Text style={styles.subLabel}>STEALTH MODE</Text>
            <Switch
              value={stealthMode}
              onValueChange={(v) => { setStealthMode(v); Haptics.selectionAsync(); }}
              trackColor={{ false: colors.border, true: colors.coral }}
              thumbColor={colors.white}
            />
          </View>

          {/* Visibility & Privacy */}
          <Text style={styles.sectionTitle}>VISIBILITY & PRIVACY</Text>
          <View style={styles.visRow}>
            {visOptions.map(opt => (
              <Pressable
                key={opt.key}
                style={[styles.visBox, visibility === opt.key && styles.visBoxActive]}
                onPress={() => { setVisibility(opt.key); Haptics.selectionAsync(); }}
              >
                <Text style={[styles.visSymbol, visibility === opt.key && styles.visSymbolActive]}>{opt.symbol}</Text>
                <Text style={[styles.visLabel, visibility === opt.key && styles.visLabelActive]}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Visual Override */}
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Ionicons name="color-palette-outline" size={20} color={colors.purple} />
              <Text style={styles.menuLabel}>VISUAL OVERRIDE</Text>
            </View>
            <Text style={styles.menuValueText}>INDUSTRIAL DARK</Text>
          </View>

          {/* Logout */}
          <Pressable style={styles.logoutBtn} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); logout(); router.replace('/splash'); }}>
            <Text style={styles.logoutText}>LOG OUT ✗</Text>
          </Pressable>

          {/* Delete */}
          <Pressable style={styles.deleteBtn}>
            <Text style={styles.deleteText}>DELETE ACCOUNT</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 16 },

  pageTitle: {
    fontFamily: fonts.body, fontSize: 34, fontWeight: '900', color: colors.white,
    letterSpacing: 2, marginBottom: 30, marginTop: 8,
  },

  sectionTitle: {
    fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 1.5,
    marginTop: 30, marginBottom: 16,
  },

  menuRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuLabel: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  menuValueText: { fontFamily: fonts.mono, fontSize: 12, color: colors.teal, fontWeight: '700' },

  subRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, paddingLeft: 34,
  },
  subLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 0.5 },

  visRow: { flexDirection: 'row', gap: 10 },
  visBox: {
    flex: 1, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 18, alignItems: 'center', gap: 6,
  },
  visBoxActive: { borderColor: colors.coral, backgroundColor: colors.coral + '12' },
  visSymbol: { fontSize: 20, color: colors.muted },
  visSymbolActive: { color: colors.coral },
  visLabel: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.muted },
  visLabelActive: { color: colors.coral },

  logoutBtn: {
    borderWidth: 1, borderColor: colors.coral, paddingVertical: 18, alignItems: 'center',
    marginTop: 44,
  },
  logoutText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.coral, letterSpacing: 1 },

  deleteBtn: { alignItems: 'center', marginTop: 18 },
  deleteText: { fontFamily: fonts.mono, fontSize: 12, color: colors.coral, letterSpacing: 1 },
});
