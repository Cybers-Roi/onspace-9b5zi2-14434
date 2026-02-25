import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { colors, fonts, eventTypeConfig, glowShadow } from '../../constants/theme';
import { PLAYER_NUMBER, PLAYER_AVATAR } from '../../constants/config';
import { events, stories, EventItem, StoryItem } from '../../services/mockData';
import { HexAvatar } from '../../components/ui/HexAvatar';
import { useApp } from '../../contexts/AppContext';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function StoryBarItem({ item }: { item: StoryItem }) {
  const ringColor = item.isAdd ? colors.coral :
    item.isLive ? colors.coral :
    item.isVerified ? colors.teal :
    item.isSponsor ? colors.gold : colors.border;

  return (
    <Pressable style={styles.storyItem}>
      {item.isAdd ? (
        <View style={[styles.storyAvatar, { borderColor: colors.coral, borderStyle: 'dashed' }]}>
          <Text style={styles.storyAddIcon}>+</Text>
        </View>
      ) : (
        <View style={[styles.storyAvatar, { borderColor: ringColor }]}>
          <Image source={{ uri: item.avatar }} style={styles.storyImage} />
        </View>
      )}
      <Text style={styles.storyName} numberOfLines={1}>{item.name}</Text>
    </Pressable>
  );
}

