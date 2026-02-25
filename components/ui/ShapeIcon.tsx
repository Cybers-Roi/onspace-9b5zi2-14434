import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShapeType } from '../../constants/theme';

interface ShapeIconProps {
  shape: ShapeType;
  size?: number;
  color?: string;
  filled?: boolean;
}

export function ShapeIcon({ shape, size = 24, color = '#F5F5F0', filled = false }: ShapeIconProps) {
  const borderWidth = 2;

  if (shape === 'circle') {
    return (
      <View style={[
        styles.center,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: filled ? color : 'transparent',
          borderWidth: filled ? 0 : borderWidth,
          borderColor: color,
        },
      ]} />
    );
  }

  if (shape === 'triangle') {
    const triSize = size * 0.9;
    if (filled) {
      return (
        <View style={{
          width: 0,
          height: 0,
          borderLeftWidth: triSize / 2,
          borderRightWidth: triSize / 2,
          borderBottomWidth: triSize * 0.866,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        }} />
      );
    }
    return (
      <View style={{
        width: 0,
        height: 0,
        borderLeftWidth: triSize / 2,
        borderRightWidth: triSize / 2,
        borderBottomWidth: triSize * 0.866,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}>
        <View style={{
          position: 'absolute',
          top: borderWidth + 1,
          left: -(triSize / 2 - borderWidth - 1),
          width: 0,
          height: 0,
          borderLeftWidth: (triSize / 2) - borderWidth - 1,
          borderRightWidth: (triSize / 2) - borderWidth - 1,
          borderBottomWidth: (triSize * 0.866) - (borderWidth * 2) - 2,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#0A0A0F',
        }} />
      </View>
    );
  }

  if (shape === 'square') {
    return (
      <View style={{
        width: size * 0.8,
        height: size * 0.8,
        backgroundColor: filled ? color : 'transparent',
        borderWidth: filled ? 0 : borderWidth,
        borderColor: color,
      }} />
    );
  }

  if (shape === 'diamond') {
    return (
      <View style={{
        width: size * 0.7,
        height: size * 0.7,
        backgroundColor: filled ? color : 'transparent',
        borderWidth: filled ? 0 : borderWidth,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }} />
    );
  }

  if (shape === 'hexagon') {
    return (
      <View style={[styles.center, {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: filled ? color : 'transparent',
        borderWidth: filled ? 0 : borderWidth,
        borderColor: color,
      }]} />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
