import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { colors, fonts, eventTypeConfig } from '../../constants/theme';
import { events, EventItem } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';

type SubTab = 'upcoming' | 'registered' | 'saved';

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { registeredEvents, savedEvents } = useApp();
  const [subTab, setSubTab] = useState<SubTab>('upcoming');

  const tabs: { key: SubTab; label: string; symbol: string }[] = [
    { key: 'upcoming', label: 'UPCOMING', symbol: '○' },
    { key: 'registered', label: 'REGISTERED', symbol: '△' },
    { key: 'saved', label: 'SAVED', symbol: '□' },
  ];

  const filteredEvents = (() => {
    switch (subTab) {
      case 'registered':
        return events.filter(e => registeredEvents.includes(e.id));
      case 'saved':
        return events.filter(e => savedEvents.includes(e.id));
      default:
        return events.slice(0, 8);
    }
  })();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MY EVENTS □</Text>
        <Text style={styles.headerSub}>YOUR ARENAS</Text>
      </View>

      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <Pressable
            key={tab.key}
            style={[styles.tab, subTab === tab.key && styles.tabActive]}
            onPress={() => setSubTab(tab.key)}
          >
            <Text style={[styles.tabText, subTab === tab.key && styles.tabTextActive]}>
              {tab.symbol} {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80, paddingHorizontal: 16 }}
      >
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyShape}>
              <Text style={styles.emptyShapeText}>□</Text>
            </View>
            <Text style={styles.emptyTitle}>
              {subTab === 'registered' ? 'NO REGISTRATIONS YET' :
               subTab === 'saved' ? 'NOTHING SAVED' : 'NO UPCOMING EVENTS'}
            </Text>
            <Text style={styles.emptyDesc}>
              {subTab === 'registered' ? 'Register for events from the feed to see them here.' :
               subTab === 'saved' ? 'Bookmark events to save them for later.' :
               'Check back soon for new events.'}
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredEvents.map(event => {
              const typeConfig = eventTypeConfig[event.type];
              return (
                <Pressable
                  key={event.id}
                  style={styles.miniCard}
                  onPress={() => router.push(`/event/${event.id}`)}
                >
                  <Image source={{ uri: event.image }} style={styles.miniImage} contentFit="cover" />
                  <View style={[styles.miniBadge, { borderColor: typeConfig.color }]}>
                    <Text style={[styles.miniBadgeText, { color: typeConfig.color }]}>
                      {typeConfig.symbol}
                    </Text>
                  </View>
                  <View style={styles.miniBody}>
                    <Text style={styles.miniTitle} numberOfLines={2}>{event.title}</Text>
                    <Text style={styles.miniDate}>{event.date}</Text>
                    <View style={[styles.miniXP, { backgroundColor: typeConfig.color + '20' }]}>
                      <Text style={[styles.miniXPText, { color: typeConfig.color }]}>+{event.xpReward} XP</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: fonts.body,
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1,
  },
  headerSub: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1,
    marginTop: 2,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.coral,
    borderColor: colors.coral,
  },
  tabText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '700',
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.white,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  miniCard: {
    width: '48%',
    backgroundColor: colors.surface2,
    overflow: 'hidden',
  },
  miniImage: {
    width: '100%',
    height: 100,
  },
  miniBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  miniBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '700',
  },
  miniBody: {
    padding: 10,
  },
  miniTitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 16,
    marginBottom: 4,
  },
  miniDate: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginBottom: 6,
  },
  miniXP: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  miniXPText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyShape: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyShapeText: {
    fontSize: 32,
    color: colors.muted,
  },
  emptyTitle: {
    fontFamily: fonts.body,
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  emptyDesc: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },
});
