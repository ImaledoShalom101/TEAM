import { useState, useEffect } from "react";
import {
  useWindowDimensions,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import {
  Text,
  useTheme,
  Avatar,
  Icon,
  IconButton,
  ProgressBar
} from "react-native-paper";
import { BlurView } from 'expo-blur';
import AnimatedNumbers from 'react-native-animated-numbers';



const achievables = {
  "survey sage": {
    highestNumberAchievable: 25,
    inText: "Survey completer",
    icon: require("../../assets/achievements/survey-sage.png"),
    iconFade: require("../../assets/achievements/survey-sage-fade.png")
  },
  "activity aficionado": {
    highestNumberAchievable: 15,
    inText: "Activity streak",
    icon: require("../../assets/achievements/activity-aficionado.png"),
    iconFade: require("../../assets/achievements/activity-aficionado-fade.png")
  },
  "task pro": {
    highestNumberAchievable: 8,
    inText: "Task contributor",
    icon: require("../../assets/achievements/task-pro.png"),
    iconFade: require("../../assets/achievements/task-pro-fade.png")
  },
  "knowledge keeper": {
    highestNumberAchievable: 12,
    inText: "Informed reader",
    icon: require("../../assets/achievements/knowledge-keeper.png"),
    iconFade: require("../../assets/achievements/knowledge-keeper-fade.png")
  },
  "attendance ace": {
    highestNumberAchievable: 25,
    inText: "Reliable presenc",
    icon: require("../../assets/achievements/attendance-ace.png"),
    iconFade: require("../../assets/achievements/attendance-ace-fade.png")
  },
  "impact magnate": {
    highestNumberAchievable: 17,
    inText: "Total impact",
    icon: require("../../assets/achievements/impact-awarded.png"),
    iconFade: require("../../assets/achievements/impact-awarded-fade.png")
  },
  "poll proclaimer": {
    highestNumberAchievable: 25,
    inText: "Regular pollee",
    icon: require("../../assets/achievements/poll-proclaimer.png"),
    iconFade: require("../../assets/achievements/poll-proclaimer-fade.png")
  },
  "badge boss": {
    highestNumberAchievable: 25,
    inText: "Badge collector",
    icon: require("../../assets/achievements/badge-boss.png"),
    iconFade: require("../../assets/achievements/badge-boss-fade.png")
  },
  "sign-in pioneer": {
    highestNumberAchievable: 1,
    inText: "Signup pioneer",
    icon: require("../../assets/achievements/signin-pioneer.png"),
    iconFade: null
  },
  "all-star": {
    highestNumberAchievable: 1,
    inText: "All-star",
    icon: require("../../assets/achievements/all-star.png"),
    iconFade: null
  }
}

const userAchievements = {
  "Survey sage": 10,// THIS SHOULD HOLD AN ARRAY WHICH THE POSITIONS OF BADGES WON ARE INCLUDED IN
  "Activity aficionado": 14,
  "Task pro": 1,
  "Knowledge keeper": 3,
  "Attendance ace": 1,
  "Impact magnate": 4,
  "Poll proclaimer": 10,
  "Badge boss": 10,
  "Sign-in pioneer": 1,
  "All-star": 1
}

const achievementsNonCollapsedMode = [
  ["sign-in pioneer", "10/05/24", "1"], //INDEX OF ACHIEVEMENT
  ["survey sage", "10/05/24", "2"],
  ["survey sage", "10/05/24", "3"],
  ["attendance ace", "10/05/24", "4"],
  ["activity aficionado", "10/05/24", "5"],
  ["all-star", "10/05/24", "6"],
  ["attendance ace", "10/05/24", "7"],
  ["knowledge keeper", "10/05/24", "8"],
  ["sign-in pioneer", "10/05/24", "9"],
  ["sign-in pioneer", "10/05/24", "10"],
  ["survey sage", "10/05/24", "20"],
  ["survey sage", "10/05/24", "30"],
  ["attendance ace", "10/05/24", "40"],
  ["activity aficionado", "10/05/24", "50"],
  ["all-star", "10/05/24", "60"],
  ["attendance ace", "10/05/24", "70"],
  ["knowledge keeper", "10/05/24", "80"],
  ["sign-in pioneer", "10/05/24", "90"],
]

const achievementsCollapsedMode = {
  "survey sage": {
    numberAchieved: 2,
  },
  "activity aficionado": {
    numberAchieved: 4,
  },
  "task pro": {
    numberAchieved: 1,
  },
  "knowledge keeper": {
    numberAchieved: 3,
  },
  "attendance ace": {
    numberAchieved: 8,
  },
  "impact magnate": {
    numberAchieved: 5,
  },
  "poll proclaimer": {
    numberAchieved: 2,
  },
  "sign-in pioneer": {
    numberAchieved: 6,
  },
  "badge boss": {
    numberAchieved: 9,
  },
  "all-star": {
    numberAchieved: 3,
  }
}

const data = {
  userUsername: "UserName",
  userFullName: "Imaledo David Shalom",
  userEmailAddress: "shalomimaledo@gmail.com",
  userImpact: 18,
  userAchievement: achievementsNonCollapsedMode.length
}

const members = {
  "Imaledo Sharon Tolulope": {
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
  "Imaledo David Shalom": {
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
  "Omosekafe Isaiah": {
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
  "Dunsin Divine Favour": {
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
}

const Dashboard = ({ route }) => {
  //console.warn(Device.modelName)
  let memberFullName = null;
  try {
    memberFullName = route.params.memberFullName;
  } catch (err) { }
  const theme = useTheme();
  const [fullName, setfullName] = useState(memberFullName || data.userFullName);
  const [username, setUsername] = useState(memberFullName ? members[memberFullName].username : data.userUsername);
  const [emailAddress, setEmailAddress] = useState(memberFullName ? members[memberFullName].emailAddress : data.userEmailAddress);
  const [impact, setImpact] = useState(memberFullName ? members[memberFullName].impacts : data.userImpact);
  const [achievement, setAchievement] = useState(data.userAchievement);
  const [collapsedAchievement, setCollapsedAchievement] = useState(false);

  useEffect(() => {
    setTimeout(() => setAchievement(5125), 1500)
    setTimeout(() => setImpact(46), 2500)
  }
    , [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 10, paddingTop: 15, paddingBottom: 20, rowGap: 50 }}>
        <View style={{ flexDirection: "row", columnGap: 18 }}>
          <View style={{ borderColor: theme.colors.primary, width: 114, borderWidth: 2, borderRadius: 110 }}>
            <Avatar.Image
              source={require("../../assets/20231112_123338331.jpg")}
              size={110}
            />
            {/*USE AN Avatar.Text IF USER DOES NOT UPLOAD A PROILE PHOTO*/}
          </View>
          <View style={{ rowGap: 2, justifyContent: "center" }}>
            <Text variant="labelLarge" style={{ color: "#0dbbff" }}>
              @{username}
            </Text>
            <Text variant="titleMedium" style={{ fontSize: 17 }}>
              {fullName}
            </Text>
            <Text variant="labelMedium" style={{ opacity: .6 }}>
              {emailAddress}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 5, flexDirection: "row", justifyContent: "space-between" }}>
          {/*<ProgressBar
          animatedValue={.9}
          style={{ width: width - 20, height: 20, borderRadius: 100 }}
          fillStyle={{ borderRadius: 100 }}
        />*/}
          <View style={{ alignItems: "center", rowGap: 8 }}>
            <Text variant="labelMedium" style={{ color: "grey" }}>
              {impact > 1 ? "Impacts" : "Impact"} earned
            </Text>
            <View style={{ alignItems: "center", flexDirection: "row", columnGap: 7 }}>
              <AnimatedNumbers
                animateToNumber={impact}
                includeComma
                fontStyle={{ fontSize: 31, opacity: .9 }}
              />
              <Icon
                source="diamond-stone"
                size={45}
                color="#b362ff"
              />
            </View>
          </View>
          <View style={{ alignItems: "center", rowGap: 8 }}>
            <Text variant="labelMedium" style={{ color: "grey" }}>
              Total {achievement > 1 ? "Achievements" : "Achievement"}
            </Text>
            <View style={{ alignItems: "center", flexDirection: "row", columnGap: 7 }}>
              <AnimatedNumbers
                animateToNumber={achievement}
                includeComma
                fontStyle={{ fontSize: 31, opacity: .9 }}
              />
              <Icon
                source="trophy-outline"
                size={45}
                color="#62b8ff"
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", columnGap: 30, rowGap: 35, flexWrap: "wrap" }}>
          {
            //COMMENTED JUST TO CLEAR UNNECESSARY ERROR of the Key
            Object.keys(userAchievements).map((achievement) =>
              <AchievementStatusComp
                key={achievement}
                achievementName={achievement}
                totalAchievable={achievables[achievement.toLowerCase()].highestNumberAchievable}
                achieved={userAchievements[achievement]}
                iconFade={achievement === "Sign-in pioneer" || achievement === "All-star" ? achievables[achievement.toLowerCase()].icon : achievables[achievement.toLowerCase()].iconFade}
              />
            )
          }
        </View>
        <View style={{ rowGap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text numberOfLines={1} variant="headlineSmall">
              Your Achievement{achievementsNonCollapsedMode.length > 1 ? "s" : ""}
            </Text>
            <IconButton
              icon={collapsedAchievement ? "layers" : "layers-outline"}
              iconColor={theme.colors.primary}
              onPress={() => setCollapsedAchievement(prev => !prev)}
            />
          </View>
          <View style={{ flexWrap: "wrap", justifyContent: "space-around", flexDirection: "row", columnGap: 30, rowGap: 35 }}>
            {
              collapsedAchievement ?
                Object.entries(achievementsCollapsedMode).map((achieved) =>
                  <AchievementRecordComp
                    key={achieved[0]}
                    detailText={achieved[1].numberAchieved}
                    avatarSource={achievables[achieved[0]].icon}
                    detailTextVariant="bodyMedium"
                  />
                )
                :
                achievementsNonCollapsedMode.map((achieved) =>
                  <AchievementRecordComp
                    key={achieved[2]}
                    detailText={achieved[1]}
                    avatarSource={achievables[achieved[0]].icon}
                  />
                )
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const AchievementRecordComp = ({ avatarSource, detailText, detailTextVariant = "labelSmall" }) => {

  return (
    <View style={{ rowGap: 5, alignItems: "center" }}>
      <Avatar.Image
        source={avatarSource}
        size={65}
      />
      <Text variant={detailTextVariant} style={{ opacity: .35 }}>
        {detailText}
      </Text>
    </View>
  )
}

const AchievementStatusComp = ({ achievementName, achieved, totalAchievable, iconFade }) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={{}}>
      <Text variant="labelMedium" style={{ paddingBottom: 3, color: "grey" }}>
        {achievementName}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}>
        <ProgressBar
          animatedValue={totalAchievable < 1 ? 0 : (achieved / totalAchievable)}
          style={{ width: (width / 2) - 10 - 8 - 25 - 15, height: 10, borderRadius: 100 }}
          fillStyle={{ borderRadius: 100 }}
        />
        <Avatar.Image
          source={iconFade}
          size={25}
          style={{ borderWidth: 0 }}
        />
      </View>
      <Text variant="labelSmall" style={{ color: "#808080d7" }}>
        {achieved}/{totalAchievable}
      </Text>
    </View>
  )
}

const STYLES = StyleSheet.create({
  forView: {
    flex: 1,
    alignItems: "center",
  }
})

export default Dashboard;