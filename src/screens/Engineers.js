import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
    SafeAreaView,
} from 'react-native';
import { Header, Icon, ListItem, SearchBar  } from 'react-native-elements';
const Engineers = ({ navigation }) => {
    const [engineers, setEngineers] = useState({});
    const [search, setSearch] = useState('');
    const updateSearch = search => {
        setSearch(search)
    };
    const test = () => {
        alert('tset')
    }
    useEffect(() => {
        const _fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.43.85:5000/api/v1/engineers');
                setEngineers(response.data);
            } catch(error) {
                console.warn(error.message);
            }
        }
        _fetchData();
    }, []);
    const RightComponent = () => (
        <Icon
            onPress={ () => navigation.navigate('Profile') }
            iconStyle={{
                marginBottom: 26,
                marginRight: 2
            }}
            name='user-circle'
            type='font-awesome'
            color='#ffffff'
        />
    )
    return (
        <SafeAreaView>
            <Header
                containerStyle={{
                    height : 80
                }}
                backgroundColor='rgb(69,92,150)'
                leftComponent={{
                    icon: 'filter',
                    type: 'font-awesome',
                    color: '#ffffff',
                    marginLeft: 5,
                    marginBottom: 26
                }}
                centerComponent={
                    <SearchBar containerStyle={{
                        marginBottom: 25,
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',
                        backgroundColor:'rgb(69,92,150)',
                        width: 270
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#ffffff',
                        height: 30
                    }}
                    inputStyle={{
                        color: '#000000',
                        fontSize: 14,
                    }}
                    placeholder="Search Name or Skills Here ..."
                    onChangeText={ updateSearch }
                    value={ search }
                    />
                }
                rightComponent={ <RightComponent/> }
            />
            { engineers.data && engineers.data.map(engineer => (
                <ListItem
                        onPress={ () => navigation.navigate('EngineerShow', {
                            item: engineer && engineer
                        })
                    }
                    key={ engineer.id.toString() }
                    leftAvatar={{ source: { uri: `http://192.168.43.85:5000/images/engineer/${engineer && engineer.avatar}` } }}
                    title={ engineer && engineer.name }
                    subtitle={ `Skills : ${engineer && engineer.skill}` }
                    bottomDivider
                 />
            ))}
        </SafeAreaView>
    )
}
export default Engineers;
