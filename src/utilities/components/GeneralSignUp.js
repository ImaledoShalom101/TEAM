import { useState, useEffect, useRef } from "react";
import {
  useWindowDimensions,
  View,
  StyleSheet,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  Text,
  ActivityIndicator,
  useTheme,
  TextInput,
  HelperText,
  SegmentedButtons,
  Dialog,
  Icon,
  Checkbox,
  ToggleButton,
  Button,
  Portal
} from "react-native-paper";
import SignUpBackground from "./SignUpBackground";
import SignUpInput from "./SignUpInput";
import PhoneInput from 'react-native-international-phone-number';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { OtpInput } from "react-native-otp-entry";


let data = {
  orgName: "Aura",
}
/*
data.userFullname = userFullname.trim();
    data.userUsername = userUsername.trim();
    data.userEmailAddress = userEmailAddress.trim();
    data.userPhoneNumber = userPhoneNumber.replace(" ", "");
    data.userCountryCode = selectedCountry.callingCode
    data.userCountry = selectedCountry.name.en
*/
const currentUsernames = ["one", "two", "three", "four", "five"];


export const GeneralSignUpOne = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const [userFullname, setUserDateOfBirth] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userEmailAddress, setUserEmailAddress] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")

  //const [agreeToTermsAndConditions, setAgreeToTermsAndConditions] = useState(false)

  const [theHelperText, setTheHelperText] = useState("This does not necessarily need to be long or complex.")

  //const [allowNewPasswordShow, setAllowNewPasswordShow] = useState(false)
  //const [allowReEnteredPasswordShow, setAllowReEnteredPasswordShow] = useState(false)

  const [userDateOfBirthError, setUserDateOfBirthError] = useState(false);
  const [userUsernameError, setUserUsernameError] = useState(false);
  const [userEmailAddressError, setUserEmailAddressError] = useState(false);
  const [userPhoneNumberError, setUserPhoneNumberError] = useState(false);

  //const [agreeToTermsAndConditionsError, setAgreeToTermsAndConditionsError] = useState(false)
  const [usernameHint, setUsernameHint] = useState(false);
  const [typeOfHelperTextForUsername, setTypeOfHelperTextForUsername] = useState("info")
  let allowIn = true;
  const [blockAllFunctions, setBlockAllFunctions] = useState(false);

  const [showOtpVerificationView, setShowOtpVerificationView] = useState(false);
  const [otpBeingVerified, setOtpBeingVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);
  //const [otpText, setOtpText] = useState("");
  const otpText = useRef("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [otpWrongEntry, setOtpWrongEntry] = useState(false);


  function verifyOtpAndContinue(pass) {
    setBlockAllFunctions(true);

    if (!userFullname) {
      setUserDateOfBirthError(true);
      allowIn = false;
    } else {
      setUserDateOfBirthError(false);
    }
    if (!userUsername || typeOfHelperTextForUsername === "error") {
      setTypeOfHelperTextForUsername("error");
      setTheHelperText("Creating a username is required.");
      setUsernameHint(true)
      allowIn = false;
    } else {
      setUsernameHint(false)
    }
    if (!userEmailAddress) {
      setUserEmailAddressError(true);
      allowIn = false;
    } else {
      setUserEmailAddressError(false);
    }
    if (!userPhoneNumber) {
      setUserPhoneNumberError(true);
      allowIn = false;
    } else {
      setUserPhoneNumberError(false);
    }
    /*if (!agreeToTermsAndConditions) {
      setAgreeToTermsAndConditionsError(true);
      allowIn = false;
    } else {
      setAgreeToTermsAndConditionsError(false);
    }*/

    if (!allowIn) return setBlockAllFunctions(false);

    //console.warn(selectedCountry.name.en, selectedCountry.callingCode);
    //console.warn(userPhoneNumber.length);
    Keyboard.dismiss()
    setShowOtpVerificationView(true)
  }

  function goToNext() {
    data.userFullname = userFullname.trim();
    data.userUsername = userUsername.trim();
    data.userEmailAddress = userEmailAddress.trim();
    data.userPhoneNumber = userPhoneNumber.replace(" ", "");
    data.userCountryCode = selectedCountry.callingCode
    data.userCountry = selectedCountry.name.en

    navigation.navigate("Fourth screen")

    setBlockAllFunctions(false)
  }

  function checkIfUsernameIsUsedAndWarn(value) {
    setUserUsername(value);
    if (currentUsernames.includes(value.trim())) {
      setTypeOfHelperTextForUsername("error");
      setTheHelperText("This username is already in use. Please change!");
    } else if (value.includes(" ")) {
      setTypeOfHelperTextForUsername("error");
      setTheHelperText("Spaces are not allowed.");
      setUserUsername(userUsername.trim());
    } else {
      typeOfHelperTextForUsername !== "info" ? setTypeOfHelperTextForUsername("info") : null;
      !(theHelperText.includes("not necessarily need to be")) ? setTheHelperText("This does not necessarily need to be long or complex.") : null;
    }
  }

  function beginOtpRetrieval() {
    setOtpCountdown(30);
    setOtpBeingVerified(true);
  }

  function submitOtp() {
    setShowSpinner(true);
    // VERIFY OTP HERE!!!
    setTimeout(() => {
      if (otpText.current !== "12345") {// YOU CAN REMOVE/DELETE THE if STATEMENT, NOT ITS CONTENT OO
        otpWrongEntry ? null : setOtpWrongEntry(true)
        setShowSpinner(false);
        console.warn(otpText.current)
        return;
      } else console.warn("Went")
    }, 2000)
    // UNCOMMENT ALL BELOW WHEN VERIFICATION IS SET !!!
    //setShowOtpVerificationView(false);
    //setOtpBeingVerified(false);
    //goToNext();

  }

  useEffect(() => {
    const otpCountInterval = setInterval(() => {
      setOtpCountdown((prev) => prev - 10);
    }
      , 1000);


    if (otpCountdown <= 0) {
      clearInterval(otpCountInterval);
    }

    return () => {
      clearInterval(otpCountInterval)
    }
  }

    , [otpCountdown])

  useEffect(() => {
    if (showOtpVerificationView == false) {
      //setOtpText("");
      otpText.current = "";
      setOtpBeingVerified(false);
      setOtpWrongEntry(false);
    } else {
      showSpinner ? setShowSpinner(false) : null
    }
  }
    , [showOtpVerificationView])



  return (
    <SignUpBackground
      toWhere={verifyOtpAndContinue}
      forPrevious={() => navigation.goBack()}
      progressBarValue={.5}
    >
      {
        showOtpVerificationView ?
          <Portal>
            <BlurView tint="light" intensity={17} style={{ flex: 1 }}>
              <Dialog
                visible={showOtpVerificationView}
                onDismiss={() => setShowOtpVerificationView(false)}
                dismissable={false}
              >
                <Dialog.Title>OTP</Dialog.Title>
                <Dialog.Content>
                  <View style={{ marginVertical: 25, rowGap: 20 }}>
                    {
                      otpBeingVerified ?
                        <View style={{ rowGap: 25 }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <HelperText>
                              OTP has been sent to your email
                            </HelperText>
                            <Icon
                              source="check-circle"
                              color="#0080006b"
                              size={16}
                            />
                          </View>
                          <OtpInput
                            numberOfDigits={5}
                            onFilled={submitOtp}
                            onTextChange={(value) => { otpText.current = value }}
                            hideStick
                            focusColor="green"
                            theme={{ containerStyle: { paddingHorizontal: 10 }, pinCodeContainerStyle: { borderColor: theme.colors.primary } }}
                          />
                          {
                            showSpinner ?
                              <ActivityIndicator
                                animating={showSpinner}
                              />
                              :
                              otpWrongEntry ?
                                <Text style={{ color: "#ff0000", alignSelf: "center" }}>Wrong OTP</Text>
                                :
                                <Text style={{ opacity: .85, alignSelf: "center" }}>
                                  {otpCountdown > 0 ? `Expires in ${otpCountdown} second${otpCountdown <= 1 ? "" : "s"}. ` : ""}{
                                    otpCountdown <= 20 ?
                                      <Text onPress={() => console.warn("big")} style={{ color: "#0000ffa8" }}>Resend</Text>
                                      :
                                      null
                                  }
                                </Text>

                          }
                        </View>
                        :
                        <Button
                          mode="contained"
                          style={{ borderRadius: 5, alignSelf: "center" }}
                          onPress={() => beginOtpRetrieval()}
                          icon="send-clock"
                          contentStyle={{ flexDirection: "row-reverse" }}
                        >Send OTP</Button>
                    }
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setShowOtpVerificationView(false)}>Cancel</Button>
                </Dialog.Actions>
              </Dialog>
            </BlurView>
          </Portal>
          :
          null
      }
      <ScrollView
        fadingEdgeLength={10}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="always"
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 13, rowGap: 20, paddingBottom: 13, paddingTop: 5 }}
      >
        <View style={{ rowGap: 5 }}>
          <Text variant="titleMedium" style={{ fontStyle: "italic", fontWeight: 600, color: theme.colors.primary }}>About you</Text>
          <SignUpInput
            label="Enter your full name"
            placeholderTextColor={theme.colors.primary}
            placeholder="Surname  First name  Middle name"
            visible={userDateOfBirthError}
            autoCapitalize="words"
            typeOfHelperText="error"
            textOfHelper="Your full name is required. Please fill!"
            onChangeText={setUserDateOfBirth}
          />
        </View>

        <SignUpInput
          label="Create your username"
          value={userUsername}
          textOfHelper={theHelperText}
          visible={usernameHint}
          typeOfHelperText={typeOfHelperTextForUsername}
          onFocus={() => setUsernameHint(true)}
          onBlur={() => setUsernameHint(false)}
          onChangeText={checkIfUsernameIsUsedAndWarn}
        />
        <SignUpInput
          label="Input your email address"
          onChangeText={setUserEmailAddress}
          autoComplete="email"
          inputMode="email"
          visible={userEmailAddressError}
          typeOfHelperText="error"
          textOfHelper="Please fill in your email address."
        />
        <View>
          <PhoneInput
            value={userPhoneNumber}
            onChangePhoneNumber={setUserPhoneNumber}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={setSelectedCountry}
            phoneInputStyles={{
              container: {
                backgroundColor: "rgb(248,213,255)",
                borderColor: theme.colors.primary,
                borderRadius: 5
              },
              flagContainer: {
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: "rgb(248,213,255)"
              },
              divider: {
                borderColor: theme.colors.primary
              },
              caret: {
                color: theme.colors.primary
              },
              callingCode: {
                color: theme.colors.primary
              },
              input: {
                color: theme.colors.primary
              }
            }}
            modalStyles={{
              modal: {
                backgroundColor: "rgb(248,213,255)"
              },
              searchInput: {
                borderColor: theme.colors.primary
              },
              countryButton: {
                borderColor: theme.colors.primary
              }
            }}
            placeholder="Input phone number"
          />
          {
            userPhoneNumberError ?
              <HelperText
                padding="none"
                visible={userPhoneNumberError}
                style={{ color: "#ff0000", fontSize: 11, letterSpacing: .17 }}
              >
                Please fill in your phone number.
              </HelperText>
              :
              null
          }
        </View>

      </ScrollView>
    </SignUpBackground>
  )
}

