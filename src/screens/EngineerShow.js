import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, BackHandler } from 'react-native';
import { Tile } from 'react-native-elements';
const EngineerShow = (props) => {
    let item = props.navigation.state.params.item;
    let name = item && item.name;
    let skills = item && item.skill;
    let salary = item && item.salary;
    let phone = item && item.telephone;
    let showcase = item && item.showcase;
    let email = item && item.email;
    let description = item && item.description;
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            props.navigation.navigate('Engineers');
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
                    imageSrc={{ uri: `http://192.168.43.85:5000/images/engineer/${item.avatar}`}}
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
                    <Text style={{ fontWeight: 'bold' }}> Expected Salary : </Text> { salary }
                    </Text>
                    <Text
                    style={{
                        paddingHorizontal: 12,
                        marginBottom: 10,
                        width: 350,
                        lineHeight: 23,
                        fontSize: 14
                    }}>
                    <Text style={{ fontWeight: 'bold' }}> Skills : </Text> { skills }
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
                        <Text style={{ fontWeight: 'bold' }}> Birthdate : </Text>
                        12 January 1996
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
                        paddingHorizontal: 12,
                        marginBottom: 10,
                        width: 350,
                        lineHeight: 23,
                        fontSize: 14
                    }}>
                        <Text style={{ fontWeight: 'bold' }}> Showcase : </Text>
                        { showcase }
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
export default EngineerShow;
