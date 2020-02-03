import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { toastr } from '../helpers/helper';
import { Root } from 'native-base';
import { Input, Avatar, Header, Button } from 'react-native-elements';
import axios from 'axios';
const Profile = ({ navigation }) => {
    const [profile, setProfile] = useState({
        engineer_id: '',
        user_id: '',
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
    const { engineer_id, user_id, name, email, birthdate, description, showcase, location, salary, phone, skill } = profile;
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('App');
            return true;
        });
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
                user_id,
                engineer_id: item && item.id,
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
        () => {
            BackHandler.remove();
        }
    },[]);
    const onChange = key => value => {
        setProfile({ ...profile, [key]: value });
    }
    const onChangeAvatar = () => {
        const options = {
            quality: 0.7,
            allowsEditing: true,
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
                waitUntilSaved: true,
                path: 'images',
                cameraRoll: true
            }
        }
        ImagePicker.showImagePicker(options, response => {
            try {
                if(!response.didCancel && !response.error) {
                    const { fileName, fileSize } = response
                    const split = fileName.split('.')
                    const ext = split[split.length - 1].toLocaleLowerCase()
                    const acceptableExts = ['png', 'jpg', 'jpeg', 'gif'];
                    if (validExtension(ext, acceptableExts) !== true) {
                        toastr('Invalid image extension.', 'danger');
                    } else if (fileSize >= 102400) {
                        toastr('Image too large. Max: 1mb', 'danger');
                    } else {
                        setAvatar(response)
                    }
                }
            } catch(error) {
                toastr(error.message, 'danger');
            }
        });
    }
    const validExtension = (ext, acceptableExts) => {
        for (const acceptExt of acceptableExts) {
            if (acceptExt === ext) {
                return true
            }
        }
        return false
    }
    const updateProfile = async (event) => {
        event.preventDefault();
        try {
            if(name.length < 3) {
                throw new Error('name minimum 3 character length.');
            }
            if(description.length < 200) {
                throw new Error('description minimum 200 character length.');
            }
            const response = await axios.patch(`http://192.168.43.85:5000/api/v1/engineers/${engineer_id}`, {
                avatar,
                user_id,
                name,
                email,
                description,
                location,
                salary,
                skill,
                telephone: phone,
                showcase
            });
            toastr('Yay ! Profile Updated.', 'success');
        } catch (error) {
            toastr(error.message, 'danger');
        }
    }
    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    }
    return (
        <Root>
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
                                onPress={ e => onChangeAvatar() }
                                size='large'
                                rounded
                                showEditButton
                                source={{ uri: `http://192.168.43.85:5000/images/engineer/${avatar}` }}
                            />
                        </View>
                        <Input
                            onChangeText={onChange('name')}
                            placeholder='Name'
                            name='test'
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
                            onChangeText={onChange('description')}
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
                            onChangeText={onChange('salary')}
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
                            onChangeText={onChange('skill')}
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
                            onChangeText={onChange('showcase')}
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
                            onChangeText={onChange('phone')}
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
                            onChangeText= {onChange('location') }
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
                                onPress={e => updateProfile(e)}
                                buttonStyle={{
                                    backgroundColor:'rgb(69,92,150)'
                                }}
                                raised
                                title="Update Profile"
                                />
                                <Button
                                onPress={(event) => {
                                    event.preventDefault();
                                    navigation.navigate('App');
                                }}
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
        </Root>
    )
}
export default Profile;
