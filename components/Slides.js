import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if(index === this.props.data.length - 1) {
            return (
                <Button
                    large
                    raised
                    rightIcon={{name: 'arrow-forward'}}
                    title='Get Hired'
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            )
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View
                    key={slide.id}
                    style={[styles.slideStyle, {backgroundColor: slide.color}]}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );

        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
            >
                { this.renderSlides() }
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20
    },
    buttonStyle: {
        backgroundColor: '#02839A'
    }
};

export default Slides;