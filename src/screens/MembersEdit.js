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
  Keyboard,
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
  useTheme
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import SelectionComp, { NumberComponent } from "../utilities/components/NumberComponent";


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

const membersFullnameAndEmailAddressesFromData = members.map((data) => {
  const { fullName, emailAddress } = data; // THIS IS THE data IN THE LINE RIGHT ABOVE
  return [fullName, emailAddress];
})

const membersEmailAddressesFromData = members.map((data) => {
  const { emailAddress } = data; // THIS IS THE data IN THE LINE RIGHT ABOVE
  return emailAddress;
})

const MembersEdit = ({ navigation, route }) => {
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const [membersPopulation, setMembersPopulation] = useState(membersFullnameAndEmailAddressesFromData.length);
  const [membersEmailAddresses, setMembersEmailAddresses] = useState("");
  const [sweetenedMembersEmailAddresses, setSweetenedMembersEmailAddresses] = useState(membersEmailAddressesFromData);
  const [membersEmailAddressesError, setMembersEmailAddressesError] = useState(false);
  const [showListOfMembersEmailAddressesComp, setShowListOfMembersEmailAddressesComp] = useState(false);
  const allow = useRef(true);
  const buttonInUse = useRef(false);
  const membersEmailAddressesText = useRef("")

  function uploadActivity() {
    if (buttonInUse.current) return null;
    buttonInUse.current = true;
    allow.current = true;

    if (!membersEmailAddresses.trim()) {
      setMembersEmailAddressesError(true);
      allow.current = false;
    }

    if (!allow.current) return null;

    activitiesListData[activityIndex].participants = sweetenedMembersEmailAddresses;

    navigation.goBack();
  }

  async function copyMemberDetail(detail, detailType) {
    await Clipboard.setStringAsync(detail);
    if (Platform.OS === "android") {
      ToastAndroid.show(`Copied to clipboard.`, ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(`Copied to clipboard.`)
    }
  }

  function sweetenMembersEmailAddresses(value) {
    //setMembersEmailAddresses(value)
    membersEmailAddressesText.current = value;
    let sweet = membersEmailAddressesText.current.replaceAll(" ", "").replaceAll(",\n", "£¢€¥^").replaceAll("\n,", "£¢€¥^").replaceAll("\n", "£¢€¥^").replaceAll(",", "£¢€¥^").split("£¢€¥^");
    sweet = sweet.filter(swe => swe)
    const additionText = membersFullnameAndEmailAddressesFromData.length + " + " + sweet.length;
    additionText !== membersPopulation ? setMembersPopulation(additionText) : null
    // THERE IS AN ISSUE HERE, RESOLVE IT VERY SMARTLY
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
          {members.length > 0 ? "Edit" : "Add"} Members
        </Text>
      </View>
      <Pressable
        onPress={() => { Keyboard.dismiss(); setShowListOfMembersEmailAddressesComp(true) }}
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
            {membersPopulation.toString()}
          </Text>
          <Text variant="labelLarge" style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
            {`  member${members.length > 1 ? "s" : ""}`}
          </Text>
        </View>
        <Icon
          source="chevron-down"
          size={19}
          color="#b362ff"
        />
      </Pressable>
      {
        showListOfMembersEmailAddressesComp ?
          <SelectionComp
            pressableOnPress={() => setShowListOfMembersEmailAddressesComp(false)}
            data={membersFullnameAndEmailAddressesFromData}
            mode="multiple" //THIS JUST ADJUSTS ORIGINAL SelectionComp FLEX
            renderItem={(({ item }) => <NumberComponent
              textValue={item}
              mailsIncluded={true}
              textVariant="titleMedium"
              onPress={() => copyMemberDetail(`Email address:  ${item[1]}\nFull name:  ${item[0]}`)}
            />
            )}
          />
          :
          null
      }
      <View style={{ rowGap: 10, paddingBottom: 60 }}>
        <TextInput
          placeholder="Submit email addresses here..."
          multiline
          error={membersEmailAddressesError}
          mode="outlined"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrrect={false}
          onChangeText={(value) => { sweetenMembersEmailAddresses(value); membersEmailAddressesError ? setMembersEmailAddressesError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
          style={{ width: "100%", height: height * .6 }}
        />
        <HelperText>
          Separate Email addresses with a comma (,) and/or line break only.
        </HelperText>
      </View>
      <Button
        uppercase
        mode="contained"
        style={{ borderRadius: 15, marginBottom: 20 }}
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ height: 43 }}
        onPress={uploadActivity}
      >
        Add
      </Button>
    </ScrollView>
  )
}


export default MembersEdit;