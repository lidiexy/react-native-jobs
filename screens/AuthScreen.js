import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from "../actions";

class AuthScreen extends Component {
	componentDidMount() {
		this.props.facebookLogin();
        this.onAuthComplete(this.props);
        // FIXME: Remove this line of code if we successful get log in with facebook and we need to keep testing the application.
		// AsyncStorage.removeItem('fb_token');
    }

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if(props.token) {
			this.props.navigation.navigate('map');
		}
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator/>
			</View>
		);
	}
}

function mapStateToProps({ auth }) {
	return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen);
