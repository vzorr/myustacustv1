import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#F48020',
    secondary: '#FFC700',
    white: '#FFFFFF',
    black: '#241E20',
    pureBlack: '#000000',
    gray: '#F2F2F2',
    grey: '#787878',
    vCardColor: "#636364",
    lightGray: '#F7F7F7',
    darkGray: '#333333',
    red: '#FF0000',
    green: '#9ABA3B',
    blue: '#0000FF',
    yellow: '#FFFF00',
    orange: '#F48020',
    purple: '#800080',
    pink: '#FFC0CB',
    brown: '#A52A2A',
    transparent: 'transparent',
    ripple: '#ddd',
    checkbtnActiveBg: "#F3F3F3",
    inActBgColor: "#E9E9E9",
    inActiveTxtColor: "#241E20",
    inActiveBorderColor: "#65A9A9A9",
    interQaActiveColor: "#FF6969",
    tabFillColor: "#eeeeee",
    tabBorderColor: "#ADADAD"
}

export const SIZES = {
    width,
    height
}

export const FONTS = {
    // light: Platform.OS === "ios" ? 'Poppins-Light' : 'popinlight',
    // semiBold: Platform.OS === "ios" ? 'Kanit-SemiBold' : "kanitsemibold",
    // mediumP: Platform.OS === "ios" ? 'Poppins-Medium' : "popinmedium",
    // regular: Platform.OS === "ios" ? 'Poppins-Regular' : "popinsreguler",
    // semiBoldP: Platform.OS === "ios" ? 'Poppins-SemiBold' : "popinssemibold",
    // bold: Platform.OS === "ios" ? 'Reckoner-Bold' : "reckonerbold",
    // mediumR: Platform.OS === "ios" ? 'Roboto-Medium' : "robotomedium",
    // russoone: Platform.OS === "ios" ? 'Russo One' : "russoone",
    // // semiBoldS: Platform.OS === "ios" ? 'Signika-SemiBold' : "signikasemibold",
    // permanentmarker: Platform.OS === "ios" ? 'PermanentMarker-Regular' : "permanentmarker",
}
