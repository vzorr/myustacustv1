import { StyleSheet } from "react-native";
import { COLORS } from "../../../config/themes/theme";

export const editProfileStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "column",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
    },
})