import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { HexAvatar } from '../components/ui/HexAvatar';

type NotifTab = 'all' | 'events' | 'social';

interface NotifItem {
  id: string;
  type: 'flash' | 'social' | 'achievement' | 'volunteer' | 'system';
  title: string;
  body: string;
  time: string;
  read: boolean;
  priority?: boolean;
  xp?: number;
  avatar?: string;
  actions?: { label: string; color: string; style: 'fill' | 'outline' }[];
}

const notifications: NotifItem[] = [
  {
    id: '1', type: 'flash', priority: true,
    title: 'EVENT: THE BRIDGE RUN',
    body: 'Final check-in at Sector 7. Mandatory gear inspection starts in 15 minutes.',
    time: '02:45H', read: false,
    actions: [{ label: 'VIEW EVENT □', color: colors.coral, style: 'fill' }],
  },
  {
    id: '2', type: 'social',
    title: 'PLAYER_456',
    body: 'started following your intel.',
    time: '2M AGO', read: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    actions: [{ label: 'FOLLOW BACK ○', color: colors.coral, style: 'outline' }],
  },
  {
    id: '3', type: 'achievement',
    title: 'ACHIEVEMENT UNLOCKED',
    body: 'Tactical Genius: +500 XP Awarded',
    time: '15M AGO', read: false, xp: 500,
  },
  {
    id: '4', type: 'volunteer',
    title: 'Volunteer App: GUARD_ENTRY_09',
    body: '',
    time: '1H AGO', read: false,
    actions: [
      { label: 'APPROVE ✓', color: colors.teal, style: 'fill' },
      { label: 'REJECT ✗', color: colors.coral, style: 'fill' },
    ],
  },
  {
    id: '5', type: 'system',
    title: 'SYSTEM: CERT READY',
    body: 'CLEARANCE LEVEL 4 GRANTED',
    time: '3H AGO', read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<NotifTab>('all');
  const [readNotifs, setReadNotifs] = useState<string[]>([]);

  const tabs: { key: NotifTab; label: string; symbol: string }[] = [
    { key: 'all', label: 'ALL', symbol: '○' },
    { key: 'events', label: 'EVENTS', symbol: '△' },
    { key: 'social', label: 'SOCIAL', symbol: '□' },
  ];

  const filtered = notifications.filter(n => {
    if (activeTab === 'events') return ['flash', 'volunteer', 'system'].includes(n.type);
    if (activeTab === 'social') return ['social', 'achievement'].includes(n.type);
    return true;
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header - matching reference */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
          <Text style={styles.headerShape}> ○</Text>
        </View>
        <Pressable>
          <Ionicons name="at" size={22} color={colors.muted} />
        </Pressable>
      </View>

      {/* Tabs - matching reference with underline active */}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <Pressable
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => { Haptics.selectionAsync(); setActiveTab(tab.key); }}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label} {tab.symbol}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>
        {filtered.map(notif => {
          const isRead = notif.read || readNotifs.includes(notif.id);

          return (
            <Pressable
              key={notif.id}
              style={[
                styles.notifCard,
                notif.priority && styles.notifPriority,
                notif.type === 'achievement' && styles.notifAchievement,
              ]}
              onPress={() => { Haptics.selectionAsync(); setReadNotifs(prev => [...prev, notif.id]); }}
            >
              {/* Priority label */}
              {notif.priority && (
                <Text style={styles.priorityLabel}>PRIORITY ALPHA</Text>
              )}

              <View style={styles.notifRow}>
                {/* Left icon / avatar */}
                {notif.avatar ? (
                  <View style={styles.avatarWrap}>
                    <HexAvatar uri={notif.avatar} size={40} borderColor={colors.border} borderWidth={1} />
                    {!isRead && <View style={styles.onlineDot} />}
                  </View>
                ) : notif.type === 'achievement' ? (
                  <View style={[styles.iconBox, { backgroundColor: colors.gold + '20' }]}>
                    <Text style={{ fontSize: 18 }}>🏆</Text>
                  </View>
                ) : notif.type === 'volunteer' ? (
                  <View style={[styles.iconBox, { backgroundColor: colors.surface3 }]}>
                    <Ionicons name="person" size={18} color={colors.teal} />
                  </View>
                ) : notif.type === 'system' ? (
                  <View style={[styles.iconBox, { backgroundColor: colors.surface3 }]}>
                    <Ionicons name="settings-outline" size={18} color={colors.muted} />
                  </View>
                ) : null}

                {/* Content */}
                <View style={styles.notifContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notifTitle}>
                      {notif.type === 'social' ? (
                        <Text style={{ color: colors.coral }}>{notif.title}</Text>
                      ) : notif.type === 'achievement' ? (
                        <Text style={{ color: colors.gold, fontStyle: 'italic' }}>{notif.title}</Text>
                      ) : notif.title}
                    </Text>
                    <Text style={styles.notifTime}>{notif.time}</Text>
                  </View>
                  {notif.body ? <Text style={styles.notifBody}>{notif.body}</Text> : null}
                </View>

                {/* XP badge for achievement */}
                {notif.xp ? (
                  <Text style={styles.xpBadge}>+{notif.xp}</Text>
                ) : null}

                {/* Download for system */}
                {notif.type === 'system' && (
                  <Ionicons name="download-outline" size={20} color={colors.muted} style={{ marginLeft: 4 }} />
                )}
              </View>

              {/* Action buttons */}
              {notif.actions && (
                <View style={styles.actionsRow}>
                  {notif.actions.map((action, idx) => (
                    <Pressable
                      key={idx}
                      style={[
                        styles.actionBtn,
                        action.style === 'fill'
                          ? { backgroundColor: action.color }
                          : { borderWidth: 1, borderColor: action.color },
                      ]}
                      onPress={() => Haptics.selectionAsync()}
                    >
                      <Text style={[styles.actionBtnText, action.style === 'outline' && { color: action.color }]}>
                        {action.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  headerTitle: { fontFamily: fonts.body, fontSize: 28, fontWeight: '900', color: colors.coral, letterSpacing: 1 },
  headerShape: { fontFamily: fonts.mono, fontSize: 20, color: colors.coral },

  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.coral },
  tabText: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '600', color: colors.muted, letterSpacing: 0.5 },
  tabTextActive: { color: colors.coral },

  notifCard: {
    paddingHorizontal: 16, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  notifPriority: {
    backgroundColor: colors.surface2,
    borderLeftWidth: 4, borderLeftColor: colors.coral,
  },
  notifAchievement: {
    backgroundColor: colors.gold + '08',
    borderLeftWidth: 4, borderLeftColor: colors.gold,
  },
  priorityLabel: {
    fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.coral,
    letterSpacing: 1.5, marginBottom: 8,
  },

  notifRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatarWrap: { position: 'relative' },
  onlineDot: {
    position: 'absolute', bottom: 0, left: 0,
    width: 10, height: 10, borderRadius: 5, backgroundColor: colors.teal,
    borderWidth: 2, borderColor: colors.surface,
  },
  iconBox: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  notifContent: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  notifTitle: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, flex: 1, lineHeight: 18 },
  notifTime: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, marginLeft: 8 },
  notifBody: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, lineHeight: 18 },

  xpBadge: { fontFamily: fonts.mono, fontSize: 18, fontWeight: '700', color: colors.gold },

  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 14, paddingLeft: 52 },
  actionBtn: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  actionBtnText: { fontFamily: fonts.body, fontSize: 12, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
});
