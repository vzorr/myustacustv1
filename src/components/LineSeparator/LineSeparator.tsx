import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../config/themes/theme';

const LineSeparator: React.FC = () => {
    return <View style={styles.line} />;
};

const styles = StyleSheet.create({
    line: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
    },
});

export default LineSeparator;
