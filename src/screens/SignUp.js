import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
const SignUp = ({ navigation }) => {
        const [name, setName] = useState();
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [role, setRole] = useState(1);
        const onChangeName = (value) => {
            setName(value);
        }
        const onChangeEmail = (value) => {
            setEmail(value);
        }
        const onChangePassword = (value) => {
            setPassword(value);
        }
        const onChangeRole = (value) => {
            setRole(value);
        }
        const data = {
            name,
            email,
            password,
            role_id: parseInt(role)
        }
      const onRegister = async () => {
        try {
            const getToken = await axios.post('http://192.168.43.85:5000/auth/register', data);
            const userToken = getToken.data.token;
            await AsyncStorage.setItem('userToken', userToken);
            navigation.navigate('App');
        } catch (error) {
        console.warn(errror);
        }
    }
    return (
        <View style={Styles.container}>
            <TextInput
                style={Styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Name'
                placeholderTextColor='#ffffff'
                onChangeText={(value) => onChangeName(value)}
                value={ name }
            />
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
                onChangeText={(value) => onChangePassword(value)}
                value={ password }
            />
            <Text style={Styles.labelRole}>Select your Role</Text>
            <Picker
                style={Styles.inputRole}
                selectedValue={ role }
                onValueChange={(itemValue, itemIndex) => onChangeRole(itemValue)}
            >
                <Picker.Item label='Engineer' value='1' />
                <Picker.Item label='Company' value='2' />
            </Picker>
            <TouchableOpacity
                onPress={(e) => onRegister(e)}
                style={Styles.signupBtn}
            >
                <Text style={Styles.signupText}>
                    Sign Up
                </Text>
            </TouchableOpacity>
            <Text style={{
                fontSize: 16,
                color: '#ffffff'
            }}> Already have a account ? </Text>
            <Text
            onPress={() => {
                navigation.navigate('SignIn');
            }}
            style={{
                fontSize: 16,
                color: '#ffffff',
                marginTop: 8
            }}>
                Login
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
    signupBtn: {
        width: 300,
        backgroundColor: 'rgb(204,4,96)',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 13
    },
    signupText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    labelRole: {
        color: '#ffffff'
    }
});
export default SignUp;
