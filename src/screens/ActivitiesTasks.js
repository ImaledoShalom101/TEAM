import {
  View,
  StyleSheet,
} from "react-native";
import {
  Text,
  Icon,
  useTheme,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Tasks from "./Tasks";
import Activities from "./Activities";

const Tab = createMaterialBottomTabNavigator();


const ActivitiesTasks = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      activeColor={theme.colors.primary}
      initialRouteName="Tasks"
    >
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({ focused, color }) => <Icon source={!focused ? "lightbulb-outline" : "lightbulb"} color={color} size={22} />,
          tabBarBadge: 20
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({ focused, color }) => <Icon source={!focused ? "calendar-month-outline" : "calendar-week"} color={color} size={22} />,
          tabBarBadge: true
        }}
      />
    </Tab.Navigator>
  )
}

const STYLES = StyleSheet.create({

})

export default ActivitiesTasks;