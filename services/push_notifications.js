import axios from 'axios';
import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken =  await AsyncStorage.getItem('pushToken');
    console.log('token ' + previousToken);
    if(previousToken) {
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
        console.log(status);

        if (status !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        axios.post(PUSH_ENDPOINT, { token: { token } });
        AsyncStorage.setItem('pushToken', token);
    }
}