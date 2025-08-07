import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, SafeAreaView, Pressable } from "react-native";
import GlassView from "./GlassView";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useValue } from "./CameraAppContext";

const Settings = () => {
    const [getAIkey, setAIkey] = useState("");
    const [getWeatherKey, setWeatherKey] = useState("");
    const {currentValue, setCurrentValue} = useValue();


    const storeData = async (AIKey, WeatherKey) => {
        try {
        const jsonValue = JSON.stringify(AIKey, WeatherKey);
        await AsyncStorage.setItem("APIkey", jsonValue);
        console.log("storeData successful");
        } catch (e) {
        console.log("error in storeData ");
        console.dir(e);
        // saving error
        }
    };
    
    const clearAll = async () => {
        try {
        await AsyncStorage.clear();
        } catch (e) {
        console.log("error in clearData ");
        console.dir(e);
        // clear error
        }
    };

    const [aiVisible, setAIVisible] = useState(false);
    const [weatherVisible, setWeatherVisible] = useState(false);
    
    const showDialogAI = () => {
        setAIVisible(true);
    };

    const showDialogWeather = () => {
        setWeatherVisible(true);
    };

    const handleCancel = () => {
        setAIVisible(false);
        setWeatherVisible(false);
    };

    const handleOK = () => {
        let key = {AIKey: getAIkey, WeatherKey: getWeatherKey};
        storeData(key);
        setAIVisible(false);
        setWeatherVisible(false);
    };

    useEffect(() => {
        setAIkey(currentValue.AIContext);
        setWeatherKey(currentValue.WeatherContext);
    }, []);
    
    return (
    <SafeAreaView style={styles.container}>
        <GlassView style={styles.glass}>
            <View style={{flex:1}}>
                <View style={styles.settingItem}>
                    <Text style={styles.text}>AI key: {getAIkey}</Text>
                    <Pressable onPress={showDialogAI}>
                    <FontAwesome
                        name="edit"
                        size={24}
                        color="white"
                    />
                    </Pressable>
                    <Dialog.Container visible={aiVisible}>
                        <Dialog.Title>AI key</Dialog.Title>
                            <Dialog.Input
                                onChangeText={(text) => setAIkey(text)}
                                placeholder="Enter API key"
                                >
                            </Dialog.Input>
                        <Dialog.Button label="Save" onPress={() => {
                            handleOK();
                            setCurrentValue({ AIContext: getAIkey, WeatherContext: getWeatherKey });
                            }} />
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                    </Dialog.Container>
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.text}>Weather key: {getWeatherKey}</Text>
                    <Pressable onPress={showDialogWeather}>
                    <FontAwesome
                        name="edit"
                        size={24}
                        color="white"
                    />
                    </Pressable>
                    <Dialog.Container visible={weatherVisible}>
                        <Dialog.Title>Weather key</Dialog.Title>
                            <Dialog.Input
                                onChangeText={(text) => setWeatherKey(text)}
                                placeholder="Enter weather key"
                                >
                            </Dialog.Input>
                        <Dialog.Button label="Save" onPress={() => {
                            handleOK();
                            setCurrentValue({ AIContext: getAIkey, WeatherContext: getWeatherKey });
                            }} />
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                    </Dialog.Container>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={styles.button}>
                        <Button
                        title="Clear All"
                        color="white"
                        onPress={() => {
                            clearAll();
                            setCurrentValue({ AIContext: "", WeatherContext: "" });
                            setAIkey("");
                            setWeatherKey("");
                        }}
                        />
                    </View>
                </View>
            </View>
        </GlassView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    glass: {
        flex: 1,
        padding: 20,
    },
    textinput: {
        flex: 0.5,
        height: 40,
        borderColor: "white",
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    button: {
        margin: 5,
    },
    text: {
        flex: 2,
        color: "white",
        alignSelf: "center",
    },
    testpress: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 0,
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
      settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'gray',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },

});

export default Settings;
