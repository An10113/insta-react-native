import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";

const Tab = createMaterialBottomTabNavigator()
const Empty = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="MainFeed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <Tab.Screen
          name="MainAdd"
          component={Empty}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
        />
        <Tab.Screen
          name="MainProfile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStatetoProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStatetoProps, mapDispatchProps)(Main);
