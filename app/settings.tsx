import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../template';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  const { showAlert } = useAlert();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);

  const handleLogout = () => {
    Haptics.selectionAsync();
    showAlert(
      'DISCONNECT?',
      'Are you sure you want to exit the game?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DISCONNECT',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            logout();
            router.replace('/splash');
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    rightElement,
  }: { 
    icon: string; 
    title: string; 
    subtitle?: string; 
    onPress?: () => void; 
    showArrow?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <Pressable 
      style={styles.settingItem}
      onPress={() => {
        if (onPress) {
          Haptics.selectionAsync();
          onPress();
        }
      }}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={20} color={colors.teal} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      ))}
    </Pressable>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>SETTINGS □</Text>
          <Text style={styles.headerSub}>CUSTOMIZE YOUR EXPERIENCE</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="person-outline"
              title="EDIT PROFILE"
              subtitle="Update your player information"
              onPress={() => router.push('/profile')}
            />
            <SettingItem
              icon="shield-checkmark-outline"
              title="PRIVACY & SECURITY"
              subtitle="Control who can see your data"
              onPress={() => {}}
            />
            <SettingItem
              icon="key-outline"
              title="CHANGE PASSWORD"
              subtitle="Update your authentication credentials"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="notifications-outline"
              title="PUSH NOTIFICATIONS"
              subtitle="Receive event alerts and updates"
              showArrow={false}
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.border, true: colors.teal + '40' }}
                  thumbColor={notificationsEnabled ? colors.teal : colors.muted}
                />
              }
            />
            <SettingItem
              icon="moon-outline"
              title="DARK MODE"
              subtitle="Currently enabled"
              showArrow={false}
              rightElement={
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: colors.border, true: colors.teal + '40' }}
                  thumbColor={darkModeEnabled ? colors.teal : colors.muted}
                />
              }
            />
            <SettingItem
              icon="language-outline"
              title="LANGUAGE"
              subtitle="English"
              onPress={() => {}}
            />
            <SettingItem
              icon="location-outline"
              title="LOCATION SERVICES"
              subtitle="Discover nearby events"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Data & Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATA & STORAGE</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="download-outline"
              title="DOWNLOAD MY DATA"
              subtitle="Export all your activity and certificates"
              onPress={() => {}}
            />
            <SettingItem
              icon="trash-outline"
              title="CLEAR CACHE"
              subtitle="Free up 124 MB"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="help-circle-outline"
              title="HELP CENTER"
              subtitle="FAQs and troubleshooting"
              onPress={() => {}}
            />
            <SettingItem
              icon="chatbubble-outline"
              title="CONTACT SUPPORT"
              subtitle="Get assistance from our team"
              onPress={() => {}}
            />
            <SettingItem
              icon="document-text-outline"
              title="TERMS & PRIVACY"
              subtitle="Legal information"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="information-circle-outline"
              title="APP VERSION"
              subtitle="v1.0.0 (Build 142)"
              showArrow={false}
            />
            <SettingItem
              icon="star-outline"
              title="RATE EVENTFY"
              subtitle="Share your feedback"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.coral }]}>DANGER ZONE</Text>
          <View style={styles.settingsGroup}>
            <Pressable 
              style={[styles.settingItem, styles.dangerItem]}
              onPress={handleLogout}
            >
              <View style={[styles.settingIcon, { backgroundColor: colors.coral + '20' }]}>
                <Ionicons name="log-out-outline" size={20} color={colors.coral} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: colors.coral }]}>DISCONNECT</Text>
                <Text style={styles.settingSubtitle}>Exit the game and return to splash</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.coral} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    fontFamily: fonts.body, fontSize: 20, fontWeight: '900', color: colors.white, letterSpacing: 0.5,
  },
  headerSub: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 2 },

  scrollContent: { paddingTop: 20 },

  section: { paddingHorizontal: 16, marginBottom: 28 },
  sectionTitle: {
    fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.muted,
    letterSpacing: 1, marginBottom: 12,
  },

  settingsGroup: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden',
  },

  settingItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 14, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 36, height: 36, borderRadius: 6,
    backgroundColor: colors.teal + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  settingContent: { flex: 1 },
  settingTitle: {
    fontFamily: fonts.body, fontSize: 14, fontWeight: '700', color: colors.white, letterSpacing: 0.3,
  },
  settingSubtitle: {
    fontFamily: fonts.mono, fontSize: 11, color: colors.muted, marginTop: 3,
  },

  dangerItem: {
    borderBottomWidth: 0,
  },
});
