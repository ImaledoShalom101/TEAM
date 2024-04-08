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
  Portal
} from "react-native-paper";
import Constants from "expo-constants";
import ActivityAttendance from "./ActivityAttendance";
import { createStackNavigator } from "@react-navigation/stack";
import NumberComponent from "../utilities/components/NumberComponent";

const Stack = createStackNavigator();

const data = {
  admin: true,
}

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


const Activities = ({ navigation }) => {
  const theme = useTheme();
  const flatListRef = useRef();

  const AllActivities = ({ navigation }) => {
    const { height, width } = useWindowDimensions();

    const ActivityComp = ({ ongoing = false, participated = false, theNewMonth = "", topic, body, impacts = 0, participants, index }) => {

      return (
        <View style={{ marginLeft: 6.5, borderLeftWidth: 1, borderColor: ongoing ? "#00dd00" : "#939393", rowGap: 10 }}>
          {theNewMonth ?
            <View style={{ marginVertical: 13, alignItems: "center", flexDirection: "row", columnGap: 8 }}>
              <Divider style={{ width: "25%" }} />
              <Text style={{ color: "#808080cd" }}>
                {theNewMonth}
              </Text>
            </View>
            : null
          }
          <View style={{ width: "100%", flexDirection: "row", marginLeft: -6.5, marginBottom: 30 }}>
            <View style={{ backgroundColor: ongoing ? "#00dd00" : "#939393", borderRadius: 100, width: 13, height: 13 }} />
            <View style={{ flex: 1, flexDirection: "row", marginTop: 6.5 }}>
              <Pressable onPress={() => data.admin ? navigation.navigate("activity attendance", { activityIndex: index }) : null} elevation={1} style={{ rowGap: 11, flex: 1, padding: 12, paddingTop: 7, marginLeft: 10, backgroundColor: "#ffffff", borderRadius: 13, borderTopLeftRadius: 0 }}>
                <Text variant="labelLarge" style={{ textAlign: "center", opacity: .7 }}>
                  {topic}
                </Text>
                <Text variant="labelMedium" style={{ opacity: .5 }}>
                  {body}
                </Text>
              </Pressable>
              <View style={{ marginLeft: 10, rowGap: 5, justifyContent: "center" }}>
                <Icon
                  source="check-circle"
                  color={data.admin ? participants.length > 1 ? "#008000" : "#808080a1" : participated ? "#808080a1" : "#80808000"}
                  size={15}
                />
                <View style={{ columnGap: 3, flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    source="star-circle"
                    color={impacts ? data.admin ? "#008000" : participated ? "#008000" : "#808080a1" : "#00800000"}
                    size={15}
                  />
                  <Text style={{ fontSize: 12.5, opacity: impacts ? .5 : 0 }}>
                    {impacts.toString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    }

    return (
      <SafeAreaView style={{ alignItems: "center", flex: 1, paddingLeft: 45, paddingRight: 8, paddingTop: 10 }}>
        <FlatList
          data={activitiesListData}
          renderItem={({ item, index }) => <ActivityComp {...item} index={index} />}
          ref={flatListRef}
          onLayout={() => flatListRef.current.scrollToEnd()}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
        {
          data.admin ?
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("activity submittor")}
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

  const ActivitySubmittor = ({ navigation }) => {
    const [activityTitleText, setActivityTitleText] = useState("");
    const [activityDescriptionText, setActivityDescriptionText] = useState("");
    const [numberOfImpacts, setNumberOfImpacts] = useState(0);
    const [activityTitleError, setActivityTitleError] = useState(false);
    const [activityDescriptionError, setActivityDescriptionError] = useState(false);
    const [showImpactNumberSelector, setShowImpactNumberSelector] = useState(false);
    const allow = useRef(true);
    const buttonInUse = useRef(false);

    function uploadActivity() {
      if (buttonInUse.current) return null;
      buttonInUse.current = true;
      allow.current = true;

      if (!activityTitleText.trim()) {
        setActivityTitleError(true);
        allow.current = false;
      }

      if (!activityDescriptionText.trim()) {
        setActivityDescriptionError(true);
        allow.current = false;
      }

      if (!allow.current) return null;


      activitiesListData.push(
        {
          topic: activityTitleText,
          body: activityDescriptionText,
          ongoing: true,
          participated: false,
          theNewMonth: "February",
          impacts: 0,
          participants: [],
          timeAndDateUploaded: ""
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
            Create Activity
          </Text>
        </View>
        <TextInput
          placeholder="Activity Title"
          mode="outlined"
          error={activityTitleError}
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="words"
          onChangeText={(value) => { setActivityTitleText(value); activityTitleError ? setActivityTitleError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <View style={{ rowGap: 35, paddingBottom: 50 }}>
          <TextInput
            placeholder="Activity Description"
            multiline
            error={activityDescriptionError}
            mode="outlined"
            onChangeText={(value) => { setActivityDescriptionText(value); activityDescriptionError ? setActivityDescriptionError(false) : null; buttonInUse.current ? buttonInUse.current = false : null }}
            style={{ width: "100%", height: 150 }}
          />
          <View>
            <Pressable onPress={() => setShowImpactNumberSelector(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.colors.primaryContainer, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Text variant="labelLarge">
                  {numberOfImpacts}
                </Text>
                <Text variant="labelLarge" style={{ letterSpacing: 0.5, color: theme.colors.primary }}>
                  {`  Impact${numberOfImpacts > 1 ? "s" : ""} to give participants `}
                </Text>
              </View>
              <Icon
                source="diamond-stone"
                size={19}
                color="#b362ff"
              />
            </Pressable>
            {
              showImpactNumberSelector ?
                <Portal>
                  <Pressable onPress={() => setShowImpactNumberSelector(false)} style={{ backgroundColor: "#80808053", paddingBottom: 100, paddingHorizontal: 7, flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                    <View style={{ flex: .38, width: "100%" }}>
                      <FlatList
                        data={Array.from({ length: 100 }, (_, i) => i)}
                        renderItem={(({ item }) => <NumberComponent
                          textNumber={item}
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
            }
            <HelperText style={{ color: "grey", fontSize: 11.5, letterSpacing: .19 }}>
              Members will not know of this until activity is completed.
            </HelperText>
          </View>
        </View>
        <Button
          uppercase
          mode="contained"
          style={{ borderRadius: 15, marginBottom: 20 }}
          labelStyle={{ fontSize: 20 }}
          contentStyle={{ height: 43 }}
          onPress={uploadActivity}
        >
          Upload
        </Button>
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
        name="all activities"
        component={AllActivities}
      />
      {
        data.admin ?
          <Stack.Group>
            <Stack.Screen
              name="activity submittor"
              component={ActivitySubmittor}
            />
            <Stack.Screen
              name="activity attendance"
              component={ActivityAttendance}
            />
          </Stack.Group>
          :
          null
      }
    </Stack.Navigator>
  )
}


export default Activities;
