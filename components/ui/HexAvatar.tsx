import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Polygon, Defs, ClipPath } from 'react-native-svg';

interface HexAvatarProps {
  uri: string;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
}

export function HexAvatar({ uri, size = 48, borderColor = '#FF4D4D', borderWidth = 2 }: HexAvatarProps) {
  const outerSize = size + borderWidth * 2;

  return (
    <View style={[styles.container, { width: outerSize, height: outerSize }]}>
      <View style={[styles.hexOuter, {
        width: outerSize,
        height: outerSize,
        borderRadius: outerSize * 0.28,
        backgroundColor: borderColor,
        transform: [{ rotate: '0deg' }],
      }]}>
        <View style={[styles.hexInner, {
          width: size,
          height: size,
          borderRadius: size * 0.28,
          overflow: 'hidden',
        }]}>
          <Image
            source={{ uri }}
            style={{ width: size, height: size }}
            contentFit="cover"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hexInner: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
