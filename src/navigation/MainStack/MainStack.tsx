import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';
import NavStack from '../NavStack/NavStack';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { setFireBaseToken } from '../../stores/reducer/FireBaseTokeReducer';

import DeviceInfo from 'react-native-device-info';
import { client, client1, notificationClient } from '../../apiManager/Client';
const MainStack = () => {
    const navigationRef = useRef<any>(null);
    // const [token, setToken] = useState<string>('');
    const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
    const appState = useRef(AppState.currentState);
    const dispatch = useDispatch();
    const { userData } = useSelector((state: any) => state?.userInfo);
    const { fireBaseToken } = useSelector((state: any) => state?.fireBaseToken);
    const ANDROID_POST_NOTIFICATIONS = 'android.permission.POST_NOTIFICATIONS' as any;
    const deviceId = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // console.log("fireBaseToken", fireBaseToken)
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuu", userData?.token)


    const registerDevice = async () => {
        await messaging().registerDeviceForRemoteMessages();
    };
    useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("FCM Foreground Message:", remoteMessage);
        await onNotifeeMessageReceived(remoteMessage);
    });

    return unsubscribe;
}, []);
    useEffect(() => {
        NotificationPermission();
        if (userData?.token) {
            registerDevice()
            messaging()
                .getToken()
                .then(async (fcmToken) => {
                    console.log("fcmToken", fcmToken)
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

                        // console.log("deviceInfo", deviceInfo)
                        try {
                            let res = await notificationClient(userData?.token).post('auth/register-device', deviceInfo)
                            dispatch(setFireBaseToken(fcmToken));
                            console.log("ressssss", res)
                            console.log('Device token registered successfully:', { deviceId });

                        } catch (error) {
                            console.log("devicesssssserror", error)
                        }

                    }
                }).catch((err) => {
                    console.log('Failed to register device token:', JSON.stringify(err?.message, null, 2));
                });
        }

        messaging().setBackgroundMessageHandler(onNotifeeMessageReceived);
    }, [userData]);

    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            return await request(ANDROID_POST_NOTIFICATIONS);
        }
        return RESULTS.GRANTED; // assume granted for older Android
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

    const onNotifeeMessageReceived = async (message: any) => {
        console.log("messagessss", message)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'General Notifications',
            importance: AndroidImportance.HIGH,
        });
        notifee.displayNotification({
            title: 'user',
            body: `user is posted a job`,
            android: {
                channelId: '16ddd',
            },
        });
        // const style =
        //     message?.data?.type === '1'
        //         ? { type: AndroidStyle.BIGPICTURE, picture: message.data.imgURI }
        //         : { type: AndroidStyle.BIGTEXT, text: message.data.body };

        // await notifee.displayNotification({
        //     id: message.messageId,
        //     title: message.data.title,
        //     body: message.data.body,
        //     data: message.data,
        //     android: {
        //         channelId,
        //         importance: AndroidImportance.HIGH,
        //         pressAction: { id: 'default' },
        //     },
        // });
    };
    //  title: notification.title,
    //       message: notification.body,
    //       playSound: true,
    //       soundName: this.getNotificationSound(data.type),
    //       data: data,
    //       userInfo: data,
    //       id: data.messageId || Date.now().toString(),
    //       // iOS specific
    //       category: data.type,
    //       // Android specific
    //       smallIcon: 'ic_notification',
    //       largeIcon: 'ic_launcher',
    //       bigText: notification.body,
    //       subText: this.getNotificationSubtext(data),
    //       color: '#007AFF',
    //       vibrate: true,
    //       vibration: 300,
    //       priority: 'high',
    //       visibility: 'private',
    const handleClickedNotification = (notification: any) => {
        const { type, productName, senderName, senderId } = notification?.data || {};

        if (type) {
            switch (type) {
                case '1':
                case '2':
                case '3':
                case '44':
                case '43':
                case '45':
                    navigateTo('Tabs', { activeTab: 4 });
                    break;
                case '23':
                    navigateTo('SellAndEarn');
                    break;
                case '46':
                    navigateTo('OffersOnMyAds');
                    break;
                case '42':
                    navigateTo('Tabs', { screen: 'Ads', params: { deal: 'Deals' } });
                    break;
                case '32':
                    navigateTo('UsedMobileDetailPage', { mobileId: productName });
                    break;
                default:
                    navigateTo('Tabs');
            }
        } else if (senderName) {
            navigateTo('ChatInbox', {
                chatData: {
                    userId: senderId,
                    userName: senderName,
                    isOnline: true,
                    isBlocked: false,
                    isBlocker: false,
                },
            });
        } else {
            navigateTo('Tabs');
        }
    };

    const navigateTo = (route: string, params: any = {}) => {
        navigationRef.current?.dispatch(CommonActions.navigate({ name: route, params }));
    };


    useEffect(() => {
        notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                handleClickedNotification(detail.notification);
            }
        });

        notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                handleClickedNotification(detail.notification);
            }
        });
    }, []);


    return (
        <NavigationContainer ref={navigationRef}>
            <NavStack />
        </NavigationContainer>
    );
};

export default MainStack