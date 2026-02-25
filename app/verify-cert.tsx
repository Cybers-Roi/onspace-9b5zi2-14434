import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';

export default function VerifyCertScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [certCode, setCertCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleVerify = () => {
    Haptics.selectionAsync();
    if (certCode.toLowerCase().includes('efy')) {
      setIsVerified(true);
      setIsInvalid(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setIsVerified(false);
      setIsInvalid(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>VERIFY CERTIFICATE □</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Input Section */}
        <View style={styles.section}>
          <Text style={styles.label}>ENTER CODE</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputBox}>
              <Text style={styles.inputPrefix}>EFY-</Text>
              <TextInput
                style={styles.input}
                value={certCode}
                onChangeText={setCertCode}
                placeholder="XXXX-XXXX"
                placeholderTextColor={colors.muted + '80'}
                autoCapitalize="characters"
              />
              <View style={styles.inputShapes}>
                <Text style={styles.inputShape}>○</Text>
                <Text style={styles.inputShape}>△</Text>
                <Text style={styles.inputShape}>□</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.verifyBtn} onPress={handleVerify}>
            <Text style={styles.verifyBtnText}>VERIFY ○</Text>
          </Pressable>
        </View>

        {/* Verified State */}
        {isVerified && (
          <View style={styles.verifiedSection}>
            <View style={styles.verifiedBanner}>
              <Ionicons name="checkmark-circle" size={24} color={colors.teal} />
              <Text style={styles.verifiedText}>✓ CERTIFICATE VERIFIED</Text>
            </View>

            {/* Certificate Card */}
            <View style={styles.certCard}>
              {/* Top Strip */}
              <View style={styles.certStrip}>
                <Text style={styles.certStripLabel}>OFFICIAL SOCIAL PASSPORT</Text>
                <Text style={styles.certStripId}>EVENTFY ○△□</Text>
              </View>
              <View style={styles.certStripBottom}>
                <Text style={styles.certStripCode}>ID-8892-002</Text>
              </View>

              {/* Player Identity */}
              <View style={styles.certBody}>
                <Text style={styles.certLabel}>PLAYER IDENTITY</Text>
                <Text style={styles.certPlayerName}>AHMED BENALI</Text>

                <View style={styles.certRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.certFieldLabel}>EVENT TITLE</Text>
                    <Text style={styles.certFieldValue}>THE FINAL ELIMIN...</Text>
                  </View>
                  <View style={styles.certRoleBadge}>
                    <Text style={styles.certRoleText}>○ PARTICIPANT</Text>
                  </View>
                </View>

                <Text style={styles.certFieldLabel}>VERIFIED ATTRIBUTES</Text>
                <View style={styles.certTags}>
                  {['STRATEGY', 'ENDURANCE', 'AGILITY'].map(tag => (
                    <View key={tag} style={styles.certTag}>
                      <Text style={styles.certTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Verification Footer */}
                <View style={styles.certFooter}>
                  <View style={styles.certDots}>
                    <View style={[styles.certDot, { backgroundColor: colors.teal }]} />
                    <View style={[styles.certDot, { backgroundColor: colors.muted }]} />
                    <View style={[styles.certDot, { backgroundColor: colors.muted }]} />
                  </View>
                  <Text style={styles.certAuthText}>AUTHENTICATED BY EVENTFY NETWORK PROTOCOL</Text>
                </View>

                {/* QR Preview */}
                <View style={styles.certQR}>
                  <View style={styles.certQRInner}>
                    <Ionicons name="qr-code" size={32} color={colors.muted} />
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionBtns}>
              <Pressable style={styles.downloadBtn}>
                <Text style={styles.downloadBtnText}>DOWNLOAD PDF □</Text>
              </Pressable>
              <Pressable style={styles.shareBtn}>
                <Text style={styles.shareBtnText}>SHARE △</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Invalid State */}
        {isInvalid && (
          <View style={styles.invalidSection}>
            <View style={styles.invalidBanner}>
              <Ionicons name="close-circle" size={24} color={colors.coral} />
              <Text style={styles.invalidText}>✗ INVALID CODE</Text>
            </View>
            <View style={styles.invalidCard}>
              <Text style={styles.invalidTitle}>THE ENTERED CREDENTIALS DO NOT MATCH OUR DATABASE RECORDS. ACCESS DENIED TO SECURE VAULT.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: fonts.body, fontSize: 18, fontWeight: '900', color: colors.white, letterSpacing: 1 },

  section: { paddingHorizontal: 16, paddingTop: 24 },
  label: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, marginBottom: 14, letterSpacing: 0.5 },
  inputRow: { marginBottom: 16 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 14,
  },
  inputPrefix: { fontFamily: fonts.mono, fontSize: 14, color: colors.teal, fontWeight: '700', marginRight: 4 },
  input: { flex: 1, fontFamily: fonts.mono, fontSize: 14, color: colors.white, padding: 0 },
  inputShapes: { flexDirection: 'row', gap: 4 },
  inputShape: { fontSize: 10, color: colors.muted },

  verifyBtn: { backgroundColor: colors.coral, paddingVertical: 16, alignItems: 'center' },
  verifyBtnText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },

  verifiedSection: { paddingHorizontal: 16, marginTop: 24 },
  verifiedBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal,
    paddingVertical: 14, marginBottom: 20,
  },
  verifiedText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.teal, letterSpacing: 0.5 },

  certCard: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 16 },
  certStrip: {
    backgroundColor: colors.coral, flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 10,
  },
  certStripLabel: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  certStripId: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white },
  certStripBottom: { backgroundColor: colors.surface3, paddingHorizontal: 14, paddingVertical: 8 },
  certStripCode: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal, fontWeight: '700' },

  certBody: { padding: 16 },
  certLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 1, marginBottom: 8 },
  certPlayerName: { fontFamily: fonts.body, fontSize: 28, fontWeight: '900', color: colors.white, letterSpacing: 1, marginBottom: 20 },
  certRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  certFieldLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 0.5, marginBottom: 6 },
  certFieldValue: { fontFamily: fonts.body, fontSize: 16, fontWeight: '700', color: colors.white },
  certRoleBadge: { backgroundColor: colors.coral + '20', borderWidth: 1, borderColor: colors.coral, paddingHorizontal: 12, paddingVertical: 6 },
  certRoleText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.coral },

  certTags: { flexDirection: 'row', gap: 8, marginBottom: 20, marginTop: 8 },
  certTag: { backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 6 },
  certTagText: { fontFamily: fonts.mono, fontSize: 10, color: colors.white, fontWeight: '700' },

  certFooter: { marginBottom: 16 },
  certDots: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  certDot: { width: 8, height: 8, borderRadius: 4 },
  certAuthText: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, letterSpacing: 0.3 },

  certQR: { alignItems: 'flex-end' },
  certQRInner: {
    width: 80, height: 80, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },

  actionBtns: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  downloadBtn: { flex: 1, backgroundColor: colors.teal, paddingVertical: 14, alignItems: 'center' },
  downloadBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.base, letterSpacing: 0.5 },
  shareBtn: { flex: 1, borderWidth: 1, borderColor: colors.coral, paddingVertical: 14, alignItems: 'center' },
  shareBtnText: { fontFamily: fonts.body, fontSize: 14, fontWeight: '800', color: colors.coral, letterSpacing: 0.5 },

  invalidSection: { paddingHorizontal: 16, marginTop: 24 },
  invalidBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.coral + '20', borderWidth: 1, borderColor: colors.coral,
    paddingVertical: 14, marginBottom: 20,
  },
  invalidText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.coral, letterSpacing: 0.5 },
  invalidCard: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 3, borderLeftColor: colors.coral, padding: 16,
  },
  invalidTitle: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, lineHeight: 20 },
});
