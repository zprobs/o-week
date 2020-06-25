/**
 * Fonts:
 * This contains all the typography config for the application
 * Note: color and font size are defaulted as they can be overridden
 *        as required.
 */

const FontWeights = {
    Bold: {
        fontFamily: 'SFProDisplay-Bold',
        color: '#000'
    },
    Regular: {
        fontFamily: 'SFProDisplay-Regular',
        color: '#000'
    },
    Light: {
        fontFamily: 'SFProDisplay-Light',
        color: '#000'
    }
};

const FontSizes = {
    SuperHeading: {
        fontSize: 48
    },
    Heading: {
        fontSize: 32
    },
    SubHeading: {
        fontSize: 24
    },
    Label: {
        fontSize: 20
    },
    Body: {
        fontSize: 16
    },
    Caption: {
        fontSize: 14
    },
    SubText: {
        fontSize: 12
    }
};

const Fonts = { FontWeights, FontSizes };

export default Fonts;
