import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Review Jobs',
		headerRight: (
            <Icon
            	name='settings'
        		color='rgba(0, 122, 255, 1)'
				iconStyle={{ marginRight: 10 }}
        		onPress={ () => navigation.navigate('settings') }
			/>
		),
		headerStyle: {
			marginTop: Platform.OS === 'android' ? 24 : 0
		},
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='star'
                color={ tintColor }
                size={24}
            />
        ),
        tabBarLabel: 'Liked'
	});

    renderLikedJobs = () => {
    	return this.props.likedJobs.map(job => {
    		const { company, formattedRelativeTime, url,
				longitude, latitude, jobtitle, jobkey } = job;
    		const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
			};

    		return (
    			<Card
					key={ jobkey }
					title={ jobtitle }
				>
					<View style={{ height: 200 }}>
						<MapView
                            style={{ flex: 1 }}
                            cacheEnabled={ Platform.OS === 'android' }
                            scrollEnabled={false}
							initialRegion={ initialRegion }
						/>
					</View>
					<View>
						<View style={styles.detailWrapper}>
							<Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime }</Text>
						</View>
					</View>
					<Button
						title='Apply now!'
						backgroundColor='#03A9F4'
						onPress={ () => Linking.openURL(url) }
					/>
				</Card>
			);
		});
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					{ this.renderLikedJobs() }
				</ScrollView>
			</View>
		);
	}
}

const styles = {
    detailWrapper: {
    	marginBottom: 10,
    	marginTop: 6,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	italics: {
    	fontStyle: 'italic'
	}
};

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen);
