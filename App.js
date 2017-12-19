import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation';
import { Provider } from 'react-redux';

// import { persistor, store } from './store';
import * as storeObject from './store';
const { persistor, store } = storeObject.configureStore();

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
                    swipeEnabled: false,
                    //tabBarComponent: TabBarTop,
                    tabBarOptions: {
                        activeTintColor: '#ffffff',
                        inactiveTintColor: '#ff8da0',
                        allowFontScaling: true,
                        style: {
                            backgroundColor: '#de3366',
                            padding: 3,
                        }
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
            <Provider store={ store }>
                <PersistGate
                    loading={ null }
                    onBeforeLift={() => { console.log('beforeLift')}}
                    persistor={ persistor }
                >
                    <MainNavigator />
                </PersistGate>
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
