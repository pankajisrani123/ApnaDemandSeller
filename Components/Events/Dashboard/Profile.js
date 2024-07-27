import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, RefreshControl, ScrollView, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from "react-native";

import ProfilePic from '../../../Assets/Icons/profile_img.svg'
import { ActivityIndicator, Button, Card, Divider, Text, TextInput, TouchableRipple } from "react-native-paper";

import Back from '../../../Assets/Icons/Back.svg'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import User from '../../../Assets/Icons/profile/user.svg'
import Facebook from '../../../Assets/Icons/profile/facebook.svg'
import Twitter from '../../../Assets/Icons/profile/twitter.svg'
import Linkedin from '../../../Assets/Icons/profile/linkedin.svg'
import Bank from '../../../Assets/Icons/profile/bank.svg'
import Upi from '../../../Assets/Icons/profile/upi.svg'
import Mail from '../../../Assets/Icons/profile/mail.svg'
import Phone from '../../../Assets/Icons/profile/phone.svg'
import Address from '../../../Assets/Icons/profile/address.svg'
import Id from '../../../Assets/Icons/profile/id.svg'

const Profile = (props) => {

    const [organizer, setOrganizer] = useState(null)
    const [organizerInfo, setOrganizerInfo] = useState(null)

    const [editMode, setEditMode] = useState(false)

    const [updateData, setUpdateData] = useState(null)

    // email, username, phone, photo, twitter, facebook, (organizer)
    // aadhar, bank details: account no.
    //  account holder name
    // bank, branch
    // city, country, address, name, pan, designation, zip code, state, upi (organizerInfo)


    // name:Raman Daksh
    // gstin:Raman123
    // uin:raman1234
    // pan:RAMAN12345
    // aadhar:691071793153
    // account_holder_name:Raman Daksh
    // account_number:12345678912
    // ifsc:LOLBANK
    // branch:DDN
    // bank:DDN BANK
    // upi:raman@okaxis
    // country:india
    // city:Dehradun
    // state:Uttarakhand
    // zip_code:248001
    // address:ISBT
    // details:Pearl Organisation
    // designation:Owner
    // facebook:fb
    // twitter:tw
    // linkedin:ln

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


    const GetProfile = async (tokenData) => {
        await axios.get('https://event.apnademand.com/public/api/getOrganizer', {
            headers: {
                Authorization: `Bearer ${tokenData}`,
            },
        }).then(async (res) => {
            if (res.data.status) {
                setOrganizer(res.data.organizer)
                setOrganizerInfo(res.data.organizer_info)
            } else {
                ToastAndroid.SHORT("Authorization error", ToastAndroid.SHORT)
            }

        }).catch((err) => {
            console.log(err);
        });

    }

    const UpdateProfile = () => {
        setEditMode(false)
    }

    useEffect(() => {
        GetToken()

        return () => {

        }

    }, [!organizer])

    return (
        <ScrollView style={{ flex: 1, width: '100%', }} contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
            <View style={{ position: 'absolute', flex: 1, alignItems: 'center', width: '100%' }}>
                <Image source={require("../../../Assets/Images/AppBg.png")} />
            </View>

            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', padding: 10, justifyContent: "space-between" }}>
                <TouchableRipple onPress={() => { props.navigation.goBack() }} style={{
                    width: 40, height: 40, borderRadius: 20,
                    justifyContent: 'center', alignItems: 'center'
                }} borderless>
                    <Back />
                </TouchableRipple>

                <Button buttonColor="#FFCB40" onPress={() => {
                    if (editMode) {
                        UpdateProfile()
                    } else {
                        setEditMode(true)
                    }
                }} textColor="white" style={{ marginEnd: 5 }}>
                    {editMode ? "Edit" : "Save"}
                </Button>
            </View>

            {organizer && organizerInfo ?

                <>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
                            width: '100%'
                        }}>
                            <TouchableOpacity onPress={() => { }} style={{}}>
                                <Card style={{ width: Dimensions.get('screen').width / 3, height: Dimensions.get('screen').width / 3, borderRadius: Dimensions.get('screen').width / 6 }}>
                                    <Image source={{ uri: "https://i.ibb.co/6mcc8LF/Group-18327.png" }}
                                        style={{ width: '100%', height: '100%' }} />
                                </Card>
                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{organizerInfo.name}</Text>
                                <Text style={{ color: '#797979' }}>{organizer.username}</Text>
                                <Text style={{ color: '#414141' }}>{organizer.email}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', padding: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>User Info</Text>
                            <Divider style={{ backgroundColor: '#A0A0A0', marginTop: 10 }} />
                            {/* user info:
                                Mobile
                                username
                                email
                                twitter
                                facebook
                                linkedin */}
                            {/* Document Details:
                                aadhar
                                bank name
                                branch
                                account holder name
                                account number
                                ifsc
                                upi id */}
                            {/* Address Info:
                                    address
                                    city
                                    state
                                    pincode 
                                    country*/}

                            <View style={{ marginTop: 5 }}>
                                <TextInput mode="outlined" label="Mobile" disabled={!editMode} value={organizer.phone} style={{ marginTop: 5 }} />
                                <TextInput mode="outlined" label="Mobile" disabled={!editMode} value={organizer.phone} style={{ marginTop: 5 }}
                                left/>
                                
                            </View>
                        </View>
                    </View>
                </>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color="#FFCB40" size={50} />
                </View>}
        </ScrollView>
    )
}

export default Profile