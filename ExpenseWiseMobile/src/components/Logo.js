import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, BRANDING } from '../constants/theme';

export default function Logo({ size = 'medium', showTagline = false, variant = 'default' }) {
  const iconSize = size === 'large' ? 64 : size === 'medium' ? 48 : 32;
  const titleSize = size === 'large' ? SIZES.h1 : size === 'medium' ? SIZES.h2 : SIZES.h3;
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={[styles.iconWrapper, { width: iconSize + 20, height: iconSize + 20 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons 
            name="wallet-outline" 
            size={iconSize} 
            color={COLORS.textWhite} 
          />
        </LinearGradient>
        <Text style={[
          styles.title, 
          { fontSize: titleSize },
          variant === 'white' && styles.titleWhite
        ]}>
          {BRANDING.appName}
        </Text>
      </View>
      {showTagline && (
        <Text style={[
          styles.tagline,
          variant === 'white' && styles.taglineWhite
        ]}>
          {BRANDING.tagline}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  iconWrapper: {
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  titleWhite: {
    color: COLORS.textWhite,
  },
  tagline: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
    fontWeight: '500',
  },
  taglineWhite: {
    color: COLORS.textWhite + 'CC',
  },
});
