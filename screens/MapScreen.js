import React, { Component } from 'react';
import {View, ActivityIndicator, Platform} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='my-location'
                color={ tintColor }
                size={24}
            />
        )
    };

	state = {
		mapLoaded: false,
		region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
		}
	};

	componentDidMount() {
		this.setState({ mapLoaded: true });
	}

    onRegionChangeComplete = (region) => {
		this.setState({ region });
	};

    onButtonPress = () => {
    	this.props.fetchJobs(this.state.region, () => {
    		this.props.navigation.navigate('deck');
		});
	};

	render() {
		if (!this.state.mapLoaded) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }} >
					<ActivityIndicator size='large' />
				</View>
			);
		}
		return (
            <View style={{ flex: 1, justifyContent: 'center' }} >
				<MapView
					style={{ flex: 1 }}
					initialRegion={ this.state.region }
					onRegionChangeComplete={ this.onRegionChangeComplete }
				/>
				<View style={styles.buttonContainer}>
					<Button
						large
						title='Search this area'
						backgroundColor='#009699'
						icon={{ name: 'search' }}
						onPress={this.onButtonPress}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	buttonContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0
	}
};

export default connect(null, actions)(MapScreen);
