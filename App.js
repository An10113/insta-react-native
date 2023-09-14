import react, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import MainScreen from "./components/Main";
import Login from "./components/auth/Login";
import { View } from "react-native-web";
import { Text } from "react-native";

import AddScreen from "./components/main/Add";
import FeedScreen from "./components/main/Feed";
import ProfileScreen from "./components/main/Profile";

import { createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; // Replace with your chosen middleware
import rootReducer from "./redux/reducers"; // Import your root reducer
const store = createStore(rootReducer, applyMiddleware(thunk));

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { applyMiddleware } from "redux";
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
const auth = getAuth(app);
const db = getFirestore(app);
export { app, db, auth };

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
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Add" component={AddScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}
export default App;
