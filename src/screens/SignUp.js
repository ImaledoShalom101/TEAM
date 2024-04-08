import { useState, useRef } from "react";
import {
  useWindowDimensions,
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import {
  Text,
  useTheme,
  TextInput,
  Button,
  ProgressBar,
  HelperText,
  SegmentedButtons,
  Dialog,
  Icon,
  Checkbox
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as Device from 'expo-device';
import { BlurView } from 'expo-blur';
import Constants from "expo-constants";
import SignUpBackground from "../utilities/components/SignUpBackground";
import { GeneralSignUpOne, GeneralSignUpTwo } from "../utilities/components/GeneralSignUp";
import SignUpInput from "../utilities/components/SignUpInput";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from 'expo-image-picker';
//import * as EImagePicker from 'react-native-image-picker';

// THEME HAS TO BE PURPLE WHEN USERS WANT TO SIGN UP
// ELSE COLOR COMBO WILL BE VERY BAD
// COS MANY COLORS ARE ALREADY FIXED TO PURPLE

// INCLUDE TGAT THIS'LL BE DONE IN User Privacy SECTION
const { deviceType, manufacturer, osVersion, productName } = Device;
//console.warn(`deviceType: ${deviceType}\n manufacturer: ${manufacturer}\n osVersion: ${osVersion}\n productName: ${productName}`)
//Device.getPlatformFeaturesAsync().then((e) => console.warn(e))

const Stack = createStackNavigator()
let data = {
  orgName: "Aura",
}

const features = [
  {
    name: "Upload email addresses",
    heading: `Confirm your members' email addresses for their verification in the "Your Members" section.`,
    icon: require(`../../assets/sign_up_info/email_verification_to_management.png`),
    uiImage: require(`../../assets/010c929688612d2fa083c4b3aa0ce105.jpg`),
  },
  {
    name: "Configure settings",
    heading: `Set up how your members see and interact with the ${data.orgName} interface in the "Settings."`,
    icon: require(`../../assets/sign_up_info/settings_set_up_to_management.png`),
    uiImage: require(`../../assets/010c929688612d2fa083c4b3aa0ce105.jpg`),
  },
  {
    name: "Badges system",
    heading: `Set up a Badges-awarding system in the "Members" section.`,
    icon: require(`../../assets/sign_up_info/badge_info_to_management.png`),
    uiImage: require(`../../assets/010c929688612d2fa083c4b3aa0ce105.jpg`),
  },

]

/*
data.orgMotto = orgMotto.trim();
    data.orgType = typeOfOrg.trim();
    data.orgAddress = orgAddress.trim() ? orgAddress.trim() : null;
    data.orgDescription = orgDescription.trim();

*/

const StartSignUp = ({ navigation, route }) => {
  const parentNavigation = navigation.getParent()
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const [orgName, setOrgName] = useState("");
  const [tryToEnterWithoutFillingOrgName, setTryToEnterWithoutFillingOrgName] = useState(false);
  const [blockAllFunctions, setBlockAllFunctions] = useState(false);

  //const [buttonStartLoad, setButtonStartLoad] = useState(false);

  function ontoNext() {
    setBlockAllFunctions(true);
    if (!orgName.trim()) {
      setBlockAllFunctions(false)
      return setTryToEnterWithoutFillingOrgName(true)
    }

    data.orgName = orgName.trim();
    Keyboard.dismiss()
    navigation.navigate("Second screen");
    setOrgName("")
    //setButtonStartLoad(false)
    setBlockAllFunctions(false)

  }



  return (
    <SignUpBackground
      toWhere={blockAllFunctions == false ? ontoNext : null}
      textIsFilledIn={orgName}
      onFirstScreen={route.name === "First screen"}

    >
      {/*buttonLoading={buttonStartLoad}
      pressInFunction={() => setButtonStartLoad(true)}*/}
      <View style={{ flex: 1, padding: 13, width: "100%" }}>
        <View style={{ alignItems: "center", flex: 1, paddingTop: 40, paddingHorizontal: 10, justifyContent: "space-between" }}>
          <Text variant="displayLarge" style={{ fontWeight: 600, color: theme.colors.primary }}>Sign Up</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 14, width: "100", justifyContent: "center" }}>

          <SignUpInput
            label="Input organization name"
            value={orgName}
            onChangeText={(value) => {
              setOrgName(value);
              tryToEnterWithoutFillingOrgName ? setTryToEnterWithoutFillingOrgName(false) : null
            }}
            visible={orgName}
            textOfHelper={`This will be case sensitive; e.g. "OrgName" is not "Orgname".`}
            error={tryToEnterWithoutFillingOrgName}
          />

        </View>

      </View>
    </SignUpBackground>

  )
}


