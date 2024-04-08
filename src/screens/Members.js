import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import {
  Text,
  Surface,
  useTheme,
  List,
  Avatar,
  Icon,
  IconButton,
  Appbar,
  Menu,
  Button,
  Portal,
  Modal,
  Searchbar,
} from "react-native-paper";
import { BlurView } from 'expo-blur';
import * as Clipboard from "expo-clipboard";
import { createStackNavigator } from "@react-navigation/stack";
import MembersEdit from "./MembersEdit";
import AchievementSystem from "./AchievementSystem";
import LinkUpload from "./LinkUpload";
import { useNavigation } from "@react-navigation/native";


const Stack = createStackNavigator();

const data = {
  admin: true,
}

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
    fullName: "Omosekafe Isaiah",
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
      [1, require("../../assets/achievements/project-pro.png")],
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

export const HeaderSideIcons = () => {
  const navigation = useNavigation();
  const [adminOptionsMenu, setAdminOptionsMenu] = useState(false);

  return (
    <>
      <Appbar.Action icon="sort-bool-ascending-variant" onPress={() => console.warn(route.param)} />
      <Appbar.Action icon="magnify" onPress={() => console.warn("MembersAndIcons.navigation")} />
      <Menu
        visible={adminOptionsMenu}
        anchorPosition="bottom"
        onDismiss={() => setAdminOptionsMenu(false)}
        anchor={<Appbar.Action icon="plus-circle-multiple-outline" onPress={() => setAdminOptionsMenu(true)} />
        }>
        <Menu.Item title="Edit Members" leadingIcon="account-edit" onPress={() => { setAdminOptionsMenu(false); navigation.navigate("members edit") }} />
        <Menu.Item title="Badges System" leadingIcon="trophy-variant" onPress={() => { setAdminOptionsMenu(false); navigation.navigate("achievement system") }} />
        <Menu.Item title="Upload Social Links" leadingIcon="share" onPress={() => { setAdminOptionsMenu(false); navigation.navigate("link upload") }} />
      </Menu>
    </>
  )
}

