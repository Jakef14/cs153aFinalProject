import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const GlassView = ({ children, intensity = 50, style }) => {
  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.glass, style]}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default GlassView;
