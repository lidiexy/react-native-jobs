import React from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends React.Component {
    static defaultProps = {
        keyProp: 'id',
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    };

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: 0 })
            },
            onPanResponderRelease: (event, gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD) {
                    this.forceToSwipe('right');
                } else if(gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceToSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { index: 0 };

        this.panResponder = panResponder;
        this.position = position;
        this.likes = 0;
        this.dislikes = 0;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceToSwipe(direction) {
        const x = direction === 'right' ? (SCREEN_WIDTH - 50) : -(SCREEN_WIDTH - 50);
        console.log(this.likes);
        Animated.timing(this.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            this.onSwipeComplete(direction)
        });
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1});
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        return {
            ...this.position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        if(this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards()
        }
        const deck = this.props.data.map((item, idx) => {
            if(idx < this.state.index) { return null }

            if(idx === this.state.index) {
                return (
                    <Animated.View
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.panResponder.panHandlers}
                        key={item[this.props.keyProp]}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View
                    key={item[this.props.keyProp]}
                    style={[styles.cardStyle, { top: 10 * (idx - this.state.index), zIndex: -idx}]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        });

        return Platform.OS === 'android' ? deck : deck.reverse();
    }

    render() {
        return (
            <View style={styles.cardStyle}>
                {this.renderCards()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
});

export default Swipe;