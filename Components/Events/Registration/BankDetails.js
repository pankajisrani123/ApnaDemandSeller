import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, TextInput, View, TouchableOpacity, Alert } from "react-native";
import TextField from "../../UIElements/TextField";
import { Checkbox, IconButton, RadioButton, Text } from "react-native-paper";
import CustomButton from "../../UIElements/CustomButton";

import BackIos from '../../../Assets/Icons/Back.svg'
import axios from "axios";

const screenWidth = Dimensions.get('screen').width

const BankDetails = (props) => {

    const [email, setEmail] = useState("")
    const [mob, setMob] = useState("")
    const [password, setPassword] = useState("")

    const [gstin, setGstin] = useState("")
    const [enrollmentNo, setEnrollmentNo] = useState("")
    const [taxGST, setTaxGST] = useState("")
    const [pan, setPan] = useState('')
    const [aadhar, setAadhar] = useState("")
    const [taxPAN, setTaxPAN] = useState("")

    const [radioSelection, setRadioSelection] = useState('1')

    const [holderName, setHolderName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ifscCode, setIfscCode] = useState("")
    const [branch, setBranch] = useState("")
    const [bank, setBank] = useState("")

    const [upiId, setUpiId] = useState('')

    const NavigateToPickupAddress = () => {
        // props.navigation.navigate("PickupAddress")
        if (radioSelection == '1') {
            if (holderName && accountNumber && ifscCode && branch && bank) {
                if (!holderName.includes('1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9' || '0')) {
                    if (accountNumber.length >= 8 && accountNumber.length <= 17) {
                        props.navigation.navigate("PickupAddress", {
                            email: email, mob: mob, password: password, taxGST: taxGST, gstin: gstin, enrollmentNo: enrollmentNo, taxPAN: taxPAN, pan: pan, aadhar: aadhar,
                            holderName: holderName, accountNumber: accountNumber, ifscCode: ifscCode, branch: branch, bank: bank, bankMethod: 'account'
                        })
                    }
                } else {
                    Alert.alert("Error", "Account Holder Name is incorrect")
                }
            } else {
                Alert.alert("Error", "Please fill required fields");
            }
        } else {
            if (upiId) {
                if (upiId.includes("@")) {
                    props.navigation.navigate("PickupAddress", { email: email, mob: mob, password: password, taxGST: taxGST, gstin: gstin, enrollmentNo: enrollmentNo, taxPAN: taxPAN, pan: pan, aadhar: aadhar, upiId: upiId, bankMethod: 'upi' })
                } else {
                    Alert.alert("Error", "Incorrect UPI ID Format, Try again!")
                }
            } else {
                Alert.alert("Error", "Please fill required fields");
            }
        }
    }

    useEffect(() => {
        console.log(props.route.params);
        setEmail(props.route.params.email)
        setMob(props.route.params.mob)
        setPassword(props.route.params.password)
        setTaxGST(props.route.params.taxGST)
        setTaxPAN(props.route.params.taxPAN)

        if (props.route.params.taxGST) {
            if (props.route.params.taxGST == "gstin") {
                setGstin(props.route.params.gstin)
            } else {
                setEnrollmentNo(props.route.params.enrollmentNo)
            }
        }

        if (props.route.params.taxPAN) {
            if (props.route.params.taxPAN == "pan") {
                setPan(props.route.params.pan)
            } else {
                setAadhar(props.route.params.aadhar)
            }
        }

    }, [])
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', padding: 15 }}>
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
                    <Text style={{ fontSize: 22, color: '#e69129' }}>Bank Details</Text>
                    <Text style={{ fontSize: 16, marginTop: 20 }}>Choose Your Payment Option:</Text>
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
                            <Text style={{ fontSize: 12 }}>For Regular and Composition{"\n"} Bank Details Sellers.</Text>
                            <View style={{ marginTop: 10 }}>
                                <Text>Account Holder Name</Text>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white'
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="Holder Name" value={holderName} onChangeText={(px) => { setHolderName(px) }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>Account Number</Text>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'space-between',
                                    backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingRight: 10
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="000000000000" value={accountNumber} onChangeText={(px) => { setAccountNumber(px) }} inputMode="numeric"/>
                                    <TouchableOpacity onPress={()=>{
                                        if(accountNumber.length >= 8 && accountNumber.length <= 17){
                                            Alert.alert("Success", "Account number is verified!")
                                        }
                                    }}>
                                        <Text style={{ color: accountNumber.length>=8? 'blue' :'gray', }}>Verify</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>IFSC Code</Text>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white'
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="IFSC Code" value={ifscCode} onChangeText={(px) => { setIfscCode(px) }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>BRANCH</Text>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white'
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="BRANCH" value={branch} onChangeText={(px) => { setBranch(px) }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>Bank</Text>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white'
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="Bank" value={bank} onChangeText={(px) => { setBank(px) }} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View><RadioButton status={radioSelection == '2' ? 'checked' : 'unchecked'} onPress={() => {
                            setRadioSelection('2')
                        }} color="#c54c00" /></View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#525252' }}>UPI ID</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white', marginTop: 10
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="UPI ID" value={upiId} onChangeText={(px) => { setUpiId(px) }} />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ marginTop: 10 }}>
                    <CustomButton color="#c54c00" onPress={() => { NavigateToPickupAddress() }} label="Next" />
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

export default BankDetails