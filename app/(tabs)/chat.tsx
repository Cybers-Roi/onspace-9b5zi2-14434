import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../constants/theme';

const channels = [
  { id: '1', name: 'general', shape: '○', unread: 12, locked: false },
  { id: '2', name: 'team-formation', shape: '△', unread: 3, locked: false },
  { id: '3', name: 'announcements', shape: '□', unread: 1, locked: false },
  { id: '4', name: 'staff-only', shape: '◇', unread: 0, locked: true },
];

const messages = [
  { id: '1', type: 'system', text: '○ Ahmed joined the lobby.', time: '' },
  { id: '2', type: 'organizer', sender: 'ORGANIZER', playerNum: '', text: 'Welcome to the Squid Game tournament! Rules are simple: Survive each round to climb the leaderboard. Team play is encouraged but watch your back.', time: '10:42 AM', isAnnouncement: true },
  { id: '3', type: 'other', sender: 'Player #456', playerNum: '#456', text: 'Is anyone else nervous? The arena looks massive from the lobby entrance. △', time: '10:45 AM' },
  { id: '4', type: 'poll', question: 'Favorite first game? ○', options: [{ text: 'RED LIGHT GREEN LIGHT', pct: 68 }, { text: 'GLASS BRIDGE', pct: 32 }], time: '10:46 AM' },
  { id: '5', type: 'self', text: "Just stay focused on the objective. We've got this team! □", time: '10:48 AM' },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>EVENTFY #general</Text>
            <Text style={styles.headerSymbol}> ○</Text>
            <View style={styles.sportBadge}>
              <Text style={styles.sportBadgeText}>○ SPORT</Text>
            </View>
          </View>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>487 ONLINE</Text>
          </View>
        </View>
        <Pressable>
          <Ionicons name="people-outline" size={22} color={colors.white} />
        </Pressable>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messageArea}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateSeparator}>—— TODAY ——</Text>

        {messages.map(msg => {
          if (msg.type === 'system') {
            return (
              <Text key={msg.id} style={styles.systemMsg}>{msg.text}</Text>
            );
          }

          if (msg.type === 'organizer' || msg.isAnnouncement) {
            return (
              <View key={msg.id} style={styles.announcementCard}>
                <View style={styles.announcementHeader}>
                  <View style={styles.orgBadge}>
                    <Text style={styles.orgBadgeText}>ORGANIZER</Text>
                  </View>
                  <Text style={styles.msgTime}>{msg.time}</Text>
                </View>
                <View style={styles.announcementImagePlaceholder}>
                  <View style={styles.announcementArc} />
                  <Text style={styles.announcementPlaceholderText}>TOURNAMENT UPDATE</Text>
                </View>
                <Text style={styles.announcementTitle}>TOURNAMENT UPDATE</Text>
                <Text style={styles.announcementText}>{msg.text}</Text>
                <Pressable style={styles.rulesBtn}>
                  <Text style={styles.rulesBtnText}>READ FULL RULES □</Text>
                </Pressable>
              </View>
            );
          }

          if (msg.type === 'poll') {
            return (
              <View key={msg.id} style={styles.pollCard}>
                <Text style={styles.pollLabel}>COMMUNITY POLL △</Text>
                <Text style={styles.pollQuestion}>{msg.question}</Text>
                {msg.options?.map((opt, idx) => (
                  <View key={idx} style={styles.pollOption}>
                    <View style={[styles.pollBar, { width: `${opt.pct}%` }]} />
                    <Text style={styles.pollOptionText}>□ {opt.text}</Text>
                    <Text style={styles.pollPct}>{opt.pct}%</Text>
                  </View>
                ))}
              </View>
            );
          }

          if (msg.type === 'self') {
            return (
              <View key={msg.id} style={styles.selfMsgRow}>
                <View style={styles.selfBubble}>
                  <Text style={styles.selfMsgText}>{msg.text}</Text>
                </View>
                <Text style={styles.selfTime}>{msg.time}</Text>
              </View>
            );
          }

          return (
            <View key={msg.id} style={styles.otherMsgRow}>
              <View style={styles.msgAvatar}>
                <Text style={styles.msgAvatarText}>○</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.msgSender}>
                  <Text style={{ color: colors.coral }}>{msg.playerNum}</Text> {msg.sender}
                </Text>
                <View style={styles.otherBubble}>
                  <Text style={styles.otherMsgText}>{msg.text}</Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Typing indicator */}
        <View style={styles.typingRow}>
          <Text style={styles.typingShapes}>○ △ □</Text>
          <Text style={styles.typingText}>Several players are typing...</Text>
        </View>
      </ScrollView>

      {/* Input Bar */}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
        <View style={styles.inputIcons}>
          <Pressable><Text style={styles.inputIcon}>□</Text></Pressable>
          <Pressable><Text style={styles.inputIcon}>○</Text></Pressable>
          <Pressable><Text style={styles.inputIcon}>△</Text></Pressable>
        </View>
        <View style={styles.textInputWrap}>
          <Text style={styles.textInputPlaceholder}>Message #general...</Text>
        </View>
        <Pressable style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>SEND □</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface3 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  headerSymbol: {
    fontFamily: fonts.mono,
    fontSize: 14,
    color: colors.muted,
  },
  sportBadge: {
    backgroundColor: colors.teal + '20',
    borderWidth: 1,
    borderColor: colors.teal,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    borderRadius: 0,
  },
  sportBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: '700',
    color: colors.teal,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.teal,
  },
  onlineText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
  },
  messageArea: {
    flex: 1,
  },
  dateSeparator: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    marginVertical: 16,
  },
  systemMsg: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  announcementCard: {
    backgroundColor: colors.surface2,
    borderLeftWidth: 2,
    borderLeftColor: colors.teal,
    padding: 14,
    marginBottom: 16,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orgBadge: {
    backgroundColor: colors.teal,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  orgBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: '700',
    color: colors.base,
  },
  msgTime: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
  },
  announcementImagePlaceholder: {
    height: 160,
    backgroundColor: colors.surface3,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  announcementArc: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.coral,
    position: 'absolute',
    top: 20,
    opacity: 0.6,
  },
  announcementPlaceholderText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
  },
  announcementTitle: {
    fontFamily: fonts.body,
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 6,
  },
  announcementText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
    lineHeight: 20,
    marginBottom: 12,
  },
  rulesBtn: {
    borderWidth: 1,
    borderColor: colors.teal,
    paddingVertical: 10,
    alignItems: 'center',
  },
  rulesBtnText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  otherMsgRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgAvatarText: {
    fontSize: 14,
    color: colors.coral,
  },
  msgSender: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  otherBubble: {
    backgroundColor: colors.surface2,
    padding: 12,
    maxWidth: '90%',
  },
  otherMsgText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
    lineHeight: 19,
  },
  pollCard: {
    backgroundColor: colors.surface2,
    padding: 14,
    marginBottom: 16,
  },
  pollLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.teal,
    marginBottom: 6,
  },
  pollQuestion: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface3,
    padding: 10,
    marginBottom: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  pollBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.teal + '30',
  },
  pollOptionText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    zIndex: 1,
  },
  pollPct: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    zIndex: 1,
  },
  selfMsgRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  selfBubble: {
    backgroundColor: colors.coral + '25',
    borderRightWidth: 2,
    borderRightColor: colors.coral,
    padding: 12,
    maxWidth: '85%',
  },
  selfMsgText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
    lineHeight: 19,
  },
  selfTime: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginTop: 4,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  typingShapes: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.teal,
  },
  typingText: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
    fontStyle: 'italic',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface2,
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 8,
  },
  inputIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  inputIcon: {
    fontSize: 16,
    color: colors.muted,
  },
  textInputWrap: {
    flex: 1,
    backgroundColor: colors.surface3,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textInputPlaceholder: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
  },
  sendBtn: {
    backgroundColor: colors.coral,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendBtnText: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