const OrganizationPartSecondSignUp = ({ navigation, route }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const [orgMotto, setOrgMotto] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [typeOfOrg, setTypeOfOrg] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [selectedInageUri, setSelectedInageUri] = useState(null);
  const [orgMottoError, setOrgMottoError] = useState(false);
  const [typeOfOrgError, setTypeOfOrgError] = useState(false);
  const [orgDescriptionError, setOrgDescriptionError] = useState(false);
  const allowIn = useRef(true);
  const [blockAllFunctions, setBlockAllFunctions] = useState(false);
  //const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()


  function goToNext() {
    setBlockAllFunctions(true)
    /*console.warn(data)
    console.warn(allowIn)*/
    if (!orgMotto.trim()) {
      setOrgMottoError(true);
      allowIn.current = false;
    } else {
      setOrgMottoError(false);
    }
    // ADDRESS' ISN'T REQUIRED

    if (!typeOfOrg.trim()) {
      setTypeOfOrgError(true);
      allowIn.current = false;
    } else {
      setTypeOfOrgError(false);
    }
    if (!orgDescription.trim()) {
      setOrgDescriptionError(true);
      allowIn.current = false;
    } else {
      setOrgDescriptionError(false);
    }
    /*if (!agreeToTermsAndConditions) {
      setAgreeToTermsAndConditionsError(true);
      allowIn.current = false;
    } else {
      setAgreeToTermsAndConditionsError(false);
 
    }*/
    if (!allowIn.current) return setBlockAllFunctions(false);

    //console.warn("went")
    //setTimeout(() => setButtonStartLoad(true), 1000).then(() => goToNext())
    //goToNext()
    //}
    //setButtonStartLoad(true)
    //function goToNext() {

    data.orgMotto = orgMotto.trim();
    data.orgType = typeOfOrg.trim();
    data.orgAddress = orgAddress.trim() ? orgAddress.trim() : null;
    data.orgDescription = orgDescription.trim();

    Keyboard.dismiss()
    navigation.navigate("Third screen");
    setOrgMotto("");
    setTypeOfOrg("");
    setOrgAddress("");
    setOrgDescription("");
    //setButtonStartLoad(false)
    //}, 10)
    //setTimeout(() => console.warn(data), 4000);
    setBlockAllFunctions(false)
  }

  const [image, setImage] = useState(null);
  const selectLogoImage = async () => {

    /*const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true
    };

    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.warn('User cancelled')
      } else if (res.errorCode) {
        console.warn('ImagePickerError: ', res.errorMessage)
      } else {
        console.warn(res);
        //sendImageToAPI(res.assets[0].base64, res.assets[0].type);
      }
    });*/
    //await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    console.warn(result);
    setImage(result.assets[0].uri);


    //const result = await launchImageLibrary();
    /*let result = await launchImageLibrary({
      mediaType: "photo",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });*/
    //console.warn(result)
    // You can also use as a promise without 'callback':
    //const result = await Pp.launchImageLibrary();
    //const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    /*let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.warn(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    //console.warn("Last")

    
    await ImagePicker.getPendingResultAsync()
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      })
    } catch (err) { console.warn(err) }
    await ImagePicker.getPendingResultAsync()
    console.warn("end")
    console.warn(result);
    */
    /*
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }*/
  }

  return (
    <SignUpBackground
      forPrevious={() => navigation.goBack()}
      progressBarValue={.25}
      toWhere={blockAllFunctions == false ? goToNext : null}
    >
      {/*buttonLoading={buttonStartLoad}
      pressInFunction={checkAllInput}*/}
      {/*() => allowIn.current ? setButtonStartLoad(true) : null*/}

      <ScrollView fadingEdgeLength={10} showsVerticalScrollIndicator={false} overScrollMode="never" keyboardShouldPersistTaps="always" style={{ width: "100%" }} contentContainerStyle={{ paddingHorizontal: 13, rowGap: 20, paddingBottom: 20, paddingTop: 5 }}>
        <View style={{ rowGap: 5 }}>
          <Text variant="titleMedium" style={{ rowGap: 5, fontStyle: "italic", fontWeight: 600, color: theme.colors.primary }}>
            {`About ${data.orgName}`}
          </Text>
          <SignUpInput
            value={orgMotto}
            label={` Enter ${data.orgName}'s motto`}
            visible={orgMottoError}
            typeOfHelperText="error"
            textOfHelper="Your organization's motto is required. Please fill!"
            onChangeText={setOrgMotto}
          />
        </View>
        <SignUpInput
          value={orgAddress}
          label={`Input ${data.orgName}'s main address (optional)`}
          onChangeText={setOrgAddress}
        />
        <View style={{ paddingBottom: 7, rowGap: 7 }}>
          <Text style={{ color: typeOfOrgError ? "#ff0000" : "#0000ff9e", fontSize: 13, letterSpacing: .17 }}>
            Type of organization
          </Text>
          <SegmentedButtons
            value={typeOfOrg}
            onValueChange={setTypeOfOrg}
            buttons={[
              {
                value: "profit",
                label: "Profit",
                checkedColor: "rgb(255,255,255)",
                style: typeOfOrg === "profit" ? { backgroundColor: "rgba(211,13,255, .375)" } : null
              },
              {
                value: "non-profit",
                label: "Non-profit",
                checkedColor: "rgb(255,255,255)",
                style: typeOfOrg === "non-profit" ? { backgroundColor: "rgba(211,13,255, .375)" } : null
              }
            ]}
          />
        </View>
        <SignUpInput
          value={orgDescription}
          placeholder={`Briefly describe ${data.orgName} organization`}
          multiline
          visible={orgDescriptionError}
          textInputStyle={{ height: 130 }}
          typeOfHelperText="error"
          textOfHelper="This summary is important. Please fill!"
          onChangeText={setOrgDescription}
        />
        <View style={{ alignItems: "center" }}>
          {
            image ?
              <Image style={{ height: 100, width: 100 }} source={{ uri: image }} />
              :
              <Pressable onPress={selectLogoImage} style={{ alignItems: "center", justifyContent: "center", height: width < 290 ? width - 26 : width > 500 ? 500 : 290, width: width < 290 ? width - 26 : width > 500 ? 500 : 290, borderRadius: 30, backgroundColor: theme.colors.primary.replace(", 1)", ", .3)") }}>
                <Icon source="camera" size={width < 290 ? (3 / 5) * width : width > 500 ? (3 / 5) * 500 : (3 / 5) * 290} color={theme.colors.primary} />
                <Text style={{ textAlign: "center", fontSize: 20, color: theme.colors.primary }}>
                  {`Upload ${data.orgName}'s logo`}
                </Text>
              </Pressable>
          }
        </View>
        {/*<View style={{ flexDirection: "row" }}>
          <Checkbox
            status={agreeToTermsAndConditions ? "checked" : "unchecked"}
            onPress={() => setAgreeToTermsAndConditions((change) => !change)}
            uncheckedColor={agreeToTermsAndConditionsError ? "red" : null}
          />
          <Button>
            Agree to terms and conditions
          </Button>
        </View>*/}
      </ScrollView>
    </SignUpBackground>
  )
}

