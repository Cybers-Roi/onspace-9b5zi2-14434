import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay,
  withSequence, Easing, FadeIn, FadeInDown,
} from 'react-native-reanimated';
import { colors, fonts, glowShadow } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '@/template';

const { width: SW, height: SH } = Dimensions.get('window');

type AuthMode = 'login' | 'register';
type RegisterTab = 'participant' | 'org';

const WILAYAS = ['Algiers (Wilaya 16)', 'Bejaia (Wilaya 06)', 'Constantine (Wilaya 25)', 'Oran (Wilaya 31)', 'Setif (Wilaya 19)', 'Annaba (Wilaya 23)', 'Tlemcen (Wilaya 13)', 'International'];

export default function AuthScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; tab?: string }>();
  const insets = useSafeAreaInsets();
  const { login, register, registerOrg } = useAuth();
  const { showAlert } = useAlert();

  const [mode, setMode] = useState<AuthMode>((params.mode as AuthMode) || 'register');
  const [regTab, setRegTab] = useState<RegisterTab>((params.tab as RegisterTab) || 'participant');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFocused, setLoginFocused] = useState<string | null>(null);

  // Register participant fields
  const [regName, setRegName] = useState('');
  const [regHandle, setRegHandle] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regWilaya, setRegWilaya] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [regSkills, setRegSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // Register org fields
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgRegNum, setOrgRegNum] = useState('');
  const [orgDesc, setOrgDesc] = useState('');

  // Floating shapes animation
  const shapeDrift = useSharedValue(0);
  useEffect(() => {
    shapeDrift.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-10, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      ), -1, true
    );
  }, []);

  const driftStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shapeDrift.value }],
  }));

  // Loading spinner rotation
  const spinnerRot = useSharedValue(0);
  useEffect(() => {
    spinnerRot.value = withRepeat(withTiming(360, { duration: 1200, easing: Easing.linear }), -1, false);
  }, []);
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinnerRot.value}deg` }],
  }));

  // Password strength meter
  const getPasswordStrength = (pw: string): number => {
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(s, 4);
  };

  const pwStrength = getPasswordStrength(regPassword);
  const pwColors = [colors.coral, colors.coral, colors.gold, colors.teal, colors.teal];

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      showAlert('ACCESS DENIED', 'All fields are required to enter the arena.');
      return;
    }
    setIsLoading(true);
    Haptics.selectionAsync();
    // Simulate network
    await new Promise(r => setTimeout(r, 1200));
    const success = await login(loginEmail, loginPassword);
    setIsLoading(false);
    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/onboarding');
    } else {
      showAlert('ACCESS DENIED', 'Invalid credentials. Check your access email and password.');
    }
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword) {
      showAlert('INCOMPLETE', 'Name, email, and password are required to claim your spot.');
      return;
    }
    setIsLoading(true);
    Haptics.selectionAsync();
    await new Promise(r => setTimeout(r, 1500));
    const success = await register({
      fullName: regName,
      email: regEmail,
      password: regPassword,
      handle: regHandle,
      wilaya: regWilaya,
      isStudent,
      skills: regSkills,
    });
    setIsLoading(false);
    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/onboarding');
    }
  };

  const handleOrgRegister = async () => {
    if (!orgName || !orgEmail) {
      showAlert('INCOMPLETE', 'Organization name and email are required.');
      return;
    }
    setIsLoading(true);
    Haptics.selectionAsync();
    await new Promise(r => setTimeout(r, 1500));
    const success = await registerOrg({
      orgName,
      orgType,
      email: orgEmail,
      regNumber: orgRegNum,
      description: orgDesc,
    });
    setIsLoading(false);
    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showAlert('APPLICATION SUBMITTED', 'THE FRONT MAN WILL REVIEW YOUR PAPERS. You can draft events while pending.');
      router.replace('/(tabs)');
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !regSkills.includes(skillInput.trim())) {
      setRegSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setRegSkills(prev => prev.filter(s => s !== skill));
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (t: string) => void,
    fieldKey: string,
    opts?: { secure?: boolean; placeholder?: string; multiline?: boolean; keyboardType?: any }
  ) => {
    const focused = loginFocused === fieldKey;
    return (
      <View style={styles.inputWrap}>
        <Text style={[styles.inputLabel, focused && { color: colors.coral }]}>{label}</Text>
        <View style={[styles.inputBox, focused && styles.inputBoxFocused]}>
          <TextInput
            style={[styles.input, opts?.multiline && { height: 80, textAlignVertical: 'top' }]}
            value={value}
            onChangeText={onChange}
            secureTextEntry={opts?.secure && !showPassword}
            placeholder={opts?.placeholder}
            placeholderTextColor={colors.muted + '80'}
            onFocus={() => setLoginFocused(fieldKey)}
            onBlur={() => setLoginFocused(null)}
            multiline={opts?.multiline}
            keyboardType={opts?.keyboardType}
            autoCapitalize="none"
          />
          {opts?.secure && (
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn} hitSlop={12}>
              <View style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={16} color={colors.muted} />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Floating shapes in background */}
          <View style={styles.shapesContainer}>
            <Animated.View style={[styles.bgCircle, driftStyle]} />
            <Animated.View style={[styles.bgTriWrap, driftStyle]}>
              <View style={styles.bgTriangle} />
            </Animated.View>
            <Animated.View style={[styles.bgSquare, driftStyle]} />
          </View>

          {/* Mock Login Badge */}
          <View style={styles.mockBadge}>
            <Text style={styles.mockBadgeText}>MOCK LOGIN</Text>
          </View>
          <Text style={styles.mockCreds}>test@example.com / 123456</Text>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {mode === 'login' ? 'ENTER THE ARENA' : 'CHOOSE YOUR ROLE'}
            </Text>
            <Text style={styles.headerSub}>The game is already in progress.</Text>
          </View>

          {/* Mode Switcher */}
          <View style={styles.modeSwitcher}>
            <Pressable
              style={[styles.modeTab, mode === 'login' && styles.modeTabActive]}
              onPress={() => { setMode('login'); Haptics.selectionAsync(); }}
            >
              <Text style={[styles.modeTabText, mode === 'login' && styles.modeTabTextActive]}>LOGIN</Text>
            </Pressable>
            <Pressable
              style={[styles.modeTab, mode === 'register' && styles.modeTabActive]}
              onPress={() => { setMode('register'); Haptics.selectionAsync(); }}
            >
              <Text style={[styles.modeTabText, mode === 'register' && styles.modeTabTextActive]}>REGISTER</Text>
            </Pressable>
          </View>

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.formSection}>
              {renderInput('ACCESS EMAIL', loginEmail, setLoginEmail, 'email', { placeholder: 'your@email.com', keyboardType: 'email-address' })}
              {renderInput('PASSWORD', loginPassword, setLoginPassword, 'password', { secure: true, placeholder: 'Enter password' })}

              <Pressable style={styles.forgotRow}>
                <Text style={styles.forgotText}>FORGOT ACCESS?</Text>
              </Pressable>

              {/* Submit */}
              <Pressable style={styles.submitBtn} onPress={handleLogin} disabled={isLoading}>
                {isLoading ? (
                  <View style={styles.loaderRow}>
                    <Animated.View style={spinStyle}>
                      <Text style={styles.loaderShape}>○</Text>
                    </Animated.View>
                    <Animated.View style={[spinStyle, { transform: [{ rotate: '120deg' }] }]}>
                      <Text style={styles.loaderShape}>△</Text>
                    </Animated.View>
                    <Animated.View style={[spinStyle, { transform: [{ rotate: '240deg' }] }]}>
                      <Text style={styles.loaderShape}>□</Text>
                    </Animated.View>
                  </View>
                ) : (
                  <Text style={styles.submitBtnText}>ENTER □</Text>
                )}
              </Pressable>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>— OR —</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google SSO */}
              <Pressable style={styles.googleBtn}>
                <Ionicons name="logo-google" size={18} color={colors.white} />
                <Text style={styles.googleBtnText}>CONTINUE WITH GOOGLE</Text>
              </Pressable>
            </Animated.View>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.formSection}>
              {/* Register tabs */}
              <View style={styles.regTabs}>
                <Pressable
                  style={[styles.regTab, regTab === 'participant' && styles.regTabActive]}
                  onPress={() => { setRegTab('participant'); Haptics.selectionAsync(); }}
                >
                  <Text style={[styles.regTabShape, regTab === 'participant' && { color: colors.coral }]}>○</Text>
                  <Text style={[styles.regTabLabel, regTab === 'participant' && { color: colors.coral }]}>PARTICIPANT</Text>
                </Pressable>
                <Pressable
                  style={[styles.regTab, regTab === 'org' && styles.regTabActiveOrg]}
                  onPress={() => { setRegTab('org'); Haptics.selectionAsync(); }}
                >
                  <Text style={[styles.regTabShape, regTab === 'org' && { color: colors.teal }]}>△</Text>
                  <Text style={[styles.regTabLabel, regTab === 'org' && { color: colors.teal }]}>ORGANIZATION</Text>
                </Pressable>
              </View>

              {/* PARTICIPANT REGISTRATION */}
              {regTab === 'participant' && (
                <View>
                  {renderInput('FULL NAME', regName, setRegName, 'regName', { placeholder: 'Your full name' })}
                  {renderInput('PLAYER HANDLE', regHandle, (t) => setRegHandle(t.startsWith('@') ? t : '@' + t), 'regHandle', { placeholder: '@your_handle' })}
                  {renderInput('EMAIL', regEmail, setRegEmail, 'regEmail', { placeholder: 'your@email.com', keyboardType: 'email-address' })}
                  {renderInput('PASSWORD', regPassword, setRegPassword, 'regPassword', { secure: true, placeholder: 'Min 6 characters' })}

                  {/* Password strength */}
                  {regPassword.length > 0 && (
                    <View style={styles.strengthRow}>
                      {[0, 1, 2, 3].map(i => (
                        <View
                          key={i}
                          style={[
                            styles.strengthBlock,
                            { backgroundColor: i < pwStrength ? pwColors[pwStrength] : colors.border },
                          ]}
                        />
                      ))}
                    </View>
                  )}

                  {/* Wilaya */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>WILAYA / CITY</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wilayaScroll}>
                      <View style={styles.wilayaRow}>
                        {WILAYAS.map(w => (
                          <Pressable
                            key={w}
                            style={[styles.wilayaChip, regWilaya === w && styles.wilayaChipActive]}
                            onPress={() => { setRegWilaya(w); Haptics.selectionAsync(); }}
                          >
                            <Text style={[styles.wilayaChipText, regWilaya === w && styles.wilayaChipTextActive]}>
                              {w.split(' (')[0]}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  {/* Skills */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>SKILLS</Text>
                    <View style={styles.skillInputRow}>
                      <TextInput
                        style={[styles.input, styles.inputBox, { flex: 1 }]}
                        value={skillInput}
                        onChangeText={setSkillInput}
                        placeholder="Add skills: #Python #Design..."
                        placeholderTextColor={colors.muted + '80'}
                        onSubmitEditing={addSkill}
                        returnKeyType="done"
                      />
                      <Pressable style={styles.addSkillBtn} onPress={addSkill}>
                        <Text style={styles.addSkillText}>+</Text>
                      </Pressable>
                    </View>
                    {regSkills.length > 0 && (
                      <View style={styles.skillTags}>
                        {regSkills.map(skill => (
                          <View key={skill} style={styles.skillTag}>
                            <Text style={styles.skillTagText}>{skill}</Text>
                            <Pressable onPress={() => removeSkill(skill)} hitSlop={8}>
                              <Text style={styles.skillTagX}>×</Text>
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Student toggle */}
                  <Pressable style={styles.studentRow} onPress={() => { setIsStudent(!isStudent); Haptics.selectionAsync(); }}>
                    <View style={[styles.toggleTrack, isStudent && styles.toggleTrackOn]}>
                      <View style={[styles.toggleThumb, isStudent && styles.toggleThumbOn]} />
                    </View>
                    <Text style={styles.studentLabel}>I am a Student</Text>
                  </Pressable>

                  <Pressable style={styles.submitBtn} onPress={handleRegister} disabled={isLoading}>
                    {isLoading ? (
                      <Animated.View style={spinStyle}>
                        <Text style={styles.loaderShape}>○△□</Text>
                      </Animated.View>
                    ) : (
                      <Text style={styles.submitBtnText}>CLAIM YOUR SPOT ○</Text>
                    )}
                  </Pressable>
                </View>
              )}

              {/* ORGANIZATION REGISTRATION */}
              {regTab === 'org' && (
                <View>
                  {renderInput('ORGANIZATION NAME', orgName, setOrgName, 'orgName', { placeholder: 'Your organization name' })}

                  {/* Org Type */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>ORGANIZATION TYPE</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View style={styles.wilayaRow}>
                        {['University Club', 'Student Assoc', 'NGO', 'Sports Club', 'Company', 'Gov Body'].map(t => (
                          <Pressable
                            key={t}
                            style={[styles.wilayaChip, orgType === t && { borderColor: colors.gold, backgroundColor: colors.gold + '15' }]}
                            onPress={() => { setOrgType(t); Haptics.selectionAsync(); }}
                          >
                            <Text style={[styles.wilayaChipText, orgType === t && { color: colors.gold }]}>{t}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  {renderInput('OFFICIAL EMAIL', orgEmail, setOrgEmail, 'orgEmail', { placeholder: 'org@email.com', keyboardType: 'email-address' })}
                  {renderInput('REGISTRATION NUMBER', orgRegNum, setOrgRegNum, 'orgRegNum', { placeholder: 'Association/Registration #' })}

                  {/* Document upload zone */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>OFFICIAL DOCUMENT</Text>
                    <View style={styles.uploadZone}>
                      <Text style={styles.uploadIcon}>□</Text>
                      <Text style={styles.uploadText}>DROP YOUR OFFICIAL DOCUMENT HERE</Text>
                      <Text style={styles.uploadHint}>PDF, JPG, PNG accepted</Text>
                    </View>
                  </View>

                  {renderInput('SHORT DESCRIPTION', orgDesc, setOrgDesc, 'orgDesc', { placeholder: 'Tell us about your organization...', multiline: true })}

                  {/* Pending badge */}
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>PENDING ADMIN VERIFICATION ◇</Text>
                  </View>

                  <Pressable style={[styles.submitBtn, { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.gold }]} onPress={handleOrgRegister} disabled={isLoading}>
                    {isLoading ? (
                      <Animated.View style={spinStyle}>
                        <Text style={[styles.loaderShape, { color: colors.gold }]}>◇</Text>
                      </Animated.View>
                    ) : (
                      <Text style={[styles.submitBtnText, { color: colors.gold }]}>REQUEST ACCESS △</Text>
                    )}
                  </Pressable>
                </View>
              )}
            </Animated.View>
          )}

          {/* Switch mode link */}
          <Pressable style={styles.switchRow} onPress={() => { setMode(mode === 'login' ? 'register' : 'login'); Haptics.selectionAsync(); }}>
            <Text style={styles.switchText}>
              {mode === 'login' ? 'No account? ' : 'Already a player? '}
              <Text style={{ color: colors.coral, fontWeight: '700' }}>
                {mode === 'login' ? 'CLAIM YOUR SPOT ○' : 'ENTER THE ARENA □'}
              </Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBar}>
            <Animated.View style={[styles.loadingFill, { width: '100%' }]} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  // Background shapes
  shapesContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: SH * 0.5, zIndex: 0, overflow: 'hidden' },
  bgCircle: {
    position: 'absolute', top: 30, right: 40,
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 1.5, borderColor: colors.coral + '20',
  },
  bgTriWrap: { position: 'absolute', top: 80, left: 20 },
  bgTriangle: {
    width: 0, height: 0,
    borderLeftWidth: 25, borderRightWidth: 25, borderBottomWidth: 43,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderBottomColor: colors.gold + '12',
  },
  bgSquare: {
    position: 'absolute', top: 50, left: SW * 0.6,
    width: 30, height: 30, borderWidth: 1, borderColor: colors.teal + '15',
  },

  // Mock badge
  mockBadge: {
    alignSelf: 'center', backgroundColor: colors.gold + '20',
    borderWidth: 1, borderColor: colors.gold,
    paddingHorizontal: 16, paddingVertical: 6, marginTop: 12,
  },
  mockBadgeText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.gold, letterSpacing: 1.5 },
  mockCreds: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, textAlign: 'center', marginTop: 6, marginBottom: 8 },

  // Header
  header: { paddingHorizontal: 20, marginBottom: 20, marginTop: 16 },
  headerTitle: { fontFamily: fonts.body, fontSize: 36, fontWeight: '900', color: colors.white, letterSpacing: 1, lineHeight: 42 },
  headerSub: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted, marginTop: 8, letterSpacing: 0.5 },

  // Mode switcher
  modeSwitcher: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  modeTab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  modeTabActive: { backgroundColor: colors.coral },
  modeTabText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.muted, letterSpacing: 1 },
  modeTabTextActive: { color: colors.white },

  // Form
  formSection: { paddingHorizontal: 20 },

  // Inputs
  inputWrap: { marginBottom: 18 },
  inputLabel: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.muted, letterSpacing: 1, marginBottom: 8 },
  inputBox: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    flexDirection: 'row', alignItems: 'center',
  },
  inputBoxFocused: { borderColor: colors.coral, shadowColor: colors.coral, shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  input: { flex: 1, padding: 14, fontFamily: fonts.mono, fontSize: 14, color: colors.white },
  eyeBtn: { paddingHorizontal: 14 },
  eyeIcon: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },

  // Forgot
  forgotRow: { alignSelf: 'flex-end', marginBottom: 24, marginTop: -8 },
  forgotText: { fontFamily: fonts.mono, fontSize: 11, color: colors.coral, letterSpacing: 0.5 },

  // Submit
  submitBtn: { backgroundColor: colors.coral, paddingVertical: 18, alignItems: 'center', marginTop: 8 },
  submitBtnText: { fontFamily: fonts.body, fontSize: 18, fontWeight: '800', color: colors.white, letterSpacing: 1 },

  // Loader
  loaderRow: { flexDirection: 'row', gap: 8 },
  loaderShape: { fontFamily: fonts.mono, fontSize: 16, color: colors.white },

  // Divider
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted },

  // Google
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    borderWidth: 1, borderColor: colors.white, paddingVertical: 16,
  },
  googleBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '600', color: colors.white, letterSpacing: 0.5 },

  // Register tabs
  regTabs: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  regTab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, borderWidth: 1, borderColor: colors.border,
  },
  regTabActive: { borderColor: colors.coral, borderBottomWidth: 2 },
  regTabActiveOrg: { borderColor: colors.teal, borderBottomWidth: 2 },
  regTabShape: { fontSize: 16, color: colors.muted },
  regTabLabel: { fontFamily: fonts.body, fontSize: 12, fontWeight: '700', color: colors.muted, letterSpacing: 0.5 },

  // Strength meter
  strengthRow: { flexDirection: 'row', gap: 4, marginTop: -10, marginBottom: 12 },
  strengthBlock: { flex: 1, height: 4 },

  // Wilaya
  wilayaScroll: { marginTop: 0 },
  wilayaRow: { flexDirection: 'row', gap: 8 },
  wilayaChip: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 10 },
  wilayaChipActive: { borderColor: colors.teal, backgroundColor: colors.teal + '15' },
  wilayaChipText: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },
  wilayaChipTextActive: { color: colors.teal },

  // Skills
  skillInputRow: { flexDirection: 'row', gap: 8 },
  addSkillBtn: { backgroundColor: colors.teal, width: 48, alignItems: 'center', justifyContent: 'center' },
  addSkillText: { fontSize: 24, color: colors.base, fontWeight: '700' },
  skillTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  skillTag: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  skillTagText: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal },
  skillTagX: { fontSize: 14, color: colors.coral, fontWeight: '700' },

  // Student toggle
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  toggleTrack: { width: 44, height: 24, backgroundColor: colors.border, padding: 2, justifyContent: 'center' },
  toggleTrackOn: { backgroundColor: colors.teal },
  toggleThumb: { width: 20, height: 20, backgroundColor: colors.muted },
  toggleThumbOn: { backgroundColor: colors.white, alignSelf: 'flex-end' },
  studentLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.white },

  // Upload zone
  uploadZone: {
    borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border,
    paddingVertical: 32, alignItems: 'center', gap: 8,
  },
  uploadIcon: { fontSize: 28, color: colors.muted },
  uploadText: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5 },
  uploadHint: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted + '80' },

  // Pending badge
  pendingBadge: {
    borderWidth: 1, borderColor: colors.gold, paddingHorizontal: 14, paddingVertical: 8,
    alignSelf: 'flex-start', marginBottom: 20,
  },
  pendingText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.gold, letterSpacing: 0.5 },

  // Switch mode
  switchRow: { alignItems: 'center', marginTop: 24, paddingBottom: 20 },
  switchText: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted },

  // Loading overlay
  loadingOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
  },
  loadingBar: { height: 3, backgroundColor: colors.border, overflow: 'hidden' },
  loadingFill: { height: 3, backgroundColor: colors.coral },
});
