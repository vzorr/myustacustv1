import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../types/stacksParams';

const PostJobScreen: React.FC<UserNavigationRootProps<"PostJobScreen">> = (props) => {

    const renderScreenContent = () => (
        <SafeAreaView>

        </SafeAreaView>
    )
    const screenData = [{ id: '1' }];
    return (
        <View style={styles.container}>
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <Text>PostJobScreen</Text>
        </View>
    )
}

export default PostJobScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})