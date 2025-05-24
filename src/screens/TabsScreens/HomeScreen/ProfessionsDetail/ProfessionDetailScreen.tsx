import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserNavigationRootProps } from '../../../../types/stacksParams'
import ProfessionDetailScreenUi from './ProfessionDetailScreenUi'
import { COLORS } from '../../../../config/themes/theme'
import AppHeader from '../../../../components/AppHeader/AppHeader'

const ProfessionDetailScreen: React.FC<UserNavigationRootProps<"ProfessionDetailScreen">> = (props) => {
    const { navigation } = props
    const [showModal, setShowModal] = React.useState(false)
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
    const [jobs, setJobs] = useState([]);
    const handleDropdownToggle = () => {
        fetchJobsFromMockAPI();
        setShowDropdown(!showDropdown);
    };
    const handleInvite = () => {
        setShowModal(true)
    }
    const fetchJobsFromMockAPI = async () => {
        try {
            // Simulate network delay
            // await new Promise(resolve => setTimeout(resolve, 100));
            const jobs = require('../../../../utils/mockJobs.json');
            setJobs(jobs);
            // return jobs;
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            return []; // Fallback
        }
    };
    //   useEffect(() => {
    //     const getJobs = async () => {
    //       try {
    //         const result = await fetchJobsFromMockAPI();
    //         setJobs(result);
    //       } catch (error) {
    //         console.error('Error loading jobs:', error);
    //       }
    //     };
    //     getJobs();
    //   }, []);

    return (
        <View style={styles.professionDetailContainer}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={() => { }}
                showNotificationBadge={true}
                badgeCount={0}
                isProfile={false}
            />
            <ProfessionDetailScreenUi
                handleInvite={handleInvite}
                showModal={showModal}
                setShowModal={setShowModal}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                handleDropdownToggle={handleDropdownToggle}
                navigation={navigation}
                jobs={jobs}
            />
        </View>
    )
}

export default ProfessionDetailScreen

const styles = StyleSheet.create({
    professionDetailContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})