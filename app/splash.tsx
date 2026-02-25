import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay,
  withSequence, Easing,
} from 'react-native-reanimated';
import { colors, fonts } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

const { width: SW, height: SH } = Dimensions.get('window');

const SLIDES = [
  { shape: '○', color: colors.neonPink, title: 'DISCOVER EVENTS NEAR YOU.', desc: 'Find local challenges, tournaments, and social gatherings in your sector. The map is your playground.' },
  { shape: '△', color: colors.gold, title: 'COMPETE. VOLUNTEER. GROW.', desc: 'Earn prestige through action. Whether competing or contributing, every move increases your rank.' },
  { shape: '□', color: colors.teal, title: 'YOUR SKILLS. VERIFIED.', desc: 'Your profile is your digital legacy. All achievements are permanent and cryptographically secured.' },
];

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeSplash } = useAuth();

  // Rotating giant circle animation
  const circleRot = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const cardsOpacity = useSharedValue(0);
  const btnsOpacity = useSharedValue(0);

  useEffect(() => {
    circleRot.value = withRepeat(withTiming(360, { duration: 60000, easing: Easing.linear }), -1, false);
    logoOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    cardsOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
    btnsOpacity.value = withDelay(1800, withTiming(1, { duration: 600 }));
  }, []);

  // Breathing subtitle
  const breathingOpacity = useSharedValue(0.6);
  useEffect(() => {
    breathingOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.6, { duration: 1500 }),
      ), -1, true
    );
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${circleRot.value}deg` }],
  }));
  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));
  const breathStyle = useAnimatedStyle(() => ({ opacity: breathingOpacity.value }));
  const cardsStyle = useAnimatedStyle(() => ({ opacity: cardsOpacity.value }));
  const btnsStyle = useAnimatedStyle(() => ({ opacity: btnsOpacity.value }));

  const handleJoin = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    completeSplash();
    router.replace('/auth');
  };

  const handleLogin = () => {
    Haptics.selectionAsync();
    completeSplash();
    router.replace('/auth?mode=login');
  };

  const handleOrgJoin = () => {
    Haptics.selectionAsync();
    completeSplash();
    router.replace('/auth?mode=register&tab=org');
  };

  return (
    <View style={styles.container}>
      {/* Noise grain */}
      <View style={styles.noiseOverlay} />

      {/* Giant rotating circle behind logo */}
      <Animated.View style={[styles.giantCircle, circleStyle]}>
        <View style={styles.circleInner} />
      </Animated.View>

      {/* Small decorative shapes */}
      <View style={styles.smallSquare} />
      <View style={styles.smallTriWrap}>
        <View style={styles.smallTriangle} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        >
          {/* Logo Section */}
          <View style={styles.heroSection}>
            <Animated.View style={logoStyle}>
              <Text style={styles.logoText}>E V E N T F Y</Text>
            </Animated.View>
            <Animated.View style={breathStyle}>
              <Text style={styles.subtitleText}>THE GAME HAS BEGUN</Text>
            </Animated.View>
          </View>

          {/* Three Cards Stacked Vertically */}
          <Animated.View style={[styles.cardsContainer, cardsStyle]}>
            {SLIDES.map((slide, idx) => (
              <View key={idx} style={styles.slideCard}>
                <View style={[styles.slideShapeBox, { borderColor: slide.color }]}>
                  <Text style={[styles.slideShapeIcon, { color: slide.color }]}>{slide.shape}</Text>
                </View>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDesc}>{slide.desc}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Progress Indicators */}
          <View style={styles.indicators}>
            <Text style={[styles.indicatorShape, { color: colors.neonPink }]}>○</Text>
            <Text style={[styles.indicatorShape, { color: colors.muted }]}>△</Text>
            <Text style={[styles.indicatorShape, { color: colors.muted }]}>□</Text>
          </View>

          {/* Bottom Buttons */}
          <Animated.View style={[styles.bottomSection, btnsStyle]}>
            <Pressable style={styles.joinBtn} onPress={handleJoin}>
              <Text style={styles.joinBtnText}>JOIN THE GAME</Text>
            </Pressable>
            <Pressable style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>I HAVE AN ACCOUNT</Text>
            </Pressable>
            <Pressable onPress={handleOrgJoin}>
              <Text style={styles.orgLink}>JOIN AS ORGANIZATION △</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const CIRCLE_SIZE = SW * 1.1;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base, position: 'relative', overflow: 'hidden' },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.015)',
    zIndex: 0,
  },
  safeArea: { flex: 1, zIndex: 10 },
  scrollContent: { flexGrow: 1 },

  // Giant circle
  giantCircle: {
    position: 'absolute',
    top: -CIRCLE_SIZE * 0.4,
    left: (SW - CIRCLE_SIZE) / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleInner: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.coral + '30',
    backgroundColor: 'transparent',
  },

  // Small decorative shapes
  smallSquare: {
    position: 'absolute',
    bottom: SH * 0.35,
    right: 20,
    width: 80,
    height: 80,
    borderWidth: 1.5,
    borderColor: colors.white + '20',
    zIndex: 1,
  },
  smallTriWrap: {
    position: 'absolute',
    bottom: SH * 0.15,
    left: -10,
    zIndex: 1,
  },
  smallTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 70,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.gold + '20',
  },

  // Hero
  heroSection: { alignItems: 'center', paddingTop: SH * 0.12, marginBottom: 40 },
  logoText: {
    fontFamily: fonts.body,
    fontSize: 56,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 14,
    marginBottom: 16,
  },
  subtitleText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.coral,
    letterSpacing: 6,
  },

  // Cards
  cardsContainer: { paddingHorizontal: 20, gap: 16, marginBottom: 30 },
  slideCard: {
    backgroundColor: colors.surface2 + 'E6',
    borderWidth: 1,
    borderColor: colors.border + '80',
    padding: 20,
  },
  slideShapeBox: {
    width: 56,
    height: 56,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  slideShapeIcon: { fontSize: 24, fontWeight: '700' },
  slideTitle: {
    fontFamily: fonts.body,
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  slideDesc: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 21,
  },

  // Indicators
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 40,
  },
  indicatorShape: { fontSize: 16, fontFamily: fonts.mono },

  // Bottom
  bottomSection: { paddingHorizontal: 20, gap: 12 },
  joinBtn: {
    backgroundColor: colors.coral,
    paddingVertical: 20,
    alignItems: 'center',
  },
  joinBtnText: {
    fontFamily: fonts.body,
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 2,
  },
  loginBtn: {
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 18,
    alignItems: 'center',
  },
  loginBtnText: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 2,
  },
  orgLink: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.teal,
    textAlign: 'center',
    letterSpacing: 1.5,
    paddingVertical: 8,
  },
});
