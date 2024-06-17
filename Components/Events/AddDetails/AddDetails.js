import React, { useState } from "react";
import { Image, View } from "react-native";
import { Button, Text, TouchableRipple } from "react-native-paper";

import Uncheck from '../../../Assets/Icons/circle_uncheck.svg'
import Check from '../../../Assets/Icons/circle_check.svg'

import Back from '../../../Assets/Icons/Back.svg'
import Chat from '../../../Assets/Icons/chat.svg'

const AddDetails = (props) => {

    const [selectedTab, setSelectedTab] = useState([1])

    return (
        <View style={{ flex: 1, alignItems: "center", padding: 10, flex: 1 }}>

            {/* App Background */}
            <View style={{ position: 'absolute' }}>
                <Image source={require('../../../Assets/Images/AppBg.png')} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableRipple onPress={() => { props.navigation.goBack() }} style={{ width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center', }} borderless>
                        <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', opacity: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                            <Back />
                        </View>
                    </TouchableRipple>
                    <Text style={{ marginStart: 10, fontSize: 20 }}>Add Details</Text>

                </View>
                <TouchableRipple onPress={() => { }} style={{ width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} borderless>
                    <Chat />
                </TouchableRipple>
            </View>

            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%',
                marginTop: 30
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {selectedTab.includes(1) ?
                        <Check />
                        :
                        <Uncheck />}
                    <Text style={{ textAlign: 'center' }}>
                        {`Add\nImage`}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {selectedTab.includes(2) ?
                        <Check />
                        :
                        <Uncheck />}
                    <Text style={{ textAlign: 'center' }}>
                        {`Basic\nDetails`}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {selectedTab.includes(3) ?
                        <Check />
                        :
                        <Uncheck />}
                    <Text style={{ textAlign: 'center' }}>
                        {`Additional\nDetails`}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {selectedTab.includes(4) ?
                        <Check />
                        :
                        <Uncheck />}
                    <Text style={{ textAlign: 'center' }}>
                        {`Add\nVariant`}
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default AddDetails