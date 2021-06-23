import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class HomeScreen extends Component{
    render() {
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.SafeAreaView}/>
                <ImageBackground source={require('../../assets/bg_image.png')} style={styles.backgroundImage}>
                    <View style = {styles.titleBar}>
                        <Text style={styles.titleText}>ISS Location Tracker</Text>
                    </View> 

                    <TouchableOpacity style = {styles.routeCard} 
                    onPress={() =>
                        this.props.navigation.navigate("IssLocation")}>
                        <Text style = {styles.routeText}>ISS Location</Text>
                        <Text style={styles.knowMore}>{"Know More --->"}</Text>
                        <Text style={styles.bgDigit}>1</Text>
                        <Image source={require("../../assets/iss_icon.png")} style={styles.iconImage}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.routeCard}
                     onPress={() =>
                        this.props.navigation.navigate("Meteors")}>
                        <Text style = {styles.routeText}>Meteors</Text>
                        <Text style={styles.knowMore}>{"Know More --->"}</Text>
                        <Text style={styles.bgDigit}>2</Text>
                        <Image source={require("../../assets/meteor_icon.png")} style={styles.iconImage}></Image>
                    </TouchableOpacity>
                </ImageBackground>
                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    titleBar: {
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center"
    },
    routeCard: {
        flex: 0.25,
        width:200,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginLeft: 70,
        marginRight: 70,
        backgroundColor: "white",
        borderRadius: 30,
        borderWidth: 2
    },
    routeText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
        
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white", 
    },
    backgroundImage: {
        flex:1,
        resizeMode:"cover"
    },
    knowMore: {
        paddingLeft: 30,
        paddingTop: 20,
        color: "red",
        fontSize: 15
    },
    bgDigit: {
        position: "absolute",
        color: "rgba(183, 183, 183, 0.5)",
        fontSize: 150,
        right: 20,
        bottom: -15,
        zIndex: -1
    },
    iconImage: {
        position: "absolute",
        height: 120,
        width: 120,
        resizeMode: "contain",
        right: 80,
        top: -50
    }
})