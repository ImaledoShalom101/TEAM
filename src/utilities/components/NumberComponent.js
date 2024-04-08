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



const NumberComponent = ({ onPress, textNumber, borderWidth, borderColor }) => {
  //const [selectedNumber, setSelectedNumber] = useState(0);
  //const selectedNumber = useRef(0);

  //const NumberComponent = ({ textNumber }) => (
  return (<Pressable onPress={onPress} style={{ borderWidth: borderWidth, borderColor: borderColor, backgroundColor: "#c3c3c3", height: 40, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
    <Text variant="titleLarge">
      {textNumber}
    </Text>
  </Pressable>
  )
  //return (

  //)
}


export default NumberComponent;