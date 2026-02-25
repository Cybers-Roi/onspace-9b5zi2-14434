import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, runOnJS,
} from 'react-native-reanimated';
import { colors, fonts } from '../constants/theme';

const { width: SW, height: SH } = Dimensions.get('window');

const STORIES = [
  {
    id: '1',
    username: 'LIVE_PKR2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=1200&fit=crop',
    timestamp: '2m ago',
  },
  {
    id: '2',
    username: 'ELITE_01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=1200&fit=crop',
    timestamp: '15m ago',
  },
];

const STORY_DURATION = 5000; // 5 seconds per story

export default function StoryViewerScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!isPaused) {
      progress.value = 0;
      progress.value = withTiming(
        1,
        { duration: STORY_DURATION },
        (finished) => {
          if (finished) {
            runOnJS(nextStory)();
          }
        }
      );
    }
  }, [currentIndex, isPaused]);

  const nextStory = () => {
    Haptics.selectionAsync();
    if (currentIndex < STORIES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.back();
    }
  };

  const prevStory = () => {
    Haptics.selectionAsync();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLongPress = () => {
    setIsPaused(true);
  };

  const handlePressOut = () => {
    setIsPaused(false);
  };

  const currentStory = STORIES[currentIndex];

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <ImageBackground
      source={{ uri: currentStory.image }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bars */}
        <View style={styles.progressBars}>
          {STORIES.map((_, idx) => (
            <View key={idx} style={styles.progressBarBg}>
              {idx === currentIndex ? (
                <Animated.View style={[styles.progressBarFill, progressStyle]} />
              ) : idx < currentIndex ? (
                <View style={[styles.progressBarFill, { width: '100%' }]} />
              ) : null}
            </View>
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarRing}>
              <ImageBackground
                source={{ uri: currentStory.avatar }}
                style={styles.avatar}
                imageStyle={{ borderRadius: 18 }}
              />
            </View>
            <View>
              <Text style={styles.username}>{currentStory.username}</Text>
              <Text style={styles.timestamp}>{currentStory.timestamp}</Text>
            </View>
          </View>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={colors.white} />
          </Pressable>
        </View>

        {/* Touch Zones */}
        <View style={styles.touchZones}>
          <Pressable
            style={styles.touchLeft}
            onPress={prevStory}
            onLongPress={handleLongPress}
            onPressOut={handlePressOut}
          />
          <Pressable
            style={styles.touchRight}
            onPress={nextStory}
            onLongPress={handleLongPress}
            onPressOut={handlePressOut}
          />
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <Pressable style={styles.replyBtn}>
            <Ionicons name="chatbubble-outline" size={20} color={colors.white} />
            <Text style={styles.replyText}>SEND MESSAGE △</Text>
          </Pressable>
          <Pressable style={styles.shareStoryBtn}>
            <Ionicons name="paper-plane-outline" size={20} color={colors.white} />
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  safeArea: { flex: 1 },

  // Progress
  progressBars: {
    flexDirection: 'row', gap: 4,
    paddingHorizontal: 8, paddingTop: 12,
  },
  progressBarBg: {
    flex: 1, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 3, backgroundColor: colors.white,
  },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, paddingVertical: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarRing: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 2, borderColor: colors.coral,
    padding: 1,
  },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  username: {
    fontFamily: fonts.body, fontSize: 13, fontWeight: '800', color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  timestamp: {
    fontFamily: fonts.mono, fontSize: 10, color: colors.white + 'CC', marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center', justifyContent: 'center',
  },

  // Touch Zones
  touchZones: {
    flex: 1, flexDirection: 'row',
  },
  touchLeft: { flex: 1 },
  touchRight: { flex: 1 },

  // Bottom
  bottomActions: {
    flexDirection: 'row', gap: 10,
    paddingHorizontal: 16, paddingBottom: 20,
  },
  replyBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 12, borderRadius: 24,
  },
  replyText: {
    fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white, letterSpacing: 0.5,
  },
  shareStoryBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
});
