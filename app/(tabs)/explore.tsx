import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, eventTypeConfig } from '../../constants/theme';
import { events, organizations, trendingSkills } from '../../services/mockData';
import { HexAvatar } from '../../components/ui/HexAvatar';
import { useApp } from '../../contexts/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

const filterChips = [
  { key: 'all', label: 'ALL', symbol: '○', color: colors.coral },
  { key: 'sport', label: 'SPORT', symbol: '△', color: colors.coral },
  { key: 'science', label: 'SCIENCE', symbol: '□', color: colors.teal },
  { key: 'charity', label: 'CHARITY', symbol: '◇', color: colors.gold },
  { key: 'cultural', label: 'CULTURAL', symbol: '○', color: colors.neonPink },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { followedOrgs, followOrg, unfollowOrg } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const trending = events.slice(0, 4);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="SEARCH THE ARENA..."
            placeholderTextColor={colors.muted}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText('')}>
              <Ionicons name="close" size={18} color={colors.muted} />
            </Pressable>
          )}
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
          style={styles.chipsBar}
        >
          {filterChips.map(chip => (
            <Pressable
              key={chip.key}
              style={[styles.chip, activeFilter === chip.key && { backgroundColor: chip.color, borderColor: chip.color }]}
              onPress={() => {
                Haptics.selectionAsync();
                setActiveFilter(chip.key);
              }}
            >
              <Text style={[styles.chipText, activeFilter === chip.key && styles.chipTextActive]}>
                {chip.symbol} {chip.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Trending Now */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            <Text style={{ color: colors.coral }}>TRENDING NOW</Text> ○
          </Text>
          <Ionicons name="trending-up" size={18} color={colors.coral} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingScroll}
        >
          {trending.map(event => {
            const typeConfig = eventTypeConfig[event.type];
            return (
              <Pressable
                key={event.id}
                style={styles.trendingCard}
                onPress={() => router.push(`/event/${event.id}`)}
              >
                <Image source={{ uri: event.image }} style={styles.trendingImage} contentFit="cover" />
                <View style={[styles.trendingBadge, { borderColor: typeConfig.color }]}>
                  <Text style={[styles.trendingBadgeText, { color: typeConfig.color }]}>
                    {typeConfig.symbol} {typeConfig.label}
                  </Text>
                </View>
                <Text style={styles.trendingTitle} numberOfLines={2}>{event.title}</Text>
                <Text style={styles.trendingViews}>↗ +{Math.floor(Math.random() * 2000)} VIEWS</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Top Organizations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TOP ORGANIZATIONS △</Text>
        </View>
        <View style={styles.orgGrid}>
          {organizations.map(org => {
            const isFollowed = followedOrgs.includes(org.id);
            return (
              <Pressable
                key={org.id}
                style={styles.orgCard}
                onPress={() => router.push(`/org/${org.id}`)}
              >
                <View style={styles.orgLogoWrap}>
                  <HexAvatar uri={org.logo} size={52} borderColor={org.verified ? colors.teal : colors.border} borderWidth={2} />
                  {org.verified && (
                    <Text style={styles.orgVerified}>✓</Text>
                  )}
                </View>
                <Text style={styles.orgName} numberOfLines={1}>{org.name}</Text>
                {org.verified && <Text style={styles.orgVerifiedLabel}>✓</Text>}
                <Pressable
                  style={[styles.followBtn, isFollowed && styles.followedBtn]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    isFollowed ? unfollowOrg(org.id) : followOrg(org.id);
                  }}
                >
                  <Text style={[styles.followBtnText, isFollowed && styles.followedBtnText]}>
                    {isFollowed ? 'FOLLOWING ✓' : 'FOLLOW +'}
                  </Text>
                </Pressable>
              </Pressable>
            );
          })}
        </View>

        {/* Skills In Demand */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SKILLS IN DEMAND □</Text>
        </View>
        <View style={styles.skillsCloud}>
          {trendingSkills.map((skill, idx) => (
            <Pressable
              key={idx}
              style={[styles.skillTag, {
                borderColor: skill.color + '60',
                paddingHorizontal: skill.size === 'large' ? 18 : skill.size === 'medium' ? 14 : 10,
                paddingVertical: skill.size === 'large' ? 10 : skill.size === 'medium' ? 8 : 6,
              }]}
            >
              <Text style={[styles.skillTagText, {
                color: skill.color,
                fontSize: skill.size === 'large' ? 15 : skill.size === 'medium' ? 12 : 10,
                fontWeight: skill.size === 'large' ? '800' : '600',
              }]}>
                {skill.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface2,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.white,
    padding: 0,
  },
  chipsBar: {
    marginTop: 14,
    marginBottom: 4,
  },
  chipsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  chipTextActive: {
    color: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: fonts.body,
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  trendingScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  trendingCard: {
    width: 180,
    backgroundColor: colors.surface2,
    overflow: 'hidden',
  },
  trendingImage: {
    width: 180,
    height: 120,
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  trendingBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: '700',
  },
  trendingTitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    paddingHorizontal: 10,
    paddingTop: 8,
    lineHeight: 17,
  },
  trendingViews: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.coral,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
  },
  orgGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  orgCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    alignItems: 'center',
  },
  orgLogoWrap: {
    position: 'relative',
    marginBottom: 10,
  },
  orgVerified: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.teal,
    color: colors.base,
    fontSize: 10,
    fontWeight: '700',
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  orgName: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  orgVerifiedLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.teal,
    marginBottom: 10,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: colors.teal,
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followedBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.teal,
  },
  followBtnText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '700',
    color: colors.teal,
  },
  followedBtnText: {
    color: colors.teal,
  },
  skillsCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  skillTag: {
    borderWidth: 1,
    borderRadius: 9999,
  },
  skillTagText: {
    fontFamily: fonts.body,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
