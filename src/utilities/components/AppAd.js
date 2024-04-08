import { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet
} from "react-native";
import {
  Button,
  Text,
  RadioButton,
  TextInput,
  Divider,
  useTheme,
  HelperText
} from "react-native-paper";

let appPersonalQuery = [
  {
    contentType: "multiple-choice",
    question: "Which of these do you prefer?",
    options: [
      "Initial product",
      "Second product",
      "Consecutive product",
      "Last product Consecutive product Consecutive",
    ],
    reply: "",
    questionHelperText: "Here it is bro.",
    answerHelperText: "Here it is bro."
  },
  {
    contentType: "open-ended",
    question: "How would you classify the biggest thing?",
    reply: "",
    questionHelperText: "Here it is bro.",
    answerHelperText: "Here it is bro.",
    backgroundImage: require("../../../assets/010c929688612d2fa083c4b3aa0ce105.jpg")
  },]/*
  {
    contentType: "announcement",
    statement: "There will be an announcement as such that will be shared in the mid of the day next week.",
    questionHelperText: "Here it is bro.",
    answerHelperText: "Here it is bro.",
    index: "1"
  }
]*/

const AppAd = () => {
  const [allQuery, setAllQuery] = useState(appPersonalQuery);


  const MultipleChoice = ({ question, options, backgroundImage = null, questionHelperText = null, answerHelperText = null }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    function saveAnswerAndremoveComponent(finalAnswer) {
      setSelectedAnswer(finalAnswer);
      let compIndex = allQuery.findIndex((value) => value.question === question);
      //console.warn(compIndex);
      let te = [...allQuery];
      te[compIndex].answer = finalAnswer;
      appPersonalQuery = te;
      te.splice(compIndex, 1);
      setAllQuery(te);
    }

    return (
      <View style={STYLES.forView}>
        <ImageBackground imageStyle={STYLES.forImageBackgroundImageStyle} style={STYLES.forImageBackgroundStyle} source={backgroundImage}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Quick Question</Text>
          <View style={{ rowGap: 5 }}>
            <Text variant="titleSmall" style={{ fontSize: 15 }}>{question}</Text>
            {
              questionHelperText ?
                <HelperText style={{ fontSize: 11.35, fontStyle: "italic" }}>
                  This is a Member's production strictly. And no detail gotten from here will be given out.
                </HelperText>
                :
                null
            }
            <RadioButton.Group value={selectedAnswer} onValueChange={saveAnswerAndremoveComponent}>
              {
                options.map((option) =>
                  <RadioButton.Item
                    label={option}
                    value={option}
                    key={option}
                    labelVariant="labelMedium"
                    labelStyle={{ fontSize: 14 }}
                  />
                )
              }
            </RadioButton.Group>
            {
              answerHelperText ?
                <HelperText style={{ color: "#00b5fb", fontSize: 11.35, fontStyle: "italic" }}>
                  Your response is completely anonymous.
                </HelperText>
                :
                null
            }
          </View>
        </ImageBackground>
      </View>
    )
  }

  const OpenEnded = ({ question, backgroundImage = null, questionHelperText = null, answerHelperText = null }) => {
    const [responseText, setResponseText] = useState("");
    const [inputError, setInputError] = useState(false);

    function saveAnswerAndremoveComponent() {
      if (responseText.trim() == "") {
        setInputError(true);
        setResponseText("");
        return
      }
      let compIndex = allQuery.findIndex(value => value.question === question);
      let te = [...allQuery];
      te[compIndex].answer = responseText.trim();
      appPersonalQuery = te;
      te.splice(compIndex, 1);
      setAllQuery(te);
    }

    return (
      <View style={STYLES.forView}>
        <ImageBackground imageStyle={STYLES.forImageBackgroundImageStyle} style={STYLES.forImageBackgroundStyle} source={backgroundImage}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Quick Question</Text>
          <View style={{ rowGap: 5 }}>
            <Text variant="titleSmall" style={{ fontSize: 15 }}>{question}</Text>
            {
              questionHelperText ?
                <HelperText style={{ fontSize: 11.35, fontStyle: "italic" }}>
                  This is a Member's production strictly. And no detail gotten from here will be given out.
                </HelperText>
                :
                null
            }
            <TextInput
              placeholder="Reply here..."
              multiline
              value={responseText}
              error={inputError}
              style={{ height: 100 }}
              mode="outlined"
              onChangeText={(value) => { inputError ? setInputError(false) : null; setResponseText(value) }}
            />
            {
              answerHelperText ?
                <HelperText style={{ color: "#00b5fb", fontSize: 11.35, fontStyle: "italic" }}>
                  Your response is completely anonymous.
                </HelperText>
                :
                null
            }
          </View>
          <Button onPress={() => { saveAnswerAndremoveComponent() }} mode="contained" style={{ alignSelf: "flex-end", marginRight: 15 }}>
            Submit
          </Button>
        </ImageBackground>
      </View>
    )
  }

  const Announcement = ({ statement, backgroundImage = null, questionHelperText = null, answerHelperText = null }) => {
    const theme = useTheme();

    return (
      <View style={STYLES.forView}>
        <ImageBackground imageStyle={STYLES.forImageBackgroundImageStyle} style={STYLES.forImageBackgroundStyle} source={backgroundImage}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            A MEMBERS Announcement
          </Text>
          <View style={{ rowGap: 12, marginLeft: 7 }}>
            <Text variant="titleSmall" style={{ color: "#808080" }}>{statement}</Text>
          </View>
          <Divider
            theme={theme}
            style={{ marginTop: 10 }}
          />
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={{ rowGap: 15 }}>
      {
        appPersonalQuery.map((content, index) => {
          //  content[0] = TYPE OF INFO, , ,
          //  content[1] = ALL ACTUAL CONTENT
          //console.warn(key);
          const key = JSON.stringify(content);
          if (content.contentType === "multiple-choice") {
            return <MultipleChoice key={key} {...content} />
          }
          else if (content.contentType === "open-ended") {
            return <OpenEnded key={key} {...content} />
          }
          else {
            return <Announcement key={key} {...content} />
          }
        })
      }
    </View>
  )
}

const STYLES = StyleSheet.create({
  forView: {
    borderRadius: 25,
    marginBottom: 5
  },
  forImageBackgroundImageStyle: {
    borderRadius: 25
  },
  forImageBackgroundStyle: {
    flex: 1,
    paddingHorizontal: 7,
    paddingVertical: 7,
    rowGap: 15,
  }
})

export default AppAd