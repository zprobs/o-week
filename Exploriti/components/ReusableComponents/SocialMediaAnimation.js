import React, {Component} from 'react';
import {
    Animated,
    Image,
    PanResponder,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Theme} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import Fonts from '../../theme/Fonts';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;

/**
 * SocialMediaAnimation is an animated picker for 6 different social media icons.
<<<<<<< HEAD
=======
 * @param openModal The method to open the NewSocialMediaLinkBottomModal
>>>>>>> a791778ff4b5ef0064ade015b81472e3183e9e27
 */
export default class SocialMediaAnimation extends Component {
    constructor(props) {
        super(props);

        // method to open modal and enter information
        const {openModal} = props;

        // Slow down speed animation here (1 = default)
        this.timeDilation = 1;

        // If duration touch longer than it, mean long touch
        this.durationLongPress = 200
           ;

        // Variables to check
        // 0 = nothing, 1 = facebook, 2 = instagram, 3 = snapchat, 4 = linkedIn, 5 = Twitter, 6 = Youtube
        this.isTouchBtn = false;

        this.isLongTouch = false;
        this.whichIconUserChoose = 0;
        this.currentIconFocus = 0;
        this.previousIconFocus = 0;
        this.isDragging = false;
        this.isDraggingOutside = false;
        this.isJustDragInside = true;

        this.goToModal = (icon) => {
            setTimeout(()=>
            {
                openModal(icon)}, 900);
        };

        // Duration animation
        this.durationAnimationBox = 500;
        this.durationAnimationLongTouch = 150;
        this.durationAnimationIconWhenDrag = 150;
        this.durationAnimationIconWhenRelease = 1000;

        // ------------------------------------------------------------------------------
        // Animation when button long touch button
        this.buttonOpacity = new Animated.Value(1);
        // Animation of the box
        this.fadeBoxAnim = new Animated.Value(0);

        // Animation for emoticons
        this.moveRightGroupIcon = new Animated.Value(10);
        // Facebook
        this.pushIconFacebookUp = new Animated.Value(0);
        // I don't know why, but when I set to 0.0, it seem blink,
        // so temp solution is set to 0.01
        this.zoomIconFacebook = new Animated.Value(0.01);
        // Instagram
        this.pushIconInstagramUp = new Animated.Value(0);
        this.zoomIconInstagram = new Animated.Value(0.01);
        // LinkedIn
        this.pushIconLinkedInUp = new Animated.Value(0);
        this.zoomIconLinkedIn = new Animated.Value(0.01);
        // SnapChat
        this.pushIconSnapchatUp = new Animated.Value(0);
        this.zoomIconSnapchat = new Animated.Value(0.01);
        // Twitter
        this.pushIconTwitterUp = new Animated.Value(0);
        this.zoomIconTwitter = new Animated.Value(0.01);
        // Youtube
        this.pushIconYoutubeUp = new Animated.Value(0);
        this.zoomIconYoutube = new Animated.Value(0.01);

        // ------------------------------------------------------------------------------
        // Animation for zoom emoticons when drag
        this.zoomIconChosen = new Animated.Value(1);
        this.zoomIconNotChosen = new Animated.Value(1);
        this.zoomIconWhenDragOutside = new Animated.Value(1);
        this.zoomIconWhenDragInside = new Animated.Value(1);
        this.zoomBoxWhenDragInside = new Animated.Value(1);
        this.zoomBoxWhenDragOutside = new Animated.Value(0.95);

        // Animation for text description at top icon
        this.pushTextDescriptionUp = new Animated.Value(60);
        this.zoomTextDescription = new Animated.Value(1);

        // ------------------------------------------------------------------------------
        // Animation for jump emoticon when release finger
        this.zoomIconWhenRelease = new Animated.Value(1);
        this.moveUpIconWhenRelease = new Animated.Value(0);
        this.moveLeftIconFacebookWhenRelease = new Animated.Value(20);
        this.moveLeftIconInstagramWhenRelease = new Animated.Value(72);
        this.moveLeftIconLinkedInWhenRelease = new Animated.Value(124);
        this.moveLeftIconSnapchatWhenRelease = new Animated.Value(173);
        this.moveLeftIconTwitterWhenRelease = new Animated.Value(226);
        this.moveLeftIconYoutubeWhenRelease = new Animated.Value(278);

        // used to check if animation is complete before enabling panning
        this.pushIconYoutubeUp.addListener(({value}) => this._value = value)

        this.setupPanResponder();
    }

