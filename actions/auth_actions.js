import  { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

const FB_APP_ID = '166203523977830';


/**
 * This can be Refactored with ES6 & ES7 to the code below
export const facebookLogin = () => {
    return async function(dispatch) {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            // dispatch action FB login is done
        } else {
            // Start FB login
        }
    }
};*/

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // dispatch action FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // Start FB login
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch =>  {
    let { token, type } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
       permissions: ['public_profile']
    });

    if(type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};