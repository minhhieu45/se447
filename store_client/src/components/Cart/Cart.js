import React, { Component } from "react";
import CartItem from "./CartItem";
import PhoneInput from "react-phone-number-input";
import { motion } from "framer-motion";
import "./Cart.css";
import io from "socket.io-client";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      address: "",
      numberphone: "",
      isActiveFrom: false,
      arrImg: [],
    };
    this.socket = io(`localhost:9000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }
  componentDidMount() {
    let token = JSON.parse(localStorage.getItem("token"));
    this.props.getAllProductOnCart(token);
    let info = JSON.parse(localStorage.getItem("info"));
    if (info && info !== "null") {
      let { username, email, address, numberphone } = info.user;
      this.setState({
        username,
        email,
        address,
        numberphone,
      });
      return;
    }
    this.setState({
      username: "",
      email: "",
      address: "",
      numberphone: "",
    });
  }
  renderCartItem = () => {
    let { cart } = this.props;
    return cart.map((cart, index) => {
      return (
        <CartItem
          key={index}
          id={cart.id}
          quantity={cart.quantity}
          image={cart.image}
          title={cart.title}
          price={cart.price}
          description={cart.description}
          onHandleDelete={this.onHandleDelete}
          handleTang={this.handleTang}
        />
      );
    });
  };
  onHandleDelete = (id) => {
    this.props.onHandleDelete(id);
  };
  handleTang = (id, quantity) => {
    this.props.handleTang(id, quantity);
  };
  handleTotleMoney = () => {
    var total = 0;
    this.props.cart.forEach((cart) => {
      total += parseFloat(cart.price) * parseFloat(cart.quantity);
    });
    return total;
  };
  handleOrder = (e) => {
    let token = JSON.parse(localStorage.getItem("token"));
    e.preventDefault();
    let { username, email, address, numberphone } = this.state;
    let { cart } = this.props;
    cart.forEach((cart) => {
      cart.username = username;
      cart.email = email;
      cart.address = address;
      cart.numberphone = numberphone;
    });
    this.props.handleOrder(cart, token);
    this.socket.emit("BUY_PRODUCT");
    this.closeForm();
  };
  getValueFromInfoForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  getNumberPhoneValue = (e) => {
    this.setState({
      numberphone: e,
    });
  };
  toggleOrderForm = () => {
    this.setState({
      isActiveFrom: true,
    });
  };
  closeForm = () => {
    this.setState({
      isActiveFrom: false,
    });
  };
  render() {
    let { username, email, address, numberphone } = this.state;
    return (
      <>
        <div className="row">
          {this.state.isActiveFrom ? (
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{
                  x: [-140, 0],
                  opacity: 1,
                  boxShadow: "10px 10px 10px black",
                }}
                transition={{ duration: 1 }}
              >
                <i onClick={this.closeForm} class="far fa-window-close"></i>
                <legend>Đặt hàng</legend>
                <div className="form-group">
                  <label htmlFor="username">Tên của bạn</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Nhập tên của bạn . . ."
                    value={username}
                    onChange={this.getValueFromInfoForm}
                  />
                  <i class="fas fa-signature"></i>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn . . ."
                    value={email}
                    onChange={this.getValueFromInfoForm}
                  />
                  <i class="far fa-envelope-open"></i>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Nhập địa chỉ . . . "
                    value={address}
                    name="address"
                    onChange={this.getValueFromInfoForm}
                  />
                  <i class="fas fa-map-marked-alt"></i>
                </div>
                <div className="form-group">
                  <label htmlFor="">Số điện thoại</label>
                  <PhoneInput
                    name="numberphone"
                    placeholder="Nhập số điện thoại . . ."
                    value={numberphone}
                    onChange={this.getNumberPhoneValue}
                  />
                </div>
                <button
                  onClick={this.handleOrder}
                  type="submit"
                  className="danghang btn btn-primary"
                >
                  Đặt hàng
                </button>
              </motion.form>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{ duration: 2 }}
                className="form__fake"
              ></motion.div>
            </div>
          ) : (
            ""
          )}
          <div
            className={
              this.state.isActiveFrom
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>{this.renderCartItem()}</tbody>
              <motion.div
                animate={{
                  y: [-440, 0],
                }}
                className="total-money"
              >
                <h3> Tiền : {this.handleTotleMoney()} đ</h3>
                <button
                  style={{ marginBottom: "100px" }}
                  onClick={this.toggleOrderForm}
                  type="button"
                  className="btn btn-warning"
                >
                  Đặt hàng của bạn
                </button>
              </motion.div>
            </table>
          </div>
        </div>
      </>
    );
  }
}
