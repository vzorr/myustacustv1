import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

export type UserStackParamList = {
    Home: undefined;
    Splash: undefined;
    SignIn: any;
    SignUp: any;
    ForgotPassword: any;
    OtpVerfication: any;
    NewPassword: any;
    SuccessMessage: any
    ChangePassword: any
};

export type UserNavigationRootProps<T extends keyof UserStackParamList> = {
    route: RouteProp<UserStackParamList, T>;
    navigation: StackNavigationProp<UserStackParamList, T>;
};