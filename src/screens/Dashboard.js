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


/*const userAchievementsTemplate = {
  "survey sage": {
    achievementName: "Survey completer",
    achieved: 10,
    totalAchievable: 25,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "activity aficionado": {
    achievementName: "Activity streak",
    achieved: 10,
    totalAchievable: 15,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "project pro": {
    achievementName: "Project contributor",
    achieved: 1,
    totalAchievable: 8,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "knowledge keeper": {
    achievementName: "Informed reader",
    achieved: 3,
    totalAchievable: 12,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "attendance ace": {
    achievementName: "Reliable presence",
    achieved: 1,
    totalAchievable: 25,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "impact magnate": {
    achievementName: "Total imoacts",
    achieved: 4,
    totalAchievable: 17,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "poll proclaimer": {
    achievementName: "Regular pollee",
    achieved: 10,
    totalAchievable: 25,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "sign-in pioneer": {
    achievementName: "NaN",
    achieved: 10,
    totalAchievable: 25,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "badge boss": {
    achievementName: "Badge collector",
    achieved: 10,
    totalAchievable: 25,
    icon: require(".png"),
    iconFade: require("-fade.png")
  },
  "all-star": {
    achievementName: "NaN",
    achieved: 10,
    totalAchievable: 25,
    icon: require(".png"),
    iconFade: require("-fade.png")
  }
}*/


const achievables = {
  "Survey sage": {
    numberAchieved: 25,
    inText: "Survey completer",
    icon: require("../../assets/achievements/survey-sage.png"),
    iconFade: require("../../assets/achievements/survey-sage-fade.png")
  },
  "Activity aficionado": {
    highestNumberAchievable: 15,
    inText: "Activity streak",
    icon: require("../../assets/achievements/activity-aficionado.png"),
    iconFade: require("../../assets/achievements/activity-aficionado-fade.png")
  },
  "Project pro": {
    highestNumberAchievable: 8,
    inText: "Project contributor",
    icon: require("../../assets/achievements/project-pro.png"),
    iconFade: require("../../assets/achievements/project-pro-fade.png")
  },
  "Knowledge keeper": {
    highestNumberAchievable: 12,
    inText: "Informed reader",
    icon: require("../../assets/achievements/knowledge-keeper.png"),
    iconFade: require("../../assets/achievements/knowledge-keeper-fade.png")
  },
  "Attendance ace": {
    highestNumberAchievable: 25,
    inText: "Reliable presenc",
    icon: require("../../assets/achievements/attendance-ace.png"),
    iconFade: require("../../assets/achievements/attendance-ace-fade.png")
  },
  "Impact magnate": {
    highestNumberAchievable: 17,
    inText: "Total impact",
    icon: require("../../assets/achievements/impact-awarded.png"),
    iconFade: require("../../assets/achievements/impact-awarded-fade.png")
  },
  "Poll proclaimer": {
    highestNumberAchievable: 25,
    inText: "Regular pollee",
    icon: require("../../assets/achievements/poll-proclaimer.png"),
    iconFade: require("../../assets/achievements/poll-proclaimer-fade.png")
  },
  "Badge boss": {
    highestNumberAchievable: 25,
    inText: "Badge collector",
    icon: require("../../assets/achievements/badge-boss.png"),
    iconFade: require("../../assets/achievements/badge-boss-fade.png")
  },
  "Sign-in pioneer": {
    highestNumberAchievable: 1,
    inText: "Signup pioneer",
    icon: require("../../assets/achievements/signin-pioneer.png"),
    iconFade: null
  },
  "All-star": {
    highestNumberAchievable: 1,
    inText: "All-star",
    icon: require("../../assets/achievements/all-star.png"),
    iconFade: null
  }
}


const userAchievements = {
  "Survey sage": 10,// THIS SHOULD HOLD AN ARRAY WHICH THE POSITIONS OF BADGES WON ARE INCLUDED IN
  "Activity aficionado": 14,
  "Project pro": 1,
  "Knowledge keeper": 3,
  "Attendance ace": 1,
  "Impact magnate": 4,
  "Poll proclaimer": 10,
  "Badge boss": 10,
  "Sign-in pioneer": 1,
  "All-star": 1
}

