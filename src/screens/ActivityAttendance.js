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
    participants: ["5", "s", "h", "a", "l", "o", "m7", "david01", "david001", "20sharon", "5skhhalom7", "davidjfd01", "davigfcd001", "20kkp6sharon"],
    timeAndDateUploaded: ""
  }
]

const data = {
  listOfAllMembers: [
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
            <TextInput
              placeholder="Submit Usernames here..."
              multiline
              autoComplete="off"
              error={attendeesUsernamesError}
              mode="outlined"
              onChangeText={(value) => { setAttendeesUsernames(value); attendeesUsernamesError ? setAttendeesUsernamesError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
              style={{ width: "100%", height: 350 }}
            />
        }
        <View>
          <Pressable onPress={() => setShowUnrecognizedParticipantsList(prev => !prev)} disabled={participants.length > 1} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
              <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                {splitAttendeesUsernames.length}
              </Text>
              <Text variant="labelLarge" style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
                {`  participant${splitAttendeesUsernames.length > 1 ? "s" : ""} ${participants.length > 1 ? "received" : "to receive"} `}
                <Text variant="labelLarge" style={{ fontWeight: "bold", color: theme.colors.primary }}>{impacts}</Text>
                {` impact${impacts > 1 ? "s" : ""}`}
              </Text>
            </View>
            <Icon
              source="chevron-down"
              size={19}
              color={participants.length > 1 ? "#b362ff00" : "#b362ff"}
            />
          </Pressable>
          {
            unrecognizedParticipantsList.length > 1 && showUnrecognizedParticipantsList ?
              <ScrollView fadingEdgeLength={100} overScrollMode="never" nestedScrollEnabled style={{ maxHeight: 200 }} contentContainerStyle={{ marginHorizontal: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundColor: theme.colors.onSecondary }}>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                  <Button style={{ alignSelf: "flex-start" }}>
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