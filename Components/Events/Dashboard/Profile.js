import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { Image, ToastAndroid, View } from "react-native";



const Profile = (props) => {

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
        await axios.get('https://apnademand.com/api/venue/get-profile', {
            headers: {
                Authorization: `Bearer ${tokenData}`,
            },
        }).then((res) => {
            if (res) {
                if (res.data.status) {
                    console.log(res.data.user_details);
                } else {
                    ToastAndroid.SHORT("Authorization error", ToastAndroid.SHORT)
                }
            } else {
                ToastAndroid.show("Fetching data error, Try again!", ToastAndroid.SHORT)
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    useEffect(() => {
        GetToken()
    })

    return (
        <View>
            <View style={{ position: 'absolute', flex: 1 }}>
                <Image source={require("../../../Assets/Images/AppBg.png")} />
            </View>

        </View>
    )
}

export default Profile