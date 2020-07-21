import React from 'react';
import { Text, View, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements'

const QuestSetHeader = (props) => {
    return (
        
    <Header
        leftComponent={ {icon: 'arrow-back', color: '#FFFFFF', size: 30, onPress: () => props.navigation.goBack()} }
        centerComponent={ {text: 'Set the Quest!', style: { color: '#FFFFFF', fontSize: 20}} }
        rightComponent={ {icon: 'check', color:'#FFFFFF', size: 30, onPress: props.send} }
        containerStyle={{
            backgroundColor: '#8000FF'
        }}
        
    />
    )
}

export default QuestSetHeader