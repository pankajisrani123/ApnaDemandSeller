import React, { useEffect, useState, Component } from "react";
import { Animated, Dimensions, FlatList, Image, ImageBackground, ScrollView, ToastAndroid, TouchableOpacity, View } from "react-native";

import Back from '../../../Assets/Icons/Back.svg'
import Chat from '../../../Assets/Icons/chat.svg'
import { Button, Text, TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Forward from '../../../Assets/Icons/forward.svg'
import Down from '../../../Assets/Icons/arowdown.svg'

const SelectVenue = (props) => {

    const [categoryData, setCategoryData] = useState()
    const [openId, setOpenId] = useState('')

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
        await AsyncStorage.getItem('token').then(async (rs) => {

            await axios.get(`https://apnademand.com/api/venue/get-venueCategories/${id}`, {
                headers: {
                    Authorization: `Bearer ${rs}`
                }
            }).then((rs) => {
                setCategoryData(rs.data.venue_categories)
                console.log(categoryData);
                props.navigation.navigate("VenueCategories", { id: id, data: categoryData })
            }, err => {
                console.log(err);
            })
        })


    }

    const [data, setData] = useState(null)

    const [authorized, setAuthorized] = useState(false)

    const SetExpandable = (id) => {
        // NavigateToCategories(id)
        if (openId == id) {
            setOpenId("")
        } else {
            setOpenId(id)
        }
    }


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
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 300 }}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity style={{
                                    backgroundColor: 'white', borderRadius: 10, borderWidth: 2,
                                    borderColor: '#FFCB40', width: Dimensions.get('screen').width - 50, marginTop: 20
                                }} activeOpacity={0.6} onPress={() => {
                                    SetExpandable(item.item.id)
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                                        <Text style={{ marginStart: 20, fontSize: 18 }}>{item.item.name}</Text>
                                        {item.item.id == openId ?
                                            <Down style={{ marginEnd: 20 }} />
                                            :
                                            <Forward style={{ marginEnd: 20, }} />}
                                        {/* NavigateToCategories(id) */}
                                    </View>
                                    {item.item.id == openId ?
                                        <View style={{}}>
                                            <Text style={{
                                                paddingTop: 10, paddingBottom: 5, paddingHorizontal: 20,
                                                fontSize: 16, fontWeight: 'bold'
                                            }}>Description:</Text>
                                            <Text style={{ paddingHorizontal: 20, fontSize: 15, paddingBottom: 20 }}>
                                                {item.item.description}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                                <View></View>
                                                <Button style={{ marginEnd: 20, marginBottom: 10 }} onPress={() => { NavigateToCategories(item.item.id) }} buttonColor="#FFCB40" textColor="white"
                                                    labelStyle={{ padding: 5 }}>
                                                    Open
                                                </Button>
                                            </View>
                                        </View>
                                        :
                                        null}
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