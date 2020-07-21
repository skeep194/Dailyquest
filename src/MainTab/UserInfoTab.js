import React from 'react';
import { Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import RoundButton from '../components/RoundButton'

const UserInfoTab = () => {
    let user = auth().currentUser
    const list = [
        {
            title: 'email',
            rightTitle: user.email
        }
    ]
    return (
    <View>
        {
            list.map((l,i) => (
                <ListItem
                    key={i}
                    title={l.title}
                    subtitle={l.rightTitle}
                    bottomDivider/>
            ))
        }
        <View style={{alignItems: 'center', marginTop: 10}}>
            <RoundButton backgroundColor='skyblue' onPress={()=>{auth().signOut()}} text='Sign out'/>
        </View>
    </View>
    )
}

export default UserInfoTab