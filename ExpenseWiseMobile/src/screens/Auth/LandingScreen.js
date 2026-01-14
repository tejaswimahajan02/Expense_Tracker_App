import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { COLORS, SIZES, BRANDING, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <LinearGradient 
          colors={[COLORS.primary, COLORS.accent]} 
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Logo size="large" showTagline={false} />
            <Text style={styles.heroTitle}>{BRANDING.appName}</Text>
            <Text style={styles.heroSubtitle}>{BRANDING.tagline}</Text>
            <Text style={styles.heroDescription}>{BRANDING.description}</Text>
            
            {/* Illustration Placeholder */}
            <View style={styles.illustrationContainer}>
              <MaterialCommunityIcons name="chart-box" size={120} color={COLORS.textWhite + '40'} />
            </View>
          </View>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose {BRANDING.appName}?</Text>
          
          {BRANDING.features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons 
                  name={feature.icon} 
                  size={32} 
                  color={COLORS.primary} 
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to take control?</Text>
          <Text style={styles.ctaSubtitle}>Join thousands of users managing their finances smarter</Text>
          
          <Button
            title="Get Started Free"
            onPress={() => navigation.navigate('Register')}
            variant="primary"
            size="large"
            fullWidth
            icon="rocket-launch"
          />
          
          <Button
            title="I Already Have an Account"
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            size="medium"
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    paddingTop: SIZES.xxl + 20,
    paddingBottom: SIZES.xxl,
    paddingHorizontal: SIZES.lg,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
  },
  heroTitle: {
    fontSize: SIZES.h1 + 8,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginTop: SIZES.md,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: SIZES.h4,
    color: COLORS.textWhite,
    marginTop: SIZES.xs,
    fontWeight: '600',
    opacity: 0.95,
  },
  heroDescription: {
    fontSize: SIZES.body,
    color: COLORS.textWhite,
    textAlign: 'center',
    marginTop: SIZES.md,
    opacity: 0.9,
    lineHeight: 24,
    paddingHorizontal: SIZES.md,
  },
  illustrationContainer: {
    marginTop: SIZES.xl,
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textWhite + '10',
    borderRadius: SIZES.radiusXL,
  },
  featuresSection: {
    padding: SIZES.lg,
    paddingTop: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.lg,
    textAlign: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLarge,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  featureDescription: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  ctaSection: {
    padding: SIZES.lg,
    paddingTop: SIZES.xl,
    paddingBottom: SIZES.xxl,
  },
  ctaTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  ctaSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
});
