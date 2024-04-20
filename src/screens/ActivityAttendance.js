import { useState, useRef, useDeferredValue, useEffect } from "react";
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
  Platform
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
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import SelectionComp, { NumberComponent } from "../utilities/components/NumberComponent";


const activitiesListData = [
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
          `,
    ongoing: false,
    participated: true,
    theNewMonth: "",
    impacts: 0,
    participants: [],
    timeAndDateUploaded: ""
  },
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
          `,
    ongoing: true,
    participated: false,
    theNewMonth: "June",
    impacts: 0,
    participants: [],
    timeAndDateUploaded: ""
  },
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
          `,
    ongoing: true,
    participated: false,
    theNewMonth: "June",
    impacts: 10,
    participants: [],
    timeAndDateUploaded: ""
  },
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which`,
    ongoing: true,
    participated: true,
    theNewMonth: "November",
    impacts: 18,
    participants: ["s", "h", "david01", "david001", "20sharon", "5skhhalom7", "davidjfd01", "davigfcd001", "20kkp6sharon"],
    timeAndDateUploaded: ""
  }
]

const members = [
  {
    fullName: "Imaledo Sharon Tolulope",
    username: "goingOverGG",
    numberOfBadges: "3",
    impacts: "1",
    emailAddress: "sharontolulope@gmail.com",
    phoneNumber: "08141663809",
    lastOnline: "previous week",
    profilePicture: require("../../assets/20231112_123338331.jpg"),
    badges: [
      [1, require("../../assets/achievements/badge-boss.png")],
      [1, require("../../assets/achievements/poll-proclaimer.png")],
      [1, require("../../assets/achievements/attendance-ace.png")],
    ]
  },
  {
    fullName: "Imaledo David Shalom",
    username: "shalom#01",
    numberOfBadges: "8",
    impacts: "25",
    emailAddress: "shalomimaledo@gmail.com",
    phoneNumber: "09137287950",
    lastOnline: null,
    profilePicture: require("../../assets/20231112_123338331.jpg"),
    badges: [
      [4, require("../../assets/achievements/badge-boss.png")],
      [3, require("../../assets/achievements/poll-proclaimer.png")],
      [1, require("../../assets/achievements/attendance-ace.png")],
    ]
  },
  {
    fullName: "Ora Peace Flora",
    username: "omoInTheMaking252",
    numberOfBadges: "4",
    impacts: "9",
    emailAddress: "augmentedone@zohomail.com",
    phoneNumber: "08028299888",
    lastOnline: "yesterday",
    profilePicture: require("../../assets/20231112_123338331.jpg"),
    badges: [
      [2, require("../../assets/achievements/all-star.png")],
      [1, require("../../assets/achievements/knowledge-keeper.png")],
      [1, require("../../assets/achievements/task-pro.png")],
    ]
  },
  {
    fullName: "Dunsin Divine Favour",
    username: "divineFavour239",
    numberOfBadges: "15",
    impacts: "37",
    emailAddress: "divinefavourohele@gmail.com",
    phoneNumber: "08176268186",
    lastOnline: "today",
    profilePicture: require("../../assets/20231112_123338331.jpg"),
    badges: [
      [7, require("../../assets/achievements/impact-awarded.png")],
      [5, require("../../assets/achievements/signin-pioneer.png")],
      [3, require("../../assets/achievements/survey-sage.png")],
    ]
  },
]

const extractedFullnameAndUsername = members.map((data) => {
  const { fullName, username } = data;
  return [fullName, username];
})


const data = {
  listOfAllMembers: [
    "5",
    "5shalom7",
    "david01",
    "20sharon",
    "5skhhalom7",
    "davidjfd01",
  ],
}

