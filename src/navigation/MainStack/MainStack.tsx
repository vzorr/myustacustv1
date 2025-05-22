import React, { useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import NavStack from '../NavStack/NavStack';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { setFireBaseToken } from '../../stores/reducer/FireBaseTokeReducer';
import DeviceInfo from 'react-native-device-info';
import { notificationClient } from '../../apiManager/Client';
import { useNotificationHandler } from '../../hooks/useNotificationHandler';

// Component that has access to navigation context
const NavigationContent: React.FC = () => {
  // Now the hook has access to NavigationContainer
  useNotificationHandler();
  
  return <NavStack />;
};

const MainStack = () => {
    const navigationRef = useRef<any>(null);
    const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
    const appState = useRef(AppState.currentState);
    const dispatch = useDispatch();
    const { userData } = useSelector((state: any) => state?.userInfo);
    const { fireBaseToken } = useSelector((state: any) => state?.fireBaseToken);
    const ANDROID_POST_NOTIFICATIONS = 'android.permission.POST_NOTIFICATIONS' as any;
    const deviceId = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log("userData?.token", userData?.token);

    const registerDevice = async () => {
        await messaging().registerDeviceForRemoteMessages();
    };

    // Main setup for device registration and permissions
    useEffect(() => {
        NotificationPermission();
        
        if (userData?.token) {
            registerDevice();
            messaging()
                .getToken()
                .then(async (fcmToken) => {
                    console.log("fcmToken", fcmToken);
                    if (fcmToken && fcmToken !== fireBaseToken) {
                        const deviceInfo: any = {
                            token: fcmToken,
                            deviceId: deviceId,
                            deviceType: 'mobile',
                            platform: Platform.OS,
                            deviceModel: DeviceInfo.getModel(),
                            deviceOS: `${Platform.OS} ${DeviceInfo.getSystemVersion()}`,
                            appVersion: DeviceInfo.getVersion()
                        };

                        console.log("deviceInfo", deviceInfo);
                        try {
                            let res = await notificationClient(userData?.token).post('auth/register-device', deviceInfo);
                            dispatch(setFireBaseToken(fcmToken));
                            console.log("Device registration response:", res);
                            console.log('Device token registered successfully:', { deviceId });
                        } catch (error) {
                            console.log("Device registration error:", error);
                        }
                    }
                }).catch((err) => {
                    console.log('Failed to register device token:', JSON.stringify(err?.message, null, 2));
                });
        }
    }, [userData]);

    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            return await request(ANDROID_POST_NOTIFICATIONS);
        }
        return RESULTS.GRANTED;
    };

    const checkNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            return await check(ANDROID_POST_NOTIFICATIONS);
        }
        return RESULTS.GRANTED;
    };

    const NotificationPermission = async () => {
        if (Platform.OS === 'android') {
            const checkPerm = await checkNotificationPermission();
            if (checkPerm !== RESULTS.GRANTED) {
                await requestNotificationPermission();
            }
        } else {
            await messaging().requestPermission();
        }
    };

    return (
        <NavigationContainer ref={navigationRef}>
            <NavigationContent />
        </NavigationContainer>
    );
};

export default MainStack;