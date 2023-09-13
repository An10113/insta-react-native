import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBnr-aFXnD_qWAnsZp79Y-shACwkXTKtm8",
  authDomain: "insta-84a15.firebaseapp.com",
  projectId: "insta-84a15",
  storageBucket: "insta-84a15.appspot.com",
  messagingSenderId: "511217478138",
  appId: "1:511217478138:web:2fbfeb6f9a623d5e245c43",
  measurementId: "G-RT4ZV1CTPZ"
};
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
