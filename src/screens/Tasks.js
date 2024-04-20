import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  useWindowDimensions,
  FlatList,
} from "react-native";
import {
  Text,
  Icon,
  IconButton,
  Button,
  Divider,
  HelperText,
  TextInput,
  useTheme,
  Portal,
  Modal,
  Surface,
} from "react-native-paper";
import Constants from "expo-constants";
import TaskComp from "../utilities/components/TaskComp";
import TaskSubmission from "./TaskSubmission";
import { createStackNavigator } from "@react-navigation/stack";
import SelectionComp, { NumberComponent } from "../utilities/components/NumberComponent";
import { BlurView } from 'expo-blur';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const Stack = createStackNavigator();

const data = {
  admin: true,
}

const DATA = [
  // newTask IS TRUE UNTIL TIME HAS ELAPSED OR TASK HAS BEEN DONE.
  // WHENEVER newTask BECOMES false, TIME COUNT STOPS!
  // undone IS ONLY TRUE IF TIME HAS ELAPSED AND
  // ACTIVITY WAS UNDONE.
  {
    taskDescription: `Good day. This work requires you to stay at the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-04-10T22:02:39.986Z",
    dateAndTimeDeadline: "2024-04-10T23:59:00.000Z",
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
    taskDescription: `Dave You are needed to modify the site for the new event being posted in the next week because this is qiite an important assignment that you must not miss even as you are not prepared at this moment to take it up right now.`,
    dateAndTimeCreated: "2024-03-28T22:02:39.986Z",
    dateAndTimeDeadline: "2024-04-10T19:03:15.000Z",
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
    fullName: "Ora Peace Flora",
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

const membersExtractedForm = members.map((data) => {
  const { fullName } = data;
  return fullName;
})

const Tasks = () => {
  const theme = useTheme();

  const TaskSubmittor = ({ navigation }) => {
    const [taskDescriptionText, setTaskDescriptionText] = useState("");
    const [dateDeadlineText, setDateDeadlineText] = useState(dayjs());
    const [shownDateDeadline, setShownDateDeadline] = useState(dateDeadlineText.format("MM-DD"));
    const [timeDeadlineText, setTimeDeadlineText] = useState("");
    const [numberOfImpacts, setNumberOfImpacts] = useState(["0"]);
    const [linkOutsideText, setLinkOutsideText] = useState("");
    const [linkText, setLinkText] = useState("");
    const [fileName, setFileName] = useState("");
    const [linkUnsaved, setLinkUnsaved] = useState(false);
    const [fileUnsaved, setFileUnsaved] = useState(false);
    const [assigneeMembers, setAssigneeMembers] = useState(["Imaledo David Shalom", "Ora Peace Flora"]);
    const [uploadedFiles, setUploadedFiles] = useState(["010c929688612d2fa083c4b3aa0ce105.mp4", "video1.mp4", "snapchat02/10/20.mp4", "clip4.mp4"]);
    const [uploadedLinks, setUploadedLinks] = useState([["Whatsapp", `https://wa.me/message/PYC4XA32DJT5L1`]]);
    const [taskDescriptionError, setTaskDescriptionError] = useState(false);
    const [showAssigneeMembersSelector, setShowAssigneeMembersSelector] = useState(false);
    const [assigneeMembersError, setAssigneeMembersError] = useState(false);
    const [dateDeadlineError, setDateDeadlineError] = useState(false);
    const [timeDeadlineError, setTimeDeadlineError] = useState(false);
    const [linkOutsideTextError, setLinkOutsideTextError] = useState(false);
    const [linkTextError, setLinkTextError] = useState(false);
    const linkOutsideTextRef = useRef();
    const allow = useRef(true);
    const buttonInUse = useRef(false);
    const [showImpactNumberSelector, setShowImpactNumberSelector] = useState(false);
    const [showDeadlineDatePortal, setShowDeadlineDatePortal] = useState(false);
    const [replaceImpactCompWithInput, setReplaceImpactCompWithInput] = useState(false);


    function uploadTask() {
      if (buttonInUse.current) return null;
      buttonInUse.current = true;
      allow.current = true;

      if (!taskDescriptionText.trim()) {
        setTaskDescriptionError(true);
        allow.current = false;
      }

      if (!dateDeadlineText) {
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

      DATA.unshift(
        {
          taskDescription: taskDescriptionText,
          dateDeadline: dateDeadlineText,
          timeDeadline: timeDeadlineText,
          members: assigneeMembers,
          fileName: uploadedFiles,
          url: uploadedLinks,
          draft: "",
          impacts: numberOfImpacts,
          newTask: true,
          undone: false,
          taskIndex: DATA.length
        }
      );
      console.warn(DATA);
      navigation.goBack();
    }

    function addingLink() {

      if (uploadedLinks.find((linkArrayBeingScanned) => linkArrayBeingScanned[0] == linkOutsideText && linkArrayBeingScanned[1] == linkText) != undefined) {
        return null;
        // USE SNACKBAR TO EXPLAIN TO USER WHY THIS HAPPENED
      }
      if (linkUnsaved) { // SINCE IT IS A useState AND IT GETS RENDERED ONLY AFTERWARDS
        setUploadedLinks(prev => [...prev, [linkOutsideText, linkText]]);
        setLinkOutsideText("");
        setLinkText("");
      }
      setLinkUnsaved(val => !val)
    }

    function addingFile() {
      if (uploadedFiles.includes(fileName)) {
        return null;
        // USE SNACKBAR TO EXPLAIN TO USER WHY THIS HAPPENED
      }
      if (fileUnsaved) { // SINCE IT IS A useState AND IT GETS RENDERED ONLY AFTERWARDS
        setUploadedFiles(prev => [...prev, fileName]);
      }
      setFileUnsaved(val => !val)
    }

    function deleteLink(compIndex) {
      let te = [...uploadedLinks];
      te.splice(compIndex, 1);
      return te
    }

    const UploadedFileOrLinkComp = ({ compType, compName, linkText = "", compIndex }) => {
      const [showLink, setShowLink] = useState(false);

      return (
        <Pressable delayLongPress={200} onLongPress={() => setUploadedLinks(deleteLink(compIndex))} onPress={() => setShowLink((prev) => !prev)} style={{ flexDirection: "row", columnGap: 5, alignItems: "flex-start", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 15 }}>
          <Icon
            source={linkText ? "link" : compType}
            size={19}
            color="#b362ff"
          />
          <Text variant="labelLarge" style={{ marginRight: 15, letterSpacing: 0.5, color: theme.colors.primary }}>
            {`${compName} ${linkText && showLink ? `\n${linkText}` : ""}`}
          </Text>
        </Pressable>
      )
    }

    const ImpactSelectorTextInput = () => {
      return (
        <TextInput
          mode="outlined"
          placeholder="Type impact amount..."
          enterKeyHint="done"
          inputMode="numeric"
          onPressIn={() => {
            if (showImpactNumberSelector) {
              setShowImpactNumberSelector(false)
              setReplaceImpactCompWithInput(true)
            }
          }}
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
            setNumberOfImpacts(text);
            setShowImpactNumberSelector(false);
            setReplaceImpactCompWithInput(false);
          }}
        />
      )
    }

    const SelectionCompHere = ({ data, mode = "single", pressableOnPress }) =>
      <SelectionComp
        pressableOnPress={pressableOnPress}
        data={data}
        mode={mode}
        renderItem={(({ item }) => <NumberComponent
          textValue={item}
          mailsIncluded={false}
          borderWidth={(() => {
            if (mode == "single") return item == numberOfImpacts[0] ? 2 : .5
            else return assigneeMembers.includes(item) ? 2 : .5
          })()}
          borderColor={(() => {
            if (mode == "single") return item == numberOfImpacts[0] ? theme.colors.primary : "black"
            else return assigneeMembers.includes(item) ? theme.colors.primary : "black"
          })()}
          height={(() => {
            if (mode == "single") return item === numberOfImpacts[0] ? 50 : 40
            else return assigneeMembers.includes(item) ? 50 : 40
          })()}
          marginHorizontal={(() => {
            if (mode == "single") return item === numberOfImpacts[0] ? 0 : 5
            else return assigneeMembers.includes(item) ? 0 : 5
          })()}
          textVariant={mode == "single" ? "titleLarge" : "titleMedium"}
          onPress={() => {
            if (mode == "single") {
              setNumberOfImpacts([item]);
              setShowImpactNumberSelector(false)
            }
            else {
              let te = [...assigneeMembers];
              let compIndex = te.indexOf(item);
              if (te.includes(item)) te.splice(compIndex, 1);
              else te.push(item)
              setAssigneeMembers(te)
            }
          }}
        />
        )}
        singleListFooterComponent={<ImpactSelectorTextInput />}
      />


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
            Create Task
          </Text>
        </View>
        <View style={{ rowGap: 35, paddingBottom: 50 }}>
          <TextInput
            placeholder="Task Description"
            multiline
            error={taskDescriptionError}
            mode="outlined"
            onChangeText={(value) => { setTaskDescriptionText(value); taskDescriptionError ? setTaskDescriptionError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
            style={{ width: "100%", height: 180 }}
          />
          <View style={{ rowGap: 5 }}>
            <HelperText padding="none" style={{ color: "grey", fontSize: 12, letterSpacing: .19 }}>
              Deadline
            </HelperText>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8, }}>
              <Pressable onPress={() => setShowDeadlineDatePortal(true)}>
                <TextInput
                  placeholder="Date"
                  error={dateDeadlineError}
                  mode="outlined"
                  editable={false}
                  style={{ width: 100 }}
                  value={shownDateDeadline}
                />
              </Pressable>
              {
                showDeadlineDatePortal ?
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
                            date={dateDeadlineText}
                            onChange={({ date }) => { setDateDeadlineText(date); setShownDateDeadline(date.format("MM-DD")); setTimeout(() => setShowDeadlineDatePortal(false), 1000) }}
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
              <TextInput
                placeholder="Time"
                error={timeDeadlineError}
                mode="outlined"
                onChangeText={(value) => { setTimeDeadlineText(value); timeDeadlineError ? setTimeDeadlineError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
                style={{ width: 100 }}
              />
            </View>
          </View>
          <View style={{}}>
            <HelperText padding="none" style={{ color: "grey", fontSize: 12, letterSpacing: .19 }}>
              Who is this task for?
            </HelperText>
            <View style={{ marginBottom: 8, borderWidth: assigneeMembersError ? 1 : 0, borderColor: theme.colors.error, rowGap: 10, borderRadius: 10 }}>
              <UploadedFileOrLinkComp
                compType={assigneeMembers.length > 1 ? "account-multiple" : "account"}
                compName={`${assigneeMembers.length.toString()} Member${assigneeMembers.length > 1 ? "s" : ""}`}
                compIndex={0}
              />
              <Button onPress={() => setShowAssigneeMembersSelector(true)} mode="contained" icon="account" rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-end" }}>
                Select member(s)
              </Button>
            </View>
          </View>
          {
            showAssigneeMembersSelector ?
              <SelectionCompHere
                data={membersExtractedForm}
                mode="multiple"
                pressableOnPress={() => setShowAssigneeMembersSelector(false)}
              />
              :
              null
          }

          <View style={{ marginBottom: 8, rowGap: 10, borderRadius: 10, borderColor: theme.colors.primaryContainer, borderWidth: uploadedFiles.length > 0 && !fileUnsaved ? 1 : 0 }}>
            <Surface elevation={uploadedFiles.length > 0 && !fileUnsaved ? 1 : 0} style={{ padding: 5, borderRadius: 10, rowGap: 5 }}>
              {/*
                uploadedFiles.map((detail, index) =>
                <UploadedFileOrLinkComp
                  compType={acceptableFileTypes["video"].icon}
                  key={detail[0] + index.toString()}
                  compName={detail}
                  compIndex={index}
                />
              )
              */}
            </Surface>
            <Button onPress={addingFile} mode="outlined" icon="upload" rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-end" }}>
              {fileUnsaved ? "Save" : "Add file"}
            </Button>
          </View>

          <View style={{ marginBottom: 8, rowGap: 10, borderRadius: 10, borderColor: theme.colors.primaryContainer, borderWidth: uploadedLinks.length > 0 && !linkUnsaved ? 1 : 0 }}>
            <Surface elevation={uploadedLinks.length > 0 && !linkUnsaved ? 1 : 0} style={{ padding: 5, borderRadius: 10, rowGap: 5 }}>
              {/*
                uploadedLinks.map((detail, index) =>
                <UploadedFileOrLinkComp
                  compType="link"
                  key={detail[0] + detail[1]}
                  compName={detail[0]}
                  linkText={detail[1]}
                  compIndex={index}
                />
              )
                */
              }
            </Surface>
            {
              linkUnsaved ?
                <View style={{ rowGap: 8 }}>
                  <TextInput
                    value={linkOutsideText}
                    onChangeText={setLinkOutsideText}
                    ref={linkOutsideTextRef}
                    onLayout={() => linkOutsideTextRef.current.focus()}
                    mode="outlined"
                    placeholder="Text"
                    style={{ width: "60%" }}
                  />
                  <TextInput
                    value={linkText}
                    onChangeText={setLinkText}
                    mode="outlined"
                    inputMode="url"
                    placeholder={`Link ${uploadedLinks.length + 1}`}
                    style={{ width: "100%" }}
                  />
                </View>
                :
                null
            }
            <Button onPress={addingLink} mode="outlined" icon="link-variant" rippleColor="rgba(0,0,0,0)" style={{ borderColor: theme.colors.primary, borderRadius: 10, alignSelf: "flex-end" }}>
              {linkUnsaved ? "Save" : "Add link"}
            </Button>
          </View>
          {
            replaceImpactCompWithInput ?
              <ImpactSelectorTextInput />
              :
              <Pressable onPress={() => setShowImpactNumberSelector(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                  <Text variant="labelLarge">
                    {numberOfImpacts}
                  </Text>
                  <Text variant="labelLarge" style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
                    {`  Impact${numberOfImpacts > 1 ? "s" : ""} to give on completion `}
                  </Text>
                </View>
                <Icon
                  source="diamond-stone"
                  size={19}
                  color="#b362ff"
                />
              </Pressable>
          }
          {/*
            showImpactNumberSelector ?
              <Portal>
                <Pressable onPress={() => setShowImpactNumberSelector(false)} style={{ backgroundColor: "#80808053", paddingBottom: 100, paddingHorizontal: 7, flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                  <View style={{ flex: .38, width: "100%" }}>
                    <FlatList
                      data={Array.from({ length: 100 }, (_, i) => i)}
                      renderItem={(({ item }) => <NumberComponent
                        textValue={item}
                        borderWidth={item === numberOfImpacts ? 1 : .5}
                        borderColor={item === numberOfImpacts ? theme.colors.primary : "black"}
                        onPress={() => { setNumberOfImpacts(item); setShowImpactNumberSelector(false) }}
                      />
                      )}
                      showsVerticalScrollIndicator={false}
                      overScrollMode="never"
                      contentContainerStyle={{ rowGap: 5, paddingHorizontal: 7, paddingVertical: 4 }}
                      style={{ width: "100%", backgroundColor: "white", borderRadius: 5 }}
                    />
                  </View>
                </Pressable>
              </Portal>
              :
              null
          */}
          {
            showImpactNumberSelector ?
              <SelectionCompHere
                data={Array.from({ length: 31 }, (_, i) => i)}
                pressableOnPress={() => setShowImpactNumberSelector(false)}
              />
              :
              null
          }
        </View>
        <View style={{ position: "relative", width: "100%", bottom: 10 }}>
          <Button
            uppercase
            mode="contained"
            style={{ borderRadius: 15, marginBottom: 20 }}
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 43 }}
            onPress={uploadTask}
          >
            Assign
          </Button>
        </View>
      </ScrollView>
    )
  }

  const AllTasks = ({ navigation }) => {

    return (
      <SafeAreaView style={{
        flex: 1,
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 15
      }}>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => <TaskComp
            {...item}
            index={index}
            participated={item.newTask ? "ongoing" : item.undone ? "no" : "yes"}
            viewFullTask={() => navigation.navigate("task submission", { taskIndex: index })}
          />}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          ItemSeparatorComponent={<View style={{ marginVertical: 20 }}><Divider theme={theme} leftInset={1} /></View>}
        />
        {
          data.admin ?
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("task submittor")}
              iconColor="white"
              containerColor={theme.colors.primary}
              mode="contained"
              size={35}
              style={{ position: "absolute", bottom: 10, right: 10 }}
            />
            :
            null
        }
      </SafeAreaView>
    )
  }


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="all tasks"
    >
      <Stack.Screen
        name="all tasks"
        component={AllTasks}
      />
      <Stack.Screen
        name="task submittor"
        component={TaskSubmittor}
      />
      <Stack.Screen
        name="task submission"
        component={TaskSubmission}
      />
    </Stack.Navigator>
  )
}

const STYLES = StyleSheet.create({
  forView: {
    marginHorizontal: 12,
    flex: 1,
  },
})

export default Tasks;