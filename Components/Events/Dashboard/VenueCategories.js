import React, { useEffect, useState, Component } from "react";
import { Animated, Dimensions, FlatList, Image, ImageBackground, ScrollView, ToastAndroid, TouchableOpacity, View } from "react-native";

import Back from '../../../Assets/Icons/Back.svg'
import Chat from '../../../Assets/Icons/chat.svg'
import { ActivityIndicator, Modal, Text, TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Forward from '../../../Assets/Icons/forward.svg'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const VenueCategories = (props) => {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const [venueId, setVenueId] = useState("")
    const [tokenData, setTokenData] = useState("")

    const [data, setData] = useState()

    const GetToken = async () => {
        await AsyncStorage.getItem("token").then((rs) => {
            setTokenData(rs)
            GetVenueCategories(rs)
        })
        setData(props.route.params.data)
        console.log(data);
    }

    const GetVenueCategories = async (token) =>{
        await axios.get(`https://apnademand.com/api/venue/get-venueCategories/${venueId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((rs)=>{
            setData(rs.data.venue_categories)
        })
    }

    useEffect(() => {
        if (props.route.params) {
            setVenueId(props.route.params.id)
            console.log(venueId);
            GetToken()
        }
    },[!data, !props.route.params, tokenData])

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <View style={{ position: 'absolute' }}>
                <Image source={require('../../../Assets/Images/AppBg.png')} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableRipple onPress={() => { props.navigation.goBack() }} style={{ width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center', }} borderless>
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

export default VenueCategories