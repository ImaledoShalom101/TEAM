import { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from "react-native"
import {
  Avatar,
  Text,
  TextInput,
  Button,
  IconButton,
  useTheme
} from "react-native-paper";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// MAKE A Created by Aura COMPONENT BY JOINING
// TEXT "Created by" AND Aura logo

//const organizationsAmong = []
const organizationsAmong = [
  {
    name: "Aura",
    logo: require("../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")
  }, {
    name: "OTHER ORG",
    logo: require("../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")
  }]
/*,
{
  name: "JJI",
  logo: require("../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")
},
{
  name: "BCH",
  logo: require("../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")
},
{
  name: "FST",
  logo: require("../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")
}
];*/


const SignIn = ({ navigation }) => {
  const [viewPassword, setViewPassword] = useState(true);
  const theme = useTheme()
  const { height, width } = useWindowDimensions();
  const [selectedOrgToLogInto, setSelectedOrgToLogInto] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [orgToLogIntoError, setOrgToLogIntoError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);
  const orgToLogIntoScroll = useRef();
  const allow = useRef(true);

  const OrgView = (item) => (
    <View key={item.name} style={{ alignItems: "center" }}>
      <Pressable onPress={() => { setSelectedOrgToLogInto((val) => val === item.name ? "" : item.name); !allow.current ? allow.current = true : null; orgToLogIntoError ? setOrgToLogIntoError(false) : null; }}
        style={{ width: "100%", columnGap: 5, paddingHorizontal: 10, borderWidth: selectedOrgToLogInto === item.name ? 1.75 : 1, borderColor: selectedOrgToLogInto === item.name ? theme.colors.primary : orgToLogIntoError && item.name === organizationsAmong[0].name ? "#ff0000" : "#808080dc", height: 55, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Avatar.Image size={45} source={item.logo} />
        <Text style={{ color: selectedOrgToLogInto === item.name ? theme.colors.primary : null, flex: 1, textAlign: "center", fontWeight: "700" }} variant="titleLarge" numberOfLine={1}>
          {item.name}
        </Text>
      </Pressable>
    </View >
  )

  function proceedToLogin() {
    if (!selectedOrgToLogInto) {
      allow.current = false;
      !orgToLogIntoError ? setOrgToLogIntoError(true) : null;
      orgToLogIntoScroll.current.scrollTo({ y: 0 });
    }

    if (!loginPassword) {
      allow.current = false;
      !loginPasswordError ? setLoginPasswordError(true) : null
    }

    if (allow.current == false) return null;

    navigation.replace("Drawer");
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ justifyContent: "center" }}
      style={{ paddingTop: Constants.statusBarHeight, height: 100, padding: 10 }}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >

      <View style={{ height: height * .6669, alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "700", top: height * .05 }} variant="displayMedium">
            Log In
          </Text>
        </View>
        <View style={{ flex: (organizationsAmong.length * 55) + ((organizationsAmong.length - 1) * 16) < ((height * .6669) / 2) ? null : 1, rowGap: 20, alignItems: "center", width: "100%" }}>
          {
            organizationsAmong ?
              <ScrollView
                snapToInterval={55}
                overScrollMode="never"
                ref={orgToLogIntoScroll}
                nestedScrollEnabled
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                fadingEdgeLength={50}
                contentContainerStyle={{ rowGap: 16, width: "100%", alignItems: "center" }}
              >
                {
                  organizationsAmong.map(
                    OrgView
                  )
                }
              </ScrollView>
              :
              null
            // VECTOR ILLUSTRATION FOR EMPTY ORGANIZATIONS LIST
          }
          <View style={{ justifyContent: "center", width: "100%" }}>
            <TextInput
              label="Input Password"
              onChangeText={(value) => { setLoginPassword(value); !allow.current ? allow.current = true : null; loginPasswordError ? setLoginPasswordError(false) : null; }}
              error={loginPasswordError}
              mode="outlined"
              caretHidden
              textContentType="password"
              secureTextEntry={viewPassword}
              autoCapitalize="none"
              blurOnSubmit
              outlineStyle={{ borderRadius: 10, borderTopWidth: .5, borderLeftWidth: .5 }}
              right={<TextInput.Icon icon={viewPassword ? "eye" : "eye-off-outline"} rippleColor="rgba(0,0,0,0)" color={theme.colors.primary} onPress={() => setViewPassword((val) => !val)} />}
            />
          </View>
        </View>
      </View>
      <View style={{ height: height * .3331, alignItems: "center", justifyContent: "center" }}>
        <Button
          uppercase
          mode="contained"
          labelStyle={{ fontSize: 20 }}
          contentStyle={{ height: 43 }}
          onPress={proceedToLogin}
        >
          Sign In
        </Button>
      </View>
    </KeyboardAwareScrollView>
  )

  return (
    <SafeAreaView style={{ paddingTop: Constants.statusBarHeight, flex: 1, padding: 10, justifyContent: "center" }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={{ flex: 2, alignItems: "center" }}>
          <View style={{ flex: .9 }}>
            <Text style={{ fontWeight: "700", top: height * .05 }} variant="displayMedium">
              Log In
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", alignItems: "center", flex: 1, width: "100%" }}>
            {/*<View style={{ flex: 1 }}>*/}
            <ScrollView
              style={{ flex: .3 }}
            >
              {
                organizationsAmong.map(
                  OrgView
                )
              }
            </ScrollView>
            {/*<FlatList
                data={organizationsAmong}
                renderItem={OrgView}
                ItemSeparatorComponent={
                  <View style={{ paddingVertical: 8 }} />
                }
                extraData={selectedOrgToLogInto}
              />*/}
            {/*</View>*/}
            <View style={{ justifyContent: "center", width: "100%", flex: .8 }}>
              <TextInput
                label="Input Password"
                mode="outlined"
                caretHidden
                textContentType="password"
                secureTextEntry={viewPassword}
                autoCapitalize="none"
                blurOnSubmit
                outlineStyle={{ borderRadius: 10, borderTopWidth: .5, borderLeftWidth: .5 }}
                right={<TextInput.Icon icon={viewPassword ? "eye" : "eye-off-outline"} rippleColor="rgba(0,0,0,0)" color={(isFocused) => isFocused ? theme.colors.primary : null} onPress={() => setViewPassword((val) => !val)} />}
              />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
          <Button
            uppercase
            mode="contained"
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 43 }}
            onPress={() => console.warn(selectedOrgToLogInto)}
          >
            Sign In
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}


export default SignIn;