const Members = ({ navigation }) => {
  const theme = useTheme();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [userOptionsMenu, setuserOptionsMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [openSortMenu, setOpenSortMenu] = useState(false);


  const ListComp = ({ fullName, lastOnline, index }) => {

    return (
      <List.Item
        title={fullName}
        onPress={() => selectedMemberIndex == index ? null : setSelectedMemberIndex(index)}
        onLongPress={() => console.warn(index, selectedMemberIndex)}
        description={() => <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 3 }}>
          <Text variant="labelSmall" style={{ color: lastOnline === null ? "#00800080" : "#80808080" }}>
            {lastOnline === null ? "Online" : `Last online ${lastOnline}`}
          </Text>
          {/*<Text variant="bodySmall" style={{ color: lastOnline === null ? "#00800080" : "#80808080" }}>
          YOU CAN PUT ANOTHER TEXT HERE
        </Text>*/}
        </View>
        }
        style={{ backgroundColor: selectedMemberIndex == index ? "#23ff2312" : null }}
      />
    )
  }

  const sortIcons = {
    name: "sort-alphabet-ascending-variant",
    badge: "sort-bool-ascending-variant",
    impact: "sort-numeric-ascending-variant"
  }
  function sortBy(sortStyle) {
    setOpenSortMenu(false);
    console.warn(sortStyle);
  }

  async function copyMemberDetail(detail, detailType) {
    await Clipboard.setStringAsync(detail);
    if (Platform.OS === "android") {
      ToastAndroid.show(`${detailType} has been copied.`, ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(`${detailType} has been copied.`)
    }
  }

  {/*const Bubu = () => {


    return !openPortal ? null : (
      <Portal>
        <BlurView intensity={100} style={{ height: 200 }}>

          <Menu
            visible={userOptionsMenu}
            onDismiss={() => { setOpenPortal(false); setuserOptionsMenu(false); }}
            anchor={{ x: blurredDotsIconButtonPosition[0], y: blurredDotsIconButtonPosition[1] }}>
            <Menu.Item title="One" onPress={() => setOpenPortal(false)} />
            <Menu.Item title="Two" onPress={() => console.warn("One")} />
            <Menu.Item title="Three" onPress={() => console.warn("One")} />
          </Menu>
        </BlurView>

      </Portal>
    )
  }*/}

  return !data.admin ? null : (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 8 }}>
      {
        !showSearchBar ?
          null
          :
          <Searchbar
            value={searchBarText}
            onChangeText={setSearchBarText}
            placeholder="Search member's name"
            style={{ marginTop: 10 }}
          />
      }
      {
        selectedMemberIndex == null ?
          null
          :
          <Surface elevation={5} style={{ marginTop: 10, justifyContent: "flex-end", borderRadius: 25, height: 225 }}>
            <View style={{ position: "absolute", left: 2, right: 2, height: "20%", borderTopLeftRadius: 25, borderBottomLeftRadius: 35, opacity: .3, width: "20%", alignSelf: "flex-start", backgroundColor: theme.colors.primary }} />
            <View style={{ position: "absolute", height: "40%", borderTopStartRadius: 25, borderBottomRightRadius: 25, opacity: .3, width: "80%", alignSelf: "flex-end", backgroundColor: theme.colors.primary }} />
            <View style={{ position: "absolute", height: "70%", borderRadius: 25, borderTopRightRadius: 0, opacity: .3, width: "40%", alignSelf: "flex-end", backgroundColor: theme.colors.primary }} />
            <BlurView overflow="hidden" intensity={100} style={{ paddingHorizontal: 8, paddingTop: 4, flex: 1, width: "100%", borderRadius: 25 }}>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", columnGap: 15 }}>
                <Avatar.Image
                  source={members[selectedMemberIndex].profilePicture}
                  size={70}
                />
                <View style={{ rowGap: 7, flex: 1 }}>
                  <View style={{ rowGap: 1 }}>
                    <Text numberOfLines={1} variant="labelLarge" style={{ fontSize: 17 }}>
                      {members[selectedMemberIndex].fullName}
                    </Text>
                    <Text numberOfLines={1} variant="bodySmall" style={{ color: "#0dbbff" }}>
                      @{members[selectedMemberIndex].username}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", paddingRight: 8, alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ columnGap: 6, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                      <Text variant="labelLarge" style={{ opacity: .8 }}>
                        {members[selectedMemberIndex].numberOfBadges}
                      </Text>
                      <View style={{ columnGap: -5, flexDirection: "row" }}>
                        {
                          members[selectedMemberIndex].badges.map((achievement) => <Avatar.Image
                            key={achievement[1].toString()}
                            source={achievement[1]}
                            size={18}
                          />
                          )}
                      </View>
                    </View>
                    <View>
                      <Text variant="labelLarge" style={{ opacity: .8 }}>
                        {members[selectedMemberIndex].impacts}
                        <Text style={{ opacity: .7 }}>
                          {` Impact${parseInt(members[selectedMemberIndex].impacts) > 1 ? "s" : ""}`}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: "center", rowGap: 8, paddingHorizontal: 5 }}>
                <Text numberOfLines={1} style={{ opacity: .7 }}>
                  Contacts
                </Text>
                <View style={{ rowGap: 5, paddingLeft: 5 }}>
                  <View style={{ alignItems: "center", flexDirection: "row", columnGap: 7 }}>
                    <Icon
                      source="phone"
                      size={20}
                      color="#0bff0b"
                    />
                    <Menu
                      visible={openSortMenu}
                      onDismiss={() => setOpenSortMenu(false)}
                      anchor={<TouchableOpacity onPress={() => setOpenSortMenu(true)} delayLongPress={300} onLongPress={() => copyMemberDetail(members[selectedMemberIndex].phoneNumber, "Phone number")}>
                        <Text numberOfLines={1} variant="bodySmall">
                          {members[selectedMemberIndex].phoneNumber}
                        </Text>
                      </TouchableOpacity>}>
                      <Menu.Item title="By name alphabet" onPress={() => { sortBy("name") }} />
                      <Menu.Item title="By achievements amount" onPress={() => { sortBy("badge") }} />
                      <Menu.Item title="By impacts" onPress={() => { sortBy("impact") }} />
                    </Menu>

                  </View>
                  <View style={{ alignItems: "center", flexDirection: "row", columnGap: 7 }}>
                    <Icon
                      source="email-variant"
                      size={20}
                      color="#0dbbff"
                    />
                    <TouchableOpacity delayLongPress={300} onLongPress={() => copyMemberDetail(members[selectedMemberIndex].emailAddress, "Email address")}>
                      <Text numberOfLines={1} variant="bodySmall">
                        {members[selectedMemberIndex].emailAddress}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ paddingTop: 4, flexDirection: "row", justifyContent: "space-between" }}>


                <Menu
                  visible={userOptionsMenu}
                  onDismiss={() => setuserOptionsMenu(false)}
                  anchor={<IconButton
                    icon="dots-horizontal"
                    iconColor={theme.colors.primary}
                    style={{ height: 25 }}
                    onPress={() => setuserOptionsMenu(true)}
                  />}>
                  <Menu.Item title="Sort" onPress={() => setuserOptionsMenu(false)} />
                  <Menu.Item title="Search" onPress={() => { setuserOptionsMenu(false); setSelectedMemberIndex(null); setShowSearchBar(true) }} />
                  <Menu.Item title="Add" onPress={() => console.warn("One")} />
                  <Menu.Item title="Mail" onPress={() => setuserOptionsMenu(false)} />
                  <Menu.Item title="Call" onPress={() => console.warn("One")} />
                  <Menu.Item title="Private memo" onPress={() => console.warn("One")} />
                  <Menu.Item title={<Text style={{ color: "red" }}>{`Remove ${members[selectedMemberIndex].fullName.split(" ")[1]}`}</Text>} onPress={() => console.warn("One")} />
                </Menu>
                <Button
                  rippleColor="rgba(0,0,0,0)"
                  onPress={() => setSelectedMemberIndex(null)}>
                  Close
                </Button>
              </View>
            </BlurView>
          </Surface>
      }

      <FlatList
        data={members}
        renderItem={({ item, index }) => <ListComp {...item} index={index} />}
        showsVerticalScrollIndicator={false}
        extraData={members}
      />
    </SafeAreaView >
  )

}


const MembersAndIcons = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="link upload"
    >
      <Stack.Screen
        name="members"
        component={Members}
      />
      {
        data.admin ?
          <Stack.Group>
            <Stack.Screen
              name="members edit"
              component={MembersEdit}
            />
            <Stack.Screen
              name="achievement system"
              component={AchievementSystem}
            />
            <Stack.Screen
              name="link upload"
              component={LinkUpload}
            />
          </Stack.Group>
          :
          null
      }
    </Stack.Navigator>
  )
}

export default MembersAndIcons;