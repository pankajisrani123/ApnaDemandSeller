import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, RefreshControl, ScrollView, ToastAndroid, TouchableHighlight, TouchableOpacity, View, TextInput as TextInputBase } from "react-native";

import ProfilePic from '../../../Assets/Icons/profile_img.svg'
import { ActivityIndicator, Button, Card, Divider, Modal, Portal, Text, TextInput, TouchableRipple } from "react-native-paper";

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

    const [loading, setLoading] = useState(false)

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
    const [organizerName, setOrganizerName] = useState(organizerInfo?.name)
    const [token, setToken] = useState('')


    const GetToken = async () => {
        await AsyncStorage.getItem("token").then((res) => {
            if (res) {
                GetProfile(res)
                setToken(res)
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
                console.log(res.data.organizer);
                setOrganizer(res.data.organizer)
                setOrganizerInfo(res.data.organizer_info)
                if (organizer && organizerInfo) {
                    setOrganizerName(organizerInfo.name)
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
                }
            } else {
                ToastAndroid.SHORT("Authorization error", ToastAndroid.SHORT)
            }

        }).catch((err) => {
            console.log(err);
        });

    }

    const UpdateProfile = async () => {
        setLoading(true);
        const updateData = {
            name: organizerName,
            phone: phone,
            gstin: GSTIN ? GSTIN : null,
            uin: uin ? uin : null,
            pan: pan ? pan : null,
            aadhar: aadhar ? aadhar : null,
            account_holder_name: accountHolderName ? accountHolderName : null,
            account_number: accountNumber ? accountNumber : null,
            ifsc: ifsc ? ifsc : null,
            branch: branch ? branch : null,
            bank: bank ? bank : null,
            upi: upi ? upi : null,
            country: Country ? Country : null,
            city: city ? city : null,
            state: state ? state : null,
            zip_code: pincode ? pincode : null,
            address: address ? address : null,
            details: details ? details : null,
            designation: designation ? designation : null,
            facebook: facebook ? facebook : null,
            twitter: twitter ? twitter : null,
            linkedin: linkedin ? linkedin : null,
        };

        console.log(updateData);


        await axios.post(
            'https://event.apnademand.com/public/api/updateOrganizer',
            updateData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                setEditMode(false);
                setLoading(false);
            })
            .catch((error) => {
                ToastAndroid.show("An error occured while updating, Try again!", ToastAndroid.SHORT)
                setLoading(false);
            });
    }

    useEffect(() => {
        if (phone) {
            console.log(phone);
        } else {
            GetToken().then(() => {
                GetProfile(token)
            })
        }

    }, [organizer])

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

                <View style={{ flexDirection: 'row' }}>
                    {editMode ?
                        <Button buttonColor="red" mode="contained"
                            style={{ marginEnd: 20 }} onPress={() => { 
                                setLoading(true)
                                setEditMode(false)
                                setTimeout(() => {
                                    setLoading(false)
                                }, 1000);
                             }}>
                            <Text style={{
                                color: '#fff', fontSize: 16, fontWeight: 'bold'
                            }}>Cancel</Text>
                        </Button>
                        :
                        null}
                    <Button buttonColor="#FFCB40" onPress={() => {
                        if (editMode) {
                            UpdateProfile()
                        } else {
                            setLoading(true)
                            setEditMode(true)
                            setTimeout(() => {
                                setLoading(false)
                            }, 1500);
                        }
                    }} textColor="white" style={{ marginEnd: 5 }}>
                        {editMode ? "Save" : "Edit Mode"}
                    </Button>
                </View>
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
                                    <TextInputBase style={{
                                        fontWeight: 'bold', fontSize: 20, color: 'black',
                                        width: 180
                                    }} editable={editMode} value={organizerName ? organizerName : organizerInfo.name}
                                        onChangeText={((rs) => { setOrganizerName(rs) })} underlineColorAndroid={editMode ? "black" : 'transparent'} />
                                    <Text style={{ color: '#797979' }}>{organizer.username}</Text>
                                    <Text style={{ color: '#414141' }}>{organizer.email}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', padding: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>User Info</Text>
                                <Divider style={{ backgroundColor: '#A0A0A0', marginTop: 10 }} />


                                <View style={{ marginTop: 5 }}>
                                    <View>
                                        <TextInput mode="flat" value={phone ? phone : organizer.phone} disabled activeOutlineColor="#FFCB40"
                                            label="Phone" onChangeText={((rs) => { setPhone(rs) })} />
                                        <TextInput mode="flat" value={username ? username : organizer.username} disabled activeOutlineColor="#FFCB40"
                                            label="Username" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={email ? email : organizer.email} disabled activeOutlineColor="#FFCB40"
                                            label="Email" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={twitter ? twitter : organizer.twitter} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Twitter" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={linkedin ? linkedin : organizer.linkedin} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="LinkedIn" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={facebook ? facebook : organizer.facebook} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Facebook" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={designation ? designation : organizerInfo.designation} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Designation" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={details ? details : organizerInfo.details} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Details" style={{ marginTop: 5 }} />
                                    </View>
                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Document Details:</Text>
                                    <Divider style={{ backgroundColor: '#A0A0A0', marginTop: 10 }} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextInput mode="flat" value={aadhar ? aadhar : organizerInfo.aadhar} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Aadhar Number" />
                                        <TextInput mode="flat" value={pan ? pan : organizerInfo.pan} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="PAN Number" />
                                        <TextInput mode="flat" value={GSTIN ? GSTIN : organizerInfo.gstin} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="GSTIN" />
                                        <TextInput mode="flat" value={bank ? bank : organizerInfo.bank} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Bank Name" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={branch ? branch : organizerInfo.branch} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Branch" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={accountHolderName ? accountHolderName : organizerInfo.account_holder_name} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Account Holder Name" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={accountNumber ? accountNumber : organizerInfo.account_number} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Account Number" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={ifsc ? ifsc : organizerInfo.ifsc} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="IFSC" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={uin ? uin : organizerInfo.uin} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="UIN" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={upi ? upi : organizerInfo.upi} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="UPI ID" style={{ marginTop: 5 }} />
                                    </View>

                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Address Details:</Text>
                                    <Divider style={{ backgroundColor: '#A0A0A0', marginTop: 10 }} />
                                    <View style={{ marginTop: 5 }}>
                                        <TextInput mode="flat" value={address ? address : organizerInfo.address} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Address" />
                                        <TextInput mode="flat" value={city ? city : organizerInfo.city} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="City" />
                                        <TextInput mode="flat" value={state ? state : organizerInfo.state} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="State" />
                                        <TextInput mode="flat" value={pincode ? pincode : organizerInfo.zip_code} disabled={!editMode} activeOutlineColor="#FFCB40"
                                            label="Pincode" style={{ marginTop: 5 }} />
                                        <TextInput mode="flat" value={Country ? Country : organizerInfo.country} disabled={!editMode} activeOutlineColor="#FFCB40"
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
                {loading ?
                    <Portal>
                        <Modal style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                            visible={loading}>
                            <ActivityIndicator color="#FFCB40" />
                        </Modal>
                    </Portal>
                    :
                    null}
            </ScrollView>
        </View>
    )
}

export default Profile