import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  Platform
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Icon,
  IconButton,
  useTheme,
  Badge,
  Switch,
  Divider,
  HelperText,
  Surface,
  RadioButton,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";


const data = {
  orgName: "Aura",
  totalNumberOfManagements: 3,
  themeStyle: "light",
  admin: false
}

const userData = {
  fullName: "Imaledo David Shalom",
  emailAddress: "shalomimaledo@gmail.com",
  requestedEmailChangeText: "",
  phoneNumber: "09137287950",
  password: "The Password 001",
  changeOfPermissionAccepted: null
}

const Stack = createStackNavigator();


const OptionListComp = ({ toWhere, dText, badged = false, badgeNumber = 0, textNumber = 0 }) => {

  return (
    <Pressable onPress={toWhere} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text variant="labelLarge" style={{ flex: 1, fontSize: 15.5 }}>
        {dText}
      </Text>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View style={{ flexDirection: "row", columnGap: 5 }}>
          {
            textNumber ?
              <Text style={{ alignItems: "center", fontSize: 15.5, opacity: .5 }}>
                {textNumber}
              </Text>
              :
              null
          }
          {
            badged ?
              <View style={{ justifyContent: "center" }}>
                <Badge size={badgeNumber ? 20 : 8} style={{ justifyContent: "center" }}>
                  {badgeNumber ? badgeNumber : null}
                </Badge>
              </View>
              :
              null
          }
        </View>
        <IconButton
          icon="chevron-right"
          size={30}
          rippleColor="rgba(0,0,0,0)"
        />
      </View>
    </Pressable>
  )
}

const OptionListCompSwitch = ({ helperTextText = "", dText, valueChangeFunction, switchValue }) => {
  const theme = useTheme();

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text variant="labelLarge" style={{ flex: 1, fontSize: 15.5 }}>
          {dText}
        </Text>
        <Switch
          value={switchValue}
          onValueChange={valueChangeFunction}
        />
      </View>
      <HelperText padding="none">
        {helperTextText}
      </HelperText>
      <Divider theme={theme} style={{ marginVertical: 10 }} />
    </View>
  )
}

const ThemeSelectionComp = ({ styleText, radioButtonValue }) => {

  return (
    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center" }}>
      <Text variant="labelLarge" style={{ flex: 1, fontSize: 15.5 }}>
        {styleText}
      </Text>
      {
        Platform.OS === "android" ?
          <RadioButton.Android
            value={radioButtonValue}
          />
          : Platform.OS === "ios" ?
            <RadioButton.IOS
              value={radioButtonValue}
            /> :
            <RadioButton
              value={radioButtonValue}
            />

      }
    </View>
  )
}


