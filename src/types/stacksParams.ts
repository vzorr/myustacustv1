import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

export type UserStackParamList = {
    Home: undefined;
    Splash: undefined;
};

export type UserNavigationRootProps<T extends keyof UserStackParamList> = {
    route: RouteProp<UserStackParamList, T>;
    navigation: StackNavigationProp<UserStackParamList, T>;
};