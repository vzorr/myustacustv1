import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import CustomButton from '../Buttons/CustomButton';

interface Props {
    visible: boolean;
    onCancel: () => void;
    Confirm: () => void;
    title?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
}

const ConfirmationModal: React.FC<Props> = ({
    visible,
    onCancel,
    Confirm,
    title = "Delete Location?",
    message = "This action can't be undone.",
    cancelText = "Cancel",
    confirmText = "Confirm"
}) => {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={{ gap: 8 }}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text style={styles.modalSubtitle}>{message}</Text>
                    </View>
                    <View style={styles.modalActions}>
                        <CustomButton
                            onPress={onCancel}
                            title={cancelText}
                            style={styles.cancelButton}
                        />
                        <CustomButton
                            onPress={Confirm}
                            title={confirmText}
                            style={styles.confirmButton}
                            textStyle={styles.cnfrmText}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;

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
        padding: 24,
        alignItems: 'center',
        elevation: 5,
        gap: 20
    },
    modalTitle: {
        fontSize: fontSize[20],
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
        color: COLORS.Navy,
        fontStyle: 'normal'
    },
    modalSubtitle: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        color: COLORS.Navy200,
        fontStyle: 'normal'
    },
    modalActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cancelButton: {
        width: "45%",
        height: 40,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    confirmButton: {
        width: "45%",
        height: 40,
        backgroundColor: COLORS.ErrorRed,
    },
    cnfrmText: {
        color: COLORS.white
    },
});
