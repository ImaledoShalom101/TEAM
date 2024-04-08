import { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  useWindowDimensions,
  FlatList,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import {
  Text,
  Icon,
  IconButton,
  Button,
  Divider,
  HelperText,
  TextInput,
  Menu,
  useTheme,
  Avatar,
  Checkbox
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const achievables = {
  "Survey sage": {
    highestNumberAchievable: 0,
    inText: "Survey completer",
    helperEndText: "take a survey",
    icon: require("../../assets/achievements/survey-sage.png"),
    iconFade: require("../../assets/achievements/survey-sage-fade.png")
  },
  "Activity aficionado": {
    highestNumberAchievable: 0,
    inText: "Activity streak",
    helperEndText: "participate in an activity successfully",
    icon: require("../../assets/achievements/activity-aficionado.png"),
    iconFade: require("../../assets/achievements/activity-aficionado-fade.png")
  },
  "Project pro": {
    highestNumberAchievable: 0,
    inText: "Project contributor",
    helperEndText: "successfully participate in a project",
    icon: require("../../assets/achievements/project-pro.png"),
    iconFade: require("../../assets/achievements/project-pro-fade.png")
  },
  "Knowledge keeper": {
    highestNumberAchievable: 0,
    inText: "Informed reader",
    helperEndText: "read and acknowledge a Memo",
    icon: require("../../assets/achievements/knowledge-keeper.png"),
    iconFade: require("../../assets/achievements/knowledge-keeper-fade.png")
  },
  "Attendance ace": {
    highestNumberAchievable: 0,
    inText: "Reliable presence",
    helperEndText: "have an attendance marked",
    icon: require("../../assets/achievements/attendance-ace.png"),
    iconFade: require("../../assets/achievements/attendance-ace-fade.png")
  },
  "Impact magnate": {
    highestNumberAchievable: 0,
    inText: "Total impact",
    helperEndText: "impact(s) they get",
    icon: require("../../assets/achievements/impact-awarded.png"),
    iconFade: require("../../assets/achievements/impact-awarded-fade.png")
  },
  "Poll proclaimer": {
    highestNumberAchievable: 0,
    inText: "Regular pollee",
    helperEndText: "participate in a poll",
    icon: require("../../assets/achievements/poll-proclaimer.png"),
    iconFade: require("../../assets/achievements/poll-proclaimer-fade.png")
  },
  "Badge boss": {
    highestNumberAchievable: 0,
    inText: "Badge collector",
    helperEndText: "badge(s) they get",
    icon: require("../../assets/achievements/badge-boss.png"),
    iconFade: require("../../assets/achievements/badge-boss-fade.png")
  },
  "Sign-in pioneer": {
    highestNumberAchievable: 1,
    inText: "Signup pioneer",
    helperEndText: "Only the first member who registers with the organization code receives this badge, once",
    icon: require("../../assets/achievements/signin-pioneer.png"),
    iconFade: null
  },
  "All-star": {
    highestNumberAchievable: 1,
    inText: "All-star",
    helperEndText: "All members receive this badge once",
    icon: require("../../assets/achievements/all-star.png"),
    iconFade: null
  }
}

const data = {
  listOfAllMembers: [
    "5shalom7",
    "david01",
    "20sharon",
    "5skhhalom7",
    "davidjfd01",
  ],
}

const AchievementSystem = ({ navigation, route }) => {
  const theme = useTheme();

  /*const { params: { activityIndex } } = route;
  const { participants, impacts } = activitiesListData[activityIndex];
  const [attendeesUsernames, setAttendeesUsernames] = useState("");
  const [splitAttendeesUsernames, setSplitAttendeesUsernames] = useState(["Imaledo Shalom", "Omosekafe David", "Otherone David", "Imaledo Sharon"]);
  const [attendeesUsernamesError, setAttendeesUsernamesError] = useState(false);
  const [showUnrecognizedParticipantsList, setShowUnrecognizedParticipantsList] = useState(false);
  const [unrecognizedParticipantsList, setUnrecognizedParticipantsList] = useState(
    participants.filter((singleParticipant) => !data.listOfAllMembers.includes(singleParticipant))
  );
  const allow = useRef(true);
  const buttonInUse = useRef(false);


  function uploadActivity() {
    if (buttonInUse.current) return null;
    buttonInUse.current = true;
    allow.current = true;

    if (!attendeesUsernames.trim()) {
      setAttendeesUsernamesError(true);
      allow.current = false;
    }

    if (!allow.current) return null;

    activitiesListData[activityIndex].participants = splitAttendeesUsernames;

    navigation.goBack();
  }

  async function textCopier() {
    await Clipboard.setStringAsync(
      participants.map((attendee, index) =>
        // SHOULD SHOW THEIR FULL NAMES USING THE usernames !!!
        `${index + 1}.  ${attendee}\n`
      ).join(""));
    if (Platform.OS === "android") {
      ToastAndroid.show("Attendance list is copied.", ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("Attendance list is copied.",)
    }
  }

  async function unrecognizedTextCopier() {
    await Clipboard.setStringAsync(unrecognizedParticipantsList.join(`\n`));
    if (Platform.OS === "android") {
      ToastAndroid.show("Unrecognized attendee list is copied.", ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("Unrecognized attendee list is copied.",)
    }
  }

  function onSplitAttendeesUsernames() {

  }*/

  const AchievementAssignerComp = ({ badgeName, badgeIcon, helperEndText, fixed = false }) => {
    const [backgroundColor, setBackgroundColor] = useState("grey");
    const [useBadge, setUseBadge] = useState(fixed);
    const [writeThreshold, setWriteThreshold] = useState(false);
    const [threshold, setThreshold] = useState(achievables[badgeName].highestNumberAchievable.toString());
    const [beingWrittenThreshold, setBeingWrittenThreshold] = useState(threshold);

    function setFinalThreshold() {
      if (beingWrittenThreshold.trim()) {
        let toastText;
        setThreshold(beingWrittenThreshold);
        achievables[badgeName].highestNumberAchievable = parseInt(beingWrittenThreshold);
        if (Platform.OS === "android") {
          ToastAndroid.show("Saved", ToastAndroid.SHORT)
        } else if (Platform.OS === "ios") {
          AlertIOS.alert("Saved",)
        }
      } else {
        setThreshold("0");
        setBeingWrittenThreshold("0");
      }

    }
    return (
      <View style={{ rowGap: 5 }}>
        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", columnGap: 10 }}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 90, width: "100%", position: "absolute", justifyContent: "center" }}>
              <Pressable onPress={() => { if (fixed) return null; useBadge ? null : setUseBadge(true); beingWrittenThreshold !== threshold ? setFinalThreshold() : null; setWriteThreshold((prev) => !prev) }} style={{ paddingVertical: writeThreshold ? 5 : 0, opacity: useBadge ? 1 : .22, borderTopRightRadius: 100, marginLeft: 45, borderBottomRightRadius: 100, paddingRight: 40, height: 55, columnGap: 20, flexDirection: "row", paddingLeft: 15, justifyContent: "flex-end", alignItems: "center", backgroundColor: theme.colors.primary }}>
                {writeThreshold ?
                  <TextInput
                    value={beingWrittenThreshold}
                    onChangeText={setBeingWrittenThreshold}
                    mode="outlined"
                    autoFocus
                    textColor={theme.colors.primary}
                    style={{ height: 53 }}
                    onSubmitEditing={() => { setFinalThreshold(); writeThreshold ? setWriteThreshold(false) : null }}
                    onFocus={() => beingWrittenThreshold === "0" ? setBeingWrittenThreshold("") : null}
                    contentStyle={{ alignItems: "center", textAlign: "center" }}
                    inputMode="numeric"
                  />
                  :
                  <Text variant="displaySmall" style={{ fontWeight: "bold", fontSize: 36, color: "white" }}>
                    {threshold}
                  </Text>
                }
              </Pressable>
            </View>
            <Avatar.Image
              source={badgeIcon}
              size={90}
            />
          </View>
          {
            Platform.OS === "android" ?
              <Checkbox.Android
                status={useBadge ? "checked" : "unchecked"}
                onPress={() => { writeThreshold && useBadge ? setWriteThreshold(false) : null; setUseBadge((prev) => !prev); setThreshold("0") }}
                disabled={fixed}
              />
              :
              Platform.OS === "ios" ?
                <Checkbox.IOS
                  status={useBadge ? "checked" : "unchecked"}
                  onPress={() => { writeThreshold && useBadge ? setWriteThreshold(false) : null; setUseBadge((prev) => !prev); setThreshold("0") }}
                  disabled={fixed}
                />
                :
                null
          }

        </View>
        <HelperText>
          {
            badgeName === "Sign-in pioneer" || badgeName === "All-star" ?
              ``
              :
              `Members receive this badge for every ${threshold} ${badgeName === "Impact magnate" || badgeName === "Badge boss" ?
                "" : `time${parseInt(threshold) > 1 ? "s" : ""} they `}`
          }
          {helperEndText}
          .
        </HelperText>
      </View>
    )

  }

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 8, rowGap: 35 }}>
        {
          Object.entries(achievables).map(([badge, badgeDetail]) =>
            <AchievementAssignerComp
              key={badge}
              badgeName={badge}
              badgeIcon={badgeDetail.icon}
              fixed={badgeDetail.iconFade == null}
              helperEndText={badgeDetail.helperEndText} />
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}


export default AchievementSystem;