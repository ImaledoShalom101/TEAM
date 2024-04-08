import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Linking,
  ToastAndroid,
  AlertIOS,
  Platform
} from "react-native";
import {
  Text,
  Icon,
  Card,
  Divider,
  ProgressBar
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";
// CHECK COMPONENT RESIZING ON A COMPUTER
// IT MIGHT BE PROBLEMATIC: HAZARDOUS!!!

const ProjectComp = ({ index, image, participated = false, cardTitle, content, startedDate, endedDate, url }) => {
  const [themeStyle, setThemeStyle] = useState("light")
  const [progressBarProgress, setProgressBarProgress] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)

  async function copyURL() {
    await Clipboard.setStringAsync(url);
    if (Platform.OS === "android") {
      ToastAndroid.show("The url has been copied to your clipboard.", ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("The url has been copied to your clipboard.")
    }
  }

  async function openLinkAndProgress() {
    setShowProgressBar(true)
    setTimeout(() => setProgressBarProgress(.75), .35)
    await Linking.openURL(url)
      .finally(() => {
        setShowProgressBar(false)
        setProgressBarProgress(0)
      })
  }

  return (
    <View style={{ margin: 10, columnGap: 6, flexDirection: "row" }}>
      <Text style={{ opacity: .65 }}>
        {index + 1}.
      </Text>
      <View style={STYLES.forView}>
        <Card elevation={1} onLongPress={() => copyURL()} onPress={() => openLinkAndProgress()} style={STYLES.forCard}>
          <ImageBackground mode="cover" style={{ height: 160 }} imageStyle={STYLES.forBGImage} source={image}>
            {participated ?
              <View style={STYLES.forParticipatedIconView}>
                <Icon source="check-circle-outline" color="rgba(0,128,0,0.5)" size={160} />
              </View>
              : null
            }
            <View style={{ height: 160, backgroundColor: themeStyle === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" }}>
              <Card.Title title={cardTitle} titleVariant="titleLarge" titleStyle={{ fontWeight: 400 }} />
              <Card.Content>
                <Text>{content}</Text>
              </Card.Content>
            </View>
          </ImageBackground>

          <View style={STYLES.forStartEndDateAndTimeCountdownView}>
            <View style={STYLES.forStartEndDateView}>
              <Text style={{ opacity: .9 }} variant="labelSmall">Started: {startedDate}</Text>
              <Text style={{ opacity: .9 }} variant="labelSmall">Ends: {endedDate}</Text>
            </View>
            <View style={STYLES.forTimeCountdownView}>
              <Text variant="labelSmall" style={{ color: "#808080" }}>22:16:31:09 left</Text>
            </View>
          </View>
          <ProgressBar
            visible={showProgressBar}
            animatedValue={progressBarProgress}
          />
        </Card>
      </View>

    </View>
  )
}

const STYLES = StyleSheet.create({
  forView: {
    alignItems: "center",
    flex: 1,
  },
  forCard: {
    height: 210,
    width: "95%",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  forBGImage: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13
  },
  forParticipatedIconView: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  forStartEndDateAndTimeCountdownView: {
    height: 30,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forStartEndDateView: {
    height: 40,
    justifyContent: "space-around"
  },
  forTimeCountdownView: {
    height: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
})

export default ProjectComp;