const CircleForManagementInformationInSignUpComp = ({ colored = false }) => {
  const { colors: { primary } } = useTheme();

  return (
    <View style={{ backgroundColor: colored ? primary : null, borderColor: primary, borderRadius: 100, height: 9, width: 9, borderWidth: .8 }} />
  )
}

const ManagementInformationInSignUpComp = ({ navigation, route }) => {
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const [selectedCircleName, setselectedCircleName] = useState("");
  const index = features.findIndex((value) => value.name === route.name);
  const { heading, icon, uiImage } = features[index];
  const firstOne = route.name === features[0].name;
  const [newImageWidth, setNewImageWidth] = useState(0);
  const [newImageHeight, setNewImageHeight] = useState(0);

  return (
    <SafeAreaView style={{ rowGap: 10, flex: 1, paddingTop: Constants.statusBarHeight, paddingHorizontal: 13, paddingBottom: 13 }}>
      <View style={{ paddingTop: 25, rowGap: -25 }}>
        <Text variant="headlineSmall" style={{ textAlign: "center" }} >
          {heading}
        </Text>
        <Image
          resizeMode="contain"
          style={{
            width: 90,
            height: 90,
            left: deviceWidth - 75,
            zIndex: -1
          }}
          source={icon}
        />
      </View>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Image

          onLoad={({ nativeEvent: { source: { width, height } } }) => {

            const ratio = height > width ? width / height : height / width;
            setNewImageWidth(deviceWidth > deviceHeight ? deviceWidth * ratio : deviceWidth)
            setNewImageHeight(deviceHeight > deviceWidth ? deviceHeight * ratio : deviceHeight)
          }}
          resizeMode="contain"
          style={{
            width: "70%",
            height: "70%",
            borderRadius: 25
          }}
          source={uiImage}
        />
      </View>
      <View style={{ flexDirection: "row", columnGap: 5, justifyContent: "center" }}>
        {/*
          features.map((inHereFeat) =>
            <CircleForManagementInformationInSignUpComp
              // THIS IS COMMENTED ONLY BECAUSE key
              // GIVES A FAKE USELESS ERROR
              key={inHereFeat.name}
              colored={features[index].name === inHereFeat.name ? true : false}
            />
          )
        */}
      </View>
      <View style={{
        flexDirection: "row",
        paddingBottom: 13,
        width: "100%",
        justifyContent: firstOne ? "flex-end" : "space-between",
        alignItems: "center"
      }}>
        {
          !firstOne ?
            <Button onPress={() => { setselectedCircleName(route.name); navigation.goBack() }} style={{ borderRadius: 10 }} mode="outlined" >Back</Button>
            :
            null
        }
        <Button
          style={{ alignSelf: "flex-end", borderRadius: 10 }}
          mode="contained"
          onPress={() => navigation.navigate(index + 1 != features.length ? features[index + 1].name : "Theme select")}
        >
          Next
        </Button>
      </View>
    </SafeAreaView >
  )
}

