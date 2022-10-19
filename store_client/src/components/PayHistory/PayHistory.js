import React, { Component } from "react";
import CartItem from "./PayHistoryItem";
import "./Cart.css";
import io from "socket.io-client";
export default class PayHistory extends Component {
  constructor(props) {
    super(props);
    this.socket = io(`localhost:9000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }
  componentDidMount() {
    this.getOrderList();
    this.socket.on("CHANGE_STATUS", (id) => {
      setTimeout(() => {
        this.getOrderList();
      }, 500);
    });
  }
  getOrderList = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      let { id } = JSON.parse(localStorage.getItem("info")).user;
      this.props.getAllOrdersById(token, id);
    }
  };
  destroyOrder = (id) => {
    this.props.destroyOrder(id);
    setTimeout(() => {
      this.getOrderList();
    }, 300);
  };
  addCancelProduct = (obj) => {
    this.props.addCancelProduct(obj);
  };
  renderCartItem = () => {
    let { orderList } = this.props;
    return orderList.map((cart, index) => {
      return (
        <CartItem
          key={index}
          id={cart.id}
          quantity={cart.quantity}
          image={cart.image}
          title={cart.title}
          price={cart.price}
          active={cart.active}
          description={cart.description}
          onHandleDelete={this.onHandleDelete}
          handleTang={this.handleTang}
          destroyOrder={this.destroyOrder}
          addCancelProduct={this.addCancelProduct}
        />
      );
    });
  };
  render() {
    console.log(this.props.orderList);

    return (
      <div style={{ position: "relative", top: "100px" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.renderCartItem()}</tbody>
        </table>
      </div>
    );
  }
}
