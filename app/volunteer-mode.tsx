import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../constants/theme';
import { HexAvatar } from '../components/ui/HexAvatar';

const { width: SW } = Dimensions.get('window');

const tasks = [
  { id: '1', text: 'Scan VIP Guest QR codes', done: true, count: { current: 47, max: 50 } },
  { id: '2', text: 'Verify identification documents', done: true, count: { current: 32, max: 50 } },
  { id: '3', text: 'Distribute event wristbands', done: false, count: { current: 0, max: 80 } },
  { id: '4', text: 'Monitor ID badge station', done: false, count: null },
];

const teamMembers = [
  { id: '1', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', status: 'active' },
  { id: '2', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', status: 'active' },
  { id: '3', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', status: 'active' },
  { id: '4', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face', status: 'active' },
];

export default function VolunteerModeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tasksChecked, setTasksChecked] = useState<string[]>(['1', '2']);

  const toggleTask = (id: string) => {
    Haptics.selectionAsync();
    setTasksChecked(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const completedCount = tasksChecked.length;
  const totalCount = tasks.length;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Mode Banner */}
      <View style={styles.modeBanner}>
        <View style={styles.modeDot} />
        <Text style={styles.modeText}>VOLUNTEER MODE</Text>
        <View style={styles.modeShape}>
          <Text style={styles.modeShapeText}>△</Text>
        </View>
        <View style={styles.statusChip}>
          <Text style={styles.statusChipText}>● ON DUTY</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* Assignment Card */}
        <View style={styles.assignmentCard}>
          <Text style={styles.assignmentLabel}>YOUR ASSIGNMENT</Text>
          <View style={styles.assignmentHeader}>
            <Text style={styles.assignmentTitle}>REGISTRATION △</Text>
            <View style={styles.activeChip}>
              <Text style={styles.activeChipText}>ACTIVE △</Text>
            </View>
          </View>
          <View style={styles.assignmentLocation}>
            <Ionicons name="location" size={14} color={colors.teal} />
            <Text style={styles.assignmentLocationText}>LOCATION: DESK A</Text>
          </View>

          {/* Shift Timer */}
          <View style={styles.shiftBar}>
            <Text style={styles.shiftLabel}>⏱ SHIFT: 02:14 REMAINING</Text>
          </View>

          {/* Preview Image Placeholder */}
          <View style={styles.assignmentPreview}>
            <View style={styles.previewDots}>
              <View style={[styles.previewDot, { backgroundColor: colors.teal }]} />
              <View style={[styles.previewDot, { backgroundColor: colors.muted }]} />
            </View>
          </View>
        </View>

        {/* Tasks Checklist */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TASKS CHECKLIST</Text>
            <Text style={styles.sectionProgress}>{completedCount}/{totalCount} COMPLETE</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${(completedCount / totalCount) * 100}%` }]} />
          </View>

          <View style={styles.tasksList}>
            {tasks.map(task => (
              <Pressable
                key={task.id}
                style={[styles.taskItem, tasksChecked.includes(task.id) && styles.taskItemDone]}
                onPress={() => toggleTask(task.id)}
              >
                <View style={[styles.taskCheck, tasksChecked.includes(task.id) && styles.taskCheckDone]}>
                  {tasksChecked.includes(task.id) && <Text style={styles.taskCheckIcon}>✓</Text>}
                </View>
                <Text style={[styles.taskText, tasksChecked.includes(task.id) && styles.taskTextDone]}>
                  {task.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Team Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TEAM STATUS</Text>
          <View style={styles.teamRow}>
            {teamMembers.map(member => (
              <View key={member.id} style={styles.teamMember}>
                <HexAvatar uri={member.avatar} size={42} borderColor={colors.teal} borderWidth={2} />
                <View style={styles.teamMemberStatus} />
              </View>
            ))}
            <Pressable style={styles.teamChatBtn}>
              <Ionicons name="chatbubbles-outline" size={18} color={colors.white} />
              <Text style={styles.teamChatText}>CHAT WITH TEAM □</Text>
            </Pressable>
          </View>
        </View>

        {/* XP Earned */}
        <View style={styles.xpCard}>
          <Text style={styles.xpValue}>+150 XP EARNED</Text>
          <Text style={styles.xpLabel}>TACTICAL PERFORMANCE BONUS</Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        <View style={styles.bottomActions}>
          <Pressable style={styles.reportBtn}>
            <Ionicons name="alert-circle-outline" size={20} color={colors.coral} />
            <Text style={styles.reportBtnText}>REPORT ISSUE ○</Text>
          </Pressable>
          <Pressable style={styles.backupBtn}>
            <Ionicons name="help-circle-outline" size={20} color={colors.teal} />
            <Text style={styles.backupBtnText}>REQUEST BACKUP △</Text>
          </Pressable>
        </View>
        <Pressable style={styles.taskDoneBtn} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
          <Text style={styles.taskDoneBtnText}>TASK DONE □</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.base },

  modeBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface2, paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  modeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.teal },
  modeText: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.electric, letterSpacing: 0.5, flex: 1 },
  modeShape: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  modeShapeText: { fontSize: 16, color: colors.teal },
  statusChip: { backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 10, paddingVertical: 4 },
  statusChipText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal, letterSpacing: 0.5 },

  assignmentCard: {
    marginHorizontal: 16, marginTop: 16, marginBottom: 20,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 3, borderLeftColor: colors.coral, padding: 16,
  },
  assignmentLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted, letterSpacing: 1, marginBottom: 8 },
  assignmentHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  assignmentTitle: { fontFamily: fonts.body, fontSize: 20, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  activeChip: { backgroundColor: colors.teal + '20', borderWidth: 1, borderColor: colors.teal, paddingHorizontal: 10, paddingVertical: 4 },
  activeChipText: { fontFamily: fonts.mono, fontSize: 9, fontWeight: '700', color: colors.teal },
  assignmentLocation: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  assignmentLocationText: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal, fontWeight: '700' },
  shiftBar: { backgroundColor: colors.coral + '15', paddingVertical: 8, paddingHorizontal: 12, marginBottom: 14 },
  shiftLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.coral, fontWeight: '700', letterSpacing: 0.5 },
  assignmentPreview: {
    height: 120, backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border,
    alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10,
  },
  previewDots: { flexDirection: 'row', gap: 6 },
  previewDot: { width: 8, height: 8, borderRadius: 4 },

  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.body, fontSize: 16, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  sectionProgress: { fontFamily: fonts.mono, fontSize: 11, color: colors.teal, fontWeight: '700' },
  progressBarBg: { height: 6, backgroundColor: colors.border, marginBottom: 16, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: colors.teal },

  tasksList: { gap: 10 },
  taskItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, padding: 14,
  },
  taskItemDone: { backgroundColor: colors.teal + '10', borderColor: colors.teal },
  taskCheck: {
    width: 22, height: 22, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  taskCheckDone: { backgroundColor: colors.teal, borderColor: colors.teal },
  taskCheckIcon: { fontSize: 12, color: colors.base, fontWeight: '700' },
  taskText: { flex: 1, fontFamily: fonts.body, fontSize: 13, fontWeight: '600', color: colors.white },
  taskTextDone: { color: colors.muted, textDecorationLine: 'line-through' },

  teamRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  teamMember: { position: 'relative' },
  teamMemberStatus: {
    position: 'absolute', bottom: 0, right: 0,
    width: 10, height: 10, borderRadius: 5, backgroundColor: colors.teal,
    borderWidth: 2, borderColor: colors.base,
  },
  teamChatBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 10, marginLeft: 4,
  },
  teamChatText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: '700', color: colors.white },

  xpCard: {
    marginHorizontal: 16, marginBottom: 20, backgroundColor: colors.teal + '10',
    borderWidth: 1, borderColor: colors.teal, paddingVertical: 16, alignItems: 'center',
  },
  xpValue: { fontFamily: fonts.mono, fontSize: 24, fontWeight: '700', color: colors.teal, letterSpacing: 1 },
  xpLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.teal, marginTop: 4, letterSpacing: 0.5 },

  bottomBar: {
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: 16, paddingTop: 14, backgroundColor: colors.base,
  },
  bottomActions: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  reportBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1, borderColor: colors.coral, paddingVertical: 14,
  },
  reportBtnText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.coral },
  backupBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1, borderColor: colors.teal, paddingVertical: 14,
  },
  backupBtnText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '700', color: colors.teal },
  taskDoneBtn: { backgroundColor: colors.teal, paddingVertical: 18, alignItems: 'center' },
  taskDoneBtnText: { fontFamily: fonts.body, fontSize: 18, fontWeight: '900', color: colors.base, letterSpacing: 1 },
});
