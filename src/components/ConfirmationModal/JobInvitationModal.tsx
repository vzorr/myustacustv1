import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import ConfirmationButtons from '../Buttons/ConfirmationButtons';
import CustomSelector from '../Selector/CustomSelector';
import { SVGIcons } from '../../config/constants/svg';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import LineSeparator from '../LineSeparator/LineSeparator';
import { FlatList } from 'react-native';
interface Job {
    id: string;
    title: string;
}

interface Props {
    visible: boolean;
    onCancel: () => void;
    Confirm: () => void;
    title?: string;
    subTitle?: string;
    showDropdown?: boolean;
    setShowDropdown?: (show: boolean) => void;
    selectedOption?: string;
    setSelectedOption?: (option: string) => void;
    handleDropdownToggle?: () => void;
    navigation?: any;
    jobList?: Job[];
}

const JobInvitaionModal: React.FC<Props> = ({
    visible,
    onCancel,
    Confirm,
    title = "Invite to Job",
    subTitle = "Select a job to invite the Usta",
    selectedOption,
    setSelectedOption,
    showDropdown = false,
    setShowDropdown,
    handleDropdownToggle,
    navigation,
    jobList = [
        { id: '1', title: 'Tiler needed for total house renovation' },
        { id: '2', title: 'Looking for Tiler.' },
        { id: '3', title: 'Tiler needed ASAP' },
    ],
}) => {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={{ gap: 4 }}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text style={styles.modalSubtitle}>{subTitle}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                        <CustomSelector
                            title='Choose Job'
                            onPress={handleDropdownToggle}
                            iconName={showDropdown ? 'ArrowUp' : 'ArrowDown'}
                        />
                        {showDropdown && (
                            <View style={styles.checkBoxContainer}>
                                <FlatList
                                    data={jobList}
                                    keyExtractor={(item) => item.id}
                                    ItemSeparatorComponent={() => (
                                        <View style={{ marginVertical: 8 }}>
                                            <LineSeparator />
                                        </View>
                                    )}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setSelectedOption?.(item.title)}
                                            style={styles.boxContentContainer}
                                        >
                                            {
                                                selectedOption === item.title
                                                    ? <SVGIcons.selectedBox />
                                                    : <SVGIcons.unSelectedBox />
                                            }
                                            <Text style={reuseableTextStyles.subTitle}>{item.title}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>
                    <ConfirmationButtons
                        cancelText='Cancel'
                        onCancel={onCancel}
                        confirmText='Invite'
                        onConfirm={Confirm}
                        confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default JobInvitaionModal;

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
        // alignItems: 'center',
        elevation: 5,
        gap: 12
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
    checkBoxContainer: {
        maxHeight: 150,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        padding: 12,
        // gap: 8,
        backgroundColor: COLORS.white,
    },
    boxContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});
