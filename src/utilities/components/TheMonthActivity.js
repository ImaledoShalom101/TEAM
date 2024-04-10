import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable
} from "react-native";
import {
  Text,
  Icon,
  useTheme
} from "react-native-paper";
//import { sub, lightFormat, toDate, format, isAfter, differenceInMilliseconds } from "date-fns";
import { DateTime, Interval, Duration } from "luxon";

const DATA = [
  // newTask IS TRUE UNTIL TIME HAS ELAPSED OR TASK HAS BEEN DONE.
  // WHENEVER newTask BECOMES false, TIME COUNT STOPS!
  // undone IS ONLY TRUE IF TIME HAS ELAPSED AND
  // ACTIVITY WAS UNDONE.
  {
    taskDescription: `Good day. This work requires you to stay at the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-03-30T05:00:00.986Z",
    dateAndTimeDeadline: "2024-04-10T05:00:00.986Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: true,
    undone: false,
    taskIndex: 5
  },
]

const TheMonthActivity = ({ onPress, taskDescription, dateAndTimeDeadline, participated = "no" }) => {
  const theme = useTheme();
  const darkThemed = false; // DARK THEME
  const [participatedToChangeBecauseCountdownIsReached, setParticipatedToChangeBecauseCountdownIsReached] = useState(participated);
  const datefiedDate = dateAndTimeDeadline ? `  •  ${DateTime.fromISO(dateAndTimeDeadline).toFormat("dd/LL/yyyy")}` : ""
  const k = useRef(dateAndTimeDeadline ? DateTime.fromISO(dateAndTimeDeadline) : null) //new Date("2024-03-29T14:20:00.986Z"))

  const [countdownCount, setCountdownCount] = useState("")//format(k.current, "dd:hh:mm:ss"))


  useEffect(() => {
    if (!dateAndTimeDeadline || participated != "ongoing") return

    const updatedTime = () => {
      const ff = DateTime.now()
      const differenceInMilliseconds = k.current.diff(ff, 'milliseconds') - 1000 - (ff.offset * 60 * 1000) // OFFSET PROBLEM CAUSED BY TIMEZONE STUFF SHA;
      if (differenceInMilliseconds < 0) {
        setParticipatedToChangeBecauseCountdownIsReached("no") // TO BE LATER USED
        clearInterval(updateClock)
        setCountdownCount("")
        return
      }
      formattedDuration = Duration.fromMillis(differenceInMilliseconds).toFormat("dd:hh:mm:ss");

      setCountdownCount(formattedDuration)
    }
    const updateClock = setInterval(updatedTime, 1000)

    return () => clearInterval(updateClock)
  }, [countdownCount])


  return (
    <Pressable onPress={onPress} style={[STYLES.forView, { borderColor: participatedToChangeBecauseCountdownIsReached === "ongoing" ? theme.colors.primary : !darkThemed ? "rgb(188,188,188)" : "rgb(67,67,67)" }]}>
      <Text style={{ flex: .95 }} numberOfLines={1} variant="titleMedium">
        {taskDescription}
      </Text>
      <Icon
        source={participatedToChangeBecauseCountdownIsReached === "yes" ? "check-circle" : participatedToChangeBecauseCountdownIsReached === "ongoing" ? "clock-outline" : "minus-circle-outline"}
        color={participatedToChangeBecauseCountdownIsReached === "yes" ? "rgba(0,168,0,0.384)" : participatedToChangeBecauseCountdownIsReached === "ongoing" ? "rgba(0,95,168,0.384)" : "rgba(128,128,128, 0.4)"}
        size={27}
      />
      <Text variant="bodySmall" style={STYLES.forDateTimeText}>
        <Text style={{ color: "#007500" }}>
          {countdownCount}</Text>
        {participatedToChangeBecauseCountdownIsReached != "ongoing" ? `${DateTime.fromISO(dateAndTimeDeadline).toFormat("hh:mm a")}` : ""} {datefiedDate}
      </Text>
    </Pressable>
  )
}

const STYLES = StyleSheet.create({
  forView: {
    marginVertical: 12,
    paddingHorizontal: 10,
    height: 60,
    width: "90%",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forDateTimeText: {
    fontSize: 9,
    opacity: .5,
    position: "absolute",
    bottom: 0,
    right: 37
  }
})

export default TheMonthActivity;