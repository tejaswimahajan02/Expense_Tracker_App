import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
}) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (size === 'large') baseStyle.push(styles.large);
    if (size === 'small') baseStyle.push(styles.small);
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      switch (variant) {
        case 'primary':
          baseStyle.push(styles.primary);
          break;
        case 'secondary':
          baseStyle.push(styles.secondary);
          break;
        case 'outline':
          baseStyle.push(styles.outline);
          break;
        case 'ghost':
          baseStyle.push(styles.ghost);
          break;
        default:
          baseStyle.push(styles.primary);
      }
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    const baseStyle = [styles.text];
    
    if (size === 'large') baseStyle.push(styles.textLarge);
    if (size === 'small') baseStyle.push(styles.textSmall);
    
    if (variant === 'outline' || variant === 'ghost') {
      baseStyle.push(styles.textColored);
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.textWhite} />
      ) : (
        <>
          {icon && (
            <MaterialCommunityIcons 
              name={icon} 
              size={size === 'large' ? 24 : size === 'small' ? 16 : 20} 
              color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.textWhite}
              style={styles.icon}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    gap: SIZES.xs,
  },
  fullWidth: {
    width: '100%',
  },
  large: {
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radiusLarge,
  },
  small: {
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderRadius: SIZES.radiusSmall,
  },
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
    shadowColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.accent,
    ...SHADOWS.medium,
    shadowColor: COLORS.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: COLORS.border,
    opacity: 0.6,
  },
  text: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  textLarge: {
    fontSize: SIZES.h5,
  },
  textSmall: {
    fontSize: SIZES.bodySmall,
  },
  textColored: {
    color: COLORS.primary,
  },
  icon: {
    marginRight: SIZES.xs,
  },
});
