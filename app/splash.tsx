import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay,
  withSpring, withSequence, Easing, interpolate,
} from 'react-native-reanimated';
import { colors, fonts, glowShadow } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

const { width: SW, height: SH } = Dimensions.get('window');

const SLIDES = [
  { id: '0', shape: '○', color: colors.neonPink, title: 'DISCOVER EVENTS NEAR YOU.', desc: 'Find local challenges, tournaments, and social gatherings in your sector. The map is your playground.' },
  { id: '1', shape: '△', color: colors.gold, title: 'COMPETE. VOLUNTEER. GROW.', desc: 'Earn prestige through action. Whether competing or contributing, every move increases your rank.' },
  { id: '2', shape: '□', color: colors.teal, title: 'YOUR SKILLS. VERIFIED.', desc: 'Your profile is your digital legacy. All achievements are permanent and cryptographically secured.' },
];

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeSplash } = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Rotating shape animations
  const circleRot = useSharedValue(0);
  const triangleRot = useSharedValue(0);
  const squareRot = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const slidesOpacity = useSharedValue(0);
  const btnsOpacity = useSharedValue(0);

  useEffect(() => {
    // Start rotating shapes
    circleRot.value = withRepeat(withTiming(360, { duration: 60000, easing: Easing.linear }), -1, false);
    triangleRot.value = withRepeat(withTiming(-360, { duration: 45000, easing: Easing.linear }), -1, false);
    squareRot.value = withRepeat(withTiming(360, { duration: 80000, easing: Easing.linear }), -1, false);

    // Staggered entrance
    logoOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    subtitleOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
    slidesOpacity.value = withDelay(1500, withTiming(1, { duration: 800 }));
    btnsOpacity.value = withDelay(2000, withTiming(1, { duration: 600 }));
  }, []);

  // Breathing subtitle animation
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
  const triangleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${triangleRot.value}deg` }],
  }));
  const squareStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${squareRot.value}deg` }],
  }));
  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));
  const breathStyle = useAnimatedStyle(() => ({ opacity: breathingOpacity.value }));
  const slidesStyle = useAnimatedStyle(() => ({ opacity: slidesOpacity.value }));
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

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length > 0) {
      setActiveSlide(Number(viewableItems[0].index));
    }
  }).current;

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={[styles.slideItem, { width: SW - 40 }]}>
      <View style={[styles.slideShapeBox, { borderColor: item.color + '40' }]}>
        <Text style={[styles.slideShapeIcon, { color: item.color }]}>{item.shape}</Text>
      </View>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDesc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Noise grain overlay effect via faint pattern */}
      <View style={styles.noiseOverlay} />

      {/* Rotating geometric shapes */}
      <Animated.View style={[styles.giantCircle, circleStyle]}>
        <View style={styles.circleInner} />
      </Animated.View>
      <Animated.View style={[styles.giantTriangleWrap, triangleStyle]}>
        <View style={styles.giantTriangle} />
      </Animated.View>
      <Animated.View style={[styles.giantSquare, squareStyle]}>
        <View style={styles.squareInner} />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        {/* Logo Section */}
        <View style={styles.heroSection}>
          <Animated.View style={[styles.logoWrap, logoStyle]}>
            <Text style={styles.logoText}>E V E N T F Y</Text>
          </Animated.View>
          <Animated.View style={[styles.subtitleWrap, breathStyle]}>
            <Text style={styles.subtitleText}>T H E   G A M E   H A S   B E G U N</Text>
          </Animated.View>
        </View>

        {/* Onboarding Slides */}
        <Animated.View style={[styles.slidesSection, slidesStyle]}>
          <FlatList
            ref={flatListRef}
            data={SLIDES}
            renderItem={renderSlide}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={SW - 40}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />

          {/* Shape-based progress indicators */}
          <View style={styles.indicators}>
            <View style={[styles.indicator, activeSlide === 0 && styles.indicatorActive]}>
              <Text style={[styles.indicatorShape, activeSlide === 0 ? { color: colors.neonPink } : { color: colors.muted }]}>○</Text>
            </View>
            <View style={[styles.indicator, activeSlide === 1 && styles.indicatorActive]}>
              <Text style={[styles.indicatorShape, activeSlide === 1 ? { color: colors.gold } : { color: colors.muted }]}>△</Text>
            </View>
            <View style={[styles.indicator, activeSlide === 2 && styles.indicatorActive]}>
              <Text style={[styles.indicatorShape, activeSlide === 2 ? { color: colors.teal } : { color: colors.muted }]}>□</Text>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Buttons */}
        <Animated.View style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }, btnsStyle]}>
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
      </SafeAreaView>
    </View>
  );
}

const CIRCLE_SIZE = SW * 0.85;
const TRI_SIZE = SW * 0.4;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base, position: 'relative', overflow: 'hidden' },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.015)',
    zIndex: 0,
  },
  safeArea: { flex: 1, zIndex: 10 },

  // Giant rotating shapes
  giantCircle: {
    position: 'absolute',
    top: SH * 0.02,
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
    borderColor: colors.neonPink + '25',
    backgroundColor: colors.neonPink + '06',
  },
  giantTriangleWrap: {
    position: 'absolute',
    top: SH * 0.03,
    right: -TRI_SIZE * 0.15,
    zIndex: 2,
  },
  giantTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: TRI_SIZE / 2,
    borderRightWidth: TRI_SIZE / 2,
    borderBottomWidth: TRI_SIZE * 0.866,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.gold + '15',
  },
  giantSquare: {
    position: 'absolute',
    bottom: SH * 0.28,
    left: -SW * 0.08,
    zIndex: 2,
  },
  squareInner: {
    width: SW * 0.35,
    height: SW * 0.35,
    borderWidth: 1.5,
    borderColor: colors.white + '12',
    backgroundColor: colors.white + '03',
  },

  // Hero
  heroSection: { alignItems: 'center', paddingTop: SH * 0.06, zIndex: 10 },
  logoWrap: { marginBottom: 12 },
  logoText: {
    fontFamily: fonts.body,
    fontSize: 48,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 10,
  },
  subtitleWrap: { marginBottom: 8 },
  subtitleText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.coral,
    letterSpacing: 5,
    textTransform: 'uppercase',
  },

  // Slides
  slidesSection: { flex: 1, justifyContent: 'center', zIndex: 10 },
  slideItem: {
    backgroundColor: colors.surface2 + 'CC',
    borderWidth: 1,
    borderColor: colors.border + '60',
    padding: 24,
    marginRight: 0,
  },
  slideShapeBox: {
    width: 44,
    height: 44,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  slideShapeIcon: { fontSize: 20, fontWeight: '700' },
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
    lineHeight: 22,
  },

  // Indicators
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 24,
  },
  indicator: { opacity: 0.5 },
  indicatorActive: { opacity: 1 },
  indicatorShape: { fontSize: 14, fontFamily: fonts.mono },

  // Bottom
  bottomSection: { paddingHorizontal: 20, gap: 12, zIndex: 10 },
  joinBtn: {
    backgroundColor: colors.coral,
    paddingVertical: 18,
    alignItems: 'center',
  },
  joinBtnText: {
    fontFamily: fonts.body,
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 2,
  },
  loginBtn: {
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 16,
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
    fontSize: 11,
    color: colors.teal,
    textAlign: 'center',
    letterSpacing: 1,
    paddingVertical: 6,
  },
});
