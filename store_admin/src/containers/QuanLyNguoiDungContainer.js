import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "./../actions/userActions";
import QuanLyNguoiDung from "../component/QuanLyNguoiDung/QuanLyNguoiDung";
class QuanLyNguoiDungContainer extends Component {
  getAllUser = () => {
    this.props.getAllUser();
  };
  deleteUser = (id) => {
    this.props.deleteUser(id);
    setTimeout(() => {
      this.props.getAllUser();
    }, 300);
  };
  createNewUser = (obj) => {
    this.props.createNewUser(obj);
  };
  handleUpdateUser = (obj) => {
    this.props.handleUpdateUser(obj);
  };
  getHotCustomer = () => {
    this.props.getHotCustomer();
  };
  render() {
    return (
      <>
        <QuanLyNguoiDung
          getAllUser={this.getAllUser}
          listUser={this.props.listUser}
          deleteUser={this.deleteUser}
          createNewUser={this.createNewUser}
          message={this.props.message}
          handleUpdateUser={this.handleUpdateUser}
          getHotCustomer={this.getHotCustomer}
          hotCus={this.props.hotCus}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listUser: state.listUser,
    message: state.message,
    hotCus: state.hotCustomer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => {
      dispatch(actions.getAllUser());
    },
    deleteUser: (id) => {
      dispatch(actions.deleteUser(id));
    },
    createNewUser: (obj) => {
      dispatch(actions.createNewUser(obj));
    },
    handleUpdateUser: (obj) => {
      dispatch(actions.handleUpdateUser(obj));
    },
    getHotCustomer: () => {
      dispatch(actions.getHotCustomer());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyNguoiDungContainer);
