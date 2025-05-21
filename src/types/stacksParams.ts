import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

export type UserStackParamList = {
    Tabs: any;
    Home: undefined;
    PostJobScreen: any;
    SearchScreen: any;
    ChatList: any;
    ProfileScreen: any;
    PostJobPreview: any;
    SuccessMessageScreen: any;
    Splash: undefined;
    SignIn: any;
    SignUp: any;
    ForgotPassword: any;
    OtpVerfication: any;
    NewPassword: any;
    SuccessMessage: any;
    ChangePassword: any;
    AccountBasicInfo: any;
    LocationsAndPreferences: any;
    LocationScreen: any;
    NotificationPreferences: any;
    TermsAndConditions: any;
    LoadingScreen: any;
    JobsStatusSackNav: any;
    JobsStatusScreens: any;
    PostedJobDetailScreen: any;
    ApplicationsList: any;
    ApplicationDetail: any;
    UstaProfile: any;
    UstaPortfolio: any;
    UstaPortfolioDetail: any;
    ChatInbox: any;
    Notifications: any;
   
};

export type UserNavigationRootProps<T extends keyof UserStackParamList> = {
    route: RouteProp<UserStackParamList, T>;
    navigation: StackNavigationProp<UserStackParamList, T>;
};