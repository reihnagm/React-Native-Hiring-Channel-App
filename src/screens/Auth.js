import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
const Auth = (props) => {
    useEffect(() => {
        const _bootstrapAsync = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            props.navigation.navigate(userToken ? 'App' : 'Auth');
        };
        _bootstrapAsync();
    },[]);
    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
}
export default Auth;
