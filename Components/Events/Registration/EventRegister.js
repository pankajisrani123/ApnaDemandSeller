import React, { useState } from "react";
import { Alert, Image, ImageBackground, ScrollView, View } from "react-native";
import TextField from "../../UIElements/TextField";
import { Checkbox, Text } from "react-native-paper";
import CustomButton from "../../UIElements/CustomButton";

const EventRegister = (props) => {

    const [mobileNumber, setMobileNumber] = useState('')
    const [emailID, setEmailID] = useState('')
    const [password, setPassword] = useState('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&])[A-Za-z\d@#$%^&]{8,}$/;

    const NavigateToAccountDetailsGST = () => {
        if (mobileNumber && emailID && password) {
            if (mobileNumber.length !== 10) {
                Alert.alert("Error", "Mobile number must be exactly 10 digits");
            } else if (!emailRegex.test(emailID)) {
                Alert.alert("Error", "Invalid email format");
            } else if (!passwordRegex.test(password)) {
                Alert.alert("Error", "Password must be at least 8 characters long, including letters, numbers, 1 special character, and 1 capital letter");
            } else {
                props.navigation.navigate("AccountDetailsGST", {mob:mobileNumber, email:emailID, password:password});
            }
        } else {
            Alert.alert("Error", "Please fill all fields");
        }
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, alignItems: 'center', padding: 15 }}>
            <View style={{ position: 'absolute', flex: 1 }}>
                <Image source={require('../../../Assets/Images/AppBg.png')} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../Assets/Applogo/Apnademandlogo.png')} />
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Partner Account</Text>
                    <Text>Sell Your Products To Crores Of Buyers</Text>
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <TextField placeholder="Mobile Number" value={mobileNumber} onChangeText={(px) => { setMobileNumber(px) }} inputMode="numeric" password={false}/>
                <TextField placeholder="Email ID" value={emailID} onChangeText={(px) => { setEmailID(px) }} password={false}/>
                <TextField placeholder="Password" value={password} onChangeText={(px) => { setPassword(px) }} password={true}/>
                <View style={{ marginBottom: 30, marginTop: 20 }}>
                    <Text style={{ color: '#1c1c1c', fontSize: 15 }}>Make Your Password Strong by Adding:</Text>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 15, height: 15, borderRadius: 20, backgroundColor: '#c54c00' }} />
                            <Text style={{ marginStart: 5, color: '#727272' }}>{`Minimum 8 Characters (Letters & Number)`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ width: 15, height: 15, borderRadius: 20, backgroundColor: '#c54c00' }} />
                            <Text style={{ marginStart: 5, color: '#727272' }}>{`Minimum 1 Special Character (@#$%^&)`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ width: 15, height: 15, borderRadius: 20, backgroundColor: '#c54c00' }} />
                            <Text style={{ marginStart: 5, color: '#727272' }}>{`Minimum 1 Capital Letter (A-Z)`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ width: 15, height: 15, borderRadius: 20, backgroundColor: '#c54c00' }} />
                            <Text style={{ marginStart: 5, color: '#727272' }}>{`Minimum 1 number (0-9)`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                </View>
                <CustomButton color="#c54c00" onPress={() => { NavigateToAccountDetailsGST() }} label="Next" />
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text>By clicking you agree to our</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', color: '#c54c00' }}>Terms and Conditions</Text>
                        <Text> and </Text>
                        <Text style={{ fontWeight: 'bold', color: '#c54c00' }}>Privacy Policy</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default EventRegister