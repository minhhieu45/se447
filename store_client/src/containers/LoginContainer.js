import React, { Component } from "react";
import Login from "../components/Login/Login";
import { connect } from "react-redux";
import actions from "./../actions/inforUserActions";
class LoginContainer extends Component {
  handleLogin = (objUser) => {
    this.props.handleLogin(objUser);
  };
  render() {
    return (
      <>
        <Login token={this.props.token} handleLogin={this.handleLogin} />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (userInfo) => {
      dispatch(actions.handleOnLogin(userInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
