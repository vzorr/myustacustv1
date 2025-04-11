import React from 'react';
import { FlatList, Image, StyleSheet, View, ImageSourcePropType } from 'react-native';

interface ImageItem {
    id?: number | string;
    uri?: string;          // For network images
    imagePath?: any;       // For local images (require())
    source?: ImageSourcePropType; // More flexible type
}

interface HorizontalImageListProps {
    images: ImageItem[];
}

const HorizontalImageList: React.FC<HorizontalImageListProps> = ({ images }) => {
    return (
        <FlatList
            horizontal
            data={images}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Image
                        source={item.imagePath ? item.imagePath : { uri: item.uri }}
                        style={styles.image}
                    />
                </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        gap: 8

    },
    imageContainer: {
        backgroundColor: "blue",
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