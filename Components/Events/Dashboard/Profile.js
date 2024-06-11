import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ToastAndroid, View } from "react-native";

import ProfilePic from '../../../Assets/Icons/profile_img.svg'
import { Button, Text, TextInput, TouchableRipple } from "react-native-paper";

import Back from '../../../Assets/Icons/Back.svg'
import Geocoder from "react-native-geocoding";

const Profile = (props) => {

    const [businessAddress, setBusinessAddress] = useState("")
    const [personalAddress, setPersonalAddress] = useState("")

    const GetToken = async () => {
        await AsyncStorage.getItem("token").then((res) => {
            if (res) {
                GetProfile(res)
            } else {
                ToastAndroid.show("Authorization error", ToastAndroid.SHORT)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const [data, setData] = useState({})

    const GetProfile = async (tokenData) => {
        await axios.get('https://apnademand.com/api/venue/get-profile', {
            headers: {
                Authorization: `Bearer ${tokenData}`,
            },
        }).then((res) => {
            if (res) {
                if (res.data.status) {
                    setData(res.data.user_details)
                    GetLocations()
                } else {
                    ToastAndroid.SHORT("Authorization error", ToastAndroid.SHORT)
                }
            } else {
                ToastAndroid.show("Fetching data error, Try again!", ToastAndroid.SHORT)
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    const GetLocations = async () => {
        if(data && data.buissness_loc){
            await Geocoder.from(data.buissness_loc.latitude, data.buissness_loc.longitude)
                .then(json => {
                    setBusinessAddress(json.results[0].formatted_address)
                })
                .catch(error => console.warn(error));
        }

        if(data && data.personal_loc){
            await Geocoder.from(data.personal_loc.latitude, data.personal_loc.longitude)
                .then(json => {
                    setPersonalAddress(json.results[0].formatted_address)
                })
                .catch(error => console.warn(error));
        }
    }

    useEffect(() => {
        GetToken()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%', padding: 10 }}>
            <View style={{ position: 'absolute', flex: 1, alignItems: 'center', width: '100%' }}>
                <Image source={require("../../../Assets/Images/AppBg.png")} />
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
                <Button mode="contained" buttonColor="#FFCB40">Save</Button>
            </View>

            <View style={{ width: 120, height: 120, borderRadius: 200, backgroundColor: 'white', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                {data ?
                    data.profile_pic ?
                        <Image source={data.profile_pic} />
                        :
                        <ProfilePic />
                    :
                    null}
            </View>
            <Text style={{ marginTop: 15, fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
            <TextInput label="Email" mode="outlined" style={{ width: '80%', height: 40, backgroundColor: '#f6f6f6', marginTop: 30 }} activeOutlineColor="#FFCB40" value={data.email} />
            <TextInput label="Mobile Number" mode="outlined" style={{ width: '80%', height: 40, backgroundColor: '#f6f6f6', marginTop: 5 }} activeOutlineColor="#FFCB40" value={data.mobile_no} />
            <TextInput label="Address" mode="outlined" style={{ width: '80%', height: 40, backgroundColor: '#f6f6f6', marginTop: 5 }} activeOutlineColor="#FFCB40" value={data.address} />
            <TextInput label="Business Location" mode="outlined" style={{ width: '80%', height: 40, backgroundColor: '#f6f6f6', marginTop: 5 }} activeOutlineColor="#FFCB40" value={businessAddress}/>
            <TextInput label="Personal Location" mode="outlined" style={{ width: '80%', height: 40, backgroundColor: '#f6f6f6', marginTop: 5 }} activeOutlineColor="#FFCB40" value={personalAddress}/>
        </View>
    )
}

export default Profile