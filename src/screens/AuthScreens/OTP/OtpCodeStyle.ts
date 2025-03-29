import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS } from "../../../config/themes/theme";
export const otpCodeStyle = StyleSheet.create({
  otpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  underlineStyleBase: {
    width: wp(12),
    height: hp(6),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.GreyedOut,
    color: COLORS.Gray,
    fontSize: 16,
    fontWeight: "600"
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.Black
  },
  otpInputView: {
    width: '100%',
    height: hp(13),
    paddingHorizontal: 20,
    alignItems: "center"
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10
  },
  box: {
    borderWidth: 1,
    borderColor: COLORS.Navy200,
    width: 48,
    height: 48,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    backgroundColor: COLORS.Navy200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: FONTS.interSemiBold,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.white,
    width: "70%",
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: FONTS.interRegular,
    fontStyle: "normal"
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dontTxt: {
    fontSize: 12,
    fontFamily: FONTS.interRegular,
    color: COLORS.white,
    fontWeight: '400',
  },
  resend: {
    fontSize: 12,
    fontFamily: FONTS.interRegular,
    color: COLORS.Yellow,
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.Yellow,
    marginStart: 5
  },
})