import { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Linking,
  Pressable,
  ToastAndroid,
  AlertIOS,
  Platform
} from "react-native";
import {
  Text,
  Icon,
  IconButton,
  Surface,
  Button,
  HelperText,
  TextInput,
  useTheme,
  Divider
} from "react-native-paper";
import Constants from "expo-constants";
import * as Clipboard from "expo-clipboard";

const data = {
  admin: true,
}

const DATA = [
  // newTask IS TRUE UNTIL TIME HAS ELAPSED.
  // undone IS ONLY TRUE IF TIME HAS ELAPSED AND
  // ACTIVITY WAS UNDONE.
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateDeadline: `29/02/2024`,
    timeDeadline: `06:52 PM`,
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
    dateDeadline: `29/02/2024`,
    timeDeadline: `06:52 PM`,
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    newTask: false,
    undone: false,
    taskIndex: 4
  },
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateDeadline: `29/02/2024`,
    timeDeadline: `06:52 PM`,
    members: ["Imaledo David Shalom", "Ora Peace Flora"],
    fileName: ["010c929688612d2fa083c4b3aa0ce105.jpg", "second file.word"],
    url: [["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`], ["Telegram", `https://tm.am/channel/PYC4XA32DJT5L1`], ["Discord", `https://ds.rd/group/PYC4XA32DJT5L1`]],
    draft: "",
    impacts: 5,
    newTask: false,
    undone: false,
    taskIndex: 4
  },
  {
    taskDescription: `You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateDeadline: `29/02/2024`,
    timeDeadline: `06:52 PM`,
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
    dateDeadline: `29/02/2024`,
    timeDeadline: `06:52 PM`,
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
    dateDeadline: `29/02/2024`,
    timeDeadline: `06:52 PM`,
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


const TaskSubmission = ({ navigation, route }) => {
  const taskIndex = route.params.taskIndex;
  const parentNavigation = navigation.getParent();
  const theme = useTheme();
  const [taskSubmissionText, setTaskSubmissionText] = useState(DATA[taskIndex].draft);
  const [numberOfImpacts, setNumberOfImpacts] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileUnsaved, setFileUnsaved] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(["010c929688612d2fa083c4b3aa0ce105.mp4", "video1.mp4", "snapchat02/10/20.mp4", "clip4.mp4"]);
  const [taskSubmissionError, setTaskSubmissionError] = useState(false);
  const allow = useRef(true);
  const buttonInUse = useRef(false);


  function uploadTaskCompletion() {
    if (buttonInUse.current) return null;
    buttonInUse.current = true;
    allow.current = true;

    if (!taskSubmissionText.trim()) {
      setTaskSubmissionError(true);
      allow.current = false;
    }

    if (!dateDeadlineText.trim()) {
      setDateDeadlineError(true);
      allow.current = false;
    }

    if (!timeDeadlineText.trim()) {
      setTimeDeadlineError(true);
      allow.current = false;
    }

    if (assigneeMembers.length == 0) {
      setAssigneeMembersError(true);
      allow.current = false;
    }

    if (!allow.current) return null;

    navigation.goBack();
  }


  function addingFile() {
    if (fileUnsaved) { // SINCE IT IS A useState AND IT GETS RENDERED ONLY AFTERWARDS
      setUploadedFiles(prev => [...prev, fileName]);
    }
    setFileUnsaved(val => !val)
  }

  function deleteFile(compIndex) {
    let te = [...uploadedFiles];
    te.splice(compIndex, 1);
    return te
  }

  async function linkOpener(url) {
    await Linking.openURL(url);
  }

  async function textCopier(textToCopy, textType) {
    let prefix;
    switch (textType) {
      case "url":
        prefix = "The url";
        break;
      case "desc":
        prefix = "The Task description";
        break;
    }
    await Clipboard.setStringAsync(textToCopy);
    if (Platform.OS === "android") {
      ToastAndroid.show(`${prefix} has been copied to your clipboard.`, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(`${prefix} has been copied to your clipboard.`);
    }
  }

  function onDraft() {
    if (!taskSubmissionText.trim()) {
      return null;
    }
    DATA[taskIndex].draft = taskSubmissionText.trim();
    if (Platform.OS === "android") {
      ToastAndroid.show("Draft has been saved.", ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("Draft has been saved.");
    }
    navigation.goBack();
  }

  const UploadedFileComp = ({ compType, compName, compIndex }) => {

    return (
      <Pressable delayLongPress={200} onLongPress={() => setUploadedFiles(deleteFile(compIndex))} style={{ flexDirection: "row", columnGap: 5, alignItems: "flex-start", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 15 }}>
        <Icon
          source={compType}
          size={19}
          color="#b362ff"
        />
        <Text variant="labelLarge" style={{ marginRight: 15, letterSpacing: 0.5, color: theme.colors.primary }}>
          {compName}
        </Text>
      </Pressable>
    )
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
          onPress={() => parentNavigation.replace("all tasks")}
        />
        <Text variant="titleLarge" style={{ paddingRight: 48, flex: 1, textAlign: "center" }}>
          Task Submission
        </Text>
      </View>
      <View style={{ rowGap: 35 }}>
        <Pressable delayLongPress={200} onLongPress={() => textCopier(DATA[taskIndex].taskDescription, "desc")}>
          <Text variant="titleMedium" style={{ letterSpacing: .4, paddingHorizontal: 5, color: theme.colors.primary }}>
            {DATA[taskIndex].taskDescription}
          </Text>
        </Pressable>
        {
          DATA[taskIndex].fileName.length > 0 ?
            <View style={{ rowGap: 8 }}>
              <Icon
                source="file"
                size={20}
                color={theme.colors.primary}
              />
              <View style={{ paddingLeft: 10, rowGap: 5 }}>
                {
                  DATA[taskIndex].fileName.map((file) =>
                    <Button key={file} onPress={addingFile} mode="outlined" icon={acceptableFileTypes["image"].icon} rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-start" }}>
                      {file.length > 32 ? `${file.substr(0, 25)}...${file.substr(-7, 7)}` : file}
                    </Button>
                  )
                }
              </View>
            </View>
            :
            null
        }
        {
          DATA[taskIndex].url.length > 0 ?
            <View style={{ rowGap: 8 }}>
              <Icon
                source="link-variant"
                size={20}
                color={theme.colors.primary}
              />
              <View style={{ paddingLeft: 10, rowGap: 5 }}>
                {
                  DATA[taskIndex].url.map((linkDetail) =>
                    <Pressable key={linkDetail[0] + linkDetail[1]} delayLongPress={200} onLongPress={() => textCopier(linkDetail[1], "url")} onPress={() => linkOpener(linkDetail[1])} mode="outlined" icon={acceptableFileTypes["image"].icon} rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-start" }}>
                      <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                        {linkDetail[0]}
                      </Text>
                    </Pressable>
                  )
                }
              </View>
            </View>
            :
            null
        }
      </View>
      <View style={{ rowGap: 15, marginTop: 10 }}>
        <Divider theme={theme} />
        <Text variant="titleLarge" style={{ color: theme.colors.primary, fontSize: 21 }}>
          {data.admin ? DATA[taskIndex].newTask ? "Expecting..." : DATA[taskIndex].undone ? "Undone" : "Response" : "Perform Task"}
        </Text>
      </View>
      {
        data.admin ?
          null
          :
          <>
            <View style={{ paddingHorizontal: 5, rowGap: 35, paddingBottom: 50 }}>
              <TextInput
                placeholder="Write Text here..."
                value={taskSubmissionText}
                multiline
                error={taskSubmissionError}
                mode="outlined"
                onChangeText={(value) => { setTaskSubmissionText(value); taskSubmissionError ? setTaskSubmissionError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
                style={{ width: "100%", height: 200 }}
              />
            </View>

            <View style={{ marginBottom: 8, rowGap: 10, borderRadius: 10, borderColor: theme.colors.primaryContainer, borderWidth: uploadedFiles.length > 0 && !fileUnsaved ? 1 : 0 }}>
              {/*
          uploadedFiles.map((detail, index) =>
            <UploadedFileComp
              compType={acceptableFileTypes["video"].icon}
              key={detail[0] + index.toString()}
              compName={detail}
              compIndex={index}
            />
          )
        */}
              <Button onPress={addingFile} mode="outlined" icon="upload" rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-end" }}>
                Upload file
              </Button>
            </View>
            <View style={{ rowGap: 10, position: "relative", paddingTop: 50, width: "100%", bottom: 10 }}>
              <Button onPress={onDraft} disabled={!taskSubmissionText.trim()} mode="outlined" style={{ borderRadius: 10, borderColor: theme.colors.primary, alignSelf: "flex-start" }}>
                Draft
              </Button>
              <Button
                uppercase
                mode="contained"
                style={{ borderRadius: 15, marginBottom: 20 }}
                labelStyle={{ fontSize: 20 }}
                contentStyle={{ height: 43 }}
                onPress={uploadTaskCompletion}
              >
                Submit
              </Button>
            </View>
          </>
      }
    </ScrollView >
  )
}



export default TaskSubmission;