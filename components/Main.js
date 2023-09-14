import React, { Component } from "react";
import { Text, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser?.name);
    if (!currentUser) {
      return (
        <View>
          <Text>Logging in</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text> {currentUser?.name} is logged in</Text>
        </View>
      );
    }
  }
}

const mapStatetoProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStatetoProps, mapDispatchProps)(Main);
