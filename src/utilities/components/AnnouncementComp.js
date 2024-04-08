/* NOT USED

import { useState } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import {
  Text,
  Button,
  useTheme,
  Surface
} from "react-native-paper";

const announcementData = {
  file: "excel"
}

const AnnouncementComp = ({ fileAttached = "", title, body, dateAndTime }) => {
  const theme = useTheme();
  const { colors: { primary } } = useTheme();
  const [ellipsized, setEllipsized] = useState(true)
  const acceptableFileTypes = {
    image: {
      name: "image",
      icon: "file-image",
    },
    video: {
      name: "video",
      icon: "file-video",
    },
    pdf: {
      name: "pdf",
      icon: "file-pdf-box",
    },
    word: {
      name: "word",
      icon: "file-word",
    },
    excel: {
      name: "excel",
      icon: "file-excel",
    },

  }

  return (
    <Surface elevation={1} theme={{ colors:  'green' }} style={STYLES.forAnnouncementView}>
      <Text variant="titleMedium">
        {title}
      </Text>

      <Text numberOfLines={ellipsized ? 3 : null} style={{ color: "#808080" }} variant="titleSmall" >
        {body}
      </Text>
      {
        !ellipsized && fileAttached ?
          <View style={{ paddingTop: 8, alignItems: "flex-start" }}>
            <Button icon={acceptableFileTypes[fileAttached].icon} mode="outlined" style={{ borderColor: primary, borderRadius: 10 }}>
              View {acceptableFileTypes[fileAttached].name}
            </Button>
          </View>
          : null
      }
      <View style={STYLES.forButtonAndTimeDateView}>
        <Button rippleColor="rgba(0,0,0,0)" onPress={() => setEllipsized(!ellipsized)}>{ellipsized ? "View" : "Close"}</Button>
        <Text style={STYLES.forDateTime}>
          {dateAndTime}
        </Text>
      </View>
    </Surface>
  )
}
//style={{ rowGap: 11, flex: 1, padding: 12, paddingTop: 7, marginLeft: 10, backgroundColor: "#ffffff", borderRadius: 13, borderTopLeftRadius: 0 }}>

const STYLES = StyleSheet.create({
  forAnnouncementView: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 10,
    padding: 10,
    rowGap: 5,
  },
  forButtonAndTimeDateView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  forDateTime: {
    textAlign: "right",
    fontSize: 10,
    opacity: .5

  }
})

export default AnnouncementComp;
*/