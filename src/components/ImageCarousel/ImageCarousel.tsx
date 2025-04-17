import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import { COLORS } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

interface ImageItem {
  id?: number | string;
  uri?: string;
  path?: string;
  imagePath?: any;
  source?: ImageSourcePropType;
}

interface ImageCarouselProps {
  images: ImageItem[];
  onClose: () => void;
  initialIndex?: number;
}

const { width, height } = Dimensions.get('window');
const imageSize = Math.min(width * 0.85, height * 0.6); // Square image size

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll to initial index when component mounts
  useEffect(() => {
    if (initialIndex > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }
  }, []);

  const handleNext = () => {
    if (currentIndex < images.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: newIndex,
          animated: true,
          viewPosition: 0.5,
        });
        
        // Reset transitioning state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: newIndex,
          animated: true,
          viewPosition: 0.5,
        });
        
        // Reset transitioning state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
    }
  };

  const renderItem = ({ item }: { item: ImageItem }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageCenterer}>
          <View style={styles.imageContainer}>
            <Image
              source={item.imagePath ? item.imagePath : { uri: item.path || item.uri }}
              style={styles.image}
              resizeMode="cover"
              fadeDuration={0}
            />
          </View>
        </View>
      </View>
    );
  };

  // Handle manual scroll end to maintain index
  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0 && !isTransitioning) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  // Button visibility logic as per requirements
  const isSingleImage = images.length <= 1;
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;
  
  // Calculate which buttons to show
  const showLeftArrow = !isSingleImage && !isFirstImage;
  const showRightArrow = !isSingleImage && !isLastImage;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        horizontal
        pagingEnabled={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // Improve performance
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={3}
        // Preload adjacent images
        initialNumToRender={3}
        extraData={currentIndex}
      />
      
      {/* Close button overlaid on image top right corner */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <View style={styles.closeButtonCircle}>
          <View style={styles.closeButtonX}>
            <SVGIcons.crossIcon stroke={COLORS.white} />
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Navigation buttons overlaid on image */}
      {showLeftArrow && (
        <TouchableOpacity 
          style={[styles.navigationButton, styles.leftButton]} 
          onPress={handlePrevious}
          disabled={isTransitioning}
        >
          <View style={styles.arrowCircle}>
            <SVGIcons.leftArrow />
          </View>
        </TouchableOpacity>
      )}
      
      {showRightArrow && (
        <TouchableOpacity 
          style={[styles.navigationButton, styles.rightButton]} 
          onPress={handleNext}
          disabled={isTransitioning}
        >
          <View style={styles.arrowCircle}>
            <SVGIcons.rightArrow />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
  },
  slideContainer: {
    width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCenterer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    // Add shadow for better visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  closeButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonX: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossLine: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: 'white',
  },
  crossLine1: {
    transform: [{ rotate: '45deg' }],
  },
  crossLine2: {
    transform: [{ rotate: '-45deg' }],
  },
  navigationButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
  leftButton: {
    left: 16,
  },
  rightButton: {
    right: 16,
  },
  arrowCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.Yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 12,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: COLORS.Navy,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: -4,
  },
  rightArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: COLORS.Navy,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginRight: -4,
  },
});

export default ImageCarousel; 