import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../../config/themes/theme';

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
                color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange
                strokeWidth: 2
            }
        ],
        legend: ["Price per m² (€)"]
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
            r: "4",
            strokeWidth: "2",
            stroke: "#ffa500"
        }
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
                    <Text style={styles.title}>Budget Suggestion</Text>
                    <Text style={styles.subtitle}>
                        Ustas in your area charge an average of €{budgetData.averagePrice} per m².
                    </Text>

                    <LineChart
                        data={chartData}
                        width={Dimensions.get('window').width - 60}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />

                    <Text style={styles.suggestionText}>
                        Based on your {areaSize} m², we suggest a budget of approximately €{suggestedBudget}.
                    </Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.Black,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.Black,
    },
    chart: {
        marginVertical: 10,
        borderRadius: 16,
    },
    suggestionText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.Black,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: COLORS.Yellow,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        fontWeight: 'bold',
        color: COLORS.Black,
    },
});