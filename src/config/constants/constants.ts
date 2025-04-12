
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

export enum MAIN_CATEGORIES {
    USED = 1,
    NEW = 2,
    ACCESSORIES = 3,
    NOTIFICATION = 4,
}

export const googleLocationApiKey = "AIzaSyB8ODrHnGGYlUvHJ5omefoaIEM_M9Je0bg"
// API Key Android AIzaSyDK6xDsgrab0VzbnLeEVT1rJHsz2k1mA1c
const convertImagesToBase64 = async (images: any) => {
    try {
        const base64Images = await Promise.all(
            images.map(async (image: any) => {
                const actualPath = image.path.replace('file://', '');
                const base64String = await RNFS.readFile(actualPath, 'base64');
                return `data:image/jpeg;base64,${base64String}`;
            })
        );
        return base64Images;
    } catch (error) {
        console.error('Error converting images to base64:', error);
        return [];
    }
};
export const postJobValue = async (previewValue: any, categories?: any) => {

    const selectedCategories = categories?.filter((category: any) => previewValue.category.includes(category.name))
        .map((category: any) => category.key);

    const base64Images = await convertImagesToBase64(previewValue?.images);
    let payload = {
        title: previewValue?.title,
        description: previewValue?.description,
        paymentMethod: previewValue?.paymentMethod,
        category: selectedCategories[0],
        areaSize: Number(previewValue?.areaSize) || 0,
        areaType: previewValue?.areaType?.join(""),
        startDate: previewValue?.startDate,
        endDate: previewValue?.endDate,
        materials: previewValue?.materials,
        location: previewValue?.location,
        budget: Number(previewValue?.budget) || 1,
        images: base64Images
    }
    return payload
}