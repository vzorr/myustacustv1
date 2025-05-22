// ===== 2. Updated index.js =====

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import NotificationService from './src/services/NotificationService';

// Initialize notification service
NotificationService.initialize();

AppRegistry.registerComponent(appName, () => App);
