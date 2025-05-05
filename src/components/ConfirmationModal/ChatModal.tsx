import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import LineSeparator from '../LineSeparator/LineSeparator';

interface Props {
    visible: boolean;
    isProgress: boolean;
    handleViewProfile: () => void;
    handleViewProgress?: () => void;
    handleContract?: () => void;
    handleBlockUser: () => void;
    handleDeleteChat: () => void;
}

const ChatModal: React.FC<Props> = ({
    visible,
    isProgress,
    handleViewProfile,
    handleViewProgress,
    handleContract,
    handleBlockUser,
    handleDeleteChat
}) => {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={{ gap: 8 }}>
                        <TouchableOpacity onPress={handleViewProfile}>
                            <Text style={styles.modalSubtitle}>View Usta Profile</Text>
                        </TouchableOpacity>
                        <LineSeparator />
                        {isProgress ?
                            <>
                                <TouchableOpacity onPress={handleViewProgress}>
                                    <Text style={styles.modalSubtitle}>View Progress</Text>
                                </TouchableOpacity>
                                <LineSeparator />
                            </> :
                            <>
                                <TouchableOpacity onPress={handleContract}>
                                    <Text style={styles.modalSubtitle}>Generate Contract</Text>
                                </TouchableOpacity>
                                <LineSeparator />
                            </>
                        }
                        <TouchableOpacity onPress={handleBlockUser}>
                            <Text style={styles.modalSubtitle}>Block User</Text>
                        </TouchableOpacity>
                        <LineSeparator />
                        <TouchableOpacity onPress={handleDeleteChat}>
                            <Text style={styles.modalSubtitle}>Delete Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ChatModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: COLORS.modalBgColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: COLORS.white,
        width: '80%',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        elevation: 5,
        gap: 20
    },
    modalSubtitle: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        color: COLORS.Navy,
        fontStyle: 'normal',
        textAlign: 'center'
    },
});
