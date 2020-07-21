import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Alert, Image, Header } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database'
import Quest from '../components/Quest'
import auth from '@react-native-firebase/auth'
import { useFocusEffect } from '@react-navigation/native';

const QuestTab = (props) => {

    const reference = database().ref('user/'+auth().currentUser.uid+'/quest')
    
    const [questList, setQuestList] = useState({})
    const [isQuestNull, setIsQuestNull] = useState(false)

    useEffect(() => {
        reference.on('value',(snapshot) => {
            let data = snapshot.val() ? snapshot.val() : null
            if(data == null) {
                setIsQuestNull(true)
                return
            }
            let item = {...data}
            setQuestList(item)
            //console.log(item)
            //console.log(questList)
        })
        console.log('this is useEffect')
    },[])

    useFocusEffect(() => {
        const info = database().ref('user/'+auth().currentUser.uid+'/info')
        const time = new Date().getTime()
        if(keys.length != 0) {
            keys.map(value => {
                if(time >= questList[value].reset) {
                    //TODO: some quest reset here
                }
            })
        }
    })

    //console.log(questList)
    let keys = Object.keys(questList)

    const questRender = () => {
        const day = new Date().getDay()
        return (
        keys.length > 0 ?
        keys.map((value,key) => {
            if(questList[value].complete == true || questList[value].type == "daily" && !questList[value].day[day]) return
            return (
            <Quest key = {key} items={questList[value]} style={styles.Quest}/>
            )
        }) : <Text>{isQuestNull ? 'click + to add quest!' : 'loading...'}</Text>
        )
    }
    
    return (
    
    <View style={styles.MainContainer}>
        <ScrollView style = {styles.QuestView} contentContainerStyle={styles.QuestContainer}>
            { questRender() }
        </ScrollView>
        <View style={styles.ButtonViewStyle}>
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("QuestSetScreen")}
            style={styles.ButtonStyle}>
                <Text style={styles.ButtonTextStyle}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'gray',
        margin: 0
    },
    ButtonViewStyle: {
        position:'absolute',
        bottom: 10,
        right: 10,
    },
    ButtonStyle: {
        backgroundColor:'white',
        borderRadius:50,
        borderWidth:1,
        borderColor:'skyblue',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonTextStyle: {
        fontSize: 40,
        color:'skyblue'
    },
    Quest: {
        backgroundColor:'white',
        borderRadius:10, 
        borderColor: 'skyblue',
        borderWidth: 1,
        width: '90%',
        //height: 150,
        margin: 10
    },
    QuestView: {
        width: '100%',
        height: '100%',
    },
    QuestContainer: {
        alignItems: 'center'
    }
})

export default QuestTab