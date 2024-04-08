import { useState } from "react";
import {
  View,
  Pressable,
  ImageBackground,
  Platform,
  ToastAndroid,
  AlertIOS,
  Linking
} from "react-native";
import {
  Text,
} from "react-native-paper";
import * as Clipboard from 'expo-clipboard';


const OrgHandles = ({ logo, name, url }) => {
  const [pressedToLoadURL, setPressedToLoadURL] = useState(false);

  {// MAKE A CUSTOM COMP. TOAST TO USER THAT 
    //LONG PRESS IS COPYABLE
  }

  async function copyURL() {
    await Clipboard.setStringAsync(url);
    if (Platform.OS === "android") {
      ToastAndroid.show("The url has been copied to your clipboard.", ToastAndroid.SHORT)
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("The url has been copied to your clipboard.")
    }
  }

  return (
    <Pressable onLongPress={() => copyURL()} onPress={() => Linking.openURL(url)} style={{ paddingHorizontal: 5, rowGap: 5 }}>
      <ImageBackground source={logo} resizeMode="cover" imageStyle={{ borderRadius: 25 }} style={{ height: 75, width: 90 }}>
        <View style={{ paddingHorizontal: 3, alignItems: "center", justifyContent: "center", borderRadius: 25, flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
          <Text variant="titleMedium" style={{ fontWeight: "600", textAlign: "center", color: "white" }}>{name}</Text>
        </View>
      </ImageBackground>

    </Pressable>
  )
}


export default OrgHandles;