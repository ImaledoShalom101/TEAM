import React, { useState } from "react";
import {
  Appbar,
  Text,
  Icon,
  IconButton,
  Badge,
  useTheme,
  Menu
} from "react-native-paper";
import {
  ImageBackground,
  View,
  StyleSheet
} from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import { HeaderSideIcons } from "../../screens/Members.js";
//const [ orgLogo, setOrgLogo ] = useState(require())


const MyHeader = ({ back, route, options, navigation }) => {
  const dTitle = getHeaderTitle(options, route.name);
  const [themeStyleDark, setThemeStyleDark] = useState(false);
  const [orgName, setOrgName] = useState("Org Name");
  const [badgeUnread, setbadgeUnread] = useState(true);

  const theme = useTheme();
  const [themePrimaryColor, setThemePrimaryColor] = useState(theme.colors.primary);

  return (
    <ImageBackground opacity={.4} style={{ width: "100%", }} resizeMode="cover" source={require("../../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")}>
      <Appbar.Header elevated style={STYLES.noBG}>
        <View >

          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          <Badge visible={badgeUnread} size={8} style={{ position: "absolute", right: 15, top: 16, backgroundColor: themePrimaryColor }} />

        </View>

        <Appbar.Content title={route.name === "Home" ? `${orgName}` : dTitle} />
        {
          route.name === "Members" ?
            <HeaderSideIcons />
            :
            null
        }
      </Appbar.Header>
    </ImageBackground>

  )
}

const STYLES = ({
  forViewAndImgBg: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  noBG: {
    backgroundColor: "rgba(0,0,0,0)"
  },
})

export default MyHeader;