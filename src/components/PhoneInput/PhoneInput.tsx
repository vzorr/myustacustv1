import React, { useRef, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';

const PhoneInputComponent = PhoneInput as unknown as React.FC<any>;

interface CustomTextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  defaultValue?: string;
  // defaultCode?: 'US' | 'PK' | 'IN' | 'GB' | 'CA' | 'AU' | 'FR' | 'DE';
}

const PhoneNumberInput = (props:any) => {
  const {containerStyle, inputStyle, onChangeText,  onChangeFormattedText, defaultValue = '', handleBlur}= props
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <PhoneInputComponent
        ref={phoneInput}
        defaultValue={defaultValue}
        defaultCode="US"
        layout="first"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        withDarkTheme={false}
        withShadow={false}
        // autoFocus={true}
        containerStyle={[styles.phoneContainer, inputStyle]}
        textContainerStyle={styles.textInput}
        textInputStyle={styles.inputText}
        codeTextStyle={styles.inputText}
        textInputProps={{
          placeholderTextColor: COLORS.Navy,
          keyboardType: 'phone-pad',
          style: {
            fontSize: fontSize[14],
            fontFamily: FONTS.interRegular,
            color: COLORS.Navy,
            fontWeight: '400',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SIZES.hp(6.1),
    gap: 8,
    justifyContent: 'center',
    borderRadius: 8,
  },
  phoneContainer: {
    width: '100%',
    height: SIZES.hp(6.1),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    color: COLORS.Navy,
    borderRadius: 8,
  },
  textInput: {
    paddingVertical: 0,
    height: SIZES.hp(6.1),
    backgroundColor: 'transparent',
  },
  inputText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy,
    fontWeight: '400',
  },
});

export default PhoneNumberInput;
