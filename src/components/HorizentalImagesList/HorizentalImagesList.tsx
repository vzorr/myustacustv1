import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/themes/theme';
import ImageModal from '../ImageCarousel/ImageModal';

interface ImageItem {
    id?: number | string;
    uri?: string;          // For network images
    path?: string;         // For uploaded images
    imagePath?: any;       // For local images (require())
    source?: ImageSourcePropType; // More flexible type
}

interface HorizontalImageListProps {
    images: ImageItem[];
    enableModal?: boolean;  // Optional prop to enable/disable modal functionality
    onImagePress?: (index: number, image: ImageItem) => void;  // Optional callback for image press
}

const HorizontalImageList = (props: HorizontalImageListProps) => {
    const { 
        images, 
        enableModal = true, // Enable modal by default for PostJobPreviewScreen
        onImagePress 
    } = props;
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImagePress = (index: number, item: ImageItem) => {
        // If external handler is provided, call it
        if (onImagePress) {
            onImagePress(index, item);
            return;
        }
        
        // Otherwise, if modal is enabled, show the modal
        if (enableModal) {
            setSelectedImageIndex(index);
            setModalVisible(true);
        }
    };

    return (
        <>
            <FlatList
                horizontal
                data={images}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        style={styles.imageContainer}
                        onPress={() => handleImagePress(index, item)}
                    >
                        <Image
                            source={item.imagePath ? item.imagePath : { uri: item.path }}
                            style={styles.image}
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />

            {enableModal && (
                <ImageModal
                    visible={modalVisible}
                    images={images}
                    onClose={() => setModalVisible(false)}
                    initialIndex={selectedImageIndex}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        gap: 8
    },
    imageContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 8,
        resizeMode: 'contain'
    },
});

export default HorizontalImageList;