const SettingsApp = ({ navigation }) => {
  const theme = useTheme()
  const { height, width } = useWindowDimensions();
  const [impactsEarningEnabled, setImpactsEarningEnabled] = useState(true);
  const [badgesEarningEnabled, setBadgesEarningEnabled] = useState(true);
  const [themeStyle, setThemeStyle] = useState(data.themeStyle);

  return (
    <SafeAreaView style={STYLES.forView}>
      <Surface elevation={2} style={{ marginTop: 7, height: height * .4, backgroundColor: "#ffffff", borderRadius: 15 }}>
        <ImageBackground source={require("../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")} style={{ flex: 1 }} imageStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <Pressable
            onPress={() => console.warn("PpP")}
            style={{ borderRadius: 15, flex: 1, backgroundColor: "#0000003a", opacity: .85, justifyContent: "center", alignItems: "center" }}>
            <Icon
              source="pencil"
              size={70}
              color={theme.colors.primary}
            />
          </Pressable>
        </ImageBackground>
        <View style={{ paddingLeft: 20 }}>
          <OptionListComp
            dText="Edit Profile"
            toWhere={() => navigation.navigate("settings for profile")}
          />
        </View>
      </Surface>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{ paddingBottom: 10, paddingTop: 40 }}>
        <OptionListComp
          dText="Manage Managements"
          textNumber={data.totalNumberOfManagements}
          toWhere={() => console.warn("Pressed Man.")}
        />
        <Divider theme={theme} style={{ marginVertical: 10 }} />

        <OptionListComp
          dText="Upload Social Links"
          toWhere={() => console.warn("Pressed Man.")}
        />
        <Divider theme={theme} style={{ marginVertical: 10 }} />

        <OptionListCompSwitch
          dText="Enable Impacts Earning"
          helperTextText="If turned off, members will not receive or see previous Impacts anymore."
          switchValue={impactsEarningEnabled}
          valueChangeFunction={() => setImpactsEarningEnabled(!impactsEarningEnabled)}
        />
        <OptionListCompSwitch
          dText="Enable Badges Earning"
          helperTextText="If turned off, members will not receive or see previous badges anymore."
          switchValue={badgesEarningEnabled}
          valueChangeFunction={() => setBadgesEarningEnabled(!badgesEarningEnabled)}
        />

        <Pressable style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text variant="labelLarge" style={{ flex: 1, fontSize: 15.5 }}>
            Select Theme Colour
          </Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ flexDirection: "row", columnGap: 5 }}>
              <Badge style={{ backgroundColor: theme.colors.primary }}>
                <Icon
                  source="check"
                  color="#ffffff"
                />
              </Badge>
            </View>
            <IconButton
              icon="chevron-right"
              size={30}
              rippleColor="rgba(0,0,0,0)"
            />
          </View>
        </Pressable>
        <Divider theme={theme} style={{ marginVertical: 10 }} />

        <RadioButton.Group onValueChange={setThemeStyle} value={themeStyle}>
          <View style={{ marginBottom: 15, paddingTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text variant="labelLarge" style={{ flex: 1, fontSize: 15.5 }}>
              Theme Style
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <ThemeSelectionComp
              styleText="Light"
              radioButtonValue="light"
            />
            <ThemeSelectionComp
              styleText="Default"
              radioButtonValue="default"
            />
            <ThemeSelectionComp
              styleText="Dark"
              radioButtonValue="dark"
            />
          </View>
        </RadioButton.Group>
        <Divider theme={theme} style={{ marginVertical: 10 }} />

        <Button style={{ alignSelf: "flex-start", marginTop: 15 }}>
          Report {data.orgName}
        </Button>
      </ScrollView>
    </SafeAreaView >
  )
}

