import React, { Component } from "react";
import TrangChu from "../component/TrangChu/TrangChu";
import { connect } from "react-redux";
import actions from "./../actions/userActions";
class TrangChuContainer extends Component {
  getAllUser = () => {
    this.props.getAllUser();
  };
  getAllCancelProducts = () => {
    this.props.getAllCancelProducts();
  };
  render() {
    return (
      <>
        <TrangChu
          listUser={this.props.listUser}
          getAllUser={this.getAllUser}
          getAllCancelProducts={this.getAllCancelProducts}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listUser: state.listUser,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => {
      dispatch(actions.getAllUser());
    },
    getAllCancelProducts: () => {
      dispatch(actions.getAllCancelProducts());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrangChuContainer);
