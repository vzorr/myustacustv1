// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from "@react-navigation/native";

// export type UserStackParamList = {
//     Tabs: any;
//     Home: undefined;
//     PostJobScreen: any;
//     SearchScreen: any;
//     ChatList: any;
//     ProfileScreen: any;
//     PostJobPreview: any;
//     SuccessMessageScreen: any;
//     Splash: undefined;
//     SignIn: any;
//     SignUp: any;
//     ForgotPassword: any;
//     OtpVerfication: any;
//     NewPassword: any;
//     SuccessMessage: any;
//     ChangePassword: any;
//     AccountBasicInfo: any;
//     LocationsAndPreferences: any;
//     LocationScreen: any;
//     NotificationPreferences: any;
//     TermsAndConditions: any;
//     LoadingScreen: any;
//     JobsStatusSackNav: any;
//     JobsStatusScreens: any;
//     PostedJobDetailScreen: any;
//     ApplicationsList: any;
//     ApplicationDetail: any;
//     UstaProfile: any;
//     UstaPortfolio: any;
//     UstaPortfolioDetail: any;
//     ChatInbox: any;
//     Notifications: any;
//     ProfessionDetailScreen: any;
// };

// export type UserNavigationRootProps<T extends keyof UserStackParamList> = {
//     route: RouteProp<UserStackParamList, T>;
//     navigation: StackNavigationProp<UserStackParamList, T>;
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
    ProfessionDetailScreen: any;
    EditProfile: any;
    PhoneNumberScreen: any;
    EmailScreen: any;
    ChangeEmailAndNumber: any;
    UpdatePassword: any;
    PostedJobDetailScreen: { jobId: string | number };
    ApplicationsList: { jobId: string | number };
    ApplicationDetail: { proposalId: string | number };
    UstaProfile: {
        otherUserId: string | number;
        jobId?: string | number;
    };
    UstaPortfolio: any;
    UstaPortfolioDetail: {
        portfolioId: string | number;
        jobId?: string | number;
    };
    ChatInbox: {
        chatData: {
            otherUserId: string | number;
            jobId: string | number;
            jobTitle: string;
            userName: string;
            isOnline: boolean;
            isBlocked: boolean;
            isBlocker?: boolean;
            profileImage?: string;
            conversationId: string
        };
        prefilledMessage?: string;
    };
    Notifications: undefined;
    NotificationDetail: {
        notification: {
            id: string;
            type: string;
            title?: string;
            message: string;
            description?: string;
            timestamp: string;
            read: boolean;
            actionable?: boolean;
            actionText?: string;
            jobId?: string;
            senderId?: string;
            senderName?: string;
            jobTitle?: string;
            image?: string;
        };
    };
};

export type UserNavigationRootProps<T extends keyof UserStackParamList> = {
    route: RouteProp<UserStackParamList, T>;
    navigation: StackNavigationProp<UserStackParamList, T>;
};