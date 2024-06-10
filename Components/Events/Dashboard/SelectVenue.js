import React, { useEffect, useState, Component } from "react";
import { Animated, Dimensions, FlatList, Image, ImageBackground, ScrollView, ToastAndroid, TouchableOpacity, View } from "react-native";

import Back from '../../../Assets/Icons/Back.svg'
import Chat from '../../../Assets/Icons/chat.svg'
import { Text, TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Forward from '../../../Assets/Icons/forward.svg'

const SelectVenue = (props) => {



    const [categoryData, setCategoryData] = useState()

    const GetVenues = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token != null) {
            await axios.get('https://apnademand.com/api/venue/get-venues', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then((rs) => {
                if (rs.data.status == true) {
                    setAuthorized(true)
                    setData(rs.data.venue_data)
                } else {
                    setAuthorized(false)
                    ToastAndroid.show("Error loading data for venues, Try again!", ToastAndroid.SHORT)
                }
            })
        }
    }

    const NavigateToCategories = async (id) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            await axios.get(`https://apnademand.com/api/venue/get-venueCategories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((rs) => {
                setCategoryData(rs.data.venue_categories)
                props.navigation.navigate("VenueCategories", { id: id, data: categoryData })

            }, err => {
                console.log(err);
            })

        } else {
            ToastAndroid.show("Authorization Error", ToastAndroid.SHORT)
        }

    }

    const [data, setData] = useState(null)

    const [authorized, setAuthorized] = useState(false)


    useEffect(() => {
        GetVenues()
    }, [!data])

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <View style={{ position: 'absolute' }}>
                <Image source={require('../../../Assets/Images/AppBg.png')} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableRipple onPress={() => {
                        props.navigation.goBack()

                    }} style={{ width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center', }} borderless>
                        <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', opacity: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                            <Back />
                        </View>
                    </TouchableRipple>
                    <Text style={{ marginStart: 10, fontSize: 20 }}>Select Venue</Text>
                </View>
                <TouchableRipple onPress={() => { }} style={{ width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} borderless>
                    <Chat />
                </TouchableRipple>
            </View>

            <View style={{ marginTop: 30 }}>
                {data ?
                    <FlatList
                        data={data}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity style={{
                                    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, borderWidth: 2,
                                    borderColor: '#FFCB40', height: 50, width: Dimensions.get('screen').width - 50, marginTop: 20, justifyContent: 'space-between'
                                }} activeOpacity={0.6} onPress={() => {
                                    NavigateToCategories(item.item.id)
                                }}>
                                    <Text style={{ marginStart: 20, fontSize: 18 }}>{item.item.name}</Text>
                                    <Forward style={{ marginEnd: 20 }} />
                                </TouchableOpacity>
                            )
                        }} />
                    :
                    null}
            </View>
        </View>
    )
}

export default SelectVenue