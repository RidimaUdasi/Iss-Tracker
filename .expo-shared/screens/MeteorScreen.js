//api-key: 0vZK7RMQEAcVifiYHl5D7Yr3OiwdbSADBeHLyfgJ

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Alert,
    FlatList,
    Image,
    ImageBackground,
    Dimensions
} from "react-native";
import axios from 'axios';


export default class MeteorScreen extends Component{

    constructor(props) {
        super(props)
        this.state = {
            meteors: {}
        }
    }

    componentDidMount() {
        this.getMeteors();
    }

    getMeteors = () => {
        //this api gets the current location of the ISS when component HomeScreen mounts
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=0vZK7RMQEAcVifiYHl5D7Yr3OiwdbSADBeHLyfgJ")
            .then(response => {
                this.setState({meteors: response.data.near_earth_objects})
            })
            .catch(error => {
                alert(error.message)
            })
    }

    renderItem = ({ item }) => {
        let meteor = item
        let bg_img, speed, size;
        if (meteor.threat_score <= 30) {
            bg_img = require("../../assets/meteor_bg1.png")
            speed = require("../../assets/meteor_speed1.gif")
            size = 100
        } else if (meteor.threat_score <= 75) {
            bg_img = require("../../assets/meteor_bg2.png")
            speed = require("../../assets/meteor_speed1.gif")
            size = 150
        } else {
            bg_img = require("../../assets/meteor_bg3.png")
            speed = require("../../assets/meteor_speed1.gif")
            size = 200
        }

        return (
            <View>
                <ImageBackground source={bg_img} style={styles.backgroundImage}>
                    <View styles={styles.gifContainer}>
                        <Image source={speed} style={{ width: size, height: size, alignSelf: "center" }}></Image>
                        <View>
                            <Text style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}>{item.name}</Text>
                            <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Closest to Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Minimum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Maximum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Velocity (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Missing Earth by (KM) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    keyExtractor = (item, index) => index.toString();

    render() {

        //Object.Keys() is a JavaScript method that returns an array of all the keys of an Object
        if(Object.keys(this.state.meteors).length === 0) {
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
            /*We know that we have the keys as dates and their values as a list of objects
            containing meteor data. Our end result should be a master array that contains all
            the objects with meteor data.*/
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            
            //here we are flattening the array of arrays meteor_arr, so that we can access individual elements
            let meteors = [].concat.apply([], meteor_arr)

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                //we are multiplying 1000000000 to our threat score. This is because most of the values are in billions
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                //we are adding a new property "threat_score" to every array in meteors array
                element.threat_score = threatScore;
            });

            //how we can get the top 5 most threatful meteors?
            //We can first sort the array in descending order based on the threat score of the
            //meteor objects, and then take the first 5 with the slice() method.

            meteors.sort(function (a, b) {
                return b.threat_score - a.threat_score
            })
            meteors = meteors.slice(0, 5)

            //threat_score = diameter of meteor/distance by which the meteor misses Earth
            return(
                <View style={{
                    flex:1,
                    alignItems: 'center',
                    justifyContent: 'center'
    
                }}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={meteors}
                        renderItem={this.renderItem}
                        horizontal={true}
                    />
                    
                </View>
            )
        }   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});