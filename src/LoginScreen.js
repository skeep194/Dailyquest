import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements'
import RoundButton from './components/RoundButton'
import auth from '@react-native-firebase/auth'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createAccount = () => {
        if(email.length == 0) {
            Alert.alert('email is empty!')
            return;
        }
        else if(password.length == 0) {
            Alert.alert('password is empty!')
            return;
        }
        
        auth()
            .createUserWithEmailAndPassword(email,password)
            .then(() => {
                Alert.alert('your account successfully created!')
            })
            .catch(error => {
                if(error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email adress is already in use!')
                }

                if(error.code === 'auth/invalid-email') {
                    Alert.alert('That email adress is invalid!')
                }
                
            })
    }

    const signIn = () => {
        if(email.length == 0) {
            Alert.alert('email is empty!')
            return;
        }
        else if(password.length == 0) {
            Alert.alert('password is empty!')
            return;
        }
        
        auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
                Alert.alert('sign in success')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
    <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.screen}>
            <View style={styles.input}>
                <Input placeholder='Email' onChangeText={ (text) => {setEmail(text)} }/>
                <Input placeholder='Password' onChangeText={ (text) => {setPassword(text)} }/>
            </View>
            <RoundButton backgroundColor='skyblue' text='Sign in' marginBottom={10} onPress={signIn}/>
            <RoundButton backgroundColor='#CEE3F6' text='Register' onPress={createAccount}/>
        </View>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '90%'
    }
})

//TODO: register screen split
//more information for register and email verification

export default LoginScreen