import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import UstaPortfolioListCard from '../../components/UstaPortfolioListCard/UstaPortfolioListCard';

type PortfolioItem = {
    id: string;
    imageUrl: string;
    workText: string;
    workTypeTxt: string;
};

type Props = {
    data: PortfolioItem[];
    handlePortfolio: (id: any) => () => void; // Assuming handlePortfolio is a function that takes an id and returns a function
};

const UstaPortfolioList = (propa:any) => {
    const { data, handlePortfolio } = propa; 
    const renderItem = ({ item }: { item: any }) => (
        <UstaPortfolioListCard
            imageData={item.media}
            workText={item.title}
            workTypeTxt={item.category}
            handleCardPress={handlePortfolio(item?.id)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default UstaPortfolioList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
