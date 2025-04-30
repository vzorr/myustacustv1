import React from 'react';
import { Modal, StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import ImageCarousel from './ImageCarousel';
import { COLORS } from '../../config/themes/theme';

interface ImageItem {
  id?: number | string;
  uri?: string;
  path?: string;
  imagePath?: any;
  source?: any;
}

interface ImageModalProps {
  visible: boolean;
  images: ImageItem[];
  onClose: () => void;
  initialIndex?: number;
}

const { width, height } = Dimensions.get('window');

const ImageModal: React.FC<ImageModalProps> = ({
  visible,
  images,
  onClose,
  initialIndex = 0,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" translucent={true} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ImageCarousel
            images={images}
            onClose={onClose}
            initialIndex={initialIndex}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background for more contrast
    padding: 0,
    margin: 0,
  },
  modalContent: {
    width: width * 0.9,
    height: width * 0.9, // Square shape for the modal content
    maxHeight: height * 0.7, // Maximum height to ensure it fits on screen
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ImageModal; 