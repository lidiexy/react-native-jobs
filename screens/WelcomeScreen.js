import React, { Component } from 'react';
import { AsynStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDES_DATA = [
	{ id: 1, text: 'Welcome to JobApp', color: '#6adbe7' },
	{ id: 2, text: 'Use this to get a job', color: '#eab9ff' },
	{ id: 3, text: 'Set your location, then swipe away', color: '#6adbe7' }
];

class WelcomeScreen extends Component {
	state = { token: null }

	async componentWillMount() {
		let token = await AsynStorage.getItem('fb_token');
		if(token) {
			this.props.navigation.navigate('map');
		} else {
            this.setState({ token: false });
        }
	}

	onSlidesComplete = () => {
		this.props.navigation.navigate('auth');
	};

	render() {
		if(_.isNull(this.state.token)) {
			<AppLoading />;
		}
		return (
			<Slides data={ SLIDES_DATA } onComplete={this.onSlidesComplete} />
		);
	}
}

export default WelcomeScreen;