    // Handle the drag gesture
    setupPanResponder() {
        this.rootPanResponder = PanResponder.create({
            // prevent if user's dragging without long touch the button
            onMoveShouldSetPanResponder: (evt, gestureState) =>

                this.isLongTouch && (this.pushIconYoutubeUp._value === 25),

            onPanResponderGrant: (evt, gestureState) => {
                this.handleEmoticonWhenDragging(evt, gestureState);
            },

            onPanResponderMove: (evt, gestureState) => {
                this.handleEmoticonWhenDragging(evt, gestureState);
            },

            onPanResponderRelease: (evt, gestureState) => {
                this.isDragging = false;
                this.isDraggingOutside = false;
                this.isJustDragInside = true;
                this.previousIconFocus = 0;
                if (this.currentIconFocus !== 0) this.goToModal(this.currentIconFocus);
                this.currentIconFocus = 0;
                this.setState({});

                this.onDragRelease();
            },
        });
    }

    handleEmoticonWhenDragging = (evt, gestureState) => {

        if (
             gestureState.dy < 100 && gestureState.dy > -60
        ) {
            this.isDragging = true;
            this.isDraggingOutside = false;

            if (this.isJustDragInside) {
                this.controlIconWhenDragInside();
            }

            if (
                gestureState.x0 + gestureState.dx >= 35 &&
                gestureState.x0 + gestureState.dx < 88.33
            ) {
                if (this.currentIconFocus !== 1) {
                    this.handleWhenDragBetweenIcon(1);
                }
            } else if (
                gestureState.x0 + gestureState.dx >= 88.33 &&
                gestureState.x0 + gestureState.dx < 141.66
            ) {
                if (this.currentIconFocus !== 2) {
                    this.handleWhenDragBetweenIcon(2);
                }
            } else if (
                gestureState.x0 + gestureState.dx >= 141.66 &&
                gestureState.x0 + gestureState.dx < 194.99
            ) {
                if (this.currentIconFocus !== 3) {
                    this.handleWhenDragBetweenIcon(3);
                }
            } else if (
                gestureState.x0 + gestureState.dx >= 194.99 &&
                gestureState.x0 + gestureState.dx < 248.32
            ) {
                if (this.currentIconFocus !== 4) {
                    this.handleWhenDragBetweenIcon(4);
                }
            } else if (
                gestureState.x0 + gestureState.dx >= 248.32 &&
                gestureState.x0 + gestureState.dx < 301.65
            ) {
                if (this.currentIconFocus !== 5) {
                    this.handleWhenDragBetweenIcon(5);
                }
            } else if (
                gestureState.x0 + gestureState.dx >= 301.65 &&
                gestureState.x0 + gestureState.dx <= 354.98
            ) {
                if (this.currentIconFocus !== 6) {
                    this.handleWhenDragBetweenIcon(6);
                }
            }
        } else {
            this.whichIconUserChoose = 0;
            this.previousIconFocus = 0;
            this.currentIconFocus = 0;
            this.isJustDragInside = true;

            if (this.isDragging && !this.isDraggingOutside) {
                this.isDragging = false;
                this.isDraggingOutside = true;
                this.setState({});

                this.controlBoxWhenDragOutside();
                this.controlIconWhenDragOutside();
            }
        }
    };

    // Handle the touch of button
    onTouchStart = () => {
        this.isTouchBtn = true;
        this.setState({});

        this.timerMeasureLongTouch = setTimeout(
            this.doAnimationLongTouch,
            this.durationLongPress,
        );
    };

