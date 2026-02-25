import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Dimensions, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withSpring, Easing } from 'react-native-reanimated';
import { colors, fonts } from '../constants/theme';
import { PLAYER_NUMBER, PLAYER_NAME, PLAYER_HANDLE } from '../constants/config';
import { HexAvatar } from '../components/ui/HexAvatar';
import { useAuth } from '../contexts/AuthContext';

const { width: SW, height: SH } = Dimensions.get('window');

const SKILLS = ['Python', 'React', 'Design', 'Leadership', 'Event Planning', 'Cybersec', 'Marketing', 'Gaming', 'AI/ML', 'Blockchain'];
const ORGS = [
  { id: '1', name: 'TECH_SQUAD', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face' },
  { id: '2', name: 'NEON_CLAN', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face' },
  { id: '3', name: 'VOID_WALK', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
  { id: '4', name: 'PROTO_X', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding, hasOnboarded, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('@ahmed_dev');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const [selectedRadius, setSelectedRadius] = useState('25KM');

  const numberOpacity = useSharedValue(0);
  const numberScale = useSharedValue(0.5);
  const subtitleOpacity = useSharedValue(0);
  const btnOpacity = useSharedValue(0);

  // If already onboarded, go to main app
  useEffect(() => {
    if (hasOnboarded && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [hasOnboarded, isAuthenticated]);

  useEffect(() => {
    if (step === 1) {
      numberOpacity.value = withTiming(1, { duration: 1200 });
      numberScale.value = withSpring(1);
      subtitleOpacity.value = withDelay(1400, withTiming(1, { duration: 800 }));
      btnOpacity.value = withDelay(2200, withTiming(1, { duration: 600 }));
      setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 1200);
    }
  }, [step]);

  const numberStyle = useAnimatedStyle(() => ({
    opacity: numberOpacity.value,
    transform: [{ scale: numberScale.value }],
  }));
  const subStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));
  const btnAnimStyle = useAnimatedStyle(() => ({ opacity: btnOpacity.value }));

  const progress = (step / 6) * 100;

  const nextStep = () => {
    Haptics.selectionAsync();
    if (step < 6) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const skipOnboarding = () => {
    Haptics.selectionAsync();
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const toggleOrg = (id: string) => {
    setSelectedOrgs(prev => prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topLabel}>EVENTFY // OS</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          {step > 1 && (
            <Pressable onPress={skipOnboarding}>
              <Text style={styles.skipText}>SKIP</Text>
            </Pressable>
          )}
          <Text style={styles.stepLabel}>STEP {step} OF 6</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
      >
        {/* STEP 1: Player Number Assignment */}
        {step === 1 && (
          <View style={styles.step1}>
            <View style={[styles.floatingShape, styles.floatingCircle, { top: SH * 0.15, left: -20 }]} />
            <View style={[styles.floatingSquare, { bottom: SH * 0.28, left: SW * 0.42 }]} />
            <View style={[styles.floatingTriangleWrap, { bottom: SH * 0.2, right: -10 }]}>
              <View style={styles.floatingTriangle} />
            </View>

            <Animated.View style={[styles.numberCenter, numberStyle]}>
              <Text style={styles.bigNumber}>4821</Text>
              <Text style={styles.playerLabel}>PLAYER</Text>
              <Text style={styles.playerHash}>#4821</Text>
            </Animated.View>

            <Animated.View style={subStyle}>
              <Text style={styles.chosenText}>YOU HAVE BEEN CHOSEN.</Text>
            </Animated.View>

            <Animated.View style={[styles.idPreview, subStyle]}>
              <View style={styles.idAvatar}>
                <Text style={styles.idAvatarIcon}>👤</Text>
              </View>
              <View style={styles.idLines}>
                <View style={[styles.idLine, { width: 80, backgroundColor: colors.muted }]} />
                <View style={[styles.idLine, { width: 60, backgroundColor: colors.coral }]} />
              </View>
            </Animated.View>
          </View>
        )}

        {/* STEP 2: Choose Appearance */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>STEP 2: WHO ARE YOU? ○</Text>
            <View style={styles.uploadZone}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>UPLOAD IDENTITY</Text>
            </View>
            <Text style={styles.selectLabel}>SELECT YOUR SYMBOL</Text>
            <View style={styles.symbolRow}>
              {['○', '△', '□', '◇'].map((s, i) => (
                <Pressable key={i} style={[styles.symbolBtn, i === 1 && styles.symbolBtnActive]}>
                  <Text style={[styles.symbolText, i === 1 && { color: colors.teal }]}>{s}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.colorRow}>
              {[colors.coral, colors.teal, colors.gold, colors.purple].map((c, i) => (
                <View key={i} style={[styles.colorDot, { backgroundColor: c }, i === 0 && styles.colorDotActive]} />
              ))}
            </View>
            <Text style={styles.fieldLabel}>USERNAME ENTRY</Text>
            <View style={styles.inputRow}>
              <TextInput style={styles.textInput} value={username} onChangeText={setUsername} placeholderTextColor={colors.muted} />
              <Text style={styles.availableText}>✓ AVAILABLE</Text>
            </View>
          </View>
        )}

        {/* STEP 3: Skills */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>STEP 3: WHAT ARE YOU{'\n'}MADE OF? △</Text>
            <View style={styles.skillsGrid}>
              {SKILLS.map(skill => (
                <Pressable key={skill} style={[styles.skillChip, selectedSkills.includes(skill) && styles.skillChipActive]} onPress={() => toggleSkill(skill)}>
                  <Text style={[styles.skillChipText, selectedSkills.includes(skill) && styles.skillChipTextActive]}>{skill}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* STEP 4: Location */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>STEP 4: WHERE DO YOU{'\n'}PLAY? □</Text>
            <Text style={styles.fieldLabel}>REGION SELECT</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>Algiers (Wilaya 16)</Text>
              <Text style={styles.dropdownArrow}>▾</Text>
            </View>
            <Text style={styles.fieldLabel}>BASE OF OPERATIONS</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>USTHB University</Text>
              <Text style={styles.dropdownArrow}>▾</Text>
            </View>
            <Text style={styles.fieldLabel}>RADAR RADIUS</Text>
            <View style={styles.radiusRow}>
              {['10KM', '25KM', '50KM'].map(r => (
                <Pressable key={r} style={[styles.radiusBtn, selectedRadius === r && styles.radiusBtnActive]} onPress={() => setSelectedRadius(r)}>
                  <Text style={[styles.radiusBtnText, selectedRadius === r && styles.radiusBtnTextActive]}>{r}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* STEP 5: Follow Orgs */}
        {step === 5 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>STEP 5: CHOOSE YOUR{'\n'}ALLIES ◇</Text>
            <View style={styles.orgsGrid}>
              {ORGS.map(org => (
                <Pressable key={org.id} style={[styles.orgCard, selectedOrgs.includes(org.id) && styles.orgCardActive]} onPress={() => toggleOrg(org.id)}>
                  <HexAvatar uri={org.image} size={48} borderColor={selectedOrgs.includes(org.id) ? colors.teal : colors.border} borderWidth={2} />
                  <Text style={styles.orgCardName}>{org.name}</Text>
                  <Pressable style={[styles.orgFollowBtn, selectedOrgs.includes(org.id) && styles.orgFollowBtnActive]}>
                    <Text style={[styles.orgFollowText, selectedOrgs.includes(org.id) && { color: colors.base }]}>
                      {selectedOrgs.includes(org.id) ? '✓ FOLLOW' : '+ FOLLOW'}
                    </Text>
                  </Pressable>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* STEP 6: First Mission */}
        {step === 6 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.gold }]}>YOUR FIRST MISSION ○</Text>
            <View style={styles.missionCard}>
              <View style={styles.missionImagePlaceholder}>
                <Text style={styles.missionImageLabel}>HIGH PRIORITY</Text>
                <Text style={styles.missionDate}>OCT 24</Text>
              </View>
              <View style={styles.missionBody}>
                <Text style={styles.missionTitle}>CODE RED: HACKATHON 2024</Text>
                <Text style={styles.missionDesc}>
                  Join the elite 456 developers in Algiers for the ultimate coding survival challenge. 48 hours. No mercy.
                </Text>
                <Pressable style={styles.registerMissionBtn}>
                  <Text style={styles.registerMissionText}>REGISTER NOW ○</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 16 }]}>
        {step === 1 ? (
          <Animated.View style={btnAnimStyle}>
            <Pressable style={styles.coralBtn} onPress={nextStep}>
              <Text style={styles.coralBtnText}>BEGIN YOUR JOURNEY</Text>
              <Text style={styles.coralBtnIcon}>○</Text>
            </Pressable>
          </Animated.View>
        ) : step === 2 ? (
          <Pressable style={styles.tealBtn} onPress={nextStep}>
            <Text style={styles.tealBtnText}>SAVE & CONTINUE △</Text>
          </Pressable>
        ) : step === 3 ? (
          <Pressable style={styles.outlineBtn} onPress={nextStep}>
            <Text style={styles.outlineBtnText}>CONTINUE □</Text>
          </Pressable>
        ) : step === 4 ? (
          <Pressable style={styles.coralBtn} onPress={nextStep}>
            <Text style={styles.coralBtnText}>CONTINUE ◇</Text>
          </Pressable>
        ) : step === 5 ? (
          <Pressable style={styles.tealBtn} onPress={nextStep}>
            <Text style={styles.tealBtnText}>FOLLOW ALL △</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.coralBtn, { backgroundColor: colors.base, borderWidth: 1, borderColor: colors.gold }]} onPress={nextStep}>
            <Text style={[styles.coralBtnText, { color: colors.gold }]}>ENTER THE ARENA □</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 },
  topLabel: { fontFamily: fonts.mono, fontSize: 12, color: colors.coral, fontWeight: '700' },
  stepLabel: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted },
  skipText: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal, fontWeight: '700', letterSpacing: 1 },
  progressBar: { height: 3, backgroundColor: colors.border, marginHorizontal: 20, marginTop: 8 },
  progressFill: { height: 3, backgroundColor: colors.coral },
  scrollContent: { flexGrow: 1 },

  step1: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: SH * 0.7, position: 'relative' },
  floatingShape: { position: 'absolute' },
  floatingCircle: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: colors.coral + '50' },
  floatingSquare: { position: 'absolute', width: 40, height: 40, borderWidth: 1, borderColor: colors.muted + '30' },
  floatingTriangleWrap: { position: 'absolute' },
  floatingTriangle: {
    width: 0, height: 0,
    borderLeftWidth: 30, borderRightWidth: 30, borderBottomWidth: 52,
    borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: colors.teal + '25',
  },
  numberCenter: { alignItems: 'center' },
  bigNumber: { fontFamily: fonts.body, fontSize: 120, fontWeight: '900', color: colors.coral, letterSpacing: -2, lineHeight: 130 },
  playerLabel: { fontFamily: fonts.body, fontSize: 56, fontWeight: '900', color: colors.white, letterSpacing: 4, marginTop: -10 },
  playerHash: { fontFamily: fonts.body, fontSize: 56, fontWeight: '900', color: colors.white, letterSpacing: 2 },
  chosenText: { fontFamily: fonts.mono, fontSize: 13, color: colors.coral, letterSpacing: 4, marginTop: 30, textAlign: 'center' },
  idPreview: {
    flexDirection: 'row', backgroundColor: colors.surface2, padding: 16, marginTop: 40,
    borderWidth: 1, borderColor: colors.border, width: SW * 0.75, alignItems: 'center', gap: 12,
  },
  idAvatar: { width: 48, height: 48, backgroundColor: colors.surface3, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  idAvatarIcon: { fontSize: 20 },
  idLines: { gap: 8 },
  idLine: { height: 4, borderRadius: 2 },

  stepContent: { paddingHorizontal: 20, paddingTop: 24 },
  stepTitle: { fontFamily: fonts.body, fontSize: 28, fontWeight: '900', color: colors.white, letterSpacing: 0.5, marginBottom: 24, lineHeight: 34 },

  uploadZone: {
    height: 140, borderWidth: 2, borderColor: colors.coral + '60', borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20, borderRadius: 16,
    backgroundColor: colors.surface2,
  },
  uploadIcon: { fontSize: 32, marginBottom: 6 },
  uploadText: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },
  selectLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, marginBottom: 10, letterSpacing: 1 },
  symbolRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  symbolBtn: {
    width: 48, height: 48, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', borderRadius: 8,
  },
  symbolBtnActive: { borderColor: colors.teal, backgroundColor: colors.teal + '15' },
  symbolText: { fontSize: 20, color: colors.muted },
  colorRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  colorDot: { width: 24, height: 24, borderRadius: 12 },
  colorDotActive: { borderWidth: 2, borderColor: colors.white },
  fieldLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, marginBottom: 8, letterSpacing: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  textInput: {
    flex: 1, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 14, fontFamily: fonts.mono, fontSize: 14, color: colors.white,
  },
  availableText: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal, fontWeight: '700' },

  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillChip: { borderWidth: 1, borderColor: colors.border, borderRadius: 9999, paddingHorizontal: 16, paddingVertical: 10 },
  skillChipActive: { backgroundColor: colors.teal + '20', borderColor: colors.teal },
  skillChipText: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, fontWeight: '600' },
  skillChipTextActive: { color: colors.teal },

  dropdown: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, marginBottom: 20,
  },
  dropdownText: { fontFamily: fonts.body, fontSize: 14, color: colors.white },
  dropdownArrow: { color: colors.muted, fontSize: 16 },
  radiusRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  radiusBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, paddingVertical: 12, alignItems: 'center' },
  radiusBtnActive: { backgroundColor: colors.teal, borderColor: colors.teal },
  radiusBtnText: { fontFamily: fonts.mono, fontSize: 13, fontWeight: '700', color: colors.muted },
  radiusBtnTextActive: { color: colors.base },

  orgsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  orgCard: {
    width: (SW - 52) / 2, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 14, alignItems: 'center', gap: 8,
  },
  orgCardActive: { borderColor: colors.teal },
  orgCardName: { fontFamily: fonts.body, fontSize: 12, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  orgFollowBtn: { borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 14, paddingVertical: 5 },
  orgFollowBtnActive: { backgroundColor: colors.teal },
  orgFollowText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.teal },

  missionCard: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  missionImagePlaceholder: {
    height: 160, backgroundColor: colors.surface3, justifyContent: 'flex-end', padding: 12, position: 'relative',
  },
  missionImageLabel: { fontFamily: fonts.mono, fontSize: 9, color: colors.coral, fontWeight: '700', position: 'absolute', top: 12, left: 12 },
  missionDate: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal, fontWeight: '700', position: 'absolute', top: 12, right: 12 },
  missionBody: { padding: 16 },
  missionTitle: { fontFamily: fonts.body, fontSize: 18, fontWeight: '800', color: colors.white, marginBottom: 8 },
  missionDesc: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, lineHeight: 19, marginBottom: 14 },
  registerMissionBtn: { backgroundColor: colors.coral, paddingVertical: 12, alignItems: 'center' },
  registerMissionText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white },

  bottomSection: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.base },
  coralBtn: {
    backgroundColor: colors.coral, paddingVertical: 18, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  coralBtnText: { fontFamily: fonts.body, fontSize: 18, fontWeight: '800', color: colors.white, letterSpacing: 1 },
  coralBtnIcon: { fontSize: 18, color: colors.white },
  tealBtn: { backgroundColor: colors.teal, paddingVertical: 16, alignItems: 'center' },
  tealBtnText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '700', color: colors.base, letterSpacing: 0.5 },
  outlineBtn: { borderWidth: 1, borderColor: colors.white, paddingVertical: 16, alignItems: 'center' },
  outlineBtnText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
});
