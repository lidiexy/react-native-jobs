import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

// importing screens
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
    render() {
        const MainNavigator = TabNavigator({
            Welcome: { screen: WelcomeScreen },
            Auth: { screen: AuthScreen }
        }, {
            initialRouteName: 'Welcome',
            tabBarPosition: 'bottom',
            lazy: true,
            swipeEnabled: true,
            tabBarComponent: TabBarTop,
            tabBarOptions: {
                allowFontScaling: false,
                style: {
                    backgroundColor: '#de3366',
                    padding: 8,
                },
                labelStyle: {
                    color: 'white',
                    fontSize: 12,
                },
                indicatorStyle: {
                    borderTopColor: '#ffffff',
                    borderTopWidth: 3,
                },
            }
        });

        return (
            <MainNavigator />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
