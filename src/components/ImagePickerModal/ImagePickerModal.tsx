import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import LineSeparator from '../LineSeparator/LineSeparator';

interface ImagePickerProps {
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  handleCancel: () => void;
  // handleCancel: () => void;
  imagesCount?: number;
  showImageModal: boolean;
  setShowImageModal: any
}

const CustomImagePickerModal: React.FC<ImagePickerProps> = ({
  onTakePhoto,
  onPickFromGallery,
  handleCancel,
  showImageModal,
  setShowImageModal,
}) => {

  const handleTakePhoto = () => {
    setShowImageModal(false);
    setTimeout(() => {
      onTakePhoto();
    }, 100);
  };

  const handlePickFromGallery = () => {
    setShowImageModal(false);
    setTimeout(() => {
      onPickFromGallery();
    }, 100);
  };

  return (
    <Modal
      visible={showImageModal}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Upload Images</Text>
          <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto}>
            <Text style={styles.modalOptionText}>Take Photo</Text>
          </TouchableOpacity>
          <LineSeparator />
          <TouchableOpacity style={styles.modalOption} onPress={handlePickFromGallery}>
            <Text style={styles.modalOptionText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalCancel}
            onPress={handleCancel}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: fontSize[20],
    fontFamily: FONTS.interSemiBold,
    color: COLORS.Navy,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalOptionText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy200,
    textAlign: 'center',
  },
  modalCancel: {
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: COLORS.ErrorRed,
    borderRadius: 8,
  },
  modalCancelText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interBold,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default CustomImagePickerModal; 