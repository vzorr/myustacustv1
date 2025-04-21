import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import ApplicationListCard from '../../../components/ApplicationListCard/ApplicationListCard';
import { COLORS, fontSize } from '../../../config/themes/theme';
import JobDetailHeader from '../../../components/AppHeader/JobDetailHeader';
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles';

const ApplicationsList: React.FC<UserNavigationRootProps<"ApplicationsList">> = (props) => {
    const applications = [
        {
            id: 1,
            name: "Arjan Bytyqi",
            startDate: "Jan 20, 2025",
            endDate: "Jan 30, 2025",
            amount: 60000,
            rating: 4.2,
            status: "approved" as const,
            // imageSource: require('../../../assets/images/profiles/arjan.png') // Add image source
        },
        {
            id: 2,
            name: "Besnik Allajbej",
            startDate: "Jan 16, 2025",
            endDate: "Jan 28, 2025",
            amount: 50000,
            rating: 4.2,
            status: "approved" as const,
            // imageSource: { uri: 'https://example.com/besnik.jpg' } // Remote image example
        },
    ];

    const handlePress = (applicationId: number) => {
        console.log(`Pressed application ${applicationId}`);
        // props.navigation.navigate('ApplicationDetails', { applicationId });
    };

    return (
        <View style={styles.container}>
            <JobDetailHeader
                headingTitle='My Jobs'
                jobTitle='Tile installations'
                jobProviderName='Igli Faslija'
                time='2 minutes ago'
            />
            <View style={styles.listContent}>
                <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16] }]}>JOB APPLICATIONS (12)</Text>
                <FlatList
                    data={applications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ApplicationListCard
                            name={item.name}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            amount={item.amount}
                            rating={item.rating}
                            status={item.status}
                            // imageSource={item.imageSource}
                            onPress={() => handlePress(item.id)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listContent: {
        flex: 1,
        padding: 20,
        gap: 16,
    },
});

export default ApplicationsList;