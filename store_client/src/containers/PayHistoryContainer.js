import React, { Component } from "react";
import PayHistory from "../components/PayHistory/PayHistory";
import actions from "../actions/store";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
class PayHistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    
  }
  // componentDidMount() {

  //   this.socket.on("CHANGE_STATUS", (id) => {
  //     console.log(id);
  //     this.setState({
  //       status: !this.state.status,
  //     });
  //   });
  // }
  getAllOrdersById = (token, id) => {
    this.props.getAllOrdersById(token, id);
  };
  destroyOrder = (id) => {
    this.props.destroyOrder(id);
  };
  addCancelProduct = (obj) => {
    this.props.addCancelProduct(obj);
  };
  render() {
    let orderList = this.props.history;
    return (
      <>
        <PayHistory
          getAllOrdersById={this.getAllOrdersById}
          orderList={orderList}
          destroyOrder={this.destroyOrder}
          addCancelProduct={this.addCancelProduct}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    history: state.history,
  };
};
const mapDispatchToProps = (disPatch) => {
  return {
    getAllOrdersById: (token, id) => {
      disPatch(actions.getAllOrdersById(token, id));
    },
    destroyOrder: (id) => {
      disPatch(actions.destroyOrder(id));
    },
    addCancelProduct: (obj) => {
      disPatch(actions.addCancelProduct(obj));
    },
  };
};
export default withRouter(
  withAlert()(connect(mapStateToProps, mapDispatchToProps)(PayHistoryContainer))
);
