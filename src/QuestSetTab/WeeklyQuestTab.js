import React from 'react';
import { Text, View, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QuestSetHeader from '../QuestSetTab/QuestSetHeader'

const WeeklyQuestTab = (props) => {
    
    const send = () => {
        Alert.alert('weekly!!!')
    }

    useFocusEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({header: () => <QuestSetHeader send={send} navigation={props.navigation.dangerouslyGetParent()}/>})
    })

    return <Text>dasdf</Text>
}

export default WeeklyQuestTab