const features = [ // A LIST OF name OF ALL MANAGEMENT INFO COMP
  "Upload email addresses",
  "Configure settings",
  "Upload too",
]


export const GeneralSignUpTwo = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  const [userDateOfBirth, setUserDateOfBirth] = useState(dayjs());
  const [shownUserDateOfBirth, setShownUserDateOfBirth] = useState(userDateOfBirth.format("MM-DD"));
  const [showUserDateOfBirthPortal, setShowUserDateOfBirthPortal] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordWrittenAgain, setUserPasswordWrittenAgain] = useState("");
  const [agreeToTermsAndConditions, setAgreeToTermsAndConditions] = useState(false);

  const [allowNewPasswordShow, setAllowNewPasswordShow] = useState(false);
  const [allowReEnteredPasswordShow, setAllowReEnteredPasswordShow] = useState(false);

  const [userDateOfBirthError, setUserDateOfBirthError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [userPasswordWrittenAgainError, setUserPasswordWrittenAgainError] = useState(false);
  const [agreeToTermsAndConditionsError, setAgreeToTermsAndConditionsError] = useState(false);

  const [userPasswordWrittenAgainErrorText, setUserPasswordWrittenAgainErrorText] = useState("Please input your password here once more!");
  let allowIn = true;
  const [blockAllFunctions, setBlockAllFunctions] = useState(false);


  function goToNext() {
    console.warn(userDateOfBirth);

    setBlockAllFunctions(true)
    if (!userDateOfBirth) {
      setUserDateOfBirthError(true);
      allowIn = false;
    } else {
      setUserDateOfBirthError(false);
    }
    if (!userPassword) {
      setUserPasswordError(true);
      allowIn = false;
    } else {
      setUserPasswordError(false);
    }
    if (!userPasswordWrittenAgain) {
      setUserPasswordWrittenAgainError(true);
      allowIn = false;
    } else {
      setUserPasswordWrittenAgainError(false);
    }
    if (userPasswordWrittenAgain !== userPassword && userPasswordWrittenAgain.trim() && userPassword.trim()) {
      setUserPasswordWrittenAgainErrorText("This is different from your above password.")
      setUserPasswordWrittenAgainError(true);
      allowIn = false;
    } else {
      userPasswordWrittenAgainErrorText.includes("This is different") ? setUserPasswordWrittenAgainErrorText("Please input your password here once more!") : null;
      userPasswordWrittenAgainError ? setUserPasswordWrittenAgainError(false) : null;
    }
    if (!agreeToTermsAndConditions) {
      setAgreeToTermsAndConditionsError(true);
      allowIn = false;
    } else {
      setAgreeToTermsAndConditionsError(false);
    }

    if (!allowIn) return setBlockAllFunctions(false);

    Keyboard.dismiss()
    data.userDateOfBirth = userDateOfBirth;
    data.userPassword = userPassword;

    setBlockAllFunctions(false)


    navigation.reset({
      index: 0,
      routes: [{ name: features[0] }]
    })
  }
  //const [selectedDate, setSelectedDate] = useState('');


  return (
    <SignUpBackground
      toWhere={goToNext}
      forPrevious={() => navigation.goBack()}
      progressBarValue={.75}
    >
      <ScrollView fadingEdgeLength={10} showsVerticalScrollIndicator={false} overScrollMode="never" keyboardShouldPersistTaps="always" style={{ width: "100%" }} contentContainerStyle={{ paddingHorizontal: 13, rowGap: 20, paddingBottom: 13, paddingTop: 5 }}>
        <View style={{ rowGap: 5 }}>
          <Text variant="titleMedium" style={{ fontStyle: "italic", fontWeight: 600, color: theme.colors.primary }}>About you</Text>
          <Pressable onPress={() => setShowUserDateOfBirthPortal(true)}>
            <SignUpInput
              label="Enter your date of birth"
              inputMode="none"
              editable={false}
              visible={userDateOfBirthError}
              typeOfHelperText="error"
              textOfHelper="Your date of birth is required. Please fill!"
              value={shownUserDateOfBirth}
            />
          </Pressable>
        </View>
        {
          showUserDateOfBirthPortal ?
            <Portal>
              <BlurView tint="light" intensity={17} style={{ flex: 1 }}>
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                  <View style={{ alignItems: "center", width: "90%", borderWidth: 1, borderColor: "rgb(211,13,255)", backgroundColor: "white", paddingBottom: 8, borderRadius: 20 }}>
                    {/*<DatePicker
                      onSelectedChange={date => setSelectedDate(date)}
                      selected={getFormatedDate(`${(new Date().getMonth()) + 1}-${new Date().getDate()}`, 'MM/DD')}
                    />*/}
                    <DateTimePicker
                      mode="single"
                      date={userDateOfBirth}
                      onChange={({ date }) => { setUserDateOfBirth(date); setShownUserDateOfBirth(date.format("MM-DD")); setTimeout(() => setShowUserDateOfBirthPortal(false), 1000) }}
                      selectedItemColor="rgb(211,13,255)"
                    />
                    <HelperText style={{ textAlign: "center", color: "#0000ff9e", fontSize: 11, letterSpacing: .17 }}>
                      Only the selected month and date will be saved.
                    </HelperText>
                  </View>
                </View>
                {/* IT COULD COVER WHEN MONTH IS "DECEMBER",
                BUT WHEN IT'S "MAY", IT DOESN'T CIVER IT AGAIN BECAUSE
                THE YEAR DIGITS SHIFT
                <View style={{ position: "absolute", width: "16%", backgroundColor: "white", height: "4%", left: width * .55, top: height * .27 }} />*/}
              </BlurView>
            </Portal>
            :
            null
        }
        <SignUpInput
          label="Create your new password"
          visible={userPasswordError}
          typeOfHelperText="error"
          textOfHelper="Please input a new password!"
          secureTextEntry={!allowNewPasswordShow}
          onChangeText={setUserPassword}
          textInputRightComp={<TextInput.Icon onPress={() => setAllowNewPasswordShow((value) => !value)} icon={allowNewPasswordShow ? "eye" : "eye-off-outline"} forceTextInputFocus={false} rippleColor="rgba(0,0,0,0)" color={theme.colors.primary} />}
        />
        <SignUpInput
          label="Enter your password again"
          visible={userPasswordWrittenAgainError}
          typeOfHelperText="error"
          textOfHelper={userPasswordWrittenAgainErrorText}
          secureTextEntry={!allowReEnteredPasswordShow}
          onChangeText={setUserPasswordWrittenAgain}
          textInputRightComp={<TextInput.Icon onPress={() => setAllowReEnteredPasswordShow((value) => !value)} icon={allowReEnteredPasswordShow ? "eye" : "eye-off-outline"} forceTextInputFocus={false} rippleColor="rgba(0,0,0,0)" color={theme.colors.primary} />}
        />
        <View style={{ rowGap: 5 }}>
          <View style={{ alignItems: "center" }}>
            <Pressable onPress={() => console.warn("mic")} style={{ alignItems: "center", justifyContent: "center", height: width < 290 ? width - 26 : width > 500 ? 500 : 290, width: width < 290 ? width - 26 : width > 500 ? 500 : 290, borderRadius: 30, backgroundColor: theme.colors.primary.replace(", 1)", ", .3)") }}>
              <Icon source="camera" size={width < 290 ? (3 / 5) * width : width > 500 ? (3 / 5) * 500 : (3 / 5) * 290} color={theme.colors.primary} />
              <Text style={{ fontSize: 20, color: theme.colors.primary }}>
                Upload profile picture
              </Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              status={agreeToTermsAndConditions ? "checked" : "unchecked"}
              onPress={() => setAgreeToTermsAndConditions((change) => !change)}
              uncheckedColor={agreeToTermsAndConditionsError ? "red" : null}
            />
            <Button>
              Agree to terms and conditions
            </Button>
          </View>
        </View>
      </ScrollView>
    </SignUpBackground>
  )
}




