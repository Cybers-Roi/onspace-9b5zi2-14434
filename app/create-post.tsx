import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { HexAvatar } from '../components/ui/HexAvatar';

const { width: SW } = Dimensions.get('window');

type PostType = 'update' | 'announcement' | 'poll';

const orgInfo = {
  name: 'VANGUARD OPERATIONS',
  level: 'LEVEL 04 ADMIN ACCESS',
  logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
};

export default function CreatePostScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [postType, setPostType] = useState<PostType>('announcement');
  const [content, setContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '', '']);

  const charCount = content.length;
  const charMax = 280;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>CANCEL ✗</Text>
        </Pressable>
        <Text style={styles.headerTitle}>NEW POST □</Text>
        <Pressable style={styles.publishBtn} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
          <Text style={styles.publishText}>PUBLISH △</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Org Identity */}
        <View style={styles.orgRow}>
          <View style={styles.orgHex}>
            <HexAvatar uri={orgInfo.logo} size={48} borderColor={colors.teal} borderWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.orgName}>{orgInfo.name}</Text>
            <Text style={styles.orgLevel}>{orgInfo.level}</Text>
          </View>
        </View>

        {/* Post Type Selector */}
        <View style={styles.typeRow}>
          <Pressable
            style={[styles.typeBtn, postType === 'update' && styles.typeBtnActive]}
            onPress={() => { setPostType('update'); Haptics.selectionAsync(); }}
          >
            <Text style={[styles.typeBtnText, postType === 'update' && styles.typeBtnTextActive]}>○ UPDATE</Text>
          </Pressable>
          <Pressable
            style={[styles.typeBtn, styles.typeAnnouncement, postType === 'announcement' && styles.typeBtnActive]}
            onPress={() => { setPostType('announcement'); Haptics.selectionAsync(); }}
          >
            <Text style={[styles.typeBtnText, postType === 'announcement' && styles.typeBtnTextActive]}>△ ANNOUNCEMENT</Text>
          </Pressable>
          <Pressable
            style={[styles.typeBtn, postType === 'poll' && styles.typeBtnActive]}
            onPress={() => { setPostType('poll'); Haptics.selectionAsync(); }}
          >
            <Text style={[styles.typeBtnText, postType === 'poll' && styles.typeBtnTextActive]}>□ POLL</Text>
          </Pressable>
        </View>

        {/* Content Input */}
        <View style={styles.composerSection}>
          <TextInput
            style={styles.textArea}
            placeholder="ENTER YOUR TRANSMISSION HERE..."
            placeholderTextColor={colors.muted + '80'}
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={charMax}
          />
          <Text style={styles.charCount}>{String(charCount).padStart(3, '0')} / {charMax}</Text>
        </View>

        {/* Media Toolbar */}
        <View style={styles.mediaRow}>
          <Pressable style={styles.mediaBtn}>
            <Ionicons name="image-outline" size={22} color={colors.white} />
          </Pressable>
          <Pressable style={styles.mediaBtn}>
            <Ionicons name="videocam-outline" size={22} color={colors.white} />
          </Pressable>
          <Pressable style={[styles.mediaBtn, styles.mediaBtnActive]}>
            <View style={styles.pollIcon}>
              <View style={styles.pollBar1} />
              <View style={styles.pollBar2} />
              <View style={styles.pollBar3} />
            </View>
          </Pressable>
          <Pressable style={styles.mediaBtn}>
            <Ionicons name="link-outline" size={22} color={colors.white} />
          </Pressable>
          <Pressable style={styles.mediaBtn}>
            <Ionicons name="location-outline" size={22} color={colors.white} />
          </Pressable>
        </View>

        {/* Poll Section (if poll type) */}
        {postType === 'poll' && (
          <View style={styles.pollSection}>
            <View style={styles.pollHeader}>
              <Text style={styles.pollTitle}>TRANSMISSION QUESTION</Text>
            </View>
            <TextInput
              style={styles.pollQuestionInput}
              placeholder="ENTER QUESTION..."
              placeholderTextColor={colors.muted}
              value={pollQuestion}
              onChangeText={setPollQuestion}
            />
            <View style={styles.optionsHeader}>
              <Text style={styles.optionsLabel}>OPTIONS</Text>
            </View>
            {pollOptions.map((opt, idx) => (
              <View key={idx} style={styles.optionRow}>
                <View style={styles.optionShape}>
                  <Text style={styles.optionShapeText}>{['○', '△', '□'][idx]}</Text>
                </View>
                <TextInput
                  style={styles.optionInput}
                  placeholder={`OPTION ${['ALPHA', 'BETA', 'GAMMA'][idx]}`}
                  placeholderTextColor={colors.muted}
                  value={opt}
                  onChangeText={(val) => {
                    const newOpts = [...pollOptions];
                    newOpts[idx] = val;
                    setPollOptions(newOpts);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        <Pressable style={styles.scheduleBtn} onPress={() => Haptics.selectionAsync()}>
          <Text style={styles.scheduleBtnText}>SCHEDULE POST ◇</Text>
        </Pressable>
        <Pressable
          style={styles.publishNowBtn}
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.back();
          }}
        >
          <Text style={styles.publishNowText}>PUBLISH NOW □</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  cancelBtn: {},
  cancelText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  headerTitle: { fontFamily: fonts.body, fontSize: 18, fontWeight: '900', color: colors.white, letterSpacing: 1 },
  publishBtn: {},
  publishText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.teal, letterSpacing: 0.5 },

  orgRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16,
  },
  orgHex: {},
  orgName: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 0.3 },
  orgLevel: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: 0.5, marginTop: 3 },

  typeRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  typeBtn: {
    flex: 1, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 12, alignItems: 'center', backgroundColor: colors.surface2,
  },
  typeAnnouncement: { backgroundColor: colors.teal + '10' },
  typeBtnActive: { backgroundColor: colors.teal, borderColor: colors.teal },
  typeBtnText: { fontFamily: fonts.body, fontSize: 12, fontWeight: '700', color: colors.muted, letterSpacing: 0.5 },
  typeBtnTextActive: { color: colors.base },

  composerSection: { paddingHorizontal: 16, marginBottom: 20 },
  textArea: {
    fontFamily: fonts.body, fontSize: 15, color: colors.white, lineHeight: 22,
    minHeight: 140, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 16, textAlignVertical: 'top',
  },
  charCount: {
    fontFamily: fonts.mono, fontSize: 11, color: colors.muted,
    textAlign: 'right', marginTop: 8,
  },

  mediaRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: 16, paddingVertical: 16, marginBottom: 20,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border,
  },
  mediaBtn: {
    width: 56, height: 56, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface2,
  },
  mediaBtnActive: { borderColor: colors.teal, backgroundColor: colors.teal + '10' },
  pollIcon: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  pollBar1: { width: 4, height: 12, backgroundColor: colors.teal },
  pollBar2: { width: 4, height: 18, backgroundColor: colors.teal },
  pollBar3: { width: 4, height: 8, backgroundColor: colors.teal },

  pollSection: { paddingHorizontal: 16, marginBottom: 24 },
  pollHeader: {
    borderLeftWidth: 3, borderLeftColor: colors.teal,
    paddingLeft: 12, marginBottom: 12,
  },
  pollTitle: {
    fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.teal, letterSpacing: 1,
  },
  pollQuestionInput: {
    fontFamily: fonts.body, fontSize: 14, color: colors.white,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    padding: 14, marginBottom: 16,
  },
  optionsHeader: { marginBottom: 10 },
  optionsLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 1 },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  optionShape: {
    width: 32, height: 32, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface2,
  },
  optionShapeText: { fontSize: 14, color: colors.teal },
  optionInput: {
    flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.white,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 10, paddingHorizontal: 12,
  },

  bottomBar: {
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: 16, paddingTop: 14, backgroundColor: colors.base,
  },
  scheduleBtn: {
    borderWidth: 1, borderColor: colors.gold, paddingVertical: 16,
    alignItems: 'center', marginBottom: 10,
  },
  scheduleBtnText: {
    fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.gold, letterSpacing: 0.5,
  },
  publishNowBtn: { backgroundColor: colors.coral + 'DD', paddingVertical: 18, alignItems: 'center' },
  publishNowText: {
    fontFamily: fonts.body, fontSize: 18, fontWeight: '900', color: colors.white, letterSpacing: 1,
  },
});