/*const userAchievements = [
  {
    achievementName: "Survey completer",
    achieved: 10,
    iconFade: require("../../assets/achievements/survey-sage-fade.png")
  },
  {
    achievementName: "Activity streak",
    achieved: 14,
    iconFade: require("../../assets/achievements/activity-aficionado-fade.png")
  },
  {
    achievementName: "Project contributor",
    achieved: 1,
    iconFade: require("../../assets/achievements/project-pro-fade.png")
  },
  {
    achievementName: "Informed reader",
    achieved: 3,
    iconFade: require("../../assets/achievements/knowledge-keeper-fade.png")
  },
  {
    achievementName: "Reliable presence",
    achieved: 1,
    iconFade: require("../../assets/achievements/attendance-ace-fade.png")
  },
  {
    achievementName: "Total impacts",
    achieved: 4,
    iconFade: require("../../assets/achievements/impact-awarded-fade.png")
  },
  {
    achievementName: "Regular pollee",
    achieved: 10,
    iconFade: require("../../assets/achievements/poll-proclaimer-fade.png")
  },
  {
    achievementName: "Signup pioneer",
    achieved: 1,
    iconFade: require("../../assets/achievements/signin-pioneer.png")
  },
  {
    achievementName: "Badge collector",
    achieved: 10,
    iconFade: require("../../assets/achievements/badge-boss-fade.png")
  },
  {
    achievementName: "All-star",
    achieved: 10,
    iconFade: require("../../assets/achievements/all-star.png")
  }
]*/

const achievementsNonCollapsedMode = [
  ["sign-in pioneer", "1"],
  ["survey sage", "2"],
  ["survey sage", "3"],
  ["attendance ace", "4"],
  ["activity aficionado", "5"],
  ["all-star", "6"],
  ["attendance ace", "7"],
  ["knowledge keeper", "8"],
  ["sign-in pioneer", "9"],
  ["sign-in pioneer", "10"],
  ["survey sage", "20"],
  ["survey sage", "30"],
  ["attendance ace", "40"],
  ["activity aficionado", "50"],
  ["all-star", "60"],
  ["attendance ace", "70"],
  ["knowledge keeper", "80"],
  ["sign-in pioneer", "90"],
]

const achievementsCollapsedMode = {
  "survey sage": {
    numberAchieved: 2,
    icon: require("../../assets/achievements/survey-sage.png"),
  },
  "activity aficionado": {
    numberAchieved: 4,
    icon: require("../../assets/achievements/activity-aficionado.png"),
  },
  "project pro": {
    numberAchieved: 1,
    icon: require("../../assets/achievements/project-pro.png"),
  },
  "knowledge keeper": {
    numberAchieved: 3,
    icon: require("../../assets/achievements/knowledge-keeper.png"),
  },
  "attendance ace": {
    numberAchieved: 8,
    icon: require("../../assets/achievements/attendance-ace.png"),
  },
  "impact magnate": {
    numberAchieved: 5,
    icon: require("../../assets/achievements/impact-awarded-fade.png"),
  },
  "poll proclaimer": {
    numberAchieved: 2,
    icon: require("../../assets/achievements/poll-proclaimer.png"),
  },
  "sign-in pioneer": {
    numberAchieved: 6,
    icon: require("../../assets/achievements/signin-pioneer.png")
  },
  "badge boss": {
    numberAchieved: 9,
    icon: require("../../assets/achievements/badge-boss.png"),
  },
  "all-star": {
    numberAchieved: 3,
    icon: require("../../assets/achievements/all-star.png")
  }
}


const data = {
  userUsername: "UserName",
  userFullName: "Imaledo David Shalom",
  userEmailAddress: "shalomimaledo@gmail.com",
  userImpact: 18,
  userAchievement: achievementsNonCollapsedMode.length
}

const Dashboard = () => {
  //console.warn(Device.modelName)
  const theme = useTheme();
  const [username, setUsername] = useState(data.userUsername);
  const [fullName, setfullName] = useState(data.userFullName);
  const [emailAddress, setEmailAddress] = useState(data.userEmailAddress);
  const [impact, setImpact] = useState(data.userImpact);
  const [achievement, setAchievement] = useState(data.userAchievement);

  useEffect(() => {
    setTimeout(() => {
      setAchievement(5125)
      setImpact(46)
    }
      , 5000)
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
          <View style={{ rowGap: 5, justifyContent: "center" }}>
            <Text variant="labelLarge" style={{ color: "#0dbbff" }}>
              @{username}
            </Text>
            <Text variant="titleMedium" >
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
                totalAchievable={achievables[achievement].highestNumberAchievable}
                achieved={userAchievements[achievement]}
                iconFade={achievement === "Sign-in pioneer" || achievement === "All-star" ? achievables[achievement].icon : achievables[achievement].iconFade}
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
              icon="layers-outline"
              iconColor={theme.colors.primary}
              onPress={() => console.warn("Should group achievements when clicked and change the date text to number of each achievement.")}
            />
          </View>
          <View style={{ flexWrap: "wrap", justifyContent: "space-around", flexDirection: "row", columnGap: 30, rowGap: 35 }}>
            {
              achievementsNonCollapsedMode.map((achieved) =>
                <View key={achieved[1]} style={{ rowGap: 5, alignItems: "center" }}>
                  <Avatar.Image
                    source={achievementsCollapsedMode[achieved[0]].icon}
                    size={65}
                  />
                  <Text variant="labelSmall" style={{ opacity: .35 }}>
                    10/05/24
                  </Text>
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
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