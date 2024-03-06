import { createStackNavigator } from "@react-navigation/stack";
import Direction from "../screens/navigation";
import Choice from "../screens/options";
import Doubts from "../screens/Doubts";
import WelcomeScreen from "../screens/WelcomeScreen";
import AnimatedPage from "./animation";
import FirstPage from "../screens/FirstPage";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Choice"
        component={Choice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doubts"
        component={Doubts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Direction"
        component={Direction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnimatedPage"
        component={AnimatedPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
