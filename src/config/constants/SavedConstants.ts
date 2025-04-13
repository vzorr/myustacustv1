
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



// import RNFS from 'react-native-fs';
// import { useSelector } from 'react-redux';

// export enum MAIN_CATEGORIES {
//     USED = 1,
//     NEW = 2,
//     ACCESSORIES = 3,
//     NOTIFICATION = 4,
// }

// export const googleLocationApiKey = "AIzaSyB8ODrHnGGYlUvHJ5omefoaIEM_M9Je0bg"
// // API Key Android AIzaSyDK6xDsgrab0VzbnLeEVT1rJHsz2k1mA1c
// const convertImagesToBase64 = async (images: any) => {
//     try {
//         console.log('Starting image conversion. Count:', images?.length);
        
//         if (!images || images.length === 0) {
//             console.log('No images to convert');
//             return [];
//         }
        
//         // Process each image one by one to avoid memory issues
//         const base64Images = [];
        
//         for (let i = 0; i < images.length; i++) {
//             try {
//                 const image = images[i];
//                 if (!image || !image.path) {
//                     console.log(`Image ${i} has no path, skipping`);
//                     continue;
//                 }
                
//                 console.log(`Processing image ${i}: ${image.path}`);
                
//                 // Remove file:// prefix if present
//                 const actualPath = image.path.replace('file://', '');
//                 if (!actualPath) {
//                     console.log(`Image ${i} has invalid path, skipping`);
//                     continue;
//                 }
                
//                 // Read the file as base64
//                 const base64String = await RNFS.readFile(actualPath, 'base64');
                
//                 if (base64String && base64String.length > 0) {
//                     console.log(`Image ${i} converted successfully. Length: ${base64String.length}`);
//                     // Determine MIME type from image object or default to JPEG
//                     const mimeType = image.mime || 'image/jpeg';
//                     base64Images.push(`data:${mimeType};base64,${base64String}`);
//                 } else {
//                     console.log(`Image ${i} conversion resulted in empty data`);
//                 }
//             } catch (imgError) {
//                 console.log(`Error converting image ${i}:`, imgError);
//                 // Continue with next image instead of failing completely
//             }
//         }
        
//         console.log(`Successfully converted ${base64Images.length} of ${images.length} images`);
//         return base64Images;
//     } catch (error) {
//         console.error('Error in convertImagesToBase64:', error);
//         return [];
//     }
// };
// export const postJobValue = async (previewValue: any, categories?: any) => {
//     try {
//         console.log('Processing job data with categories:', categories?.length);
        
//         // Validate category
//         const categoryName = Array.isArray(previewValue.category) 
//             ? previewValue.category[0] 
//             : previewValue.category;
            
//         console.log('Looking for category:', categoryName);
        
//         // Find the category key from the selected category name
//         const selectedCategory = categories?.find((category: any) => 
//             category.name === categoryName ||
//             (Array.isArray(previewValue.category) && previewValue.category.includes(category.name))
//         );
        
//         if (!selectedCategory) {
//             console.error('Category not found in available categories');
//             console.log('Available categories:', categories?.map((c: any) => c.name));
//             throw new Error("Category not found");
//         }
        
//         console.log('Found category:', selectedCategory);

//         // Validate images
//         if (!previewValue?.images) {
//             console.error('No images provided');
//             throw new Error("No images provided");
//         }
        
//         // Ensure images is an array
//         const imageArray = Array.isArray(previewValue.images) ? previewValue.images : [];
        
//         if (imageArray.length === 0) {
//             console.error('No images in the array');
//             throw new Error("No images provided");
//         }

//         console.log('Processing images:', imageArray.length);
        
//         // Check if images have the required properties
//         const validImages = imageArray.filter((img: any) => img && img.path);
//         if (validImages.length === 0) {
//             console.error('No valid images found');
//             throw new Error("Invalid image data");
//         }

//         // Convert images to base64
//         const base64Images = await convertImagesToBase64(validImages);
//         if (base64Images.length === 0) {
//             console.error('Failed to convert any images');
//             throw new Error("Failed to process images");
//         }
        
//         // Format area size as a proper number or throw validation error
//         const areaSize = previewValue?.areaSize ? Number(previewValue.areaSize) : null;
//         if (areaSize === null || isNaN(areaSize)) {
//             throw new Error("Invalid area size");
//         }
        
//         // Format budget as a proper number (default to 1 if not specified)
//         const budget = previewValue?.budget ? Number(previewValue.budget) : 1;
//         if (isNaN(budget)) {
//             throw new Error("Invalid budget");
//         }
        
//         // Validate dates
//         if (!previewValue.startDate || !previewValue.endDate) {
//             throw new Error("Start and end dates are required");
//         }
        
//         // Check location data
//         if (!previewValue.location || !previewValue.location.address || 
//             !previewValue.location.latitude || !previewValue.location.longitude) {
//             console.error('Invalid location data:', previewValue.location);
//             throw new Error("Invalid location data");
//         }
        
//         // Create the payload with properly formatted data
//         let payload = {
//             title: previewValue?.title,
//             description: previewValue?.description,
//             paymentMethod: previewValue?.paymentMethod,
//             category: selectedCategory?.key || '',
//             areaSize: areaSize,
//             areaType: Array.isArray(previewValue?.areaType) ? previewValue?.areaType.join("") : previewValue?.areaType,
//             startDate: previewValue?.startDate,
//             endDate: previewValue?.endDate,
//             materials: previewValue?.materials,
//             location: previewValue?.location,
//             budget: budget,
//             images: base64Images
//         }
        
//         // Final validation check
//         const missingFields = [];
//         if (!payload.title) missingFields.push('title');
//         if (!payload.description) missingFields.push('description');
//         if (!payload.paymentMethod) missingFields.push('paymentMethod');
//         if (!payload.category) missingFields.push('category');
//         if (!payload.areaSize) missingFields.push('areaSize');
//         if (!payload.startDate) missingFields.push('startDate');
//         if (!payload.endDate) missingFields.push('endDate');
//         if (!payload.materials) missingFields.push('materials');
//         if (!payload.location) missingFields.push('location');
//         if (!payload.images || payload.images.length === 0) missingFields.push('images');
        
//         if (missingFields.length > 0) {
//             throw new Error(`Missing required fields in payload: ${missingFields.join(', ')}`);
//         }
        
//         return payload;
//     } catch (error) {
//         console.error('Error preparing job payload:', error);
//         throw error;
//     }
// }