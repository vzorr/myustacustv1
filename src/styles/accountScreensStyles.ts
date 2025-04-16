import { StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize, SIZES } from '../config/themes/theme';

const accountScreensStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 20,
    },
    basicInfoHeading: {
        fontSize: fontSize[24],
        fontFamily: FONTS.interBold,
        fontWeight: "600",
        fontStyle: "normal",
        color: COLORS.Navy
    },
    subHeading: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        fontStyle: "normal",
        color: COLORS.Navy200
    },
    inputFieldContainer: {
        width: "100%",
    },
    inputField: {
        borderColor: COLORS.inputBorder,
        color: COLORS.Navy,
    },
    leftRightButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    StatusBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 8,
    },
    imageSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreviewContainer: {
        width: SIZES.width * 0.35,
        height: SIZES.width * 0.35,
        flexShrink: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 11.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreview: {
        width: SIZES.width * 0.3,
        height: SIZES.width * 0.3,
        borderRadius: (SIZES.width * 0.3) / 2,
    },
    ButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        marginTop: 8,
    },
    cancelButton: {
        width: '45%',
        height: SIZES.hp(6.1),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        color: COLORS.Navy,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButton: {
        width: '45%',
        height: SIZES.hp(6.1),
        backgroundColor: COLORS.Yellow,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        fontStyle: "normal",
        color: COLORS.Navy
    },
    confirmButtonText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        fontStyle: "normal",
        color: COLORS.Navy
    },
    changeImageButton: {
        marginTop: 12,
    },
    changeImageText: {
        color: COLORS.Navy,
        fontSize: 14,
        fontWeight: '500',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.Navy,
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalOptionText: {
        fontSize: 16,
        color: COLORS.Navy,
        textAlign: 'center',
    },
    modalCancel: {
        marginTop: 10,
        paddingVertical: 15,
    },
    modalCancelText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    arrowButtonContianer: {
        alignSelf: 'flex-end',
    },
    dropdownBox: {
        height: SIZES.hp(6.1),
        borderColor: COLORS.inputBorder,
        color: COLORS.Navy,
        alignItems: 'center',
        // justifyContent: 'center'
    }
})
export default accountScreensStyles