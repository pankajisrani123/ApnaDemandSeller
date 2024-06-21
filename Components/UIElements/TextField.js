import React, { useState } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";

const screenWidth = Dimensions.get('screen').width

const TextField = (props) => {

    const [focused, setFocused] = useState(false)

    const { label, placeholder, value, onChangeText, inputMode, password, maxLength } = props;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth - screenWidth / 4, borderWidth: 2, paddingHorizontal: 10, borderRadius: 10,
        borderColor: focused ? '#FFCB40' : 'lightgray', marginTop: 15, backgroundColor: 'white' }}>

            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={()=>{setFocused(true)}}
                onBlur={()=>{setFocused(false)}}
                cursorColor="#FFCB40" 
                inputMode={inputMode}
                secureTextEntry={password}
                maxLength={maxLength}/>
        </View>
    );
}

export default TextField