import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'

const QuestInput = (props) => {
    return (
    <Input
        label={props.label}
        inputContainerStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        multiline={true}
        onChangeText={props.onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#D8D8D8',
        borderRadius: 8,
        maxHeight: 150,
        borderBottomWidth: 0,
    },
    labelStyle: {
        color: '#2E9AFE'
    }

})

export default QuestInput