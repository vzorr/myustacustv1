/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidStyle, AndroidImportance } from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  onNotifeeMessageReceived(remoteMessage)
  console.log('Message handled in the background!', remoteMessage);
});
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    onNotifeeMessageReceived(remoteMessage)


  });
const onNotifeeMessageReceived = async (message) => {

  const channelId = await notifee.createChannel({
    id: '12233',
    name: 'Default Channel',
  });
  notifee.displayNotification({
    title: 'index job',
    body: `index is posted a job`,
    android: {
      channelId: '16ddd',
    },
  });

};
notifee.onBackgroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.DISMISSED:
      break;
    case EventType.PRESS:
      break;
    default:
      break;
  }
});
AppRegistry.registerComponent(appName, () => App);