const ThemeSelect = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  function themeSelected(themeStyle) {
    data.theme = themeStyle;
    navigation.replace("Other app infos");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/theme_select_background.png")}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          {[["Dark", 1 / 4, "white"], ["Default", 1 / 2, "grey"], ["Light", 3 / 4, "black"]].map((theme) =>
            <Pressable key={theme[0]} onPress={() => themeSelected(theme[0])} style={{ flex: 1, alignItems: "center" }}>
              {/*LEAVE ALONE, NOT A PROBLEM*/}
              <Text variant="headlineLarge" style={{ top: height * (theme[1]), color: theme[2] }}>
                {theme[0]}
              </Text>
            </Pressable>
          )}
        </View>
        <Text variant="headlineLarge" style={{ paddingTop: Constants.statusBarHeight + 10, padding: 10, position: "absolute", alignSelf: "center", color: "white" }}>
          Select Theme
        </Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

const OtherAppInfos = () => {
  const orgCode = "a3bC-dEdg-O7bq-o4iV-hijs6-12R9-5F2e";
  data.orgCode = orgCode;
  const { width, height } = useWindowDimensions();
  const [copyOrgCodeCheck, setCopyOrgCodeCheck] = useState(null);
  const [buttonClickedAndLoading, setButtonClickedAndLoading] = useState(false);

  const otherAppInfosList = [
    "Organization code is given to members to use to sign in once.",
    "Members' participation in activities and events can be rewarded with points called 'Impact'.",
    `Participants do not know if an event will be rewarded with "Impacts" or not.`,
    "Information you disseminate is received by all members.",
    `Polls, surveys and much more can be made using the Advanced and All-In-One plans.`,
    `Links to ${data.orgName}'s social media profile and timeline can be uploaded for quick access for members.`,
    `Register ${data.orgName} by clicking the button below.`,
    "Organizatipon code is given to members to use to sign in once.",
    "Members' participation imn activities and events qcan be rewarded with points called 'Impact'.",
    "Information you disseminate is receivead by all members.",
    `Register ${data.orgName} by clicking twhe button below.`,
    "Organization code is given to members to muse to sign in once.",
    "Members' participation in activiwties and events can be rewarded with points called 'Impact'.",
    "Information you 1disseminate is received by all members.",
    `Register ${data.orgName} by clickingj the button below.`,
    "Organization code is given to members wto use to sign in once.",
    "Members' participation in activitiaes and events can be rewarded with points called 'Impact'.",
    "Information you dissevminate is received by all members.",
    `Register ${data.orgName} by cligcking the button below.`
  ]

  async function copyOrgCode() {
    setCopyOrgCodeCheck("check");
    setTimeout(() =>
      setCopyOrgCodeCheck(null),
      6000
    );
    await Clipboard.setStringAsync(`Below is the MEMBERS code for ${data.orgName}:\n${orgCode}`);
    if (Platform.OS === "android") {
      ToastAndroid.show(`${data.orgName}'s code is copied into your clipboard.`, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(`${data.orgName}'s code is into your clipboard.`);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, rowGap: 25, alignItems: "center", paddingTop: Constants.statusBarHeight + 10, paddingBottom: 20, marginHorizontal: 10 }}>
      <Text variant="headlineLarge">
        How It Works
      </Text>
      <View style={{ rowGap: 18, alignItems: "center" }}>
        <View style={{ rowGap: 11, alignItems: "center" }}>
          <Text style={{ fontSize: 15.5, textAlign: "center" }}>
            Organization code:
          </Text>
          <Text style={{ fontWeight: "700", textAlign: "center" }}>
            {orgCode}
          </Text>
        </View>
        <Button
          onPress={copyOrgCode}
          contentStyle={{ flexDirection: "row-reverse" }}
          mode="elevated"
          icon={copyOrgCodeCheck}
        >
          {copyOrgCodeCheck ? "Copied" : "Copy"}
        </Button>
      </View>
      <ScrollView fadingEdgeLength={20} overScrollMode="never" style={{ paddingHorizontal: 10 }} >

        {
          otherAppInfosList.map((info) =>
            <View key={info} style={{ flexDirection: "row" }}><Text>•  </Text><View><Text style={{ paddingRight: 10 }}>{`${info}\n`}</Text></View></View>
          )
        }

      </ScrollView>
      <Button
        uppercase
        mode="contained"
        style={{ borderRadius: 15 }}
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ height: 43 }}
        onPress={() => console.warn("zaR.current")}
      >
        Register
      </Button>
    </SafeAreaView >
  )
}

const SignUp = () => {


  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Second screen"
    >
      <Stack.Screen
        name="First screen"
        component={StartSignUp}
      />

      <Stack.Screen
        name="Second screen"
        component={OrganizationPartSecondSignUp}
      />
      <Stack.Screen
        name="Third screen"
        component={GeneralSignUpOne}
      />
      <Stack.Screen
        name="Fourth screen"
        component={GeneralSignUpTwo}
      />
      <Stack.Group
        screenOptions={{
          presentation: "card"
        }}
      >
        {features.map((feat, index) =>
          <Stack.Screen
            name={feat.name}
            key={feat.name}
            component=
            {ManagementInformationInSignUpComp}
          />
        )}
      </Stack.Group>
      <Stack.Screen
        name="Theme select"
        component={ThemeSelect}
      />
      <Stack.Screen
        name="Other app infos"
        component={OtherAppInfos}
      />
    </Stack.Navigator>


  )
}



export default SignUp;
