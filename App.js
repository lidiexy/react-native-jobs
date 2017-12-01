import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

// importing screens
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
    render() {
        const MainNavigator = TabNavigator({
            welcome: { screen: WelcomeScreen },
            auth: { screen: AuthScreen },
            main: {
                screen: TabNavigator({
                    map: { screen: MapScreen },
                    deck: { screen: DeckScreen },
                    reviews: {
                        screen: StackNavigator({
                            review: { screen: ReviewScreen },
                            settings: { screen: SettingsScreen }
                        })
                    }
                }, {
                    initialRouteName: 'map',
                    tabBarPosition: 'bottom',
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
                })
            }
        }, {
            initialRouteName: 'welcome',
            navigationOptions: {
                tabBarVisible: false,
            },
            lazy: true,
        });

        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
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
