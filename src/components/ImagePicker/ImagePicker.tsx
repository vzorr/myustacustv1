import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
import CustomSelector from '../Selector/CustomSelector';

interface ImagePickerProps {
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  handleCancel: () => void;
  // handleCancel: () => void;
  imagesCount?: number;
  showImageModal: boolean;
  setShowImageModal: any
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onTakePhoto,
  onPickFromGallery,
  handleCancel,
  showImageModal,
  setShowImageModal,
  imagesCount = 0
}) => {
  // const [showImageModal, setShowImageModal] = useState(false);

  // const handleImageUpload = () => {
  //   setShowImageModal(true);
  // };

  // const handleCancel = () => {
  //   setShowImageModal(false);
  //   onCancel();
  // };

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
    <>
      {/* <CustomSelector
        title={imagesCount > 0 ? `${imagesCount} Images Selected` : 'Upload Image'}
        iconName='uploadIcon'
        onPress={handleImageUpload}
      /> */}

      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Upload Image</Text>
            <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto}>
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
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
    </>
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
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: fontSize[16],
    fontFamily: FONTS.interBold,
    color: COLORS.Black,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  modalOptionText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Black,
    textAlign: 'center',
  },
  modalCancel: {
    marginTop: 15,
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

export default ImagePicker; 