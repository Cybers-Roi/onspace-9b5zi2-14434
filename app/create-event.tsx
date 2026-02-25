import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { eventTypeConfig } from '../constants/theme';

const { width: SW } = Dimensions.get('window');

type EventType = 'sport' | 'science' | 'charity' | 'cultural';
type Visibility = 'open' | 'invite' | 'private';

const EVENT_TYPES: { key: EventType; shape: string; label: string; desc: string }[] = [
  { key: 'sport', shape: '○', label: 'SPORT', desc: 'Matches, leagues, tournaments' },
  { key: 'science', shape: '△', label: 'SCIENCE', desc: 'Conferences, research, papers' },
  { key: 'charity', shape: '□', label: 'CHARITY', desc: 'Fundraisers, volunteers, causes' },
  { key: 'cultural', shape: '◇', label: 'CULTURAL', desc: 'Arts, music, performances' },
];

export default function CreateEventScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);

  // Step 1
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [visibility, setVisibility] = useState<Visibility>('open');
  const [isInternational, setIsInternational] = useState(false);

  // Step 2
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('100');

  // Step 3
  const [xpReward, setXpReward] = useState('100');
  const [volunteerMultiplier, setVolunteerMultiplier] = useState(true);

  const progress = (step / 4) * 100;

  const nextStep = () => {
    Haptics.selectionAsync();
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    Haptics.selectionAsync();
    if (step > 1) setStep(step - 1);
  };

  const handlePublish = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => step === 1 ? router.back() : prevStep()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>BUILD YOUR ARENA □</Text>
          <Text style={styles.headerSub}>Step {step} of 4</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Step Indicators */}
      <View style={styles.stepIndicators}>
        <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}>
          <Text style={[styles.stepDotText, step >= 1 && styles.stepDotTextActive]}>○</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}>
          <Text style={[styles.stepDotText, step >= 2 && styles.stepDotTextActive]}>△</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]}>
          <Text style={[styles.stepDotText, step >= 3 && styles.stepDotTextActive]}>□</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step >= 4 && styles.stepDotActive]}>
          <Text style={[styles.stepDotText, step >= 4 && styles.stepDotTextActive]}>◇</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* STEP 1 — CHOOSE YOUR VIBE */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>CHOOSE YOUR VIBE ○</Text>
            <Text style={styles.stepDesc}>WHAT KIND OF ARENA ARE YOU BUILDING?</Text>

            <View style={styles.typeGrid}>
              {EVENT_TYPES.map(type => (
                <Pressable
                  key={type.key}
                  style={[
                    styles.typeCard,
                    { borderColor: eventTypeConfig[type.key].color + '40' },
                    eventType === type.key && { borderColor: eventTypeConfig[type.key].color, backgroundColor: eventTypeConfig[type.key].color + '15' },
                  ]}
                  onPress={() => { setEventType(type.key); Haptics.selectionAsync(); }}
                >
                  <View style={[styles.typeShapeBox, { borderColor: eventTypeConfig[type.key].color }]}>
                    <Text style={[styles.typeShape, { color: eventTypeConfig[type.key].color }]}>{type.shape}</Text>
                  </View>
                  <Text style={styles.typeLabel}>{type.label}</Text>
                  <Text style={styles.typeDesc}>{type.desc}</Text>
                  {eventType === type.key && (
                    <View style={styles.typeCheck}>
                      <Text style={{ color: eventTypeConfig[type.key].color, fontSize: 16 }}>✓</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionLabel}>EVENT VISIBILITY</Text>
            <View style={styles.visRow}>
              {[
                { key: 'open', label: 'OPEN ○', desc: 'Anyone can register' },
                { key: 'invite', label: 'INVITE △', desc: 'Approval required' },
                { key: 'private', label: 'PRIVATE □', desc: 'Invite link only' },
              ].map((vis) => (
                <Pressable
                  key={vis.key}
                  style={[styles.visBtn, visibility === vis.key && styles.visBtnActive]}
                  onPress={() => { setVisibility(vis.key as Visibility); Haptics.selectionAsync(); }}
                >
                  <Text style={[styles.visBtnText, visibility === vis.key && styles.visBtnTextActive]}>{vis.label}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable style={styles.toggleRow} onPress={() => { setIsInternational(!isInternational); Haptics.selectionAsync(); }}>
              <View style={[styles.toggleTrack, isInternational && styles.toggleTrackOn]}>
                <View style={[styles.toggleThumb, isInternational && styles.toggleThumbOn]} />
              </View>
              <Text style={styles.toggleLabel}>INTERNATIONAL EVENT □</Text>
            </Pressable>
          </View>
        )}

        {/* STEP 2 — THE DETAILS */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>THE DETAILS △</Text>

            <Text style={styles.fieldLabel}>EVENT TITLE</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter arena name..."
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.fieldLabel}>DESCRIPTION</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Tell players what awaits them..."
              placeholderTextColor={colors.muted}
              multiline
            />

            <Text style={styles.fieldLabel}>LOCATION</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={location}
                onChangeText={setLocation}
                placeholder="City, venue..."
                placeholderTextColor={colors.muted}
              />
              <Pressable style={styles.mapBtn}>
                <Ionicons name="location" size={18} color={colors.teal} />
              </Pressable>
            </View>

            <Text style={styles.fieldLabel}>CAPACITY</Text>
            <TextInput
              style={styles.input}
              value={capacity}
              onChangeText={setCapacity}
              placeholder="Max participants..."
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
            />

            <Text style={styles.fieldLabel}>MEDIA GALLERY</Text>
            <View style={styles.uploadZone}>
              <Ionicons name="images-outline" size={32} color={colors.muted} />
              <Text style={styles.uploadText}>DRAG IMAGES / VIDEOS HERE</Text>
              <Text style={styles.uploadHint}>Max 10 files, 50MB each</Text>
            </View>
          </View>
        )}

        {/* STEP 3 — COMMUNITY & GAMIFICATION */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>COMMUNITY & GAMIFICATION □</Text>
            <Text style={[styles.stepDesc, { color: colors.gold }]}>MAKE IT LEGENDARY</Text>

            <Text style={styles.sectionLabel}>XP REWARDS</Text>
            <View style={styles.xpCard}>
              <Text style={styles.xpCardLabel}>CHECK-IN REWARD</Text>
              <TextInput
                style={styles.xpInput}
                value={xpReward}
                onChangeText={setXpReward}
                keyboardType="number-pad"
                placeholder="100"
                placeholderTextColor={colors.muted}
              />
              <Text style={styles.xpCardSuffix}>XP</Text>
            </View>

            <Pressable style={styles.toggleRow} onPress={() => { setVolunteerMultiplier(!volunteerMultiplier); Haptics.selectionAsync(); }}>
              <View style={[styles.toggleTrack, volunteerMultiplier && styles.toggleTrackOn]}>
                <View style={[styles.toggleThumb, volunteerMultiplier && styles.toggleThumbOn]} />
              </View>
              <Text style={styles.toggleLabel}>2× XP MULTIPLIER FOR VOLUNTEERS</Text>
            </Pressable>

            <Text style={styles.sectionLabel}>BADGE AWARDS</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badgeBox}>
                <Text style={{ fontSize: 28 }}>🏆</Text>
                <Text style={styles.badgeBoxLabel}>WINNER</Text>
              </View>
              <View style={styles.badgeBox}>
                <Text style={{ fontSize: 28 }}>⚡</Text>
                <Text style={styles.badgeBoxLabel}>SPEED</Text>
              </View>
              <Pressable style={styles.badgeBoxAdd}>
                <Ionicons name="add" size={24} color={colors.teal} />
                <Text style={styles.badgeBoxLabel}>CREATE</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionLabel}>VOLUNTEER ROLES</Text>
            <Pressable style={styles.addVolunteerBtn}>
              <Ionicons name="add-circle-outline" size={20} color={colors.teal} />
              <Text style={styles.addVolunteerText}>+ ADD VOLUNTEER ROLE △</Text>
            </Pressable>
          </View>
        )}

        {/* STEP 4 — REVIEW & LAUNCH */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>REVIEW & LAUNCH ◇</Text>

            <View style={styles.previewCard}>
              <View style={styles.previewImagePlaceholder}>
                <Ionicons name="images" size={40} color={colors.muted} />
              </View>
              <View style={styles.previewBody}>
                <View style={styles.previewTypeBadge}>
                  <Text style={styles.previewTypeBadgeText}>
                    {eventType ? eventTypeConfig[eventType].icon + ' ' + eventType.toUpperCase() : 'TYPE'}
                  </Text>
                </View>
                <Text style={styles.previewTitle}>{title || 'EVENT TITLE'}</Text>
                <Text style={styles.previewInfo}>{location || 'Location'} • {capacity} spots</Text>
              </View>
            </View>

            <View style={styles.checklistCard}>
              <Text style={styles.checklistTitle}>CHECKLIST</Text>
              <View style={styles.checklistRow}>
                <Text style={styles.checklistIcon}>{eventType ? '✓' : '✗'}</Text>
                <Text style={styles.checklistText}>Event type selected</Text>
              </View>
              <View style={styles.checklistRow}>
                <Text style={styles.checklistIcon}>{title ? '✓' : '✗'}</Text>
                <Text style={styles.checklistText}>Title & details</Text>
              </View>
              <View style={styles.checklistRow}>
                <Text style={styles.checklistIcon}>✓</Text>
                <Text style={styles.checklistText}>Gamification configured</Text>
              </View>
            </View>

            <View style={styles.reachCard}>
              <Text style={styles.reachValue}>~1,240</Text>
              <Text style={styles.reachLabel}>STUDENTS MATCH THIS EVENT IN YOUR REGION</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        {step < 4 ? (
          <Pressable
            style={[styles.nextBtn, !eventType && step === 1 && styles.nextBtnDisabled]}
            onPress={nextStep}
            disabled={!eventType && step === 1}
          >
            <Text style={styles.nextBtnText}>
              {step === 1 ? 'CONTINUE ○' : step === 2 ? 'CONTINUE △' : 'CONTINUE □'}
            </Text>
          </Pressable>
        ) : (
          <>
            <Pressable style={styles.draftBtn}>
              <Text style={styles.draftBtnText}>SAVE AS DRAFT □</Text>
            </Pressable>
            <Pressable style={styles.launchBtn} onPress={handlePublish}>
              <Text style={styles.launchBtnText}>LAUNCH NOW ▶</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: fonts.body, fontSize: 20, fontWeight: '900', color: colors.white, letterSpacing: 0.5 },
  headerSub: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 2 },

  progressBar: { height: 4, backgroundColor: colors.border },
  progressFill: { height: 4, backgroundColor: colors.coral },

  stepIndicators: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, gap: 8,
  },
  stepDot: {
    width: 32, height: 32, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface2,
  },
  stepDotActive: { borderColor: colors.coral, backgroundColor: colors.coral + '20' },
  stepDotText: { fontSize: 14, color: colors.muted },
  stepDotTextActive: { color: colors.coral },
  stepLine: { width: 24, height: 2, backgroundColor: colors.border },

  stepContent: { paddingHorizontal: 16, paddingTop: 8 },
  stepTitle: { fontFamily: fonts.body, fontSize: 28, fontWeight: '900', color: colors.white, letterSpacing: 0.5, marginBottom: 8 },
  stepDesc: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted, marginBottom: 24, letterSpacing: 0.5 },

  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  typeCard: {
    width: (SW - 44) / 2, borderWidth: 2, padding: 16,
    position: 'relative',
  },
  typeShapeBox: {
    width: 48, height: 48, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  typeShape: { fontSize: 20, fontWeight: '700' },
  typeLabel: { fontFamily: fonts.body, fontSize: 18, fontWeight: '800', color: colors.white, marginBottom: 6 },
  typeDesc: { fontFamily: fonts.body, fontSize: 12, color: colors.muted },
  typeCheck: { position: 'absolute', top: 8, right: 8 },

  sectionLabel: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.muted, letterSpacing: 1, marginBottom: 12 },

  visRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  visBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, paddingVertical: 12, alignItems: 'center' },
  visBtnActive: { borderColor: colors.teal, backgroundColor: colors.teal + '15' },
  visBtnText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.muted },
  visBtnTextActive: { color: colors.teal },

  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  toggleTrack: { width: 48, height: 26, backgroundColor: colors.border, padding: 2, justifyContent: 'center' },
  toggleTrackOn: { backgroundColor: colors.teal },
  toggleThumb: { width: 22, height: 22, backgroundColor: colors.muted },
  toggleThumbOn: { backgroundColor: colors.white, alignSelf: 'flex-end' },
  toggleLabel: { fontFamily: fonts.body, fontSize: 13, color: colors.white, flex: 1 },

  fieldLabel: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.muted, letterSpacing: 1, marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 14, fontFamily: fonts.body, fontSize: 14, color: colors.white, marginBottom: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  mapBtn: {
    width: 48, height: 48, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface2,
  },

  uploadZone: {
    borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border,
    paddingVertical: 40, alignItems: 'center', gap: 8, marginBottom: 20,
  },
  uploadText: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 0.5 },
  uploadHint: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted + '80' },

  xpCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 14, marginBottom: 20,
  },
  xpCardLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, flex: 1 },
  xpInput: {
    width: 80, backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border,
    padding: 10, fontFamily: fonts.mono, fontSize: 16, fontWeight: '700', color: colors.teal, textAlign: 'center',
  },
  xpCardSuffix: { fontFamily: fonts.mono, fontSize: 14, fontWeight: '700', color: colors.teal },

  badgeRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  badgeBox: {
    flex: 1, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 20, alignItems: 'center', gap: 8, backgroundColor: colors.surface2,
  },
  badgeBoxAdd: {
    flex: 1, borderWidth: 1, borderColor: colors.teal, borderStyle: 'dashed',
    paddingVertical: 20, alignItems: 'center', gap: 8, backgroundColor: colors.teal + '08',
  },
  badgeBoxLabel: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.muted },

  addVolunteerBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1, borderColor: colors.teal, paddingVertical: 14, marginBottom: 20,
  },
  addVolunteerText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.teal, letterSpacing: 0.5 },

  previewCard: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 20 },
  previewImagePlaceholder: {
    height: 140, backgroundColor: colors.surface3,
    alignItems: 'center', justifyContent: 'center',
  },
  previewBody: { padding: 16 },
  previewTypeBadge: {
    alignSelf: 'flex-start', borderWidth: 1, borderColor: colors.coral,
    paddingHorizontal: 12, paddingVertical: 5, marginBottom: 10,
  },
  previewTypeBadgeText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.coral },
  previewTitle: { fontFamily: fonts.body, fontSize: 20, fontWeight: '800', color: colors.white, marginBottom: 8 },
  previewInfo: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },

  checklistCard: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 3, borderLeftColor: colors.teal, padding: 16, marginBottom: 20,
  },
  checklistTitle: { fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.white, marginBottom: 12 },
  checklistRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  checklistIcon: { fontSize: 14, color: colors.teal },
  checklistText: { fontFamily: fonts.body, fontSize: 13, color: colors.muted },

  reachCard: {
    backgroundColor: colors.teal + '10', borderWidth: 1, borderColor: colors.teal,
    paddingVertical: 20, alignItems: 'center', marginBottom: 20,
  },
  reachValue: { fontFamily: fonts.mono, fontSize: 48, fontWeight: '700', color: colors.teal, lineHeight: 48 },
  reachLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, marginTop: 8, letterSpacing: 0.5, textAlign: 'center' },

  bottomBar: {
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: 16, paddingTop: 14, backgroundColor: colors.base,
  },
  nextBtn: { backgroundColor: colors.coral, paddingVertical: 18, alignItems: 'center' },
  nextBtnDisabled: { backgroundColor: colors.muted, opacity: 0.5 },
  nextBtnText: { fontFamily: fonts.body, fontSize: 18, fontWeight: '900', color: colors.white, letterSpacing: 1 },
  draftBtn: { borderWidth: 1, borderColor: colors.white, paddingVertical: 16, alignItems: 'center', marginBottom: 10 },
  draftBtnText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  launchBtn: { backgroundColor: colors.coral, paddingVertical: 18, alignItems: 'center' },
  launchBtnText: { fontFamily: fonts.body, fontSize: 18, fontWeight: '900', color: colors.white, letterSpacing: 1 },
});
