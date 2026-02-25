import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../constants/theme';
import { ShapeIcon } from '../../components/ui/ShapeIcon';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.base,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.select({
            ios: insets.bottom + 60,
            android: insets.bottom + 60,
            default: 70,
          }),
          paddingTop: 8,
          paddingBottom: Platform.select({
            ios: insets.bottom + 8,
            android: insets.bottom + 8,
            default: 8,
          }),
          paddingHorizontal: 8,
        },
        tabBarActiveTintColor: colors.coral,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontFamily: fonts.mono,
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'FEED',
          tabBarIcon: ({ color, focused }) => (
            <ShapeIcon shape="circle" size={22} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'EXPLORE',
          tabBarIcon: ({ color, focused }) => (
            <ShapeIcon shape="triangle" size={22} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'EVENTS',
          tabBarIcon: ({ color, focused }) => (
            <ShapeIcon shape="square" size={22} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <ShapeIcon shape="diamond" size={22} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'CHAT',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <ShapeIcon shape="hexagon" size={22} color={color} filled={focused} />
              <View style={styles.chatBadge}>
                <Text style={styles.chatBadgeText}>3</Text>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  chatBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.coral,
    borderRadius: 7,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
});
