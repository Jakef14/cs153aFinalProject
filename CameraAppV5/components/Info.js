import React from "react";
import { StyleSheet, Text } from "react-native";
import GlassView from "./GlassView";

const Info = () => {
    return (
        <GlassView style={styles.container}>
            <Text style={styles.title}>Created By: Jake Franklin</Text>
            <Text></Text>
            <Text style={styles.body}>
                This camera app was designed by Jake Franklin as a semester long
                project for the course COSI 153A Mobile Application Development at
                Brandeis University. Using React Native and Expo, Jake designed this
                to be a simple camera app with a few extra features.
            </Text>
        </GlassView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 20,
        alignSelf: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    body: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        margin: 10,
    },
});

export default Info;
