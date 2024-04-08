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
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";



const data = {
  membersEmailAddresses: [
    "sharontolulope@gmail.com",
    "shalomimaledo@gmail.com",
    "augmentedone@zohomail.com",
    "divinefavourohele@gmail.com",
  ],
  listOfAllMembers: {
    "5shalom7": { fullName: "Imaledo Sharon Tolulope" },
    "david01": { fullName: "Imaledo David Shalom" },
    "20sharon": { fullName: "Imaledo Omoochi Tolu" },
    "5skhhalom7": { fullName: "Omosekafe Isaiah" },
    "davidjfd01": { fullName: "Dunsin Divine Favour" },
  },
}

const MembersEdit = ({ navigation, route }) => {
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const [membersPopulation, setMembersPopulation] = useState(data.membersEmailAddresses.length);
  const [membersEmailAddresses, setMembersEmailAddresses] = useState("");
  const [sweetenedMembersEmailAddresses, setSweetenedMembersEmailAddresses] = useState(data.membersEmailAddresses);
  const [membersEmailAddressesError, setMembersEmailAddressesError] = useState(false);
  let sweet;
  const allow = useRef(true);
  const buttonInUse = useRef(false);


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


  function sweetenMembersEmailAddresses(value) {
    setMembersEmailAddresses(value);
    sweet = membersEmailAddresses.replaceAll(",\n", ",");
    setMembersPopulation(sweet.split(",").length);
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
          {Object.keys(data.listOfAllMembers).length > 0 ? "Edit" : "Add"} Members
        </Text>
      </View>
      <Pressable style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
            {membersPopulation.toString()}
          </Text>
          <Text variant="labelLarge" style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
            {`  member${Object.keys(data.listOfAllMembers).length > 1 ? "s" : ""}`}
          </Text>
        </View>
        <Icon
          source="chevron-down"
          size={19}
          color="#b362ff"
        />
      </Pressable>
      <View style={{ rowGap: 10, paddingBottom: 60 }}>
        <TextInput
          placeholder="Submit email addresses here..."
          autoComplete="off"
          multiline
          error={membersEmailAddressesError}
          mode="outlined"
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