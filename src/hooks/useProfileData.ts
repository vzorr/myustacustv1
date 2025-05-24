// hooks/useProfileData.ts
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { client } from '../apiManager/Client';
import { ApiErrorHandling } from '../apiManager/ApiErrorHandling';

interface ProfileData {
    id?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    bio?: string;
    aboutMe?: string;
    experience?: number;
    hourlyRate?: number;
    rating?: number;
    skills?: string[];
    locations?: Array<{ address: string }>;
    notifications?: { unread: number };
    portfolio?: any;
}

interface UseProfileDataParams {
    userId?: string | null; // Optional user ID to fetch specific user
    userRole?: 'CUSTOMER' | 'USTA' | null; // Optional role to specify
}

interface UseProfileDataReturn {
    isLoading: boolean;
    profileData: ProfileData | null;
    workHistory: any[];
    activeJobs: any[];
    reviews: any[];
    userRole: string;
    isOwnProfile: boolean;
    refetch: () => Promise<void>;
}

export const useProfileData = (params?: UseProfileDataParams): UseProfileDataReturn => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [workHistory, setWorkHistory] = useState<any[]>([]);
    const [activeJobs, setActiveJobs] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);

    // Get logged-in user data and auth token from Redux store
    const { userData }: any = useSelector((state: any) => state?.userInfo);
    const { token }: any = useSelector((state: any) => state?.accessToken);
    
    // Determine if viewing own profile or another user's profile
    const isOwnProfile = !params?.userId || params.userId === userData?.id;
    
    // Determine user role - use passed role for other users, or get from Redux for own profile
    const userRole = params?.userRole || userData?.role || 'CUSTOMER';

    // Fetch user profile data from API
    const fetchProfileData = useCallback(async () => {
        try {
            setIsLoading(true);
            const userToken = token ? token : userData?.token;

            if (!userToken) {
                console.log("No authentication token available");
                setIsLoading(false);
                return;
            }

            let profileResult = null;

            if (isOwnProfile) {
                // Fetching own profile using role-specific endpoint
                const profileEndpoint = userRole === 'USTA' 
                    ? 'users/ustaProfile' 
                    : 'users/customerProfile';

                const profileResponse = await client(userToken).get(profileEndpoint);

                if (profileResponse?.data?.code !== 200) {
                    console.log("Failed to fetch profile data");
                    setIsLoading(false);
                    return;
                }

                profileResult = profileResponse?.data?.result;
            } else {
                // Fetching another user's profile
                const profileEndpoint = userRole === 'USTA' 
                    ? `account/usta-profile/${params?.userId}`
                    : `account/customer-profile/${params?.userId}`;

                const profileResponse = await client(userToken).get(profileEndpoint);

                if (profileResponse?.data?.code !== 200) {
                    console.log("Failed to fetch profile data");
                    setIsLoading(false);
                    return;
                }

                profileResult = profileResponse?.data?.result;
            }

            setProfileData(profileResult);

            // For USTA profiles, fetch portfolio details if available
            if (userRole === 'USTA' && profileResult?.id) {
                try {
                    const portfolioResponse = await client(userToken).get(`account/portfolio/${profileResult.id}`);
                    if (portfolioResponse?.data?.code === 200) {
                        // Merge portfolio data with profile data
                        setProfileData({
                            ...profileResult,
                            portfolio: portfolioResponse?.data?.result
                        });
                    }
                } catch (error) {
                    console.log("Error fetching portfolio:", error);
                }
            }

            // Only fetch jobs and reviews for own profile or if specifically needed
            if (isOwnProfile) {
                // Get work history data (finished jobs)
                const historyResponse = await client(userToken).get('jobs/user/completed');
                if (historyResponse?.data?.code === 200 && historyResponse?.data?.result) {
                    setWorkHistory(historyResponse?.data?.result?.data || []);
                }

                // Get active jobs
                const activeJobsResponse = await client(userToken).get('jobs/user/active');
                if (activeJobsResponse?.data?.code === 200 && activeJobsResponse?.data?.result) {
                    setActiveJobs(activeJobsResponse?.data?.result?.data || []);
                }
            }

            // For USTA profiles, try to fetch reviews
            if (userRole === 'USTA') {
                try {
                    const reviewsEndpoint = isOwnProfile 
                        ? 'reviews/user' 
                        : `reviews/usta/${params?.userId || profileResult?.id}`;
                    
                    const reviewsResponse = await client(userToken).get(reviewsEndpoint);
                    if (reviewsResponse?.data?.code === 200 && reviewsResponse?.data?.result) {
                        setReviews(reviewsResponse?.data?.result?.data || []);
                    }
                } catch (error) {
                    console.log("Reviews endpoint not available:", error);
                }
            }

        } catch (error) {
            console.log("Error fetching profile data:", error);
            ApiErrorHandling(error);
        } finally {
            setIsLoading(false);
        }
    }, [token, userData?.token, userRole, params?.userId, isOwnProfile]);

    // Load data when component mounts or params change
    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    return {
        isLoading,
        profileData,
        workHistory,
        activeJobs,
        reviews,
        userRole,
        isOwnProfile,
        refetch: fetchProfileData
    };
};