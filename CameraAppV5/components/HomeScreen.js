import React from 'react';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import MetaData from './MetaData';
import CameraView from './CameraView';
import Settings from './Settings';
import Info from './Info';
import GlassView from './GlassView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, { flexDirection: 'column' }]}> 
      <GlassView style={styles.topBar}>
        <Pressable style={styles.InfoButton} onPress={() => navigation.navigate('Info')}>
          <Ionicons name="information-circle" size={25} color="white" />
        </Pressable>
        <Pressable style={styles.SettingsButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="ios-settings" size={25} color="white" />
        </Pressable>
      </GlassView>
      <View style={{ flex: 0.1 }} />
      <GlassView style={styles.metaWrapper}>
        <MetaData />
      </GlassView>
      <CameraView />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <Settings />
    </View>
  );
}

function InfoScreen() {
  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <Info />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <LinearGradient colors={['rgba(255,255,255,0.25)', 'rgba(0,0,0,0.85)']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
                headerTintColor: 'white',
                headerTransparent: true,
              }}
            >
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Info" component={InfoScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  metaWrapper: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  SettingsButton: {
    position: 'relative',
    right: 10,
  },
  InfoButton: {
    position: 'relative',
    left: 10,
  },
});

export default App;