    onTouchEnd = () => {
        this.isTouchBtn = false;
        this.setState({});

        if (!this.isLongTouch) {
            if (this.whichIconUserChoose !== 0) {
                this.whichIconUserChoose = 0;

                // assuming that another emoticon is the same icon, so we can animate the reverse then
            }
            clearTimeout(this.timerMeasureLongTouch);
            this.doAnimationQuickTouch();
        }
    };

    onDragRelease = () => {
        // To lower the icons
        this.doAnimationLongTouchReverse();

        // To jump particular icon be chosen
        this.controlIconWhenRelease();
    };

    // ------------------------------------------------------------------------------
    // Animation button when quick touch button
    doAnimationQuickTouch = () => {
        // if (!this.isChosen) {
        //     // Probably do the same as a long touch
        // }
        this.doAnimationLongTouch();

    };

    // ------------------------------------------------------------------------------
    // Animation when long touch button
    doAnimationLongTouch = () => {

        this.isLongTouch = true;
        this.setState({});

        this.fadeBoxAnim.setValue(0);

        this.moveRightGroupIcon.setValue(10);

        this.pushIconFacebookUp.setValue(0);
        this.zoomIconFacebook.setValue(0.01);

        this.pushIconInstagramUp.setValue(0);
        this.zoomIconInstagram.setValue(0.01);

        this.pushIconLinkedInUp.setValue(0);
        this.zoomIconLinkedIn.setValue(0.01);

        this.pushIconSnapchatUp.setValue(0);
        this.zoomIconSnapchat.setValue(0.01);

        this.pushIconTwitterUp.setValue(0);
        this.zoomIconTwitter.setValue(0.01);

        this.pushIconYoutubeUp.setValue(0);
        this.zoomIconYoutube.setValue(0.01);

        Animated.parallel([
            // Button
            Animated.timing(this.buttonOpacity, {
                toValue: 0,
                duration: this.durationAnimationLongTouch * this.timeDilation,
                useNativeDriver: false
            }),

            // Box
            Animated.timing(this.fadeBoxAnim, {
                toValue: 1,
                duration: this.durationAnimationBox * this.timeDilation,
                delay: 350,
                useNativeDriver: false
            }),

            // Group emoticon
            Animated.timing(this.moveRightGroupIcon, {
                toValue: 20,
                duration: this.durationAnimationBox * this.timeDilation,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconFacebookUp, {
                toValue: 25,
                duration: 250 * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconFacebook, {
                toValue: 1,
                duration: 250 * this.timeDilation,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconInstagramUp, {
                toValue: 25,
                duration: 250 * this.timeDilation,
                delay: 50,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconInstagram, {
                toValue: 1,
                duration: 250 * this.timeDilation,
                delay: 50,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconLinkedInUp, {
                toValue: 25,
                duration: 250 * this.timeDilation,
                delay: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconLinkedIn, {
                toValue: 1,
                duration: 250 * this.timeDilation,
                delay: 100,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconSnapchatUp, {
                toValue: 25,
                duration: 250 * this.timeDilation,
                delay: 150,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconSnapchat, {
                toValue: 1,
                duration: 250 * this.timeDilation,
                delay: 150,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconTwitterUp, {
                toValue: 25,
                duration: 250 * this.timeDilation,
                delay: 200,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconTwitter, {
                toValue: 1,
                duration: 250 * this.timeDilation,
                delay: 200,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconYoutubeUp, {
                toValue: 25,
                duration: 250 * this.timeDilation,
                delay: 250,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconYoutube, {
                toValue: 1,
                duration: 250 * this.timeDilation,
                delay: 250,
                useNativeDriver: false
            }),
        ]).start();
    };

    doAnimationLongTouchReverse = () => {

        this.fadeBoxAnim.setValue(1);

        this.moveRightGroupIcon.setValue(20);

        this.pushIconFacebookUp.setValue(25);
        this.zoomIconFacebook.setValue(1);

        this.pushIconInstagramUp.setValue(25);
        this.zoomIconInstagram.setValue(1);

        this.pushIconLinkedInUp.setValue(25);
        this.zoomIconLinkedIn.setValue(1);

        this.pushIconSnapchatUp.setValue(25);
        this.zoomIconSnapchat.setValue(1);

        this.pushIconTwitterUp.setValue(25);
        this.zoomIconTwitter.setValue(1);

        this.pushIconYoutubeUp.setValue(25);
        this.zoomIconYoutube.setValue(1);

        Animated.parallel([
            // Button
            Animated.timing(this.buttonOpacity, {
                toValue: 1,
                duration: this.durationAnimationLongTouch * this.timeDilation,
                useNativeDriver: false
            }),

            // Box
            Animated.timing(this.fadeBoxAnim, {
                toValue: 0,
                duration: this.durationAnimationLongTouch * this.timeDilation,
                useNativeDriver: false
            }),

            // Group emoticon
            Animated.timing(this.moveRightGroupIcon, {
                toValue: 10,
                duration: this.durationAnimationBox * this.timeDilation,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconFacebookUp, {
                toValue: 0,
                duration: 250 * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconFacebook, {
                toValue: 0.01,
                duration: 250 * this.timeDilation,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconInstagramUp, {
                toValue: 0,
                duration: 250 * this.timeDilation,
                delay: 50,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconInstagram, {
                toValue: 0.01,
                duration: 250 * this.timeDilation,
                delay: 50,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconLinkedInUp, {
                toValue: 0,
                duration: 250 * this.timeDilation,
                delay: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconLinkedIn, {
                toValue: 0.01,
                duration: 250 * this.timeDilation,
                delay: 100,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconSnapchatUp, {
                toValue: 0,
                duration: 250 * this.timeDilation,
                delay: 150,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconSnapchat, {
                toValue: 0.01,
                duration: 250 * this.timeDilation,
                delay: 150,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconTwitterUp, {
                toValue: 0,
                duration: 250 * this.timeDilation,
                delay: 200,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconTwitter, {
                toValue: 0.01,
                duration: 250 * this.timeDilation,
                delay: 200,
                useNativeDriver: false
            }),

            Animated.timing(this.pushIconYoutubeUp, {
                toValue: 0,
                duration: 250 * this.timeDilation,
                delay: 250,
                useNativeDriver: false
            }),
            Animated.timing(this.zoomIconYoutube, {
                toValue: 0.01,
                duration: 250 * this.timeDilation,
                delay: 250,
                useNativeDriver: false
            }),
    ]).start(this.onAnimationLongTouchComplete);
    };

    onAnimationLongTouchComplete = () => {
        this.isLongTouch = false;
        this.setState({});
    };

    // ------------------------------------------------------------------------------
    // Animation for zoom icons when drag
    handleWhenDragBetweenIcon = currentIcon => {
        this.whichIconUserChoose = currentIcon;
        this.previousIconFocus = this.currentIconFocus;
        this.currentIconFocus = currentIcon;
        this.controlIconWhenDrag();
    };

    controlIconWhenDrag = () => {
        this.zoomIconChosen.setValue(0.8);
        this.zoomIconNotChosen.setValue(1.0);
        this.zoomBoxWhenDragInside.setValue(1.0);

        this.pushTextDescriptionUp.setValue(60);
        this.zoomTextDescription.setValue(1.0);

        // For update logic at render function
        this.setState({});

        // Need timeout so logic check at render function can update
        setTimeout(
            () =>
                Animated.parallel([
                    Animated.timing(this.zoomIconChosen, {
                        toValue: 1.8,
                        duration: this.durationAnimationIconWhenDrag * this.timeDilation,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.zoomIconNotChosen, {
                        toValue: 0.8,
                        duration: this.durationAnimationIconWhenDrag * this.timeDilation,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.zoomBoxWhenDragInside, {
                        toValue: 0.95,
                        duration: this.durationAnimationIconWhenDrag * this.timeDilation,
                        useNativeDriver: false
                    }),

                    Animated.timing(this.pushTextDescriptionUp, {
                        toValue: 90,
                        duration: this.durationAnimationIconWhenDrag * this.timeDilation,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.zoomTextDescription, {
                        toValue: 1.7,
                        duration: this.durationAnimationIconWhenDrag * this.timeDilation,
                        useNativeDriver: false
                    }),
                ]).start(),
            50,
        );
    };

    controlIconWhenDragInside = () => {
        this.setState({});

        this.zoomIconWhenDragInside.setValue(1.0);
        Animated.timing(this.zoomIconWhenDragInside, {
            toValue: 0.8,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
        }).start(this.onAnimationIconWhenDragInsideComplete);
    };

    onAnimationIconWhenDragInsideComplete = () => {
        this.isJustDragInside = false;
        this.setState({});
    };

    controlIconWhenDragOutside = () => {
        this.zoomIconWhenDragOutside.setValue(0.8);

        Animated.timing(this.zoomIconWhenDragOutside, {
            toValue: 1.0,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
        }).start();
    };

    controlBoxWhenDragOutside = () => {
        this.zoomBoxWhenDragOutside.setValue(0.95);

        Animated.timing(this.zoomBoxWhenDragOutside, {
            toValue: 1.0,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
        }).start();
    };

    // ------------------------------------------------------------------------------
    // Animation for jump emoticon when release finger0.01
    controlIconWhenRelease = () => {
        this.zoomIconWhenRelease.setValue(1);
        this.moveUpIconWhenRelease.setValue(0);
        this.moveLeftIconFacebookWhenRelease.setValue(20);
        this.moveLeftIconInstagramWhenRelease.setValue(72);
        this.moveLeftIconLinkedInWhenRelease.setValue(124);
        this.moveLeftIconSnapchatWhenRelease.setValue(173);
        this.moveLeftIconTwitterWhenRelease.setValue(226);
        this.moveLeftIconYoutubeWhenRelease.setValue(278);

        Animated.parallel([
            Animated.timing(this.zoomIconWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveUpIconWhenRelease, {
                toValue: 1,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveLeftIconFacebookWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveLeftIconInstagramWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveLeftIconLinkedInWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveLeftIconSnapchatWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveLeftIconTwitterWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
            Animated.timing(this.moveLeftIconYoutubeWhenRelease, {
                toValue: 0,
                duration: this.durationAnimationIconWhenRelease * this.timeDilation,
                useNativeDriver: false
            }),
        ]).start();
    };

    render() {
        return (
                <View style={styles.viewBody} {...this.rootPanResponder.panHandlers}>

                    {/* Content */}
                    <View style={styles.viewContent}>
                        {/* Box */}
                        <Animated.View
                            style={[
                                styles.viewBox,
                                {
                                    opacity: this.fadeBoxAnim,
                                    transform: [
                                        {
                                            scale: this.isDragging
                                                ? this.previousIconFocus === 0
                                                    ? this.zoomBoxWhenDragInside
                                                    : 0.95
                                                : this.isDraggingOutside
                                                    ? this.zoomBoxWhenDragOutside
                                                    : 1.0,
                                        },
                                    ],
                                },
                            ]}
                        />

                        {/* Group emoticon */}
                        {this.renderGroupIcon()}

                        {/*Group emoticon for jump*/}
                        {this.renderGroupJumpIcon()}

                        {/* Button */}
                        {this.AddSocialMediaIcon()}
                    </View>
                </View>
        );
    }
    AddSocialMediaIcon() {
        return (
            <Animated.View style={{flexDirection: 'row', opacity: this.buttonOpacity}}>
                <TouchableOpacity style={styles.plusContainer} onPressIn={this.onTouchStart} onPressOut={this.onTouchEnd} disabled={this.isLongTouch} >
                    <Icon size={40} color={colours.text03} name={'plus'}/>
                </TouchableOpacity>
                <Text style={styles.label}>
                    Press and hold to add a social media link.
                </Text>
            </Animated.View>
        );
    }


    renderGroupIcon() {
        return (
            <Animated.View
                style={[
                    styles.viewWrapGroupIcon,
                    {marginLeft: this.moveRightGroupIcon},
                ]}>
                {/* Icon FaceBook */}
                <View style={styles.viewWrapIcon}>
                    {this.currentIconFocus === 1 ? (
                        <Animated.View
                            style={[
                                styles.viewWrapTextDescription,
                                {
                                    bottom: this.pushTextDescriptionUp,
                                    transform: [{scale: this.zoomTextDescription}],
                                    width: 55
                                },
                            ]}>
                            <Text style={styles.textDescription}>FaceBook</Text>
                        </Animated.View>
                    ) : null}
                    <Animated.View
                        style={{
                            marginBottom: this.pushIconFacebookUp,
                            transform: [
                                {
                                    scale: this.isDragging
                                        ? this.currentIconFocus === 1
                                            ? this.zoomIconChosen
                                            : this.previousIconFocus === 1
                                                ? this.zoomIconNotChosen
                                                : this.isJustDragInside
                                                    ? this.zoomIconWhenDragInside
                                                    : 0.8
                                        : this.isDraggingOutside
                                            ? this.zoomIconWhenDragOutside
                                            : this.zoomIconFacebook,
                                },
                            ],
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                "https://img.icons8.com/fluent/48/000000/facebook-new.png"
                            }}
                        />
                    </Animated.View>
                </View>

                {/* Icon Instagram*/}
                <View style={styles.viewWrapIcon}>
                    {this.currentIconFocus === 2 ? (
                        <Animated.View
                            style={[
                                styles.viewWrapTextDescription,
                                {
                                    bottom: this.pushTextDescriptionUp,
                                    transform: [{scale: this.zoomTextDescription}],
                                    width: 60
                                },
                            ]}>
                            <Text style={styles.textDescription}>Instagram</Text>
                        </Animated.View>
                    ) : null}
                    <Animated.View
                        style={{
                            marginBottom: this.pushIconInstagramUp,
                            transform: [
                                {
                                    scale: this.isDragging
                                        ? this.currentIconFocus === 2
                                            ? this.zoomIconChosen
                                            : this.previousIconFocus === 2
                                                ? this.zoomIconNotChosen
                                                : this.isJustDragInside
                                                    ? this.zoomIconWhenDragInside
                                                    : 0.8
                                        : this.isDraggingOutside
                                            ? this.zoomIconWhenDragOutside
                                            : this.zoomIconInstagram,
                                },
                            ],
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                "https://img.icons8.com/fluent/48/000000/instagram-new.png"
                            }}
                        />
                    </Animated.View>
                </View>

                {/* Icon LinkedIn */}
                <View style={styles.viewWrapIcon}>
                    {this.currentIconFocus === 3 ? (
                        <Animated.View
                            style={[
                                styles.viewWrapTextDescription,
                                {
                                    bottom: this.pushTextDescriptionUp,
                                    transform: [{scale: this.zoomTextDescription}],
                                    width: 55
                                },
                            ]}>
                            <Text style={styles.textDescription} numberOfLines={1}>LinkedIn</Text>
                        </Animated.View>
                    ) : null}
                    <Animated.View
                        style={{
                            marginBottom: this.pushIconLinkedInUp,
                            transform: [
                                {
                                    scale: this.isDragging
                                        ? this.currentIconFocus === 3
                                            ? this.zoomIconChosen
                                            : this.previousIconFocus === 3
                                                ? this.zoomIconNotChosen
                                                : this.isJustDragInside
                                                    ? this.zoomIconWhenDragInside
                                                    : 0.8
                                        : this.isDraggingOutside
                                            ? this.zoomIconWhenDragOutside
                                            : this.zoomIconLinkedIn,
                                },
                            ],
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/color/48/000000/linkedin-circled.png"
                            }}
                        />
                    </Animated.View>
                </View>

                {/* Icon SnapChat*/}
                <View style={styles.viewWrapIcon}>
                    {this.currentIconFocus === 4 ? (
                        <Animated.View
                            style={[
                                styles.viewWrapTextDescription,
                                {
                                    bottom: this.pushTextDescriptionUp,
                                    transform: [{scale: this.zoomTextDescription}],
                                    width: 55
                                },
                            ]}>
                            <Text style={styles.textDescription}>SnapChat</Text>
                        </Animated.View>
                    ) : null}
                    <Animated.View
                        style={{
                            marginBottom: this.pushIconSnapchatUp,
                            transform: [
                                {
                                    scale: this.isDragging
                                        ? this.currentIconFocus === 4
                                            ? this.zoomIconChosen
                                            : this.previousIconFocus === 4
                                                ? this.zoomIconNotChosen
                                                : this.isJustDragInside
                                                    ? this.zoomIconWhenDragInside
                                                    : 0.8
                                        : this.isDraggingOutside
                                            ? this.zoomIconWhenDragOutside
                                            : this.zoomIconSnapchat,
                                },
                            ],
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/color/48/000000/snapchat-circled-logo.png"
                            }}
                        />
                    </Animated.View>
                </View>

                {/* Icon Twitter */}
                <View style={styles.viewWrapIcon}>
                    {this.currentIconFocus === 5 ? (
                        <Animated.View
                            style={[
                                styles.viewWrapTextDescription,
                                {
                                    bottom: this.pushTextDescriptionUp,
                                    transform: [{scale: this.zoomTextDescription}],
                                    width: 45
                                },
                            ]}>
                            <Text style={styles.textDescription}>Twitter</Text>
                        </Animated.View>
                    ) : null}
                    <Animated.View
                        style={{
                            marginBottom: this.pushIconTwitterUp,
                            transform: [
                                {
                                    scale: this.isDragging
                                        ? this.currentIconFocus === 5
                                            ? this.zoomIconChosen
                                            : this.previousIconFocus === 5
                                                ? this.zoomIconNotChosen
                                                : this.isJustDragInside
                                                    ? this.zoomIconWhenDragInside
                                                    : 0.8
                                        : this.isDraggingOutside
                                            ? this.zoomIconWhenDragOutside
                                            : this.zoomIconTwitter,
                                },
                            ],
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/color/48/000000/twitter-circled.png"
                            }}
                        />
                    </Animated.View>
                </View>

                {/* Icon Youtube*/}
                <View style={styles.viewWrapIcon}>
                    {this.currentIconFocus === 6 ? (
                        <Animated.View
                            style={[
                                styles.viewWrapTextDescription,
                                {
                                    bottom: this.pushTextDescriptionUp,
                                    transform: [{scale: this.zoomTextDescription}],
                                    width: 50
                                },
                            ]}>
                            <Text style={styles.textDescription}>Youtube</Text>
                        </Animated.View>
                    ) : null}
                    <Animated.View
                        style={{
                            marginBottom: this.pushIconYoutubeUp,
                            transform: [
                                {
                                    scale: this.isDragging
                                        ? this.currentIconFocus === 6
                                            ? this.zoomIconChosen
                                            : this.previousIconFocus === 6
                                                ? this.zoomIconNotChosen
                                                : this.isJustDragInside
                                                    ? this.zoomIconWhenDragInside
                                                    : 0.8
                                        : this.isDraggingOutside
                                            ? this.zoomIconWhenDragOutside
                                            : this.zoomIconYoutube,
                                },
                            ],
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/fluent/48/000000/play-button-circled.png"
                            }}
                        />
                    </Animated.View>
                </View>
            </Animated.View>
        );
    }

    renderGroupJumpIcon() {
        let moveUpIcon = this.moveUpIconWhenRelease.interpolate({
            inputRange: [0, 0.4],
            outputRange: [40, 70],
        });

        return (
            <View style={styles.viewWrapGroupJumpIcon}>
                {/*Icon Facebook*/}
                {this.whichIconUserChoose === 1 && !this.isDragging ? (
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                             left: this.moveLeftIconFacebookWhenRelease,
                            bottom: moveUpIcon,
                            transform: [{scale: this.zoomIconWhenRelease}],
                            position: 'absolute',
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                "https://img.icons8.com/fluent/48/000000/facebook-new.png"
                            }}
                        />
                    </Animated.View>
                ) : null}

                {/*Icon Instagram*/}
                {this.whichIconUserChoose === 2 && !this.isDragging ? (
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                            left: this.moveLeftIconInstagramWhenRelease,
                            bottom: moveUpIcon,
                            transform: [{scale: this.zoomIconWhenRelease}],
                            position: 'absolute',
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/fluent/48/000000/instagram-new.png"
                            }}
                        />
                    </Animated.View>
                ) : null}

                {/*Icon LinkedIn*/}
                {this.whichIconUserChoose === 3 && !this.isDragging ? (
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                            left: this.moveLeftIconLinkedInWhenRelease,
                            bottom: moveUpIcon,
                            transform: [{scale: this.zoomIconWhenRelease}],
                            position: 'absolute',
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/color/48/000000/linkedin-circled.png"
                            }}
                        />
                    </Animated.View>
                ) : null}

                {/*Icon Snapchat*/}
                {this.whichIconUserChoose === 4 && !this.isDragging ? (
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                            left: this.moveLeftIconSnapchatWhenRelease,
                            bottom: moveUpIcon,
                            transform: [{scale: this.zoomIconWhenRelease}],
                            position: 'absolute',
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/color/48/000000/snapchat-circled-logo.png"
                            }}
                        />
                    </Animated.View>
                ) : null}

                {/*Icon Twitter*/}
                {this.whichIconUserChoose === 5 && !this.isDragging ? (
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                            left: this.moveLeftIconTwitterWhenRelease,
                            bottom: moveUpIcon,
                            transform: [{scale: this.zoomIconWhenRelease}],
                            position: 'absolute',
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/color/48/000000/twitter-circled.png"
                            }}
                        />
                    </Animated.View>
                ) : null}

                {/*Icon angry*/}
                {this.whichIconUserChoose === 6 && !this.isDragging ? (
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                            left: this.moveLeftIconYoutubeWhenRelease,
                            bottom: moveUpIcon,
                            transform: [{scale: this.zoomIconWhenRelease}],
                            position: 'absolute',
                        }}>
                        <Image
                            style={styles.imgIcon}
                            source={{
                                uri:
                                    "https://img.icons8.com/fluent/48/000000/play-button-circled.png"
                            }}
                        />
                    </Animated.View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    plusContainer: {
        marginHorizontal: 5,
        marginTop: 3,
        width: 40,
    },
    label: {
        ...FontSizes.Caption,
        ...FontWeights.Regular,
        color: colours.text02,
        marginTop: 3,
        alignSelf: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    // Body
    viewBody: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'blue'
    },

    // Main content
    viewContent: {
        flexDirection: 'column',
        height: 220,
        marginLeft: 10,
        marginRight: 10
    },

    // Box
    viewBox: {
        borderRadius: 30,
        width: 320,
        height: 50,
        marginTop: 40,
        marginLeft: 20,
        position: 'absolute',
        // Has to set color for elevation
        backgroundColor: colours.placeholder,
         elevation: 6,
    },


    // Group icon
    viewWrapGroupIcon: {
        flexDirection: 'row',
        width: 320,
        height: 120,
        marginTop: -10,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingLeft: 5,
        paddingRight: 5
    },
    viewWrapIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgIcon: {
        width: 36,
        height: 36,
    },
    viewWrapTextDescription: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 2,
        paddingBottom: 2,
        position: 'absolute',
    },
    textDescription: {
        color: 'white',
        fontSize: 8,
    },

    // Group jump icon
    viewWrapGroupJumpIcon: {
        flexDirection: 'row',
        width: 330,
        height: 140,
        //marginTop: 30,
        marginLeft: 10,
        position: 'absolute',
        alignItems: 'flex-end'
    }

});
