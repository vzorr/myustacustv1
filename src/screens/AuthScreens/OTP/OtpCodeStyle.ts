import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../config/themes/theme";
export const otpCodeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 10
  },
  otpContainer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 20
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  box: {
    borderWidth: 2,
    borderColor: COLORS.otpBoxColor,
    color: COLORS.white,
    width: 48,
    height: 48,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: COLORS.otpBoxColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.interSemiBold,
  },
  subTitleContainer: {
    width: "80%",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.interRegular,
    fontStyle: "normal",
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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