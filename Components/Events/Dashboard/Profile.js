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


    const [phone, setPhone] = useState(organizer?.phone)
    const [username, setUsername] = useState(organizer?.username)
    const [email, setEmail] = useState(organizer?.email)
    const [twitter, setTwitter] = useState(organizer?.twitter)
    const [facebook, setFacebook] = useState(organizer?.facebook)
    const [linkedin, setLinkedin] = useState(organizer?.linkedin)
    const [designation, setDesignation] = useState(organizerInfo?.designation)
    const [details, setDetails] = useState(organizerInfo?.details)
    const [aadhar, setAadhar] = useState(organizerInfo?.aadhar)
    const [pan, setPan] = useState(organizerInfo?.pan)
    const [GSTIN, setGSTIN] = useState(organizerInfo?.gstin)
    const [bank, setBank] = useState(organizerInfo?.bank)
    const [branch, setBranch] = useState(organizerInfo?.branch)
    const [accountHolderName, setAccountHolderName] = useState(organizerInfo?.account_holder_name)
    const [accountNumber, setAccountNumber] = useState(organizerInfo?.account_number)
    const [ifsc, setIfsc] = useState(organizerInfo?.ifsc)
    const [uin, setUin] = useState(organizerInfo?.uin)
    const [upi, setUpi] = useState(organizerInfo?.upi)
    const [address, setAddress] = useState(organizerInfo?.address)
    const [city, setCity] = useState(organizerInfo?.city)
    const [state, setState] = useState(organizerInfo?.state)
    const [pincode, setPincode] = useState(organizerInfo?.zip_code)
    const [Country, setCountry] = useState(organizerInfo?.country)


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
                setPhone(organizer.phone)
                setEmail(organizer.email)
                setUsername(organizer.username)
                setTwitter(organizer.twitter)
                setFacebook(organizer.facebook)
                setLinkedin(organizer.linkedin)
                setDesignation(organizerInfo.designation)
                setDetails(organizerInfo.details)
                setAadhar(organizerInfo.aadhar)
                setPan(organizerInfo.pan)
                setGSTIN(organizerInfo.gstin)
                setBank(organizerInfo.bank)
                setBranch(organizerInfo.branch)
                setAccountHolderName(organizerInfo.account_holder_name)
                setAccountNumber(organizerInfo.account_number)
                setIfsc(organizerInfo.ifsc)
                setUin(organizerInfo.uin)
                setUpi(organizerInfo.upi)
                setAddress(organizerInfo.address)
                setCity(organizerInfo.city)
                setState(organizerInfo.state)
                setPincode(organizerInfo.zip_code)
                setCountry(organizerInfo.country)
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
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
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
                    {editMode ? "Save" : "Edit Mode"}
                </Button>
            </View>

            <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                {organizer && organizerInfo ?

                    <>
                        <View style={{ flex: 1, width: '100%', alignItems: 'center', marginBottom: 150 }}>
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


                                <View style={{ marginTop: 5 }}>
                                    <View>
                                        <TextInput mode="flat" value={phone} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Phone" />
                                        <TextInput mode="flat" value={username} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Username" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={email} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Email" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={twitter} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Twitter" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={linkedin} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="LinkedIn" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={facebook} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Facebook" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={designation} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Designation" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={details} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Details" style={{ marginTop: 5 }} />
                                    </View>
                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Document Details:</Text>
                                    <Divider style={{ backgroundColor: '#A0A0A0', marginTop: 10 }} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextInput mode="flat" value={aadhar} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Aadhar Number" />
                                        <TextInput mode="flat" value={pan} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="PAN Number" />
                                        <TextInput mode="flat" value={GSTIN} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="GSTIN" />
                                        <TextInput mode="flat" value={bank} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Bank Name" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={organizerInfo.branch} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Branch" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={accountHolderName} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Account Holder Name" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={accountNumber} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Account Number" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={ifsc} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="IFSC" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={uin} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="UIN" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={upi} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="UPI ID" style={{ marginTop: 5 }} />
                                    </View>

                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Address Details:</Text>
                                    <Divider style={{ backgroundColor: '#A0A0A0', marginTop: 10 }} />
                                    <View style={{ marginTop: 5 }}>
                                        <TextInput mode="flat" value={address} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Address" />
                                        <TextInput mode="flat" value={city} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="City" />
                                        <TextInput mode="flat" value={state} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="State" />
                                        <TextInput mode="flat" value={pincode} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Pincode" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={Country} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Country" style={{ marginTop: 5 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color="#FFCB40" size={50} />
                    </View>}
            </ScrollView>
        </View>
    )
}

export default Profile