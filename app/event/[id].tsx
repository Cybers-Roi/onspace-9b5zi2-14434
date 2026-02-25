import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { colors, fonts, eventTypeConfig, glowShadow } from '../../constants/theme';
import { events } from '../../services/mockData';
import { HexAvatar } from '../../components/ui/HexAvatar';
import { useApp } from '../../contexts/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type DetailTab = 'info' | 'community' | 'volunteers' | 'sponsors';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { registeredEvents, registerForEvent, savedEvents, saveEvent, unsaveEvent, addXP } = useApp();
  const [activeTab, setActiveTab] = useState<DetailTab>('info');
  const btnScale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({ transform: [{ scale: btnScale.value }] }));

  const event = events.find(e => e.id === id);
  if (!event) return null;

  const typeConfig = eventTypeConfig[event.type];
  const isRegistered = registeredEvents.includes(event.id);
  const isSaved = savedEvents.includes(event.id);
  const capacityPercent = (event.registered / event.capacity) * 100;

  const handleRegister = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    btnScale.value = withSequence(withSpring(0.92), withSpring(1.05), withSpring(1));
    registerForEvent(event.id);
    addXP(event.xpReward);
  };

  const tabs: { key: DetailTab; label: string; symbol: string }[] = [
    { key: 'info', label: 'INFO', symbol: '○' },
    { key: 'community', label: 'COMMUNITY', symbol: '△' },
    { key: 'volunteers', label: 'VOLUNTEERS', symbol: '□' },
    { key: 'sponsors', label: 'SPONSORS', symbol: '◇' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: event.image }} style={styles.heroImage} contentFit="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(10,10,15,0.4)', 'rgba(10,10,15,0.95)', colors.surface]}
            style={styles.heroGradient}
          />

          {/* Navigation */}
          <View style={[styles.navRow, { top: insets.top + 8 }]}>
            <Pressable style={styles.navBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
            <View style={styles.navRight}>
              <Pressable style={styles.navBtn} onPress={() => { Haptics.selectionAsync(); isSaved ? unsaveEvent(event.id) : saveEvent(event.id); }}>
                <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={20} color={isSaved ? colors.gold : colors.white} />
              </Pressable>
              <Pressable style={styles.navBtn}>
                <Ionicons name="share-outline" size={20} color={colors.white} />
              </Pressable>
            </View>
          </View>

          {/* Hero Content */}
          <View style={styles.heroContent}>
            <View style={[styles.heroTypeBadge, { borderColor: typeConfig.color }]}>
              <Text style={[styles.heroTypeBadgeText, { color: typeConfig.color }]}>
                {typeConfig.symbol} {typeConfig.label}
              </Text>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
            <View style={styles.heroOrgRow}>
              <HexAvatar uri={event.orgAvatar} size={24} borderColor={colors.teal} borderWidth={1} />
              <Text style={styles.heroOrgLabel}>ORGANIZED BY</Text>
              <Text style={styles.heroOrgName}>{event.organizer}</Text>
              {event.orgVerified && <Text style={styles.heroVerified}>✓</Text>}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <Pressable
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabIcon, activeTab === tab.key && { color: typeConfig.color }]}>
                {tab.symbol}
              </Text>
              <Text style={[styles.tabText, activeTab === tab.key && { color: typeConfig.color }]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'info' && (
            <View>
              {/* Description */}
              <Text style={styles.description}>{event.description}</Text>

              {/* Info Row */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>○</Text>
                  <Text style={styles.infoText}>{event.city}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>△</Text>
                  <Text style={styles.infoText}>{event.date} · {event.time}</Text>
                </View>
              </View>

              {/* === SPORT CONTENT === */}
              {event.type === 'sport' && event.teamA && event.teamB && (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>MATCH DETAILS ○</Text>
                    <Text style={styles.sectionSub}>{event.round}</Text>
                  </View>
                  <View style={styles.matchCard}>
                    <View style={styles.teamCol}>
                      <View style={[styles.teamLogo, { borderColor: colors.teal }]}>
                        <Text style={styles.teamLogoText}>⚡</Text>
                      </View>
                      <Text style={styles.teamName}>{event.teamA}</Text>
                    </View>
                    <View style={styles.vsSection}>
                      <Text style={styles.scoreText}>
                        {event.scoreA ?? 0}
                        <Text style={styles.vsDash}> — </Text>
                        {event.scoreB ?? 0}
                      </Text>
                      <Text style={styles.missionActive}>MISSION ACTIVE</Text>
                    </View>
                    <View style={styles.teamCol}>
                      <View style={[styles.teamLogo, { borderColor: colors.coral }]}>
                        <Text style={styles.teamLogoText}>🛡️</Text>
                      </View>
                      <Text style={styles.teamName}>{event.teamB}</Text>
                    </View>
                  </View>
                  <Pressable style={[styles.tealBtn, { marginTop: 16 }]}>
                    <Text style={styles.tealBtnText}>JOIN A TEAM △</Text>
                  </Pressable>

                  <Text style={[styles.sectionTitle, { marginTop: 24 }]}>CONFIRMED ROSTER</Text>
                  <View style={styles.rosterRow}>
                    {[1, 2, 3, 4].map(i => (
                      <HexAvatar key={i} uri={`https://images.unsplash.com/photo-${1494790108377 + i * 10000}-be9c29b29330?w=60&h=60&fit=crop&crop=face`} size={36} borderColor={colors.teal} borderWidth={1} />
                    ))}
                    <View style={styles.rosterMore}>
                      <Text style={styles.rosterMoreText}>+42</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* === SCIENCE CONTENT === */}
              {event.type === 'science' && (
                <View>
                  {event.callForPapers && (
                    <View style={styles.cfpCard}>
                      <View style={styles.cfpHeader}>
                        <View>
                          <Text style={styles.cfpTitle}>CALL FOR PAPERS △</Text>
                          <Text style={[styles.cfpStatus, { color: event.cfpStatus === 'OPEN' ? colors.teal : colors.coral }]}>
                            {event.cfpStatus === 'OPEN' ? 'OPEN ✓' : 'CLOSED ✗'}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.cfpDeadlineLabel}>MISSION DEADLINE</Text>
                          <Text style={styles.cfpDeadline}>CLOSES IN: {event.cfpDeadline}</Text>
                        </View>
                      </View>
                      <Pressable style={styles.submitBtn}>
                        <Text style={styles.submitBtnText}>SUBMIT ABSTRACT □</Text>
                      </Pressable>
                    </View>
                  )}

                  {event.speakers && event.speakers.length > 0 && (
                    <View>
                      <Text style={styles.sectionTitle}>KEYNOTE SPEAKERS</Text>
                      <View style={styles.speakersGrid}>
                        {event.speakers.map((speaker, idx) => (
                          <View key={idx} style={styles.speakerCard}>
                            <HexAvatar uri={speaker.avatar} size={64} borderColor={colors.teal} borderWidth={2} />
                            <Text style={styles.speakerName}>{speaker.name} △</Text>
                            <Text style={styles.speakerTitle}>{speaker.title}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {event.doiLinks && event.doiLinks.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                      <Text style={styles.sectionTitle}>DOI RESOURCES</Text>
                      {event.doiLinks.map((doi, idx) => (
                        <View key={idx} style={styles.doiRow}>
                          <Text style={styles.doiText}>{doi}</Text>
                          <View style={styles.doiIcon}>
                            <Text style={{ color: colors.white, fontSize: 12 }}>□</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* === CHARITY CONTENT === */}
              {event.type === 'charity' && event.fundraisingGoal && (
                <View>
                  <View style={styles.fundraiseCard}>
                    <Text style={styles.fundraiseAmount}>
                      DZD {(event.fundraisingCurrent ?? 0).toLocaleString()}
                    </Text>
                    <Text style={styles.fundraiseGoal}>
                      of DZD {event.fundraisingGoal.toLocaleString()} goal
                    </Text>
                    <Text style={styles.fundraisePct}>
                      {Math.round(((event.fundraisingCurrent ?? 0) / event.fundraisingGoal) * 100)}%
                    </Text>
                    <View style={styles.fundraiseBarBg}>
                      <View style={[styles.fundraiseBarFill, {
                        width: `${Math.min(((event.fundraisingCurrent ?? 0) / event.fundraisingGoal) * 100, 100)}%`,
                      }]} />
                    </View>
                    <Text style={styles.fundraiseLabel}>MISSION GOAL PROGRESS</Text>
                  </View>
                  <Pressable style={styles.donateBtn}>
                    <Text style={styles.donateBtnText}>DONATE ◇</Text>
                  </Pressable>

                  {event.volunteerShifts && event.volunteerShifts.length > 0 && (
                    <View style={{ marginTop: 24 }}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>VOLUNTEER SHIFTS</Text>
                        <Text style={styles.viewAll}>VIEW ALL</Text>
                      </View>
                      {event.volunteerShifts.map((shift, idx) => (
                        <View key={idx} style={styles.shiftCard}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.shiftRole}>{shift.role}</Text>
                            <Text style={styles.shiftTime}>{shift.time}</Text>
                            <View style={styles.shiftSkills}>
                              {shift.skills.map((skill, i) => (
                                <View key={i} style={styles.shiftSkillChip}>
                                  <Text style={styles.shiftSkillText}>{skill}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                          <View style={[styles.slotsBadge, {
                            backgroundColor: shift.slotsFilled >= shift.slotsTotal ? colors.coral + '20' : colors.teal + '20',
                          }]}>
                            <Text style={[styles.slotsBadgeText, {
                              color: shift.slotsFilled >= shift.slotsTotal ? colors.coral : colors.teal,
                            }]}>
                              {shift.slotsFilled >= shift.slotsTotal
                                ? 'FULL ✗'
                                : `${shift.slotsFilled}/${shift.slotsTotal} OPEN`}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* === CULTURAL CONTENT === */}
              {event.type === 'cultural' && (
                <View>
                  {event.performers && event.performers.length > 0 && (
                    <View>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>THE LINEUP</Text>
                        <Text style={styles.viewAll}>{event.performers.length.toString().padStart(2, '0')} PERFORMERS</Text>
                      </View>
                      {event.performers.map((performer, idx) => (
                        <View key={idx} style={styles.performerRow}>
                          <HexAvatar uri={performer.avatar} size={44} borderColor={colors.neonPink} borderWidth={2} />
                          <View style={{ flex: 1 }}>
                            <Text style={styles.performerName}>{performer.name}</Text>
                            <Text style={styles.performerStage}>{performer.stage}</Text>
                          </View>
                          <View style={styles.performerTime}>
                            <Text style={styles.performerTimeText}>{performer.time}</Text>
                            <View style={[styles.performerTimeDot, { backgroundColor: colors.neonPink }]} />
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {event.ticketTiers && event.ticketTiers.length > 0 && (
                    <View style={{ marginTop: 24 }}>
                      <Text style={styles.sectionTitle}>ACCESS TIERS</Text>
                      {event.ticketTiers.map((tier, idx) => (
                        <View key={idx} style={[styles.tierCard, idx === 1 && styles.tierRecommended]}>
                          {idx === 1 && (
                            <View style={styles.recommendedBadge}>
                              <Text style={styles.recommendedText}>RECOMMENDED</Text>
                            </View>
                          )}
                          <View style={styles.tierHeader}>
                            <View>
                              <Text style={styles.tierShape}>{tier.shape} {tier.name}</Text>
                              {idx === 1 && <Text style={styles.tierExclusive}>EXCLUSIVE ACCESS</Text>}
                            </View>
                            <Text style={styles.tierPrice}>DZD {tier.price.toLocaleString()}</Text>
                          </View>
                          {tier.perks.map((perk, i) => (
                            <Text key={i} style={styles.tierPerk}>• {perk}</Text>
                          ))}
                          <Pressable style={[styles.selectBtn, idx === 1 && styles.selectBtnGold]}>
                            <Text style={[styles.selectBtnText, idx === 1 && { color: colors.base }]}>
                              SELECT {tier.shape}
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* Mission Reward */}
              <View style={[styles.rewardCard, { borderColor: typeConfig.color }]}>
                <View style={styles.rewardLeft}>
                  <Text style={styles.rewardLabel}>MISSION REWARD</Text>
                  <Text style={styles.rewardXP}>+{event.xpReward} XP</Text>
                  {event.badgeReward && (
                    <Text style={styles.rewardBadge}>UNLOCKED: {event.badgeReward.toUpperCase()} △</Text>
                  )}
                </View>
                <View style={styles.rewardIcon}>
                  <Text style={{ fontSize: 24 }}>🏆</Text>
                </View>
              </View>

              {/* Location */}
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
                {event.type === 'sport' ? 'ARENA LOCATION' : 'MISSION LOCATION'}
              </Text>
              <View style={styles.mapPlaceholder}>
                <View style={styles.mapPin}>
                  <Text style={{ color: typeConfig.color, fontSize: 18 }}>{typeConfig.symbol}</Text>
                </View>
                <Text style={styles.mapLabel}>{event.location}</Text>
              </View>
              <Text style={styles.locationAddress}>📍 {event.location}, {event.city}</Text>
            </View>
          )}

          {activeTab === 'community' && (
            <View>
              <Text style={styles.sectionTitle}>LOBBY CHAT △</Text>
              <View style={styles.chatPreview}>
                <Text style={styles.chatBlurText}>Join to see messages from 487 players...</Text>
                <Pressable style={styles.joinChatBtn}>
                  <Text style={styles.joinChatBtnText}>JOIN LOBBY CHAT ○</Text>
                </Pressable>
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>FRIENDS ATTENDING</Text>
              <View style={styles.friendsRow}>
                <Text style={styles.friendsText}>○ Ali, Sarah, Omar + 23 others are going.</Text>
              </View>
              <View style={styles.avatarCluster}>
                {[1, 2, 3].map(i => (
                  <View key={i} style={[styles.clusterAvatar, { marginLeft: i > 1 ? -12 : 0, zIndex: 4 - i }]}>
                    <HexAvatar uri={`https://images.unsplash.com/photo-${1494790108377 + i * 12345}-be9c29b29330?w=60&h=60&fit=crop&crop=face`} size={32} borderColor={colors.coral} borderWidth={1} />
                  </View>
                ))}
                <Text style={styles.clusterCount}>+23</Text>
              </View>
            </View>
          )}

          {activeTab === 'volunteers' && (
            <View>
              <Text style={styles.sectionTitle}>VOLUNTEER ROLES □</Text>
              {(event.volunteerShifts || [
                { role: 'Registration', time: '08:00 - 12:00', slotsTotal: 5, slotsFilled: 3, skills: ['Communication'] },
                { role: 'Technical Support', time: '08:00 - 18:00', slotsTotal: 3, slotsFilled: 1, skills: ['IT', 'Networking'] },
                { role: 'Media Coverage', time: '09:00 - 17:00', slotsTotal: 4, slotsFilled: 4, skills: ['Photography'] },
              ]).map((shift, idx) => (
                <View key={idx} style={styles.volCard}>
                  <Text style={styles.volRole}>{shift.role}</Text>
                  <Text style={styles.volTime}>{shift.time}</Text>
                  <View style={styles.volSkills}>
                    {shift.skills.map((skill, i) => (
                      <View key={i} style={styles.volSkillChip}>
                        <Text style={styles.volSkillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.volBottom}>
                    <Text style={[styles.volSlots, {
                      color: shift.slotsFilled >= shift.slotsTotal ? colors.coral : colors.teal,
                    }]}>
                      {shift.slotsFilled >= shift.slotsTotal ? 'FULL ✗' : `${shift.slotsFilled}/${shift.slotsTotal} OPEN`}
                    </Text>
                    <Pressable style={[styles.applyBtn, shift.slotsFilled >= shift.slotsTotal && styles.applyBtnDisabled]}>
                      <Text style={styles.applyBtnText}>
                        {shift.slotsFilled >= shift.slotsTotal ? 'FULL' : 'APPLY △'}
                      </Text>
                    </Pressable>
                  </View>
                  <Text style={styles.volPerks}>
                    Free access ○ + +300 XP △ + Community Hero □ badge
                  </Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'sponsors' && (
            <View>
              <Text style={styles.sectionTitle}>EVENT SPONSORS ◇</Text>
              <View style={styles.sponsorTier}>
                <Text style={styles.sponsorTierLabel}>△ GOLD SPONSOR</Text>
                <View style={styles.sponsorLogo}>
                  <Text style={styles.sponsorLogoText}>TECHCORP</Text>
                </View>
              </View>
              <View style={styles.sponsorTier}>
                <Text style={[styles.sponsorTierLabel, { color: colors.muted }]}>○ SILVER SPONSOR</Text>
                <View style={styles.sponsorLogos}>
                  <View style={[styles.sponsorLogo, { width: 80 }]}>
                    <Text style={[styles.sponsorLogoText, { fontSize: 10 }]}>ALGTEL</Text>
                  </View>
                  <View style={[styles.sponsorLogo, { width: 80 }]}>
                    <Text style={[styles.sponsorLogoText, { fontSize: 10 }]}>DATACOM</Text>
                  </View>
                </View>
              </View>
              <Pressable style={styles.becomeSponsorBtn}>
                <Text style={styles.becomeSponsorText}>BECOME A SPONSOR ◇</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Register Button */}
      <Animated.View style={[styles.bottomBar, btnStyle, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.bottomActions}>
          <Pressable
            style={[styles.registerButton, isRegistered && styles.registeredButton]}
            onPress={handleRegister}
            disabled={isRegistered}
          >
            <Text style={styles.registerButtonText}>
              {isRegistered
                ? `YOU'RE IN ✓ — PLAYER ${'\u0023'}4821`
                : 'ENTER THE GAME ○'}
            </Text>
          </Pressable>
        </View>
        {isRegistered && (
          <View style={styles.bottomSecondary}>
            <Pressable 
              style={styles.secondaryActionBtn}
              onPress={() => { Haptics.selectionAsync(); router.push('/qr-checkin'); }}
            >
              <Ionicons name="qr-code-outline" size={16} color={colors.teal} />
              <Text style={styles.secondaryActionText}>CHECK IN</Text>
            </Pressable>
            <Pressable 
              style={styles.secondaryActionBtn}
              onPress={() => { Haptics.selectionAsync(); router.push('/volunteer-mode'); }}
            >
              <Ionicons name="hand-right-outline" size={16} color={colors.teal} />
              <Text style={styles.secondaryActionText}>VOLUNTEER</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  // Hero
  heroContainer: {
    height: 380,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  navRow: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  navBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRight: {
    flexDirection: 'row',
    gap: 8,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
  },
  heroTypeBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTypeBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    fontFamily: fonts.body,
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    lineHeight: 36,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  heroOrgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heroOrgLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
  },
  heroOrgName: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  heroVerified: {
    color: colors.teal,
    fontWeight: '700',
    fontSize: 14,
  },
  // Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 2,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.coral,
  },
  tabIcon: {
    fontSize: 14,
    color: colors.muted,
  },
  tabText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: '600',
    color: colors.muted,
    letterSpacing: 0.5,
  },
  tabContent: {
    padding: 16,
  },
  // Common
  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.white,
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.9,
  },
  infoRow: {
    gap: 8,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoIcon: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
  },
  infoText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  sectionSub: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
  },
  viewAll: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.teal,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  // Sport
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface2,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  teamCol: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface3,
  },
  teamLogoText: {
    fontSize: 20,
  },
  teamName: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  vsSection: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  scoreText: {
    fontFamily: fonts.mono,
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
  },
  vsDash: {
    color: colors.muted,
  },
  missionActive: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.muted,
    marginTop: 4,
    letterSpacing: 1,
  },
  tealBtn: {
    borderWidth: 1,
    borderColor: colors.teal,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tealBtnText: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '700',
    color: colors.teal,
  },
  rosterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  rosterMore: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  rosterMoreText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
  },
  // Science
  cfpCard: {
    backgroundColor: colors.surface2,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  cfpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cfpTitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  cfpStatus: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: '700',
  },
  cfpDeadlineLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.muted,
    marginBottom: 2,
  },
  cfpDeadline: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: '700',
    color: colors.coral,
  },
  submitBtn: {
    borderWidth: 1,
    borderColor: colors.coral,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitBtnText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.coral,
  },
  speakersGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  speakerCard: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 64) / 2,
    marginBottom: 12,
  },
  speakerName: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    marginTop: 8,
  },
  speakerTitle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginTop: 2,
  },
  doiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface2,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  doiText: {
    flex: 1,
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
  },
  doiIcon: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Charity
  fundraiseCard: {
    backgroundColor: colors.surface2,
    padding: 20,
    marginBottom: 16,
  },
  fundraiseAmount: {
    fontFamily: fonts.mono,
    fontSize: 28,
    fontWeight: '700',
    color: colors.gold,
  },
  fundraiseGoal: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  fundraisePct: {
    fontFamily: fonts.body,
    fontSize: 36,
    fontWeight: '800',
    color: colors.coral,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  fundraiseBarBg: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 0,
    marginTop: 16,
    overflow: 'hidden',
  },
  fundraiseBarFill: {
    height: 10,
    backgroundColor: colors.coral,
  },
  fundraiseLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  donateBtn: {
    backgroundColor: colors.gold,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  donateBtnText: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '800',
    color: colors.base,
    letterSpacing: 1,
  },
  shiftCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface2,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shiftRole: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  shiftTime: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  shiftSkills: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  shiftSkillChip: {
    backgroundColor: colors.surface3,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  shiftSkillText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.muted,
  },
  slotsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 0,
  },
  slotsBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '700',
  },
  // Cultural
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  performerName: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  performerStage: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginTop: 2,
  },
  performerTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  performerTimeText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  performerTimeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tierCard: {
    backgroundColor: colors.surface2,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tierRecommended: {
    borderColor: colors.gold,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -1,
    right: 10,
    backgroundColor: colors.coral,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recommendedText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    fontWeight: '700',
    color: colors.white,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tierShape: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  tierExclusive: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.gold,
    marginTop: 2,
  },
  tierPrice: {
    fontFamily: fonts.mono,
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  tierPerk: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    marginBottom: 4,
    lineHeight: 18,
  },
  selectBtn: {
    borderWidth: 1,
    borderColor: colors.teal,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  selectBtnGold: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  selectBtnText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.teal,
  },
  // Reward Card
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface2,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderLeftWidth: 3,
  },
  rewardLeft: {
    flex: 1,
  },
  rewardLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.coral,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  rewardXP: {
    fontFamily: fonts.mono,
    fontSize: 24,
    fontWeight: '700',
    color: colors.mint,
  },
  rewardBadge: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.gold,
    marginTop: 4,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Map
  mapPlaceholder: {
    height: 160,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  mapPin: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginTop: 8,
  },
  locationAddress: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
  },
  // Community tab
  chatPreview: {
    backgroundColor: colors.surface2,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chatBlurText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 14,
  },
  joinChatBtn: {
    backgroundColor: colors.coral,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  joinChatBtnText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  friendsRow: {
    marginBottom: 8,
  },
  friendsText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
  },
  avatarCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  clusterAvatar: {},
  clusterCount: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
    marginLeft: 8,
  },
  // Volunteers tab
  volCard: {
    backgroundColor: colors.surface2,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  volRole: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  volTime: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    marginBottom: 8,
  },
  volSkills: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  volSkillChip: {
    backgroundColor: colors.surface3,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  volSkillText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.muted,
  },
  volBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  volSlots: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  applyBtn: {
    borderWidth: 1,
    borderColor: colors.teal,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  applyBtnDisabled: {
    borderColor: colors.muted,
    opacity: 0.5,
  },
  applyBtnText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: colors.teal,
  },
  volPerks: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.muted,
  },
  // Sponsors tab
  sponsorTier: {
    marginBottom: 20,
  },
  sponsorTierLabel: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '700',
    color: colors.gold,
    marginBottom: 10,
  },
  sponsorLogos: {
    flexDirection: 'row',
    gap: 12,
  },
  sponsorLogo: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.gold + '40',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  sponsorLogoText: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '700',
    color: colors.gold,
  },
  becomeSponsorBtn: {
    borderWidth: 1,
    borderColor: colors.gold,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  becomeSponsorText: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '700',
    color: colors.gold,
  },
  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bottomActions: {
    marginBottom: 8,
  },
  bottomSecondary: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.teal,
    paddingVertical: 10,
  },
  secondaryActionText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.teal,
  },
  registerButton: {
    backgroundColor: colors.coral,
    paddingVertical: 18,
    alignItems: 'center',
  },
  registeredButton: {
    backgroundColor: colors.teal,
  },
  registerButtonText: {
    fontFamily: fonts.body,
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
});
