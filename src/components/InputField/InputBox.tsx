import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';

interface InputBoxProps extends TextInputProps {
    label?: string;
    error?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, error, ...props }) => {
    // console.log("propssss", props)
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.errorInput]}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        marginTop: 4,
        fontSize: 14,
        color: 'red',
    },
});

export default InputBox;
