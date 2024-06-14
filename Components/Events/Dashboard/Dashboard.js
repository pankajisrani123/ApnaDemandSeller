import React, { useState } from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import { Card, Text } from "react-native-paper";

import HeaderText from '../../../Assets/Images/headertext.svg';
import BottomNavigationBar from '../../UIElements/BottomNavigationBar'; // Make sure to import your bottom navigation component
import GridList from '../../UIElements/GridList'; // Import the GridList component

const Dashboard = (props) => {

    const [tabSelection, setTabSelection] = useState(1);

    const items = [
        {
            img: require("../../../Assets/Images/venues1.png"),
            name: "Banquet Hall",
            location: "South Gandhi Maidam, Lodipur, Patna, Bihar",
            price: '10,000/',
            rating: '4.5'
        },
        {
            img: require("../../../Assets/Images/venues2.png"),
            name: "Banquet Hall",
            location: "South Gandhi Maidam, Lodipur, Patna, Bihar",
            price: '12,000/',
            rating: '4.5'
        },
        {
            img: require("../../../Assets/Images/venues1.png"),
            name: "Banquet Hall",
            location: "South Gandhi Maidam, Lodipur, Patna, Bihar",
            price: '10,000/',
            rating: '4.5'
        },
        {
            img: require("../../../Assets/Images/venues2.png"),
            name: "Banquet Hall",
            location: "South Gandhi Maidam, Lodipur, Patna, Bihar",
            price: '12,000/',
            rating: '4.5'
        },
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ position: 'absolute' }}>
                    <Image source={require('../../../Assets/Images/AppBg.png')} style={{ flex: 1, height: 1500 }} />
                </View>
                <HeaderText style={{ marginTop: 20 }} />
                <View style={{ height:280, }}>
                    <ImageSlider
                        data={[
                            { img: 'https://i.ibb.co/mhSnh53/banner.png' },
                            { img: 'https://i.ibb.co/mhSnh53/banner.png' },
                            { img: 'https://i.ibb.co/mhSnh53/banner.png' },
                            { img: 'https://i.ibb.co/mhSnh53/banner.png' }
                        ]}
                        autoPlay={true}
                        onClick={(item) => { console.log(item); }}
                        preview={false}
                    />
                </View>

                {/* Tab Layout Cards */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flex: 1, width: '100%' }}>
                    <TouchableOpacity onPress={() => { setTabSelection(1) }} activeOpacity={0.6}>
                        <Card style={{ backgroundColor: tabSelection == 1 ? '#FFCB40' : '#FFFFFF', width: 64, height: 93, opacity: tabSelection == 1 ? 0.9 : 0.7, borderRadius: 38 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../../../Assets/Images/venueicon.png')} style={{ width: 50, height: 50, marginTop: 10 }} />
                                <Text style={{ fontWeight: 'bold' }}>Venues</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setTabSelection(2) }} activeOpacity={0.6}>
                        <Card style={{ backgroundColor: tabSelection == 2 ? '#FFCB40' : '#FFFFFF', width: 64, height: 93, opacity: tabSelection == 2 ? 0.9 : 0.7, borderRadius: 38 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../../../Assets/Images/brideicon.png')} style={{ width: 50, height: 50, marginTop: 10 }} />
                                <Text style={{ fontWeight: 'bold' }}>Bride</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setTabSelection(3) }} activeOpacity={0.6}>
                        <Card style={{ backgroundColor: tabSelection == 3 ? '#FFCB40' : '#FFFFFF', width: 64, height: 93, opacity: tabSelection == 3 ? 0.9 : 0.7, borderRadius: 38 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../../../Assets/Images/photoicon.png')} style={{ width: 50, height: 50, marginTop: 10 }} />
                                <Text style={{ fontWeight: 'bold' }}>Photo</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setTabSelection(4) }} activeOpacity={0.6}>
                        <Card style={{ backgroundColor: tabSelection == 4 ? '#FFCB40' : '#FFFFFF', width: 64, height: 93, opacity: tabSelection == 4 ? 0.9 : 0.7, borderRadius: 38 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../../../Assets/Images/dockericon.png')} style={{ width: 50, height: 50, marginTop: 10 }} />
                                <Text style={{ fontWeight: 'bold' }}>Docker</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                </View>
                
                
                {/* Hardcoded Popular menu data */}
                <Text style={{ alignSelf: 'flex-start', marginStart: 25, marginTop: 30, fontSize: 22, fontWeight: 'bold' }}>
                    Popular Menu
                </Text>

                <GridList data={items} /> 
            </ScrollView>
            
            <BottomNavigationBar navigation={props.navigation} /> 
        </View>
    )
}

export default Dashboard;
