import { SafeAreaView, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import accountScreensStyles from '../../../styles/accountScreensStyles'
import CustomTextInput from '../../../components/InputField/InputBox'
import { COLORS } from '../../../config/themes/theme'
import PhoneNumberInput from '../../../components/PhoneInput/PhoneInput'
import CustomSelector from '../../../components/Selector/CustomSelector'
import ImagePicker from 'react-native-image-crop-picker'
import CustomButton from '../../../components/Buttons/CustomButton'
import ProgressBar from '../../../components/ProgressBar/ProgressBar'
import { SVGIcons } from '../../../config/constants/svg'
import AccountHeader from '../../../components/AccountHeader/AccountHeader'
interface AccountBasicInfoUiProps {
    navigation: any; // Replace with your navigation type if needed
}

const AccountBasicInfoUi: React.FC<AccountBasicInfoUiProps> = (props) => {
    const { navigation } = props;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedNumber, setFormattedNumber] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);

    const pickImageFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 0.8,
        })
            .then((image: { path: string }) => {
                setImage(image.path);
                setImageUploaded(false); // Reset uploaded state when new image is selected
                setShowImageModal(false);
            })
            .catch((error: { code: string }) => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                    Alert.alert('Error', 'Failed to pick image from gallery');
                }
            });
    };

    const takePhotoWithCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 0.8,
            useFrontCamera: true,
        })
            .then((image: { path: string }) => {
                setImage(image.path);
                setImageUploaded(false); // Reset uploaded state when new image is selected
                setShowImageModal(false);
            })
            .catch((error: { code: string }) => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                    Alert.alert('Error', 'Failed to take photo');
                }
            });
    };

    const handleImageUpload = () => {
        setShowImageModal(true);
    };

    const handleConfirmUpload = () => {
        setImageUploaded(true);
        const imageUrl = image; // Using local path for demo
        console.log('Image URL stored:', imageUrl);
    };
    const handleForward = () => {
        if (imageUploaded) {
            navigation.navigate('LocationsAndPreferences');
            return;
        }
    }

    return (
        <SafeAreaView style={accountScreensStyles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ gap: 24 }}>
                    <AccountHeader
                        title="Basic Information"
                        subTitle="Start by providing your contact details and creating your profile."
                    />
                    {/* <View style={{ marginTop: 10 }}>
                        <Text style={accountScreensStyles.basicInfoHeading}>Basic Information</Text>
                        <Text style={accountScreensStyles.subHeading}>Start by providing your contact details and creating your profile.</Text>
                    </View> */}
                    {/* Form Fields */}
                    <View style={{ gap: 8 }}>
                        <CustomTextInput
                            placeholder="First Name"
                            placeholderTextColor={COLORS.Navy}
                            containerStyle={accountScreensStyles.inputFieldContainer}
                            inputStyle={accountScreensStyles.inputField}
                        />
                        <CustomTextInput
                            placeholder="Last Name"
                            placeholderTextColor={COLORS.Navy}
                            containerStyle={accountScreensStyles.inputFieldContainer}
                            inputStyle={accountScreensStyles.inputField}
                        />
                        <PhoneNumberInput
                            defaultValue={phoneNumber}
                            onChangeText={(text: string) => setPhoneNumber(text)}
                            onChangeFormattedText={(text: string) => setFormattedNumber(text)}
                        />
                        <CustomTextInput
                            placeholder="Create Password"
                            placeholderTextColor={COLORS.Navy}
                            isPassword={true}
                            containerStyle={accountScreensStyles.inputFieldContainer}
                            inputStyle={accountScreensStyles.inputField}
                        />
                        <CustomTextInput
                            placeholder="Re-Enter Password"
                            placeholderTextColor={COLORS.Navy}
                            isPassword={true}
                            containerStyle={accountScreensStyles.inputFieldContainer}
                            inputStyle={accountScreensStyles.inputField}
                        />

                        {/* Upload Button (shown when no image is selected) */}
                        {!image && (
                            <CustomSelector
                                title="Upload Image"
                                onPress={handleImageUpload}
                                iconName="uploadIcon"
                            />
                        )}
                        {/* Image Section - Shows either preview with buttons or uploaded selector */}
                        {image && (
                            <View style={accountScreensStyles.imageSection}>
                                {!imageUploaded ? (
                                    <>
                                        <View style={accountScreensStyles.imagePreviewContainer}>
                                            <Image source={{ uri: image }} style={accountScreensStyles.imagePreview} />
                                        </View>
                                        <View style={accountScreensStyles.ButtonsContainer}>
                                            <CustomButton
                                                title="Cancel"
                                                onPress={() => setImage(null)}
                                                style={accountScreensStyles.cancelButton}
                                                textStyle={accountScreensStyles.cancelButtonText}
                                            />
                                            <CustomButton
                                                title="Confirm"
                                                onPress={handleConfirmUpload}
                                                style={accountScreensStyles.confirmButton}
                                                textStyle={accountScreensStyles.confirmButtonText}
                                            />
                                        </View>
                                    </>
                                ) : (
                                    <CustomSelector
                                        title="Image Uploaded"
                                        iconName="uploadedIcon"
                                        disabled={true}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            {/* Navigation Buttons */}
            <View style={{ gap: 16 }}>
                <TouchableOpacity style={accountScreensStyles.arrowButtonContianer} onPress={handleForward}>
                    {!imageUploaded ? (
                        <SVGIcons.unFilledRightButton />
                    ) : (
                        <SVGIcons.filledRightButton />
                    )}
                </TouchableOpacity>
                <View style={accountScreensStyles.StatusBarContainer}>
                    <ProgressBar
                        backgroundColor={COLORS.Yellow}
                    />
                    <ProgressBar
                        backgroundColor={COLORS.statusBarColor}
                    />
                    <ProgressBar
                        backgroundColor={COLORS.statusBarColor}
                    />
                </View>
            </View>
            {/* Image Upload Modal */}
            {showImageModal && (
                <View style={accountScreensStyles.modalOverlay}>
                    <View style={accountScreensStyles.modalContainer}>
                        <Text style={accountScreensStyles.modalTitle}>Upload Image</Text>
                        <TouchableOpacity style={accountScreensStyles.modalOption} onPress={pickImageFromGallery}>
                            <Text style={accountScreensStyles.modalOptionText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={accountScreensStyles.modalOption} onPress={takePhotoWithCamera}>
                            <Text style={accountScreensStyles.modalOptionText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={accountScreensStyles.modalCancel}
                            onPress={() => setShowImageModal(false)}
                        >
                            <Text style={accountScreensStyles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}
export default AccountBasicInfoUi