import React from 'react';
import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const Quest = (props) => {

    const complete = () => {
        const reference = database().ref('user/'+auth().currentUser.uid+'/quest/'+props.items.name)
        reference.update({
            complete: true
        })
        ToastAndroid.show(props.items.name + ' complete!',ToastAndroid.SHORT)
    }

    return (
    <View
        style={props.style}>
        <View style={styles.mainView}>
            <View style={styles.questView}>
                <Text style={styles.questName}>{props.items.name}</Text>
                <Text style={styles.questDetail}>{props.items.detail}</Text>
                <Text style={styles.questUntil}>{props.items.until}</Text>
            </View>
            <View style={styles.questSubView}>
                <Button icon={{
                    name: 'checkmark-circle',
                    type: 'ionicon',
                    color: 'white',
                    onPress: complete
                }}/>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row'
    },
    questView: {
        flex: 3,
        margin: 10,
        //backgroundColor: 'red'
    },
    questSubView: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        //backgroundColor: 'blue'
    },
    questName: {
        fontSize: 20
    },
    questDetail: {
        color: 'gray'
    },
    questUntil: {
        //fontSize: ,
        color: 'red'
    }
})

export default Quest