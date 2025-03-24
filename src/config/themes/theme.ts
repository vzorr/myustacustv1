import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    Yellow: "#FFC800",
    Navy400: "#001326",
    Navy300: "#001A32",
    Navy200: "#335372",
    Navy100: "#99B9D8",
    Navy: "#00203F",
    ErrorRed: "#FD4C4F",
    Black: "#272727",
    Black10: "#000000",
    Black20: "#000000",
    Black50: "#000000",
    ConfirmGreen: "#04AA0A",
    DarkModeHover: "#FFFFFF",
    LightModeHover: "#000000",
    GreyedOut: "#868686",
    Background: "#FFFFFF",
    SecondaryHover: "#F2F2F2",
    UstaBlack: "#232323",
    Gray: "#EEEEEE",
    bgImgColor: "rgba(0, 32, 63, 0.7)",
    btnBgWhiteColor: "#FFF"
}

export const SIZES = {
    width,
    height
}

export const FONTS = {
    interRegular: "Inter-Regular",
    interMedium: "Inter-Medium",
    interSemiBold: "Inter-SemiBold",
    interBold: "Inter-Bold",
    interLight: "Inter-Light",
    interBlack: "Inter-Black",
}