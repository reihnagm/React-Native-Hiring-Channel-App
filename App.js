import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Engineers from './src/screens/Engineers';
import Companies from './src/screens/Companies';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import EngineerShowScreen from './src/screens/EngineerShow';
import CompanyShowScreen from './src/screens/CompanyShow';
import ProfileScreen from './src/screens/Profile';
import AuthLoadingScreen from './src/screens/Auth';
const HomeScreen =   createBottomTabNavigator({
        Engineers,
        Companies
    }, {
    tabBarOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#d0d0d0',
    showLabel: true,
    labelStyle: {
        fontSize: 18
    },
        style: {
            backgroundColor: 'rgb(69,92,150)',
            paddingVertical: 10
        }
    }
});
const AppStack = createStackNavigator({
    Home: HomeScreen
}, { headerMode: 'none' });
const AuthStack = createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen
}, { headerMode: 'none' });
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
            EngineerShow: EngineerShowScreen,
            CompanyShow: CompanyShowScreen,
            Profile: ProfileScreen
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);
