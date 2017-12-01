import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class ReviewScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Review Jobs',
		headerRight: (
			/*<Button
				title="Settings"
				backgroundColor="rgba(0,0,0,0)"
				color="rgba(0, 122, 255, 1)"
				onPress={ () => navigation.navigate('settings') }
			/>*/
            <Icon
            	name='settings'
        		color='rgba(0, 122, 255, 1)'
				iconStyle={{ marginRight: 10 }}
        		onPress={ () => navigation.navigate('settings') }
			/>
		),
		headerStyle: {
			marginTop: Platform.OS === 'android' ? 24 : 0
		}
	});

	render() {
		return (
			<View>
				<Text> ReviewScreen </Text>
			</View>
		);
	}
}

export default ReviewScreen;