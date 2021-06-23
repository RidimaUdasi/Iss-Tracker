
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class IssLocationScreen extends Component{

    constructor(props) {
        super(props)
        this.state = {
            location: {}
        }
    }

    componentDidMount() {
        this.getIssLocation();
    }

    getIssLocation = () => {
        //this api gets the current location of the ISS when component HomeScreen mounts
        axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response => {
                this.setState({location: response.data})
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        //Object.Keys() is a JavaScript method that returns an array of all the keys of an Object
        if(Object.keys(this.state.location).length === 0) {
            return(
                <View style={{
                    flex:1,
                    justifyContent:"center",
                    alignItems: "center"
                }}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.SafeAreaView}/>
                    <ImageBackground source={require('../../assets/iss_bg.jpg')} style={styles.backgroundImage}>
                        <View style = {styles.titleBar}>
                            <Text style={styles.titleText}>ISS Location</Text>
                        </View> 
    
                        <View style = {styles.mapContainer}>
                            <MapView style={styles.map}
                                    initialRegion={{
                                        latitude: this.state.location.latitude,
                                        longitude: this.state.location.longitude,
                                        latitudeDelta: 100,
                                        longitudeDelta: 100
                                    }}>
    
                            </MapView>
                            <Marker 
                            coordinate={{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}>
                                <Image source={require("../../assets/iss_icon.png")} style={{width:50, height:50}}></Image>
                            </Marker>
                        </View> 
    
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Altitude(in KM): {this.state.location.altitude}</Text>
                            <Text style={styles.infoText}>Velocity(kmph): {this.state.location.velocity}</Text>
    
                        </View>   
                    </ImageBackground>
                </View>
            )
        }
        
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
        flex: 0.2,
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
        fontSize: 40,
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
        height: 160,
        width: 160,
        resizeMode: "contain",
        right: 20,
        top: -80
    },
    map: {
        width:"100%",
        height: "100%"
    },
    mapContainer: {
        flex:0.6
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: "white",
        marginTop: -10,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    infoText: {
        fontWeight: "bold",
        color: "black",
        fontSize: 15
    }

})

