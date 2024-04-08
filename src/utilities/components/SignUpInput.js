import {
  View,
  StyleSheet,
} from "react-native";
import {
  useTheme,
  TextInput,
  HelperText,
} from "react-native-paper";

const SignUpInput = ({ textInputRightComp = null, textInputLeftComp = null, typeOfHelperText = "info", textOfHelper = "", textInputStyle = null, ...props }) => {
  const theme = useTheme();
  return (
    <View>
      <TextInput
        {...props}
        left={textInputLeftComp}
        right={textInputRightComp}
        outlineColor={theme.colors.primary}
        textColor={theme.colors.primary}
        mode="outlined"
        style={[{ backgroundColor: "rgb(248,213,255)" }, textInputStyle]} />

      {props.visible ?
        <HelperText {...props} padding="none" style={{ color: typeOfHelperText !== "info" ? "#ff0000" : "#0000ff9e", fontSize: 11, letterSpacing: .17 }}>
          {textOfHelper}
        </HelperText>
        :
        null
      }
    </View>
  )
}

export default SignUpInput;