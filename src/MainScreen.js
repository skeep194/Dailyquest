import React from 'react';
import { Text, View, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import QuestTab from './MainTab/QuestTab'
import QuestSetScreen from './QuestSetScreen'
import UserInfoTab from './MainTab/UserInfoTab'

const bottomTab = createBottomTabNavigator();

const MainScreen = (props) => {
    /*React.useLayoutEffect(() => {
        Alert.alert('layoutEffect')
        console.log(props)
    })*/
    return (
        <bottomTab.Navigator initialRouteName="QuestTab">
            <bottomTab.Screen 
                name="QuestTab" 
                component={QuestTab} 
                options={{
                    tabBarLabel: 'Quest',
                    tabBarIcon: ({color, size}) => (
                        <Icon name='assignment' color={color} size={size}/>
                    ),
                }}
            />
            <bottomTab.Screen 
                name="UserInfoTab" 
                component={UserInfoTab}
                options={{
                    tabBarLabel: 'My page',
                    tabBarIcon: ({color, size}) => (
                        <Icon name='person-circle-outline' color={color} size={size} type='ionicon'/>
                    ),
                }}
            />
        </bottomTab.Navigator>
    )
}

export default MainScreen