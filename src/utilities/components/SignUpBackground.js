import { useState } from "react";
import {
  useWindowDimensions,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Keyboard,
  Pressable
} from "react-native";
import {
  Text,
  useTheme,
  Button,
  ProgressBar,
} from "react-native-paper";
import { BlurView } from 'expo-blur';
import Constants from "expo-constants";


const SignUpBackground = ({ pressInFunction = null, progressBarValue = 0, onFirstScreen = false, forPrevious = null, toWhere = null, textIsFilledIn = "", buttonLoading = false, buttonText = "Proceed", children = null }) => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();


  return (
    <SafeAreaView style={STYLES.forView}>
      <View style={STYLES.innerContainer} />
      <BlurView intensity={100} style={STYLES.forBlurView}>
        <ImageBackground resizeMode="repeat" style={[STYLES.forBackgroundImage, { height: height + Constants.statusBarHeight, }]} source={theme.style == "dark" ? require("../../../assets/signup_background_dark.png") : require("../../../assets/signup_background_light.png")} />
        {
          onFirstScreen == false ?
            <View style={STYLES.forHeader}>
              <Text variant="headlineMedium" style={[STYLES.forHeaderHeadline, { color: theme.colors.primary }]}>Sign Up</Text>
              <ProgressBar animatedValue={progressBarValue} style={[STYLES.forProgressBar, { width: width - 6 }]} />
            </View>
            :
            null
        }
        {children}
        <View style={STYLES.forButtonsView}>
          {
            onFirstScreen == false ?
              <Button onPress={forPrevious} style={{ borderRadius: 10 }} mode="outlined" >Previous</Button>
              :
              <Pressable style={STYLES.forJoinAnOrganizationPressable}>
                <Text numberOfLines={1} style={[STYLES.forJoinAnOrganizationText, { width: (width / 2) - 13, color: theme.colors.primary }]}>
                  Join an organization
                </Text>
              </Pressable>
          }
          <Button loading={buttonLoading} onPressIn={pressInFunction} onPress={toWhere} style={STYLES.goToNextButton} mode={onFirstScreen == false ? "contained" : textIsFilledIn.trim() ? "contained" : "outlined"} >{buttonText}</Button>
        </View>
      </BlurView>
    </SafeAreaView >

  )
}

const STYLES = StyleSheet.create({
  forView: {
    flex: 1,
    alignItems: "center",
  },
  innerContainer: {
    opacity: .25,
    flex: .8,
    width: "95%",
    backgroundColor: "rgb(211,13,255)"
  },
  forBlurView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  forBackgroundImage: {
    opacity: .4,
    position: "absolute",
    width: "100%"
  },
  forHeader: {
    gap: 6,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight + 15
  },
  forHeaderHeadline: {
    paddingLeft: 25,
    alignSelf: "flex-start",
    fontWeight: 600,
  },
  forProgressBar: {
    borderRadius: 50,
    backgroundColor: "rgba(212,15,255,0.174)"
  },
  forButtonsView: {
    flexDirection: "row",
    paddingHorizontal: 13,
    paddingBottom: 13,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forJoinAnOrganizationPressable: {
    flex: 1,
    justifyContent: "center"
  },
  forJoinAnOrganizationText: {
    fontWeight: "bold",
    alignSelf: "flex-start"
  },
  goToNextButton: {
    alignSelf: "flex-end",
    borderRadius: 10
  }
})

export default SignUpBackground;