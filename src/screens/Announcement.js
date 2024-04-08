import { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import {
  Text,
  TextInput,
  Icon,
  Divider,
  Button,
  IconButton,
  useTheme,
  HelperText,
  Surface
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

//import AnnouncementComp from "../utilities/components/AnnouncementComp"

const Stack = createStackNavigator();

const data = {
  admin: true,
  numberOfUnseenAnnouncement: 2,
}

const announcementListData = [
  {
    title: "First Announcement",
    body: `Firstly, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out! Though, This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`,
    dateAndTime: "5:29 PM  •  22/05/2024"
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
      DowN This is a text that should actually bele really long but why it is not, i don't exactly know. Find out!`
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

const announcementData = {
  file: "excel"
}

const Announcement = ({ navigation, route }) => {
  const theme = useTheme();
  const [copiedNumberOfUnseenAnnouncement, setCopiedNumberOfUnseenAnnouncement] = useState(data.numberOfUnseenAnnouncement)

  const flatListRef = useRef(null);
  const { height, width } = useWindowDimensions();
  useFocusEffect(
    useCallback(() => {
      return () => {
        data.numberOfUnseenAnnouncement = 0;
        setCopiedNumberOfUnseenAnnouncement(0);
      }
    }, [])
  )

  const acceptableFileTypes = {
    image: {
      name: "image",
      icon: "file-image",
    },
    video: {
      name: "video",
      icon: "file-video",
    },
    pdf: {
      name: "pdf",
      icon: "file-pdf-box",
    },
    word: {
      name: "word",
      icon: "file-word",
    },
    excel: {
      name: "excel",
      icon: "file-excel",
    },
  }

  const AllAnnouncement = ({ navigation }) => {


    const AnnouncementComp = ({ fileAttached = "", title, body, dateAndTime, index }) => {
      const [ellipsized, setEllipsized] = useState(true)

      return (
        <Surface elevation={3} style={[STYLES.forAnnouncementView, { borderColor: theme.colors.primary, borderWidth: index < copiedNumberOfUnseenAnnouncement ? .7 : 0 }]}>
          <Text variant="titleMedium">
            {title}
          </Text>

          <Text numberOfLines={ellipsized ? 3 : null} style={{ color: "#808080" }} variant="titleSmall" >
            {body}
          </Text>
          {
            !ellipsized && fileAttached ?
              <View style={{ paddingTop: 8, alignItems: "flex-start" }}>
                <Button icon={acceptableFileTypes[fileAttached].icon} mode="outlined" style={{ borderColor: theme.colors.primary, borderRadius: 10 }}>
                  View {acceptableFileTypes[fileAttached].name}
                </Button>
              </View>
              : null
          }
          <View style={STYLES.forButtonAndTimeDateView}>
            <Button rippleColor="rgba(0,0,0,0)" onPress={() => setEllipsized(!ellipsized)}>{ellipsized ? "View" : "Close"}</Button>
            <Text style={STYLES.forDateTime}>
              {dateAndTime}
            </Text>
          </View>
        </Surface>
      )
    }
    //style={{ rowGap: 11, flex: 1, padding: 12, paddingTop: 7, marginLeft: 10, backgroundColor: "#ffffff", borderRadius: 13, borderTopLeftRadius: 0 }}>


    return (
      <View style={STYLES.forView}>
        <FlatList
          data={announcementListData}
          ref={flatListRef}
          onLayout={() => { flatListRef.current.scrollToIndex({ viewOffset: 50, index: route.params ? route.params.indexOfAnncouncement : null }) }}
          renderItem={
            ({ item, index }) => <AnnouncementComp
              {...item}
              index={index}
            />
          }
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          ListEmptyComponent={<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text>List is totally empty</Text></View>}
        />
        <IconButton icon="chevron-up" size={20} style={{ position: "absolute", bottom: 17.5, right: 17.5 }} onPress={() => flatListRef.current.scrollToIndex({ index: 0 })} />
        {
          data.admin ?
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("Announcement submittor")}
              iconColor="white"
              containerColor={theme.colors.primary}
              mode="contained"
              size={35}
              style={{ position: "absolute", bottom: 55, right: 10 }}
            />
            :
            null
        }
      </View>
    )
  }

  const AnnouncementSubmittor = ({ navigation }) => {
    const [announcementTitleText, setAnnouncementTitleText] = useState("");
    const [announcementDescriptionText, setAnnouncementDescriptionText] = useState("");
    const [announcementDateAndTime, setAnnouncementDateAndTime] = useState("");
    const [announcementFileAttached, setAnnouncementFileAttached] = useState("");

    const [announcementTitleError, setAnnouncementTitleError] = useState(false);
    const [announcementDescriptionError, setannouncementDescriptionError] = useState(false);

    const allow = useRef(true);
    const buttonInUse = useRef(false);

    const UploadedFileComp = ({ fileType, fileName }) => {
      return (
        <Pressable style={{ flexDirection: "row", columnGap: 5, alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 15 }}>
          <Icon
            source={fileType}
            size={19}
            color="#b362ff"
          />
          <Text variant="labelLarge" numberOfLines={1} style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
            {fileName}
          </Text>
        </Pressable>
      )
    }


    function uploadAnnouncement() {
      if (buttonInUse.current) return null;
      buttonInUse.current = true;
      allow.current = true;

      if (!announcementTitleText.trim()) {
        setAnnouncementTitleError(true);
        allow.current = false;
      }

      if (!announcementDescriptionText.trim()) {
        setannouncementDescriptionError(true);
        allow.current = false;
      }

      if (!allow.current) return null;

      announcementListData.unshift(
        {
          title: announcementTitleText,
          body: announcementDescriptionText,
          dateAndTime: announcementDateAndTime,
          fileAttached: announcementFileAttached,
        }
      );
      flatListRef.current.scrollToEnd({ animated: false });
      navigation.goBack();
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
            Create Announcement
          </Text>
        </View>
        <TextInput
          placeholder="Announcement Title"
          mode="outlined"
          error={announcementTitleError}
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="words"
          onChangeText={(value) => { setAnnouncementTitleText(value); announcementTitleError ? setAnnouncementTitleError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <View style={{ rowGap: 35, paddingBottom: 50 }}>
          <TextInput
            placeholder="Announcement Description"
            multiline
            error={announcementDescriptionError}
            mode="outlined"
            onChangeText={(value) => { setAnnouncementDescriptionText(value); announcementDescriptionError ? setannouncementDescriptionError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
            style={{ width: "100%", height: 150 }}
          />
          <View style={{ rowGap: 20 }}>
            <View style={{ rowGap: 10 }}>
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
              <UploadedFileComp
                fileType="file-pdf-box"
                fileName="20231112_123338331.jpg"
              />
            </View>
            <View>
              <Button mode="outlined" icon="upload" rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-end" }}>
                Upload file
              </Button>
              <HelperText padding="none" style={{ textAlign: "right", color: "grey", fontSize: 11.5, letterSpacing: .19 }}>
                This file can be downloaded by members.
              </HelperText>
            </View>
          </View>
        </View>
        <View style={{ position: "relative", width: "100%", bottom: 10 }}>
          <Button
            uppercase
            mode="contained"
            style={{ borderRadius: 15, marginBottom: 20 }}
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 43 }}
            onPress={uploadAnnouncement}
          >
            Broadcast
          </Button>
        </View>
      </ScrollView>
    )
  }


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="All announcement"
        component={AllAnnouncement}
      />
      <Stack.Screen
        name="Announcement submittor"
        component={AnnouncementSubmittor}
      />
    </Stack.Navigator>
  )
}


const STYLES = StyleSheet.create({
  forView: {
    marginHorizontal: 12,
    flex: 1,
  },
  forAnnouncementView: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 10,
    padding: 10,
    rowGap: 5,
  },
  forButtonAndTimeDateView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  forDateTime: {
    textAlign: "right",
    fontSize: 9,
    opacity: .5
  }
})

export default Announcement;