const SettingsProfile = ({ navigation }) => {
  const theme = useTheme();
  const [fullNameEditDisabled, setFullNameEditDisabled] = useState(true);
  const [emailAddressEditDisabled, setEmailAddressEditDisabled] = useState(true);
  const [passwordEditDisabled, setPasswordEditDisabled] = useState(true);
  const [phoneNumberEditDisabled, setPhoneNumberEditDisabled] = useState(true);
  const [fullNameEditText, setFullNameEditText] = useState("");
  const [emailAddressEditText, setEmailAddressEditText] = useState("");
  const [passwordEditText, setPasswordEditText] = useState("");
  const [phoneNumberEditText, setPhoneNumberEditText] = useState("");
  const [passwordEditHelperTextText, setPasswordEditHelperTextText] = useState("Password");
  const [toBeDrafted, setToBeDrafted] = useState(false);
  const [requestUnpermittedEdit, setRequestUnpermittedEdit] = useState(false);
  const [requestText, setRequestText] = useState("Request Change");


  function enterPasswordToEdit(enteredPasswordText) {

    if (userData.password === enteredPasswordText) {
      console.warn(passwordEditText)
      setPasswordEditText("")
      setPasswordEditHelperTextText("Enter new password")
    } else {
      setPasswordEditText(enteredPasswordText);
    }
  }

  function tryToSave() {
    console.warn("Palupa")
  }

  function sendRequestToAdmin() {
    if (requestText === "Request Sent") return null;
    setRequestText("Request Sent");
    userData.requestedEmailChangeText = emailAddressEditText;
    setEmailAddressEditText("");
    setTimeout(() => setRequestUnpermittedEdit(false), 3500);
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{ flex: 1 }}
      contentContainerStyle={{ rowGap: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon="close"
          rippleColor="rgba(0,0,0,0)"
          iconColor={theme.colors.primary}
          onPress={() => navigation.goBack()}
        />
        <Text variant="headlineSmall" style={{ paddingRight: 48, flex: 1, textAlign: "center" }}>
          Edit Profile
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10, rowGap: 20 }}>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            placeholder={userData.fullName}
            autoCapitalize="words"
            onChangeText={setFullNameEditText}
            right={<TextInput.Icon icon="pencil" rippleColor="rgba(0,0,0,0)" forceTextInputFocus={false} color={fullNameEditDisabled ? theme.colors.primary : null} />}
            style={{ width: "100%" }}
          />
          <HelperText>
            Full Name
          </HelperText>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            value={emailAddressEditText}
            placeholder={userData.requestedEmailChangeText ? `${userData.requestedEmailChangeText.includes("@") ? userData.requestedEmailChangeText.split("@")[0] + "@" : userData.requestedEmailChangeText.slice(0, 15)}... (pending)` : userData.emailAddress}
            inputMode="email"
            disabled={userData.requestedEmailChangeText}
            onChangeText={(value) => { setEmailAddressEditText(value); data.admin ? null : requestUnpermittedEdit ? value === "" ? setRequestUnpermittedEdit(false) : null : setRequestUnpermittedEdit(true) }}
            right={<TextInput.Icon icon="pencil" rippleColor="rgba(0,0,0,0)" forceTextInputFocus={false} color={emailAddressEditDisabled ? theme.colors.primary : null} />}
            style={{ width: "100%" }}
          />
          <HelperText>
            Email Address
          </HelperText>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            placeholder={userData.phoneNumber}
            inputMode="tel"
            onChangeText={setPhoneNumberEditText}
            right={<TextInput.Icon icon="pencil" rippleColor="rgba(0,0,0,0)" forceTextInputFocus={false} color={phoneNumberEditDisabled ? theme.colors.primary : null} />}
            style={{ width: "100%" }}
          />
          <HelperText>
            Phone Number
          </HelperText>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            value={passwordEditText}
            placeholder="Enter current password"
            secureTextEntry
            autoComplete="off"
            textContentType="newPassword"
            onChangeText={enterPasswordToEdit}
            onFocus={() => setPasswordEditHelperTextText("Input current password")}
            onBlur={() => setPasswordEditHelperTextText("Password")}
            right={<TextInput.Icon icon="pencil" rippleColor="rgba(0,0,0,0)" forceTextInputFocus={false} color={passwordEditDisabled ? theme.colors.primary : null} />}
            style={{ width: "100%" }}
          />
          <HelperText style={{ color: passwordEditHelperTextText === "Enter new password" ? "blue" : null }}>
            {passwordEditHelperTextText}
          </HelperText>
        </View>
      </View>
      {
        requestUnpermittedEdit ?
          <View style={{ marginLeft: 10, alignItems: "flex-start" }}>
            <Button onPress={sendRequestToAdmin} contentStyle={{ flexDirection: "row-reverse" }} icon={requestText === "Request Change" ? null : "check"} mode="contained" style={{ borderRadius: 10 }}>
              {requestText}
            </Button>
            <HelperText>
              Click to request for change of email address from Management.
            </HelperText>
          </View>
          :
          null
      }
      {
        emailAddressEditText || fullNameEditText || passwordEditText || phoneNumberEditText ?
          !data.admin && !(fullNameEditText || passwordEditText || phoneNumberEditText) ?
            null
            :
            <Button onPress={tryToSave} mode={requestUnpermittedEdit ? "outlined" : "contained"} style={{ marginLeft: 10, borderRadius: 10, alignSelf: "flex-start" }}>
              {requestUnpermittedEdit ? "Save Other Changes" : "Save"}
            </Button>
          :
          null
      }
    </ScrollView>
  )
}

const Settings = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="settings for app"
        component={SettingsApp}
      />
      <Stack.Screen
        name="settings for profile"
        component={SettingsProfile}
      />
    </Stack.Navigator>
  )
}

const STYLES = StyleSheet.create({
  forView: {
    marginHorizontal: 12,
    flex: 1,
  }
})

export default Settings;