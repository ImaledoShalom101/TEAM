import { useRef } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
} from "react-native"
import {
  Text,
  Portal
} from "react-native-paper";



const NumberComponent = ({ textVariant, onPress, textValue, borderWidth, borderColor, height, marginHorizontal }) => {
  //const [selectedNumber, setSelectedNumber] = useState(0);
  //const selectedNumber = useRef(0);

  //const NumberComponent = ({ textValue }) => (
  return (
    <Pressable
      onPress={onPress}
      style={{ borderWidth: borderWidth(), borderColor: borderColor(), backgroundColor: "#e7e7e7", height: height(), marginHorizontal: marginHorizontal(), borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
      <Text variant={textVariant}>
        {textValue}
      </Text>
    </Pressable>
  )
  //return (

  //)
}


export default NumberComponent;