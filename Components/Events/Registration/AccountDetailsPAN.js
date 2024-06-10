import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, TextInput, View, TouchableOpacity, Alert } from "react-native";
import TextField from "../../UIElements/TextField";
import { Checkbox, IconButton, RadioButton, Text } from "react-native-paper";
import CustomButton from "../../UIElements/CustomButton";

import BackIos from '../../../Assets/Icons/Back.svg'
import axios from "axios";

const screenWidth = Dimensions.get('screen').width

const AccountDetailsPAN = (props) => {

    const [email, setEmail] = useState("")
    const [mob, setMob] = useState("")
    const [password, setPassword] = useState("")

    const [gstin, setGstin] = useState("")
    const [enrollmentNo, setEnrollmentNo] = useState("")
    const [taxGST, setTaxGST] = useState("")

    const [radioSelection, setRadioSelection] = useState("1")

    const [panNumber, setPanNumber] = useState("")
    const [aadharNumber, setAadharNumber] = useState("")


    const NavigateToBankDetails = () => {
        if (radioSelection == '1') {
            if (panNumber) {
                if (panNumber.length == 10) {
                    props.navigation.navigate("BankDetails", { email: email, mob: mob, password: password, taxGST: taxGST, gstin : gstin, enrollmentNo: enrollmentNo, taxPAN: "pan", pan: panNumber })
                } else {
                    Alert.alert("Error", "Incorrect Pan format, please try again!")
                }
            } else {
                Alert.alert("Error", "Please fill required fields");
            }
        } else {
            if (aadharNumber) {
                if (aadharNumber.length == 12) {
                    props.navigation.navigate("BankDetails", { email: email, mob: mob, password: password, taxGST: taxGST, gstin : gstin, enrollmentNo: enrollmentNo, taxPAN: "aadhar", aadhar: aadharNumber })
                } else {
                    Alert.alert("Error", 'Incorrect Aadhar format, please try again!')
                }
            } else {
                Alert.alert("Error", "Please fill required fields");
            }
        }
    }

    const SkipProcess = () => {
        props.navigation.navigate("BankDetails", { email: email, mob: mob, password: password, taxGST: taxGST, gstin : gstin, enrollmentNo: enrollmentNo, taxPAN: "" })
    }

    useEffect(() => {
        console.log(props.route.params);
        setEmail(props.route.params.email)
        setMob(props.route.params.mob)
        setPassword(props.route.params.password)
        setTaxGST(props.route.params.taxGST)

        if (props.route.params.taxGST) {
            if (props.route.params.taxGST == "gstin") {
                setGstin(props.route.params.gstin)
            } else {
                setEnrollmentNo(props.route.params.enrollmentNo)
            }
        }
    }, [])

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, alignItems: 'center', padding: 15 }}>
            <View style={{ position: 'absolute', flex: 1 }}>
                <Image source={require('../../../Assets/Images/AppBg.png')} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: screenWidth, justifyContent: 'space-between' }}>
                    <IconButton icon={BackIos} onPress={() => { props.navigation.goBack() }} />
                    <Image style={{ alignSelf: 'center' }} source={require('../../../Assets/Applogo/Apnademandlogo.png')} />
                    <View />
                </View>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Complete Account Details</Text>
                    <Text style={{ fontSize: 22, color: '#e69129' }}>Tax Details</Text>
                    <Text style={{ fontSize: 16, marginTop: 20 }}>Choose Your Tax Details:</Text>
                </View>
            </View>

            <View style={{ padding: 10 }}>

                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View><RadioButton status={radioSelection == '1' ? 'checked' : 'unchecked'} onPress={() => {
                            setRadioSelection('1')
                        }} color="#c54c00" /></View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#525252' }}>PAN Number</Text>
                            <Text style={{ fontSize: 12 }}>For Regular and Composition PAN Sellers.</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: 150, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white', marginTop: 10
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="ABCTY1234D" value={panNumber} onChangeText={(px) => { setPanNumber(px.toUpperCase()) }} 
                                    maxLength={10}/>
                                </View>
                                <TouchableOpacity style={{
                                    height: 35, backgroundColor: panNumber? 'blue' : 'gray', paddingHorizontal: 10,
                                    justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5
                                }} onPress={() => {
                                    if (panNumber) {
                                        if (panNumber.length == 10 && panNumber.includes('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8'||'9'||'0')) {
                                            Alert.alert("Success", 'Pan Number Verified!')
                                            console.log(panNumber.toUpperCase());
                                        } else {
                                            Alert.alert("Error", 'Invalid Pan Number, Try again!')
                                        }
                                    }
                                }}>
                                    <Text style={{color:panNumber? 'white' : '#1c1c1c'}}>Verify</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View><RadioButton status={radioSelection == '2' ? 'checked' : 'unchecked'} onPress={() => {
                            setRadioSelection('2')
                        }} color="#c54c00" /></View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#525252' }}>Aadhar Number</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: 150, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white', marginTop: 10
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="Aadhar Number" value={aadharNumber} onChangeText={(px) => { setAadharNumber(px) }} />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ marginTop: 30 }}>
                    <CustomButton color="#c54c00" onPress={() => { NavigateToBankDetails() }} label="Next" />
                    <CustomButton color="#c54c00" onPress={() => { SkipProcess() }} label="Skip" />
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text>By clicking you agree to our</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: '#c54c00' }}>Terms and Conditions</Text>
                            <Text> and </Text>
                            <Text style={{ fontWeight: 'bold', color: '#c54c00' }}>Privacy Policy</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AccountDetailsPAN