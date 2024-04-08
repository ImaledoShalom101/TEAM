import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet
} from "react-native";
import {
  Text,
} from "react-native-paper";
import { DateTime } from "luxon";

const RecentInformationComp = ({ title, body, dateAndTime = "", onPress, imageIncluded, unread = false }) => {
  const unreadViewLook = { borderWidth: 1, borderRadius: 15, borderColor: "#00ad00" };
  const UnreadTimeAndDateLook = { color: "#007500" };
  //const datefiedDateAndTime = dateAndTime ? `${new Date(dateAndTime).toLocaleDateString()}  •  ${new Date(dateAndTime).toLocaleDateString()}` : ""
  const datefiedDateAndTime = dateAndTime ? `${DateTime.fromISO(dateAndTime).toFormat("dd/LL/yyyy")}  •  ${DateTime.fromISO(dateAndTime).toFormat("hh:mm a")}` : ""
  //const [timeAndDateEnded, setTimeAndDateEnded] = useState(dateAndTime);

  return (
    <TouchableOpacity onPress={onPress} style={[STYLES.forTouchable, unread ? unreadViewLook : null]}>
      <Text variant="titleMedium" numberOfLines={1}>
        • {title}
      </Text>
      {//THE TEXT INPUT OF THIS TOPIC TEXT
        //MUST BE SET TO MAKE EACH WORD CAPITALIZED
      }
      <View style={STYLES.forView}>
        <Text variant="labelMedium" numberOfLines={3} style={STYLES.forContentText}>
          {body}
        </Text>
        {
          imageIncluded ?
            <Image source={require("../../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")} resizeMode="cover" style={STYLES.forImage} />
            :
            null
        }

      </View>
      <Text variant="bodySmall" style={[STYLES.forTimeAndDateText, unread ? UnreadTimeAndDateLook : null]}>
        {datefiedDateAndTime}
      </Text>
    </TouchableOpacity>
  )
}

const STYLES = StyleSheet.create({
  forTouchable: {
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "rgba(128,128,128,0.396)",
    justifyContent: "center",
    rowGap: 6,
    height: 110,
    paddingRight: 5
  },
  forContentText: {
    opacity: .6,
    flex: .95
  },
  forView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  forImage: {
    borderRadius: 15,
    width: 50,
    height: 50
  },
  forTimeAndDateText: {
    fontSize: 9,
    opacity: .5,
    position: "absolute",
    bottom: 0,
    right: 58
  }
})

export default RecentInformationComp;