function EventCard({ item }: { item: EventItem }) {
  const router = useRouter();
  const { registeredEvents, registerForEvent, savedEvents, saveEvent, unsaveEvent, addXP } = useApp();
  const isRegistered = registeredEvents.includes(item.id);
  const isSaved = savedEvents.includes(item.id);
  const typeConfig = eventTypeConfig[item.type];
  const capacityPercent = (item.registered / item.capacity) * 100;
  const capacityColor = capacityPercent < 60 ? colors.teal : capacityPercent < 85 ? colors.gold : colors.coral;
  const btnScale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({ transform: [{ scale: btnScale.value }] }));

  const handleRegister = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    btnScale.value = withSequence(withSpring(0.9), withSpring(1.05), withSpring(1));
    registerForEvent(item.id);
    addXP(item.xpReward);
  };

  const handleSave = () => {
    Haptics.selectionAsync();
    if (isSaved) unsaveEvent(item.id); else saveEvent(item.id);
  };

  return (
    <Pressable
      style={[styles.eventCard, { borderLeftColor: typeConfig.color }]}
      onPress={() => router.push(`/event/${item.id}`)}
    >
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: item.image }} style={styles.eventImage} contentFit="cover" />
        <View style={styles.imageOverlay} />
        <View style={[styles.typeBadge, { borderColor: typeConfig.color }]}>
          <Text style={[styles.typeBadgeText, { color: typeConfig.color }]}>
            {typeConfig.symbol} {typeConfig.label}
          </Text>
        </View>
        <View style={[styles.countdownBadge, item.isLive && styles.liveBadge]}>
          <Text style={styles.countdownText}>
            {item.isLive ? '● LIVE' : item.countdown}
          </Text>
        </View>
      </View>

      <View style={styles.eventBody}>
        <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.organizerRow}>
          <HexAvatar uri={item.orgAvatar} size={20} borderColor={colors.teal} borderWidth={1} />
          <Text style={styles.organizerName}>{item.organizer}</Text>
          {item.orgVerified && (
            <Text style={styles.verifiedBadge}>✓</Text>
          )}
        </View>

        <View style={styles.signalsRow}>
          {item.signals.map((signal, idx) => (
            <View key={idx} style={[styles.signalChip, { borderColor: signal.color + '40' }]}>
              <Text style={[styles.signalText, { color: signal.color }]} numberOfLines={1}>
                {signal.text}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.capacitySection}>
          <Text style={styles.capacityLabel}>CAPACITY STATUS</Text>
          <Text style={[styles.capacityCount, { color: capacityColor }]}>
            {item.registered} / {item.capacity} SPOTS
          </Text>
        </View>
        <View style={styles.capacityBarBg}>
          <View style={[styles.capacityBarFill, { width: `${capacityPercent}%`, backgroundColor: capacityColor }]} />
        </View>

        <View style={styles.actionBar}>
          <Animated.View style={btnStyle}>
            <Pressable
              style={[styles.registerBtn, isRegistered && styles.registeredBtn]}
              onPress={handleRegister}
              disabled={isRegistered}
            >
              <Text style={[styles.registerBtnText, isRegistered && styles.registeredBtnText]}>
                {isRegistered ? `YOU'RE IN ✓` : `REGISTER ${typeConfig.symbol}`}
              </Text>
            </Pressable>
          </Animated.View>
          <View style={styles.actionIcons}>
            <Pressable style={styles.actionIconBtn} onPress={handleSave}>
              <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={20} color={isSaved ? colors.gold : colors.white} />
            </Pressable>
            <Pressable style={styles.actionIconBtn}>
              <Ionicons name="share-outline" size={20} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const router2 = useRouter();
  const { feedFilter, setFeedFilter } = useApp();
  const filters: Array<{ key: 'local' | 'national' | 'international'; label: string; symbol: string }> = [
    { key: 'local', label: 'LOCAL', symbol: '○' },
    { key: 'national', label: 'NATIONAL', symbol: '△' },
    { key: 'international', label: 'INTERNATIONAL', symbol: '□' },
  ];

  const renderEvent = useCallback(({ item }: { item: EventItem }) => (
    <EventCard item={item} />
  ), []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoArea}>
          <View style={styles.logoShapes}>
            <View style={[styles.logoShape, styles.logoCircle]} />
            <View style={styles.logoTriangle} />
            <View style={[styles.logoShape, styles.logoSquare]} />
          </View>
          <Text style={styles.logoText}>EVENTFY</Text>
        </View>
        <Pressable style={styles.searchBar}>
          <Ionicons name="search" size={16} color={colors.muted} />
          <Text style={styles.searchPlaceholder}>Search...</Text>
        </Pressable>
        <View style={styles.topBarRight}>
          <Pressable style={styles.notifBtn} onPress={() => router2.push('/notifications')}>
            <View style={styles.notifIcon}>
              <Ionicons name="notifications-outline" size={20} color={colors.white} />
            </View>
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>5</Text>
            </View>
          </Pressable>
          <View style={styles.topAvatar}>
            <HexAvatar uri={PLAYER_AVATAR} size={32} borderColor={colors.coral} borderWidth={2} />
            <Text style={styles.playerTag}>{PLAYER_NUMBER}</Text>
          </View>
        </View>
      </View>

      <FlashList
        data={events}
        renderItem={renderEvent}
        estimatedItemSize={500}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        ListHeaderComponent={() => (
          <View>
            {/* Story Bar */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storyBarContent}
              style={styles.storyBar}
            >
              {stories.map(story => (
                <StoryBarItem key={story.id} item={story} />
              ))}
            </ScrollView>

            {/* Feed Filter Toggle */}
            <View style={styles.filterRow}>
              {filters.map(f => (
                <Pressable
                  key={f.key}
                  style={[styles.filterPill, feedFilter === f.key && styles.filterPillActive]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setFeedFilter(f.key);
                  }}
                >
                  <Text style={[styles.filterPillText, feedFilter === f.key && styles.filterPillTextActive]}>
                    {f.label} {f.symbol}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />

      {/* FAB */}
      <Pressable style={[styles.fab, glowShadow(colors.coral, 0.4)]}>
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoShapes: {
    gap: 2,
    alignItems: 'center',
  },
  logoShape: {},
  logoCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.coral,
  },
  logoTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.gold,
  },
  logoSquare: {
    width: 6,
    height: 6,
    backgroundColor: colors.white,
  },
  logoText: {
    fontFamily: fonts.mono,
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 1,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  searchPlaceholder: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notifBtn: {
    position: 'relative',
  },
  notifIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.coral,
    borderRadius: 7,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '700',
  },
  topAvatar: {
    alignItems: 'center',
  },
  playerTag: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.coral,
    marginTop: 2,
  },
  // Story Bar
  storyBar: {
    marginBottom: 12,
  },
  storyBarContent: {
    paddingHorizontal: 16,
    gap: 14,
  },
  storyItem: {
    alignItems: 'center',
    width: 64,
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  storyAddIcon: {
    fontSize: 24,
    color: colors.coral,
    fontWeight: '300',
  },
  storyName: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center',
  },
  // Filter Row
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  filterPillActive: {
    backgroundColor: colors.coral,
    borderColor: colors.coral,
  },
  filterPillText: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    letterSpacing: 0.5,
  },
  filterPillTextActive: {
    color: colors.white,
  },
  // Event Card
  eventCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.surface2,
    borderLeftWidth: 2,
    overflow: 'hidden',
  },
  eventImageContainer: {
    position: 'relative',
    height: 200,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  countdownBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.coral,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveBadge: {
    backgroundColor: colors.coral,
  },
  countdownText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  eventBody: {
    padding: 14,
  },
  eventTitle: {
    fontFamily: fonts.body,
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
    lineHeight: 26,
    marginBottom: 8,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  organizerName: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
  },
  verifiedBadge: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.teal,
    fontWeight: '700',
  },
  signalsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  signalChip: {
    borderWidth: 1,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxWidth: SCREEN_WIDTH * 0.55,
  },
  signalText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '600',
  },
  capacitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  capacityLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 0.5,
  },
  capacityCount: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  capacityBarBg: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 14,
  },
  capacityBarFill: {
    height: 4,
    borderRadius: 2,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerBtn: {
    backgroundColor: colors.coral,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 0,
  },
  registeredBtn: {
    backgroundColor: colors.teal,
  },
  registerBtnText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  registeredBtnText: {
    fontFamily: fonts.mono,
    fontSize: 12,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontFamily: fonts.body,
    fontSize: 28,
    fontWeight: '300',
    color: colors.white,
    marginTop: -2,
  },
});
