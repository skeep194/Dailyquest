import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RoundButton = (props) => {
    return (
    <TouchableOpacity
        onPress={props.onPress}
        style={{
            backgroundColor:props.backgroundColor,
            borderRadius:8, 
            width: '85%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom:props.marginBottom
        }}>
        <Text style={{
            color: 'white'
        }}>
            {props.text}
        </Text>
    </TouchableOpacity>
    )
}

export default RoundButton