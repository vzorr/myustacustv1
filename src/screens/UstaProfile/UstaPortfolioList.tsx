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

const UstaPortfolioList: React.FC<Props> = ({ data, handlePortfolio }) => {
    const renderItem = ({ item }: { item: PortfolioItem }) => (
        <UstaPortfolioListCard
            imageUrl={item.imageUrl}
            workText={item.workText}
            workTypeTxt={item.workTypeTxt}
            handleCardPress={handlePortfolio(item.id)} // Assuming handlePortfolio is a function that takes an id
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                data={data}
                keyExtractor={item => item.id}
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
