import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import {
  Text,
  Button,
  Icon,
  IconButton,
  Divider
} from "react-native-paper";
import AppAd from "../utilities/components/AppAd";
import RecentInformationComp from "../utilities/components/RecentInformationComp";
import TheMonthActivity from "../utilities/components/TheMonthActivity";
import HomeInformationType from "../utilities/components/HomeInformationType";
import OrgHandles from "../utilities/components/OrgHandles";
// NOTE THAT THE BORDER COLORS WILL BE BLACK
// WHEN IN DARK THEME.  AND THAT IS BAD!!!
const data = {
  admin: true,
  numberOfUnseenAnnouncement: 1,
}

const announcementListData = [
  {
    title: "First Announcement",
    body: `Firstly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`,
    dateAndTime: "2024-03-28T22:02:39.986Z"
  },
  {
    title: "Second Announcement",
    body: `Secondly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`,
    fileAttached: "excel"
  },
  {
    title: "Third Announcement",
    body: `Third, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`,
    dateAndTime: "2024-03-28T22:02:39.986Z"
  },
  {
    title: "Fourth Announcement",
    body: `Firstly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
  },
  {
    title: "Fifth Announcement",
    body: `Secondly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
  },
  {
    title: "Sixth Announcement",
    body: `Third, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
  },
  {
    title: "Seventh Announcement",
    body: `Firstly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
  },
  {
    title: "Eighth Announcement",
    body: `Secondly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
  },
  {
    title: "Ninth Announcement",
    body: `Third, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
  },
];
const activitiesListData = [
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
          `,
    ongoing: false,
    participated: true,
    theNewMonth: "",
    impacts: 0,
    participants: [],
    timeAndDateUploaded: ""
  },
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
          `,
    ongoing: true,
    participated: false,
    theNewMonth: "June",
    impacts: 0,
    participants: [],
    timeAndDateUploaded: ""
  },
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
            This is now body which will actually be quite long and repeated cos its copied.
          `,
    ongoing: true,
    participated: false,
    theNewMonth: "June",
    impacts: 10,
    participants: [],
    timeAndDateUploaded: ""
  },
  {
    topic: "The Head Of The Topic",
    body: `This is now gbody which`,
    ongoing: true,
    participated: true,
    theNewMonth: "November",
    impacts: 18,
    participants: ["5shalom7", "david01"],
    timeAndDateUploaded: ""
  }
]
const uploadableLinks = {
  "Whatsapp DM": {
    link: ``,
    logo: require("../../assets/social_media_links/whatsapp.jpg")
  },
  "Whatsapp Group": {
    link: ``,
    logo: require("../../assets/social_media_links/whatsapp.jpg")
  },
  "Whatsapp Channel": {
    link: ``,
    logo: require("../../assets/social_media_links/whatsapp.jpg")
  },
  "Discord": {
    link: ``,
    logo: require("../../assets/social_media_links/discord.jpg")
  },
  "Discord Server": {
    link: ``,
    logo: require("../../assets/social_media_links/discord.jpg")
  },
  "Facebook": {
    link: ``,
    logo: require("../../assets/social_media_links/facebook.jpg")
  },
  "Facebook Group": {
    link: ``,
    logo: require("../../assets/social_media_links/facebook.jpg")
  },
  "Instagram": {
    link: ``,
    logo: require("../../assets/social_media_links/instagram.jpg")
  },
  "Telegram": {
    link: ``,
    logo: require("../../assets/social_media_links/telegram.jpg")
  },
  "Telegram Group": {
    link: ``,
    logo: require("../../assets/social_media_links/telegram.jpg")
  },
  "Telegram Channel": {
    link: ``,
    logo: require("../../assets/social_media_links/telegram.jpg")
  },
  "X": {
    link: ``,
    logo: require("../../assets/social_media_links/x.jpg")
  },
}
const DATA = [
  // newTask IS TRUE UNTIL TIME HAS ELAPSED OR TASK HAS BEEN DONE.
  // WHENEVER newTask BECOMES false, TIME COUNT STOPS!
  // undone IS ONLY TRUE IF TIME HAS ELAPSED AND
  // ACTIVITY WAS UNDONE.
  {
    taskDescription: `Good day. This work requires you to stay at the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-04-10T22:02:39.986Z",
    dateAndTimeDeadline: "2024-04-10T19:14:15.000Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: true,
    undone: false,
    taskIndex: 5
  },
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-04-10T22:02:39.986Z",
    dateAndTimeDeadline: "2024-04-10T17:50:00.986Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    newTask: true,
    undone: false,
    taskIndex: 4
  },
  {
    taskDescription: `This duty is assigned to you because you were, last year, needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-04-10T22:02:39.986Z",
    dateAndTimeDeadline: "2024-04-10T18:00:40.000Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: true,
    undone: false,
    taskIndex: 4
  },
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-03-28T22:02:39.986Z",
    dateAndTimeDeadline: "2024-04-10T22:02:39.986Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: false,
    undone: false,
    taskIndex: 3
  },
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-03-28T22:02:39.986Z",
    dateAndTimeDeadline: "2024-03-28T22:02:39.986Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: false,
    undone: true,
    taskIndex: 2
  },
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-03-28T22:02:39.986Z",
    dateAndTimeDeadline: "2024-03-28T22:02:39.986Z",
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: false,
    undone: false,
    taskIndex: 1
  },
];

const DATAExtractedForm = DATA.map((data) => {
  const { taskDescription, dateAndTimeDeadline, newTask, undone } = data;
  return { taskDescription, dateAndTimeDeadline, newTask, undone };
})//Array.from(DATA, (detail) => {const {taskDescription, dateDeadline, timeDeadline}});


const Home = ({ navigation }) => {
  const [showAds, setShowAds] = useState(false);
  const discordLogo = require("../../assets/social_media_links/discord.jpg");
  const telegramLogo = require("../../assets/social_media_links/telegram.jpg");
  const facebookLogo = require("../../assets/social_media_links/facebook.jpg");
  const whatsappLogo = require("../../assets/social_media_links/whatsapp.jpg");
  const xLogo = require("../../assets/social_media_links/x.jpg");
  const instagramLogo = require("../../assets/social_media_links/instagram.jpg");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={100}
      contentContainerStyle={{ marginVertical: 7, marginHorizontal: 12, paddingVertical: 8, rowGap: 18 }}
      keyboardShouldPersistTaps="always"
    >
      {showAds ?
        <AppAd
        />
        :
        null
      }

      <HomeInformationType
        iconName="star"
        iconColor="#ff0dff"
        topic="Recent tasks"
        onPress={() => navigation.navigate("Activities And Tasks", { screen: "Tasks", params: { screen: "all tasks" } })}
      >
        {
          DATAExtractedForm.slice(0, 3).map((task, index) =>
            <TheMonthActivity
              {...task}
              key={task.taskDescription + task.dateDeadline + task.timeDeadline}
              onPress={() => navigation.navigate("Activities And Tasks", { screen: "Tasks", params: { screen: "task submission", params: { taskIndex: index } } })}
              participated={task.newTask ? "ongoing" : task.undone ? "no" : "yes"}
            />
          )
        }
      </HomeInformationType>

      <HomeInformationType
        iconName="bell"
        iconColor="#0bff0b"
        topic="Recent announcements"
        onPress={() => navigation.navigate("Announcement")}
      >
        {
          announcementListData.slice(0, 3).map((announcement, index) =>
            <RecentInformationComp
              imageIncluded
              unread={index < data.numberOfUnseenAnnouncement}
              key={JSON.stringify(announcement)}
              title={announcement.title}
              body={announcement.body}
              onPress={() => navigation.navigate("Announcement", { indexOfAnncouncement: announcementListData.indexOf(announcement) })}
              dateAndTime={announcement.dateAndTime}
            />
          )
        }
      </HomeInformationType>

      <HomeInformationType
        iconName="calendar-today"
        iconColor="#0dbbff"
        topic="Recent activities"
        onPress={() => navigation.navigate("Activities And Tasks", { screen: "Activities" })}
      >
        {
          activitiesListData.slice(0, 3).map((activity, index) =>
            <RecentInformationComp
              key={JSON.stringify(activity)}
              title={activity.topic}
              body={activity.body}
              onPress={() => navigation.navigate("Activities And Tasks", { screen: "Activities" })}
            />
          )
        }
      </HomeInformationType>
      {/*
        <View>
          <View style={{ columnGap: 5, flexDirection: "row", alignItems: "center" }}>
            <Icon
              source="email"
              size={15}
              color="#ff6e0d"
            />
            {// ICON COLOR MUST BE THEME COLOR,
              //BORDERCOLOR FOR UNREAD WILL ALSO BE THEME COLOR
            }
            <Text variant="labelSmall" style={{ opacity: .7 }}>
              Go to
            </Text>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Icon
                source="information-outline"
                size={20}
                color="rgba(128,128,128,0.396)"

              />
            </View>
          </View>
          <View style={{ paddingTop: 5, marginBottom: 30 }}>
            <Divider />
          </View>
          <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap", rowGap: 20 }}>
          */}

      <HomeInformationType
        iconName="email"
        iconColor="#ff6e0d"
        topic="Go to"
        seeMoreButtonText={data.admin ? "Edit" : null}
        onPress={() => data.admin ? navigation.navigate("Members", { screen: "link upload" }) : null}
      >
        <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap", rowGap: 20 }}>
          {
            Object.entries(uploadableLinks).map((socialPlatform) =>
              <OrgHandles key={socialPlatform[0]} logo={socialPlatform[1].logo} url={socialPlatform[1].link} name={socialPlatform[0]} />
            )
            //https://wa.me/message/PYC4XA32DJT5L1
          }</View>
      </HomeInformationType>
    </ScrollView>
  )
}

//const STYLES = StyleSheet.create({})

export default Home;