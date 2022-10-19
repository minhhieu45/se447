import React, { Component } from "react";
import Cart from "../components/Cart/Cart";
import actions from "./../actions/store";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  getAllProductOnCart = (token) => {
    this.props.getAllProduct(token);
    setTimeout(() => {
      let { message } = this.props.mess;
      if (!token) {
        if (window.confirm(`${message}`)) {
          let { history } = this.props;
          history.push("/login");
          return;
        }
        return;
      }
    }, 400);
  };
  onHandleDelete = async (id) => {
    if (window.confirm(`You sure delete product ?`)) {
      const token = JSON.parse(localStorage.getItem("token"));
      this.props.onHandleDelete(id, token);
      setTimeout(() => {
        this.props.getAllProduct(token);
      }, 100);
    }
  };
  handleTang = (id, quantity) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (quantity < 1) {
      this.onHandleDelete(id, token);
      return;
    }
    this.props.handleTang(id, quantity);
  };
  handleOrder = (cart, token) => {
    const alert = this.props.alert;
    this.props.handleOrder(cart, token);
    setTimeout(() => {
      let { statusCode, message } = this.props.message;
      if (statusCode === 200) {
        return alert.success(message);
      }
      return alert.error(message);
    }, 1000);
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        <Cart
          getAllProductOnCart={this.getAllProductOnCart}
          cart={this.props.cart}
          onHandleDelete={this.onHandleDelete}
          handleTang={this.handleTang}
          handleOrder={this.handleOrder}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.orderMess,
    cart: state.cart,
    mess: state.message,
    token: state.token,
  };
};
const mapDispatchToProps = (disPatch) => {
  return {
    getAllProduct: (token) => {
      disPatch(actions.getAllProduct(token));
    },
    onHandleDelete: (id) => {
      disPatch(actions.onHandleDelete(id));
    },
    handleTang: (id, quantity) => {
      disPatch(actions.handleTang(id, quantity));
    },
    handleOrder: (cart, token) => {
      disPatch(actions.handleOrder(cart, token));
    },
  };
};
export default withRouter(
  withAlert()(connect(mapStateToProps, mapDispatchToProps)(CartContainer))
);
