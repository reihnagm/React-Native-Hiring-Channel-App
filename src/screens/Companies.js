import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  SafeAreaView,
} from 'react-native';
import { Header, ListItem, SearchBar } from 'react-native-elements';
const Companies = ({ navigation }) => {
    const [companies, setCompanies] = useState({});
    const [search, setSearch] = useState('');
    const updateSearch = search => {
        setSearch(search)
    };
    useEffect(() => {
        const _fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.43.85:5000/api/v1/companies');
                setCompanies(response.data);
            } catch(error) {
                console.warn(error.message);
            }
        }
        _fetchData();
    },[]);
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
                rightComponent={{
                    icon: 'user-circle',
                    type:'font-awesome',
                    color: '#ffffff',
                    marginBottom: 26,
                    marginRight: 2,
                }}
            />
            { companies.data && companies.data.map(company => (
                <ListItem
                    onPress={ () => navigation.navigate('CompanyShow', {
                        item: company
                    })}
                    key={ company.id.toString() }
                    leftAvatar={{ source: { uri: `http://192.168.43.85:5000/images/company/${company && company.logo}` } }}
                    title={ company && company.name }
                    subtitle={ company && company.description }
                    bottomDivider
                 />
            ))}
        </SafeAreaView>
    )
}
export default Companies;
