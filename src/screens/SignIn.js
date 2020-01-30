import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    CheckBox,
    Button,
    Picker
} from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const onChangeEmail = (value) => {
        setEmail(value.toLowerCase());
    }
    const onChangePassword = (value) => {
        setPassword(value);
    }
    const onLogin = async (e) => {
        try {
            const getToken = await axios.post('http://192.168.43.85:5000/auth/login', {
                email,
                password
            });
            const userToken = getToken.data.token;
            await AsyncStorage.setItem('userToken', userToken);
            navigation.navigate('App');
        } catch (error) {
            await AsyncStorage.removeItem('userToken');
            console.warn(error.message)
        }
    }
    return (
        <View style={Styles.container}>
            <TextInput
                style={Styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='email@address.com'
                placeholderTextColor='#ffffff'
                onChangeText={(value) => onChangeEmail(value)}
                value={ email }
            />
            <TextInput
                style={Styles.input}
                secureTextEntry
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Password'
                placeholderTextColor='#ffffff'
                onChangeText={ (value) => onChangePassword(value) }
                value={ password }
            />
            <TouchableOpacity
                onPress={(e) => onLogin(e)}
                style={Styles.signinBtn}
            >
                <Text style={Styles.signinText}> Sign In </Text>
            </TouchableOpacity>
            <Text style={{
                fontSize: 16,
                color: '#ffffff'
            }}> Don't have a account ? </Text>
            <Text
            onPress={() => {
                navigation.navigate('SignUp');
            }}
            style={{
                fontSize: 16,
                color: '#ffffff',
                marginTop: 8
            }}>
                Register
            </Text>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(69,92,150)',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        fontSize: 16,
        color: '#ffffff'
    },
    inputRole: {
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        fontSize: 16,
        color: '#ffffff'
    },
    signinBtn: {
        width: 300,
        backgroundColor: 'rgb(204,4,96)',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 13
    },
    signinText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    labelRole: {
        color: '#ffffff'
    }
});
export default withNavigation(SignIn);
