import { useRef } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,

} from "react-native"
import {
  Text,
  Portal,
  TextInput,
} from "react-native-paper";


export const NumberComponent = ({ textVariant, mailsIncluded = null, onPress, textValue, borderWidth, borderColor, height, marginHorizontal }) => {
  //const [selectedNumber, setSelectedNumber] = useState(0);
  //const selectedNumber = useRef(0);

  //const NumberComponent = ({ textValue }) => (
  return (
    <Pressable
      onPress={onPress}
      style={{ borderWidth: borderWidth || .5, borderColor: borderColor || "black", backgroundColor: "#e7e7e7", height: height || 50, marginHorizontal: marginHorizontal || 0, borderRadius: 15, alignItems: "center", justifyContent: "space-around" }}>
      <Text variant={textVariant} style={{ opacity: mailsIncluded ? .5 : 1 }}>
        {mailsIncluded ? textValue[0] : textValue}
      </Text>
      {
        mailsIncluded ?
          <Text variant="labelSmall" style={{ color: "#e300e3", textAlign: "center" }}>
            {textValue[1]}
          </Text>
          :
          null
      }
    </Pressable>
  )
  //return (

  //)
}


const SelectionComp = ({ renderItem, data, singleListFooterComponent = null, mode, pressableOnPress }) => {


  return (
    <Portal>
      <Pressable onPress={pressableOnPress} style={{ backgroundColor: "#80808053", paddingBottom: 100, paddingHorizontal: 7, flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
        <View style={{ flex: mode == "single" ? .38 : .65, width: "100%" }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            ListFooterComponent={mode == "single" ? singleListFooterComponent : null}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            contentContainerStyle={{ rowGap: 5, paddingHorizontal: 7, paddingVertical: 4 }}
            style={{ width: "100%", backgroundColor: "white", borderRadius: 5 }}
          />
        </View>
      </Pressable>
    </Portal>
  )
}



export default SelectionComp;