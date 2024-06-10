import React from "react";
import { Dimensions, View } from "react-native";
import { Button } from "react-native-paper";

const screenWidth = Dimensions.get('screen').width
const CustomButton = (props) => {

    const { color, onPress, label } = props;

    return (
        <View>
            <Button style={{ width: screenWidth - screenWidth / 4, borderRadius: 10, marginTop: 20, }} buttonColor={color}
                textColor='black' labelStyle={{ paddingVertical: 5, fontSize:16 }} onPress={() => {onPress()}}>{label}</Button>
        </View>
    )
}

export default CustomButton