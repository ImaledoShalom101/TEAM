import { useState, useEffect, useRef } from "react";
import {
  View,
  Pressable,
  ScrollView
} from "react-native";
import {
  Text,
  Button,
} from "react-native-paper";
import { BlurView } from 'expo-blur';
import { DateTime } from "luxon";

const TimePicker = ({ onTimeSelected, currentTime }) => {
  const hour = useRef(0);
  const minute = useRef(null);
  const medi = useRef(null);
  //const currentTime = DateTime.now();

  function deriveTime() {
    //hour.current, minute.current, medi.current
    onTimeSelected(DateTime.fromObject({ hour: medi.current === "PM" ? parseInt(hour.current) + 12 : parseInt(hour.current), minute: parseInt(minute.current) }))
  }

  const TimeColumn = ({ updateThis, timeLength = null, initialValue, onPressValue }) => {
    const [selected, setSelected] = useState(initialValue);
    const scrollRef = useRef(null);
    let middleCount = 2;
    initialValue -= middleCount;

    updateThis(selected);

    useEffect(() => {
      scrollRef.current.scrollTo({ y: (initialValue * 75) + 5, animated: false })
    }
      , [])

    return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 5, rowGap: 10, alignItems: "center", }}
        overScrollMode="never"
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={75}
        onScroll={({ nativeEvent: { contentOffset: { y } } }) => setSelected((Math.round((y - 5) / 75) + middleCount))}
        style={{ width: 75 }}>
        {(timeLength ? Array.from({ length: timeLength }, (_, i) => i) : ["AM", "PM"]).map(num => {
          //num = onPressValue == "minute" ? num + 1 : num;

          return (<TimeSingleView
            num={num}
            key={num}
            op={() => setSelected(num)}
            ni={num == selected ? 1 : 0}
            timeLength={timeLength}
            onPressValue={onPressValue} />
          )
        })}
      </ScrollView>
    )
    /*return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 5, rowGap: 10, alignItems: "center", }}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        snapToInterval={75}
        onScroll={({ nativeEvent: { contentOffset: { y } } }) => setSelectedHour(Math.round((y - 5) / 75) + 3)}
        style={{ width: 75 }}>
        {(timeLength ? Array.from({ length: timeLength }, (_, i) => i) : ["AM", "PM"]).map(num =>
          <TimeSingleView
            num={/^\d+$/.test(num) ? num + 1 : num}
            key={num}
            op={() => { onPressValue === "hour" ? setSelectedHour(num + 1) : onPressValue === "medi" ? setSelectedMedi(num) : setSelectedMinute(num + 1); }}
            ni={onPressValue === "hour" && selectedHour == num + 1 ? 1 :
              onPressValue === "medi" && selectedMedi == num ? 1 :
                onPressValue === "minute" && selectedMinute == num + 1 ? 1 : 0}
            timeLength={timeLength}
            onPressValue={onPressValue} />
        )}
      </ScrollView>
    )*/
  }

  const TimeSingleView = ({ num, timeLength, onPressValue, ni, op }) => {

    return (
      <Pressable
        onPress={op}
        style={{ borderWidth: ni, borderColor: "rgb(211,13,255)", borderRadius: 10, width: 70, height: 65, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
        <Text variant={timeLength ? "titleLarge" : "titleMedium"}>
          {num}
        </Text>
      </Pressable>
    )
  }


  return (
    <BlurView tint="light" intensity={17} style={{ flex: 1, rowGap: 10, alignItems: "center", justifyContent: "center" }}>
      <View style={{ justifyContent: "space-around", flexDirection: "row", alignItems: "center", width: "95%", borderWidth: 1, borderColor: "rgb(211,13,255)", backgroundColor: "#cfcfcf", height: 375, borderRadius: 20 }}>
        <TimeColumn timeLength={12} initialValue={currentTime.toFormat("h")} updateThis={(value) => { hour.current = value }} onPressValue="hour" />
        <TimeColumn timeLength={60} initialValue={currentTime.toFormat("m")} updateThis={(value) => { minute.current = value }} onPressValue="minute" />
        <TimeColumn initialValue={currentTime.toFormat("a")} updateThis={(value) => { medi.current = value }} onPressValue="medi" />
      </View>
      <View style={{ width: "95%", alignItems: "flex-end" }}>
        <Button style={{ backgroundColor: "#e5e5e5" }} mode="elevated" onPress={deriveTime}>Done</Button>
      </View>
    </BlurView>
  )
}

export default TimePicker;
