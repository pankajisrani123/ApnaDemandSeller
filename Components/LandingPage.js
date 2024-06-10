import react, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, ToastAndroid, View } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper'

import Delivery from '../Assets/Images/delivery.svg'
import Objects from '../Assets/Images/objects.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width


const LandingPage = (props) => {
    const [circle1, setCircle1] = useState("#FFCB40")
    const [circle2, setCircle2] = useState('lightgray')
    const [circle3, setCircle3] = useState('lightgray')

    const [token, setToken] = useState("")
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)

    const GetToken = async () => {
        const token = await AsyncStorage.getItem("token")
        setToken(token)
    }

    useEffect(() => {
        GetToken().then(() => {
            if (token) {
                setAuthenticated(true)
                console.log(authenticated);
            }
        }, err => {
            console.log(
                "Error"
            );
        })
    })
    return (
        <ScrollView style={{ flex: 1, paddingVertical: 20, flexDirection: 'column', backgroundColor: 'white', }}
            contentContainerStyle={{ alignItems: 'center', }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={require("../Assets/Applogo/Apnademandlogo.png")} />
                <ScrollView horizontal={true} style={{ flex: 1, marginVertical: 25 }}
                    showsHorizontalScrollIndicator={false} onScroll={(px) => {
                        if (px.nativeEvent.contentOffset.x.toString() >= screenWidth) {
                            setCircle1("lightgray")
                            setCircle2("#FFCB40")
                            setCircle3("lightgray")
                        }
                        if (px.nativeEvent.contentOffset.x.toString() >= screenWidth * 2) {
                            setCircle1("lightgray")
                            setCircle3("#FFCB40")
                            setCircle2("lightgray")
                        }
                        if (px.nativeEvent.contentOffset.x.toString() < screenWidth) {
                            setCircle2("lightgray")
                            setCircle1("#FFCB40")
                            setCircle3("lightgray")
                        }
                    }}
                    contentContainerStyle={{ alignItems: 'center' }}>
                    <Image source={require("../Assets/Images/LandingPageImage.jpg")} style={{
                        width: screenWidth, height: 280
                    }} />
                    <Delivery width={screenWidth} height={280} />
                    <Objects width={screenWidth} height={280} />
                </ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: circle1, borderRadius: 20 }} />
                    <View style={{ width: 10, height: 10, backgroundColor: circle2, borderRadius: 20, marginStart: 5 }} />
                    <View style={{ width: 10, height: 10, backgroundColor: circle3, borderRadius: 20, marginStart: 5 }} />
                </View>
            </View>
            <View style={{ marginTop: 25, flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Get Started With Apna Demand!</Text>
                <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 14, paddingHorizontal: 25, textAlign: 'center' }}>Start by choosing a feature and login to Apna Demand.</Text>
                <Button onPress={() => {
                    props.navigation.navigate("SellerLogin")
                }} textColor='white'
                    buttonColor='#FFCB40' labelStyle={{ paddingHorizontal: 50, paddingVertical: 10 }}
                >E-Commerce Store</Button>
                <Button onPress={() => {
                    setLoading(true)
                    setTimeout(() => {
                        if (authenticated) {
                            props.navigation.navigate("Dashboard")
                            setLoading(false)
                        } else {
                            props.navigation.navigate("EventLogin")
                            setLoading(false)
                        }
                    }, 2000);
                }} textColor='#FFCB40' mode='outlined'
                    style={{ marginTop: 15, borderColor: '#FFCB40' }}
                    labelStyle={{ paddingHorizontal: 55, paddingVertical: 10 }}>Events Place</Button>
            </View>
            <Portal>
                <Modal visible={loading}>
                    <ActivityIndicator size={50} color="#FFCB40"/>
                </Modal>
            </Portal>
        </ScrollView>
    )
}

export default LandingPage