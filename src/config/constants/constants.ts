
import moment from 'moment';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

export enum JOBS_STATUS_TABS {
    ONGOING = "Ongoing",
    PENDING = "Pending",
    COMPLETED = "Completed",
}
export enum WORK_HISTORY_TABS {
    FINISHED_JOBS = "Finshed Jobs",
    ACTIVE_JOBS = "Active Jobs",
}
export enum NOTIFICATION_TABS {
    ACTIVITY = "Activity",
    CONTRACTS = "Contracts",
    REMINDERS = "Reminders",
}

export const googlePlacesApi = "AIzaSyCESGzn-f_ccP5pQ2xSo5PHaA-Z5B73HSY"
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
        category: selectedCategories,
        areaSize: Number(previewValue?.areaSize) || 0,
        areaType: previewValue?.areaType?.join(""),
        startDate: previewValue?.startDate,
        endDate: previewValue?.endDate,
        materials: previewValue?.materials,
        location: previewValue?.location[0],
        budget: Number(previewValue?.budget) || 1,
        images: base64Images
    }
    return payload
}

export const getCustomTimeAgo = (createdAt: any) => {
    const now = moment();
    const created = moment(createdAt);
    const diffInSeconds = now.diff(created, 'seconds');
    const diffInMinutes = now.diff(created, 'minutes');
    const diffInHours = now.diff(created, 'hours');
    const diffInDays = now.diff(created, 'days');
    const diffInWeeks = now.diff(created, 'weeks');
    const diffInMonths = now.diff(created, 'months');
    const diffInYears = now.diff(created, 'years');
    if (diffInYears >= 1) {
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths >= 1) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInWeeks >= 1) {
        return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays >= 1) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours >= 1) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes >= 1) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds >= 1) {
        return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    } else {
        return 'just now';
    }
};