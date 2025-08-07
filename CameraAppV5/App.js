import { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppProvider from './components/CameraAppContext';
import HomeScreen from './components/HomeScreen';
import LottieView from 'lottie-react-native';


export default function App() {
  const animation = useRef(null);
  const [appIsReady, setAppIsReady] = useState(null);
  const [currentLocation, setLocation] = useState(null);
  const [camera, setCamera] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [AIKey, setAIKey] = useState(null);
  const [WeatherKey, setWeatherKey] = useState(null);
  const [regionName, setRegionName] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
  useEffect(() => {
    async function prepare() {
      getData();
      try {
        // Async Storage Call

        // load location and camera permissions
          let { locationStatus } = await Location.requestForegroundPermissionsAsync();
          if (locationStatus !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }

          let { status } = await Camera.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access camera was denied');
          }

          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setLocation(location);

          let camera = await Camera.getCameraPermissionsAsync();
          setCamera(camera);

        // Load region
        await getRegion();
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const getRegion = async () => {
    let response = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + latitude + '&longitude=' + longitude + '&localityLanguage=en');
    let json = await response.json();
    setRegionName(json.locality);
  }

  const getData = async () => {
    try {
    // the '@profile_info' can be any string
    const jsonValue = await AsyncStorage.getItem("APIkey");
    let data = null;
    if (jsonValue != null) {
        data = JSON.parse(jsonValue);
        setAIKey(data.AIKey);
        setWeatherKey(data.WeatherKey);
    } else {
        // this happens the first time the app is loaded
        // as there is nothing in storage...
        setAIKey("");
        setWeatherKey("3de1557d927fe1ec9d0fe673f3654579");
    }
    } catch (e) {
    console.log("error in getData ");
    // this shouldn't happen, but its good practice
    // to check for errors!
    console.dir(e);
    // error reading value
    }
};

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
    }
  }, [appIsReady]);

  if (!appIsReady) {
    animation.current?.play();
    return (
      <LinearGradient colors={['rgba(255,255,255,0.25)', 'rgba(0,0,0,0.85)']} style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'transparent',
          }}
          source={require('./assets/CameraLoading.json')}
        />
      </LinearGradient>
    );
  }

  const Data = { AIContext: AIKey, WeatherContext: WeatherKey, LocationContext: currentLocation, RegionContext: regionName, latitudeContext: latitude, longitudeContext: longitude}
  
  return (
    <AppProvider value={Data}>
      <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
        <HomeScreen/>
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

