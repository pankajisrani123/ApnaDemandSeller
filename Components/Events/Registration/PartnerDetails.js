import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, TextInput, View, TouchableOpacity, ToastAndroid } from "react-native";
import TextField from "../../UIElements/TextField";
import { Checkbox, IconButton, RadioButton, Text } from "react-native-paper";
import CustomButton from "../../UIElements/CustomButton";

import BackIos from '../../../Assets/Icons/Back.svg'
import axios from "axios";

import Geolocation from '../../../Assets/Icons/geolocation.svg'
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";

const screenWidth = Dimensions.get('screen').width

const PartnerDetails = (props) => {


    const [email, setEmail] = useState("")
    const [mob, setMob] = useState("")
    const [password, setPassword] = useState("")

    const [gstin, setGstin] = useState("")
    const [enrollmentNo, setEnrollmentNo] = useState("")
    const [taxGST, setTaxGST] = useState("")
    const [pan, setPan] = useState('')
    const [aadhar, setAadhar] = useState("")
    const [taxPAN, setTaxPAN] = useState("")

    const [holderName, setHolderName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ifscCode, setIfscCode] = useState("")
    const [branch, setBranch] = useState("")
    const [bank, setBank] = useState("")

    const [businessLatitude, setBusinessLatitude] = useState("")
    const [businessLongitude, setBusinessLongitude] = useState("")
    const [businessName, setBusinessName] = useState("")

    const [personalName, setPersonalName] = useState('')
    const [personalLatitude, setPersonalLatitude] = useState("")
    const [personalLongitude, setPersonalLongitude] = useState("")
    const [personalAddress, setPersonalAddress] = useState("")

    const [bankMethod, setBankMethod] = useState('')

    const [upiId, setUpiId] = useState('')

    const [isTax, setIsTax] = useState(false)
    const [flow, setFlow] = useState('')

    useEffect(() => {


        console.log(props.route.params);
    })

    useEffect(() => {
        setEmail(props.route.params.email)
        setMob(props.route.params.mob)
        setPassword(props.route.params.password)
        setTaxGST(props.route.params.taxGST)
        setTaxPAN(props.route.params.taxPAN)
        setBankMethod(props.route.params.bankMethod)
        setBusinessName(props.route.params.businessName)
        setBusinessLatitude(props.route.params.businessLatitude)
        setBusinessLongitude(props.route.params.businessLongitude)
        setFlow(props.route.params.flow)

        if (props.route.params.taxGST) {
            setIsTax(true)
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

        if (bankMethod == 'account') {
            setHolderName(props.route.params.holderName)
            setAccountNumber(props.route.params.accountNumber)
            setIfscCode(props.route.params.ifscCode)
            setBranch(props.route.params.branch)
            setBank(props.route.params.bank)
        } else {
            setUpiId(props.route.params.upiId)
        }
    })

    // const [formData, setFormData] = useState({
    //     "mobile_no": mob,
    //     "email": email,
    //     "password": password,
    //     "gstin_no": taxGST == 'pan' ? pan : null,
    //     "uin_no": taxGST == 'enrollment' ? enrollmentNo : null,
    //     "pan_no": taxGST && taxPAN == 'pan' ? pan : null,
    //     "aadhar_no": taxGST && taxPAN == 'aadhar' ? aadhar : null,
    //     "acc_holder_name": bankMethod == 'account' ? holderName : null,
    //     "acc_no": bankMethod == 'account' ? accountNumber : null,
    //     "ifsc_code": bankMethod == 'account' ? ifscCode : null,
    //     "branch": bankMethod == 'account' ? branch : null,
    //     "bank": bankMethod == 'account' ? bank : null,
    //     "upi_id": bankMethod == 'upi' ? upiId : null,
    //     "buisness_name": businessName,
    //     "buissness_loc": {
    //         "latitude": parseFloat(businessLatitude),
    //         "longitude": parseFloat(businessLongitude)
    //     },
    //     "personal_loc": {
    //         "latitude": parseFloat(personalLatitude),
    //         "longitude": parseFloat(personalLongitude)
    //     },
    //     "name": personalName,
    //     "is_tax": isTax
    // })
    const GetAddress = () => {
        Geocoder.from(personalAddress)
            .then(json => {
                setPersonalAddress(json.results[0].formatted_address)
                setPersonalLatitude(json.results[0].geometry.location.lat)
                setPersonalLongitude(json.results[0].geometry.location.lng)
            })
            .catch(error => ToastAndroid.show("Error Fetching location", ToastAndroid.SHORT));
    }

    const GetCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                setPersonalLatitude(location.latitude.toString())
                setPersonalLongitude(location.longitude.toString())

                Geocoder.from({
                    latitude: personalLatitude,
                    longitude: personalLongitude
                }).then((rs) => {
                    setPersonalAddress(rs.results[1].formatted_address)
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch(error => {
                ToastAndroid.show("Error fetching current location", ToastAndroid.SHORT)
            })


    }

    const HandleSignup = async () => {

        setEmail(props.route.params.email)
        setMob(props.route.params.mob)
        setPassword(props.route.params.password)
        setTaxGST(props.route.params.taxGST)
        setTaxPAN(props.route.params.taxPAN)
        setBankMethod(props.route.params.bankMethod)
        setBusinessName(props.route.params.businessName)
        setBusinessLatitude(props.route.params.businessLatitude)
        setBusinessLongitude(props.route.params.businessLongitude)
        setFlow(props.route.params.flow)


        if (props.route.params.taxGST) {
            setIsTax(true)
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

        if (bankMethod == 'account') {
            setHolderName(props.route.params.holderName)
            setAccountNumber(props.route.params.accountNumber)
            setIfscCode(props.route.params.ifscCode)
            setBranch(props.route.params.branch)
            setBank(props.route.params.bank)
        } else {
            setUpiId(props.route.params.upiId)
        }
        console.log(accountNumber);
        const formData = {
            "mobile_no": props.route.params.mob,
            "email": props.route.params.email,
            "password": props.route.params.password,
            "gstin_no": taxGST == 'gstin' ? gstin : null,
            "uin_no": taxGST == 'enrollment' ? enrollmentNo : null,
            "pan_no": taxGST && taxPAN == 'pan' ? pan : null,
            "aadhar_no": taxGST && taxPAN == 'aadhar' ? aadhar : null,
            "acc_holder_name": bankMethod == 'account' ? holderName : null,
            "acc_no": bankMethod == 'account' ? accountNumber : null,
            "ifsc_code": bankMethod == 'account' ? ifscCode : null,
            "branch": bankMethod == 'account' ? branch : null,
            "bank": bankMethod == 'account' ? bank : null,
            "upi_id": bankMethod == 'upi' ? upiId : null,
            "buisness_name": businessName,
            "buissness_loc": {
                "latitude": parseFloat(businessLatitude),
                "longitude": parseFloat(businessLongitude)
            },
            "personal_loc": {
                "latitude": parseFloat(personalLatitude),
                "longitude": parseFloat(personalLongitude)
            },
            "name": personalName,
            "is_tax": isTax
        }




        if(flow=='event'){
            try {
                const res = await axios.post('https://apnademand.com/api/venue/signup', formData)
                if(res.data.status == true){
                    ToastAndroid.show("Registration complete, please login!", ToastAndroid.SHORT)
                    props.navigation.navigate("EventLogin")
                }else{
                    ToastAndroid.show("Error while registring user, Try again!", ToastAndroid.SHORT)
                }
            }
            catch (e) {
                console.log(e);
            }
        }else{
            ToastAndroid.show("Ecommerce needs to be implemented", ToastAndroid.SHORT)
        }
    }



    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, alignItems: 'center', padding: 15 }}>
            <View style={{ position: 'absolute', flex: 1, height: Dimensions.get('screen').height }}>
                <Image source={require('../../../Assets/Images/AppBg.png')} style={{ height: Dimensions.get('screen').height }} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: screenWidth, justifyContent: 'space-between' }}>
                    <IconButton icon={BackIos} onPress={() => { props.navigation.goBack() }} />
                    <Image style={{ alignSelf: 'center' }} source={require('../../../Assets/Applogo/Apnademandlogo.png')} />
                    <View />
                </View>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Complete Account Details</Text>
                    <Text style={{ fontSize: 22, color: '#e69129' }}>Partner Details</Text>
                    <Text style={{ fontSize: 16, marginTop: 20 }}>Choose Your Personal Details:</Text>
                </View>
            </View>

            <View style={{ padding: 10 }}>

                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View><RadioButton status="checked" color="#c54c00" /></View>
                        <View>

                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#525252' }}>Name</Text>
                            <Text style={{ fontSize: 12 }}>For Regular and Composition{"\n"} Address Details Sellers.</Text>
                            <View style={{ marginTop: 10 }}>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'center',
                                    backgroundColor: 'white'
                                }} >
                                    <TextInput style={{ fontSize: 12 }} placeholder="Shivam Raj" value={personalName} onChangeText={(px) => { setPersonalName(px) }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>Location</Text>
                                <View style={{
                                    borderRadius: 2, borderWidth: 1, borderColor: '#727272', height: 35, width: screenWidth - screenWidth / 2.7, alignItems: 'flex-start', justifyContent: 'space-between',
                                    backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingRight: 10
                                }} >
                                    <TextInput style={{ fontSize: 12, width: '90%' }} placeholder="Search Location / Find" value={personalAddress} onChangeText={(px) => { setPersonalAddress(px) }}
                                        onBlur={() => { GetAddress() }} />
                                    <TouchableOpacity onPress={() => {
                                        GetCurrentLocation()
                                    }}>
                                        <Geolocation />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>


                </View>

                <View style={{ marginTop: 100 }}>
                    <CustomButton color="#c54c00" onPress={() => { HandleSignup() }} label="Next" />
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

export default PartnerDetails 