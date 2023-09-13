import react, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { View } from "react-native-web";
import { Text } from "react-native";
const firebaseConfig = {
  apiKey: "AIzaSyBnr-aFXnD_qWAnsZp79Y-shACwkXTKtm8",
  authDomain: "insta-84a15.firebaseapp.com",
  projectId: "insta-84a15",
  storageBucket: "insta-84a15.appspot.com",
  messagingSenderId: "511217478138",
  appId: "1:511217478138:web:2fbfeb6f9a623d5e245c43",
  measurementId: "G-RT4ZV1CTPZ",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
        const uid = user.uid;
      } else {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{}}>Loading ...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (loggedIn) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{}}>User Logged In</Text>
        </View>
      );
    }
  }
}
export default App;
