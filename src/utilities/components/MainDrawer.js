import { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
  useTheme,
  Avatar,
  Text,
  Badge,
  List,
  Button,
  Icon,
  IconButton,
  Divider,
  Drawer as ItemOfDrawer,
  Portal,
  Modal,
  Dialog,
  TextInput,
  HelperText,
} from "react-native-paper";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
  ToastAndroid,
  AlertIOS,
  Platform,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import {
  useDrawerStatus,
  DrawerItemList,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import MyHeader from "./MyHeader";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../screens/Home";
import ActivitiesTasks from "../../screens/ActivitiesTasks";
import Dashboard from "../../screens/Dashboard";
import Members from "../../screens/Members";
import Announcement from "../../screens/Announcement";
import Settings from "../../screens/Settings";
import * as Clipboard from "expo-clipboard";
import { BlurView } from 'expo-blur';
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const data = {
  orgName: "Aura",
  admin: true,
  aboutOrgText: "",
  registrationDate: "16/02/24",
  orgPaymentPlanAndColor: {
    plan: "Common", color: "grey",
    //plan: "Advanced", color: "blue",
    //plan: "All-in-one", color: "purple",
  }
}

const ScreenSelect = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName={data.admin ? "Members" : "Dashboard"}
  >
    <Stack.Screen
      name="Members"
      component={Members}
    />
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
    />
  </Stack.Navigator>
)

