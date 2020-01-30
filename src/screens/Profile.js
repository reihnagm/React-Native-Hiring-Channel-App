import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Avatar, Header, Button } from 'react-native-elements';
import axios from 'axios';
const Profile = ({ navigation }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        birthdate: '',
        description: '',
        location: '',
        phone: '',
        salary: '',
        email: '',
        skill: ''
    });
    const [avatar, setAvatar] = useState('');
    const { name, email, birthdate, description, showcase, location, salary, phone, skill } = profile;
    useEffect(() => {
        const _getCurrentProfile = async () => {
            let getToken = await AsyncStorage.getItem('userToken');
            let user = await axios.get('http://192.168.43.85:5000/auth', {
                headers: {
                    'x-auth-token': getToken
                }
            });
            let user_id = user.data &&  user.data.data.id;
            let response = await axios.post('http://192.168.43.85:5000/api/v1/engineers/profile', {
                user_id
            })
            let item = response.data && response.data.data;
            setProfile({
                name: item && item.name,
                email: item && item.email,
                description: item && item.description,
                showcase: item && item.showcase,
                phone: item && item.telephone,
                skill: item && item.skill,
                location: item && item.location,
                salary: item && item.salary
            });
            setAvatar(item && item.avatar);
        }
        _getCurrentProfile();
    },[avatar, name, email, description, birthdate, showcase, description, location, phone, salary, skill]);
    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    }
    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <Header
                        containerStyle={{
                            height : 50,
                            borderBottomColor: 'transparent'
                        }}
                        leftComponent={{
                            text: 'Profile',
                            style: {
                                color: '#ffffff',
                                fontSize: 20
                            }
                        }}
                        backgroundColor='rgb(69,92,150)'
                    />
                    <View>
                        <View
                            style={{
                                backgroundColor: 'rgb(69,92,150)',
                                paddingVertical: 14,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Avatar
                                size='large'
                                rounded
                                showEditButton
                                source={{
                                    uri:
                                        `http://192.168.43.85:5000/images/engineer/${avatar}`,
                                    }}
                            />
                        </View>
                        <Input
                            placeholder='Name'
                            value={ name }
                            rightIconContainerStyle= {{
                                marginRight: 20
                            }}
                            rightIcon={{
                                name: 'user' ,
                                type: 'font-awesome'
                            }}
                        />
                        <Input
                            placeholder='E-mail Address'
                            value={ email }
                            rightIconContainerStyle= {{
                                marginRight: 20
                            }}
                            rightIcon={{
                                name: 'envelope' ,
                                type: 'font-awesome'
                            }}
                        />
                        <Input
                            inputStyle={{
                                height: 100,
                                lineHeight: 20
                            }}
                            multiline={true}
                            numberOfLines={4}
                            placeholder='Description'
                            value={ description }
                        />
                        <Input
                            placeholder='Salary'
                            value={ salary }
                            rightIconContainerStyle= {{
                                marginRight: 20
                            }}
                            rightIcon={{
                                name: 'credit-card' ,
                                type: 'font-awesome'
                            }}
                        />
                        <Input
                            placeholder='Skills'
                            value={ skill }
                            rightIconContainerStyle= {{
                                marginRight: 20
                            }}
                            rightIcon={{
                                name: 'bar-chart' ,
                                type: 'font-awesome'
                            }}
                        />
                        <Input
                            placeholder='Showcase'
                            value={ showcase }
                            rightIconContainerStyle= {{
                                marginRight: 20
                            }}
                            rightIcon={{
                                name: 'link' ,
                                type: 'font-awesome'
                            }}
                        />
                        <Input
                            placeholder='Phone'
                            value={ phone }
                            rightIconContainerStyle= {{
                                marginRight: 20
                            }}
                            rightIcon={{
                                name: 'phone' ,
                                type: 'font-awesome'
                            }}
                        />
                        <Input
                            placeholder='Location'
                            value={ location }
                            rightIconContainerStyle= {{
                                marginRight: 25
                            }}
                            rightIcon={{
                                name: 'location-arrow' ,
                                type: 'font-awesome'
                            }}
                        />
                            <View
                            style={{
                                textAlign: 'center',
                                backgroundColor: 'rgb(55, 73, 117)',
                                marginTop: 12,
                                padding: 8
                            }}>
                                <Button
                                buttonStyle={{
                                    backgroundColor:'rgb(69,92,150)'
                                }}
                                raised
                                title="Update Profile"
                                />
                                <Button
                                buttonStyle={{
                                    backgroundColor:'rgb(69,92,150)'
                                }}
                                containerStyle={{
                                    marginTop: 12
                                }}
                                raised
                                title="Back"
                                />
                                <Button
                                onPress={() => logout()}
                                buttonStyle={{
                                    backgroundColor:'rgb(212, 75, 75)'
                                }}
                                containerStyle={{
                                    marginTop: 12
                                }}
                                raised
                                title="Logout"
                                />
                            </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
export default Profile;
