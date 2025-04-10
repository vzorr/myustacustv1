import { COLORS } from "../../config/themes/theme";

export const tabsScreenOptionsStyle: any = {
    tabBarScrollEnabled: false,
    tabBarActiveTintColor: COLORS.white,
    tabBarInactiveTintColor: COLORS.Navy,
    headerShown: false,
    lazy: true,
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {
        fontSize: 12,
    },
    tabBarStyle: {
        display: 'none', 
    },
    contentStyle: {
        backgroundColor: COLORS.white,
        paddingBottom: 60,
    }
}