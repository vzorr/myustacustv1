import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, fontSize } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

interface BudgetSuggestionModalProps {
    visible: boolean;
    onClose: () => void;
    areaSize: number;
    budgetData: {
        labels: string[];
        prices: number[];
        averagePrice: number;
    };
}

export const BudgetSuggestionModal: React.FC<BudgetSuggestionModalProps> = ({
    visible,
    onClose,
    areaSize,
    budgetData
}) => {
    const suggestedBudget = budgetData.averagePrice * areaSize;

    const chartData = {
        labels: budgetData.labels,
        datasets: [
            {
                data: budgetData.prices,
                color: (opacity = 1) => COLORS.Navy100, // Navy100 color
                strokeWidth: 2,
                withFill: false // Remove filled area under the line
            }
        ],
        // legend: ["Price per m² (€)"]
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: COLORS.Navy200,
            fill: "#fff" // White fill for dots
        },
        fillShadowGradient: "transparent",
        fillShadowGradientOpacity: 0
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.headingContainer}>
                        <Text style={[reuseableTextStyles.title, styles.title]}>Budget</Text>
                        <TouchableOpacity onPress={onClose}>
                            <SVGIcons.crossIcon />
                        </TouchableOpacity>
                    </View>
                    <Text style={reuseableTextStyles.subTitle}>
                        Ustas in your area charge an average of <Text style={styles.areaSize}>€{budgetData.averagePrice}</Text> per m².
                    </Text>
                    
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={chartData}
                            width={Dimensions.get('window').width - 60}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                            withInnerLines={false}
                            withOuterLines={false}
                            withShadow={false}
                            withDots={true}
                            withVerticalLines={false}
                            withHorizontalLines={false}
                            withHorizontalLabels={true}
                        />
                        
                        {/* Custom X-axis line with dots */}
                        <View style={styles.xAxisLine}></View>
                        <View style={styles.xAxisDots}>
                            <View style={styles.xDot}></View>
                            <View style={styles.xDot}></View>
                            <View style={styles.xDot}></View>
                            <View style={styles.xDot}></View>
                            <View style={styles.xDot}></View>
                        </View>
                    </View>
                    
                    <Text style={reuseableTextStyles.subTitle}>
                        Based on your <Text style={styles.areaSize}>{areaSize} m²</Text>, we suggest a budget of approximately <Text style={styles.suggestedValue}>€{suggestedBudget}.</Text>
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.budgetModalBgColor,
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 24,
        width: '90%',
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: fontSize[23],
        marginBottom: 5
    },
    areaSize: {
        fontWeight: 'bold'
    },
    suggestedValue: {
        fontWeight: 'bold'
    },
    chartContainer: {
        position: 'relative',
        marginTop: 20,
        alignItems: 'center',
    },
    chart: {
        alignSelf: 'center'
    },
    xAxisLine: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 10,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    xAxisDots: {
        position: 'absolute',
        bottom: 30,
        left: 45,
        right: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    xDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
});