const DDrawer = (props) => {
  const [orgName, setOrgName] = useState("Org Name");
  const [accountExpansionExpanded, setAccountExpansionExpanded] = useState(false);
  const closedDrawer = useDrawerStatus() === "closed";
  const [accountChevronUp, setAccountChevronUp] = useState(false);
  const [showAboutOrgModal, setShowAboutOrgModal] = useState(false);
  const [showAboutOrgModalEdit, setShowAboutOrgModalEdit] = useState(false);
  const [showStarUs, setShowStarUs] = useState(false);
  const [numberOfStars, setNumberOfStars] = useState(5);
  const [submitReviewButtonLoad, setSubmitReviewButtonLoad] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const { width, height } = useWindowDimensions();
  const [letHelperTextShow, setLetHelperTextShow] = useState(false);
  const [modifiableAboutOrgText, setModifiableAboutOrgText] = useState(data.aboutOrgText);
  const [textModifiableAboutOrgTextIsBeingEditedTo, setTextModifiableAboutOrgTextIsBeingEditedTo] = useState(modifiableAboutOrgText);
  const [heightAboutToTextInputIsToTake, setHeightAboutToTextInputIsToTake] = useState(100);

  const theme = useTheme();

  useEffect(() => { if (closedDrawer && accountChevronUp) { setAccountChevronUp(false) } }, [closedDrawer])

  const submitReview = async () => {
    if (reviewText.trim().length == 0) {
      setLetHelperTextShow(true);
      return null
    }

    setSubmitReviewButtonLoad(true);

    await Clipboard.setStringAsync(reviewText);
    if (Platform.OS === "android") {
      ToastAndroid.show("Your review has been copied to your clipboard.", ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("Your review has been copied to your clipboard.")
    }
    // LINK TO PLAY STORE REVIEW SECTION COMES HERE
    setShowStarUs(false);
    setSubmitReviewButtonLoad(false);
  }

  return (
    <SafeAreaView style={STYLES.forSafeAreaView}>
      <View style={STYLES.forAccordionView}>

        <View style={{ columnGap: 5, paddingHorizontal: 10, borderWidth: .6, height: 50, borderRadius: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Avatar.Image size={40} source={require("../../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")} />
          <Text variant="titleMedium" numberOfLine={1}>
            {orgName}
          </Text>
          <IconButton
            icon={!accountChevronUp ? "chevron-down" : "chevron-up"}
            color="black"
            size={20}
            rippleColor="rgba(0,0,0,0)"
            onPress={() => setAccountChevronUp(!accountChevronUp)}
          />
        </View>
        {
          accountChevronUp ?
            <View style={{ alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
              <Button icon="logout-variant">Log into another account</Button>
            </View>
            : null
        }
      </View>

      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Divider horizontalInset />
      <View style={STYLES.forFooterView}>
        {
          showStarUs ?
            <Portal>
              <BlurView tint="light" intensity={17} style={{ flex: 1 }}>
                <Dialog
                  visible={showStarUs}
                  onDismiss={() => setShowStarUs(false)}
                  dismissable={false}
                >
                  <Dialog.Title>Star Us</Dialog.Title>
                  <Dialog.Content>
                    <View style={{ alignItems: "center", rowGap: 35 }}>
                      <View style={{ flexDirection: "row", columnGap: 2 }}>
                        {[1, 2, 3, 4, 5].map((i) =>
                          <Pressable onPress={() => setNumberOfStars(i)} key={i.toString()}>
                            <Icon
                              source="star"
                              color={numberOfStars >= i ? "yellow" : "grey"}
                              size={42}
                            />
                          </Pressable>
                        )}
                      </View>
                      <View style={{ rowGap: 20 }}>
                        <Text variant="labelLarge" style={{ textAlign: "center" }}>
                          {`Could you please comment? We'd so much appreciate it.`}
                        </Text>
                        <View>
                          <TextInput
                            contentStyle={{ width: (width / 100) * 75 }}
                            placeholder="Write your review here"
                            multiline
                            // THIS COMPONENT IS LOOSE:
                            // A USER CAN WRITE LONG IN THE TEXT INPUT SO LONG
                            // THAT THE TEXT BOX FALLS OUT OF THE SCREEN
                            onChangeText={(value) => setReviewText(value)}
                          />
                          {// FIX BUG ON WHY IT'S NOT SHOWING
                            letHelperTextShow ?
                              <HelperText padding="none" style={{ color: "#0000ff9e", fontSize: 10.5, letterSpacing: .15 }} visible={reviewText.trim().length == 0 && letHelperTextShow}>
                                Your review is not written yet. Even two words will do. 💙
                              </HelperText>
                              :
                              null
                          }
                        </View>
                      </View>
                    </View>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={() => { setShowStarUs(false); setLetHelperTextShow(false) }}>Cancel</Button>
                    <Button onPress={() => submitReview()} loading={submitReviewButtonLoad} style={{ borderRadius: 13 }} mode="contained">Submit</Button>
                  </Dialog.Actions>
                </Dialog>
              </BlurView>
            </Portal>
            :
            null
        }
        {showAboutOrgModal ?
          <Portal>
            <BlurView tint="light" intensity={17} style={{ opacity: showAboutOrgModal ? 1 : 0, height: "100%", width: "100%" }}>
              <Modal visible={showAboutOrgModal} onDismiss={() => setShowAboutOrgModal(false)} contentContainerStyle={{ alignItems: "center", justifyContent: "center", width: "95%" }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <View style={{ borderRadius: 15, paddingBottom: 9, paddingTop: 9, rowGap: 10, width: "95%", height: "95%", backgroundColor: "white" }}>
                  <View style={{ justifyContent: "space-between", alignItems: "center", width: "100%", flexDirection: "row" }}>
                    <IconButton
                      icon="close"
                      iconColor={theme.colors.primary}
                      onPress={() => setShowAboutOrgModal(false)}
                    />
                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={1} variant="headlineMedium" style={{ textAlign: "center" }}>
                        About {data.orgName}
                      </Text>
                    </View>
                    {
                      data.admin ?
                        <IconButton
                          icon="pencil"
                          iconColor={theme.colors.primary}
                          style={modifiableAboutOrgText ? null : { opacity: 0 }}
                          onPress={() => modifiableAboutOrgText ? setShowAboutOrgModalEdit(true) : null}
                        />
                        :
                        null
                    }
                  </View>
                  <ScrollView contentContainerStyle={{ paddingBottom: 6, rowGap: 15, flex: modifiableAboutOrgText ? null : 1, paddingHorizontal: 9, justifyContent: modifiableAboutOrgText ? "flex-start" : "center" }}>
                    <Text variant={modifiableAboutOrgText ? "labelLarge" : "displaySmall"} style={modifiableAboutOrgText ? null : { opacity: .5, textAlign: "center", textAlignVertical: "center" }}>
                      {modifiableAboutOrgText ? modifiableAboutOrgText : "About info is empty."}
                    </Text>
                    {
                      modifiableAboutOrgText ?
                        <View style={{ rowGap: 1 }}>
                          <Text variant="labelSmall" style={{ opacity: .6 }}>
                            {data.orgName}'s payment plan:    <Text variant="labelMedium" style={{ color: data.orgPaymentPlanAndColor.color }}>{data.orgPaymentPlanAndColor.plan}</Text>
                          </Text>
                          <Text variant="labelSmall" style={{ opacity: .6 }}>
                            {data.orgName} account created on:    {data.registrationDate}
                          </Text>
                        </View>
                        :
                        null
                    }
                  </ScrollView>
                  {
                    data.admin ?
                      modifiableAboutOrgText ?
                        null
                        :
                        <IconButton
                          icon="plus"
                          mode="contained"
                          size={30}
                          style={{ position: "absolute", bottom: 10, right: 10 }}
                          onPress={() => setShowAboutOrgModalEdit(true)}
                        />
                      :
                      null
                  }
                </View>
              </Modal>
            </BlurView>
          </Portal>
          :
          null
        }
        {
          showAboutOrgModalEdit ?
            <Portal>
              <View style={{ backgroundColor: "white", height: "100%", paddingTop: Constants.statusBarHeight }}>
                <View style={{ paddingHorizontal: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <IconButton
                    icon="close"
                    onPress={() => { setShowAboutOrgModal(false); setShowAboutOrgModalEdit(false) }}
                  />
                  <Button mode="contained" onPress={() => { setModifiableAboutOrgText(textModifiableAboutOrgTextIsBeingEditedTo); setShowAboutOrgModalEdit(false) }} style={{ borderRadius: 10 }}>
                    Save
                  </Button>
                </View>
                <View onLayout={({ nativeEvent }) => setHeightAboutToTextInputIsToTake(nativeEvent.layout.height)} style={{ flex: 1 }}>
                  <TextInput
                    multiline
                    mode="outlined"
                    value={textModifiableAboutOrgTextIsBeingEditedTo}
                    placeholder={`Write about ${data.orgName} here.\nMembers can view this.`}
                    onChangeText={setTextModifiableAboutOrgTextIsBeingEditedTo}
                    style={{ flex: 1, height: heightAboutToTextInputIsToTake }}
                    outlineStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                  />
                </View>
              </View>
            </Portal>
            :
            null
        }

        <ItemOfDrawer.Item
          label={`About ${orgName}`}
          icon="wikipedia"
          onPress={() => setShowAboutOrgModal(true)}
        />

        <ItemOfDrawer.Item
          label="Star MEMBERS App"
          icon={() => <Icon source="star" color="yellow" size={35} />}
          onPress={() => setShowStarUs(true)}

        />
        <ItemOfDrawer.Item
          label={data.admin ? "Unlock More Features" : "Register An Organization"}
          icon={() => <View style={{ transform: [{ rotate: "30deg" }] }}><Icon source="lock-open" color="blue" size={24} /></View>}
          rippleColor="rgba(0,0,0,0)"
          onPress={() => setOrgName("warn e o")}
        />
      </View>
    </SafeAreaView>
  )
}


const DDrawerLabelWithBadge = ({ itemName, opacity = 1 }) => {
  // SAME badgeUnread STATE IN MyHeader.js
  const [badgeUnread, setbadgeUnread] = useState(true);
  const theme = useTheme();
  const [themePrimaryColor, setThemePrimaryColor] = useState(theme.colors.primary);


  return (
    <View style={{ opacity: opacity, columnGap: 9, flexDirection: "row" }}>
      <Text numberOfLines={1} style={{ flex: 1 }}>{itemName}</Text>
      <Badge visible={badgeUnread} size={8} style={{ alignSelf: "center", backgroundColor: themePrimaryColor }} />
    </View>
  )
}

const MainDrawer = () => {
  const { width, height } = useWindowDimensions();

  return (

    <Drawer.Navigator
      screenOptions={{
        header: ((props) => <MyHeader {...props} />),
        swipeEdgeWidth: width,
      }}
      drawerContent={
        (props) => <DDrawer {...props} />
      }
      initialRouteName="Activities And Tasks">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, ...props }) => <Icon {...props} source={focused ? "home" : "home-outline"} />,
          drawerLabel: () => <DDrawerLabelWithBadge itemName="Home" />
        }}
      />
      <Drawer.Screen
        name="Activities And Tasks"
        component={ActivitiesTasks}
        options={{
          drawerIcon: ({ focused, ...props }) => <Icon {...props} source={focused ? "rocket-launch" : "rocket-outline"} />,
          drawerLabel: () => <DDrawerLabelWithBadge itemName="Activities & Tasks" />
        }}
      />
      <Drawer.Screen
        name="Poll & Surveys"
        component={Announcement}
        options={{
          drawerIcon: ({ focused, color, size }) => <Icon color={focused ? color : "rgba(128,128,128, .35)"} size={size} source={focused ? "chart-pie" : "poll"} />,
          drawerLabel: () => (
            <View>
              <Image source={require(`../../../assets/upgrade-tag.png`)} resizeMode="contain" style={{ width: 65, height: 60, position: "absolute", bottom: -27, right: -38 }} />
              <DDrawerLabelWithBadge opacity={.35} itemName="Poll & Surveys" />
            </View>
          ),
          //drawerItemStyle: { opacity: .35 }
        }}
      />
      <Drawer.Screen
        name="Members and Dashboard"
        component={ScreenSelect}
        options={{
          title: data.admin ? "Members" : "Dashboard",
          drawerIcon: ({ focused, ...props }) => <Icon {...props} source={focused ? data.admin ? "account-group" : "view-dashboard-variant" : data.admin ? "account-group-outline" : "view-dashboard-outline"} />,
          drawerLabel: () => <DDrawerLabelWithBadge itemName={data.admin ? "Members" : "Dashboard"} />
        }}
      />
      <Drawer.Screen
        name="Announcement"
        component={Announcement}
        options={{
          drawerIcon: ({ focused, ...props }) => <Icon {...props} source={focused ? "bell-ring" : "bell-outline"} />,
          drawerLabel: () => <DDrawerLabelWithBadge itemName="Announcement" />
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, ...props }) => <Icon {...props} source={focused ? "cog" : "cog-outline"} />,
          drawerLabel: () => <DDrawerLabelWithBadge itemName="Settings" />
        }}
      />
    </Drawer.Navigator>
  )
}


const STYLES = StyleSheet.create({
  forSafeAreaView: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  forAccordionView: {
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 10,
    width: "80%"
  },
  forFooterView: {
    marginLeft: 10,
    marginBottom: 10
  }
})

export default MainDrawer;