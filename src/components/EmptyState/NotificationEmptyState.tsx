// src/components/EmptyState/NotificationEmptyState.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import CustomButton from '../Buttons/CustomButton';

interface EmptyStateProps {
    type: 'activity' | 'contracts' | 'reminders';
    onRefresh?: () => void;
}

const NotificationEmptyState: React.FC<EmptyStateProps> = ({ type, onRefresh }) => {
    const getContent = () => {
        switch (type) {
            case 'activity':
                return {
                    title: 'No Activity Notifications',
                    message: 'You have no activity notifications at this time.',
                };
            case 'contracts':
                return {
                    title: 'No Contracts',
                    message: 'You have no contract notifications at this time.',
                };
            case 'reminders':
                return {
                    title: 'No Reminders',
                    message: 'You have no reminders at this time.',
                };
            default:
                return {
                    title: 'No Notifications',
                    message: 'You have no notifications at this time.',
                };
        }
    };

    const content = getContent();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/no-notifications.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.message}>{content.message}</Text>
            {onRefresh && (
                <CustomButton
                    title="Refresh"
                    onPress={onRefresh}
                    style={styles.refreshButton}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontSize: fontSize[16],
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Navy,
        marginBottom: 8,
    },
    message: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy200,
        textAlign: 'center',
        marginBottom: 20,
    },
    refreshButton: {
        width: 160,
    },
});

export default NotificationEmptyState;