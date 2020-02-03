import React,{ useEffect } from 'react';
import { View, Text, Image, ScrollView, BackHandler } from 'react-native';
import { Tile } from 'react-native-elements';
const CompanyShow = (props) => {
    let item = props.navigation.state.params.item;
    let name = item && item.name;
    let phone = item && item.telephone;
    let email = item && item.email;
    let description = item && item.description;
    let location = item && item.description;
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            props.navigation.navigate('Companies');
            return true;
        });
        () => {
            BackHandler.remove();
        }
    },[]);
    return (
        <>
            <ScrollView>
                <Tile
                    imageSrc={{ uri: `http://192.168.43.85:5000/images/company/${item.logo}`}}
                    title={ name }
                    titleStyle={{
                        textAlign: 'center'
                    }}
                    contentContainerStyle={{
                        height: 70
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        paddingBottom: 40,
                        flexDirection: 'column' }}>
                    <Text
                    style={{
                        paddingHorizontal: 12,
                        marginBottom: 10,
                        width: 350,
                        lineHeight: 23,
                        fontSize: 14
                    }}>
                    <Text style={{ fontWeight: 'bold' }}> Location : </Text> { location }
                    </Text>
                    <Text
                    style={{
                        paddingHorizontal: 12,
                        marginBottom: 10,
                        width: 350,
                        lineHeight: 23,
                        fontSize: 14
                    }}>
                        <Text style={{ fontWeight: 'bold' }}> Email : </Text>
                        { email }
                    </Text>
                    <Text
                    style={{
                        paddingHorizontal: 12,
                        marginBottom: 10,
                        width: 350,
                        lineHeight: 23,
                        fontSize: 14
                    }}>
                        <Text style={{ fontWeight: 'bold' }}> Phone : </Text>
                        { phone }
                    </Text>
                    <Text
                    style={{
                        paddingHorizontal: 18,
                        lineHeight: 24,
                        fontSize: 15
                    }}>
                        { description }
                    </Text>
                </View>
            </ScrollView>
        </>
    )
}
export default CompanyShow;
