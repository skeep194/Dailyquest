import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert, StyleSheet, Button, ToastAndroid } from 'react-native';
import { ListItem, Input, Icon, CheckBox } from 'react-native-elements'
import QuestInput from '../components/QuestInput'
import DateTimePickerModal from 'react-native-modal-datetime-picker' 
import { useFocusEffect } from '@react-navigation/native'
import QuestSetHeader from '../QuestSetTab/QuestSetHeader'
import Modal from 'react-native-modal'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

const DailyQuestTab = (props) => {
    const [untilTime, setUntilTime] = useState('00:00')
    const [questDayArr, setQuestDayArr] = useState([true,true,true,true,true,true,true])
    const [questName, setQuestName] = useState('')
    const [questDetail, setQuestDetail] = useState('')

    const getQuestDay = (questDay) => {
        const dayName = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        var ret = ''
        var isAllday = true
        for(var i=0;i<dayName.length;++i) {
            if(questDay[i]) {
                ret += dayName[i]+', '
            }
            else {
                isAllday = false
            }
        }
        if(isAllday) return 'All'
        else return ret.substr(0,ret.length-2)
    }

    const setQuestDay = (index, value) => {
        var newQuestDay = questDayArr.concat()
        newQuestDay[index] = value
        setQuestDayArr(newQuestDay)
    }

    const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

    const showTimePicker = () => {
        setTimePickerVisibility(true)
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false)
    }

    const handleConfirm = (time) => {
        hideTimePicker()
        setUntilTime(time.toString().substr(16,5))
    }

    const [isDayPickerVisible, setDayPickerVisibility] = useState(false)

    const showDayPicker = () => {
        setDayPickerVisibility(true)
    }

    const hideDayPicker = () => {
        setDayPickerVisibility(false)
    }

    const list = [
        {
            name: 'reset time',
            subtitle: untilTime,
            onPress: showTimePicker,
            rightIcon: <Icon name='chevron-forward-outline' type='ionicon' color='gray'/>
        },
        {
            name: 'day',
            subtitle: getQuestDay(questDayArr),
            onPress: showDayPicker,
            rightIcon: <Icon name='chevron-forward-outline' type='ionicon' color='gray'/>
        }
    ]

    useFocusEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({header: () => <QuestSetHeader send={send} navigation={props.navigation.dangerouslyGetParent()}/>})
    })

    const send = () => {
        if(questName.length == 0) {
            Alert.alert('quest name is empty')
            return
        }
        const reference = database().ref('/user/'+auth().currentUser.uid+'/quest/'+questName)
        const resetTime = new Date()
        resetTime.setDate(resetTime.getDate()+1)
        resetTime.setHours(0,0,0,0) //TODO: 00:00 으로 설정해뒀으나 유저 설정 가능하게 변경
        reference.set({
            type: 'daily',
            name: questName,
            detail: questDetail,
            until: untilTime,
            day: questDayArr,
            reset: resetTime.getTime(),
            complete: false
        })
        ToastAndroid.show(questName+' successfully added!',ToastAndroid.SHORT)
        props.navigation.goBack()
    }

    return (
    <View>
        <QuestInput label='Quest name' onChangeText={(text)=>{setQuestName(text)}}/>
        <QuestInput label='Quest detail' onChangeText={(text)=>{setQuestDetail(text)}}/>
        {
            list.map((l, i) => (
            <ListItem
                key={i}
                title={l.name}
                subtitle={l.subtitle}
                onPress={l.onPress}
                rightIcon={l.rightIcon}
                bottomDivider/>
            ))
        }
        <Modal
            isVisible={isDayPickerVisible}
            style={styles.bottomModal}>
            <View style={styles.modalContent}>
                <CheckBox title='Mon' checked={questDayArr[0]} onPress={()=>{setQuestDay(0,!questDayArr[0])}}/>
                <CheckBox title='Tue' checked={questDayArr[1]} onPress={()=>{setQuestDay(1,!questDayArr[1])}}/>
                <CheckBox title='Wed' checked={questDayArr[2]} onPress={()=>{setQuestDay(2,!questDayArr[2])}}/>
                <CheckBox title='Thu' checked={questDayArr[3]} onPress={()=>{setQuestDay(3,!questDayArr[3])}}/>
                <CheckBox title='Fri' checked={questDayArr[4]} onPress={()=>{setQuestDay(4,!questDayArr[4])}}/>
                <CheckBox title='Sat' checked={questDayArr[5]} onPress={()=>{setQuestDay(5,!questDayArr[5])}}/>
                <CheckBox title='Sun' checked={questDayArr[6]} onPress={()=>{setQuestDay(6,!questDayArr[6])}}/>
                <Button title='hide' onPress={hideDayPicker}/>
            </View>
        </Modal>
        <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode='time'
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}/>
    </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    }
})

export default DailyQuestTab