const ActivityAttendance = ({ navigation, route }) => {
  const { params: { activityIndex } } = route;
  const { participants, impacts } = activitiesListData[activityIndex];
  const theme = useTheme();
  const [attendeesUsernames, setAttendeesUsernames] = useState("");
  const deferredAttendeesUsernames = useDeferredValue(attendeesUsernames);
  const [splitAndScreenedAttendeesUsernamesList, setSplitAndScreenedAttendeesUsernamesList] = useState([])
  //["Imaledo alom", "Omosekafe David", "Otherone David", "Imaledo Sharon"]);
  const [attendeesUsernamesError, setAttendeesUsernamesError] = useState(false);
  const [showUnrecognizedParticipantsList, setShowUnrecognizedParticipantsList] = useState(false);
  const [unknownParticipantDetectionDisplay, setUnknownParticipantDetectionDisplay] = useState(false);
  const [unrecognizedParticipantsList, setUnrecognizedParticipantsList] = useState([]);


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

    activitiesListData[activityIndex].participants = splitAndScreenedAttendeesUsernamesList;

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

  useEffect(() => onSplitAttendeesUsernames(),
    [deferredAttendeesUsernames])

  function onSplitAttendeesUsernames() {
    let unknownParticipants = []
    let knownParticipants = []
    let sweetened = deferredAttendeesUsernames.replaceAll(" ", "").replaceAll(",\n", "£¢€¥^").replaceAll("\n,", "£¢€¥^").replaceAll("\n", "£¢€¥^").replaceAll(",", "£¢€¥^").split("£¢€¥^");
    //let unknownParticipantsButCouldBeRepeated = sweetened.filter((singleParticipant) => !(data.listOfAllMembers.includes(singleParticipant)) && singleParticipant);
    //unknownParticipantsButCouldBeRepeated.forEach((eachValue) => !unknownParticipants.includes(eachValue) ? unknownParticipants.push(eachValue) : null)
    //let unknownParticipantsButCouldBeRepeated = sweetened.filter((eachValue) => );
    sweetened.forEach((eachValue) => eachValue ?
      !(data.listOfAllMembers.includes(eachValue)) ?
        !unknownParticipants.includes(eachValue) ?
          unknownParticipants.push(eachValue)
          :
          null
        :
        knownParticipants.push(eachValue)
      :
      null
    )
    setSplitAndScreenedAttendeesUsernamesList(knownParticipants)
    setUnrecognizedParticipantsList(unknownParticipants);
    showUnrecognizedParticipantsList && unknownParticipants.length == 0 ? setShowUnrecognizedParticipantsList(false) : null;

    if (unknownParticipants.length > 0) {
      !unknownParticipantDetectionDisplay ? setUnknownParticipantDetectionDisplay(true) : null;
    } else unknownParticipantDetectionDisplay ? setUnknownParticipantDetectionDisplay(false) : null;
  }


  return (
    <ScrollView
      style={{ height: "100%" }}
      contentContainerStyle={{ paddingHorizontal: 10, rowGap: 20 }}
      overScrollMode="never"
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon="close"
          rippleColor="rgba(0,0,0,0)"
          iconColor={theme.colors.primary}
          onPress={() => navigation.goBack()}
        />
        <Text variant="titleLarge" style={{ paddingRight: 48, flex: 1, textAlign: "center" }}>
          Attendance
        </Text>
      </View>
      <View style={{ rowGap: 35, paddingBottom: 60 }}>
        {
          participants.length > 1 ?
            <Pressable delayLongPress={200} onLongPress={() => textCopier()}>
              <Text variant="titleMedium" style={{ letterSpacing: .4, paddingHorizontal: 5, color: theme.colors.primary }}>
                {participants.map((attendee, index) =>
                  // SHOULD SHOW THEIR FULL NAMES USING THE usernames !!!
                  `${index + 1}.  ${attendee}\n`
                )}
              </Text>
            </Pressable>
            :
            <View style={{ rowGap: 10, paddingBottom: 60 }}>
              <TextInput
                value={attendeesUsernames}
                placeholder="Submit usernames here..."
                multiline
                autoComplete="off"
                error={attendeesUsernamesError}
                mode="outlined"
                onChangeText={(value) => { setAttendeesUsernames(value); attendeesUsernamesError ? setAttendeesUsernamesError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
                style={{ width: "100%", height: 350 }}
              />
              <HelperText>
                Separate usernames with a comma (,) and/or line break only.
              </HelperText>
            </View>
        }
        <View>
          <Pressable onPress={() => unrecognizedParticipantsList.length > 0 ? setShowUnrecognizedParticipantsList(prev => !prev) : null} disabled={participants.length > 1} style={{ borderWidth: unknownParticipantDetectionDisplay ? 1 : 0, borderColor: "#ff0000", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
              <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                {splitAndScreenedAttendeesUsernamesList.length}
              </Text>
              <Text variant="labelLarge" style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
                {`  participant${splitAndScreenedAttendeesUsernamesList.length > 1 ? "s" : ""} ${participants.length > 1 ? "received" : "to receive"} `}
                <Text variant="labelLarge" style={{ fontWeight: "bold", color: theme.colors.primary }}>{impacts}</Text>
                {` impact${impacts > 1 ? "s" : ""}`}
              </Text>
            </View>
            <Icon
              source={showUnrecognizedParticipantsList ? "chevron-up" : "chevron-down"}
              size={19}
              color={participants.length > 1 ? "#b362ff00" : "#b362ff"}
            />
          </Pressable>
          {
            unrecognizedParticipantsList.length > 0 && showUnrecognizedParticipantsList ?
              <ScrollView
                fadingEdgeLength={100}
                overScrollMode="never"
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled style={{ maxHeight: 200 }}
                contentContainerStyle={{ marginHorizontal: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundColor: theme.colors.onSecondary }}>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                  <Button style={{ opacity: .6, alignSelf: "flex-start" }}>
                    Unrecognized usernames
                  </Button>
                  <Button onPress={unrecognizedTextCopier}>
                    Copy
                  </Button>
                </View>
                {unrecognizedParticipantsList.map((singleUnrecognized) =>
                  <Text key={singleUnrecognized} variant="labelLarge" style={{ paddingVertical: 8, paddingLeft: 15 }}>
                    {singleUnrecognized}
                  </Text>
                )
                }
              </ScrollView>
              :
              null
          }
        </View>
      </View>
      <Button
        uppercase
        mode="contained"
        style={{ borderRadius: 15, marginBottom: 20 }}
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ height: 43 }}
        onPress={uploadActivity}
      >
        Submit
      </Button>
    </ScrollView>
  )
}


export default ActivityAttendance;