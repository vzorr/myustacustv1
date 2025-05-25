import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from '@react-native-documents/picker';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import { SVGIcons } from '../../../../../config/constants/svg';
import { AttachmentType } from '../../../../../types/chat';

interface AttachmentPickerProps {
  visible: boolean;
  onSelect: (file: any, type: AttachmentType) => void;
  onClose: () => void;
}

const AttachmentPicker: React.FC<AttachmentPickerProps> = ({
  visible,
  onSelect,
  onClose
}) => {
  const handleCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 800,
        height: 600,
        cropping: false,
        mediaType: 'photo',
      });
      
      onSelect(image, AttachmentType.IMAGE);
    } catch (error) {
      console.log('Camera cancelled or error:', error);
    }
  };

  const handleGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 600,
        cropping: false,
        mediaType: 'photo',
      });
      
      onSelect(image, AttachmentType.IMAGE);
    } catch (error) {
      console.log('Gallery cancelled or error:', error);
    }
  };

  const handleDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      
      onSelect(result[0], AttachmentType.FILE);
    } catch (error) {
      console.log('Document picker cancelled or error:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Select Attachment</Text>
          
          <TouchableOpacity style={styles.option} onPress={handleCamera}>
            <SVGIcons.insertPhoto />
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option} onPress={handleGallery}>
            <SVGIcons.insertPhoto />
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option} onPress={handleDocument}>
            <SVGIcons.fileAttach />
            <Text style={styles.optionText}>Choose File</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  title: {
    fontSize: fontSize[18],
    fontFamily: FONTS.interSemiBold,
    color: COLORS.Navy,
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy,
    marginLeft: 12,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
  },
  cancelText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interMedium,
    color: COLORS.ErrorRed,
  },
});

export default AttachmentPicker;