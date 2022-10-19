import React, { Component } from "react";
import Register from "../components/Register/Register";
import actions from "./../actions/inforUserActions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
class RegisterContainer extends Component {
  handleOnRegister = async (objInfoUser) => {
    this.props.handleOnRegister(objInfoUser);
  };
  render() {
    return (
      <>
        <Register
          handleOnRegister={this.handleOnRegister}
          orderMess={this.props.orderMess}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderMess: state.orderMess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleOnRegister: async (objInfoUser) => {
      dispatch(await actions.handleOnRegister(objInfoUser));
    },
    toggleSpinners: () => {
      dispatch(actions.toggleSpinners());
    },
    unMoutSpinners: () => {
      dispatch(actions.unMoutSpinners());
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
);
