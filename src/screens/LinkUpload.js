import { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import {
  Text,
  Button,
  HelperText,
  TextInput,
  Chip,
  Avatar,
  IconButton,
  Portal,
  Dialog,
  useTheme,
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const uploadableLinks = {
  "Whatsapp DM": {
    link: ``,
    logo: require("../../assets/social_media_links/whatsapp.jpg")
  },
  "Whatsapp Group": {
    link: ``,
    logo: require("../../assets/social_media_links/whatsapp.jpg")
  },
  "Whatsapp Channel": {
    link: ``,
    logo: require("../../assets/social_media_links/whatsapp.jpg")
  },
  "Discord": {
    link: ``,
    logo: require("../../assets/social_media_links/discord.jpg")
  },
  "Discord Server": {
    link: ``,
    logo: require("../../assets/social_media_links/discord.jpg")
  },
  "Facebook": {
    link: ``,
    logo: require("../../assets/social_media_links/facebook.jpg")
  },
  "Facebook Group": {
    link: ``,
    logo: require("../../assets/social_media_links/facebook.jpg")
  },
  "Instagram": {
    link: ``,
    logo: require("../../assets/social_media_links/instagram.jpg")
  },
  "Telegram": {
    link: ``,
    logo: require("../../assets/social_media_links/telegram.jpg")
  },
  "Telegram Group": {
    link: ``,
    logo: require("../../assets/social_media_links/telegram.jpg")
  },
  "Telegram Channel": {
    link: ``,
    logo: require("../../assets/social_media_links/telegram.jpg")
  },
  "X": {
    link: ``,
    logo: require("../../assets/social_media_links/x.jpg")
  },
}


const LinkUpload = ({ navigation }) => {
  const theme = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [newLink, setNewLink] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  let [filledLinks, setFilledLinks] = useState([])//"Telegram Group", "Telegram Channel", "X"]);
  const buttonInUse = useRef(false);

  function uploadLinks() {

    if (buttonInUse.current || filledLinks.length == 0) return null;
    buttonInUse.current = true;

    if (selectedPlatform) {
      if (uploadableLinks[selectedPlatform].link !== newLink.trim()) {
        addAndRemoveChip(selectedPlatform);
      }
    }

    if (!showDialog) {
      setShowDialog(true);
      return;
    } else setShowDialog(false);

    navigation.goBack();
  }

  function addAndRemoveChip(name) {
    if (buttonInUse.current) buttonInUse.current = false;

    /*if (filledLinks.includes(name)) {
      
      let te = [...filledLinks];
      setFilledLinks(() => { te.splice(te.indexOf(name), 1); return te })
    } else {*/
    if (newLink.trim()) {
      if (!filledLinks.includes(selectedPlatform)) {
        setFilledLinks([...filledLinks, selectedPlatform])
      }
    } else {
      if (filledLinks.includes(selectedPlatform)) {
        let te = [...filledLinks];
        setFilledLinks(() => { te.splice(te.indexOf(selectedPlatform), 1); console.warn(te.indexOf(selectedPlatform), selectedPlatform, filledLinks, te); return te })

      }
      /*if (selectedPlatform) {
      if (!uploadableLinks[selectedPlatform].link) {
        console.warn("there")*/

    }

    if (selectedPlatform) {
      uploadableLinks[selectedPlatform].link = newLink.trim();
    }
    setSelectedPlatform(name);
    setNewLink(uploadableLinks[name].link);
    console.warn
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
          Upload Social Links
        </Text>
      </View>
      <View style={{ rowGap: 5, paddingBottom: 60 }}>
        <HelperText>
          Select and fill the link(s) you would like to upload
        </HelperText>
        <View style={{ flexWrap: "wrap", alignItems: "center", flexDirection: "row", columnGap: 15, rowGap: 10 }}>
          {
            Object.keys(uploadableLinks).map((name) =>
              <View key={name}>
                <Chip style={{ padding: selectedPlatform === name && !filledLinks.includes(name) ? 8 : 0 }} onPress={() => { addAndRemoveChip(name) }} elevated selected={filledLinks.includes(name)} showSelectedOverlay avatar={<Avatar.Image size={24} source={uploadableLinks[name].logo} />}>{name}</Chip>
              </View>
            )
          }
        </View>
      </View>
      {
        selectedPlatform ?
          <View style={{ rowGap: 10, paddingBottom: 80 }}>
            <TextInput
              value={newLink}
              placeholder={`Enter ${selectedPlatform} link`}
              mode="outlined"
              onSubmitEditing={() => addAndRemoveChip(selectedPlatform)}
              onChangeText={(value) => { setNewLink(value); buttonInUse.current ? buttonInUse.current = false : null }}
            />
          </View>
          :
          null
      }
      <Button
        uppercase
        onPress={uploadLinks}
        mode="contained"
        style={{ borderRadius: 15, marginBottom: 20 }}
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ height: 43 }}
      >
        Upload
      </Button>
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => { buttonInUse.current = false;; setShowDialog(false) }}
        >
          <Dialog.Title>
            Upload {filledLinks.length} link{filledLinks.length > 1 ? "s" : ""}
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge" style={{ fontSize: 14.5 }}>
              On upload, the selected link{filledLinks.length > 1 ? "s" : ""} will be available for usage by members
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { buttonInUse.current = false;; setShowDialog(false) }}>
              Cancel
            </Button>
            <Button mode="contained" onPress={uploadLinks} style={{ paddingHorizontal: 4 }}>
              Upload
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  )
}


export default LinkUpload;