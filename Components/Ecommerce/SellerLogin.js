import * as react from 'react'
import { ScrollView, View, Image, Dimensions, TextInput, ToastAndroid } from 'react-native'
import { ActivityIndicator, Button, Checkbox, Icon, IconButton, Modal, Portal, Text } from 'react-native-paper'
import * as SQLite from 'react-native-sqlite-storage'

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

const screenWidth = Dimensions.get('screen').width

const SellerLogin = (props) => {

    const [loading, setLoading] = react.useState(false)

    const [idTextState, setIdTextState] = react.useState(false)
    const [passTextState, setPassTextState] = react.useState(false)
    const [passEnabled, setPassEnabled] = react.useState(false)

    const [idValue, setIdValue] = react.useState('')
    const [passValue, setPassValue] = react.useState('')


    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('tokenEcom', value);
            await AsyncStorage.setItem('emailEcom', idValue);
            await AsyncStorage.setItem('passwordEcom', passValue);
            console.log("Success");
            ToastAndroid.show("Login Sucessful!", ToastAndroid.SHORT)
            props.navigation.replace("DashboardEcommerce")
            setLoading(false)
        } catch (e) {
            console.log(e);
        }
    };

    const HandleLogin = async () => {
        setLoading(true)
        if (idValue.length > 0 && passValue.length > 0) {
            const loginData = {
                'email': idValue,
                'password': passValue
            }
            await axios.post('https://apnademand.com/api/vendor/appSellerLogin', loginData).then((rs) => {
                setLoading(false)
                storeData(rs.data.api_token)
                console.log(rs.data.api_token);
            }).catch((e)=>{
                ToastAndroid.show(e, ToastAndroid.SHORT)
            })
            //**{"email": "Demomail@example.com", "flow": "ecommerce", "mob": "5686535686", "password": "Abc@1234"} */
        }
        else {
            alert('Please fill all fields')
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton icon={BackIos} onPress={() => { props.navigation.navigate('LandingPage') }} />
                <Image source={require('../../Assets/Applogo/SellOnLogo.png')} style={{ width: 150, height: 45 }} />
                <View style={{ width: screenWidth / 8 }} />
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <SellerLoginBackground height={200} style={{ marginTop: 30 }} />
                <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold', fontSize: 24 }}>Login</Text>
                <Text style={{ marginBottom: 20 }}>Login to Apna Demand Seller to Get Started!</Text>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', width: screenWidth - screenWidth / 4, borderWidth: 2, paddingHorizontal: 10, borderRadius: 10,
                    borderColor: idTextState ? '#FFCB40' : 'lightgray'
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
                    borderColor: passTextState ? '#FFCB40' : 'lightgray', marginTop: 15
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
                    textColor='black' labelStyle={{ paddingVertical: 5 }} onPress={() => { HandleLogin() }}>Login</Button>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>New User?</Text>
                    <Button onPress={() => {
                        props.navigation.navigate("EventRegister", { flow: 'ecommerce' })
                    }} textColor='#4d59ff' style={{ paddingHorizontal: -10 }}>Register Here</Button>
                </View>
            </View>
            {loading ?
                <Portal>
                    <Modal visible={loading} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} dismissable={false}>
                        <ActivityIndicator size={50} color='#FFCB40' />
                    </Modal>
                </Portal>
                :
                null}
        </ScrollView>
    )
}

export default SellerLogin