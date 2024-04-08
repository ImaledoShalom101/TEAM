import {
  View,
  StyleSheet
} from "react-native";
import {
  Icon,
  Text,
  Button,
  Divider,
  useTheme
} from "react-native-paper";

const HomeInformationType = ({ iconName, iconColor, topic, children, onPress, seeMoreButtonText = "See more" }) => {
  const theme = useTheme();
  const darkThemed = false; // DARK THEME
  //ScrollView fadingEdgeLength={9} showsVerticalScrollIndicator={false} contentContainerS
  return (
    <View>
      <View style={STYLES.forHeaderView}>
        <Icon
          source={iconName}
          size={15}
          color={iconColor}
        />
        {// ICON COLOR MUST BE THEME COLOR,
          //BORDERCOLOR FOR UNREAD WILL ALSO BE THEME COLOR
        }
        <Text variant="labelSmall" style={{ opacity: .7 }}>
          {topic}
        </Text>
      </View>
      <View style={{ paddingTop: 5 }}>
        <Divider theme={theme} style={{ marginBottom: 20 }} />
      </View>

      <View style={STYLES.forChildrenView}>
        {children}
        {
          seeMoreButtonText != null ?
            <View style={{ alignItems: "flex-end" }}>
              <Button rippleColor="rgba(0,0,0,0)" onPress={onPress}>{seeMoreButtonText}</Button>
            </View>
            :
            null
        }
      </View>
    </View>
  )
}

const STYLES = StyleSheet.create({
  forHeaderView: {
    columnGap: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  forChildrenView: {
    paddingHorizontal: 5,
    rowGap: 5
  }
})

export default HomeInformationType;