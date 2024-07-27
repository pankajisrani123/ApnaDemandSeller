import * as react from 'react'
import { ScrollView, View, Image, Dimensions, TextInput, ImageBackground, ToastAndroid } from 'react-native'
import { ActivityIndicator, Button, Checkbox, Icon, IconButton, Modal, Portal, Text } from 'react-native-paper'

import BackIos from '../../Assets/Icons/Back.svg'
import PersonUnfocused from '../../Assets/Icons/personunfocused.svg'
import PersonFocused from '../../Assets/Icons/personfocused.svg'
import LockFocused from '../../Assets/Icons/lockfocused.svg'
import LockUnfocused from '../../Assets/Icons/lockunfocused.svg'
import Eyeon from '../../Assets/Icons/eyeon.svg'
import Eyeoff from '../../Assets/Icons/eyeoff.svg'
import SellerLoginBackground from '../../Assets/Images/sellerloginpage.svg'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'

const screenWidth = Dimensions.get('screen').width

const EventLogin = (props) => {

    const [idTextState, setIdTextState] = react.useState(false)
    const [passTextState, setPassTextState] = react.useState(false)
    const [passEnabled, setPassEnabled] = react.useState(true)

    const [idValue, setIdValue] = react.useState('')
    const [passValue, setPassValue] = react.useState('')

    const [loading, setLoading] = react.useState(false)

    const { type, isConnected } = useNetInfo()

    const [connection, setConnection] = react.useState(false)

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('token', value);
            await AsyncStorage.setItem('email', idValue);
            await AsyncStorage.setItem('password', passValue);
            console.log("Success");
            props.navigation.replace("Dashboard")
            setLoading(false)
        } catch (e) {
            console.log(e);
        }
    };

    const HandleLogin = async () => {

        const loginData = {
            "email": idValue,
            "password": passValue
        }

        try {
            if (connection) {
                if (idValue && passValue) {
                    setLoading(true)
                    const res = await axios.post('https://event.apnademand.com/public/api/organizerlogin', loginData).then((rs) => {
                        storeData(rs.data.api_token)
                    }, err => {
                        // ToastAndroid.show("Login Failure, check your credentials!", ToastAndroid.SHORT)
                        console.log(err);
                        setLoading(false)
                    })
                } else {
                    ToastAndroid.show("Please enter required values", ToastAndroid.SHORT)
                    setLoading(false)
                }
            }
            else {
                ToastAndroid.show("Check your internet connection and try again!", ToastAndroid.SHORT)
                setLoading(false)
            }
        }
        catch (e) {
            console.log(e);
            setLoading(false)
        }

    }

    react.useEffect(() => {
        setConnection(isConnected)
        console.log(connection);
    }, [isConnected])

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{
            flex: 1
        }}>
            <View style={{ flex: 1, position: 'absolute' }}>
                <Image source={require('../../Assets/Images/EventLoginBg.png')} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>

                <View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, paddingHorizontal: 10 }}>
                        <IconButton icon={BackIos} onPress={() => { props.navigation.navigate('LandingPage') }} />
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold', fontSize: 24, color: 'white' }}>Login</Text>
                    <Text style={{ marginBottom: 20, color: 'white' }}>Login to Apna Demand Seller to Get Started!</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', width: screenWidth - screenWidth / 4, borderWidth: 2, paddingHorizontal: 10, borderRadius: 10,
                        borderColor: idTextState ? '#FFCB40' : 'lightgray', backgroundColor: 'white'
                    }}>
                        {idTextState ?
                            <PersonFocused />
                            :
                            <PersonUnfocused />}
                        <TextInput value={idValue} onChangeText={(px) => { setIdValue(px) }}
                            placeholder='Enter Your Id' underlineColorAndroid="transparent"
                            cursorColor="#FFCB40" style={{
                                width: screenWidth - screenWidth / 3, paddingHorizontal: 15,
                            }} onFocus={() => { setIdTextState(true) }} onBlur={() => { setIdTextState(false) }} />
                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', width: screenWidth - screenWidth / 4, borderWidth: 2, paddingHorizontal: 10, borderRadius: 10,
                        borderColor: passTextState ? '#FFCB40' : 'lightgray', marginTop: 15, backgroundColor: 'white'
                    }}>
                        {passTextState ?
                            <LockFocused />
                            :
                            <LockUnfocused />}
                        <TextInput value={passValue} onChangeText={(px) => { setPassValue(px) }}
                            placeholder='Enter Your Password' underlineColorAndroid="transparent"
                            cursorColor="#FFCB40" style={{
                                width: screenWidth - screenWidth / 2, paddingHorizontal: 15,
                            }} onFocus={() => { setPassTextState(true) }} onBlur={() => { setPassTextState(false) }} secureTextEntry={passEnabled} />
                        <IconButton icon={passEnabled ? Eyeon : Eyeoff} onPress={() => { setPassEnabled(!passEnabled) }} />
                    </View>
                    <Button style={{ width: screenWidth - screenWidth / 4, borderRadius: 10, marginTop: 20 }} buttonColor='#FFCB40'
                        textColor='black' labelStyle={{ paddingVertical: 5 }} onPress={() => {
                            HandleLogin()
                        }}>Login</Button>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>New User?</Text>
                        <Button onPress={() => { props.navigation.navigate("EventRegister", {flow:'event'}) }} textColor='#4d59ff' style={{ paddingHorizontal: -10 }}>Register Here</Button>
                    </View>
                </View>
            </View>
            <Portal>
                <Modal visible={loading}>
                    <ActivityIndicator size={50} color="#FFCB40" />
                </Modal>
            </Portal>
        </ScrollView>
    )
}

export default EventLogin