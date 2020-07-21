import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DailyQuestTab from './QuestSetTab/DailyQuestTab'
import MonthlyQuestTab from './QuestSetTab/MonthlyQuestTab'
import WeeklyQuestTab from './QuestSetTab/WeeklyQuestTab'
import EventQuestTab from './QuestSetTab/EventQuestTab'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuestSetHeader from './QuestSetTab/QuestSetHeader';

const Tab = createMaterialTopTabNavigator();

const QuestSetScreen = () => {
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Daily" component={ DailyQuestTab }/>
            <Tab.Screen name="Weekly" component={ WeeklyQuestTab }/>
            <Tab.Screen name="Monthly" component={ MonthlyQuestTab }/>
            <Tab.Screen name="Event" component= { EventQuestTab }/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default QuestSetScreen