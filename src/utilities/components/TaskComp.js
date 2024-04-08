import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  Text,
  Icon,
  Button,
  useTheme,
} from "react-native-paper";

const data = {
  admin: true
}


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

const TaskComp = ({ viewFullTask, taskDescription, dateDeadline, timeDeadline, members, fileName, url, impacts, newTask, undone, draft }) => {
  const theme = useTheme();

  const activityStateColor = newTask ? "#00ad00" : undone ? "#a5a5a5" : theme.colors.primary;

  return (
    <Pressable disabled={data.admin ? false : !newTask} onPress={viewFullTask} style={{ paddingHorizontal: 12, marginBottom: 20, marginTop: 10, borderWidth: 1, borderColor: activityStateColor, borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}>
      <View style={{ alignItems: "flex-start", marginLeft: 8, position: "relative", top: -10 }}>
        <View style={{ columnGap: 18, alignItems: "center", flexDirection: "row", paddingHorizontal: 18, justifyContent: "space-between", borderRadius: 20, backgroundColor: activityStateColor }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} variant="bodySmall">
            {data.admin ? "You" : "Management"}
          </Text>
          <Icon
            source="chevron-right"
            color="white"
            size={16}
          />
          <Text numberOfLines={1} style={{ maxWidth: data.admin ? "70%" : "50%", color: "white", fontWeight: "bold", fontSize: 12 }} variant="bodyMedium">
            {data.admin ? "Imaledo David and 3 others" : "You"}
          </Text>
        </View>
      </View>
      <View style={{ rowGap: 15 }}>
        <Text numberOfLines={3} style={{ marginTop: 8, marginBottom: 4 }} variant="labelLarge">{taskDescription}</Text>
        {
          url.length > 0 ?
            <View style={{ rowGap: 3 }}>
              <Icon
                source="link"
                size={20}
                style={{ paddingBottom: 5 }}
              />
              <Text variant="labelLarge" onPress={() => console.warn("ree.current.props")} disabled={data.admin ? false : !newTask} style={{ paddingLeft: 10, color: theme.colors.primary }}>
                {url[0][0]}{url.length > 1 ? "  ..." : ""}
              </Text>
            </View>
            :
            null
        }
        {/*<View style={{ alignItems: "flex-start", rowGap: 5 }}>
          {fileName.map((file) =>
            <Button mode="outlined" icon="file-word">
              View {file.length > 12 ? `${file.substr(0, 5)}...${file.substr(-7, 7)}` : file}
            </Button>
          )}
        </View>*/}
      </View>
      <Text style={{ position: "absolute", left: 15, bottom: 3, fontSize: 10, opacity: .5 }}>{dateDeadline}  •  {timeDeadline}</Text>
      {/*
        data.admin ?
          <View style={{ height: 40 }} />
          :*/}
      <View style={{ position: "relative", bottom: -20, alignItems: "flex-end" }}>
        <Pressable onPress={viewFullTask} disabled={data.admin ? false : !newTask} style={{ flexDirection: "row", columnGap: 6, paddingHorizontal: 24, borderRadius: 100, alignItems: "center", justifyContent: "center", height: 40, backgroundColor: activityStateColor, marginRight: 10 }} >
          <Text variant="titleSmall" style={{ color: newTask ? "#ffffff" : "#808080" }}>
            {data.admin ? newTask ? "Pending" : undone ? "Undone" : "Performed" : newTask ? draft ? "Finish up" : "Take up" : undone ? "Missed" : "Completed"}
          </Text>
          {data.admin ?
            <Icon source={newTask ? "clock" : undone ? "checkbox-blank-outline" : "check-circle"} size={24} color="white" />
            :
            null
          }
        </Pressable>
      </View>

    </Pressable>
  )
}


export default TaskComp;