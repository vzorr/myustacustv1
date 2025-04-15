import { StyleSheet } from "react-native";
import { COLORS, fontSize } from "../config/themes/theme";

export const statusScreensStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10
    },
    headingContainer: {
        // marginBottom: -8
    },
    title: {
        fontSize: fontSize[16]
    },
    subTitle: {
        fontSize: fontSize[14], marginTop: -4
    }
})