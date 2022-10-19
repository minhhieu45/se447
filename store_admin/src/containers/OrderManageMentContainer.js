import React, { Component } from "react";
import { connect } from "react-redux";
import QuanLyGioHang from "./../component/QuanLyGioHang/QuanLyGioHang";
import ordersAction from "../actions/ordersAction";
class OrderManageMentContainer extends Component {
  componentDidMount() {
    this.props.getAllCancelProducts();
  }
  getAllOrders = () => {
    this.props.getAllOrders();
  };
  updateOrder = (id) => {
    this.props.updateOrder(id);
  };
  render() {
    return (
      <>
        <QuanLyGioHang
          getAllOrders={this.getAllOrders}
          allOrders={this.props.allOrders}
          updateOrder={this.updateOrder}
          message={this.props.message}
          cancelProducts={this.props.cancelProducts}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allOrders: state.allOrders,
    message: state.message,
    cancelProducts: state.cancelProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => {
      dispatch(ordersAction.getAllOrders());
    },
    updateOrder: (id) => {
      dispatch(ordersAction.updateOrder(id));
    },
    getAllCancelProducts: () => {
      dispatch(ordersAction.getAllCancelProducts());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderManageMentContainer);
